import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function VendorCTA() {
    return (
        <section className="py-20 px-4 md:px-6">
            <div className="container mx-auto">
                <div className="bg-zinc-900 rounded-[2rem] overflow-hidden relative">

                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[100px] opacity-20 translate-x-1/3 -translate-y-1/2"></div>

                    <div className="grid md:grid-cols-2 gap-12 items-center p-8 md:p-16 relative z-10">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Are you an event vendor?
                            </h2>
                            <p className="text-zinc-400 text-lg mb-8">
                                Showcase your <strong>professional portfolio</strong> and <strong>receive enquiries from clients</strong> directly.
                            </p>

                            <ul className="space-y-4 mb-10">
                                {[
                                    "Professional online portfolio",
                                    "Direct client enquiries",
                                    "More credibility than social media alone"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-zinc-300">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-col sm:flex-row gap-4 items-center">
                                <Link
                                    href="/register/vendor"
                                    className="w-full sm:w-auto px-8 py-3 rounded-full bg-white text-zinc-900 font-bold hover:bg-zinc-100 transition-colors text-center"
                                >
                                    Create your portfolio
                                </Link>
                                <span className="text-sm text-zinc-500 font-medium tracking-wide uppercase">Early access available</span>
                            </div>
                        </div>

                        <div className="hidden md:block relative h-full min-h-[400px]">
                            {/* Abstract representation of a dashboard or portfolio */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm aspect-[4/5] bg-zinc-800 rounded-xl border border-zinc-700 shadow-2xl skew-y-6 rotate-6 opacity-80"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm aspect-[4/5] bg-zinc-800 rounded-xl border border-zinc-700 shadow-2xl -skew-y-3 -rotate-3 overflow-hidden">
                                <div className="h-1/2 bg-zinc-700 w-full animate-pulse"></div>
                                <div className="p-6 space-y-4">
                                    <div className="h-4 bg-zinc-700 rounded w-3/4"></div>
                                    <div className="h-4 bg-zinc-700 rounded w-1/2"></div>
                                    <div className="flex gap-2 pt-4">
                                        <div className="h-10 bg-indigo-600 rounded-lg w-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
