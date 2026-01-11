'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Fetch verifiable providers for the public listing (Search/Browse)
 */
export async function getPublicProviders({ category, limit = 50 }: { category?: string, limit?: number }) {
    const supabase = await createClient()

    let query = supabase
        .from('providers')
        .select(`
            id, 
            business_name, 
            location, 
            rating, 
            review_count, 
            starting_price, 
            currency, 
            image_url, 
            banner_url,
            years_of_experience,
            category, 
            is_verified,
            provider_services!inner(
                service_id,
                services(label)
            )
        `)
        .eq('is_verified', true)

    if (category && category !== 'all') {
        // Filter using the inner join on provider_services
        // We match service_id which are usually kebab-case (e.g., "photography", "makeup-artist")
        // The frontend passes these exact IDs usually.

        // Ensure mapping handles any weird frontend aliases if necessary, 
        // but generally 'photography' maps to id 'photography' now.
        // Special case: 'dj' might need 'dj-music'
        const idMap: Record<string, string> = {
            'dj': 'dj-music',
            'decoration': 'decoration'
        }

        const filterId = idMap[category] || category
        query = query.eq('provider_services.service_id', filterId)
    }

    const { data, error } = await query.order('rating', { ascending: false })

    if (error) {
        console.error("Error fetching providers:", error)
        return []
    }

    // Map data to match expected frontend interface (flattening services)
    return (data || []).map((p: any) => ({
        ...p,
        name: p.business_name,
        currency: 'Rs. ', // Force Sri Lankan Rupees
        services: p.provider_services?.map((ps: any) => ps.services?.label) || []
    }))
}

/**
 * Fetch single provider details by ID for the Profile Page
 */
export async function getProviderPublicProfile(id: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('providers')
        .select(`
            *,
            provider_services(
                services(label)
            ),
            provider_event_types(
                event_types(label)
            ),
            provider_packages(*)
        `)
        .eq('id', id)
        .single()

    if (error || !data) return null

    // Fetch portfolio items
    const { data: portfolio } = await supabase
        .from('portfolio_items')
        .select('id, type, src, youtube_url')
        .eq('provider_id', id)
        .limit(6) // Maybe increase this or keep at 6 for preview

    // Cast to any to prevent spread types error
    const providerData = data as any
    return {
        ...providerData,
        name: providerData.business_name,
        currency: 'Rs. ', // Force Sri Lankan Rupees
        portfolio: portfolio || [],
        services: providerData.provider_services?.map((ps: any) => ps.services?.label) || [],
        event_types: providerData.provider_event_types?.map((pet: any) => pet.event_types?.label) || [],
        packages: (providerData.provider_packages || []).map((pkg: any) => ({
            ...pkg,
            currency: 'Rs. ' // Force Sri Lankan Rupees for all packages
        }))
    }
}

/**
 * Submit a new enquiry
 */
export async function createEnquiry(formData: any) {
    const supabase = await createClient()

    // Optional: If user is logged in, attach their ID
    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await (supabase as any)
        .from('enquiries')
        .insert({
            provider_id: formData.providerId,
            user_id: user?.id || null, // Optional
            client_name: formData.name,
            client_email: formData.email,
            event_type: formData.eventType,
            event_date: formData.eventDate, // Ensure date format YYYY-MM-DD
            message: formData.message,
            status: 'new'
        })

    if (error) return { error: error.message }
    return { success: true }
}
