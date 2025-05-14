import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Todo } from "@/types/todo"
import { updateTodo } from "@/api/private/todos"
import { X, CheckCircle, Circle } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface TodoContentProps {
  todo: Todo
  onUpdate?: (updatedTodo: Todo) => void
}

const TodoContent = ({ todo, onUpdate }: TodoContentProps) => {
  const [newTask, setNewTask] = useState("")

  const handleUpdateTodo = async (updatedTodo: Todo) => {
    try {
      await updateTodo(updatedTodo.id, updatedTodo.title, updatedTodo.tasks, updatedTodo.completed)

      if (onUpdate) {
        onUpdate(updatedTodo)
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du todo:", error)
    }
  }

  const handleUpdateTasks = async (updatedTasks: string[]) => {
    await handleUpdateTodo({ ...todo, tasks: updatedTasks })
  }

  const handleToggleCompleted = async () => {
    await handleUpdateTodo({ ...todo, completed: !todo.completed })
  }

  const handleAddTask = async () => {
    if (!newTask.trim()) return

    const updatedTasks = [...todo.tasks, newTask]
    await handleUpdateTasks(updatedTasks)
    setNewTask("")
  }

  const handleDeleteTask = async (index: number) => {
    const updatedTasks = todo.tasks.filter((_, i) => i !== index)
    await handleUpdateTasks(updatedTasks)
  }

  return (
    <div>
      <div className="addTaskContainer flex flex-row gap-2 mb-3">
        <Input className="h-10" type="text" placeholder="Ajouter une tâche..." value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAddTask()} />
        <Button className="w-20 h-10" onClick={handleAddTask}>
          <p>Add +</p>
        </Button>
      </div>

      <div className="todoStatus flex items-center gap-2 mb-2">
        <Checkbox id="completed" checked={todo.completed} onCheckedChange={handleToggleCompleted} />
        <label htmlFor="completed" className="text-sm font-medium cursor-pointer">
          {todo.completed ? "Terminé" : "En cours"}
        </label>
      </div>

      <div className="taskList mb-4 flex flex-col gap-2 pt-2">
        {todo.tasks.map((task, index) => (
          <div key={index} className={`task p-2 border-b flex justify-between items-center ${todo.completed ? "opacity-70 line-through" : ""}`}>
            <p>{task}</p>
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleDeleteTask(index)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodoContent
