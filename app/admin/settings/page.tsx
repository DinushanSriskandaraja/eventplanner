"use client";

import { useState } from "react";
import { Save, Upload, Info, Trash2, RefreshCw } from "lucide-react";

type TabType = "general" | "users" | "events" | "subscription" | "visibility" | "notifications" | "security" | "system";

export default function AdminSettingsPage() {
    const [activeTab, setActiveTab] = useState<TabType>("general");
    const [isSaving, setIsSaving] = useState(false);

    // General Settings State
    const [generalSettings, setGeneralSettings] = useState({
        platformName: "EventPlanner",
        defaultLanguage: "en",
        defaultCurrency: "USD",
        timezone: "UTC",
        primaryColor: "#4F46E5",
        secondaryColor: "#7C3AED",
    });

    // Users & Providers Settings State
    const [usersSettings, setUsersSettings] = useState({
        userRegistration: true,
        providerRegistration: true,
        requireApproval: true,
        defaultProviderStatus: "Pending",
    });

    // Events & Services Settings State
    const [eventsSettings, setEventsSettings] = useState({
        enableEventTypes: true,
        enableServices: true,
        showServicesInChecklist: true,
        allowCustomChecklist: true,
    });

    // Subscription & Billing Settings State
    const [subscriptionSettings, setSubscriptionSettings] = useState({
        enableSubscription: true,
        defaultPlan: "Basic",
        trialPeriod: 14,
        autoRenew: true,
        gracePeriod: 7,
    });

    // Visibility & Ranking Settings State
    const [visibilitySettings, setVisibilitySettings] = useState({
        featuredPriority: "High",
        sortingLogic: "Rating",
        maxFeaturedPerCategory: 5,
    });

    // Notification Settings State
    const [notificationSettings, setNotificationSettings] = useState({
        adminEmail: "admin@eventplanner.com",
        emailNotifications: true,
        providerEnquiryAlerts: true,
        subscriptionExpiryAlerts: true,
    });

    // Security Settings State
    const [securitySettings, setSecuritySettings] = useState({
        minPasswordLength: 8,
        loginAttemptLimit: 5,
        sessionTimeout: 30,
        twoFactorAuth: false,
    });

    // System & Maintenance Settings State
    const [systemSettings, setSystemSettings] = useState({
        maintenanceMode: false,
        maintenanceMessage: "We are currently performing scheduled maintenance. Please check back soon.",
    });

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert("Settings saved successfully!");
        }, 1000);
    };

    const handleClearCache = () => {
        if (confirm("Are you sure you want to clear the cache?")) {
            alert("Cache cleared successfully!");
        }
    };

    const tabs = [
        { id: "general" as TabType, label: "General" },
        { id: "users" as TabType, label: "Users & Providers" },
        { id: "events" as TabType, label: "Events & Services" },
        { id: "subscription" as TabType, label: "Subscription" },
        { id: "visibility" as TabType, label: "Visibility" },
        { id: "notifications" as TabType, label: "Notifications" },
        { id: "security" as TabType, label: "Security" },
        { id: "system" as TabType, label: "System" },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500 mt-1">Manage platform configuration and preferences</p>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200 overflow-x-auto">
                <nav className="flex gap-2 min-w-max">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                    ? "border-indigo-600 text-indigo-600"
                                    : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
                {/* General Settings */}
                {activeTab === "general" && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">General Settings</h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Platform Name
                                </label>
                                <input
                                    type="text"
                                    value={generalSettings.platformName}
                                    onChange={(e) => setGeneralSettings({ ...generalSettings, platformName: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Default Language
                                </label>
                                <select
                                    value={generalSettings.defaultLanguage}
                                    onChange={(e) => setGeneralSettings({ ...generalSettings, defaultLanguage: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                                >
                                    <option value="en">English</option>
                                    <option value="es">Spanish</option>
                                    <option value="fr">French</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Default Currency
                                </label>
                                <select
                                    value={generalSettings.defaultCurrency}
                                    onChange={(e) => setGeneralSettings({ ...generalSettings, defaultCurrency: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                                >
                                    <option value="USD">USD ($)</option>
                                    <option value="EUR">EUR (€)</option>
                                    <option value="GBP">GBP (£)</option>
                                    <option value="INR">INR (₹)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Time Zone
                                </label>
                                <select
                                    value={generalSettings.timezone}
                                    onChange={(e) => setGeneralSettings({ ...generalSettings, timezone: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                                >
                                    <option value="UTC">UTC</option>
                                    <option value="America/New_York">Eastern Time</option>
                                    <option value="America/Los_Angeles">Pacific Time</option>
                                    <option value="Asia/Kolkata">India Standard Time</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Primary Brand Color
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        value={generalSettings.primaryColor}
                                        onChange={(e) => setGeneralSettings({ ...generalSettings, primaryColor: e.target.value })}
                                        className="w-16 h-12 rounded-lg border border-slate-200 cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={generalSettings.primaryColor}
                                        onChange={(e) => setGeneralSettings({ ...generalSettings, primaryColor: e.target.value })}
                                        className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Secondary Brand Color
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        value={generalSettings.secondaryColor}
                                        onChange={(e) => setGeneralSettings({ ...generalSettings, secondaryColor: e.target.value })}
                                        className="w-16 h-12 rounded-lg border border-slate-200 cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={generalSettings.secondaryColor}
                                        onChange={(e) => setGeneralSettings({ ...generalSettings, secondaryColor: e.target.value })}
                                        className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Platform Logo
                            </label>
                            <div className="flex items-center gap-4">
                                <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors flex items-center gap-2">
                                    <Upload className="w-4 h-4" />
                                    Upload Logo
                                </button>
                                <span className="text-sm text-slate-500">Recommended: 200x50px, PNG or SVG</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Users & Providers Settings */}
                {activeTab === "users" && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">Users & Providers Settings</h2>

                        <div className="space-y-4">
                            <ToggleSwitch
                                label="Enable User Registration"
                                description="Allow new users to register on the platform"
                                checked={usersSettings.userRegistration}
                                onChange={(checked) => setUsersSettings({ ...usersSettings, userRegistration: checked })}
                            />

                            <ToggleSwitch
                                label="Enable Service Provider Registration"
                                description="Allow service providers to sign up"
                                checked={usersSettings.providerRegistration}
                                onChange={(checked) => setUsersSettings({ ...usersSettings, providerRegistration: checked })}
                            />

                            <ToggleSwitch
                                label="Require Admin Approval for Providers"
                                description="New providers must be approved before going live"
                                checked={usersSettings.requireApproval}
                                onChange={(checked) => setUsersSettings({ ...usersSettings, requireApproval: checked })}
                            />

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Default Provider Status
                                </label>
                                <select
                                    value={usersSettings.defaultProviderStatus}
                                    onChange={(e) => setUsersSettings({ ...usersSettings, defaultProviderStatus: e.target.value })}
                                    className="w-full md:w-1/2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Events & Services Settings */}
                {activeTab === "events" && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">Events & Services Settings</h2>

                        <div className="space-y-4">
                            <ToggleSwitch
                                label="Enable Event Types"
                                description="Allow event type categorization"
                                checked={eventsSettings.enableEventTypes}
                                onChange={(checked) => setEventsSettings({ ...eventsSettings, enableEventTypes: checked })}
                            />

                            <ToggleSwitch
                                label="Enable Services"
                                description="Allow service listings on the platform"
                                checked={eventsSettings.enableServices}
                                onChange={(checked) => setEventsSettings({ ...eventsSettings, enableServices: checked })}
                            />

                            <ToggleSwitch
                                label="Show Services in Checklist"
                                description="Display services in event planning checklist"
                                checked={eventsSettings.showServicesInChecklist}
                                onChange={(checked) => setEventsSettings({ ...eventsSettings, showServicesInChecklist: checked })}
                            />

                            <ToggleSwitch
                                label="Allow Custom Checklist Items"
                                description="Users can add custom items to their checklist"
                                checked={eventsSettings.allowCustomChecklist}
                                onChange={(checked) => setEventsSettings({ ...eventsSettings, allowCustomChecklist: checked })}
                            />
                        </div>
                    </div>
                )}

                {/* Subscription & Billing Settings */}
                {activeTab === "subscription" && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">Subscription & Billing Settings</h2>

                        <div className="space-y-4">
                            <ToggleSwitch
                                label="Enable Subscription System"
                                description="Activate subscription plans for providers"
                                checked={subscriptionSettings.enableSubscription}
                                onChange={(checked) => setSubscriptionSettings({ ...subscriptionSettings, enableSubscription: checked })}
                            />

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Default Plan
                                </label>
                                <select
                                    value={subscriptionSettings.defaultPlan}
                                    onChange={(e) => setSubscriptionSettings({ ...subscriptionSettings, defaultPlan: e.target.value })}
                                    className="w-full md:w-1/2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                                >
                                    <option value="Free">Free</option>
                                    <option value="Basic">Basic</option>
                                    <option value="Pro">Pro</option>
                                    <option value="Enterprise">Enterprise</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Trial Period (Days)
                                </label>
                                <input
                                    type="number"
                                    value={subscriptionSettings.trialPeriod}
                                    onChange={(e) => setSubscriptionSettings({ ...subscriptionSettings, trialPeriod: parseInt(e.target.value) })}
                                    className="w-full md:w-1/2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                                />
                            </div>

                            <ToggleSwitch
                                label="Auto-Renew Subscriptions"
                                description="Automatically renew subscriptions at end of billing cycle"
                                checked={subscriptionSettings.autoRenew}
                                onChange={(checked) => setSubscriptionSettings({ ...subscriptionSettings, autoRenew: checked })}
                            />

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Grace Period After Expiry (Days)
                                </label>
                                <input
                                    type="number"
                                    value={subscriptionSettings.gracePeriod}
                                    onChange={(e) => setSubscriptionSettings({ ...subscriptionSettings, gracePeriod: parseInt(e.target.value) })}
                                    className="w-full md:w-1/2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Visibility & Ranking Settings */}
                {activeTab === "visibility" && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">Visibility & Ranking Settings</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Featured Provider Priority
                                </label>
                                <select
                                    value={visibilitySettings.featuredPriority}
                                    onChange={(e) => setVisibilitySettings({ ...visibilitySettings, featuredPriority: e.target.value })}
                                    className="w-full md:w-1/2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Sorting Logic
                                </label>
                                <select
                                    value={visibilitySettings.sortingLogic}
                                    onChange={(e) => setVisibilitySettings({ ...visibilitySettings, sortingLogic: e.target.value })}
                                    className="w-full md:w-1/2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                                >
                                    <option value="Rating">Rating</option>
                                    <option value="Reviews">Reviews Count</option>
                                    <option value="Price">Price</option>
                                    <option value="Recent">Most Recent</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Max Featured Providers Per Category
                                </label>
                                <input
                                    type="number"
                                    value={visibilitySettings.maxFeaturedPerCategory}
                                    onChange={(e) => setVisibilitySettings({ ...visibilitySettings, maxFeaturedPerCategory: parseInt(e.target.value) })}
                                    className="w-full md:w-1/2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Notification Settings */}
                {activeTab === "notifications" && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">Notification Settings</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Admin Email
                                </label>
                                <input
                                    type="email"
                                    value={notificationSettings.adminEmail}
                                    onChange={(e) => setNotificationSettings({ ...notificationSettings, adminEmail: e.target.value })}
                                    className="w-full md:w-1/2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                                />
                            </div>

                            <ToggleSwitch
                                label="Email Notifications"
                                description="Enable email notifications for admin"
                                checked={notificationSettings.emailNotifications}
                                onChange={(checked) => setNotificationSettings({ ...notificationSettings, emailNotifications: checked })}
                            />

                            <ToggleSwitch
                                label="Provider Enquiry Alerts"
                                description="Get notified when providers receive enquiries"
                                checked={notificationSettings.providerEnquiryAlerts}
                                onChange={(checked) => setNotificationSettings({ ...notificationSettings, providerEnquiryAlerts: checked })}
                            />

                            <ToggleSwitch
                                label="Subscription Expiry Alerts"
                                description="Get notified before subscriptions expire"
                                checked={notificationSettings.subscriptionExpiryAlerts}
                                onChange={(checked) => setNotificationSettings({ ...notificationSettings, subscriptionExpiryAlerts: checked })}
                            />
                        </div>
                    </div>
                )}

                {/* Security Settings */}
                {activeTab === "security" && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">Security Settings</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Minimum Password Length
                                </label>
                                <input
                                    type="number"
                                    value={securitySettings.minPasswordLength}
                                    onChange={(e) => setSecuritySettings({ ...securitySettings, minPasswordLength: parseInt(e.target.value) })}
                                    className="w-full md:w-1/2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Login Attempt Limit
                                </label>
                                <input
                                    type="number"
                                    value={securitySettings.loginAttemptLimit}
                                    onChange={(e) => setSecuritySettings({ ...securitySettings, loginAttemptLimit: parseInt(e.target.value) })}
                                    className="w-full md:w-1/2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Session Timeout (Minutes)
                                </label>
                                <input
                                    type="number"
                                    value={securitySettings.sessionTimeout}
                                    onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: parseInt(e.target.value) })}
                                    className="w-full md:w-1/2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all"
                                />
                            </div>

                            <ToggleSwitch
                                label="Two-Factor Authentication (Admin)"
                                description="Require 2FA for admin accounts"
                                checked={securitySettings.twoFactorAuth}
                                onChange={(checked) => setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })}
                            />
                        </div>
                    </div>
                )}

                {/* System & Maintenance Settings */}
                {activeTab === "system" && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">System & Maintenance</h2>

                        <div className="space-y-4">
                            <ToggleSwitch
                                label="Maintenance Mode"
                                description="Put the platform in maintenance mode"
                                checked={systemSettings.maintenanceMode}
                                onChange={(checked) => setSystemSettings({ ...systemSettings, maintenanceMode: checked })}
                            />

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Maintenance Message
                                </label>
                                <textarea
                                    value={systemSettings.maintenanceMessage}
                                    onChange={(e) => setSystemSettings({ ...systemSettings, maintenanceMessage: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all resize-none"
                                />
                            </div>

                            <div className="pt-4 border-t border-slate-200">
                                <h3 className="text-sm font-bold text-slate-900 mb-4">System Actions</h3>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={handleClearCache}
                                        className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors flex items-center gap-2"
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                        Clear Cache
                                    </button>
                                    <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors">
                                        View System Logs
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Save Button */}
                <div className="pt-6 border-t border-slate-200 mt-8">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-indigo-600/20 flex items-center gap-2"
                    >
                        <Save className="w-5 h-5" />
                        {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
}

// Toggle Switch Component
function ToggleSwitch({ label, description, checked, onChange }: {
    label: string;
    description: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}) {
    return (
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <div className="flex-1">
                <p className="font-medium text-slate-900">{label}</p>
                <p className="text-sm text-slate-500 mt-0.5">{description}</p>
            </div>
            <button
                type="button"
                onClick={() => onChange(!checked)}
                className={`relative w-14 h-7 rounded-full transition-colors ${checked ? "bg-indigo-600" : "bg-slate-300"
                    }`}
            >
                <span
                    className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${checked ? "translate-x-7" : ""
                        }`}
                />
            </button>
        </div>
    );
}
