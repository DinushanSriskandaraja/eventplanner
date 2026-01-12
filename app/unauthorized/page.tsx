"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldAlert, Home, LogIn, Mail } from "lucide-react";

export default function UnauthorizedPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-rose-100 flex items-center justify-center">
                        <ShieldAlert className="w-10 h-10 text-rose-600" />
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center">
                    <h1 className="text-3xl font-bold text-slate-900 mb-3">
                        Access Denied
                    </h1>
                    <p className="text-slate-600 mb-6">
                        You don't have permission to access this page. This area is restricted to specific user roles.
                    </p>

                    {/* Actions */}
                    <div className="space-y-3">
                        <button
                            onClick={() => router.back()}
                            className="w-full px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                        >
                            Go Back
                        </button>

                        <Link
                            href="/"
                            className="w-full px-6 py-3 bg-white text-slate-900 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                        >
                            <Home className="w-4 h-4" />
                            Go to Home
                        </Link>

                        <Link
                            href="/login"
                            className="w-full px-6 py-3 bg-white text-slate-900 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                        >
                            <LogIn className="w-4 h-4" />
                            Login with Different Account
                        </Link>
                    </div>
                </div>

                {/* Help Text */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-500 mb-2">
                        Need access to this area?
                    </p>
                    <a
                        href="mailto:support@eventplanner.com"
                        className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center justify-center gap-1"
                    >
                        <Mail className="w-4 h-4" />
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
}
