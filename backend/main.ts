// backend/src/main.ts
import { serve } from 'bun';
import { verifyToken, getTokenFromCookie, loginUser, IsUserConnected, IsUserConnectedCheckViaToken, logoutUser } from './services/authenticationService';
import { handleRoutes } from './routes/routes';
import type { User } from 'shared/models/User';
import { embedSecurityHeaders } from 'utils/cors';

const server = serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    console.log("➡️ Incoming request:", req.method, url.pathname);
    const token = getTokenFromCookie(req);

    let response: Response | undefined = new Response(JSON.stringify('Not Found'), { status: 404 });

    if (req.method === 'OPTIONS') {
      response = new Response(null, { status: 204 });
    }

    if (url.pathname === '/logout' && req.method === 'POST') {
      response = logoutUser();
    }

    if (url.pathname === '/login' && req.method === 'POST') {
      response = await loginUser(req)
    } else if (url.pathname === '/isUserConnected' && req.method === 'GET') {
      if (IsUserConnectedCheckViaToken(token)) {
        response = Response.json(true);
      } else {
        response = Response.json(false);
      }
    } else if (token) {
      try {
        const authenticatedUser: User = verifyToken(token);

        let responseFromHandler = handleRoutes(req, authenticatedUser);

        if (responseFromHandler) {
          response = responseFromHandler;
        }
      } catch {
        response = new Response(JSON.stringify('Unauthorized'), { status: 401 });
      }
    }

    return embedSecurityHeaders(response);
  },
  tls: {
    cert: Bun.file('./certificate/backend.crt'),
    key: Bun.file('./certificate/backend.key'),
  },
});

console.log(`Server is running on http://localhost:${server.port}`);