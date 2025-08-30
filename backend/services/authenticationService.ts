import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import { findUserByUsername } from './databases/userDatabaseService';
import type { LoginBody } from 'shared/models/LoginBody';
import bcrypt from 'bcrypt';
import { serialize } from 'cookie'
import type { User } from 'shared/models/User';

const SECRET_KEY: string = process.env.SECRET_KEY as string;

export interface JwtUser extends JwtPayload {
    id: string;
    name: string;
    email: string;
    password?: string;
}

/**
 * Signs a JWT token with a payload (e.g., username).
 * @param payload - Payload to encode in the token
 * @param expiresIn - Token expiration time (e.g., '15m', '1h')
 * @returns Signed JWT token
 */
export function signToken(payload: object, expiresIn: '15m'): string {
    return jwt.sign(payload, SECRET_KEY, { expiresIn } as jwt.SignOptions);
}

export function IsUserConnected(req: Request) {

    let token = getTokenFromCookie(req);
    if (!token) {
        return false;
    }
    try {
        let user = verifyToken(token);
        if (user != undefined) {
            return true;
        }
    } catch {
        return false;
    }
}

export function IsUserConnectedCheckViaToken(token: string | undefined) {

    if (!token) {
        return false;
    }
    try {
        let user = verifyToken(token);
        if (user != undefined) {
            return true;
        }
    } catch {
        return false;
    }
}

/**
 * Verifies a JWT token string and returns the decoded payload.
 * Throws an error if token is invalid or expired.
 * @param token JWT token string
 * @returns Decoded payload (UserPayload)
 */
export function verifyToken(token: string): User {
    const verified = jwt.verify(token, SECRET_KEY) as JwtPayload;
    if (
        verified !== null &&
        typeof verified === 'object' &&
        'name' in verified.user &&
        'email' in verified.user
    ) {
        return verified.user as User;
    } else {
        throw new Error('Invalid token payload');
    }
}

/**
 * Extracts token from cookie named 'accessToken'
 * @param req Fetch API Request object
 * @returns Token string or undefined if not present
 */
export function getTokenFromCookie(req: Request): string | undefined {
    const cookie = req.headers.get('cookie') || '';
    const tokenCookie = cookie.split('; ').find(c => c.startsWith('accessToken='));
    if (!tokenCookie) return undefined;
    return tokenCookie.split('=')[1];
}

export async function loginUser(req: Request) {
    if (req.body != undefined) {
        let userProvidedCredentials: LoginBody;
        try {
            userProvidedCredentials = await req.json() as LoginBody;
            if (userProvidedCredentials.username === undefined || userProvidedCredentials.password === undefined) {
                throw new Error('Username or password field is missing')
            }
        } catch {
            return new Response(JSON.stringify("Body malformed"), { status: 400 });
        }
        return fetchUserByUsernameAndGenerateToken(userProvidedCredentials)
    }
    return new Response(JSON.stringify("Body is missing"), { status: 400 });
}


async function fetchUserByUsernameAndGenerateToken(userCredentials: LoginBody) {
    const userFromDatabase = findUserByUsername(userCredentials.username);
    if (userFromDatabase && userFromDatabase.name === userCredentials.username) {
        if (userFromDatabase.password && !await bcrypt.compare(userCredentials.password, userFromDatabase.password)) {
            return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        userFromDatabase.password = undefined;
        let user: User = userFromDatabase;
        const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: '15m' });

        const cookie = serialize('accessToken', token, {
            httpOnly: true,
            secure: false,        // true if you run on HTTPS / production
            sameSite: 'strict',
            maxAge: 15 * 60,     // 15 minutes in seconds
            path: '/',
        });

        return new Response(JSON.stringify({ message: 'Login successful', user: user }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': cookie,
            },
        });
    } else {
        return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export function logoutUser() {
    const expiredCookie = serialize('accessToken', '', {
        httpOnly: true,
        secure: false,         // true if on HTTPS in production
        sameSite: 'strict',
        maxAge: 0,             // expire immediately
        path: '/',
    });

    return new Response(JSON.stringify({ message: 'Logged out' }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': expiredCookie
        },
    })
}