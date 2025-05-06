import { useState, useEffect } from "react"
import TodoCard from "../TodoCard/TodoCard"
import { fetchTodos } from "../../../lib/todoUtils"
import { Todo } from "../../../types/todo"

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true)
        const fetchedTodos = await fetchTodos()
        setTodos(fetchedTodos)
      } catch (error) {
        console.error("Erreur lors du chargement des todos:", error)
        setError("Impossible de charger les todos")
      } finally {
        setLoading(false)
      }
    }

    loadTodos()
  }, [])

  const handleTodoUpdate = (updatedTodo: Todo) => {
    setTodos(currentTodos => currentTodos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)))
  }

  if (loading) return <div>Chargement...</div>
  if (error) return <div>Erreur: {error}</div>
  if (todos.length === 0) return <div>Aucune todo trouvée</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {todos.map(todo => (
        <TodoCard key={todo.id} todo={todo} onUpdate={handleTodoUpdate} />
      ))}
    </div>
  )
}

export default TodoList
