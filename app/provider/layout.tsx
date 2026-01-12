"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard, UserCircle, Briefcase, Image as ImageIcon,
    MessageSquare, CreditCard, Settings, LogOut, Menu, X, Bell, Sparkles, Loader2
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { logout } from "@/app/actions/logout";

export default function ProviderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isVerifying, setIsVerifying] = useState(true);
    const [userInfo, setUserInfo] = useState<{ name: string; email: string; avatar?: string } | null>(null);
    const pathname = usePathname();
    const router = useRouter();

    // Verify provider role on mount
    useEffect(() => {
        const verifyProviderAccess = async () => {
            const supabase = createClient();

            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push('/login?redirectTo=' + pathname);
                return;
            }

            const { data: profile } = await supabase
                .from('profiles')
                .select('role, full_name, email, avatar_url')
                .eq('id', user.id)
                .single();

            if (!profile || profile.role !== 'provider') {
                router.push('/unauthorized');
                return;
            }

            // Fetch provider details
            const { data: provider } = await supabase
                .from('providers')
                .select('business_name')
                .eq('id', user.id)
                .single();

            setUserInfo({
                name: provider?.business_name || profile.full_name || 'Provider',
                email: profile.email || user.email || 'provider@example.com',
                avatar: profile.avatar_url
            });
            setIsVerifying(false);
        };


        verifyProviderAccess();
    }, [pathname, router]);

    const navItems = [
        { label: "Dashboard", href: "/provider", icon: LayoutDashboard },
        { label: "My Profile", href: "/provider/profile", icon: UserCircle },
        { label: "My Services", href: "/provider/services", icon: Briefcase },
        { label: "Portfolio", href: "/provider/portfolio", icon: ImageIcon },
        { label: "Enquiries", href: "/provider/enquiries", icon: MessageSquare },
        { label: "Subscription", href: "/provider/subscription", icon: CreditCard },
        { label: "Settings", href: "/provider/settings", icon: Settings },
    ];

    // Show loading state while verifying access
    if (isVerifying) {
        return (
            <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mx-auto mb-4" />
                    <p className="text-zinc-600">Verifying access...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 flex font-sans">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-zinc-900 text-white transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 md:static md:inset-0 shadow-xl`}
            >
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="h-16 flex items-center px-6 border-b border-zinc-800">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
                                <Sparkles className="w-4 h-4" />
                            </div>
                            <span className="text-lg font-bold text-white tracking-tight">
                                Provider Panel
                            </span>
                        </div>
                        <button
                            className="ml-auto md:hidden text-zinc-400"
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
                                        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Check Subscription Banner (Optional) */}
                    <div className="mx-3 mb-4 p-4 rounded-xl bg-gradient-to-br from-indigo-900 to-zinc-800 border border-indigo-700/50">
                        <p className="text-xs font-semibold text-indigo-300 mb-1">PRO PLAN</p>
                        <p className="text-xs text-zinc-400 mb-3">Your subscription expires in 14 days.</p>
                        <button className="w-full py-1.5 text-xs font-bold bg-indigo-600 rounded text-white hover:bg-indigo-500 transition-colors">
                            Renew Now
                        </button>
                    </div>

                    {/* User Profile / Logout */}
                    <div className="p-4 border-t border-zinc-800">
                        <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer group">
                            <div className="relative">
                                <div className="w-9 h-9 rounded-full bg-zinc-700 overflow-hidden border-2 border-zinc-600 group-hover:border-zinc-500 transition-colors">
                                    {/* Placeholder Avatar */}
                                    <img src="https://images.unsplash.com/photo-1554048612-387768052bf7?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover" alt="User" />
                                </div>
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-zinc-900"></span>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-medium text-white truncate">{userInfo?.name || 'Provider'}</p>
                                <p className="text-xs text-zinc-500 truncate">{userInfo?.email || 'Loading...'}</p>
                            </div>
                            <form action={logout}>
                                <button
                                    type="submit"
                                    className="text-zinc-500 hover:text-rose-400 transition-colors"
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
                <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-4 md:px-8">
                    <div className="flex items-center gap-4">
                        <button
                            className="md:hidden text-zinc-500"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h2 className="text-lg font-bold text-zinc-800 capitalize">
                            {pathname === "/provider" ? "Dashboard" : pathname.split("/").pop()?.replace(/-/g, " ")}
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-zinc-400 hover:text-indigo-600 transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-4 md:p-8 bg-zinc-50">
                    {children}
                </main>
            </div>
        </div>
    );
}
