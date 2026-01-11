"use client";

import { useState, use, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Filter, ChevronRight, Home, Search, MapPin, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProfessionalCard, { Professional } from "@/components/ProfessionalCard";
import BottomCTA from "@/components/BottomCTA";
import { getPublicProviders } from "../actions";

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = use(params);
    const [professionals, setProfessionals] = useState<Professional[]>([]);
    const [loading, setLoading] = useState(true);

    // Normalize category for lookup (e.g., "makeup-artist" -> "makeup")
    const categoryKeyMap: Record<string, string> = {
        'photography': 'photography',
        'videography': 'videography',
        'makeup-artist': 'makeup',
        'dj-music': 'dj',
        'dj': 'dj',
    };

    const dataKey = categoryKeyMap[category] || category;

    useEffect(() => {
        getPublicProviders({ category: dataKey }).then(data => {
            const mapped: Professional[] = data.map((p: any) => ({
                id: p.id,
                name: p.name,
                category: p.category || category,
                location: p.location,
                experience: p.years_of_experience || 0,
                rating: p.rating || 0,
                reviewCount: p.review_count || 0,
                startingPrice: p.starting_price || 0,
                currency: 'Rs. ',
                imageUrl: p.image_url,
                bannerUrl: p.banner_url,
                profileUrl: p.image_url,
                portfolio: [], // No portfolio in listing yet
                tagline: "Professional Service Provider", // Mock if missing
                isVerified: p.is_verified,
                isFeatured: false,
                about: "",
                services: p.services || [],
                eventTypes: []
            }));
            setProfessionals(mapped);
            setLoading(false);
        });
    }, [dataKey]);

    // Format display title
    const displayTitle = category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return (
        <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
            <Navbar />

            {/* Header Section */}
            <div className="pt-32 pb-8 bg-white border-b border-zinc-100">
                <div className="container mx-auto px-4 md:px-6">
                    {/* Breadcrumb */}
                    <nav className="flex items-center text-sm text-zinc-500 mb-6">
                        <Link href="/" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
                            <Home className="w-3.5 h-3.5" /> Home
                        </Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <Link href="/services" className="hover:text-indigo-600 transition-colors">
                            Services
                        </Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span className="text-zinc-900 font-medium">{displayTitle}</span>
                    </nav>

                    <div className="text-center max-w-3xl mx-auto mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">{displayTitle} Professionals</h1>
                        <p className="text-lg text-zinc-500">
                            Browse verified {displayTitle.toLowerCase()} professionals for your event. Compare prices, view portfolios, and book the best.
                        </p>
                    </div>

                    {/* Search Bar - Matching Services Page */}
                    <div className="max-w-3xl mx-auto bg-white rounded-full shadow-lg shadow-zinc-200/50 border border-zinc-200 p-2 flex flex-col md:flex-row gap-2">
                        <div className="flex-1 flex items-center px-4 h-12 border-b md:border-b-0 md:border-r border-zinc-100">
                            <Search className="w-5 h-5 text-zinc-400 mr-3" />
                            <input
                                type="text"
                                placeholder={`Search ${displayTitle.toLowerCase()}...`}
                                className="w-full bg-transparent outline-none text-zinc-700 placeholder:text-zinc-400"
                            />
                        </div>
                        <div className="flex-1 flex items-center px-4 h-12">
                            <MapPin className="w-5 h-5 text-zinc-400 mr-3" />
                            <input
                                type="text"
                                placeholder="Location (City or Area)"
                                className="w-full bg-transparent outline-none text-zinc-700 placeholder:text-zinc-400"
                            />
                        </div>
                        <button className="bg-zinc-900 text-white px-8 h-12 rounded-full font-medium hover:bg-zinc-800 transition-colors">
                            Search
                        </button>
                    </div>

                    {/* Event Type Pills */}
                    <div className="mt-6 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-2">
                        {['All Events', 'Wedding', 'Birthday', 'Corporate', 'Engagement', 'Social Gathering', 'Concert'].map((type, i) => (
                            <button
                                key={type}
                                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${i === 0
                                    ? "bg-zinc-900 text-white shadow-lg shadow-zinc-900/20"
                                    : "bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-8">
                {/* Main Content */}
                <main className="flex-1">
                    {loading ? (
                        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-zinc-400" /></div>
                    ) : professionals.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {professionals.map((pro) => (
                                <ProfessionalCard key={pro.id} professional={pro} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border border-zinc-100 border-dashed">
                            <h3 className="text-xl font-bold text-zinc-900 mb-2">No professionals found</h3>
                            <p className="text-zinc-500 mb-6">
                                We couldn't find any {displayTitle.toLowerCase()} professionals matching your criteria.
                            </p>
                            <button onClick={() => window.location.href = '/services'} className="px-6 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-medium hover:bg-indigo-100 transition-colors">
                                Browse all categories
                            </button>
                        </div>
                    )}
                </main>
            </div>

            <BottomCTA />
        </div>
    );
}
