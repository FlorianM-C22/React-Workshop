import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardTitle } from "../../ui/card"
import { Input } from "../../ui/input"
import { X, Edit2 } from "lucide-react"
import { useState, useEffect } from "react"
import { updateTodoTitle } from "../../../lib/todoUtils"
import { Todo } from "../../../types/todo"

interface TodoTitleProps {
  todo: Todo
  onTitleUpdated?: (newTitle: string) => void
}

const TodoTitle = ({ todo, onTitleUpdated }: TodoTitleProps) => {
  const [titleInput, setTitleInput] = useState(todo.title)
  const [editingTitle, setEditingTitle] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setTitleInput(todo.title)
  }, [todo.title])

  const updateListTitle = async () => {
    if (titleInput === todo.title) {
      setEditingTitle(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await updateTodoTitle(todo, titleInput)
      setEditingTitle(false)
      if (onTitleUpdated) {
        onTitleUpdated(titleInput)
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du titre:", error)
      setError("Échec de la mise à jour")
      setTitleInput(todo.title)
    } finally {
      setIsLoading(false)
    }
  }

  const cancelEdit = () => {
    setTitleInput(todo.title)
    setEditingTitle(false)
    setError(null)
  }

  return (
    <CardTitle className="text-2xl font-bold">
      {editingTitle ? (
        <div className="flex w-full space-x-2">
          <Input
            value={titleInput}
            onChange={e => setTitleInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") updateListTitle()
              if (e.key === "Escape") cancelEdit()
            }}
            autoFocus
            disabled={isLoading}
          />
          <Button size="icon" variant="ghost" onClick={updateListTitle} disabled={isLoading}>
            <Check className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={cancelEdit} disabled={isLoading}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex w-full justify-between items-center group">
          <span className="truncate">{todo.title}</span>
          {error && <span className="text-sm text-red-500 mx-2">{error}</span>}
          <Button size="icon" variant="ghost" onClick={() => setEditingTitle(true)} className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>
      )}
    </CardTitle>
  )
}

export default TodoTitle
