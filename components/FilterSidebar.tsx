"use client";

import { useState } from "react";
import { Search, MapPin, X } from "lucide-react";

interface FilterSidebarProps {
    className?: string;
    onClose?: () => void;
    isOpen?: boolean;
}

export default function FilterSidebar({ className, onClose, isOpen }: FilterSidebarProps) {
    return (
        <aside className={`${className} h-full`}>
            {isOpen && (
                <div className="flex justify-between items-center mb-6 lg:hidden">
                    <h2 className="text-xl font-bold">Filters</h2>
                    <button onClick={onClose} className="p-2 text-zinc-500 hover:bg-zinc-100 rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                </div>
            )}

            <div className="space-y-8">
                {/* Search */}
                <div>
                    <h3 className="font-semibold text-zinc-900 mb-4">Search</h3>
                    <div className="relative">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Name or Keyword"
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        />
                    </div>
                </div>

                {/* Location */}
                <div>
                    <h3 className="font-semibold text-zinc-900 mb-4">Location</h3>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="City or Area"
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        />
                    </div>
                </div>

                {/* Event Type (Swipeable) */}
                <div>
                    <h3 className="font-semibold text-zinc-900 mb-4">Event Type</h3>
                    <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 no-scrollbar">
                        {['All', 'Wedding', 'Birthday', 'Corporate', 'Engagement', 'Social'].map((type, i) => (
                            <button
                                key={type}
                                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${i === 0
                                        ? "bg-zinc-900 text-white border-zinc-900"
                                        : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>



                {/* Experience Level */}
                <div>
                    <h3 className="font-semibold text-zinc-900 mb-4">Experience</h3>
                    <div className="space-y-2.5">
                        {['Any', '1-3 Years', '3-5 Years', '5+ Years'].map((exp) => (
                            <label key={exp} className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input type="radio" name="experience" className="peer w-4 h-4 opacity-0 absolute" defaultChecked={exp === 'Any'} />
                                    <div className="w-4 h-4 rounded-full border border-zinc-300 peer-checked:border-indigo-600 peer-checked:border-[5px] transition-all"></div>
                                </div>
                                <span className="text-sm text-zinc-600 group-hover:text-zinc-900 transition-colors">{exp}</span>
                            </label>
                        ))}
                    </div>
                </div>


            </div>

            <div className="mt-8 pt-6 border-t border-zinc-100 flex gap-3">
                <button className="flex-1 py-2.5 rounded-xl border border-zinc-200 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">Clear</button>
                <button className="flex-1 py-2.5 rounded-xl bg-zinc-900 text-sm font-medium text-white hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-200/50">Apply</button>
            </div>
        </aside>
    );
}
