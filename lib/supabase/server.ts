import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = () => {
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                // 1. Make the 'get' method async
                async get(name: string) {
                    // 2. Await the cookies() function to get the store
                    const cookieStore = await cookies()
                    return cookieStore.get(name)?.value
                },
                // 3. Make the 'set' method async
                async set(name: string, value: string, options: CookieOptions) {
                    try {
                        // 4. Await the cookies() function
                        const cookieStore = await cookies()
                        cookieStore.set({ name, value, ...options })
                    } catch (error) {
                        // The `set` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
                // 5. Make the 'remove' method async
                async remove(name: string, options: CookieOptions) {
                    try {
                        // 6. Await the cookies() function
                        const cookieStore = await cookies()
                        cookieStore.set({ name, value: '', ...options })
                    } catch (error) {
                        // The `delete` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    )
}