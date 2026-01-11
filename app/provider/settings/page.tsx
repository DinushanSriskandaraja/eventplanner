"use client";

import { Bell, Lock, LogOut, Shield } from "lucide-react";

export default function ProviderSettingsPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-zinc-900">Account Settings</h1>

            {/* Change Password */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <Lock className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-zinc-900">Security</h3>
                        <p className="text-sm text-zinc-500">Manage your password and authentication.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-zinc-700">Current Password</label>
                        <input type="password" className="w-full p-2.5 rounded-lg border border-zinc-200 outline-none focus:border-indigo-500 text-sm" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-zinc-700">New Password</label>
                        <input type="password" className="w-full p-2.5 rounded-lg border border-zinc-200 outline-none focus:border-indigo-500 text-sm" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-zinc-700">Confirm New Password</label>
                        <input type="password" className="w-full p-2.5 rounded-lg border border-zinc-200 outline-none focus:border-indigo-500 text-sm" />
                    </div>
                    <div className="pt-2 flex justify-end">
                        <button className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors">Update Password</button>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                        <Bell className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-zinc-900">Notifications</h3>
                        <p className="text-sm text-zinc-500">Choose what you want to be notified about.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {[
                        "New Enquiry Received",
                        "Weekly Performance Report",
                        "Platform Updates & News",
                        "Marketing Tips"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between py-2">
                            <span className="text-sm text-zinc-700 font-medium">{item}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked={i < 2} />
                                <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>
                    ))}
                    <div className="pt-2 flex justify-end">
                        <button className="px-4 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-lg text-sm font-medium hover:bg-zinc-50 transition-colors">Save Preferences</button>
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
                        <Shield className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-zinc-900">Danger Zone</h3>
                        <p className="text-sm text-zinc-500">Irreversible account actions.</p>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-bold text-zinc-900">Deactivate Account</p>
                        <p className="text-xs text-zinc-500">Hide your profile and pause subscription.</p>
                    </div>
                    <button className="px-4 py-2 border border-rose-200 text-rose-600 rounded-lg text-sm font-medium hover:bg-rose-50 transition-colors">
                        Deactivate
                    </button>
                </div>
            </div>

            <button className="w-full py-3 flex items-center justify-center gap-2 text-zinc-400 font-medium hover:text-zinc-600 transition-colors">
                <LogOut className="w-4 h-4" /> Sign Out
            </button>
        </div>
    );
}
