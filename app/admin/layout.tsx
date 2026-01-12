"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard, Calendar, Briefcase, Users,
    Settings, LogOut, Menu, X, Bell, CreditCard, Flag, Loader2
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { logout } from "@/app/actions/logout";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isVerifying, setIsVerifying] = useState(true);
    const [userInfo, setUserInfo] = useState<{ name: string; email: string } | null>(null);
    const pathname = usePathname();
    const router = useRouter();

    // Verify admin role on mount
    useEffect(() => {
        const verifyAdminAccess = async () => {
            const supabase = createClient();

            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push('/login?redirectTo=' + pathname);
                return;
            }

            const { data: profile } = await supabase
                .from('profiles')
                .select('role, full_name, email')
                .eq('id', user.id)
                .single();

            if (!profile || profile.role !== 'admin') {
                router.push('/unauthorized');
                return;
            }

            setUserInfo({
                name: profile.full_name || 'Admin',
                email: profile.email || user.email || 'admin@eventplanner.com'
            });
            setIsVerifying(false);
        };

        verifyAdminAccess();
    }, [pathname, router]);

    const navItems = [
        { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { label: "Event Types", href: "/admin/events", icon: Calendar },
        { label: "Services", href: "/admin/services", icon: Briefcase },
        { label: "Service Providers", href: "/admin/providers", icon: Users },
        { label: "Reports", href: "/admin/reports", icon: Flag },
        { label: "Subscription Plans", href: "/admin/plans", icon: CreditCard },
        { label: "Settings", href: "/admin/settings", icon: Settings },
    ];

    // Show loading state while verifying access
    if (isVerifying) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mx-auto mb-4" />
                    <p className="text-slate-600">Verifying access...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 md:static md:inset-0 shadow-xl`}
            >
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="h-16 flex items-center px-6 border-b border-slate-800">
                        <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            Admin Panel
                        </span>
                        <button
                            className="ml-auto md:hidden text-slate-400"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Nav Links */}
                    <nav className="flex-1 py-6 px-3 space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/20"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Profile / Logout */}
                    <div className="p-4 border-t border-slate-800">
                        <div className="flex items-center gap-3 px-3 py-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold">
                                {userInfo?.name.charAt(0).toUpperCase() || 'A'}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-medium truncate">{userInfo?.name || 'Admin'}</p>
                                <p className="text-xs text-slate-500 truncate">{userInfo?.email || 'Loading...'}</p>
                            </div>
                            <form action={logout}>
                                <button
                                    type="submit"
                                    className="text-slate-400 hover:text-rose-400 transition-colors"
                                    title="Logout"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8">
                    <div className="flex items-center gap-4">
                        <button
                            className="md:hidden text-slate-500"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h2 className="text-lg font-semibold text-slate-800 capitalize">
                            {pathname.split("/").pop() === "admin" ? "Dashboard" : pathname.split("/").pop()?.replace(/-/g, " ")}
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
