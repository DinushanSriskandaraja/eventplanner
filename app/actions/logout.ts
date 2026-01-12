'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

/**
 * Logout action - signs out the current user and redirects to home
 */
export async function logout() {
    const supabase = await createClient()

    const { error } = await supabase.auth.signOut()

    if (error) {
        console.error('Logout error:', error)
        // Even if there's an error, redirect to home
    }

    redirect('/')
}
