'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export type UserRole = 'user' | 'provider' | 'admin'

/**
 * Get the current authenticated user with their profile information
 */
export async function getCurrentUser() {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        return null
    }

    // Fetch the user's profile to get their role
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, full_name, email, role, avatar_url')
        .eq('id', user.id)
        .single()

    if (profileError || !profile) {
        return null
    }

    return {
        id: user.id,
        email: user.email,
        full_name: (profile as any).full_name,
        role: (profile as any).role,
        avatar_url: (profile as any).avatar_url
    }
}

/**
 * Get the role of the current authenticated user
 */
export async function getUserRole(): Promise<UserRole | null> {
    const user = await getCurrentUser()
    return user?.role || null
}

/**
 * Require that the user has one of the specified roles
 * If not, redirect to the appropriate page
 */
export async function requireRole(allowedRoles: UserRole[], redirectTo?: string) {
    const user = await getCurrentUser()

    if (!user) {
        redirect(redirectTo || '/login')
    }

    if (!allowedRoles.includes(user.role as UserRole)) {
        // Redirect to appropriate home based on current role
        if (user.role === 'admin') {
            redirect('/admin')
        } else if (user.role === 'provider') {
            redirect('/provider/profile')
        } else {
            redirect('/')
        }
    }

    return user
}

/**
 * Check if the user has a specific role
 */
export async function hasRole(role: UserRole): Promise<boolean> {
    const userRole = await getUserRole()
    return userRole === role
}

/**
 * Redirect to the appropriate home page based on user role
 */
export async function redirectToAppropriateHome() {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login')
    }

    if (user.role === 'admin') {
        redirect('/admin')
    } else if (user.role === 'provider') {
        redirect('/provider/profile')
    } else {
        redirect('/')
    }
}
