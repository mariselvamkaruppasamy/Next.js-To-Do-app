// app/(dashboard)/dashboard/components/TodoItem.tsx
'use client'

import { createClient } from '@/lib/supabase/client'
import { Trash2 } from 'lucide-react'
import { cn } from '@/lib/supabase/utils' // We will create this utility file next

type Todo = {
    id: string
    task: string
    is_completed: boolean
}

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
        } else {
            onUpdate(data)
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
        <li className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={todo.is_completed}
                    onChange={handleToggle}
                    className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span
                    className={cn(
                        'text-gray-800',
                        todo.is_completed && 'line-through text-gray-400'
                    )}
                >
                    {todo.task}
                </span>
            </div>
            <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700 p-1"
            >
                <Trash2 size={18} />
            </button>
        </li>
    )
}