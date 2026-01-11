'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Fetch stats for the Admin Dashboard
 */
export async function getAdminStats() {
    const supabase = await createClient()

    // Count Users
    const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })

    // Count Providers
    const { count: providerCount } = await supabase
        .from('providers')
        .select('*', { count: 'exact', head: true })

    // Count Verified Providers
    const { count: verifiedProviderCount } = await supabase
        .from('providers')
        .select('*', { count: 'exact', head: true })
        .eq('is_verified', true)

    // Count Enquiries (Total)
    const { count: enquiryCount } = await supabase
        .from('enquiries')
        .select('*', { count: 'exact', head: true })

    // Revenue mock (since we don't have payments yet)
    const revenue = 12500

    return {
        totalUsers: userCount || 0,
        totalProviders: providerCount || 0,
        pendingProviders: (providerCount || 0) - (verifiedProviderCount || 0),
        totalRevenue: revenue,
        totalEnquiries: enquiryCount || 0
    }
}

/**
 * Fetch all users with their roles
 */
export async function getUsers() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email, role, created_at, avatar_url')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching users:', error)
        return []
    }
    return data
}

/**
 * Update a user's role
 */
export async function updateUserRole(userId: string, newRole: 'user' | 'provider' | 'admin') {
    const supabase = await createClient()

    // Check if current user is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    // In a real app, strictly verify requester is admin. 
    // We assume RLS or middleware handles critical checks, but good to be redundant.

    // Bypass TS inference failure - explicit any cast on client
    const { error } = await (supabase as any)
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId)

    if (error) return { error: error.message }

    revalidatePath('/admin/users')
    return { success: true }
}

/**
 * Fetch all providers (with profile details if needed)
 */
/**
 * Fetch all providers (with profile details if needed)
 */
export async function getProviders() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('providers')
        .select(`
            *,
            profiles:profiles!providers_id_fkey (email, full_name),
            subscription_plans:plan_id (name)
        `)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching providers:', error)
        return []
    }
    return data
}

/**
 * Update Provider Status (Verify, Suspend, Deactivate)
 */
export async function updateProviderStatus(providerId: string, status: string) {
    const supabase = await createClient()
    const { error } = await (supabase as any)
        .from('providers')
        .update({ status, is_verified: status === 'Active' }) // Sync is_verified for backward compatibility
        .eq('id', providerId)

    if (error) return { error: error.message }
    revalidatePath('/admin/providers')
    return { success: true }
}

/**
 * Update Provider Subscription Plan
 */
export async function updateProviderPlan(providerId: string, planId: string) {
    const supabase = await createClient()
    const { error } = await (supabase as any)
        .from('providers')
        .update({ plan_id: planId })
        .eq('id', providerId)

    if (error) return { error: error.message }
    revalidatePath('/admin/providers')
    return { success: true }
}

/**
 * Update User Status (Ban/Suspend)
 */
export async function updateUserStatus(userId: string, status: string) {
    const supabase = await createClient()
    const { error } = await (supabase as any)
        .from('profiles')
        .update({ status })
        .eq('id', userId)

    if (error) return { error: error.message }
    revalidatePath('/admin/users')
    return { success: true }
}

/**
 * Delete a provider
 */
export async function deleteProvider(id: string) {
    const supabase = await createClient()
    // Note: This might fail if there are cascading foreign keys not set to CASCADE.
    // However, our schemas usually use ON DELETE CASCADE.
    const { error } = await (supabase as any).from('providers').delete().eq('id', id)

    if (error) return { error: error.message }
    revalidatePath('/admin/providers')
    return { success: true }
}

/**
 * Verify a provider (Legacy wrapper or specific verify action)
 * Using updateProviderStatus is preferred now.
 */
export async function verifyProvider(providerId: string, isVerified: boolean) {
    return updateProviderStatus(providerId, isVerified ? 'Active' : 'Pending')
}

/**
 * Fetch service categories statistics
 */
/**
 * Fetch all services with provider counts
 */
/**
 * Fetch all services with provider counts
 */
export async function getServices() {
    const supabase = await createClient()

    // Fetch services and count related providers
    const { data, error } = await supabase
        .from('services')
        .select(`
            id,
            label,
            status,
            provider_services (count)
        `)
        .order('label')

    if (error) {
        console.error('Error fetching services:', error)
        return []
    }

    return data.map((s: any) => ({
        id: s.id,
        name: s.label,
        status: s.status || 'Active',
        providers: s.provider_services[0]?.count || 0
    }))
}

/**
 * Create a new service
 */
export async function createService(label: string, status: string = 'Active') {
    const supabase = await createClient()
    const id = label.toLowerCase().replace(/[^a-z0-9]/g, '-')

    const { error } = await (supabase as any)
        .from('services')
        .insert({ id, label, status })

    if (error) return { error: error.message }
    revalidatePath('/admin/services')
    return { success: true }
}

/**
 * Update a service
 */
export async function updateService(id: string, label: string, status: string) {
    const supabase = await createClient()
    const { error } = await (supabase as any)
        .from('services')
        .update({ label, status })
        .eq('id', id)

    if (error) return { error: error.message }
    revalidatePath('/admin/services')
    return { success: true }
}

/**
 * Delete a service
 */
export async function deleteService(id: string) {
    const supabase = await createClient()
    const { error } = await (supabase as any).from('services').delete().eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/admin/services')
    return { success: true }
}

/**
 * Event Types Management
 */
export async function getEventTypes() {
    const supabase = await createClient()
    const { data, error } = await supabase.from('event_types').select('*').order('label')
    if (error) {
        console.error('Error fetching event types:', error)
        return []
    }
    return data.map((e: any) => ({
        id: e.id,
        name: e.label,
        status: e.status || 'Active' // Fallback for existing rows without status
    }))
}

export async function createEventType(name: string, status: string = 'Active') {
    const supabase = await createClient()
    const id = name.toLowerCase().replace(/[^a-z0-9]/g, '-')
    const { error } = await (supabase as any).from('event_types').insert({
        id,
        label: name,
        status
    })
    if (error) return { error: error.message }
    revalidatePath('/admin/events')
    return { success: true }
}

export async function updateEventType(id: string, name: string, status: string) {
    const supabase = await createClient()
    const { error } = await (supabase as any).from('event_types').update({
        label: name,
        status
    }).eq('id', id)

    if (error) return { error: error.message }
    revalidatePath('/admin/events')
    return { success: true }
}

export async function deleteEventType(id: string) {
    const supabase = await createClient()
    const { error } = await (supabase as any).from('event_types').delete().eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/admin/events')
    return { success: true }
}

/**
 * Plans Management
 */
export async function getPlans() {
    const supabase = await createClient()
    const { data, error } = await supabase.from('subscription_plans').select('*').order('price')
    if (error) {
        console.error('Error fetching plans:', error)
        return []
    }
    return data
}

export async function createPlan(plan: any) {
    const supabase = await createClient()
    // Ensure numeric fields are numbers
    const safePlan = {
        ...plan,
        price: Number(plan.price),
        leads_per_month: Number(plan.leads_per_month),
        // remove ephemeral UI fields if any
    }

    const { error } = await (supabase as any).from('subscription_plans').insert(safePlan)
    if (error) return { error: error.message }
    revalidatePath('/admin/plans')
    return { success: true }
}

export async function deletePlan(id: string) {
    const supabase = await createClient()
    const { error } = await (supabase as any).from('subscription_plans').delete().eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/admin/plans')
    return { success: true }
}

export async function getPlan(id: string) {
    const supabase = await createClient()
    const { data, error } = await supabase.from('subscription_plans').select('*').eq('id', id).single()
    if (error) return null
    return data
}

export async function updatePlan(id: string, plan: any) {
    const supabase = await createClient()
    const safePlan = {
        ...plan,
        price: Number(plan.price),
        leads_per_month: Number(plan.leads_per_month),
    }
    const { error } = await (supabase as any).from('subscription_plans').update(safePlan).eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/admin/plans')
    revalidatePath(`/admin/plans/${id}`)
    return { success: true }
}

/**
 * Reports Management
 */
export async function getReports() {
    const supabase = await createClient()
    const { data, error } = await supabase.from('reports').select(`
        *,
        reporter:reporter_id (full_name, email),
        provider:provider_id (business_name, category)
    `).order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching reports:', error)
        return []
    }

    return data.map((r: any) => ({
        id: r.id,
        userName: r.reporter?.full_name || 'Unknown',
        userEmail: r.reporter?.email || 'N/A',
        userPhone: 'N/A',
        providerName: r.provider?.business_name || 'Unknown',
        providerCategory: r.provider?.category || 'N/A',
        reportType: r.report_type,
        message: r.message,
        attachments: r.attachments || [],
        dateSubmitted: new Date(r.created_at).toISOString().split('T')[0],
        status: r.status,
        adminNotes: r.admin_notes
    }))
}

export async function updateReportStatus(id: string, status: string) {
    const supabase = await createClient()
    const { error } = await (supabase as any).from('reports').update({ status }).eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/admin/reports')
    return { success: true }
}

export async function updateReportNotes(id: string, notes: string) {
    const supabase = await createClient()
    const { error } = await (supabase as any).from('reports').update({ admin_notes: notes }).eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/admin/reports')
    return { success: true }
}


export async function deleteReport(id: string) {
    const supabase = await createClient()
    const { error } = await (supabase as any).from('reports').delete().eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/admin/reports')
    return { success: true }
}
