import { LucideIcon } from "lucide-react";

interface SolutionItem {
    icon: LucideIcon;
    title: string;
    description: string;
}

interface SolutionProps {
    title: string;
    subtitle: string;
    items: SolutionItem[];
}

export default function Solution({ title, subtitle, items }: SolutionProps) {
    return (
        <section className="py-20 bg-zinc-900 text-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        {title}
                    </h2>
                    <p className="text-lg text-zinc-400">
                        {subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
                    {items.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={index} className="flex flex-col items-center text-center">
                                <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-900/20">
                                    <Icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                                <p className="text-zinc-400 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
