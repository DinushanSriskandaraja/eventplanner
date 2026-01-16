import Link from "next/link";
import { ArrowRight, Camera, Music, Sparkles, User, Palette } from "lucide-react";

const CATEGORIES = [
    {
        title: "Wedding Photographers",
        description: "Colombo & Island-wide",
        icon: Camera,
        color: "bg-blue-100 text-blue-600",
        href: "/services/photography"
    },
    {
        title: "Event Decorators",
        description: "Galle & South Coast",
        icon: Sparkles,
        color: "bg-purple-100 text-purple-600",
        href: "/services/decoration"
    },
    {
        title: "Makeup Artists",
        description: "Kandy & Hill Country",
        icon: Palette,
        color: "bg-pink-100 text-pink-600",
        href: "/services/makeup"
    },
    {
        title: "Sound, Lighting & DJs",
        description: "For any party size",
        icon: Music,
        color: "bg-orange-100 text-orange-600",
        href: "/services/sound-lighting"
    },
    {
        title: "Event Planners",
        description: "Full service planning",
        icon: User,
        color: "bg-green-100 text-green-600",
        href: "/services/planners"
    },
];

export default function Categories() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-12 text-center">Popular Categories</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {CATEGORIES.map((cat, idx) => (
                        <Link
                            key={idx}
                            href={cat.href}
                            className="group block p-6 rounded-2xl border border-zinc-100 bg-zinc-50 hover:bg-white hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-50 transition-all duration-300"
                        >
                            <div className={`w-14 h-14 ${cat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <cat.icon className="w-7 h-7" />
                            </div>
                            <h3 className="font-bold text-zinc-900 mb-1">{cat.title}</h3>
                            <p className="text-xs text-zinc-500 mb-2">{cat.description}</p>
                            <div className="flex items-center text-sm font-medium text-indigo-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                                View vendors <ArrowRight className="w-3 h-3 ml-1" />
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/services" className="inline-flex items-center font-semibold text-zinc-900 border-b-2 border-zinc-200 hover:border-zinc-900 transition-colors">
                        View all categories <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
