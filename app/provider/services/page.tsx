"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, MoreHorizontal, DollarSign, X, Save, CheckCircle, Loader2 } from "lucide-react";
import { addPackage, getPackages, deletePackage, togglePackageStatus, type Package } from "./actions";

const EVENT_TYPES = [
    "Wedding",
    "Birthday",
    "Corporate",
    "Engagement",
    "Baby Shower",
    "Anniversary",
    "Other"
];

const DEFAULT_CURRENCY = "Rs. "; // Sri Lankan Rupees

export default function ProviderServicesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [packageForm, setPackageForm] = useState({
        name: "",
        description: "",
        eventTypes: [] as string[],
        price: "",
        isActive: true,
    });

    const [packages, setPackages] = useState<Package[]>([]);

    const fetchPackages = async () => {
        try {
            const data = await getPackages();
            setPackages(data);
        } catch (error) {
            console.error("Failed to fetch packages:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    const toggleEventType = (eventType: string) => {
        setPackageForm(prev => ({
            ...prev,
            eventTypes: prev.eventTypes.includes(eventType)
                ? prev.eventTypes.filter(e => e !== eventType)
                : [...prev.eventTypes, eventType]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('name', packageForm.name);
        formData.append('description', packageForm.description);
        formData.append('price', packageForm.price);
        formData.append('currency', DEFAULT_CURRENCY);
        formData.append('isActive', String(packageForm.isActive));
        formData.append('eventTypes', JSON.stringify(packageForm.eventTypes));

        const result = await addPackage(formData);

        setIsSubmitting(false);

        if (result.success) {
            setShowSuccess(true);
            fetchPackages(); // Refresh list

            setTimeout(() => {
                setShowSuccess(false);
                setIsModalOpen(false);
                setPackageForm({
                    name: "",
                    description: "",
                    eventTypes: [],
                    price: "",
                    isActive: true,
                });
            }, 1500);
        } else {
            alert("Failed to save package");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this package?")) return;

        // Optimistic update
        const originalPackages = [...packages];
        setPackages(packages.filter(p => p.id !== id));

        const result = await deletePackage(id);
        if (result.error) {
            alert("Failed to delete");
            setPackages(originalPackages); // Revert
        }
    };

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        // Optimistic update
        setPackages(packages.map(p => p.id === id ? { ...p, active: !currentStatus } : p));

        const result = await togglePackageStatus(id, currentStatus);
        if (result.error) {
            // Revert
            setPackages(packages.map(p => p.id === id ? { ...p, active: currentStatus } : p));
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">My Services</h1>
                    <p className="text-zinc-500">Manage your packages and service offerings.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg font-medium hover:bg-zinc-800 transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" /> Add New Package
                </button>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packages.map((service) => (
                        <div key={service.id} className="group bg-white rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-all">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <button
                                        onClick={() => handleToggleStatus(service.id, service.active)}
                                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${service.active ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}`}
                                    >
                                        {service.active ? 'ACTIVE' : 'INACTIVE'}
                                    </button>
                                    <button className="text-zinc-400 hover:text-zinc-600">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </div>

                                <h3 className="font-bold text-lg text-zinc-900 mb-2">{service.title}</h3>
                                <p className="text-sm text-zinc-500 mb-6 line-clamp-2 h-10">{service.desc}</p>

                                <div className="flex items-center gap-2 mb-4 flex-wrap h-16 content-start">
                                    {service.events.slice(0, 3).map((tag, idx) => (
                                        <span key={idx} className="text-xs px-2 py-1 bg-zinc-50 border border-zinc-100 text-zinc-600 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                    {service.events.length > 3 && (
                                        <span className="text-xs px-2 py-1 bg-zinc-50 text-zinc-400 rounded">+{service.events.length - 3}</span>
                                    )}
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                                    <div className="flex items-center font-bold text-zinc-900">
                                        <span className="text-zinc-400 mr-1 text-sm font-normal">Price:</span>
                                        {service.price}
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(service.id)}
                                            className="p-2 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add New Placeholder Card */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-zinc-200 hover:border-indigo-400 hover:bg-indigo-50/10 transition-colors group cursor-pointer h-full min-h-[300px]"
                    >
                        <div className="w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors mb-4">
                            <Plus className="w-6 h-6 text-zinc-400 group-hover:text-indigo-600" />
                        </div>
                        <span className="font-medium text-zinc-500 group-hover:text-indigo-600">Create New Package</span>
                    </button>
                </div>
            )}

            {/* Add Package Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in zoom-in-95 duration-300">
                        {/* Modal Header */}
                        <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 text-white overflow-hidden">
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
                            <div className="relative flex items-start justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center flex-shrink-0">
                                        <Plus className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold mb-1">Add New Package</h2>
                                        <p className="text-indigo-100 text-sm">Create a service package for your clients</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 hover:bg-white/20 rounded-xl transition-colors backdrop-blur-sm"
                                >
                                    <X className="w-6 h-6 text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Success Message */}
                        {showSuccess && (
                            <div className="p-8 bg-gradient-to-br from-emerald-50 to-teal-50 border-b border-emerald-100">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/30">
                                        <CheckCircle className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-lg font-bold text-emerald-900 mb-1">Package Created Successfully!</p>
                                        <p className="text-emerald-700">Your new package is now available for clients to view.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Form */}
                        {!showSuccess && (
                            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                                {/* Package Name */}
                                <div>
                                    <label className="block text-sm font-bold text-zinc-900 mb-2">
                                        Package Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={packageForm.name}
                                        onChange={(e) => setPackageForm({ ...packageForm, name: e.target.value })}
                                        placeholder="e.g., Wedding Photography Premium"
                                        className="w-full px-4 py-3 bg-gradient-to-br from-zinc-50 to-slate-50 border-2 border-zinc-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                    />
                                </div>

                                {/* What the Package Covers */}
                                <div>
                                    <label className="block text-sm font-bold text-zinc-900 mb-2">
                                        What the Package Covers <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        required
                                        value={packageForm.description}
                                        onChange={(e) => setPackageForm({ ...packageForm, description: e.target.value })}
                                        rows={4}
                                        placeholder="Full day coverage (8 hours), 300+ edited photos, digital album, online gallery..."
                                        className="w-full px-4 py-3 bg-gradient-to-br from-zinc-50 to-slate-50 border-2 border-zinc-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none"
                                    />
                                </div>

                                {/* Event Types */}
                                <div>
                                    <label className="block text-sm font-bold text-zinc-900 mb-3">
                                        Event Types <span className="text-red-500">*</span>
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {EVENT_TYPES.map((eventType) => (
                                            <label
                                                key={eventType}
                                                className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${packageForm.eventTypes.includes(eventType)
                                                    ? "border-indigo-600 bg-indigo-50"
                                                    : "border-zinc-200 hover:border-zinc-300 bg-white"
                                                    }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={packageForm.eventTypes.includes(eventType)}
                                                    onChange={() => toggleEventType(eventType)}
                                                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                                />
                                                <span className="text-sm font-medium text-zinc-900">{eventType}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {packageForm.eventTypes.length === 0 && (
                                        <p className="text-xs text-red-600 mt-2">Please select at least one event type</p>
                                    )}
                                </div>

                                {/* Price */}
                                <div>
                                    <div>
                                        <label className="block text-sm font-bold text-zinc-900 mb-2">
                                            Price (Rs.) <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">Rs.</span>
                                            <input
                                                type="number"
                                                required
                                                min="0"
                                                step="0.01"
                                                value={packageForm.price}
                                                onChange={(e) => setPackageForm({ ...packageForm, price: e.target.value })}
                                                placeholder="15000"
                                                className="w-full pl-14 pr-4 py-3 bg-gradient-to-br from-zinc-50 to-slate-50 border-2 border-zinc-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Status Toggle */}
                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border-2 border-purple-100">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-zinc-900 mb-1">Package Status</p>
                                            <p className="text-sm text-zinc-600">Make this package visible to clients</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setPackageForm({ ...packageForm, isActive: !packageForm.isActive })}
                                            className={`relative w-14 h-8 rounded-full transition-colors ${packageForm.isActive ? "bg-emerald-500" : "bg-zinc-300"
                                                }`}
                                        >
                                            <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${packageForm.isActive ? "translate-x-6" : "translate-x-0"
                                                }`} />
                                        </button>
                                    </div>
                                    <div className="mt-3">
                                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${packageForm.isActive ? "bg-emerald-100 text-emerald-700" : "bg-zinc-100 text-zinc-600"
                                            }`}>
                                            {packageForm.isActive ? "✓ Active" : "○ Inactive"}
                                        </span>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex items-center gap-4 pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || packageForm.eventTypes.length === 0}
                                        className="flex-1 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-indigo-600/30 hover:shadow-2xl hover:shadow-indigo-600/40 flex items-center justify-center gap-3 group"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span>Saving...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                                <span>Save Package</span>
                                            </>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
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
        </div>
    );
}
