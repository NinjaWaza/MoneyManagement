// backend/src/main.ts
import { serve } from 'bun';
import { verifyToken, getTokenFromCookie, loginUser, IsUserConnected } from './services/authenticationService';
import { handleRoutes } from './routes/routes';
import type { User } from 'shared/models/User';
import { withCorsHeaders } from 'utils/cors';

const server = serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    let res: Response;

    console.log("➡️ Incoming request:", req.method, url.pathname);

    if (url.pathname === '/login' && req.method === 'POST') {
      res = await loginUser(req);
    }

    if (url.pathname === '/isUserConnected' && req.method === 'GET') {
      if (IsUserConnected(req)) {
        res = withCorsHeaders(Response.json(true));
      } else {
        res = withCorsHeaders(Response.json(false));
      }
    }

    const token = getTokenFromCookie(req);
    if (!token) return new Response('Unauthorized', { status: 401 });

    try {
      const authenticatedUser: User = verifyToken(token);

      let response = await handleRoutes(req, authenticatedUser);

      if (response === undefined) {
        res = new Response('Not Found', { status: 404 });
      } else {
        res = response;
      }
    } catch {
      res = new Response('Unauthorized', { status: 401 });
    }

    return new Response(res.body, {
      status: res.status,
    });
  },
});

console.log(`Server is running on http://localhost:${server.port}`);