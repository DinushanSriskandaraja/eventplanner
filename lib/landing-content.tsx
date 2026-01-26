import React from "react";
import {
    MessageSquareX, Banknote, EyeOff, Layout, BadgeCheck, UserCheck,
    UserPlus, ImagePlus, Handshake, CheckCircle2
} from "lucide-react";

export interface LandingPageContent {
    slug: string;
    hero: {
        headline: React.ReactNode;
        subheadline: string;
        ctaText?: string;
        stats?: { label: string; value: string }[];
    };
    problem: {
        title: string;
        subtitle: string;
        items: {
            icon: any; // Using any for simplicity with Lucide icons in data
            title: string;
            description: string;
        }[];
    };
    solution: {
        title: string;
        subtitle: string;
        items: {
            icon: any;
            title: string;
            description: string;
        }[];
    };
    howItWorks: {
        title: string;
        steps: {
            title: string;
            description: string;
        }[];
    };
    whyJoin: {
        title: string;
        subtitle: string;
        benefits: string[];
    };
    trust?: {
        text: string[];
    };
    finalCta?: {
        text: string;
        buttonText: string;
    };
}

// Default Content (Reverse engineered from existing hardcoded components)
const defaultProblem = {
    title: "Is growing your business harder than it should be?",
    subtitle: "Great talent shouldn't struggle to find great clients.",
    items: [
        {
            icon: MessageSquareX,
            title: "Tired of \"Price please\" DMs?",
            description: "Wasting hours replying to low-intent leads on Instagram who ghost you after hearing the price."
        },
        {
            icon: EyeOff,
            title: "Hard to stand out?",
            description: "Your work is amazing, but it's getting buried under thousands of other posts in the feed."
        },
        {
            icon: Banknote,
            title: "Inconsistent Bookings",
            description: "Feast or famine? Relying on word-of-mouth alone makes it hard to predict your next month's income."
        }
    ]
};

const defaultSolution = {
    title: "Build your brand on a platform that values quality",
    subtitle: "EsyEvent is built to help professionals showcase their work and get hired.",
    items: [
        {
            icon: Layout,
            title: "Professional Portfolio",
            description: "A dedicated space to showcase your high-resolution images, videos, and packages without the clutter."
        },
        {
            icon: BadgeCheck,
            title: "Verified Credibility",
            description: "Stand out with a \"Verified Provider\" badge. Clients trust professionals who are vetted and authentic."
        },
        {
            icon: UserCheck,
            title: "High-Quality Leads",
            description: "Receive detailed enquiries from clients who have seen your work and pricing, and are ready to book."
        }
    ]
};

const defaultHowItWorks = {
    title: "How it works for Vendors",
    steps: [
        {
            title: "Create Account",
            description: "Sign up in minutes. It’s free to get started and list your basic services."
        },
        {
            title: "Build Profile",
            description: "Upload your best work, set your pricing packages, and tell your story."
        },
        {
            title: "Get Booked",
            description: "Respond to enquiries and manage your bookings directly through our platform."
        }
    ]
};

const defaultWhyJoin = {
    title: "Launch Your Business With 3 Months Free Pro Access",
    subtitle: "We are opening early access for top-tier vendors. Claim your spot and get full access to all premium features.",
    benefits: [
        "Zero commission on first 10 bookings",
        "Featured placement on search results",
        "Premium profile customization"
    ]
};

export const landingPages: Record<string, LandingPageContent> = {
    "aari-designers": {
        slug: "aari-designers",
        hero: {
            headline: (
                <>
                    Get Aari Work Orders <br className="hidden md:block" />
                    <span className="text-indigo-600">Without Ads or Daily Instagram Posting</span>
                </>
            ),
            subheadline: "We help Aari designers connect with people actively looking for Aari work — so you get inquiries without chasing referrals or posting every day.",
            ctaText: "Get Early Access (Free for 3 Months)",
            stats: [
                { label: "Active Clients", value: "500+" },
                { label: "Avg Order", value: "Rs. 8k" },
                { label: "Commission", value: "0%" },
                { label: "Setup Time", value: "2 min" },
            ]
        },
        problem: {
            title: "Still Waiting for Orders After Posting Every Day?",
            subtitle: "Most Aari designers today depend on posting daily and waiting for referrals, yet still struggle to get consistent orders.",
            items: [
                {
                    icon: ImagePlus,
                    title: "Posting daily on Instagram",
                    description: "Feeling the pressure to constantly create content just to stay visible, taking time away from actual design work."
                },
                {
                    icon: Handshake,
                    title: "Waiting for referrals",
                    description: "Unpredictable income because you're relying on previous clients to recommend you."
                },
                {
                    icon: MessageSquareX,
                    title: "Answering random DMs",
                    description: "Spending hours chatting with people who have no serious intent to book."
                }
            ]
        },
        solution: {
            title: "We created a space only for service-ready customers.",
            subtitle: "How we help you:",
            items: [
                {
                    icon: Layout,
                    title: "Showcase your Aari designs properly",
                    description: "A professional portfolio that highights the intricate details of your work better than social media."
                },
                {
                    icon: UserCheck,
                    title: "Get inquiries from interested people",
                    description: "Connect with clients who are actually looking for Aari work right now."
                },
                {
                    icon: CheckCircle2,
                    title: "No ads. No daily posting.",
                    description: "Stop spamming DMs or paying for ads. Let the customers come to you."
                }
            ]
        },
        howItWorks: {
            title: "How It Works",
            steps: [
                {
                    title: "Create your Aari designer profile",
                    description: "Simple setup to establish your professional presence."
                },
                {
                    title: "Upload your best work",
                    description: "Showcase your finest Aari embroidery designs to attract clients."
                },
                {
                    title: "Receive direct inquiries",
                    description: "Get messages directly from interested clients without extra effort."
                }
            ]
        },
        whyJoin: {
            title: "We’re onboarding early designers.",
            subtitle: "You lose nothing by joining early.",
            benefits: [
                "Free access for 3 months",
                "No commissions for early users",
                "Profile setup support included"
            ]
        },
        trust: {
            text: [
                "We are starting with a limited number of Aari designers to ensure quality inquiries.",
                "This is not social media. This is not another posting app.",
                "It’s a lead source for serious clients."
            ]
        },
        finalCta: {
            text: "Ready to get inquiries without posting every day?",
            buttonText: "[Join as an Aari Designer – Free Access]"
        }
    },
    "photographers": {
        slug: "photographers",
        hero: {
            headline: (
                <>
                    Get more high-value <br className="hidden md:block" />
                    <span className="text-indigo-600">Photography Clients</span>
                </>
            ),
            subheadline: "Stop relying on word-of-mouth. Showcase your portfolio to thousands of couples looking for the perfect wedding photographer.",
            stats: [
                { label: "Active Couples", value: "2,000+" },
                { label: "Avg Booking", value: "Rs. 150k" },
                { label: "Commission", value: "0%" },
                { label: "Setup Time", value: "5 min" },
            ]
        },
        problem: defaultProblem,
        solution: defaultSolution,
        howItWorks: defaultHowItWorks,
        whyJoin: defaultWhyJoin
    },
    "planners": {
        slug: "planners",
        hero: {
            headline: (
                <>
                    Connect with couples <br className="hidden md:block" />
                    <span className="text-indigo-600">Planning Their Big Day</span>
                </>
            ),
            subheadline: "You organize everything. Let us organize your leads. Build your reputation and fill your calendar with serious clients.",
            stats: [
                { label: "Event Budgets", value: "$5k - $50k" },
                { label: "Leads/Month", value: "50+" },
                { label: "Commission", value: "0%" },
                { label: "Verified", value: "100%" },
            ]
        },
        problem: defaultProblem,
        solution: defaultSolution,
        howItWorks: defaultHowItWorks,
        whyJoin: defaultWhyJoin
    },
    "makeup-artists": {
        slug: "makeup-artists",
        hero: {
            headline: (
                <>
                    Fill your calendar with <br className="hidden md:block" />
                    <span className="text-indigo-600">Bridal Makeup Bookings</span>
                </>
            ),
            subheadline: "Showcase your looks, manage your availability, and get booked by brides-to-be without the Instagram DM chaos.",
            stats: [
                { label: "Bridal Enquiries", value: "500+" },
                { label: "Avg Rate", value: "Rs. 45k" },
                { label: "Commission", value: "0%" },
                { label: "Growth", value: "3x" },
            ]
        },
        problem: defaultProblem,
        solution: defaultSolution,
        howItWorks: defaultHowItWorks,
        whyJoin: defaultWhyJoin
    },
    "default": {
        slug: "default",
        hero: {
            headline: (
                <>
                    Grow your <br className="hidden md:block" />
                    <span className="text-indigo-600">Event Business</span>
                </>
            ),
            subheadline: "The all-in-one platform to showcase your services, manage bookings, and get paid. Join the fastest growing vendor network in Sri Lanka.",
            stats: [
                { label: "Active Users", value: "10k+" },
                { label: "Vendors", value: "500+" },
                { label: "Events Planned", value: "1,200" },
                { label: "Trust Score", value: "4.9/5" },
            ]
        },
        problem: defaultProblem,
        solution: defaultSolution,
        howItWorks: defaultHowItWorks,
        whyJoin: defaultWhyJoin
    }
};

export function getLandingContent(slug: string): LandingPageContent {
    return landingPages[slug] || landingPages["default"];
}
