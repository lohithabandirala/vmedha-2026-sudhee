'use client'

import { ScrollReveal } from '@/components/animations/scroll-reveal'
import { HudBadge } from '@/components/ui/hud-frame'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'

export function FaqSection() {
    const faqs = [
        {
            question: "What is Vive-le-Tech?",
            answer: "Vive-le-Tech is our technical symposium designed to celebrate innovation and technology. It brings together brilliant minds to compete, learn, and showcase their skills through various technical challenges."
        },
        {
            question: "When do the events begin?",
            answer: "The events take place over two days, on February 17th and February 18th."
        },
        {
            question: "Who can participate in the events?",
            answer: "The events are open to all students and professionals. Whether you are a beginner or an expert, there is something for everyone to participate in and learn from."
        },
        {
            question: "How do I register for CipherVille / DSA MASTER / EthiTechMania?",
            answer: "You can register for specific events like CipherVille, DSA Masters, and EthiTechMania through our event registration portal. Simply navigate to the specific event card on the home page and click 'Register' to secure your spot."
        },
        {
            question: "Is there any registration fee?",
            answer: "No, the events are absolutely free and open to everyone."
        },
        {
            question: "Do participants get certificates?",
            answer: "Yes, participants will receive certificates for selected events and activities conducted by the club."
        },
        {
            question: "Will there be prizes for winners?",
            answer: "Yes! Winners of each event will receive exciting prizes. Stay tuned for more details on the prize pool for each competition."
        },
        {
            question: "Can I participate in multiple events?",
            answer: "Absolutely! You can register for all three events. We even have an 'All 3 Events (Combo)' option for easy registration."
        },
        {
            question: "Can students other than CBIT participate?",
            answer: "Yes! The events are open to all college students. Both CBIT and Non-CBIT students are welcome to register and participate."
        },
        {
            question: "How many activity points will be provided?",
            answer: "CBIT students will receive 5-10 activity points for each event they participate in."
        }
    ]

    return (
        <section id="faq" className="py-24 px-6 relative">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-[#00F2FF]/5 blur-[100px]" />
                <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-[#7D7DBE]/5 blur-[100px]" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Section header */}
                <div className="text-center mb-16">
                    <ScrollReveal>
                        <HudBadge variant="accent" className="mb-4">FAQ</HudBadge>
                    </ScrollReveal>
                    <ScrollReveal delay={100}>
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-[#E6E9FF] mb-6">
                            Frequently Asked <span className="text-[#00F2FF] text-glow-cyan">Questions</span>
                        </h2>
                    </ScrollReveal>
                    <ScrollReveal delay={200}>
                        <p className="text-lg text-[#7D7DBE] max-w-2xl mx-auto">
                            Everything you need to know about the event and participation.
                        </p>
                    </ScrollReveal>
                </div>

                {/* FAQ Accordion */}
                <ScrollReveal delay={300}>
                    <div className="bg-[#1A1C3D]/30 backdrop-blur-sm rounded-xl border border-[#3A3F7A]/50 overflow-hidden">
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index}`} className="border-b border-[#3A3F7A]/50 last:border-0 px-6 group transition-colors duration-300 hover:bg-[#3A3F7A]/10">
                                    <AccordionTrigger className="text-[#E6E9FF] hover:text-[#00F2FF] hover:no-underline py-6 text-left transition-all duration-300 group-hover:pl-2">
                                        <span className="text-lg font-medium shadow-[#00F2FF]/0 group-hover:shadow-[0_0_10px_rgba(0,242,255,0.3)] transition-shadow">{faq.question}</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-[#7D7DBE] text-base pb-6 leading-relaxed">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}
