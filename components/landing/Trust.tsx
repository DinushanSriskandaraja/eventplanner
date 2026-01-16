import { Ban, CreditCard, MessageSquare } from "lucide-react";

export default function Trust() {
    return (
        <section className="py-20 bg-zinc-50 border-y border-zinc-100">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-zinc-200">

                    <div className="px-4 py-4 md:py-0">
                        <div className="w-12 h-12 bg-zinc-200 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-600">
                            <Ban className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-zinc-900 mb-2">We are not an agency</h3>
                        <p className="text-zinc-600 text-sm">You hire vendors directly. We don't interfere.</p>
                    </div>

                    <div className="px-4 py-4 md:py-0">
                        <div className="w-12 h-12 bg-zinc-200 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-600">
                            <CreditCard className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-zinc-900 mb-2">No booking commissions</h3>
                        <p className="text-zinc-600 text-sm">We don't charge you a fee for booking services.</p>
                    </div>

                    <div className="px-4 py-4 md:py-0">
                        <div className="w-12 h-12 bg-zinc-200 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-600">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-zinc-900 mb-2">Direct Communication</h3>
                        <p className="text-zinc-600 text-sm">Your enquiries go straight to the vendor's inbox.</p>
                    </div>

                </div>
            </div>
        </section>
    );
}
