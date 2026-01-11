export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    email: string | null
                    full_name: string | null
                    avatar_url: string | null
                    role: 'user' | 'provider' | 'admin'
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    email?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                    role?: 'user' | 'provider' | 'admin'
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    email?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                    role?: 'user' | 'provider' | 'admin'
                    created_at?: string
                    updated_at?: string
                }
            }
            providers: {
                Row: {
                    id: string
                    business_name: string
                    category: string | null
                    location: string | null
                    experience: number | null
                    rating: number | null
                    review_count: number | null
                    starting_price: number | null
                    currency: string | null
                    image_url: string | null
                    tagline: string | null
                    is_verified: boolean | null
                    is_featured: boolean | null
                    about: string | null
                    social_media: Json | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    business_name: string
                    category?: string | null
                    location?: string | null
                    experience?: number | null
                    rating?: number | null
                    review_count?: number | null
                    starting_price?: number | null
                    currency?: string | null
                    image_url?: string | null
                    tagline?: string | null
                    is_verified?: boolean | null
                    is_featured?: boolean | null
                    about?: string | null
                    social_media?: Json | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    business_name?: string
                    category?: string | null
                    location?: string | null
                    experience?: number | null
                    rating?: number | null
                    review_count?: number | null
                    starting_price?: number | null
                    currency?: string | null
                    image_url?: string | null
                    tagline?: string | null
                    is_verified?: boolean | null
                    is_featured?: boolean | null
                    about?: string | null
                    social_media?: Json | null
                    created_at?: string
                    updated_at?: string
                }
            }
            services: {
                Row: {
                    id: string
                    label: string
                    description: string | null
                    icon: string | null
                }
                Insert: {
                    id: string
                    label: string
                    description?: string | null
                    icon?: string | null
                }
                Update: {
                    id?: string
                    label?: string
                    description?: string | null
                    icon?: string | null
                }
            }
            provider_services: {
                Row: {
                    provider_id: string
                    service_id: string
                    created_at: string
                }
                Insert: {
                    provider_id: string
                    service_id: string
                    created_at?: string
                }
                Update: {
                    provider_id?: string
                    service_id?: string
                    created_at?: string
                }
            }
            event_types: {
                Row: {
                    id: string
                    label: string
                }
                Insert: {
                    id: string
                    label: string
                }
                Update: {
                    id?: string
                    label?: string
                }
            }
            provider_event_types: {
                Row: {
                    provider_id: string
                    event_type_id: string
                    created_at: string
                }
                Insert: {
                    provider_id: string
                    event_type_id: string
                    created_at?: string
                }
                Update: {
                    provider_id?: string
                    event_type_id?: string
                    created_at?: string
                }
            }
        }
    }
}
