"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Eye, Edit, Trash2, Ban, CheckCircle, Clock, AlertCircle, FileText, Paperclip, X, Save, Loader2 } from "lucide-react";
import { getReports, updateReportStatus, updateReportNotes, deleteReport, verifyProvider } from "../actions";

type ReportStatus = "pending" | "in-review" | "resolved";

interface Report {
    id: string;
    userName: string;
    userEmail: string;
    userPhone: string;
    providerId: string;
    providerName: string;
    providerCategory: string;
    reportType: string;
    message: string;
    attachments: string[];
    dateSubmitted: string;
    status: ReportStatus;
    adminNotes?: string;
}

export default function ReportsManagementPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [reportTypeFilter, setReportTypeFilter] = useState<string>("all");
    const [showFilters, setShowFilters] = useState(false);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [adminNotes, setAdminNotes] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async () => {
        setIsLoading(true);
        const data = await getReports();
        const mapped: Report[] = (data || []).map((r: any) => ({
            id: r.id,
            userName: r.reporter?.name || "Unknown",
            userEmail: r.reporter?.email || "",
            userPhone: "N/A", // Phone not fetched currently
            providerId: r.provider?.id,
            providerName: r.provider?.name || "Unknown",
            providerCategory: r.provider?.category || "Service",
            reportType: r.reportType,
            message: r.message,
            attachments: r.attachments || [],
            dateSubmitted: r.dateSubmitted,
            status: r.status,
            adminNotes: r.adminNotes
        }));
        setReports(mapped);
        setIsLoading(false);
    };

    const filteredReports = reports.filter(report => {
        const matchesSearch =
            (report.userName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (report.providerName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (report.userEmail || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (report.id || "").toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "all" || report.status === statusFilter;
        const matchesType = reportTypeFilter === "all" || report.reportType === reportTypeFilter;

        return matchesSearch && matchesStatus && matchesType;
    });

    const handleStatusChange = async (reportId: string, newStatus: ReportStatus) => {
        // Optimistic update
        setReports(reports.map(r => r.id === reportId ? { ...r, status: newStatus } : r));
        if (selectedReport?.id === reportId) {
            setSelectedReport({ ...selectedReport, status: newStatus });
        }

        const result = await updateReportStatus(reportId, newStatus);
        if (!result.success) {
            alert("Failed to update status");
            loadReports(); // revert
        }
    };

    const handleSuspendProvider = async (reportId: string) => {
        const report = reports.find(r => r.id === reportId);
        if (!report) return;

        if (confirm(`Are you sure you want to suspend provider "${report.providerName}"? This will unverify them.`)) {
            // Using verifyProvider(id, false) as a proxy for suspension/unverification for now
            const result = await verifyProvider(report.providerId, false);
            if (result.success) {
                alert("Provider suspended (unverified) successfully");
            } else {
                alert("Failed to suspend provider");
            }
        }
    };

    const handleDeleteReport = async (reportId: string) => {
        if (confirm("Are you sure you want to delete this report? This action cannot be undone.")) {
            // Optimistic update
            setReports(reports.filter(r => r.id !== reportId));
            if (selectedReport?.id === reportId) {
                setSelectedReport(null);
            }

            const result = await deleteReport(reportId);
            if (!result.success) {
                alert("Failed to delete report");
                loadReports(); // revert
            }
        }
    };

    const handleSaveNotes = async () => {
        if (selectedReport) {
            // Optimistic update
            const updatedReports = reports.map(r =>
                r.id === selectedReport.id ? { ...r, adminNotes: adminNotes } : r
            );
            setReports(updatedReports);
            setSelectedReport({ ...selectedReport, adminNotes: adminNotes });

            const result = await updateReportNotes(selectedReport.id, adminNotes);
            if (result.success) {
                alert("Notes saved successfully");
            } else {
                alert("Failed to save notes");
                loadReports();
            }
        }
    };

    const getStatusBadge = (status: ReportStatus) => {
        const styles = {
            pending: "bg-amber-50 text-amber-700 border-amber-200",
            "in-review": "bg-blue-50 text-blue-700 border-blue-200",
            resolved: "bg-emerald-50 text-emerald-700 border-emerald-200",
        };
        const icons = {
            pending: Clock,
            "in-review": AlertCircle,
            resolved: CheckCircle,
        };
        const Icon = icons[status] || Clock;

        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${styles[status] || styles.pending}`}>
                <Icon className="w-3.5 h-3.5" />
                {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
            </span>
        );
    };

    if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin w-8 h-8 text-slate-400" /></div>;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Report Management</h1>
                    <p className="text-zinc-500">Review and manage user-submitted reports</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-zinc-500">
                        Showing {filteredReports.length} of {reports.length} reports
                    </span>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search by report ID, user, provider, or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-zinc-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl font-medium transition-all ${showFilters ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50"
                            }`}
                    >
                        <Filter className="w-4 h-4" />
                        Filters
                    </button>
                </div>

                {/* Filter Panel */}
                {showFilters && (
                    <div className="mt-4 pt-4 border-t border-zinc-100 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">Status</label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full px-3 py-2 border border-zinc-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 bg-white"
                            >
                                <option value="all">All Statuses</option>
                                <option value="pending">Pending</option>
                                <option value="in-review">In Review</option>
                                <option value="resolved">Resolved</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">Report Type</label>
                            <select
                                value={reportTypeFilter}
                                onChange={(e) => setReportTypeFilter(e.target.value)}
                                className="w-full px-3 py-2 border border-zinc-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 bg-white"
                            >
                                <option value="all">All Types</option>
                                <option value="Misconduct">Misconduct</option>
                                <option value="Fake Profile / Fraudulent Services">Fake Profile</option>
                                <option value="Poor Service / Quality">Poor Service</option>
                                <option value="Inappropriate Content">Inappropriate Content</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <button
                                onClick={() => {
                                    setStatusFilter("all");
                                    setReportTypeFilter("all");
                                    setSearchTerm("");
                                }}
                                className="w-full px-4 py-2 bg-zinc-100 text-zinc-700 rounded-lg font-medium hover:bg-zinc-200 transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Reports Table */}
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-zinc-50 border-b border-zinc-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">Report ID</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">Provider</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">Message</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {filteredReports.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-zinc-500">
                                        No reports found matching your criteria
                                    </td>
                                </tr>
                            ) : (
                                filteredReports.map((report) => (
                                    <tr key={report.id} className="hover:bg-zinc-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-sm font-medium text-indigo-600">{report.id.slice(0, 8)}...</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm">
                                                <p className="font-medium text-zinc-900">{report.userName}</p>
                                                <p className="text-zinc-500 text-xs">{report.userEmail}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm">
                                                <p className="font-medium text-zinc-900">{report.providerName}</p>
                                                <p className="text-zinc-500 text-xs">{report.providerCategory}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-zinc-700">{report.reportType}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="max-w-xs">
                                                <p className="text-sm text-zinc-600 line-clamp-2">{report.message}</p>
                                                {report.attachments.length > 0 && (
                                                    <div className="flex items-center gap-1 mt-1 text-xs text-indigo-600">
                                                        <Paperclip className="w-3 h-3" />
                                                        {report.attachments.length} attachment(s)
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-zinc-600">{report.dateSubmitted}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(report.status)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => {
                                                    setSelectedReport(report);
                                                    setAdminNotes(report.adminNotes || "");
                                                }}
                                                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                title="View Details"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Report Details Modal */}
            {selectedReport && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold mb-1">Report Details</h2>
                                    <p className="text-indigo-100 text-sm">ID: {selectedReport.id}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedReport(null)}
                                    className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                            {/* User Information */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border-2 border-blue-100">
                                <h3 className="font-bold text-zinc-900 mb-3 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                                        <FileText className="w-4 h-4 text-white" />
                                    </div>
                                    Reporter Information
                                </h3>
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="bg-white/60 rounded-xl p-3">
                                        <p className="text-xs text-blue-600 font-medium mb-1">Name</p>
                                        <p className="text-sm font-bold text-zinc-900">{selectedReport.userName}</p>
                                    </div>
                                    <div className="bg-white/60 rounded-xl p-3">
                                        <p className="text-xs text-blue-600 font-medium mb-1">Email</p>
                                        <p className="text-sm font-bold text-zinc-900">{selectedReport.userEmail}</p>
                                    </div>
                                    <div className="bg-white/60 rounded-xl p-3">
                                        <p className="text-xs text-blue-600 font-medium mb-1">Phone</p>
                                        <p className="text-sm font-bold text-zinc-900">{selectedReport.userPhone}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Provider Information */}
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border-2 border-purple-100">
                                <h3 className="font-bold text-zinc-900 mb-3">Reported Provider</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white/60 rounded-xl p-3">
                                        <p className="text-xs text-purple-600 font-medium mb-1">Provider Name</p>
                                        <p className="text-sm font-bold text-zinc-900">{selectedReport.providerName}</p>
                                    </div>
                                    <div className="bg-white/60 rounded-xl p-3">
                                        <p className="text-xs text-purple-600 font-medium mb-1">Category</p>
                                        <p className="text-sm font-bold text-zinc-900">{selectedReport.providerCategory}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Report Details */}
                            <div>
                                <h3 className="font-bold text-zinc-900 mb-3">Report Details</h3>
                                <div className="space-y-3">
                                    <div className="bg-zinc-50 rounded-xl p-4">
                                        <p className="text-xs text-zinc-600 font-medium mb-1">Report Type</p>
                                        <p className="text-sm font-bold text-zinc-900">{selectedReport.reportType}</p>
                                    </div>
                                    <div className="bg-zinc-50 rounded-xl p-4">
                                        <p className="text-xs text-zinc-600 font-medium mb-2">Message</p>
                                        <p className="text-sm text-zinc-700 leading-relaxed">{selectedReport.message}</p>
                                    </div>
                                    {selectedReport.attachments.length > 0 && (
                                        <div className="bg-zinc-50 rounded-xl p-4">
                                            <p className="text-xs text-zinc-600 font-medium mb-2">Attachments</p>
                                            <div className="space-y-2">
                                                {selectedReport.attachments.map((file, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 text-sm text-indigo-600">
                                                        <Paperclip className="w-4 h-4" />
                                                        {file}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <div className="bg-zinc-50 rounded-xl p-4">
                                        <p className="text-xs text-zinc-600 font-medium mb-1">Date Submitted</p>
                                        <p className="text-sm font-bold text-zinc-900">{selectedReport.dateSubmitted}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Status Management */}
                            <div>
                                <h3 className="font-bold text-zinc-900 mb-3">Status Management</h3>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleStatusChange(selectedReport.id, "pending")}
                                        className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${selectedReport.status === "pending"
                                            ? "bg-amber-100 text-amber-700 border-2 border-amber-300"
                                            : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                                            }`}
                                    >
                                        Pending
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(selectedReport.id, "in-review")}
                                        className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${selectedReport.status === "in-review"
                                            ? "bg-blue-100 text-blue-700 border-2 border-blue-300"
                                            : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                                            }`}
                                    >
                                        In Review
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(selectedReport.id, "resolved")}
                                        className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${selectedReport.status === "resolved"
                                            ? "bg-emerald-100 text-emerald-700 border-2 border-emerald-300"
                                            : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                                            }`}
                                    >
                                        Resolved
                                    </button>
                                </div>
                            </div>

                            {/* Admin Notes */}
                            <div>
                                <h3 className="font-bold text-zinc-900 mb-3">Admin Notes</h3>
                                <textarea
                                    value={adminNotes}
                                    onChange={(e) => setAdminNotes(e.target.value)}
                                    rows={4}
                                    placeholder="Add internal notes about this report..."
                                    className="w-full px-4 py-3 bg-zinc-50 border-2 border-zinc-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none"
                                />
                                <button
                                    onClick={handleSaveNotes}
                                    className="mt-2 flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                                >
                                    <Save className="w-4 h-4" />
                                    Save Notes
                                </button>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3 pt-4 border-t border-zinc-200">
                                <button
                                    onClick={() => handleSuspendProvider(selectedReport.id)}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                                >
                                    <Ban className="w-5 h-5" />
                                    Suspend Provider
                                </button>
                                <button
                                    onClick={() => handleDeleteReport(selectedReport.id)}
                                    className="px-6 py-3 bg-white text-red-600 border-2 border-red-200 rounded-xl font-bold hover:bg-red-50 transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
