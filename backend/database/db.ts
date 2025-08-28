import { Database } from "bun:sqlite";

const db = new Database("database/databaseFiles/mydb.sqlite");

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    amount REAL NOT NULL,
    type TEXT CHECK(type IN ('income', 'expense', 'invest', 'transfert')) NOT NULL,
    name TEXT NOT NULL,
    accountFrom TEXT NOT NULL,
    accountTo TEXT NOT NULL,
    date TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )
`);

/*
db.run(`
  INSERT INTO transactions (user_id, amount, type, name, accountFrom, accountTo, date)
  VALUES ('user123', 1000.00, 'invest', 'investing', 'Bank Account', 'Kraken', CURRENT_TIMESTAMP);
`);*/

export default db;