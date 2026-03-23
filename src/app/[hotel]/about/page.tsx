"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import {
    heroTagline, heroTitle, heroTitlePopup, lineWipe,
    fadeUp, fadeLeft, fadeRight, zoomIn, scaleUp,
    RevealGroup, Reveal, clipReveal
} from "@/components/animations";
import { useHotel } from "@/lib/hotelContext";

export default function AboutPage() {
    const hotel = useHotel();
    const containerRef = useRef(null);
    const historySectionRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            {/* ── Hero ── */}
            <section ref={containerRef} className="relative h-[65vh] flex items-end overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-0 z-0">
                    <Image src={`/${hotel.imagePrefix}-about/about-us-hero-section.webp`} alt="About Us" fill className="object-cover object-bottom" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/50 to-transparent" />
                </motion.div>

                <div className="container relative z-10 px-6 pb-16">
                    <motion.p variants={heroTagline} initial="hidden" animate="visible"
                        className="inline-block bg-primary text-white px-4 py-1.5 rounded-sm uppercase tracking-[0.3em] text-xs font-bold mb-6 shadow-xl border border-white/10"
                    >
                        Our Story
                    </motion.p>
                    <div className="overflow-hidden pb-1">
                        <motion.h1 variants={heroTitlePopup} initial="hidden" animate="visible"
                            className="text-5xl md:text-8xl font-serif leading-none drop-shadow-2xl text-white">
                            About Us
                        </motion.h1>
                    </div>
                    <motion.div variants={lineWipe} initial="hidden" animate="visible" className="h-[3px] w-40 bg-primary mt-2" />
                </div>
            </section>

            {/* ── Vision + History ── */}
            <section ref={historySectionRef} className="bg-white text-gray-900 py-20 md:py-32 overflow-hidden">
                <div className="container px-6 max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <RevealGroup>
                            {/* Vision */}
                            <motion.div variants={fadeUp} className="mb-16">
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="w-1 h-12 bg-primary shrink-0" />
                                    <h2 className="text-3xl md:text-4xl font-serif text-gray-900">Our Vision</h2>
                                </div>
                                <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light pl-4 md:pl-6 border-l border-primary/20 italic">
                                    "To create a haven where guests feel at home, experience the rich culture of Kerala, and cherish unforgettable memories."
                                </p>
                            </motion.div>

                            {/* History */}
                            <motion.div variants={fadeUp}>
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="w-1 h-12 bg-primary shrink-0" />
                                    <h2 className="text-3xl md:text-4xl font-serif text-gray-900">Our History</h2>
                                </div>
                                <div className="text-gray-600 text-base md:text-lg leading-relaxed font-light space-y-5 pl-4 md:pl-6 border-l border-primary/20">
                                    <p>Kannamundayil Group of Companies, starting as a financier, has grown into a thriving conglomerate with multiple tourist homes and gold loan firms across Kottayam.</p>
                                    <p>With a legacy of trust and excellence, our group delivers exceptional hospitality and financial solutions, fostering economic growth in local communities.</p>
                                </div>
                            </motion.div>
                        </RevealGroup>

                        {/* Image - Hidden on Mobile */}
                        <Reveal variants={fadeRight} className="relative h-[400px] md:h-[700px] hidden lg:block">
                            <div className="absolute inset-6 border border-primary/20 -translate-x-4 translate-y-4" />
                            <motion.div
                                variants={clipReveal}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                className="relative z-10 w-full h-full"
                            >
                                <Image src={`/${hotel.imagePrefix}-about/about-us-right-image.webp`} alt="History" fill className="object-cover object-right shadow-2xl" />
                            </motion.div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ── Managing Director ── */}
            <section className="bg-gray-50 py-20 md:py-32 border-t border-gray-100 overflow-hidden">
                <div className="container px-6 max-w-5xl mx-auto">
                    <Reveal variants={fadeUp} className="mb-12 md:mb-16 text-center">
                        <p className="text-gray-600 uppercase tracking-[0.25em] text-xs mb-3">Leadership</p>
                        <h2 className="text-3xl md:text-4xl font-serif text-gray-900">The Visionary Behind It All</h2>
                        <motion.div variants={lineWipe} initial="hidden" whileInView="visible" viewport={{ once: false }} className="h-[2px] w-16 bg-primary mx-auto mt-6" />
                    </Reveal>

                    <RevealGroup className="flex flex-col md:flex-row gap-16 items-center">
                        <motion.div variants={scaleUp} className="relative w-64 h-64 md:w-80 md:h-80 shrink-0 border-2 border-primary/20 overflow-hidden shadow-xl bg-white">
                            <Image src="/common/Kannamunda-logo.webp" alt="Abilash K Mathew" fill className="object-contain p-10" />
                        </motion.div>

                        <div>
                            <motion.div variants={fadeUp}>
                                <h3 className="text-4xl font-serif text-gray-900 mb-2">Abilash K Mathew</h3>
                                <p className="text-gray-600 uppercase tracking-[0.2em] text-[10px] mb-8">Managing Director</p>
                            </motion.div>
                            <motion.div variants={fadeUp} className="text-gray-600 text-lg leading-relaxed font-light space-y-5 mb-10">
                                <p>A visionary leader with a passion for excellence, Abilash K Mathew spearheads <strong className="text-gray-900 font-medium">Kannamundayil Residency</strong>, Kannamundayil Bakes and Kannamundayil Finance with strategic foresight and entrepreneurial flair.</p>
                                <p>With extensive experience in hospitality and management, Abilash ensures exceptional guest experiences, driving growth and innovation.</p>
                            </motion.div>
                            <motion.div variants={fadeUp} className="flex flex-wrap gap-6">
                                {['Strategic Foresight', 'Exceptional Excellence', 'Innovative Leadership'].map((s, i) => (
                                    <div key={i} className="flex items-center gap-3 text-xs tracking-wide text-gray-600 uppercase">
                                        <CheckCircle2 className="text-primary h-5 w-5 stroke-[1.5]" /> {s}
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </RevealGroup>
                </div>
            </section>
        </div>
    );
}
