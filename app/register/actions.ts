'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

import { createClient } from '@/utils/supabase/server'

export async function signup(formData: FormData) {
    const origin = (await headers()).get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('fullName') as string
    const role = formData.get('role') as 'user' | 'provider'

    const supabase = await createClient()

    // 1. Sign up user
    // We pass role and full_name in metadata so the 'handle_new_user' trigger can create the profile/provider entries automatically.
    const { data: { user }, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
            data: {
                full_name: fullName,
                role: role,
            }
        },
    })

    if (signupError) {
        return { error: signupError.message }
    }

    return { success: true, message: "Check your email to confirm your account." }
}
