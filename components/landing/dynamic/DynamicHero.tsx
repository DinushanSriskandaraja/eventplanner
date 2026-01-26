import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface DynamicHeroProps {
    headline: React.ReactNode;
    subheadline: string;
    ctaText?: string;
    stats?: { label: string; value: string }[];
}

export default function DynamicHero({ headline, subheadline, ctaText, stats }: DynamicHeroProps) {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-purple-50 rounded-full blur-3xl opacity-30 -translate-x-1/3 translate-y-1/4"></div>

            <div className="container mx-auto px-4 md:px-6 text-center max-w-5xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold mb-8 animate-fade-in-up">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    Now accepting new vendors
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 mb-6 leading-[1.1]">
                    {headline}
                </h1>

                <p className="text-xl md:text-2xl text-zinc-600 mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
                    {subheadline}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                    <Link
                        href="/register/vendor"
                        className="w-full sm:w-auto px-8 py-4 rounded-full bg-indigo-600 text-white font-bold text-lg shadow-lg hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                    >
                        {ctaText || "Start Your Free Trial"} <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                        href="#how-it-works"
                        className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-zinc-700 font-bold text-lg border border-zinc-200 hover:bg-zinc-50 transition-all"
                    >
                        How it works
                    </Link>
                </div>

                {/* {stats && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-zinc-100 pt-10">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl font-black text-zinc-900 mb-1">{stat.value}</div>
                                <div className="text-sm text-zinc-500 font-medium uppercase tracking-wide">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                )} */}
            </div>
        </section>
    );
}
