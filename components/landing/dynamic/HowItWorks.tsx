import { UserPlus, ImagePlus, Handshake } from "lucide-react";

interface Step {
    title: string;
    description: string;
}

interface HowItWorksProps {
    title: string;
    steps: Step[];
}

export default function HowItWorks({ title, steps }: HowItWorksProps) {
    // We only support 3 steps for now due to hardcoded icons/layout in original
    // But we can Map icons if needed. For now I will reuse the original icons 
    // simply because they are generic enough (UserPlus, ImagePlus, Handshake)
    // or I can try to pass icons dynamically but the data structure didn't include them for HowItWorks.
    // The instructions said "1. Create profile, 2. Upload work, 3. Receive inquiries" which matches perfectly with UserPlus, ImagePlus, Handshake.

    const icons = [UserPlus, ImagePlus, Handshake];

    return (
        <section id="how-it-works" className="py-20 bg-zinc-50 border-b border-zinc-200">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 text-center mb-16">
                    {title}
                </h2>

                <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-5xl mx-auto">
                    {steps.map((step, index) => {
                        const Icon = icons[index] || icons[0];
                        return (
                            <div key={index} className="flex-1 bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm relative group hover:border-indigo-300 transition-all hover:-translate-y-1">
                                <div className="absolute top-4 right-6 text-6xl font-black text-zinc-100 select-none">{index + 1}</div>
                                <div className="relative">
                                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-6">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-zinc-900 mb-2">{step.title}</h3>
                                    <p className="text-zinc-600">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
