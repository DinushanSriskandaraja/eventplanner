"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, MoreVertical, CreditCard, Users, Loader2 } from "lucide-react";
import { getPlans, deletePlan } from "../actions";

export default function AdminPlansPage() {
    const [filter, setFilter] = useState<"All" | "Active" | "Inactive">("All");
    const [plans, setPlans] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadPlans();
    }, []);

    const loadPlans = async () => {
        setIsLoading(true);
        const data = await getPlans();
        // Transform or use raw data. DB uses snake_case probably?
        // actions.ts getPlans returns select '*'.
        // My table create SQL used 'billing_cycle', 'leads_per_month', 'is_featured', 'status'.
        // The mock used camelCase. I should map or update UI to snake_case or just map it here.
        // Let's map for safety and consistency with existing UI code.
        const mapped = (data || []).map((p: any) => ({
            id: p.id,
            name: p.name,
            description: p.description,
            price: p.price,
            billingCycle: p.billing_cycle || p.billingCycle || "Monthly",
            status: p.status,
            subscribersCount: 0, // Not tracked in plan table yet
            leadsPerMonth: p.leads_per_month,
            featured: p.is_featured,
            priority: p.priority,
        }));
        setPlans(mapped);
        setIsLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this plan?")) {
            await deletePlan(id);
            loadPlans();
        }
    };

    const filteredPlans = plans.filter(plan => {
        if (filter === "All") return true;
        return plan.status === filter;
    });

    if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin w-8 h-8 text-slate-400" /></div>;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-indigo-600" />
                        </div>
                        Subscription Plans
                    </h1>
                    <p className="text-zinc-500 mt-1">Manage pricing plans for service providers</p>
                </div>
                <Link
                    href="/admin/plans/new"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-900/10"
                >
                    <Plus className="w-5 h-5" />
                    Add New Plan
                </Link>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
                {(["All", "Active", "Inactive"] as const).map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === status
                            ? "bg-zinc-900 text-white"
                            : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50"
                            }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* Plans Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-zinc-50 text-zinc-500 text-xs uppercase tracking-wider font-semibold">
                            <tr>
                                <th className="px-6 py-4">Plan Name</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Billing Cycle</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Subscribers</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {filteredPlans.map((plan) => (
                                <tr key={plan.id} className="hover:bg-zinc-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-bold text-zinc-900">{plan.name}</p>
                                            <p className="text-xs text-zinc-500 mt-0.5">{plan.description}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-bold text-zinc-900">
                                            {plan.price === 0 ? "Free" : `$${plan.price}`}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-zinc-600">{plan.billingCycle}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${plan.status === "Active"
                                                ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                                : "bg-zinc-100 text-zinc-600 border-zinc-200"
                                                }`}
                                        >
                                            {plan.status === "Active" && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                            )}
                                            {plan.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-zinc-600">
                                            <Users className="w-4 h-4 text-zinc-400" />
                                            {plan.subscribersCount}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/plans/${plan.id}`}
                                                className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                title="Edit Plan"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(plan.id)}
                                                className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete Plan"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredPlans.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-zinc-500">No plans found matching the selected filter.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
