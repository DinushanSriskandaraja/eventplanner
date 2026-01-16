import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white">
            {/* Background decoration - kept subtle as requested */}
            <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/4"></div>

            <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 mb-6 leading-[1.1]">
                    Find Trusted Event <br className="hidden md:block" />
                    <span className="text-indigo-600">Service Providers</span> in Sri Lanka
                </h1>

                <p className="text-xl md:text-2xl text-zinc-600 mb-10 max-w-2xl mx-auto font-medium">
                    View real portfolios. Hire the best photographers, decorators, and planners in Sri Lanka.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                    <Link
                        href="/services"
                        className="w-full sm:w-auto px-8 py-4 rounded-full bg-indigo-600 text-white font-bold text-lg shadow-lg hover:bg-indigo-700 hover:-translate-y-1 transition-all"
                    >
                        Browse Vendors
                    </Link>
                </div>

                <div className="flex items-center justify-center">
                    <Link
                        href="/register/vendor"
                        className="text-sm font-semibold text-zinc-500 hover:text-indigo-600 transition-colors flex items-center gap-1"
                    >
                        Are you a vendor? Get listed <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
