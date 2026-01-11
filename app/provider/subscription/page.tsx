"use client";

import { Check, CreditCard, Clock } from "lucide-react";

export default function ProviderSubscriptionPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold text-zinc-900">Subscription & Billing</h1>
                <p className="text-zinc-500">Manage your subscription plan and payment methods.</p>
            </div>

            {/* Current Plan Card */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold border border-indigo-500/30">PRO PLAN</span>
                            <span className="text-zinc-400 text-sm flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Renewal: Jan 24, 2026</span>
                        </div>
                        <h2 className="text-3xl font-bold mb-2">$29.00 <span className="text-lg font-normal text-zinc-400">/ month</span></h2>
                        <p className="text-zinc-400 text-sm max-w-sm">You are on the Pro Plan. Enjoy unlimited enquiries, featured listing, and priority support.</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <button className="px-6 py-3 bg-white text-zinc-900 rounded-xl font-bold hover:bg-zinc-100 transition-colors">
                            Manage Subscription
                        </button>
                        <button className="px-6 py-3 bg-zinc-800 text-white border border-zinc-700 rounded-xl font-bold hover:bg-zinc-700 transition-colors">
                            Upgrade to Premium
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Features List */}
                <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
                    <h3 className="font-bold text-zinc-900 mb-4">Included in your plan</h3>
                    <ul className="space-y-3">
                        {[
                            "Unlimited Enquiries",
                            "Portfolio Gallery (Up to 50 items)",
                            "Verified Badge",
                            "Analytics Dashboard",
                            "Priority Email Support"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-zinc-600 text-sm">
                                <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                                    <Check className="w-3 h-3 text-emerald-600" />
                                </div>
                                {item}
                            </li>
                        ))}
                        <li className="flex items-center gap-3 text-zinc-400 text-sm">
                            <div className="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                                <div className="w-2 h-2 rounded-full bg-zinc-300"></div>
                            </div>
                            Homepage Feature (Premium only)
                        </li>
                    </ul>
                </div>

                {/* Payment Methods */}
                <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
                    <h3 className="font-bold text-zinc-900 mb-4">Payment Method</h3>
                    <div className="flex items-center gap-4 p-4 border border-zinc-200 rounded-xl mb-4">
                        <div className="w-10 h-10 bg-zinc-50 rounded-lg flex items-center justify-center text-zinc-600">
                            <CreditCard className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-zinc-900 text-sm">Visa ending in 4242</p>
                            <p className="text-xs text-zinc-500">Expires 12/28</p>
                        </div>
                        <button className="text-sm text-indigo-600 font-medium hover:underline">Edit</button>
                    </div>
                    <button className="w-full py-2.5 border border-dashed border-zinc-300 rounded-xl text-sm font-medium text-zinc-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
                        + Add Payment Method
                    </button>
                </div>
            </div>

            {/* Billing History (Mock) */}
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
                <div className="p-6 border-b border-zinc-100">
                    <h3 className="font-bold text-zinc-900">Billing History</h3>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-zinc-50 text-zinc-500 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Description</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Invoice</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 text-sm">
                        <tr>
                            <td className="px-6 py-4 text-zinc-500">Jan 24, 2026</td>
                            <td className="px-6 py-4 text-zinc-900 font-medium">Pro Plan - Monthly</td>
                            <td className="px-6 py-4 text-zinc-500">$29.00</td>
                            <td className="px-6 py-4"><span className="text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded text-xs">Paid</span></td>
                            <td className="px-6 py-4 text-right text-indigo-600 hover:underline cursor-pointer">Download</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 text-zinc-500">Dec 24, 2025</td>
                            <td className="px-6 py-4 text-zinc-900 font-medium">Pro Plan - Monthly</td>
                            <td className="px-6 py-4 text-zinc-500">$29.00</td>
                            <td className="px-6 py-4"><span className="text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded text-xs">Paid</span></td>
                            <td className="px-6 py-4 text-right text-indigo-600 hover:underline cursor-pointer">Download</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
