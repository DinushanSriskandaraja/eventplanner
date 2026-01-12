"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Loader2 } from "lucide-react";

type UserRole = 'user' | 'provider' | 'admin';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles: UserRole[];
    redirectTo?: string;
}

/**
 * Protected Route Component
 * Wraps content that should only be accessible to specific roles
 * Redirects unauthorized users to login or unauthorized page
 */
export default function ProtectedRoute({
    children,
    allowedRoles,
    redirectTo
}: ProtectedRouteProps) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAccess = async () => {
            const supabase = createClient();

            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push(redirectTo || '/login');
                return;
            }

            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single();

            if (!profile) {
                router.push('/login');
                return;
            }

            const userRole = profile.role as UserRole;

            if (!allowedRoles.includes(userRole)) {
                router.push('/unauthorized');
                return;
            }

            setIsAuthorized(true);
            setIsLoading(false);
        };

        checkAccess();
    }, [allowedRoles, redirectTo, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mx-auto mb-4" />
                    <p className="text-slate-600">Verifying access...</p>
                </div>
            </div>
        );
    }

    if (!isAuthorized) {
        return null;
    }

    return <>{children}</>;
}
