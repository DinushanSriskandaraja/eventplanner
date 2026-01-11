'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Fetch provider dashboard statistics
 */
export async function getProviderStats() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: "Unauthorized" }

    // 1. Get Provider Details
    const { data: provider } = await (supabase as any)
        .from('providers')
        .select('id, is_verified, created_at')
        .eq('id', user.id)
        .single()

    if (!provider) return { error: "Provider profile not found" }

    // 2. Count Enquiries (Total & New)
    const { count: totalEnquiries } = await supabase
        .from('enquiries')
        .select('*', { count: 'exact', head: true })
        .eq('provider_id', provider.id)

    const { count: newEnquiries } = await supabase
        .from('enquiries')
        .select('*', { count: 'exact', head: true })
        .eq('provider_id', provider.id)
        .eq('status', 'new')

    // 3. Mock Views (In real app, track hits/analytics)
    // We can base it on days since creation * random factor for demo
    const daysActive = Math.ceil((Date.now() - new Date(provider.created_at).getTime()) / (1000 * 60 * 60 * 24)) || 1
    const views = daysActive * 12 + 45

    return {
        isVerified: provider.is_verified,
        totalViews: views,
        totalEnquiries: totalEnquiries || 0,
        newEnquiries: newEnquiries || 0,
        subscriptionPlan: "Pro Plan", // Mock
        subscriptionExpiry: "Jan 01, 2030" // Mock
    }
}

/**
 * Fetch recent enquiries for the dashboard
 */
export async function getRecentEnquiries() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return []

    const { data } = await supabase
        .from('enquiries')
        .select('*')
        .eq('provider_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)

    return data || []
}
