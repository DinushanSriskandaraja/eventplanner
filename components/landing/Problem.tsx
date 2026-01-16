import { SearchX, DollarSign, Smartphone } from "lucide-react";

export default function Problem() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
                        Planning an event shouldn’t be stressful
                    </h2>
                    <p className="text-lg text-zinc-600">
                        We know the struggle. That’s why we built a better way.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
                    {/* Pain Point 1 */}
                    <div className="text-center p-6">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-6">
                            <Smartphone className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 mb-3">Endless Instagram scrolling</h3>
                        <p className="text-zinc-600">
                            Lost in DMs? Stop chasing. Browse <strong>verified service providers</strong> with ease.
                        </p>
                    </div>

                    {/* Pain Point 2 */}
                    <div className="text-center p-6">
                        <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 mx-auto mb-6">
                            <DollarSign className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 mb-3">Unclear pricing & availability</h3>
                        <p className="text-zinc-600">
                            Tired of asking "Price please"? View <strong>professional service portfolios</strong> with upfront details.
                        </p>
                    </div>

                    {/* Pain Point 3 */}
                    <div className="text-center p-6">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-zinc-600 mx-auto mb-6">
                            <SearchX className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 mb-3">No single place to compare</h3>
                        <p className="text-zinc-600">
                            Notebooks and spreadsheets are old school. Compare side-by-side.
                        </p>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <p className="text-xl font-medium text-indigo-600 bg-indigo-50 inline-block px-6 py-2 rounded-full">
                        We make it simple.
                    </p>
                </div>
            </div>
        </section>
    );
}
