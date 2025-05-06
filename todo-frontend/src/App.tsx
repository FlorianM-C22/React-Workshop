import "./App.css"
import TodoList from "./components/app/TodoList/TodoList"

function App() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Mes Todos</h1>
      <TodoList />
    </div>
  )
}

export default App
