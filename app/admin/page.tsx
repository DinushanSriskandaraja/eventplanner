"use client";

import {
    Users, Briefcase, Calendar, TrendingUp,
    MoreVertical, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import { useEffect, useState } from "react";
import { getAdminStats } from "./actions";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProviders: 0,
        pendingProviders: 0,
        totalRevenue: 0,
        totalEnquiries: 0
    });

    useEffect(() => {
        getAdminStats().then(setStats);
    }, []);

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Users", value: stats.totalUsers.toString(), change: "+X%", trend: "up", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Total Providers", value: stats.totalProviders.toString(), change: "+Y%", trend: "up", icon: Briefcase, color: "text-indigo-600", bg: "bg-indigo-50" },
                    { label: "Pending Verifications", value: stats.pendingProviders.toString(), change: "Action Needed", trend: "up", icon: Calendar, color: "text-amber-600", bg: "bg-amber-50" },
                    { label: "Total Enquiries", value: stats.totalEnquiries.toString(), change: "+Z%", trend: "up", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
                ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <span className={`flex items-center gap-1 text-sm font-medium ${stat.trend === "up" ? "text-emerald-600" : "text-rose-600"}`}>
                                    {stat.change}
                                    {stat.trend === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                </span>
                            </div>
                            <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
                            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Recent Registrations Table (Placeholder for now, connected to providers page later) */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">Recent Provider Registrations</h3>
                    <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">View All</button>
                </div>
                <div className="p-6 text-center text-slate-500">
                    View 'Providers' tab for detailed list.
                </div>
            </div>
        </div>
    );
}
