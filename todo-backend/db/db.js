const Database = require("better-sqlite3")
const db = new Database("todos.db", { verbose: console.log })

db.prepare(
  `CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    tasks TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT 0)
    `
).run()

// Vérifier si la table est vide
const count = db.prepare("SELECT COUNT(*) as count FROM todos").get().count

// Mock data - ajouté uniquement si la table est vide
if (count === 0) {
  const insertMockData = db.prepare("INSERT INTO todos (title, tasks, completed) VALUES (?, ?, ?)")
  insertMockData.run("Premier todo", JSON.stringify(["Étape 1", "Étape 2", "Étape 3"]), 1)
  insertMockData.run("Second todo", JSON.stringify(["Créer l'interface", "Implémenter la logique", "Tester l'application"]), 0)
  console.log("Données de test insérées.")
}

module.exports = db
