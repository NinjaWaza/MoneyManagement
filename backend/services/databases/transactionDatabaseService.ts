import db from '../../database/db';
import { Transaction } from 'shared/models/Transaction';

export function findAllTransactions(): Transaction[] | undefined {
    const stmt = db.prepare("SELECT * FROM transactions");
    const rows = stmt.all() as Transaction[];
    return rows;
}