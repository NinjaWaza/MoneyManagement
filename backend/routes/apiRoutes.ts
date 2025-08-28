import type { User } from 'shared/models/User';
import { findAllTransactions } from '../services/databases/transactionDatabaseService';

export class ApiController {
  constructor(private readonly user: User | undefined) {
  }

  handle(path: string, method: string): Response | undefined {
    if (!this.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    if (path === '/api/user' && method === 'GET') {
      return new Response(JSON.stringify(this.user), { status: 200 });
    }

    if (path === '/api/users' && method === 'GET') {
      return new Response(JSON.stringify([this.user]), { status: 200 });
    }

    if (path === '/api/transactions' && method === 'GET') {
      return new Response(JSON.stringify(findAllTransactions()), { status: 200 });
    }

    return undefined;
  }
}