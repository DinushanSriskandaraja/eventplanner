import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-8 tracking-tight">
                    Start planning your event today
                </h2>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/services"
                        className="w-full sm:w-auto px-10 py-4 rounded-full bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                    >
                        Browse Vendors
                    </Link>
                    <Link
                        href="/register/vendor"
                        className="w-full sm:w-auto px-10 py-4 rounded-full bg-white border border-zinc-200 text-zinc-900 font-bold text-lg hover:bg-zinc-50 hover:border-zinc-300 transition-colors"
                    >
                        Get Listed as a Vendor
                    </Link>
                </div>
            </div>
        </section>
    );
}
