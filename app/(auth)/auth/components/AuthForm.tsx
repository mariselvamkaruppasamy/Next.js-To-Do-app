// app/(auth)/auth/components/AuthForm.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AuthForm() {
    const [isSignUp, setIsSignUp] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setMessage(null)

        if (isSignUp) {
            // Sign Up
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback`,
                },
            })
            if (error) {
                setError(error.message)
            } else {
                setMessage('Check your email for the confirmation link!')
                setEmail('')
                setPassword('')
            }
        } else {
            // Sign In
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            if (error) {
                setError(error.message)
            } else {
                router.push('/dashboard')
                router.refresh() // Ensures the page re-renders with user session
            }
        }
    }

    return (
        <form className="space-y-6" onSubmit={handleAuth}>
            <div className="space-y-4 rounded-md shadow-sm">
                <div>
                    <Label htmlFor="email">Email address</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                    />
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
            {message && <p className="text-sm text-green-500">{message}</p>}

            <div>
                <Button type="submit" className="w-full">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Button>
            </div>
            <div className="text-center text-sm">
                <button
                    type="button"
                    onClick={() => {
                        setIsSignUp(!isSignUp)
                        setError(null)
                        setMessage(null)
                    }}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                    {isSignUp
                        ? 'Already have an account? Sign In'
                        : "Don't have an account? Sign Up"}
                </button>
            </div>
        </form>
    )
}