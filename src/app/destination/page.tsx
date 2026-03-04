"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    heroTagline, heroTitle, heroTitlePopup, lineWipe,
    fadeLeft, fadeRight, fadeUp, clipReveal,
    RevealGroup, Reveal,
} from "@/components/animations";

export default function DestinationPage() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            {/* ── Hero ── */}
            <section ref={heroRef} className="relative h-[65vh] flex items-end overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-0 z-0">
                    <Image src="/gallery/location2.webp" alt="Destinations" fill className="object-cover object-center" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/50 to-transparent" />
                </motion.div>
                <div className="container relative z-10 px-6 pb-16">
                    <motion.p variants={heroTagline} initial="hidden" animate="visible"
                        className="inline-block bg-primary text-white px-4 py-1.5 rounded-sm uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-6 shadow-xl border border-white/10"
                    >
                        Discover Kerala
                    </motion.p>
                    <div className="overflow-hidden pb-1">
                        <motion.h1 variants={heroTitlePopup} initial="hidden" animate="visible" className="text-5xl md:text-8xl font-serif leading-none">Our Locations</motion.h1>
                    </div>
                    <motion.div variants={lineWipe} initial="hidden" animate="visible" className="h-[3px] w-40 bg-primary mt-2" />
                </div>
            </section>

            {/* ── Erattupetta ── */}
            <section className="bg-white text-gray-900 py-20 md:py-32 overflow-hidden">
                <div className="container px-6 max-w-7xl mx-auto">
                    <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-20 items-center">
                        {/* Image */}
                        <Reveal variants={fadeLeft} className="w-full lg:w-1/2 relative h-[350px] md:h-[560px] shadow-2xl overflow-hidden" viewport={{ once: false, amount: 0.1, margin: "-20px" }}>
                            <div className="absolute inset-5 border border-primary/20 -translate-x-3 -translate-y-3 z-0" />
                            <motion.div variants={clipReveal} className="relative z-10 w-full h-full">
                                <Image src="/destination/kannamunda-main-building.webp" alt="Erattupetta" fill className="object-cover" />
                            </motion.div>
                        </Reveal>

                        <RevealGroup className="w-full lg:w-1/2 space-y-5 md:space-y-6" viewport={{ once: false, amount: 0.1, margin: "-20px" }}>
                            <motion.div variants={fadeUp} className="inline-block border border-gray-600/30 text-gray-600 uppercase tracking-[0.2em] text-[10px] md:text-xs px-4 py-1.5 mb-2">Erattupetta</motion.div>
                            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight">A Captivating<br />Tourist Destination</motion.h2>
                            <motion.div variants={lineWipe} className="h-[2px] w-16 bg-primary" />
                            <motion.p variants={fadeUp} className="text-gray-600 text-lg md:text-xl leading-relaxed font-light">Located in Kottayam district, Erattupetta is a captivating tourist destination featuring the historic Poonjar Palace, the breathtaking Thiruvarppu Waterfalls, and lush spice plantations.</motion.p>
                            <motion.p variants={fadeUp} className="text-gray-600 text-lg md:text-xl leading-relaxed font-light">With its unique blend of natural beauty, rich heritage, and warm hospitality, Erattupetta is an ideal getaway for travelers seeking a tranquil and enriching experience.</motion.p>
                        </RevealGroup>
                    </div>
                </div>
            </section>

            {/* ── Poonjar ── */}
            <section className="bg-neutral-100 text-gray-900 py-20 md:py-32 overflow-hidden">
                <div className="container px-6 max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
                        <RevealGroup className="w-full lg:w-1/2 space-y-5 md:space-y-6" viewport={{ once: false, amount: 0.1, margin: "-20px" }}>
                            <motion.div variants={fadeUp} className="inline-block border border-gray-600/30 text-gray-600 uppercase tracking-[0.2em] text-[10px] md:text-xs px-4 py-1.5 mb-2">Poonjar</motion.div>
                            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight">A Charming Town<br />with Rich History</motion.h2>
                            <motion.div variants={lineWipe} className="h-[2px] w-16 bg-primary" />
                            <motion.p variants={fadeUp} className="text-gray-600 text-lg md:text-xl leading-relaxed font-light">Poonjar is a charms town nestled in the picturesque Kottayam district of Kerala, offering a unique blend of history, culture, and absolute natural beauty that captivates every visitor.</motion.p>
                        </RevealGroup>

                        {/* Image */}
                        <Reveal variants={fadeRight} className="w-full lg:w-1/2 relative h-[350px] md:h-[560px] shadow-2xl overflow-hidden" viewport={{ once: false, amount: 0.1, margin: "-20px" }}>
                            <div className="absolute inset-5 border border-primary/20 translate-x-3 -translate-y-3 z-0" />
                            <motion.div variants={clipReveal} className="relative z-10 w-full h-full">
                                <Image src="/destination/poonjar-kannamunda.webp" alt="Poonjar" fill className="object-cover" />
                            </motion.div>
                        </Reveal>
                    </div>
                </div>
            </section>
        </div>
    );
}
