import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Todo } from "@/types/todo"
import { updateTodo } from "@/api/private/todos"
import { X } from "lucide-react"

interface TodoContentProps {
  todo: Todo
  onUpdate?: (updatedTodo: Todo) => void
}

const TodoContent = ({ todo, onUpdate }: TodoContentProps) => {
  const [newTask, setNewTask] = useState("")

  const handleUpdateTasks = async (updatedTasks: string[]) => {
    try {
      await updateTodo(todo.id, todo.title, updatedTasks, todo.completed)

      if (onUpdate) {
        onUpdate({ ...todo, tasks: updatedTasks })
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des tâches:", error)
    }
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
      <div className="addTaskContainer flex flex-row gap-2">
        <Input className="h-10" type="text" placeholder="Ajouter une tâche..." value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAddTask()} />
        <Button className="w-20 h-10" onClick={handleAddTask}>
          <p>Add +</p>
        </Button>
      </div>
      <div className="taskList mb-4 flex flex-col gap-2 pt-4">
        {todo.tasks.map((task, index) => (
          <div key={index} className="task p-2 border-b flex justify-between items-center">
            <p>{task}</p>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleDeleteTask(index)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodoContent
