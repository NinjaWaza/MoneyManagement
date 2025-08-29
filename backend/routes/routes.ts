import { logoutUser } from '../services/authenticationService';
import { embedSecurityHeaders } from '../utils/cors';
import type { User } from 'shared/models/User';
import { ApiController } from './apiRoutes';

export const handleRoutes = (req: Request, user: User) => {
    const url = new URL(req.url);

    let response;
    let apiController = new ApiController(user);

    if (url.pathname.startsWith('/api')) {
        response = apiController.handle(url.pathname, req.method);
    }

    if (response) {
        return embedSecurityHeaders(response);
    }

    console.log("❌ No matching route for:", req.method, url.pathname);
    return undefined;
};

