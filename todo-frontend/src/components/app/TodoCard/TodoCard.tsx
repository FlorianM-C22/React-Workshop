import { Card, CardContent, CardHeader } from "../../ui/card"
import TodoTitle from "./TodoTitle"
import TodoContent from "./TodoContent"
import { Todo } from "../../../types/todo"

interface TodoCardProps {
  todo: Todo
  onUpdate?: (updatedTodo: Todo) => void
}

const TodoCard = ({ todo, onUpdate }: TodoCardProps) => {
  const handleTitleUpdated = (newTitle: string) => {
    if (onUpdate) {
      onUpdate({ ...todo, title: newTitle })
    }
  }

  const handleTasksUpdated = (updatedTodo: Todo) => {
    if (onUpdate) {
      onUpdate(updatedTodo)
    }
  }

  return (
    <Card className="w-96 h-96 bg-gray-50 drop-shadow-md">
      <CardHeader>
        <TodoTitle todo={todo} onTitleUpdated={handleTitleUpdated} />
      </CardHeader>
      <CardContent>
        <TodoContent todo={todo} onUpdate={handleTasksUpdated} />
      </CardContent>
    </Card>
  )
}

export default TodoCard
