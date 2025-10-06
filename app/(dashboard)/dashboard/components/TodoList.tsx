// app/(dashboard)/dashboard/components/TodoList.tsx
'use client'

import { useState, useMemo } from 'react'
import AddTodo from './AddTodo'
import TodoItem from './TodoItem'
import { Button } from '@/components/ui/button'

type Todo = {
    id: string
    user_id: string
    task: string
    is_completed: boolean
    created_at: string
}

type FilterStatus = 'all' | 'completed' | 'pending'

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
    const [todos, setTodos] = useState<Todo[]>(initialTodos)
    const [filter, setFilter] = useState<FilterStatus>('all')

    const handleAddTodo = (newTodo: Todo) => {
        setTodos([newTodo, ...todos])
    }

    const handleUpdateTodo = (updatedTodo: Todo) => {
        setTodos(
            todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
        )
    }

    const handleDeleteTodo = (todoId: string) => {
        setTodos(todos.filter((todo) => todo.id !== todoId))
    }

    const filteredTodos = useMemo(() => {
        if (filter === 'completed') {
            return todos.filter((todo) => todo.is_completed)
        }
        if (filter === 'pending') {
            return todos.filter((todo) => !todo.is_completed)
        }
        return todos
    }, [todos, filter])

    return (
        <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-950 rounded-lg shadow-md p-6 space-y-6">
            <AddTodo onAdd={handleAddTodo} />

            <div className="flex items-center justify-center space-x-2 border-t pt-6">
                <Button
                    onClick={() => setFilter('all')}
                    variant={filter === 'all' ? 'default' : 'outline'}
                    size="sm"
                >
                    All
                </Button>
                <Button
                    onClick={() => setFilter('pending')}
                    variant={filter === 'pending' ? 'default' : 'outline'}
                    size="sm"
                >
                    Pending
                </Button>
                <Button
                    onClick={() => setFilter('completed')}
                    variant={filter === 'completed' ? 'default' : 'outline'}
                    size="sm"
                >
                    Completed
                </Button>
            </div>

            <div className="space-y-3">
                {filteredTodos.length > 0 ? (
                    filteredTodos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onUpdate={handleUpdateTodo}
                            onDelete={handleDeleteTodo}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                        No tasks found.
                    </p>
                )}
            </div>
        </div>
    )
}