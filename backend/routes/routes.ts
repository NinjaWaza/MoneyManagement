import { logoutUser } from '../services/authenticationService';
import { withCorsHeaders } from '../utils/cors';
import type { User } from 'shared/models/User';
import { ApiController } from './apiRoutes';

export const handleRoutes = async (req: Request, user: User) => {
    const url = new URL(req.url);

    let response;
    let apiController = new ApiController(user);

    if (url.pathname === '/logout' && req.method === 'POST') {
        response = logoutUser();
    }

    if (url.pathname.startsWith('/api')) {
        response = apiController.handle(url.pathname, req.method);
    }

    if (response) {
        return withCorsHeaders(response);
    }

    console.log("❌ No matching route for:", req.method, url.pathname);
    return new Response('Not Found', { status: 404 });
};

