"use client";

import { useState } from "react";
import {
    Calendar, MapPin, Users, DollarSign,
    Heart, PartyPopper, Briefcase, Gem,
    Baby, Star, MoreHorizontal, Check,
    Info, ChevronRight, ArrowRight, Share2, Download
} from "lucide-react";
import Link from "next/link";

// Event Types Configuration
const EVENT_TYPES = [
    { id: "wedding", label: "Wedding", icon: Heart, color: "text-rose-500", bg: "bg-rose-50" },
    { id: "birthday", label: "Birthday", icon: PartyPopper, color: "text-amber-500", bg: "bg-amber-50" },
    { id: "corporate", label: "Corporate", icon: Briefcase, color: "text-blue-500", bg: "bg-blue-50" },
    { id: "engagement", label: "Engagement", icon: Gem, color: "text-purple-500", bg: "bg-purple-50" },
    { id: "baby-shower", label: "Baby Shower", icon: Baby, color: "text-pink-500", bg: "bg-pink-50" },
    { id: "anniversary", label: "Anniversary", icon: Star, color: "text-yellow-500", bg: "bg-yellow-50" },
    { id: "other", label: "Other", icon: MoreHorizontal, color: "text-gray-500", bg: "bg-gray-50" },
];

// Checklist Templates
const CHECKLIST_TEMPLATES: Record<string, { label: string; tip: string; category: string }[]> = {
    wedding: [
        { label: "Photography & Videography", tip: "Book at least 6-8 months in advance.", category: "photography" },
        { label: "Makeup Artist", tip: "Schedule a trial session first.", category: "beauty" },
        { label: "Bridal & Groom Wear", tip: "Start shopping 4-6 months early for fittings.", category: "fashion" },
        { label: "DJ / Band", tip: "Ask for a playlist or demo mix.", category: "music" },
        { label: "Decoration & Stage", tip: "Match themes with your venue colors.", category: "decor" },
        { label: "Invitations & Stationery", tip: "Send save-the-dates 6 months out.", category: "print" },
        { label: "Lighting & Sound", tip: "Crucial for ambiance and photos.", category: "tech" },
        { label: "Event Host / MC", tip: "Ensure they can engage your specific crowd.", category: "talent" },
    ],
    // Default fallback
    default: [
        { label: "Venue Booking", tip: "Secure your location first.", category: "venue" },
        { label: "Catering", tip: "Plan for dietary restrictions.", category: "food" },
        { label: "Guest List", tip: "Send invites early.", category: "admin" },
        { label: "Decoration", tip: "Set the mood with lights and flowers.", category: "decor" },
    ]
};

export default function PlanPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        eventType: "",
        date: "",
        location: "",
        guests: "",
        budget: ""
    });
    const [checklist, setChecklist] = useState<{ id: string; label: string; tip: string; category: string; checked: boolean }[]>([]);

    const handleGenerate = () => {
        if (!formData.eventType) return;

        const template = CHECKLIST_TEMPLATES[formData.eventType] || CHECKLIST_TEMPLATES["default"];
        const generatedList = template.map((item, idx) => ({
            ...item,
            id: `item-${idx}`,
            checked: false
        }));

        setChecklist(generatedList);
        setStep(2);
    };

    const toggleItem = (id: string) => {
        setChecklist(prev => prev.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    const progress = Math.round((checklist.filter(i => i.checked).length / checklist.length) * 100) || 0;

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            {/* Header */}
            <div className="container mx-auto px-4 mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                    Plan Your Event Smartly <br className="hidden md:block" />
                    <span className="text-indigo-600">Never Miss a Single Detail</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Select your event type, and we’ll generate a personalized checklist with all the essential services, vendors, and preparations.
                </p>
            </div>

            <div className="container mx-auto px-4 max-w-5xl">
                {step === 1 ? (
                    /* Step 1: Event Selection */
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 text-sm">1</span>
                                    Event Details
                                </h2>

                                <div className="space-y-4">
                                    <label className="block">
                                        <span className="text-sm font-medium text-slate-700">Event Date</span>
                                        <div className="mt-1 relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <input
                                                type="date"
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                                                value={formData.date}
                                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                                            />
                                        </div>
                                    </label>

                                    <label className="block">
                                        <span className="text-sm font-medium text-slate-700">Location / City</span>
                                        <div className="mt-1 relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <input
                                                type="text"
                                                placeholder="e.g. New York, NY"
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                                                value={formData.location}
                                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                            />
                                        </div>
                                    </label>

                                    <div className="grid grid-cols-2 gap-4">
                                        <label className="block">
                                            <span className="text-sm font-medium text-slate-700">Guest Count</span>
                                            <div className="mt-1 relative">
                                                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                                                    value={formData.guests}
                                                    onChange={e => setFormData({ ...formData, guests: e.target.value })}
                                                />
                                            </div>
                                        </label>
                                        <label className="block">
                                            <span className="text-sm font-medium text-slate-700">Budget Range</span>
                                            <div className="mt-1 relative">
                                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    type="text"
                                                    placeholder="$0.00"
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                                                    value={formData.budget}
                                                    onChange={e => setFormData({ ...formData, budget: e.target.value })}
                                                />
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 text-sm">2</span>
                                    Select Event Type
                                </h2>

                                <div className="grid grid-cols-2 gap-3">
                                    {EVENT_TYPES.map((type) => {
                                        const Icon = type.icon;
                                        const isSelected = formData.eventType === type.id;
                                        return (
                                            <button
                                                key={type.id}
                                                onClick={() => setFormData({ ...formData, eventType: type.id })}
                                                className={`p-4 rounded-xl border text-left transition-all group hover:scale-[1.02] ${isSelected
                                                    ? "border-indigo-500 bg-indigo-50/50 ring-2 ring-indigo-200"
                                                    : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
                                                    }`}
                                            >
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${type.bg} ${type.color}`}>
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <span className={`font-semibold block ${isSelected ? "text-indigo-900" : "text-slate-700"}`}>
                                                    {type.label}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-slate-100 flex justify-end">
                            <button
                                onClick={handleGenerate}
                                disabled={!formData.eventType}
                                className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 flex items-center gap-2"
                            >
                                Generate My Checklist
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Step 2 & 3: Checklist & Progress */
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Progress Header */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24 z-30">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900">Your {formData.eventType ? EVENT_TYPES.find(t => t.id === formData.eventType)?.label : "Event"} Plan</h2>
                                    <p className="text-slate-500 text-sm mt-1">
                                        {formData.location && `${formData.location} • `}
                                        {formData.date && `${new Date(formData.date).toLocaleDateString()} • `}
                                        {progress}% Completed
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <button className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Share">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Export PDF">
                                        <Download className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        {/* Checklist Grid */}
                        <div className="grid md:grid-cols-2 gap-4">
                            {checklist.map((item) => (
                                <div
                                    key={item.id}
                                    className={`group p-5 bg-white rounded-xl border transition-all duration-200 ${item.checked
                                        ? "border-green-200 bg-green-50/30"
                                        : "border-slate-200 hover:border-indigo-300 hover:shadow-md"
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <button
                                            onClick={() => toggleItem(item.id)}
                                            className={`mt-1 w-6 h-6 rounded-md border flex items-center justify-center transition-all ${item.checked
                                                ? "bg-green-500 border-green-500 text-white"
                                                : "border-slate-300 text-transparent hover:border-indigo-500"
                                                }`}
                                        >
                                            <Check className="w-4 h-4" strokeWidth={3} />
                                        </button>

                                        <div className="flex-1">
                                            <h3 className={`font-semibold text-lg mb-1 transition-colors ${item.checked ? "text-slate-500 line-through" : "text-slate-900"
                                                }`}>
                                                {item.label}
                                            </h3>

                                            <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                                                <Info className="w-4 h-4 text-indigo-500" />
                                                <span>{item.tip}</span>
                                            </div>

                                            <Link
                                                href={`/services?category=${item.category}`}
                                                className={`inline-flex items-center text-sm font-medium transition-colors ${item.checked ? "text-slate-400" : "text-indigo-600 hover:text-indigo-700"
                                                    }`}
                                            >
                                                View Professionals <ChevronRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between items-center pt-8 border-t border-slate-200">
                            <button
                                onClick={() => setStep(1)}
                                className="text-slate-500 hover:text-slate-900 font-medium px-4 py-2"
                            >
                                ← Update Event Details
                            </button>
                            <Link
                                href="/services"
                                className="bg-slate-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
                            >
                                Book Professionals Now
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
