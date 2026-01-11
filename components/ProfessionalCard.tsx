"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, BadgeCheck, Clock, ArrowRight } from "lucide-react";

export interface Professional {
    id: string;
    name: string;
    category: string;
    location: string;
    experience: number;
    rating: number;
    reviewCount: number;
    startingPrice: number;
    currency: string;
    imageUrl: string; // Keep for backward compatibility or fallback
    bannerUrl?: string; // New
    profileUrl?: string; // New
    tagline: string;
    isVerified: boolean;
    isFeatured: boolean;
    about?: string;
    services?: string[];
    eventTypes?: string[];
    portfolio?: string[];
}

interface ProfessionalCardProps {
    professional: Professional;
}

export default function ProfessionalCard({ professional }: ProfessionalCardProps) {
    const mainImage = professional.bannerUrl || professional.imageUrl || "/placeholder-banner.jpg"; // Basic fallback
    const avatarImage = professional.profileUrl;

    return (
        <div className="group bg-white rounded-2xl border border-zinc-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 overflow-hidden flex flex-col h-full">
            {/* Image Section */}
            <div className="relative h-48 w-full overflow-hidden bg-zinc-100">
                <Image
                    src={mainImage}
                    alt={professional.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {professional.isFeatured && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        FEATURED
                    </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-zinc-900 text-xs font-bold px-2 py-1 rounded-lg shadow-sm flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    {professional.rating} <span className="text-zinc-400 font-normal">({professional.reviewCount})</span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide">{professional.category}</span>
                        {professional.isVerified && (
                            <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium border border-emerald-100">
                                <BadgeCheck className="w-3 h-3" /> Verified
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                        {avatarImage && (
                            <div className="relative w-10 h-10 flex-shrink-0">
                                <Image
                                    src={avatarImage}
                                    alt={professional.name}
                                    fill
                                    className="rounded-full object-cover border border-zinc-100"
                                />
                            </div>
                        )}
                        <div>
                            <h3 className="text-lg font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                                {professional.name}
                            </h3>
                            <p className="text-sm text-zinc-500 line-clamp-1">{professional.tagline}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-zinc-600">
                        <MapPin className="w-4 h-4 mr-2 text-zinc-400" />
                        {professional.location}
                    </div>
                    <div className="flex items-center text-sm text-zinc-600">
                        <Clock className="w-4 h-4 mr-2 text-zinc-400" />
                        {professional.experience} Years Experience
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-zinc-400">Starting from</p>
                        <p className="text-lg font-bold text-zinc-900">
                            {professional.currency}{professional.startingPrice.toLocaleString()}
                        </p>
                    </div>
                    <Link
                        href={`/services/${professional.category.toLowerCase()}/${professional.id}`}
                        className="w-10 h-10 rounded-full bg-zinc-100 text-zinc-900 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-all duration-300"
                    >
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                    <Link
                        href={`/services/${professional.category.toLowerCase()}/${professional.id}`}
                        className="text-center py-2 rounded-lg border border-zinc-200 text-sm font-medium text-zinc-700 hover:border-indigo-600 hover:text-indigo-600 transition-colors"
                    >
                        View Profile
                    </Link>
                    <button className="text-center py-2 rounded-lg bg-zinc-900 text-sm font-medium text-white hover:bg-zinc-800 transition-colors shadow-sm shadow-zinc-200">
                        Enquire Now
                    </button>
                </div>
            </div>
        </div>
    );
}
