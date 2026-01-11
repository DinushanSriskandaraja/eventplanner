'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export type Package = {
    id: string
    title: string // mapped from name
    price: string // mapped from price + currency
    desc: string // mapped from description
    events: string[] // mapped from event_types
    active: boolean // mapped from is_active
    currency: string
    raw_price: number // keeping internal numeric price
}

export async function getPackages() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return []

    const { data, error } = await supabase
        .from('provider_packages')
        .select('*')
        .eq('provider_id', user.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching packages:', error)
        return []
    }

    // Transform to frontend model
    return data.map((pkg: any) => ({
        id: pkg.id,
        title: pkg.name,
        pkg_name: pkg.name, // keep original
        price: `${pkg.currency}${pkg.price}`,
        desc: pkg.description,
        events: pkg.event_types || [],
        active: pkg.is_active,
        currency: pkg.currency,
        raw_price: pkg.price
    })) as Package[]
}

export async function addPackage(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Unauthorized' }

    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const currency = formData.get('currency') as string
    const isActive = formData.get('isActive') === 'true'
    const eventTypes = JSON.parse(formData.get('eventTypes') as string)

    const { error } = await (supabase as any).from('provider_packages').insert({
        provider_id: user.id,
        name,
        description,
        price,
        currency,
        is_active: isActive,
        event_types: eventTypes
    })

    if (error) return { error: error.message }
    revalidatePath('/provider/services')
    return { success: true }
}

export async function deletePackage(packageId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Unauthorized' }

    const { error } = await (supabase as any)
        .from('provider_packages')
        .delete()
        .eq('id', packageId)
        .eq('provider_id', user.id)

    if (error) return { error: error.message }
    revalidatePath('/provider/services')
    return { success: true }
}

export async function togglePackageStatus(packageId: string, currentStatus: boolean) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Unauthorized' }

    const { error } = await (supabase as any)
        .from('provider_packages')
        .update({ is_active: !currentStatus })
        .eq('id', packageId)
        .eq('provider_id', user.id)

    if (error) return { error: error.message }
    revalidatePath('/provider/services')
    return { success: true }
}
