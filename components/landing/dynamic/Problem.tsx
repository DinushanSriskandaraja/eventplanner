import { LucideIcon } from "lucide-react";

interface ProblemItem {
    icon: LucideIcon;
    title: string;
    description: string;
}

interface ProblemProps {
    title: string;
    subtitle: string;
    items: ProblemItem[];
}

export default function Problem({ title, subtitle, items }: ProblemProps) {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
                        {title}
                    </h2>
                    <p className="text-lg text-zinc-600">
                        {subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
                    {items.map((item, index) => {
                        const Icon = item.icon;
                        // Determine color based on index or just simple colors for now
                        // Matching original: 0=red, 1=orange, 2=zinc/gray
                        let colorClass = "bg-zinc-100 text-zinc-700";
                        if (index === 0) colorClass = "bg-red-100 text-red-600";
                        if (index === 1) colorClass = "bg-orange-100 text-orange-600";
                        if (index === 2) colorClass = "bg-gray-200 text-zinc-700";

                        return (
                            <div key={index} className="text-center p-6 bg-zinc-50 rounded-2xl">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${colorClass}`}>
                                    <Icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-zinc-900 mb-3">{item.title}</h3>
                                <p className="text-zinc-600">
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
