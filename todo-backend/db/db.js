const Database = require("better-sqlite3")
const db = new Database("todos.db", { verbose: console.log })

db.prepare(
  `CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT 0)
    `
).run()

// Mock data
const insertMockData = db.prepare("INSERT INTO todos (task, completed) VALUES (?, ?)")
insertMockData.run("Do an awesome workshop", 1)
insertMockData.run("Build a To-Do List app", 0)

module.exports = db
