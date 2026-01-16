"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQ() {
    const faqs = [
        {
            question: "Is this free to use?",
            answer: "Yes, for event planners and clients, browsing and enquiring is completely free. We don't charge any booking fees."
        },
        {
            question: "How do enquiries work?",
            answer: "You send an enquiry directly through the vendor's profile. They will receive it via email/dashboard and contact you back directly."
        },
        {
            question: "Are vendors verified?",
            answer: "We verify vendor identities and portfolios to ensure you are connecting with legitimate business owners."
        },
        {
            question: "Do I need to sign up to enquire?",
            answer: "We recommend signing up so you can track your enquiries and conversations, but you can browse without an account."
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-12 text-center">Frequently Asked Questions</h2>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <FAQItem key={idx} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-zinc-200 rounded-lg overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-zinc-50 transition-colors"
            >
                <span className="font-semibold text-zinc-900">{question}</span>
                {isOpen ? <ChevronUp className="w-5 h-5 text-zinc-400" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
            </button>
            {isOpen && (
                <div className="p-5 pt-0 text-zinc-600 bg-white">
                    {answer}
                </div>
            )}
        </div>
    );
}
