"use client";

import Link from "next/link";
import { Timer, Star, CheckCircle } from "lucide-react";

interface SpecialOfferProps {
    title: string;
    subtitle: string;
    benefits: string[];
}

export default function SpecialOffer({ title, subtitle, benefits }: SpecialOfferProps) {
    return (
        <section className="py-24 bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 bg-indigo-500/30 border border-indigo-400/30 rounded-full px-4 py-1.5 text-indigo-100 text-sm font-medium mb-8 animate-pulse">
                    <Timer className="w-4 h-4" /> Limited Time Offer
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                    {title}
                </h2>

                <p className="text-xl md:text-2xl text-indigo-100 max-w-2xl mx-auto mb-10 font-medium">
                    {subtitle}
                </p>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-xl mx-auto border border-white/20 mb-10">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-indigo-200 font-medium">Spots Remaining</span>
                        <span className="text-white font-bold text-xl">4 / 25</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3 mb-6">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full w-[84%] shadow-[0_0_15px_rgba(250,204,21,0.5)]"></div>
                    </div>

                    <ul className="text-left space-y-3 mb-0">
                        {benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center gap-3 text-indigo-50">
                                <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <Link
                    href="#final-cta" // Scrolling to bottom or just direct link
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-indigo-900 transition-all bg-white rounded-full hover:bg-indigo-50 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)] cursor-pointer"
                >
                    Claim Free Access <Star className="w-5 h-5 ml-2 fill-indigo-900 text-indigo-900" />
                </Link>

                <p className="mt-4 text-sm text-indigo-300">
                    No credit card required. Pro trial ends automatically.
                </p>
            </div>
        </section>
    );
}
