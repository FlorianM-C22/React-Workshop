import { getTodos, updateTodo } from "@/api/private/todos"
import { Todo } from "@/types/todo"

export const fetchTodos = async (): Promise<Todo[]> => {
  try {
    const response = await getTodos()
    return response.map((todo: any) => ({
      id: todo.id,
      title: todo.title,
      tasks: Array.isArray(todo.tasks) ? todo.tasks : JSON.parse(todo.tasks || "[]"),
      completed: Boolean(todo.completed),
    }))
  } catch (error) {
    console.error("Error fetching todos:", error)
    throw error
  }
}

export const updateTodoTitle = async (todo: Todo, newTitle: string): Promise<Todo> => {
  try {
    await updateTodo(todo.id, newTitle, todo.tasks, todo.completed)
    return { ...todo, title: newTitle }
  } catch (error) {
    console.error("Error updating todo title:", error)
    throw error
  }
}
