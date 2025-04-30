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
  const { task, completed } = req.body

  if (!task) {
    return res.status(400).json({ error: "Task is required" })
  }
  try {
    let completedValue = 0
    if (typeof completed === "boolean") {
      completedValue = completed ? 1 : 0
    } else if (typeof completed === "number") {
      completedValue = completed ? 1 : 0
    }
    const stmt = db.prepare("INSERT INTO todos (task, completed) VALUES (?, ?)")
    stmt.run(task, completedValue)
    res.status(201).json({ task, completed: completedValue })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const updateTodo = (req, res) => {
  const { id } = req.params
  const { task, completed } = req.body

  if (!task && completed === undefined) {
    return res.status(400).json({ error: "Task or completed status is required" })
  }

  try {
    const stmt = db.prepare("UPDATE todos SET task = ?, completed =? WHERE id = ?")
    stmt.run(task || null, completed || null, id)
    res.status(200).json({ message: "Task updated successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const deleteTodo = (req, res) => {
  const { id } = req.params

  try {
    const stmt = db.prepare("DELETE FROM todos WHERE id = ?")
    stmt.run(id)
    res.status(200).json({ message: "Task deleted successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { getTodos, addTodo, updateTodo, deleteTodo }
