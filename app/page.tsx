"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  CheckCircle2,
  Calendar,
  Users,
  Star,
  ArrowRight,
  Sparkles,
  ClipboardCheck,
  Search
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">

      {/* --- Navbar --- */}
      {/* --- Navbar --- */}
      <Navbar transparent={true} />

      <main>
        {/* --- Hero Section --- */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-purple-100 rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-indigo-100 rounded-full blur-3xl opacity-50 -translate-x-1/3 translate-y-1/4"></div>

          <div className="container mx-auto px-4 md:px-6 text-center max-w-5xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-8 border border-indigo-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              The #1 Platform for Smart Event Planning
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 mb-6 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              Plan Any Event. <br className="hidden md:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Find Best Professionals.
              </span>
              <br className="hidden md:block" /> Never Miss a Detail.
            </h1>

            <p className="text-lg md:text-xl text-zinc-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              Weddings, birthdays, corporate meets, and every celebration in between—planned smartly in one beautiful platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
              <Link
                href="#"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-indigo-600 text-white font-semibold text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all"
              >
                Let’s Plan Your Event
              </Link>
              <Link
                href="#"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-zinc-700 border border-zinc-200 font-semibold text-lg hover:bg-zinc-50 hover:border-zinc-300 transition-all flex items-center justify-center gap-2 group"
              >
                Explore Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* --- How It Works --- */}
        <section className="py-20 md:py-32 bg-zinc-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16 px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Planning made simple</h2>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto">From the first idea to the final toast, we guide you every step of the way.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
              {/* Step 1 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 group">
                <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-3">1. Choose Your Event</h3>
                <p className="text-zinc-600 leading-relaxed">
                  Select your event type—wedding, birthday, or corporate. We instantly tailor the experience to your needs.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300 group">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ClipboardCheck className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-3">2. Get a Smart Checklist</h3>
                <p className="text-zinc-600 leading-relaxed">
                  Receive a personalized step-by-step plan. Track tasks, budget, and deadlines in one easy dashboard.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-xl hover:shadow-pink-100/50 transition-all duration-300 group">
                <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-3">3. Discover Professionals</h3>
                <p className="text-zinc-600 leading-relaxed">
                  Browse verified venues, photographers, and catering services. Filter by price, rating, and style.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Why Choose Us (Benefits) --- */}
        <section className="py-20 md:py-32 bg-white overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

              {/* Image / Visual Side */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative z-10 grid grid-cols-2 gap-4">
                  <div className="space-y-4 translate-y-8">
                    <div className="bg-zinc-100 h-64 rounded-2xl w-full object-cover shadow-lg bg-[url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center"></div>
                    <div className="bg-zinc-100 h-48 rounded-2xl w-full object-cover shadow-lg bg-[url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-zinc-100 h-48 rounded-2xl w-full object-cover shadow-lg bg-[url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center"></div>
                    <div className="bg-zinc-100 h-64 rounded-2xl w-full object-cover shadow-lg bg-[url('https://images.unsplash.com/photo-1530103862676-de3c9a59af57?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center"></div>
                  </div>
                </div>
                {/* Decorative blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-50/50 rounded-full blur-3xl -z-10"></div>
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-1/2">
                <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-8 leading-tight">
                  Why not plan on your own?
                </h2>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <Star className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-zinc-900 mb-1">Top-Rated Professionals Only</h3>
                      <p className="text-zinc-600">We verify every vendor so you can book with 100% confidence.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-zinc-900 mb-1">Everything in One Place</h3>
                      <p className="text-zinc-600">No more messy spreadsheets. Manage budget, guest list, and vendors here.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-zinc-900 mb-1">Collaboration Tools</h3>
                      <p className="text-zinc-600">Invite your partner, family, or team to collaborate on the plan together.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <Link href="#" className="text-indigo-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                    Learn more about our benefits <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- CTA Section --- */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-zinc-900 rounded-[2.5rem] p-10 md:p-20 text-center relative overflow-hidden">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-[120px] opacity-20 -translate-x-1/2 translate-y-1/2"></div>

              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Start planning your event in minutes.</h2>
                <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">Join thousands of happy planners who created their perfect moments with us.</p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/plan"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-zinc-900 font-bold text-lg hover:bg-zinc-100 hover:scale-105 transition-all"
                  >
                    Let’s Plan Your Event
                  </Link>
                  <Link
                    href="/services"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border border-zinc-700 text-white font-semibold text-lg hover:bg-zinc-800 transition-all"
                  >
                    Browse Professionals
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="bg-white py-12 border-t border-zinc-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-zinc-900">EventPlanner</span>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-zinc-500">
              <Link href="#" className="hover:text-zinc-900 transition-colors">About Us</Link>
              <Link href="#" className="hover:text-zinc-900 transition-colors">Services</Link>
              <Link href="#" className="hover:text-zinc-900 transition-colors">Testimonials</Link>
              <Link href="#" className="hover:text-zinc-900 transition-colors">Contact</Link>
              <Link href="#" className="hover:text-zinc-900 transition-colors">Privacy Policy</Link>
            </div>

            <div className="text-sm text-zinc-400">
              © 2024 EventPlanner Inc.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
