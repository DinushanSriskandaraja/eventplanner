"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Star, BadgeCheck, Clock, Share2, Heart, ChevronRight, Home, CheckCircle2, Calendar, Flag, X, Upload, AlertCircle, Send, User, Mail, Phone, Loader2, PlayCircle, Sparkles, LayoutGrid, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import { getProviderPublicProfile, createEnquiry } from "../../actions";

export default function ProfessionalProfilePage({ params }: { params: Promise<{ category: string; id: string }> }) {
    const { category, id } = use(params);
    const [professional, setProfessional] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Report State
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [reportType, setReportType] = useState("");
    const [reportDescription, setReportDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // Enquiry Form State
    const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
    const [isLoggedIn] = useState(true);
    const [enquiryForm, setEnquiryForm] = useState({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        eventDate: "",
        eventLocation: "",
        message: "",
    });
    const [enquirySubmitting, setEnquirySubmitting] = useState(false);
    const [enquirySuccess, setEnquirySuccess] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<any>(null);

    useEffect(() => {
        getProviderPublicProfile(id).then(data => {
            if (!data) {
                // Handle not found ideally, or just stay loading/show error
            }
            setProfessional(data);
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return <div className="min-h-screen bg-zinc-50 flex items-center justify-center"><Loader2 className="animate-spin w-8 h-8 text-zinc-400" /></div>;
    }

    if (!professional) {
        notFound();
    }

    const handleReportSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
                setIsReportModalOpen(false);
            }, 3000);
        }, 1500);
    };

    const handleEnquirySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEnquirySubmitting(true);

        const result = await createEnquiry({
            providerId: id,
            ...enquiryForm
        });

        setEnquirySubmitting(false);
        if (result?.success) {
            setEnquirySuccess(true);
            setTimeout(() => {
                setEnquirySuccess(false);
                setIsEnquiryModalOpen(false);
                setEnquiryForm({
                    name: "", email: "", phone: "",
                    eventType: "", eventDate: "", eventLocation: "", message: ""
                });
            }, 3000);
        } else {
            alert("Failed to send enquiry. Please try again.");
        }
    };

    // Use DB keys (snake_case)
    const displayImage = professional.image_url || null;
    const bannerImage = professional.banner_url || (professional.portfolio && professional.portfolio[0]?.src) || null;

    return (
        <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 pb-20">
            <Navbar />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-zinc-100 pt-24 pb-4">
                <div className="container mx-auto px-4 md:px-6">
                    <nav className="flex items-center text-sm text-zinc-500">
                        <Link href="/" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
                            <Home className="w-3.5 h-3.5" /> Home
                        </Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <Link href="/services" className="hover:text-indigo-600 transition-colors">
                            Services
                        </Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <Link href={`/services/${category}`} className="hover:text-indigo-600 transition-colors capitalize">
                            {category.replace(/-/g, ' ')}
                        </Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span className="text-zinc-900 font-medium truncate max-w-[200px]">{professional.name}</span>
                    </nav>
                </div>
            </div>

            <main className="container mx-auto px-4 md:px-6 py-8 animate-in fade-in duration-700 slide-in-from-bottom-4">
                {/* Main Content Column */}
                <div className="flex-1 w-full">

                    {/* Hero Card */}
                    <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden mb-8">
                        <div className="relative h-64 md:h-80 w-full bg-zinc-100">
                            {bannerImage ? (
                                <Image
                                    src={bannerImage}
                                    alt="Cover"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            ) : displayImage ? (
                                <Image
                                    src={displayImage}
                                    alt="Cover"
                                    fill
                                    className="object-cover blur-sm opacity-50"
                                />
                            ) : <div className="w-full h-full bg-slate-200" />}

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />

                            <div className="absolute top-4 right-4 flex gap-2">
                                <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur text-zinc-700 flex items-center justify-center hover:bg-white hover:text-red-500 transition-colors shadow-sm">
                                    <Heart className="w-5 h-5" />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur text-zinc-700 flex items-center justify-center hover:bg-white hover:text-indigo-600 transition-colors shadow-sm">
                                    <Share2 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setIsReportModalOpen(true)}
                                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur text-zinc-700 flex items-center justify-center hover:bg-white hover:text-red-500 transition-colors shadow-sm"
                                    title="Report this profile"
                                >
                                    <Flag className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="px-6 pb-6 md:px-10 md:pb-10 relative">
                            <div className="flex flex-col md:flex-row gap-6 items-start -mt-12">
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border-4 border-white shadow-lg overflow-hidden relative bg-white flex-shrink-0">
                                    {displayImage && <Image src={displayImage} alt={professional.name} fill className="object-cover" />}
                                </div>
                                <div className="flex-1 pt-2 md:pt-14">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <span className="text-indigo-600 font-bold text-sm tracking-wide uppercase">{professional.category}</span>
                                        {professional.is_verified && (
                                            <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium border border-emerald-100">
                                                <BadgeCheck className="w-3 h-3" /> Verified
                                            </span>
                                        )}
                                    </div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-2">{professional.name}</h1>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                                        <div className="flex items-center">
                                            <MapPin className="w-4 h-4 mr-1.5 text-zinc-400" /> {professional.location}
                                        </div>
                                        <div className="flex items-center">
                                            <Star className="w-4 h-4 mr-1.5 text-amber-500 fill-amber-500" />
                                            <span className="font-medium text-zinc-900 mr-1">{professional.rating}</span>
                                            ({professional.review_count || 0} Reviews)
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 mr-1.5 text-zinc-400" /> {professional.years_of_experience || 0} Years Exp.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mt-8">
                        {/* Left Column (Content) - The "Shop" Feed */}
                        <div className="md:col-span-2">

                            {/* Sticky Shop Nav */}
                            <div className="sticky top-20 z-40 bg-zinc-50/95 backdrop-blur-sm border-b border-zinc-200 mb-8 py-3 flex gap-6 overflow-x-auto hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                                <a href="#packages" className="flex items-center gap-2 font-bold text-zinc-900 border-b-2 border-indigo-600 pb-0.5">
                                    <Sparkles className="w-4 h-4" /> Packages
                                </a>
                                <a href="#portfolio" className="flex items-center gap-2 font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
                                    <LayoutGrid className="w-4 h-4" /> Gallery
                                </a>
                                <a href="#about" className="flex items-center gap-2 font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
                                    <Info className="w-4 h-4" /> Info
                                </a>
                            </div>

                            <div className="space-y-12">
                                {/* Packages (Shop Products) */}
                                <section id="packages" className="scroll-mt-32">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-zinc-900">Featured Packages</h2>
                                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
                                            {professional.packages?.length || 0} Available
                                        </span>
                                    </div>

                                    {professional.packages && professional.packages.length > 0 ? (
                                        <div className="grid grid-cols-1 gap-6">
                                            {professional.packages.map((pkg: any, idx: number) => (
                                                <div key={pkg.id} className="group bg-white rounded-3xl p-1 border border-zinc-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300">
                                                    <div className="bg-white rounded-[1.3rem] p-6 h-full flex flex-col relative overflow-hidden">
                                                        {/* Abstract Product Header */}
                                                        <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-br ${idx % 2 === 0 ? 'from-indigo-500/5 via-purple-500/5 to-blue-500/5' : 'from-rose-500/5 via-orange-500/5 to-amber-500/5'} -z-0`} />

                                                        <div className="relative z-10">
                                                            <div className="flex justify-between items-start mb-4">
                                                                <div>
                                                                    <h3 className="font-bold text-xl text-zinc-900 mb-1 group-hover:text-indigo-600 transition-colors">{pkg.name}</h3>
                                                                    <div className="flex gap-2">
                                                                        {pkg.event_types?.slice(0, 2).map((type: string, i: number) => (
                                                                            <span key={i} className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 bg-white/50 backdrop-blur border border-zinc-100 px-2 py-0.5 rounded-full">
                                                                                {type}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <div className="text-right bg-white/80 backdrop-blur px-3 py-1 rounded-xl border border-zinc-100 shadow-sm">
                                                                    <span className="block text-xl font-black text-zinc-900">
                                                                        {pkg.currency}{pkg.price.toLocaleString()}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <p className="text-zinc-600 text-sm leading-relaxed mb-6 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                                                                {pkg.description}
                                                            </p>

                                                            <div className="mt-auto pt-4 border-t border-dashed border-zinc-100 flex items-center gap-3">
                                                                <button
                                                                    onClick={() => {
                                                                        setEnquiryForm(prev => ({ ...prev, message: `I am interested in your "${pkg.name}" package. \n\n${prev.message}` }));
                                                                        setIsEnquiryModalOpen(true);
                                                                    }}
                                                                    className="flex-1 py-3 bg-zinc-900 text-white rounded-xl font-bold text-sm hover:bg-indigo-600 transition-all shadow-lg shadow-zinc-900/10 hover:shadow-indigo-600/20 flex items-center justify-center gap-2"
                                                                >
                                                                    Book This Package
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        setEnquiryForm(prev => ({ ...prev, message: `I have a question about the "${pkg.name}" package. \n\n${prev.message}` }));
                                                                        setIsEnquiryModalOpen(true);
                                                                    }}
                                                                    className="p-3 bg-zinc-50 text-zinc-600 rounded-xl hover:bg-white hover:text-indigo-600 hover:shadow-md transition-all border border-zinc-100"
                                                                    title="Ask a question"
                                                                >
                                                                    <Mail className="w-5 h-5" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 bg-white rounded-3xl border border-zinc-100 border-dashed">
                                            <p className="text-zinc-400">No packages currently available.</p>
                                        </div>
                                    )}
                                </section>

                                {/* Portfolio Section */}
                                <section id="portfolio" className="scroll-mt-32">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                                            Portfolio Gallery
                                        </h2>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {professional.portfolio?.map((item: any, idx: number) => (
                                            <div
                                                key={idx}
                                                className={`relative rounded-2xl overflow-hidden bg-zinc-100 group cursor-pointer border border-zinc-100 shadow-sm ${idx % 3 === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}
                                                onClick={() => setSelectedMedia(item)}
                                            >
                                                <Image src={item.src} alt={`Portfolio ${idx}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                                                    <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                                        {item.type === 'video' ? <PlayCircle className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
                                                        View
                                                    </div>
                                                </div>
                                                {item.type === 'video' && (
                                                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center border border-white/20">
                                                        <PlayCircle className="w-4 h-4 text-white" />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* About & Expertise */}
                                <section id="about" className="scroll-mt-32 space-y-8">
                                    <div className="bg-white p-6 md:p-10 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
                                        <h2 className="text-xl font-bold text-zinc-900 mb-4 flex items-center gap-2">
                                            <User className="w-5 h-5 text-indigo-500" /> Professional Bio
                                        </h2>
                                        <p className="text-zinc-600 leading-relaxed whitespace-pre-line text-lg font-light">
                                            {professional.about || professional.tagline}
                                        </p>
                                    </div>

                                    <div className="bg-white p-6 md:p-10 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
                                        <h2 className="text-xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
                                            <BadgeCheck className="w-5 h-5 text-indigo-500" /> Credentials
                                        </h2>
                                        <div className="flex flex-wrap gap-4">
                                            <div className="flex-1 min-w-[200px] bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                                                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Services</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {professional.services?.map((service: string, idx: number) => (
                                                        <span key={idx} className="text-sm font-semibold text-zinc-700 flex items-center gap-1.5">
                                                            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" /> {service}
                                                        </span>
                                                    )) || <span className="text-zinc-400 italic">No services listed.</span>}
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-[200px] bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                                                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Event Types</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {professional.event_types?.map((event: string, idx: number) => (
                                                        <span key={idx} className="px-3 py-1.5 bg-white text-zinc-700 rounded-lg text-xs font-medium border border-zinc-200 shadow-sm">
                                                            {event}
                                                        </span>
                                                    )) || <span className="text-zinc-400 italic">No event types listed.</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>

                        {/* Right Column (Reference: Airbnb/Contra Style) */}
                        <div className="md:col-span-1">
                            <div className="sticky top-28 space-y-6">
                                {/* Booking Card */}
                                <div className="bg-white p-6 rounded-[2rem] border border-zinc-100 shadow-xl shadow-zinc-200/40 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full -mr-24 -mt-24 transition-transform group-hover:scale-150 duration-700" />

                                    <div className="relative">
                                        <div className="mb-6 pb-6 border-b border-zinc-50">
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Starting Price</p>
                                                <div className="flex gap-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`w-3 h-3 ${i < Math.floor(professional.rating || 5) ? 'text-amber-400 fill-amber-400' : 'text-zinc-200'}`} />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex items-baseline gap-1">
                                                <p className="text-4xl font-black text-zinc-900 tracking-tight">
                                                    {professional.currency}{professional.starting_price?.toLocaleString()}
                                                </p>
                                                <span className="text-sm text-zinc-500 font-medium">/ event</span>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <button
                                                onClick={() => setIsEnquiryModalOpen(true)}
                                                className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-900/20 active:scale-[0.98] flex items-center justify-center gap-2 group/send"
                                            >
                                                Request Quote <Send className="w-5 h-5 group-hover/send:translate-x-1 transition-transform" />
                                            </button>
                                        </div>

                                        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-zinc-500 bg-zinc-50 py-3 rounded-xl border border-zinc-100/50">
                                            <Clock className="w-3.5 h-3.5 text-zinc-400" /> Typically responds in 24h
                                        </div>
                                    </div>
                                </div>

                                {/* Location / Map Card */}
                                <div className="bg-white p-6 rounded-[2rem] border border-zinc-100 shadow-lg shadow-zinc-100/50">
                                    <h3 className="font-bold text-zinc-900 mb-4 flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                                            <MapPin className="w-4 h-4 text-indigo-500" />
                                        </div>
                                        Location
                                    </h3>
                                    <p className="text-zinc-600 text-sm mb-4 pl-1">{professional.location}</p>
                                    <div className="h-40 bg-zinc-100 rounded-2xl relative overflow-hidden group border border-zinc-100">
                                        {/* Abstract Map Pattern */}
                                        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="bg-white p-3 rounded-full shadow-xl shadow-red-500/20 animate-bounce">
                                                <MapPin className="w-6 h-6 text-red-500 fill-red-500" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Media Viewer Modal */}
                    {selectedMedia && (
                        <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setSelectedMedia(null)}>
                            <button
                                onClick={() => setSelectedMedia(null)}
                                className="absolute top-4 right-4 p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <div className="relative w-full max-w-5xl max-h-[90vh] flex items-center justify-center" onClick={e => e.stopPropagation()}>
                                {selectedMedia.type === 'video' && selectedMedia.youtube_url ? (
                                    <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${selectedMedia.youtube_url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1]}?autoplay=1`}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                ) : (
                                    <div className="relative w-full h-[80vh]">
                                        <Image
                                            src={selectedMedia.src}
                                            alt="Full View"
                                            fill
                                            className="object-contain"
                                            priority
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </div>

                {/* Report Provider Modal */}
                {isReportModalOpen && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in zoom-in-95 duration-300">
                            {/* Modal Header with Gradient */}
                            <div className="relative bg-gradient-to-br from-red-500 via-red-600 to-rose-600 p-8 text-white overflow-hidden">
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
                                <div className="relative flex items-start justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center flex-shrink-0">
                                            <Flag className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold mb-1">Report Provider</h2>
                                            <p className="text-red-100 text-sm">Help us maintain quality and safety</p>
                                            <div className="mt-3 flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20 w-fit">
                                                <div className="w-6 h-6 rounded-full bg-white/20 overflow-hidden flex-shrink-0">
                                                    {displayImage && <Image src={displayImage} alt={professional.name} width={24} height={24} className="object-cover" />}
                                                </div>
                                                <span className="text-sm font-medium">{professional.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsReportModalOpen(false)}
                                        className="p-2 hover:bg-white/20 rounded-xl transition-colors backdrop-blur-sm"
                                    >
                                        <X className="w-6 h-6 text-white" />
                                    </button>
                                </div>
                            </div>

                            {/* Success Message */}
                            {showSuccessMessage && (
                                <div className="p-8 bg-gradient-to-br from-emerald-50 to-teal-50 border-b border-emerald-100">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/30">
                                            <CheckCircle2 className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-lg font-bold text-emerald-900 mb-1">Report Submitted Successfully!</p>
                                            <p className="text-emerald-700">Our team will review your report and take necessary action within 24-48 hours.</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Modal Form */}
                            {!showSuccessMessage && (
                                <form onSubmit={handleReportSubmit} className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                                    {/* Warning Alert */}
                                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-5 flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/30">
                                            <AlertCircle className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-amber-900 mb-1">Important Notice</p>
                                            <p className="text-sm text-amber-800 leading-relaxed">
                                                Please provide accurate information. False or malicious reports may result in account suspension.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Report Type */}
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-2 text-sm font-bold text-zinc-900">
                                            <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center">
                                                <span className="text-xs text-indigo-600">1</span>
                                            </div>
                                            Report Type <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            required
                                            value={reportType}
                                            onChange={(e) => setReportType(e.target.value)}
                                            className="w-full px-5 py-4 bg-gradient-to-br from-zinc-50 to-slate-50 border-2 border-zinc-200 rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-zinc-900 font-medium shadow-sm hover:shadow-md"
                                        >
                                            <option value="">Select a reason...</option>
                                            <option value="misconduct">🚫 Misconduct</option>
                                            <option value="fake-profile">⚠️ Fake Profile / Fraudulent Services</option>
                                            <option value="poor-quality">👎 Poor Service / Quality</option>
                                            <option value="inappropriate">🔞 Inappropriate Content</option>
                                            <option value="other">📝 Other</option>
                                        </select>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-2 text-sm font-bold text-zinc-900">
                                            <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center">
                                                <span className="text-xs text-indigo-600">2</span>
                                            </div>
                                            Detailed Description <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            required
                                            value={reportDescription}
                                            onChange={(e) => setReportDescription(e.target.value)}
                                            rows={5}
                                            placeholder="Please provide specific details about your concern. Include dates, incidents, or any relevant information..."
                                            className="w-full px-5 py-4 bg-gradient-to-br from-zinc-50 to-slate-50 border-2 border-zinc-200 rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none text-zinc-900 placeholder:text-zinc-400 shadow-sm hover:shadow-md"
                                        />
                                        <p className="text-xs text-zinc-500 ml-1">Minimum 20 characters required</p>
                                    </div>

                                    {/* Attachment */}
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-2 text-sm font-bold text-zinc-900">
                                            <div className="w-6 h-6 rounded-lg bg-zinc-100 flex items-center justify-center">
                                                <span className="text-xs text-zinc-600">3</span>
                                            </div>
                                            Supporting Evidence <span className="text-zinc-400 font-normal">(Optional)</span>
                                        </label>
                                        <label className="block border-2 border-dashed border-zinc-300 rounded-2xl p-8 text-center hover:border-indigo-500 hover:bg-indigo-50/50 transition-all cursor-pointer group bg-gradient-to-br from-zinc-50 to-slate-50">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-indigo-500/20">
                                                <Upload className="w-8 h-8 text-indigo-600" />
                                            </div>
                                            <p className="text-sm font-semibold text-zinc-900 mb-1">Click to upload files</p>
                                            <p className="text-xs text-zinc-500">Screenshots, documents, or evidence</p>
                                            <p className="text-xs text-zinc-400 mt-2">PNG, JPG, PDF • Max 5MB</p>
                                            <input type="file" className="hidden" accept="image/*,.pdf" />
                                        </label>
                                    </div>

                                    {/* Auto-filled Info */}
                                    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-indigo-100">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                                                <CheckCircle2 className="w-4 h-4 text-white" />
                                            </div>
                                            <p className="text-sm font-bold text-indigo-900 uppercase tracking-wide">Your Information</p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-indigo-100">
                                                <p className="text-xs text-indigo-600 font-medium mb-1">Name</p>
                                                <p className="text-sm text-zinc-900 font-bold">John Doe</p>
                                            </div>
                                            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-indigo-100">
                                                <p className="text-xs text-indigo-600 font-medium mb-1">Email</p>
                                                <p className="text-sm text-zinc-900 font-bold">john@example.com</p>
                                            </div>
                                            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-indigo-100">
                                                <p className="text-xs text-indigo-600 font-medium mb-1">Phone</p>
                                                <p className="text-sm text-zinc-900 font-bold">+1 (555) 123-4567</p>
                                            </div>
                                        </div>
                                        <p className="text-xs text-indigo-700 mt-3 flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" />
                                            This information will be shared with our moderation team
                                        </p>
                                    </div>

                                    {/* Modal Actions */}
                                    <div className="flex items-center gap-4 pt-4">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="flex-1 px-8 py-4 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-2xl font-bold hover:from-red-700 hover:to-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-red-600/30 hover:shadow-2xl hover:shadow-red-600/40 flex items-center justify-center gap-3 group"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    <span>Submitting Report...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Flag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                                    <span>Submit Report</span>
                                                </>
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsReportModalOpen(false)}
                                            className="px-8 py-4 bg-white text-zinc-700 border-2 border-zinc-200 rounded-2xl font-bold hover:bg-zinc-50 hover:border-zinc-300 transition-all shadow-sm hover:shadow-md"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                )}

                {/* Enquiry Form Modal */}
                {isEnquiryModalOpen && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in zoom-in-95 duration-300">
                            {/* Modal Header */}
                            <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 text-white overflow-hidden">
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
                                <div className="relative flex items-start justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center flex-shrink-0">
                                            <Send className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold mb-1">Send Enquiry</h2>
                                            <p className="text-indigo-100 text-sm">Get in touch with {professional.name}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsEnquiryModalOpen(false)}
                                        className="p-2 hover:bg-white/20 rounded-xl transition-colors backdrop-blur-sm"
                                    >
                                        <X className="w-6 h-6 text-white" />
                                    </button>
                                </div>
                            </div>

                            {/* Success Message */}
                            {enquirySuccess && (
                                <div className="p-8 bg-gradient-to-br from-emerald-50 to-teal-50 border-b border-emerald-100">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/30">
                                            <CheckCircle2 className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-lg font-bold text-emerald-900 mb-1">Enquiry Sent Successfully!</p>
                                            <p className="text-emerald-700">{professional.name} will get back to you within 24-48 hours.</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Enquiry Form */}
                            {!enquirySuccess && (
                                <form
                                    onSubmit={handleEnquirySubmit}
                                    className="p-8 space-y-6 max-h-[60vh] overflow-y-auto"
                                >
                                    {/* Contact Information */}
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border-2 border-blue-100">
                                        <h3 className="font-bold text-zinc-900 mb-4 flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                                                <User className="w-4 h-4 text-white" />
                                            </div>
                                            Your Contact Information
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-blue-700 mb-2">Name *</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={enquiryForm.name}
                                                    onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                                                    className="w-full px-4 py-3 bg-white border-2 border-blue-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                                    placeholder="Your name"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-blue-700 mb-2">Email *</label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={enquiryForm.email}
                                                    onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                                                    className="w-full px-4 py-3 bg-white border-2 border-blue-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                                    placeholder="your@email.com"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-blue-700 mb-2">Phone *</label>
                                                <input
                                                    type="tel"
                                                    required
                                                    value={enquiryForm.phone}
                                                    onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                                                    className="w-full px-4 py-3 bg-white border-2 border-blue-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                                    placeholder="+1 (555) 000-0000"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Event Details */}
                                    <div>
                                        <h3 className="font-bold text-zinc-900 mb-4 flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center">
                                                <Calendar className="w-4 h-4 text-white" />
                                            </div>
                                            Event Details
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-zinc-700 mb-2">Event Type *</label>
                                                <select
                                                    required
                                                    value={enquiryForm.eventType}
                                                    onChange={(e) => setEnquiryForm({ ...enquiryForm, eventType: e.target.value })}
                                                    className="w-full px-4 py-3 bg-gradient-to-br from-zinc-50 to-slate-50 border-2 border-zinc-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                                >
                                                    <option value="">Select event type...</option>
                                                    <option value="wedding">💒 Wedding</option>
                                                    <option value="birthday">🎂 Birthday</option>
                                                    <option value="corporate">💼 Corporate Event</option>
                                                    <option value="engagement">💍 Engagement</option>
                                                    <option value="baby-shower">👶 Baby Shower</option>
                                                    <option value="anniversary">🎉 Anniversary</option>
                                                    <option value="other">📝 Other</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-zinc-700 mb-2">Event Date *</label>
                                                <input
                                                    type="date"
                                                    required
                                                    value={enquiryForm.eventDate}
                                                    onChange={(e) => setEnquiryForm({ ...enquiryForm, eventDate: e.target.value })}
                                                    className="w-full px-4 py-3 bg-gradient-to-br from-zinc-50 to-slate-50 border-2 border-zinc-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <label className="block text-sm font-medium text-zinc-700 mb-2">Event Location *</label>
                                            <input
                                                type="text"
                                                required
                                                value={enquiryForm.eventLocation}
                                                onChange={(e) => setEnquiryForm({ ...enquiryForm, eventLocation: e.target.value })}
                                                placeholder="City, Venue, or Address"
                                                className="w-full px-4 py-3 bg-gradient-to-br from-zinc-50 to-slate-50 border-2 border-zinc-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-700 mb-2">Message / Additional Details *</label>
                                        <textarea
                                            required
                                            value={enquiryForm.message}
                                            onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                                            rows={4}
                                            placeholder="Tell us more about your event, requirements, budget, or any specific requests..."
                                            className="w-full px-4 py-3 bg-gradient-to-br from-zinc-50 to-slate-50 border-2 border-zinc-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none"
                                        />
                                    </div>

                                    {/* Optional Attachment */}
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-700 mb-2">Attachment (Optional)</label>
                                        <label className="block border-2 border-dashed border-zinc-300 rounded-2xl p-6 text-center hover:border-indigo-500 hover:bg-indigo-50/50 transition-all cursor-pointer group bg-gradient-to-br from-zinc-50 to-slate-50">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                                <Upload className="w-6 h-6 text-indigo-600" />
                                            </div>
                                            <p className="text-sm font-medium text-zinc-900 mb-1">Upload reference images or documents</p>
                                            <p className="text-xs text-zinc-500">PNG, JPG, PDF • Max 10MB</p>
                                            <input type="file" className="hidden" accept="image/*,.pdf" />
                                        </label>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex items-center gap-4 pt-4">
                                        <button
                                            type="submit"
                                            disabled={enquirySubmitting}
                                            className="flex-1 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-indigo-600/30 hover:shadow-2xl hover:shadow-indigo-600/40 flex items-center justify-center gap-3 group"
                                        >
                                            {enquirySubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    <span>Sending...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                    <span>Send Enquiry</span>
                                                </>
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsEnquiryModalOpen(false)}
                                            className="px-8 py-4 bg-white text-zinc-700 border-2 border-zinc-200 rounded-2xl font-bold hover:bg-zinc-50 hover:border-zinc-300 transition-all shadow-sm hover:shadow-md"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
