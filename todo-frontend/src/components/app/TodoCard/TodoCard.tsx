import { Card, CardHeader } from "../../ui/card"
import TodoTitle from "./TodoTitle"
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

  return (
    <Card className="w-96 h-96 bg-gray-50 drop-shadow-md">
      <CardHeader>
        <TodoTitle todo={todo} onTitleUpdated={handleTitleUpdated} />
      </CardHeader>
      {/* <CardContent>
        <div className="addTaskContainer flex flex-row gap-2">
          <Input className="h-10" type="text" placeholder="Ajouter une tâche..." />
          <Button className="w-20 h-10">
            <p>Add +</p>
          </Button>
        </div>
      </CardContent> */}
    </Card>
  )
}

export default TodoCard
