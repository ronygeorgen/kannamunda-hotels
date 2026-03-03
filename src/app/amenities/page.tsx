"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Utensils, ConciergeBell, Wifi, Wind, ShieldCheck, Car, Coffee, Tv } from "lucide-react";
import {
    heroTagline, heroTitle, heroTitlePopup, lineWipe,
    staggerContainer, fadeUp, zoomIn,
    RevealGroup, Reveal, galleryContainer, galleryItem, clipReveal,
} from "@/components/animations";

const allAmenities = [
    { icon: Utensils, title: "Lounge Bar", desc: "Relax and unwind with premium beverages and snacks." },
    { icon: ConciergeBell, title: "Room Service", desc: "Enjoy delicious meals delivered straight to your room." },
    { icon: Wind, title: "A/C & Non-A/C Rooms", desc: "Choose the comfort that perfectly suits your needs." },
    { icon: Wifi, title: "Free High-Speed WiFi", desc: "Stay connected with complimentary internet access." },
    { icon: ShieldCheck, title: "24/7 Security", desc: "Ensuring utmost safety and peace of mind for all guests." },
    { icon: Car, title: "Ample Parking", desc: "Spacious and secure parking facility for your vehicles." },
    { icon: Coffee, title: "Breakfast Included", desc: "Start your day right with our complimentary breakfast." },
    { icon: Tv, title: "Flat-Screen TV", desc: "Entertainment options with premium channels in every room." },
];

export default function AmenitiesPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            {/* ── Parallax Hero ── */}
            <section ref={containerRef} className="relative h-[65vh] flex items-end overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-0 z-0">
                    <Image src="/amenities/amenities-3.webp" alt="Amenities" fill className="object-cover" style={{ objectPosition: "center 75%" }} priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/50 to-transparent" />
                </motion.div>

                <div className="container relative z-10 px-6 pb-16">
                    <motion.p variants={heroTagline} initial="hidden" animate="visible"
                        className="inline-block bg-primary text-white px-4 py-1.5 rounded-sm uppercase tracking-[0.35em] text-[10px] md:text-xs font-bold mb-6 shadow-xl border border-white/10"
                    >
                        Experience Luxury
                    </motion.p>
                    <div className="overflow-hidden pb-1">
                        <motion.h1 variants={heroTitlePopup} initial="hidden" animate="visible"
                            className="text-5xl md:text-8xl font-serif leading-none">
                            Amenities
                        </motion.h1>
                    </div>
                    <motion.div variants={lineWipe} initial="hidden" animate="visible" className="h-[3px] w-40 bg-primary mt-2" />
                </div>
            </section>

            {/* ── Amenities Grid ── */}
            <section className="bg-white text-gray-900 py-20 md:py-32">
                <div className="container px-6 mx-auto max-w-7xl">
                    <Reveal className="text-center mb-12 md:mb-20">
                        <p className="text-primary uppercase tracking-[0.25em] text-xs md:text-sm mb-4">Designed for Your Comfort</p>
                        <h2 className="text-3xl md:text-5xl font-serif text-gray-900">What We Offer</h2>
                        <motion.div variants={lineWipe} initial="hidden" whileInView="visible" viewport={{ once: false }} className="h-[2px] w-16 bg-primary mx-auto mt-6 md:mt-8" />
                    </Reveal>

                    <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 md:gap-y-20 gap-x-10">
                        {allAmenities.map((item, i) => (
                            <motion.div key={i} variants={fadeUp} className="flex flex-col items-center text-center group">
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: -3 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-neutral-50 shadow border border-gray-100 flex items-center justify-center mb-6 md:mb-8"
                                >
                                    <item.icon className="w-8 h-8 md:w-10 md:h-10 text-gray-700 group-hover:text-primary transition-colors duration-500 stroke-[1.25]" />
                                </motion.div>
                                <h3 className="text-lg md:text-xl font-serif text-gray-900 mb-2 md:mb-3 tracking-wide">{item.title}</h3>
                                <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-xs font-light">{item.desc}</p>
                            </motion.div>
                        ))}
                    </RevealGroup>
                </div>
            </section>

            {/* ── Rooms Gallery ──
            <section className="bg-gray-50 py-24 border-t border-gray-100">
                <div className="container px-6 max-w-7xl mx-auto">
                    <Reveal className="mb-16">
                        <p className="text-primary uppercase tracking-[0.25em] text-sm mb-4">Visual Tour</p>
                        <h2 className="text-3xl md:text-4xl font-serif text-gray-900">Inside the Residency</h2>
                    </Reveal>

                    <motion.div
                        variants={galleryContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: "-60px" }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {[
                            { src: "/gallery/interior-room-image-edited.webp", alt: "Premium Rooms", cls: "aspect-[4/3]" },
                            { src: "/gallery/interior-room-image-2.webp", alt: "Relaxation Spaces", cls: "aspect-[4/3]" },
                        ].map((img, idx) => (
                            <motion.div key={idx} variants={galleryItem} className={`relative ${img.cls} overflow-hidden group shadow-xl`}>
                                <motion.div
                                    className="absolute inset-0 bg-primary z-10 pointer-events-none origin-top"
                                    initial={{ scaleY: 1 }}
                                    whileInView={{ scaleY: 0 }}
                                    viewport={{ once: false }}
                                    transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                                />
                                <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-6">
                                    <div className="h-[2px] w-8 bg-primary mb-3" />
                                    <h4 className="text-white font-serif text-2xl">{img.alt}</h4>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
            */}


        </div>
    );
}
