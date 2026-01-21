"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Hexagon, Mail, Lock, User, UserCircle, Briefcase, ChevronRight, Loader2, ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { signup } from "./actions";

type RegistrationStep = 'role-selection' | 'user-form' | 'provider-form';

export default function RegisterPage() {
    const router = useRouter();
    const [step, setStep] = useState<RegistrationStep>('role-selection');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Form States (Reused for simplicity in this example, normally good to keep separate or use FormData directly)
    // We will use native html form submission with onSubmit grabbing the formData instance
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleBack = () => {
        setStep('role-selection');
        setIsLoading(false);
        setError(null);
        setPassword("");
        setConfirmPassword("");
        setPasswordError("");
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>, role: 'user' | 'provider') => {
        e.preventDefault();

        // Validate passwords match
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }

        setPasswordError("");
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        formData.append('role', role); // Explicitly add the role

        try {
            const result = await signup(formData);
            if (result.error) {
                setError(result.error);
                setIsLoading(false);
            } else if (result.success) {
                setSuccessMessage(result.message || "Registration successful! Check your email.");
                setIsLoading(false);
                // Optionally redirect or show success UI
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
            setIsLoading(false);
        }
    };

    if (successMessage) {
        return (
            <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center animate-in fade-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900 mb-2">Check your inbox</h2>
                    <p className="text-zinc-600 mb-6">{successMessage}</p>
                    <Link href="/login" className="inline-block px-6 py-3 bg-zinc-900 text-white rounded-xl font-medium hover:bg-zinc-800 transition-colors">
                        Go to Login
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl shadow-zinc-200/50 border border-zinc-100 overflow-hidden relative">

                {/* Back Button (Only for forms) */}
                {step !== 'role-selection' && (
                    <button
                        onClick={handleBack}
                        className="absolute top-6 left-6 p-2 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors z-10"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                )}

                <div className="p-8 md:p-12">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <Link href="/" className="inline-flex items-center justify-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                                <Hexagon className="w-6 h-6 text-white fill-current" />
                            </div>
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                                EsyEvent
                            </span>
                        </Link>
                        <h1 className="text-2xl font-bold text-zinc-900 mb-2">Create an Account</h1>
                        <p className="text-zinc-500">
                            {step === 'role-selection' ? "How do you want to use the platform?" :
                                step === 'user-form' ? "Sign up to plan your next event" :
                                    "Sign up to offer your services"}
                        </p>
                    </div>

                    {/* Step 1: Role Selection */}
                    {step === 'role-selection' && (
                        <div className="grid md:grid-cols-2 gap-4">
                            {/* User User Card */}
                            <button
                                onClick={() => setStep('user-form')}
                                className="group relative bg-zinc-50 hover:bg-white border border-zinc-200 hover:border-indigo-600 p-6 rounded-2xl text-left transition-all hover:shadow-lg hover:shadow-indigo-600/5 flex flex-col items-center text-center"
                            >
                                <div className="w-16 h-16 bg-white rounded-2xl border border-zinc-100 shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <UserCircle className="w-8 h-8 text-indigo-600" />
                                </div>
                                <h3 className="text-lg font-bold text-zinc-900 mb-2">Register as a User</h3>
                                <p className="text-sm text-zinc-500 leading-relaxed mb-6">
                                    I want to plan events, find professionals, and manage bookings.
                                </p>
                                <div className="mt-auto px-6 py-2 bg-white border border-zinc-200 text-zinc-900 rounded-full text-sm font-medium group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-colors">
                                    Continue
                                </div>
                            </button>

                            {/* Service Provider Card */}
                            <button
                                onClick={() => setStep('provider-form')}
                                className="group relative bg-zinc-50 hover:bg-white border border-zinc-200 hover:border-indigo-600 p-6 rounded-2xl text-left transition-all hover:shadow-lg hover:shadow-indigo-600/5 flex flex-col items-center text-center"
                            >
                                <div className="w-16 h-16 bg-white rounded-2xl border border-zinc-100 shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Briefcase className="w-8 h-8 text-indigo-600" />
                                </div>
                                <h3 className="text-lg font-bold text-zinc-900 mb-2">Register as a Provider</h3>
                                <p className="text-sm text-zinc-500 leading-relaxed mb-6">
                                    I want to list my services, showcase my portfolio, and grow my business.
                                </p>
                                <div className="mt-auto px-6 py-2 bg-white border border-zinc-200 text-zinc-900 rounded-full text-sm font-medium group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-colors">
                                    Continue
                                </div>
                            </button>
                        </div>
                    )}

                    {/* Step 2A: User Registration Form */}
                    {step === 'user-form' && (
                        <form onSubmit={(e) => handleRegister(e, 'user')} className="max-w-md mx-auto space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-3.5 w-5 h-5 text-zinc-400" />
                                    <input
                                        name="fullName"
                                        type="text"
                                        required
                                        placeholder="John Doe"
                                        className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all text-zinc-900 placeholder:text-zinc-400"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-3.5 w-5 h-5 text-zinc-400" />
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="you@example.com"
                                        className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all text-zinc-900 placeholder:text-zinc-400"
                                    />
                                </div>
                            </div>

                            {/* Mobile removed from schema for now or keep as optional - removed from form processing in action unless added to action schema */}

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 ml-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-zinc-400" />
                                    <input
                                        name="password"
                                        type="password"
                                        required
                                        minLength={8}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Min. 8 characters"
                                        className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all text-zinc-900 placeholder:text-zinc-400"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 ml-1">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-zinc-400" />
                                    <input
                                        type="password"
                                        required
                                        minLength={8}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Re-enter password"
                                        className={`w-full pl-12 pr-4 py-3 bg-zinc-50 border rounded-xl outline-none focus:ring-4 transition-all text-zinc-900 placeholder:text-zinc-400 ${passwordError ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "border-zinc-200 focus:border-indigo-600 focus:ring-indigo-600/10"
                                            }`}
                                    />
                                </div>
                                {passwordError && (
                                    <p className="text-sm text-red-600 ml-1">{passwordError}</p>
                                )}
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600 text-center">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3.5 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 focus:ring-4 focus:ring-zinc-900/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg shadow-zinc-900/20 flex items-center justify-center gap-2 group"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        Register <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    {/* Step 2B: Provider Registration Form */}
                    {step === 'provider-form' && (
                        <form onSubmit={(e) => handleRegister(e, 'provider')} className="max-w-md mx-auto space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">

                            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-sm text-indigo-800 flex items-start gap-3">
                                <div className="mt-0.5 min-w-4">ℹ️</div>
                                <p>You can complete your professional profile (services, portfolio, bio) after creating your account.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 ml-1">Business Name</label>
                                <div className="relative">
                                    <Briefcase className="absolute left-4 top-3.5 w-5 h-5 text-zinc-400" />
                                    <input
                                        name="fullName" // Reusing fullName for Business Name mapping
                                        type="text"
                                        required
                                        placeholder="Business Name LLC"
                                        className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all text-zinc-900 placeholder:text-zinc-400"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 ml-1">Business Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-3.5 w-5 h-5 text-zinc-400" />
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="business@example.com"
                                        className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all text-zinc-900 placeholder:text-zinc-400"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 ml-1">Create Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-zinc-400" />
                                    <input
                                        name="password"
                                        type="password"
                                        required
                                        minLength={8}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Min. 8 characters"
                                        className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all text-zinc-900 placeholder:text-zinc-400"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 ml-1">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-zinc-400" />
                                    <input
                                        type="password"
                                        required
                                        minLength={8}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Re-enter password"
                                        className={`w-full pl-12 pr-4 py-3 bg-zinc-50 border rounded-xl outline-none focus:ring-4 transition-all text-zinc-900 placeholder:text-zinc-400 ${passwordError ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "border-zinc-200 focus:border-indigo-600 focus:ring-indigo-600/10"
                                            }`}
                                    />
                                </div>
                                {passwordError && (
                                    <p className="text-sm text-red-600 ml-1">{passwordError}</p>
                                )}
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600 text-center">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3.5 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 focus:ring-4 focus:ring-zinc-900/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg shadow-zinc-900/20 flex items-center justify-center gap-2 group"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Setting up...
                                    </>
                                ) : (
                                    <>
                                        Create Account <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    <div className="mt-8 pt-8 border-t border-zinc-100 text-center">
                        <p className="text-zinc-600 text-sm">
                            Already have an account?{' '}
                            <Link href="/login" className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
