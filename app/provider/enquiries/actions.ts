'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export type Enquiry = {
    id: string
    client_name: string
    client_email: string
    event_type: string
    event_date: string
    message: string
    status: 'new' | 'responded' | 'booked' | 'closed'
    created_at: string
}

export async function getEnquiries() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return []

    const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .eq('provider_id', user.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching enquiries:', error)
        return []
    }

    return data as Enquiry[]
}

export async function updateEnquiryStatus(enquiryId: string, newStatus: Enquiry['status']) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Unauthorized' }

    const { error } = await (supabase as any)
        .from('enquiries')
        .update({ status: newStatus })
        .eq('id', enquiryId)
        .eq('provider_id', user.id)

    if (error) return { error: error.message }
    revalidatePath('/provider/enquiries')
    return { success: true }
}
