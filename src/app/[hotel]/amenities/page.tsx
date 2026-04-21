"use client";
import { useHotel } from "@/lib/hotelContext";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Utensils, ConciergeBell, Wifi, Wind, ShieldCheck, Car, Coffee, Tv, ArrowUpSquare } from "lucide-react";
import {
    heroTagline, heroTitle, heroTitlePopup, lineWipe,
    staggerContainer, fadeUp, zoomIn,
    RevealGroup, Reveal, galleryContainer, galleryItem, clipReveal,
} from "@/components/animations";

const baseAmenities = [
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
    const hotel = useHotel();

    // Dynamically add Lift Facility for Erattupetta
    const allAmenities = hotel.id === "erattupetta"
        ? [...baseAmenities, { icon: ArrowUpSquare, title: "Lift Facility", desc: "Modern elevator for effortless access to all floors." }]
        : baseAmenities;

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            {/* ── Parallax Hero ── */}
            <section ref={containerRef} className="relative h-[65vh] flex items-end overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-0 z-0">
                    <Image src={`/${hotel.imagePrefix}-amenities/amenities-3.webp`} alt="Amenities" fill className="object-cover" style={{ objectPosition: "center 75%" }} priority />
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
                        <p className="text-gray-600 uppercase tracking-[0.25em] text-[10px] md:text-xs mb-4">Designed for Your Comfort</p>
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
                                <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xs font-light">{item.desc}</p>
                            </motion.div>
                        ))}
                    </RevealGroup>
                </div>
            </section>
        </div>
    );
}
