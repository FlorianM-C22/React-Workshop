import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    "Content-Type": "application/json",
  },
})

export const getTodos = async () => {
  try {
    const response = await api.get("/todos")
    return response.data
  } catch (error) {
    console.error("Error fetching todos:", error)
    throw error
  }
}

export const addTodo = async (title: string, tasks: string[], completed: boolean) => {
  try {
    const response = await api.post("/todos", { title, tasks, completed })
    return response.data
  } catch (error) {
    console.error("Error adding todo:", error)
    throw error
  }
}

export const updateTodo = async (id: string, title: string, tasks: string[], completed: boolean) => {
  try {
    const formattedTasks = Array.isArray(tasks) ? tasks : []

    const response = await api.put(`/todos/${id}`, {
      title,
      tasks: formattedTasks,
      completed,
    })

    console.log("Update response:", response.data)
    return response.data
  } catch (error: any) {
    console.error("Error updating todo:", error)
    if (error.response) {
      console.error("Response status:", error.response.status)
      console.error("Response data:", error.response.data)
      throw new Error(error.response.data?.error || "Error updating todo")
    }
    throw error
  }
}

export const deleteTodo = async (id: number) => {
  try {
    const response = await api.delete(`/todos/${id}`)
    return response.data
  } catch (error) {
    console.error("Error deleting todo:", error)
    throw error
  }
}
