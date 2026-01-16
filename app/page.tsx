"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/landing/Hero";
import SocialProof from "@/components/landing/SocialProof";
import Problem from "@/components/landing/Problem";
import HowItWorks from "@/components/landing/HowItWorks";
import Categories from "@/components/landing/Categories";
import VendorCTA from "@/components/landing/VendorCTA";
import Trust from "@/components/landing/Trust";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">

      {/* Navbar with transparency mode enabled for Hero overlap if needed, but Hero has padding */}
      <Navbar transparent={false} />

      <main>
        <Hero />
        <SocialProof />
        <Problem />
        <HowItWorks />
        <Categories />
        <VendorCTA />
        <Trust />
        <FAQ />
        <FinalCTA />
      </main>

      {/* Footer - Keeping existing footer design for consistency */}
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
              <Link href="/services" className="hover:text-zinc-900 transition-colors">Services</Link>
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
