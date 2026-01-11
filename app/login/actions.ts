'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    // Fetch user profile to determine role and redirect
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
        // Cast to any to bypass strict type inference issues for now
        const { data: profile } = await (supabase as any)
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        if (profile) {
            if (profile.role === 'admin') {
                redirect('/admin')
            } else if (profile.role === 'provider') {
                redirect('/provider')
            } else {
                redirect('/')
            }
        }
    }

    revalidatePath('/', 'layout')
    redirect('/')
}
