import Link from "next/link";
import { ShieldCheck } from "lucide-react";

interface TrustProps {
    text: string[];
    finalCta?: {
        text: string;
        buttonText: string;
    };
}

export default function Trust({ text, finalCta }: TrustProps) {
    if (!text || text.length === 0) return null;

    return (
        <section id="final-cta" className="py-20 bg-zinc-50">
            <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-8">
                    <ShieldCheck className="w-8 h-8" />
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-8">
                    Quality First
                </h2>

                <div className="space-y-4 mb-16">
                    {text.map((paragraph, index) => (
                        <p key={index} className="text-lg md:text-xl text-zinc-700 font-medium leading-relaxed">
                            {paragraph}
                        </p>
                    ))}
                </div>

                {finalCta && (
                    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-zinc-100">
                        <h3 className="text-2xl font-bold text-zinc-900 mb-6">
                            {finalCta.text}
                        </h3>
                        <Link
                            href="/register/vendor"
                            className="inline-block w-full sm:w-auto px-8 py-4 rounded-full bg-indigo-600 text-white font-bold text-lg shadow-lg hover:bg-indigo-700 hover:-translate-y-1 transition-all"
                        >
                            {finalCta.buttonText.replace(/[\[\]]/g, '')}
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
