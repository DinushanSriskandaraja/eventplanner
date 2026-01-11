"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
    Search,
    MapPin,
    Filter,
    Camera,
    Video,
    Palette,
    Scissors,
    Music,
    Mic,
    Gem,
    Speaker,
    CalendarCheck,
    ChevronDown,
    ArrowRight
} from "lucide-react";

const CATEGORIES = [
    { id: 1, name: "Photography", icon: Camera, desc: "Capture your best moments", color: "bg-blue-100 text-blue-600" },
    { id: 2, name: "Videography", icon: Video, desc: "Cinematic event films", color: "bg-red-100 text-red-600" },
    { id: 3, name: "Makeup Artist", icon: Palette, desc: "Glamour for your big day", color: "bg-pink-100 text-pink-600" },
    { id: 4, name: "Fashion Designer", icon: Scissors, desc: "Custom outfits & styling", color: "bg-purple-100 text-purple-600" },
    { id: 5, name: "DJ & Music", icon: Music, desc: "Keep the party moving", color: "bg-indigo-100 text-indigo-600" },
    { id: 6, name: "Live Band", icon: Mic, desc: "Soulful live performances", color: "bg-orange-100 text-orange-600" },
    { id: 7, name: "Event Host / Anchor", icon: Mic, desc: "Engage your audience", color: "bg-teal-100 text-teal-600" },
    { id: 8, name: "Decoration", icon: Gem, desc: "Stunning visual setups", color: "bg-rose-100 text-rose-600" },
    { id: 9, name: "Lighting & Sound", icon: Speaker, desc: "Set the perfect mood", color: "bg-yellow-100 text-yellow-600" },
    { id: 10, name: "Event Planner", icon: CalendarCheck, desc: "End-to-end management", color: "bg-green-100 text-green-600" },
];

export default function ServicesPage() {


    return (
        <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
            <Navbar />

            {/* Title Header */}
            <div className="pt-32 pb-12 bg-white border-b border-zinc-100">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Event Services</h1>
                    <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
                        Find the right professionals for your wedding, corporate event, or celebration.
                        Browse by category, location, and style.
                    </p>

                    {/* Search Bar */}
                    <div className="mt-8 max-w-3xl mx-auto bg-white rounded-full shadow-lg shadow-zinc-200/50 border border-zinc-200 p-2 flex flex-col md:flex-row gap-2">
                        <div className="flex-1 flex items-center px-4 h-12 border-b md:border-b-0 md:border-r border-zinc-100">
                            <Search className="w-5 h-5 text-zinc-400 mr-3" />
                            <input
                                type="text"
                                placeholder="Search service (e.g. Wedding Photographer)"
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

            <div className="container mx-auto px-4 md:px-6 py-12">
                {/* Main Content Grid */}
                <main>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {CATEGORIES.map((cat) => (
                            <Link href={`/services/${cat.name.toLowerCase().replace(/ /g, '-')}`} key={cat.id} className="group relative bg-white rounded-xl p-4 border border-zinc-100 shadow-sm hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col items-center text-center overflow-hidden">
                                <div className={`absolute top-0 inset-x-0 h-1 ${cat.color.split(' ')[0]}`}></div>
                                <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                                    <cat.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-sm font-bold text-zinc-900 mb-1 line-clamp-1">{cat.name}</h3>
                                <p className="text-xs text-zinc-500 mb-3 line-clamp-2 min-h-[2.5em]">{cat.desc}</p>
                                <span className="mt-auto w-full py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    Browse
                                </span>
                            </Link>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
