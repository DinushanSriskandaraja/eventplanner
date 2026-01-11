"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Info } from "lucide-react";
import { createPlan } from "../../actions";

export default function NewPlanPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        // Plan Basics
        name: "",
        description: "",
        status: true,

        // Pricing & Billing
        price: "",
        billingCycle: "Monthly",
        discountPrice: "",
        trialPeriod: "",

        // Visibility & Leads
        leadsPerMonth: "",
        featured: false,
        priority: "Normal",
        showInRecommendations: true,

        // Profile Limits
        maxPortfolioUploads: "",
        servicesAllowed: "",
        eventTypesAllowed: "",

        // Extras & Support
        analyticsAccess: false,
        prioritySupport: false,
        customBadge: "None",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const payload = {
            name: formData.name,
            description: formData.description,
            price: Number(formData.price),
            billing_cycle: formData.billingCycle,
            status: formData.status ? "Active" : "Inactive",
            leads_per_month: Number(formData.leadsPerMonth),
            is_featured: formData.featured,
            priority: formData.priority,
            features: {
                discount_price: formData.discountPrice,
                trial_period: formData.trialPeriod,
                show_in_recommendations: formData.showInRecommendations,
                max_portfolio_uploads: formData.maxPortfolioUploads,
                services_allowed: formData.servicesAllowed,
                event_types_allowed: formData.eventTypesAllowed,
                analytics_access: formData.analyticsAccess,
                priority_support: formData.prioritySupport,
                custom_badge: formData.customBadge
            }
        };

        const result = await createPlan(payload);

        setIsLoading(false);
        if (result.success) {
            router.push("/admin/plans");
        } else {
            alert("Failed to create plan: " + (result.error || "Unknown error"));
        }
    };

    const updateField = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="space-y-8 max-w-4xl">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/plans"
                    className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-zinc-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Create New Plan</h1>
                    <p className="text-zinc-500 mt-1">Configure a new subscription plan for service providers</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Plan Basics */}
                <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 md:p-8">
                    <h2 className="text-lg font-bold text-zinc-900 mb-6">Plan Basics</h2>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">
                                Plan Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => updateField("name", e.target.value)}
                                placeholder="e.g., Professional"
                                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">
                                Short Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => updateField("description", e.target.value)}
                                placeholder="Brief description of the plan"
                                rows={3}
                                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all resize-none"
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl">
                            <div>
                                <p className="font-medium text-zinc-900">Active Status</p>
                                <p className="text-sm text-zinc-500">Make this plan available to users</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => updateField("status", !formData.status)}
                                className={`relative w-14 h-7 rounded-full transition-colors ${formData.status ? "bg-indigo-600" : "bg-zinc-300"
                                    }`}
                            >
                                <span
                                    className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${formData.status ? "translate-x-7" : ""
                                        }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Pricing & Billing */}
                <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 md:p-8">
                    <h2 className="text-lg font-bold text-zinc-900 mb-6">Pricing & Billing</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">
                                Price (USD) <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-3.5 text-zinc-500">$</span>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={(e) => updateField("price", e.target.value)}
                                    placeholder="0.00"
                                    className="w-full pl-8 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">
                                Billing Cycle <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.billingCycle}
                                onChange={(e) => updateField("billingCycle", e.target.value)}
                                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                            >
                                <option>Monthly</option>
                                <option>Quarterly</option>
                                <option>Yearly</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2 flex items-center gap-2">
                                Discount Price (Optional)
                                <span className="group relative">
                                    <Info className="w-4 h-4 text-zinc-400 cursor-help" />
                                    <span className="invisible group-hover:visible absolute left-6 -top-2 w-48 p-2 bg-zinc-900 text-white text-xs rounded-lg">
                                        Promotional price to display
                                    </span>
                                </span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-3.5 text-zinc-500">$</span>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={formData.discountPrice}
                                    onChange={(e) => updateField("discountPrice", e.target.value)}
                                    placeholder="0.00"
                                    className="w-full pl-8 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">
                                Trial Period (Days)
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={formData.trialPeriod}
                                onChange={(e) => updateField("trialPeriod", e.target.value)}
                                placeholder="0"
                                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Visibility & Leads */}
                <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 md:p-8">
                    <h2 className="text-lg font-bold text-zinc-900 mb-6">Visibility & Leads</h2>
                    <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-2">
                                    Leads per Month <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    value={formData.leadsPerMonth}
                                    onChange={(e) => updateField("leadsPerMonth", e.target.value)}
                                    placeholder="e.g., 20"
                                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                                />
                                <p className="text-xs text-zinc-500 mt-1">Use -1 for unlimited</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-2">
                                    Priority Level
                                </label>
                                <select
                                    value={formData.priority}
                                    onChange={(e) => updateField("priority", e.target.value)}
                                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                                >
                                    <option>Normal</option>
                                    <option>High</option>
                                    <option>Top</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl">
                            <div>
                                <p className="font-medium text-zinc-900">Featured Listing</p>
                                <p className="text-sm text-zinc-500">Show in featured section</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => updateField("featured", !formData.featured)}
                                className={`relative w-14 h-7 rounded-full transition-colors ${formData.featured ? "bg-indigo-600" : "bg-zinc-300"
                                    }`}
                            >
                                <span
                                    className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${formData.featured ? "translate-x-7" : ""
                                        }`}
                                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl">
                            <div>
                                <p className="font-medium text-zinc-900">Show in Let's Plan Recommendations</p>
                                <p className="text-sm text-zinc-500">Include in AI-powered recommendations</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => updateField("showInRecommendations", !formData.showInRecommendations)}
                                className={`relative w-14 h-7 rounded-full transition-colors ${formData.showInRecommendations ? "bg-indigo-600" : "bg-zinc-300"
                                    }`}
                            >
                                <span
                                    className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${formData.showInRecommendations ? "translate-x-7" : ""
                                        }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Profile Limits */}
                <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 md:p-8">
                    <h2 className="text-lg font-bold text-zinc-900 mb-6">Profile Limits</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">
                                Max Portfolio Uploads
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={formData.maxPortfolioUploads}
                                onChange={(e) => updateField("maxPortfolioUploads", e.target.value)}
                                placeholder="e.g., 20"
                                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">
                                Services Allowed
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={formData.servicesAllowed}
                                onChange={(e) => updateField("servicesAllowed", e.target.value)}
                                placeholder="e.g., 5"
                                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">
                                Event Types Allowed
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={formData.eventTypesAllowed}
                                onChange={(e) => updateField("eventTypesAllowed", e.target.value)}
                                placeholder="e.g., 10"
                                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                            />
                        </div>
                    </div>
                    <p className="text-xs text-zinc-500 mt-4">Leave blank or use -1 for unlimited</p>
                </div>

                {/* Extras & Support */}
                <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 md:p-8">
                    <h2 className="text-lg font-bold text-zinc-900 mb-6">Extras & Support</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl">
                            <div>
                                <p className="font-medium text-zinc-900">Analytics Access</p>
                                <p className="text-sm text-zinc-500">Advanced insights and reporting</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => updateField("analyticsAccess", !formData.analyticsAccess)}
                                className={`relative w-14 h-7 rounded-full transition-colors ${formData.analyticsAccess ? "bg-indigo-600" : "bg-zinc-300"
                                    }`}
                            >
                                <span
                                    className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${formData.analyticsAccess ? "translate-x-7" : ""
                                        }`}
                                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl">
                            <div>
                                <p className="font-medium text-zinc-900">Priority Support</p>
                                <p className="text-sm text-zinc-500">Faster response times</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => updateField("prioritySupport", !formData.prioritySupport)}
                                className={`relative w-14 h-7 rounded-full transition-colors ${formData.prioritySupport ? "bg-indigo-600" : "bg-zinc-300"
                                    }`}
                            >
                                <span
                                    className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${formData.prioritySupport ? "translate-x-7" : ""
                                        }`}
                                />
                            </button>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">
                                Custom Profile Badge
                            </label>
                            <select
                                value={formData.customBadge}
                                onChange={(e) => updateField("customBadge", e.target.value)}
                                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                            >
                                <option>None</option>
                                <option>Verified</option>
                                <option>Featured</option>
                                <option>Premium</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center gap-4 pt-6 border-t border-zinc-100">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-8 py-3 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-zinc-900/10 flex items-center gap-2"
                    >
                        <Save className="w-5 h-5" />
                        {isLoading ? "Creating..." : "Create Plan"}
                    </button>
                    <Link
                        href="/admin/plans"
                        className="px-8 py-3 bg-white text-zinc-900 border border-zinc-200 rounded-xl font-bold hover:bg-zinc-50 transition-colors"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
