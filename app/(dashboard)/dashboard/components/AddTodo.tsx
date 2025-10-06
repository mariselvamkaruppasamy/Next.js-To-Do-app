// app/(dashboard)/dashboard/components/AddTodo.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function AddTodo({ onAdd }: { onAdd: (newTodo: any) => void }) {
    const [task, setTask] = useState('')
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (task.trim().length === 0) return

        const {
            data: { user },
        } = await supabase.auth.getUser()

        if (!user) return

        const { data, error } = await supabase
            .from('todos')
            .insert({ task, user_id: user.id })
            .select()
            .single()

        if (error) {
            console.error('Error adding todo:', error)
        } else if (data) {
            onAdd(data)
            setTask('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
            <Input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1"
            />
            <Button type="submit">Add Task</Button>
        </form>
    )
}