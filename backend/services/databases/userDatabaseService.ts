import db from '../../database/db';
import { randomUUID } from 'crypto';
import type { User } from 'shared/models/User';

export function createUser(name: string, email: string, password: string): User {
  const id = randomUUID();
  const stmt = db.prepare('INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)');
  stmt.run(id, name, email, password);
  return { id, name, email };
}

export function findUserByUsername(username: string): User | undefined {
  const stmt = db.prepare("SELECT * FROM users WHERE name = ?");
  const row = stmt.get(username) as User;

  if (
    row &&
    typeof row.id === 'string' &&
    typeof row.name === 'string' &&
    typeof row.email === 'string'
  ) {
    return row;
  }

  return undefined;
}
