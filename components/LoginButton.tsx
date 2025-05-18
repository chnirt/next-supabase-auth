'use client'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function LoginButton() {
  const router = useRouter()

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'azure' })
    if (error) console.error('Login error:', error)
  }

  useEffect(() => {
    const getRoleAndRedirect = async () => {
      const { data: session } = await supabase.auth.getSession()
      const user = session?.session?.user
      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profile?.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/')
      }
    }

    getRoleAndRedirect()
  }, [])

  return <button onClick={handleLogin}>Login with Azure</button>
}