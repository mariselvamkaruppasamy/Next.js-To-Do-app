// app/(auth)/auth/page.tsx
import AuthForm from './components/AuthForm'

export default function AuthPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h1 className="text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h1>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or get started with your new To-Do list
                    </p>
                </div>
                <AuthForm />
            </div>
        </div>
    )
}