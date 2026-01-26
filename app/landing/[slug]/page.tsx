import { getLandingContent } from "@/lib/landing-content";
import Navbar from "@/components/Navbar";
import DynamicHero from "@/components/landing/dynamic/DynamicHero";
import Problem from "@/components/landing/dynamic/Problem";
import Solution from "@/components/landing/dynamic/Solution";
import HowItWorks from "@/components/landing/dynamic/HowItWorks";
import SpecialOffer from "@/components/landing/dynamic/SpecialOffer";
import Trust from "@/components/landing/dynamic/Trust";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata(props: PageProps) {
    const params = await props.params;
    const { slug } = params;

    // Simple verification if slug exists in our "database"
    // In a real app, you might check if the slug is valid

    return {
        title: `Grow your ${slug} business with EsyEvent`,
        description: "The all-in-one platform for event professionals to manage bookings, showcase portfolios, and get paid.",
    };
}

export default async function LandingPage(props: PageProps) {
    const params = await props.params;
    const { slug } = params;

    const content = getLandingContent(slug);

    if (!content) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
            <Navbar transparent={false} />

            <main>
                <DynamicHero
                    headline={content.hero.headline}
                    subheadline={content.hero.subheadline}
                    ctaText={content.hero.ctaText}
                    stats={content.hero.stats}
                />
                <Problem
                    title={content.problem.title}
                    subtitle={content.problem.subtitle}
                    items={content.problem.items}
                />
                <Solution
                    title={content.solution.title}
                    subtitle={content.solution.subtitle}
                    items={content.solution.items}
                />
                <HowItWorks
                    title={content.howItWorks.title}
                    steps={content.howItWorks.steps}
                />
                <SpecialOffer
                    title={content.whyJoin.title}
                    subtitle={content.whyJoin.subtitle}
                    benefits={content.whyJoin.benefits}
                />
                <Trust
                    text={content.trust?.text || []}
                    finalCta={content.finalCta}
                />
            </main>

            {/* Footer - Consistent with main site */}
            <footer className="bg-white py-12 border-t border-zinc-100">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
                                <Sparkles className="w-4 h-4" />
                            </div>
                            <span className="text-lg font-bold text-zinc-900">EsyEvent</span>
                        </div>

                        <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-zinc-500">
                            <Link href="#" className="hover:text-zinc-900 transition-colors">About Us</Link>
                            <Link href="/services" className="hover:text-zinc-900 transition-colors">Services</Link>
                            <Link href="#" className="hover:text-zinc-900 transition-colors">Testimonials</Link>
                            <Link href="#" className="hover:text-zinc-900 transition-colors">Contact</Link>
                            <Link href="#" className="hover:text-zinc-900 transition-colors">Privacy Policy</Link>
                        </div>

                        <div className="text-sm text-zinc-400">
                            © 2026 EsyEvent Inc.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
