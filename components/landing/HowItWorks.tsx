import { Search, Heart, MessageCircle } from "lucide-react";

export default function HowItWorks() {
    return (
        <section className="py-20 bg-zinc-50 px-4 md:px-6">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 text-center mb-16">How it works</h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Step 1 */}
                    <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm relative overflow-hidden group hover:border-indigo-300 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-9xl text-zinc-300 pointer-events-none select-none">1</div>
                        <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white mb-6 shadow-indigo-200 shadow-lg group-hover:scale-110 transition-transform">
                            <Search className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 mb-3">Browse Portfolios</h3>
                        <p className="text-zinc-600">Explore verified event vendors. Find the best <strong>contact service Sri Lanka</strong> options.</p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm relative overflow-hidden group hover:border-indigo-300 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-9xl text-zinc-300 pointer-events-none select-none">2</div>
                        <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white mb-6 shadow-indigo-200 shadow-lg group-hover:scale-110 transition-transform">
                            <Heart className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 mb-3">Compare & Shortlist</h3>
                        <p className="text-zinc-600">See real work and reviews. Compare <strong>service providers</strong> to find your match.</p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm relative overflow-hidden group hover:border-indigo-300 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-9xl text-zinc-300 pointer-events-none select-none">3</div>
                        <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white mb-6 shadow-indigo-200 shadow-lg group-hover:scale-110 transition-transform">
                            <MessageCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 mb-3">Send Enquiries</h3>
                        <p className="text-zinc-600"><strong>Send enquiries directly</strong> — no middlemen. Discuss your event details.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
