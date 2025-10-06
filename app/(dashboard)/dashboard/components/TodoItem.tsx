// app/(dashboard)/dashboard/components/TodoItem.tsx
'use client'

import { createClient } from '@/lib/supabase/client'
import { Trash2 } from 'lucide-react'
import { cn } from '@/lib/supabase/utils' // Corrected the import path assuming a standard location
import { Todo } from '@/types/index' // Import the single, shared Todo type

export default function TodoItem({
    todo,
    onUpdate,
    onDelete,
}: {
    todo: Todo
    onUpdate: (updatedTodo: Todo) => void
    onDelete: (id: string) => void
}) {
    const supabase = createClient()

    const handleToggle = async () => {
        const { data, error } = await supabase
            .from('todos')
            .update({ is_completed: !todo.is_completed })
            .match({ id: todo.id })
            .select()
            .single()

        if (error) {
            console.error('Error updating todo:', error)
        } else if (data) {
            onUpdate(data) // 'data' now correctly matches the shared Todo type
        }
    }

    const handleDelete = async () => {
        const { error } = await supabase.from('todos').delete().match({ id: todo.id })

        if (error) {
            console.error('Error deleting todo:', error)
        } else {
            onDelete(todo.id)
        }
    }

    return (
        // The JSX now expects a list item (<li>) for proper HTML semantics within a <ul> or <ol>
        // If you are not using a list, you can change this to a <div>
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-md">
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={todo.is_completed}
                    onChange={handleToggle}
                    className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span
                    className={cn(
                        'text-gray-800 dark:text-gray-200',
                        todo.is_completed && 'line-through text-gray-400'
                    )}
                >
                    {todo.task}
                </span>
            </div>
            <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700 p-1"
                aria-label="Delete task"
            >
                <Trash2 size={18} />
            </button>
        </div>
    )
}