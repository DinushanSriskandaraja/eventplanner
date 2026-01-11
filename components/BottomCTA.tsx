import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function BottomCTA() {
    return (
        <section className="py-24 bg-white border-t border-zinc-100">
            <div className="container mx-auto px-4 md:px-6">
                <div className="bg-zinc-50 rounded-3xl p-8 md:p-12 lg:p-16 text-center border border-zinc-100 relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-60"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-60"></div>

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm mb-6">
                            <Sparkles className="w-6 h-6 text-indigo-600" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
                            Not sure who to choose?
                        </h2>
                        <p className="text-lg text-zinc-500 mb-8 leading-relaxed">
                            Tell us about your event and let our smart planning assistant recommend the perfect professionals for you.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/plan"
                                className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white rounded-full font-medium hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-200 hover:shadow-xl hover:scale-105"
                            >
                                Let’s Plan My Event
                            </Link>
                            <Link
                                href="/services"
                                className="w-full sm:w-auto px-8 py-4 bg-white text-zinc-900 border border-zinc-200 rounded-full font-medium hover:bg-zinc-50 transition-all flex items-center justify-center gap-2"
                            >
                                Browse Other Services <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
