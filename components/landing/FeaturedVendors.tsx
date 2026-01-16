import Link from "next/link";
import { Star, MapPin } from "lucide-react";

// Dummy data for featured vendors
const FEATURED_VENDORS = [
    {
        name: "Lumina Weddings",
        category: "Photography",
        location: "Colombo",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Floral Dreams",
        category: "Decoration",
        location: "Kandy",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1561582208-e87f58547d2f?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "BeatBox DJ",
        category: "Sound & Lighting",
        location: "Galle",
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1542129525-4ae036fb05a1?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Elegant Events",
        category: "Event Planner",
        location: "Negombo",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop"
    },
];

export default function FeaturedVendors() {
    return (
        <section className="py-20 bg-zinc-50">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-12 text-center">Top Rated Professionals</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {FEATURED_VENDORS.map((vendor, idx) => (
                        <div key={idx} className="bg-white rounded-xl overflow-hidden border border-zinc-200 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="h-48 overflow-hidden bg-zinc-200 relative">
                                <img
                                    src={vendor.image}
                                    alt={vendor.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-zinc-900 flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    {vendor.rating}
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="text-xs font-semibold text-indigo-600 mb-2 uppercase tracking-wide">{vendor.category}</div>
                                <h3 className="font-bold text-zinc-900 text-lg mb-1">{vendor.name}</h3>
                                <div className="flex items-center text-zinc-500 text-sm mb-4">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {vendor.location}
                                </div>

                                <Link
                                    href={`/services/vendor/${idx}`} // Placeholder link
                                    className="block w-full text-center py-2 rounded-lg border border-zinc-200 font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
                                >
                                    View portfolio
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
