import { useEffect, useState } from "react"
import axios from "axios"
import "./App.css"

function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:3000/api/todos")
    setTodos(response.data)
  }

  return (
    <>
      <div>
        <p>Hello World</p>
      </div>
    </>
  )
}

export default App
