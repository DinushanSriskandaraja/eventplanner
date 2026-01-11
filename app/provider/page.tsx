"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    Eye, MessageSquare, CreditCard, Activity,
    MoreVertical, CheckCircle2, Clock, AlertCircle, ArrowRight
} from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { getProviderStats, getRecentEnquiries } from "./actions";

function ProviderDashboardContent() {
    const searchParams = useSearchParams();
    const isOnboarding = searchParams.get("onboarding") === "true";

    const [stats, setStats] = useState<any>(null);
    const [enquiries, setEnquiries] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const [statsData, enquiriesData] = await Promise.all([
                    getProviderStats(),
                    getRecentEnquiries()
                ]);
                setStats(statsData);
                setEnquiries(enquiriesData);
            } catch (e) {
                console.error("Failed to load dashboard data", e);
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, []);

    if (isLoading) return <div className="p-10 text-center text-slate-400">Loading dashboard...</div>;

    return (
        <div className="space-y-8">

            {/* Onboarding Banner (Conditional) */}
            {isOnboarding && (
                <div className="bg-indigo-600 rounded-2xl p-6 md:p-8 text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-32 blur-3xl pointer-events-none" />
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-2xl md:text-3xl font-bold mb-3">Welcome to EventPlanner! 🎉</h2>
                        <p className="text-indigo-100 text-lg mb-6 leading-relaxed">
                            Your account has been created. To make your profile visible to thousands of potential clients, you need to complete your business profile and upload your portfolio.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/provider/profile" className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors flex items-center gap-2">
                                Complete Profile <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link href="/provider/portfolio" className="px-6 py-3 bg-indigo-700/50 text-white border border-indigo-500/30 rounded-xl font-medium hover:bg-indigo-700 transition-colors">
                                Upload Portfolio
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Regular Alert Banner (Hidden if onboarding) */}
            {!isOnboarding && !stats?.isVerified && (
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                        <h3 className="text-sm font-bold text-amber-900">Verification Pending</h3>
                        <p className="text-sm text-amber-700 mt-1">
                            Your profile is awaiting verification by our admin team. It will not be publicly visible until verified.
                        </p>
                    </div>
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Profile Status", value: stats?.isVerified ? "Active" : "Pending", subtext: stats?.isVerified ? "Visible to users" : "Under review", icon: Activity, color: stats?.isVerified ? "text-emerald-600" : "text-amber-600", bg: stats?.isVerified ? "bg-emerald-50" : "bg-amber-50" },
                    { label: "Total Views", value: stats?.totalViews?.toLocaleString() || "0", subtext: "All time views", icon: Eye, color: "text-indigo-600", bg: "bg-indigo-50" },
                    { label: "Total Enquiries", value: stats?.totalEnquiries?.toString() || "0", subtext: `${stats?.newEnquiries} new pending`, icon: MessageSquare, color: "text-amber-600", bg: "bg-amber-50" },
                    { label: "Subscription", value: stats?.subscriptionPlan, subtext: `Exp: ${stats?.subscriptionExpiry}`, icon: CreditCard, color: "text-purple-600", bg: "bg-purple-50" },
                ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                {stat.label === "Profile Status" && stats?.isVerified && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                                        Verified
                                    </span>
                                )}
                            </div>
                            <h3 className="text-zinc-500 text-sm font-medium">{stat.label}</h3>
                            <p className="text-2xl font-bold text-zinc-900 mt-1">{stat.value}</p>
                            <p className="text-xs text-zinc-400 mt-1">{stat.subtext}</p>
                        </div>
                    );
                })}
            </div>

            {/* Recent Enquiries Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
                <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-zinc-900">Recent Enquiries</h3>
                    <Link href="/provider/enquiries" className="text-sm text-indigo-600 font-medium hover:text-indigo-700 hover:underline">View All</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-zinc-50 text-zinc-500 text-xs uppercase tracking-wider font-semibold">
                            <tr>
                                <th className="px-6 py-4">Client Name</th>
                                <th className="px-6 py-4">Event Type</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {enquiries.length > 0 ? (
                                enquiries.map((row: any) => (
                                    <tr key={row.id} className="hover:bg-zinc-50/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-bold text-zinc-900">{row.client_name}</td>
                                        <td className="px-6 py-4 text-sm text-zinc-600">{row.event_type || "N/A"}</td>
                                        <td className="px-6 py-4 text-sm text-zinc-500">{new Date(row.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${row.status === "new" ? "bg-indigo-50 text-indigo-700 border-indigo-100" :
                                                    row.status === "responded" ? "bg-amber-50 text-amber-700 border-amber-100" :
                                                        "bg-zinc-100 text-zinc-600 border-zinc-200"
                                                }`}>
                                                {row.status === "new" && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />}
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={`/provider/enquiries?id=${row.id}`} className="text-zinc-400 hover:text-zinc-600 transition-colors p-1 hover:bg-zinc-100 rounded-lg inline-block">
                                                <MoreVertical className="w-5 h-5" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                                        No enquiries yet. Optimize your profile to get more visibility!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default function ProviderDashboard() {
    return (
        <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
            <ProviderDashboardContent />
        </Suspense>
    );
}
