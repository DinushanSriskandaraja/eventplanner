import { getUserEnquiries } from './actions'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin, Clock } from 'lucide-react'

export default async function UserDashboard() {
    const enquiries = await getUserEnquiries()

    return (
        <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
            <Navbar />

            <div className="pt-24 pb-12 bg-white border-b border-zinc-100">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-3xl font-bold text-zinc-900">My Dashboard</h1>
                    <p className="text-zinc-500 mt-2">Manage your event enquiries and bookings</p>
                </div>
            </div>

            <main className="container mx-auto px-4 md:px-6 py-12">
                <h2 className="text-xl font-bold mb-6">Recent Enquiries</h2>

                {enquiries && enquiries.length > 0 ? (
                    <div className="grid gap-6">
                        {enquiries.map((enquiry: any) => (
                            <div key={enquiry.id} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col md:flex-row gap-6">
                                {/* Provider Info */}
                                <div className="flex items-start gap-4 md:w-1/3 border-b md:border-b-0 md:border-r border-zinc-100 pb-4 md:pb-0 md:pr-4">
                                    <div className="w-16 h-16 rounded-xl bg-zinc-100 relative overflow-hidden flex-shrink-0">
                                        {enquiry.providers?.image_url ? (
                                            <Image
                                                src={enquiry.providers.image_url}
                                                alt={enquiry.providers.business_name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs">No Img</div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{enquiry.providers?.business_name || 'Unknown Provider'}</h3>
                                        {enquiry.providers?.location && (
                                            <p className="text-sm text-zinc-500 flex items-center gap-1 mt-1">
                                                <MapPin className="w-3 h-3" /> {enquiry.providers.location}
                                            </p>
                                        )}
                                        <Link href={`/services/provider/${enquiry.provider_id}`} className="text-sm text-indigo-600 font-medium hover:underline mt-2 block">
                                            View Profile
                                        </Link>
                                    </div>
                                </div>

                                {/* Enquiry Details */}
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${enquiry.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' :
                                                enquiry.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                    'bg-amber-100 text-amber-700'
                                            }`}>
                                            {enquiry.status}
                                        </span>
                                        <span className="text-xs text-zinc-400 flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {new Date(enquiry.created_at).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-zinc-500 text-xs mb-0.5">Event Type</p>
                                            <p className="font-medium capitalize">{enquiry.event_type}</p>
                                        </div>
                                        <div>
                                            <p className="text-zinc-500 text-xs mb-0.5">Event Date</p>
                                            <p className="font-medium flex items-center gap-1">
                                                <Calendar className="w-3 h-3 text-zinc-400" />
                                                {enquiry.event_date}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-zinc-50 p-3 rounded-lg text-sm text-zinc-600 italic">
                                        "{enquiry.message}"
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-zinc-200">
                        <h3 className="text-lg font-bold text-zinc-900 mb-2">No Enquiries Yet</h3>
                        <p className="text-zinc-500 mb-6">You haven't contacted any providers yet.</p>
                        <Link href="/services" className="px-6 py-2.5 bg-zinc-900 text-white rounded-full font-medium hover:bg-zinc-800 transition-all">
                            Browse Services
                        </Link>
                    </div>
                )}
            </main>
        </div>
    )
}
