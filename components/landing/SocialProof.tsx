import { ShieldCheck, MapPin, Users } from "lucide-react";

export default function SocialProof() {
    return (
        <section className="py-10 bg-zinc-50 border-y border-zinc-100">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">

                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                            <Users className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-bold text-zinc-900 text-lg">100+ Vendors</p>
                            <p className="text-sm text-zinc-500">Ready to hire</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-bold text-zinc-900 text-lg">Across Sri Lanka</p>
                            <p className="text-sm text-zinc-500">Local experts</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-bold text-zinc-900 text-lg">Verified Profiles</p>
                            <p className="text-sm text-zinc-500">Trust & safety</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
