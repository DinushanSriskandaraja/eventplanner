'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export type PortfolioItem = {
    id: string
    type: 'photo' | 'video'
    src: string
    youtube_url?: string
    featured: boolean
}

export async function getPortfolioItems() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return []

    // Get the provider ID (which is the same as user ID in our 1:1 schema)
    const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('provider_id', user.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching portfolio:', error)
        return []
    }

    return data as PortfolioItem[]
}

export async function addVideoItem(youtubeUrl: string, thumbnailUrl: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Unauthorized' }

    const { error } = await (supabase as any).from('portfolio_items').insert({
        provider_id: user.id,
        type: 'video',
        src: thumbnailUrl,
        youtube_url: youtubeUrl,
    })

    if (error) return { error: error.message }
    revalidatePath('/provider/portfolio')
    return { success: true }
}

export async function uploadPhoto(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Unauthorized' }

    const file = formData.get('file') as File
    if (!file) return { error: 'No file provided' }

    // 1. Upload to Supabase Storage
    const fileExt = file.name.split('.').pop()
    const fileName = `providers/${user.id}/portfolio/${Date.now()}.${fileExt}`

    // Check if bucket exists, if not strictly relying on user creation, we might fail here if not created
    const { error: uploadError } = await supabase
        .storage
        .from('images')
        .upload(fileName, file, { upsert: true })

    if (uploadError) return { error: uploadError.message }

    // 2. Get Public URL
    const { data: { publicUrl } } = supabase
        .storage
        .from('images')
        .getPublicUrl(fileName)

    // 3. Insert into DB
    const { error: dbError } = await (supabase as any).from('portfolio_items').insert({
        provider_id: user.id,
        type: 'photo',
        src: publicUrl,
    })

    if (dbError) return { error: dbError.message }

    revalidatePath('/provider/portfolio')
    return { success: true }
}

export async function deletePortfolioItem(itemId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    // Optional: Delete from storage if it's a photo (would need extra logic to parse path from src)

    const { error } = await (supabase as any)
        .from('portfolio_items')
        .delete()
        .eq('id', itemId)
        .eq('provider_id', user.id) // Security check

    if (error) return { error: error.message }
    revalidatePath('/provider/portfolio')
    return { success: true }
}

export async function toggleFeatured(itemId: string, currentStatus: boolean) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const { error } = await (supabase as any)
        .from('portfolio_items')
        .update({ featured: !currentStatus })
        .eq('id', itemId)
        .eq('provider_id', user.id)

    if (error) return { error: error.message }
    revalidatePath('/provider/portfolio')
    return { success: true }
}
