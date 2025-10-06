// app/page.tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Page() {
  const supabase = createClient()

  // This will be `null` if the user is not signed in
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If the user is logged in, redirect them to the dashboard
  if (session) {
    redirect('/dashboard')
  } else {
    // If the user is not logged in, redirect them to the auth page
    redirect('/auth')
  }

  // This part of the component will never be rendered because of the redirects.
  // We can return null or a simple loading state.
  return null
}