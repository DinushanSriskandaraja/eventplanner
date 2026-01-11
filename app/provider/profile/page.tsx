"use client";

import { useState, useEffect } from "react";
import { Save, Upload, MapPin, Globe, Mail, Phone, X, Image as ImageIcon, Facebook, Instagram, Twitter, Linkedin, Youtube, Loader2 } from "lucide-react";
import { getProviderProfile, updateProviderProfile } from "./actions";
import { createClient } from "@/utils/supabase/client";
import imageCompression from 'browser-image-compression';

const CATEGORIES = [
    "Photography",
    "Videography",
    "Makeup Artist",
    "DJ & Music",
    "Decoration & Stage",
    "Event Planner",
    "Catering",
    "Venue"
];

const EVENT_TYPES = [
    "Wedding",
    "Birthday",
    "Corporate Event",
    "Engagement",
    "Baby Shower",
    "Anniversary",
    "Custom Event"
];

const SOCIAL_PLATFORMS = [
    { id: "facebook", label: "Facebook", icon: Facebook, placeholder: "https://facebook.com/yourpage" },
    { id: "instagram", label: "Instagram", icon: Instagram, placeholder: "https://instagram.com/yourhandle" },
    { id: "twitter", label: "Twitter", icon: Twitter, placeholder: "https://twitter.com/yourhandle" },
    { id: "linkedin", label: "LinkedIn", icon: Linkedin, placeholder: "https://linkedin.com/in/yourprofile" },
    { id: "youtube", label: "YouTube", icon: Youtube, placeholder: "https://youtube.com/@yourchannel" },
];

export default function ProviderProfilePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Form States
    const [businessName, setBusinessName] = useState("Lens & Lights Studio");
    const [about, setAbout] = useState("");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");

    // New Fields
    const [yearsOfExperience, setYearsOfExperience] = useState<number>(0);
    const [startingPrice, setStartingPrice] = useState<number>(0);

    const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
    const [bannerPhoto, setBannerPhoto] = useState<string | null>(null);
    const [profileFile, setProfileFile] = useState<File | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);

    const [socialMedia, setSocialMedia] = useState<Record<string, { enabled: boolean; url: string }>>({
        facebook: { enabled: false, url: "" },
        instagram: { enabled: false, url: "" },
        twitter: { enabled: false, url: "" },
        linkedin: { enabled: false, url: "" },
        youtube: { enabled: false, url: "" },
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const profile = await getProviderProfile()
            // Profile might be null if not created
            if (!profile) {
                // Redirect to create profile or something?
            }
            if (profile) {
                setBusinessName(profile.name || "");
                setAbout(profile.about || "");
                setLocation(profile.location || "");
                // setEmail(profile.contact_email || ""); // Schema might need contact info columns
                // setPhone(profile.contact_phone || "");
                // setWebsite(profile.website || "");
                setProfilePhoto(profile.image_url || null);
                setBannerPhoto(profile.banner_url || null);
                setYearsOfExperience(profile.years_of_experience || 0);
                setStartingPrice(profile.starting_price || 0);

                if (profile.services) setSelectedCategories(profile.services);
                if (profile.event_types) setSelectedEventTypes(profile.event_types);
                if (profile.social_media) {
                    // Merge saved social media with default structure
                    const savedSocial = profile.social_media as Record<string, { enabled: boolean; url: string }>;
                    setSocialMedia(prev => ({ ...prev, ...savedSocial }));
                }
            }
        } catch (error) {
            console.error("Error loading profile", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        const formData = new FormData();
        formData.append('name', businessName);
        formData.append('about', about);
        formData.append('location', location);
        formData.append('bannerUrl', bannerPhoto || "");
        formData.append('profileUrl', profilePhoto || "");
        formData.append('yearsOfExperience', yearsOfExperience.toString());
        formData.append('startingPrice', startingPrice.toString());

        formData.append('categories', JSON.stringify(selectedCategories));
        formData.append('eventTypes', JSON.stringify(selectedEventTypes));
        formData.append('socialMedia', JSON.stringify(socialMedia));

        // Append files if they exist
        if (profileFile) formData.append('profileImage', profileFile);
        if (bannerFile) formData.append('bannerImage', bannerFile);

        const result = await updateProviderProfile(formData);
        setIsSaving(false);
        if (result.error) {
            alert("Failed to save profile: " + result.error);
        } else {
            alert("Profile saved successfully!");
        }
    };

    // ... (Helper functions like toggleCategory remain mostly same, just updating state)
    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const toggleEventType = (eventType: string) => {
        setSelectedEventTypes(prev =>
            prev.includes(eventType)
                ? prev.filter(e => e !== eventType)
                : [...prev, eventType]
        );
    };

    const toggleSocialPlatform = (platform: string) => {
        setSocialMedia(prev => ({
            ...prev,
            [platform]: {
                ...prev[platform],
                enabled: !prev[platform].enabled,
            }
        }));
    };

    const updateSocialUrl = (platform: string, url: string) => {
        setSocialMedia(prev => ({
            ...prev,
            [platform]: {
                ...prev[platform],
                url
            }
        }));
    };

    // ... (Image upload handlers would go here, connecting to storage)
    const handlePhotoUpload = async (type: "profile" | "banner", file: File) => {
        try {
            console.log(`originalFile size ${file.size / 1024 / 1024} MB`);

            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: type === 'banner' ? 1920 : 800,
                useWebWorker: true,
            }

            const compressedFile = await imageCompression(file, options);
            console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`);

            // Save file for upload
            if (type === "profile") setProfileFile(compressedFile);
            else setBannerFile(compressedFile);

            // Local preview
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === "profile") setProfilePhoto(reader.result as string);
                else setBannerPhoto(reader.result as string);
            };
            reader.readAsDataURL(compressedFile);

        } catch (error) {
            console.log(error);
            alert("Image compression failed. Please try a different image.");
        }
    };

    if (isLoading) {
        return <div className="flex justify-center p-20"><Loader2 className="animate-spin w-8 h-8 text-zinc-400" /></div>;
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">My Profile</h1>
                    <p className="text-zinc-500">Manage your business details and public profile appearance.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg font-medium hover:bg-zinc-800 transition-colors shadow-sm disabled:opacity-50"
                    >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Changes
                    </button>
                </div>
            </div>

            {/* Profile & Banner Photos */}
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
                {/* Banner Photo */}
                <div className="relative h-48 bg-gradient-to-r from-indigo-100 to-purple-100">
                    {bannerPhoto && (
                        <img src={bannerPhoto} alt="Banner" className="w-full h-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <label className="cursor-pointer px-4 py-2 bg-white/90 text-zinc-900 rounded-lg font-medium flex items-center gap-2 hover:bg-white transition-colors">
                            <Upload className="w-4 h-4" />
                            Upload Banner
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => e.target.files?.[0] && handlePhotoUpload("banner", e.target.files[0])}
                            />
                        </label>
                    </div>
                </div>

                {/* Profile Photo */}
                <div className="px-8 -mt-16 pb-6">
                    <div className="relative w-32 h-32 group">
                        <div className="w-full h-full rounded-full border-4 border-white shadow-lg overflow-hidden bg-zinc-100">
                            {profilePhoto ? (
                                <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <ImageIcon className="w-12 h-12 text-zinc-400" />
                                </div>
                            )}
                        </div>
                        <label className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <Upload className="w-6 h-6 text-white" />
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => e.target.files?.[0] && handlePhotoUpload("profile", e.target.files[0])}
                            />
                        </label>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Business Details */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-zinc-100 shadow-sm space-y-6">
                    <h3 className="text-lg font-bold text-zinc-900 pb-2 border-b border-zinc-100">Business Details</h3>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-zinc-700">Business Name</label>
                        <input
                            type="text"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            className="w-full p-2.5 rounded-lg border border-zinc-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-zinc-700">About / Bio</label>
                        <textarea
                            rows={4}
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            className="w-full p-2.5 rounded-lg border border-zinc-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-zinc-700">Experience (Years)</label>
                            <input
                                type="number"
                                min="0"
                                value={yearsOfExperience}
                                onChange={(e) => setYearsOfExperience(parseInt(e.target.value) || 0)}
                                className="w-full p-2.5 rounded-lg border border-zinc-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-zinc-700">Starting Price (Rs.)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">Rs.</span>
                                <input
                                    type="number"
                                    min="0"
                                    value={startingPrice}
                                    onChange={(e) => setStartingPrice(parseFloat(e.target.value) || 0)}
                                    placeholder="15000"
                                    className="w-full pl-12 pr-4 p-2.5 rounded-lg border border-zinc-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact & Location */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-zinc-100 shadow-sm space-y-6">
                    <h3 className="text-lg font-bold text-zinc-900 pb-2 border-b border-zinc-100">Contact & Location</h3>

                    <div className="space-y-4">
                        <div className="relative">
                            <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
                            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City or Service Area" className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-zinc-200 outline-none focus:border-indigo-500 text-sm" />
                        </div>
                        {/* 
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-zinc-200 outline-none focus:border-indigo-500 text-sm" />
                        </div>
                        */}
                    </div>
                </div>
            </div>

            {/* Service Categories */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-zinc-100 shadow-sm">
                <h3 className="text-lg font-bold text-zinc-900 mb-4 pb-2 border-b border-zinc-100">Service Categories</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {CATEGORIES.map((category) => (
                        <label
                            key={category}
                            className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${selectedCategories.includes(category)
                                ? "border-indigo-600 bg-indigo-50"
                                : "border-zinc-200 hover:border-zinc-300"
                                }`}
                        >
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={() => toggleCategory(category)}
                                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                            />
                            <span className="text-sm font-medium text-zinc-900">{category}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Event Types Covered */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-zinc-100 shadow-sm">
                <h3 className="text-lg font-bold text-zinc-900 mb-4 pb-2 border-b border-zinc-100">Event Types Covered</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {EVENT_TYPES.map((eventType) => (
                        <label
                            key={eventType}
                            className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${selectedEventTypes.includes(eventType)
                                ? "border-indigo-600 bg-indigo-50"
                                : "border-zinc-200 hover:border-zinc-300"
                                }`}
                        >
                            <input
                                type="checkbox"
                                checked={selectedEventTypes.includes(eventType)}
                                onChange={() => toggleEventType(eventType)}
                                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                            />
                            <span className="text-sm font-medium text-zinc-900">{eventType}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-zinc-100 shadow-sm">
                <h3 className="text-lg font-bold text-zinc-900 mb-4 pb-2 border-b border-zinc-100">Social Media Links</h3>
                <div className="space-y-4">
                    {SOCIAL_PLATFORMS.map((platform) => {
                        const Icon = platform.icon;
                        const isEnabled = socialMedia[platform.id]?.enabled;

                        return (
                            <div key={platform.id} className="space-y-2">
                                <label className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 hover:border-zinc-300 cursor-pointer transition-all">
                                    <input
                                        type="checkbox"
                                        checked={isEnabled}
                                        onChange={() => toggleSocialPlatform(platform.id)}
                                        className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                    />
                                    <Icon className="w-5 h-5 text-zinc-600" />
                                    <span className="text-sm font-medium text-zinc-900">{platform.label}</span>
                                </label>

                                {isEnabled && (
                                    <div className="ml-7 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <input
                                            type="url"
                                            value={socialMedia[platform.id]?.url || ""}
                                            onChange={(e) => updateSocialUrl(platform.id, e.target.value)}
                                            placeholder={platform.placeholder}
                                            className="w-full p-2.5 rounded-lg border border-zinc-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
