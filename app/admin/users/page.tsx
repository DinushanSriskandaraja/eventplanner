"use client";

import { useEffect, useState } from "react";
import { getUsers, updateUserRole, updateUserStatus } from "../actions";
import { MoreVertical, User, Shield, Briefcase, Ban, CheckCircle } from "lucide-react";

export default function UsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setIsLoading(true);
        const data = await getUsers();
        // Assume data contains 'status' if we added it to profile in SQL
        setUsers(data || []);
        setIsLoading(false);
    };

    const handleRoleUpdate = async (userId: string, newRole: 'user' | 'provider' | 'admin') => {
        if (!confirm(`Change role to ${newRole}?`)) return;
        await updateUserRole(userId, newRole);
        loadUsers();
    };

    const handleStatusUpdate = async (userId: string, newStatus: string) => {
        if (!confirm(`Change status to ${newStatus}?`)) return;
        await updateUserStatus(userId, newStatus);
        loadUsers();
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Joined</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-slate-900 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold overflow-hidden">
                                            {user.avatar_url ? (
                                                <img src={user.avatar_url} className="w-full h-full object-cover" />
                                            ) : (
                                                user.full_name?.[0] || 'U'
                                            )}
                                        </div>
                                        {user.full_name || 'No Name'}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${user.role === 'admin' ? "bg-purple-50 text-purple-700 border-purple-100" :
                                            user.role === 'provider' ? "bg-indigo-50 text-indigo-700 border-indigo-100" :
                                                "bg-slate-100 text-slate-600 border-slate-200"
                                            }`}>
                                            {user.role === 'admin' && <Shield className="w-3 h-3" />}
                                            {user.role === 'provider' && <Briefcase className="w-3 h-3" />}
                                            {user.role === 'user' && <User className="w-3 h-3" />}
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'Banned' || user.status === 'Suspended' ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"
                                            }`}>
                                            {user.status || 'Active'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{new Date(user.created_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 items-center">
                                            {/* Role Toggles */}
                                            {user.role !== 'admin' && (
                                                <button onClick={() => handleRoleUpdate(user.id, 'admin')} className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded hover:bg-purple-100" title="Make Admin">
                                                    +Admin
                                                </button>
                                            )}

                                            {/* Status Toggles */}
                                            {(user.status === 'Banned' || user.status === 'Suspended') ? (
                                                <button
                                                    onClick={() => handleStatusUpdate(user.id, 'Active')}
                                                    className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded"
                                                    title="Reactivate User"
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleStatusUpdate(user.id, 'Banned')}
                                                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                                                    title="Ban/Deactivate User"
                                                >
                                                    <Ban className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {users.length === 0 && <div className="p-8 text-center text-slate-500">No users found.</div>}
                </div>
            </div>
        </div>
    );
}
