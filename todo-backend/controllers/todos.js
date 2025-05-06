const db = require("../db/db")

const getTodos = (_req, res) => {
  try {
    const todos = db.prepare("SELECT * FROM todos").all()
    res.status(200).json(todos)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const addTodo = (req, res) => {
  const { title, tasks, completed } = req.body

  if (!title || !tasks) {
    return res.status(400).json({ error: "Title and tasks are required" })
  }
  try {
    let completedValue = 0
    if (typeof completed === "boolean") {
      completedValue = completed ? 1 : 0
    } else if (typeof completed === "number") {
      completedValue = completed ? 1 : 0
    }
    const stmt = db.prepare("INSERT INTO todos (title, tasks, completed) VALUES (?, ?, ?)")
    stmt.run(title, tasks, completedValue)
    res.status(201).json({ title, tasks, completed: completedValue })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const updateTodo = (req, res) => {
  const { id } = req.params
  const { title, tasks, completed } = req.body

  if (!title && tasks === undefined && completed === undefined) {
    return res.status(400).json({ error: "Title or tasks or completed status is required" })
  }

  try {
    // Vérifier si la todo existe
    const todo = db.prepare("SELECT * FROM todos WHERE id = ?").get(id)
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" })
    }

    // Préparer les données à mettre à jour
    const updatedTitle = title !== undefined ? title : todo.title

    // Convertir les tâches en JSON si c'est un tableau
    let updatedTasks
    if (tasks !== undefined) {
      updatedTasks = Array.isArray(tasks) ? JSON.stringify(tasks) : tasks
    } else {
      updatedTasks = todo.tasks
    }

    // Convertir completed en 0/1 pour SQLite
    let completedValue
    if (completed !== undefined) {
      completedValue = completed ? 1 : 0
    } else {
      completedValue = todo.completed
    }

    const stmt = db.prepare("UPDATE todos SET title = ?, tasks = ?, completed = ? WHERE id = ?")
    const result = stmt.run(updatedTitle, updatedTasks, completedValue, id)

    if (result.changes > 0) {
      res.status(200).json({
        message: "Todo updated successfully",
        todo: {
          id,
          title: updatedTitle,
          tasks: updatedTasks,
          completed: completedValue === 1,
        },
      })
    } else {
      res.status(404).json({ error: "Todo not found or no changes made" })
    }
  } catch (err) {
    console.error("Error updating todo:", err)
    res.status(500).json({ error: err.message })
  }
}

const deleteTodo = (req, res) => {
  const { id } = req.params

  try {
    const stmt = db.prepare("DELETE FROM todos WHERE id = ?")
    stmt.run(id)
    res.status(200).json({ message: "Todo deleted successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { getTodos, addTodo, updateTodo, deleteTodo }
