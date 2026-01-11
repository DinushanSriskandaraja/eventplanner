"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Eye, MessageSquare, CheckCircle2, Loader2, XCircle, Clock } from "lucide-react";
import { getEnquiries, updateEnquiryStatus, type Enquiry } from "./actions";

export default function ProviderEnquiriesPage() {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'new' | 'responded' | 'booked' | 'closed'>('all');

    const fetchEnquiries = async () => {
        try {
            const data = await getEnquiries();
            setEnquiries(data);
        } catch (error) {
            console.error("Failed to fetch enquiries:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const handleStatusUpdate = async (id: string, newStatus: Enquiry['status']) => {
        // Optimistic update
        setEnquiries(enquiries.map(e => e.id === id ? { ...e, status: newStatus } : e));

        const result = await updateEnquiryStatus(id, newStatus);
        if (result.error) {
            alert("Failed to update status");
            fetchEnquiries(); // Revert/Refresh
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
            case 'responded': return 'bg-amber-50 text-amber-700 border-amber-100';
            case 'booked': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'closed': return 'bg-zinc-100 text-zinc-600 border-zinc-200';
            default: return 'bg-zinc-100 text-zinc-600 border-zinc-200';
        }
    };

    const filteredEnquiries = enquiries.filter(enc => filter === 'all' || enc.status === filter);

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Enquiries</h1>
                    <p className="text-zinc-500">Manage your leads and client communications.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
                        <input type="text" placeholder="Search client..." className="pl-9 pr-4 py-2 w-64 rounded-lg border border-zinc-200 text-sm outline-none focus:border-indigo-500" />
                    </div>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as any)}
                        className="p-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 text-zinc-600 text-sm outline-none focus:border-indigo-500"
                    >
                        <option value="all">All Status</option>
                        <option value="new">New</option>
                        <option value="responded">Responded</option>
                        <option value="booked">Booked</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
                {isLoading ? (
                    <div className="flex justify-center p-12">
                        <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
                    </div>
                ) : filteredEnquiries.length === 0 ? (
                    <div className="p-12 text-center text-zinc-500">
                        No enquiries found.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-zinc-50 text-zinc-500 text-xs uppercase tracking-wider font-semibold border-b border-zinc-100">
                                <tr>
                                    <th className="px-6 py-4">Client</th>
                                    <th className="px-6 py-4">Event Details</th>
                                    <th className="px-6 py-4">Message</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {filteredEnquiries.map((row) => (
                                    <tr key={row.id} className="hover:bg-zinc-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-zinc-900">{row.client_name}</div>
                                            <div className="text-xs text-zinc-500">{row.client_email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-zinc-900 font-medium">{row.event_type}</div>
                                            <div className="text-xs text-zinc-500">{new Date(row.event_date).toLocaleDateString()}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-zinc-600 line-clamp-1 max-w-[200px]" title={row.message}>{row.message}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(row.status)}`}>
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {row.status === 'new' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(row.id, 'responded')}
                                                        className="p-1.5 text-zinc-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg tooltip"
                                                        title="Mark as Responded"
                                                    >
                                                        <MessageSquare className="w-4 h-4" />
                                                    </button>
                                                )}
                                                {row.status !== 'booked' && row.status !== 'closed' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(row.id, 'booked')}
                                                        className="p-1.5 text-zinc-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg tooltip"
                                                        title="Mark as Booked"
                                                    >
                                                        <CheckCircle2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                                {row.status !== 'closed' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(row.id, 'closed')}
                                                        className="p-1.5 text-zinc-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg tooltip"
                                                        title="Close Enquiry"
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
