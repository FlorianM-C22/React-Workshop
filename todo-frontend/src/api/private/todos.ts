import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000/api",
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

export const addTodo = async (todo: string, completed: boolean) => {
  try {
    const response = await api.post("/todos", { todo, completed })
    return response.data
  } catch (error) {
    console.error("Error adding todo:", error)
    throw error
  }
}

export const updateTodo = async (id: string, task: string, completed: boolean) => {
  try {
    const response = await api.put(`/todos/${id}`, { task, completed })
    return response.data
  } catch (error) {
    console.error("Error updating todo:", error)
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