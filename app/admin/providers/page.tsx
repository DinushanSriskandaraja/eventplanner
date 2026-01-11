"use client";

import { useState, useEffect } from "react";
import {
    Search, Filter, MoreVertical,
    Eye, Ban, CheckCircle, XCircle, Trash2, X, Loader2, Edit3, Settings
} from "lucide-react";
import { getProviders, updateProviderStatus, updateProviderPlan, getPlans, deleteProvider } from "../actions";

interface Provider {
    id: string;
    business_name: string;
    representative: string;
    email: string;
    category: string;
    status: "Active" | "Pending" | "Suspended" | "Deactivated";
    plan: string;
    plan_id?: string;
    is_verified: boolean;
    profiles?: {
        full_name: string;
        email: string;
    }
}

interface Plan {
    id: string;
    name: string;
}

export default function ProvidersPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("All");
    const [categoryFilter, setCategoryFilter] = useState<string>("All");
    const [showFilters, setShowFilters] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [providers, setProviders] = useState<Provider[]>([]);
    const [availablePlans, setAvailablePlans] = useState<Plan[]>([]);

    // Modal for editing plan
    const [editingProvider, setEditingProvider] = useState<Provider | null>(null);
    const [selectedPlanId, setSelectedPlanId] = useState<string>("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        const [providersData, plansData] = await Promise.all([getProviders(), getPlans()]);

        if (providersData) {
            const transformed: Provider[] = providersData.map((p: any) => ({
                id: p.id,
                business_name: p.business_name || p.name || "N/A",
                representative: p.profiles?.full_name || "N/A",
                email: p.profiles?.email || "N/A",
                category: p.category || "Uncategorized",
                status: (p.status || (p.is_verified ? "Active" : "Pending")) as Provider['status'],
                plan: p.subscription_plans?.name || "Free",
                plan_id: p.plan_id,
                is_verified: p.is_verified
            }));
            setProviders(transformed);
        }

        if (plansData) {
            setAvailablePlans(plansData.map((p: any) => ({ id: p.id, name: p.name })));
        }

        setIsLoading(false);
    };

    const categories = ["All", "Photography", "Videography", "Makeup Artist", "DJ & Music", "Decoration & Stage", "Event Planner", "Catering", "Venue"];
    const statuses = ["All", "Active", "Pending", "Suspended", "Deactivated"];

    const handleStatusChange = async (id: string, newStatus: string) => {
        if (confirm(`Are you sure you want to change status to ${newStatus}?`)) {
            // Optimistic update
            setProviders(prev => prev.map(p => p.id === id ? { ...p, status: newStatus as any } : p));

            const result = await updateProviderStatus(id, newStatus);
            if (!result.success) {
                alert("Failed to update status");
                loadData(); // Revert
            }
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this provider? This action cannot be undone.")) {
            // Optimistic
            setProviders(prev => prev.filter(p => p.id !== id));

            const result = await deleteProvider(id);
            if (!result.success) {
                alert("Failed to delete provider: " + result.error);
                loadData(); // Revert
            }
        }
    };

    const openPlanModal = (provider: Provider) => {
        setEditingProvider(provider);
        setSelectedPlanId(provider.plan_id || "");
    };

    const handlePlanSave = async () => {
        if (!editingProvider) return;

        // Optimistic
        const planName = availablePlans.find(p => p.id === selectedPlanId)?.name || "Unknown";
        setProviders(prev => prev.map(p => p.id === editingProvider.id ? { ...p, plan: planName, plan_id: selectedPlanId } : p));
        setEditingProvider(null);

        const result = await updateProviderPlan(editingProvider.id, selectedPlanId);
        if (!result.success) {
            alert("Failed to update plan");
            loadData();
        }
    };

    const filteredProviders = providers.filter(provider => {
        const matchesSearch = provider.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            provider.representative.toLowerCase().includes(searchTerm.toLowerCase()) ||
            provider.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || provider.status === statusFilter;
        // Basic category matching (exact match for now, could be improved)
        const matchesCategory = categoryFilter === "All" || (provider.category && provider.category.includes(categoryFilter));

        return matchesSearch && matchesStatus && matchesCategory;
    });

    if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin w-8 h-8 text-slate-400" /></div>;

    return (
        <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search providers..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-medium transition-colors ${showFilters
                            ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                            }`}
                    >
                        <Filter className="w-5 h-5" />
                        Filter
                    </button>
                </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
                <div className="bg-white rounded-xl border border-slate-200 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 transition-all text-sm"
                            >
                                {statuses.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                        {/* ... Category Filter kept simple for brevity ... */}
                        <div className="flex items-end">
                            <button
                                onClick={() => { setStatusFilter("All"); setCategoryFilter("All"); }}
                                className="w-full px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors text-sm"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Providers Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                        <tr>
                            <th className="px-6 py-4">Business / Contact</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Plan</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredProviders.map((provider) => (
                            <tr key={provider.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="font-semibold text-slate-900">{provider.business_name}</p>
                                        <p className="text-xs text-slate-500">{provider.representative} • {provider.email}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">{provider.category}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-xs font-medium text-slate-600">
                                            {provider.plan}
                                        </span>
                                        <button
                                            onClick={() => openPlanModal(provider)}
                                            className="p-1 text-slate-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Change Plan"
                                        >
                                            <Edit3 className="w-3 h-3" />
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${provider.status === "Active" ? "bg-emerald-100 text-emerald-800" :
                                        provider.status === "Pending" ? "bg-amber-100 text-amber-800" :
                                            provider.status === "Suspended" ? "bg-rose-100 text-rose-800" :
                                                "bg-slate-100 text-slate-600"
                                        }`}>
                                        {provider.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">

                                        {/* Status Actions */}
                                        {provider.status === "Pending" && (
                                            <button onClick={() => handleStatusChange(provider.id, "Active")} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg" title="Approve">
                                                <CheckCircle className="w-4 h-4" />
                                            </button>
                                        )}

                                        {provider.status === "Active" && (
                                            <button onClick={() => handleStatusChange(provider.id, "Suspended")} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg" title="Suspend">
                                                <Ban className="w-4 h-4" />
                                            </button>
                                        )}

                                        {(provider.status === "Suspended" || provider.status === "Deactivated") && (
                                            <button onClick={() => handleStatusChange(provider.id, "Active")} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg" title="Reactivate">
                                                <CheckCircle className="w-4 h-4" />
                                            </button>
                                        )}

                                        <div className="relative group/menu">
                                            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg"><MoreVertical className="w-4 h-4" /></button>
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 hidden group-hover/menu:block z-10">
                                                <button onClick={() => handleStatusChange(provider.id, "Deactivated")} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 first:rounded-t-lg last:rounded-b-lg">
                                                    Deactivate Account
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleDelete(provider.id)}
                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredProviders.length === 0 && <div className="p-12 text-center text-slate-500">No providers found.</div>}
            </div>

            {/* Change Plan Modal */}
            {editingProvider && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 space-y-4">
                        <h3 className="text-lg font-bold text-slate-900">Change Subscription Plan</h3>
                        <p className="text-sm text-slate-500">Select a new plan for <span className="font-semibold">{editingProvider.business_name}</span>.</p>

                        <select
                            value={selectedPlanId}
                            onChange={(e) => setSelectedPlanId(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-600"
                        >
                            <option value="" disabled>Select a plan</option>
                            {availablePlans.map(plan => (
                                <option key={plan.id} value={plan.id}>{plan.name}</option>
                            ))}
                        </select>

                        <div className="flex gap-3 pt-2">
                            <button onClick={handlePlanSave} className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700">Save</button>
                            <button onClick={() => setEditingProvider(null)} className="flex-1 border border-slate-200 text-slate-700 py-2 rounded-lg font-medium hover:bg-slate-50">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
