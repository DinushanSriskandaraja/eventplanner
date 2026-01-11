"use client";

import { useState, useEffect } from "react";
import {
    Plus, Search, Filter, MoreVertical,
    Edit, Trash2, Tag, X, Save, Loader2
} from "lucide-react";
import { getServices, createService, deleteService, updateService } from "../actions";

interface Service {
    id: string; // Changed from number to string (slug)
    name: string;
    status: "Active" | "Inactive";
    providers: number;
}

export default function ServicesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [formData, setFormData] = useState({ name: "", status: "Active" as "Active" | "Inactive" });
    const [isLoading, setIsLoading] = useState(true);

    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        setIsLoading(true);
        const data = await getServices();
        if (data) {
            setServices(data as Service[]);
        }
        setIsLoading(false);
    };

    const openAddModal = () => {
        setEditingService(null);
        setFormData({ name: "", status: "Active" });
        setIsModalOpen(true);
    };

    const openEditModal = (service: Service) => {
        setEditingService(service);
        setFormData({ name: service.name, status: service.status });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (editingService) {
            // Edit
            const result = await updateService(editingService.id, formData.name, formData.status);
            if (!result.success) {
                alert("Failed to update service: " + (result.error || "Unknown Error"));
            }
        } else {
            // Add new
            const result = await createService(formData.name, formData.status);
            if (!result.success) {
                alert("Failed to create service: " + (result.error || "Unknown Error"));
            }
        }

        setIsModalOpen(false);
        loadServices();
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure? This might affect providers linked to this service.")) {
            await deleteService(id);
            loadServices();
        }
    };

    const toggleStatus = async (id: string, currentStatus: string, name: string) => {
        const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
        // Optimistic update
        setServices(services.map(s => s.id === id ? { ...s, status: newStatus } : s));

        const result = await updateService(id, name, newStatus);
        if (!result.success) {
            alert("Failed to update status");
            loadServices(); // Revert
        }
    };

    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin w-8 h-8 text-slate-400" /></div>;

    return (
        <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search services..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={openAddModal}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 hover:shadow-indigo-300"
                    >
                        <Plus className="w-5 h-5" />
                        Add Category
                    </button>
                </div>
            </div>

            {/* Services Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                        <tr>
                            <th className="px-6 py-4">Service Category</th>
                            <th className="px-6 py-4">Total Providers</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredServices.map((service) => (
                            <tr key={service.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
                                            <Tag className="w-5 h-5" />
                                        </div>
                                        <span className="font-semibold text-slate-900">{service.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-900 font-medium">{service.providers}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => toggleStatus(service.id, service.status, service.name)}
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${service.status === "Active"
                                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                            }`}
                                    >
                                        {service.status}
                                    </button>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => openEditModal(service)}
                                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(service.id)}
                                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
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

                {filteredServices.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-slate-500">No active service categories found.</p>
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900">
                                {editingService ? "Edit Service Category" : "Add New Category"}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-500" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Category Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g., Photography, Catering"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                                />
                            </div>

                            {/* Status Toggle in Modal */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Status
                                </label>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, status: formData.status === "Active" ? "Inactive" : "Active" })}
                                        className={`relative w-12 h-6 rounded-full transition-colors ${formData.status === "Active" ? "bg-emerald-500" : "bg-slate-300"}`}
                                    >
                                        <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.status === "Active" ? "translate-x-6" : ""}`} />
                                    </button>
                                    <span className="text-sm text-slate-600">{formData.status}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
                                >
                                    <Save className="w-5 h-5" />
                                    {editingService ? "Save Changes" : "Add Category"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
