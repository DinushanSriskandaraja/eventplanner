"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Menu, X } from "lucide-react";

interface NavbarProps {
    transparent?: boolean;
}

export default function Navbar({ transparent = false }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);

        // Check auth (client-side for UI toggle)
        import('@/utils/supabase/client').then(({ createClient }) => {
            const supabase = createClient();
            supabase.auth.getUser().then(({ data }) => {
                setUser(data.user);
            });
        });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Determine if we should show the white background
    const showBackground = isScrolled || !transparent;

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${showBackground ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
                    }`}
            >
                <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:shadow-indigo-300 transition-all">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <span className={`text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 to-purple-800`}>
                            EsyEvent
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/" className="font-medium text-zinc-600 hover:text-indigo-600 transition-colors">Home</Link>
                        <Link href="/services" className="font-medium text-zinc-600 hover:text-indigo-600 transition-colors">Services</Link>
                        {user && (
                            <Link href="/user" className="font-medium text-zinc-600 hover:text-indigo-600 transition-colors">Dashboard</Link>
                        )}
                    </nav>

                    {/* CTA & Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="hidden md:flex items-center gap-4">
                                <span className="text-sm font-medium text-zinc-600">Hi, {user.user_metadata?.full_name?.split(' ')[0] || 'User'}</span>
                                <button
                                    onClick={async () => {
                                        const { createClient } = await import('@/utils/supabase/client');
                                        await createClient().auth.signOut();
                                        window.location.reload();
                                    }}
                                    className="px-4 py-2 rounded-full border border-zinc-200 text-zinc-600 text-sm font-medium hover:bg-zinc-50 transition-colors"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link href="/login" className="hidden md:block font-medium text-zinc-600 hover:text-indigo-600 transition-colors">
                                    Log In
                                </Link>
                                <Link
                                    href="/register"
                                    className="hidden md:inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition-all hover:shadow-lg hover:shadow-zinc-200"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                        <button
                            className="md:hidden p-2 text-zinc-600"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-zinc-100 shadow-xl p-4 flex flex-col gap-4">
                        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="p-2 font-medium text-zinc-700 hover:bg-zinc-50 rounded-lg">Home</Link>
                        <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="p-2 font-medium text-zinc-700 hover:bg-zinc-50 rounded-lg">Services</Link>
                        <hr className="border-zinc-100" />
                        <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="p-2 font-medium text-zinc-700 hover:bg-zinc-50 rounded-lg">Log In</Link>
                        <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-3 rounded-xl bg-indigo-600 text-white font-medium">Get Started</Link>
                    </div>
                )}
            </header>
        </>
    );
}
