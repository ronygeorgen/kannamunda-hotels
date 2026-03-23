"use client";
import { useHotel } from "@/lib/hotelContext";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import Image from "next/image";
import {
    heroTagline, heroTitle, heroTitlePopup, lineWipe,
    fadeUp, galleryContainer, galleryItem,
    RevealGroup, Reveal,
} from "@/components/animations";

const attractions = [
    {
        distance: "Within 10 km",
        accent: "border-primary",
        places: [
            { name: "Poonjar Palace", km: "8 km", desc: "12th-century palace turned museum featuring ancient woodwork and artifacts." },
            { name: "Thiruvarppu Waterfalls", km: "9 km", desc: "A scenic cascading waterfall perfect for a refreshing day trip." },
            { name: "Nadukani Viewpoint", km: "10 km", desc: "Breathtaking panoramic views of the Western Ghats." },
        ]
    },
    {
        distance: "Within 20 km",
        accent: "border-gray-700",
        places: [
            { name: "Kottathavalam", km: "15 km", desc: "A scenic village surrounded by lush rolling hills." },
            { name: "Elamgulam Dam", km: "18 km", desc: "Picture-perfect dam surrounded by pristine nature." },
            { name: "Vazhikkadavu", km: "20 km", desc: "The perfect rugged spot for trekking enthusiasts." },
        ]
    },
    {
        distance: "Within 30 km",
        accent: "border-white/30",
        places: [
            { name: "Vagamon", km: "25 km", desc: "Famous hill station renowned for scenic pine forests and meadows." },
            { name: "Illikkal Kallu", km: "28 km", desc: "Iconic rock formation with stunning views across the valley." },
            { name: "Kanjirappally", km: "30 km", desc: "Historic town known for its sprawling spice and rubber plantations." },
        ]
    }
];

export default function NearbyAttractionsPage() {
    const hotel = useHotel();
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            {/* ── Hero ── */}
            <section ref={heroRef} className="relative h-[65vh] flex items-end overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-0 z-0">
                    <Image src={`/${hotel.imagePrefix}-nearby-attractions/location3.webp`} alt="Nearby Attractions" fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/50 to-transparent" />
                </motion.div>
                <div className="container relative z-10 px-6 pb-16">
                    <motion.p variants={heroTagline} initial="hidden" animate="visible"
                        className="inline-block bg-primary text-white px-4 py-1.5 rounded-sm uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-6 shadow-xl border border-white/10"
                    >
                        Explore Wonders
                    </motion.p>
                    <div className="overflow-hidden pb-1">
                        <motion.h1 variants={heroTitlePopup} initial="hidden" animate="visible" className="text-5xl md:text-8xl font-serif leading-none">Nearby Attractions</motion.h1>
                    </div>
                    <motion.div variants={lineWipe} initial="hidden" animate="visible" className="h-[3px] w-40 bg-primary mt-2" />
                </div>
            </section>

            {/* ── Attractions ── */}
            <section className="py-20 md:py-32 bg-white">
                <div className="container px-6 max-w-7xl mx-auto">
                    <motion.div
                        variants={galleryContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: "-50px" }}
                        className="grid lg:grid-cols-3 gap-8"
                    >
                        {attractions.map((section, idx) => (
                            <motion.div key={idx} variants={galleryItem}
                                className="border-t-4 border-primary bg-gray-50 p-10 flex flex-col hover:bg-white hover:shadow-xl transition-all duration-500 rounded-sm">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0 rounded-lg">
                                        <MapPin className="w-6 h-6 text-primary stroke-[1.5]" />
                                    </div>
                                    <h2 className="text-2xl font-serif text-gray-900">{section.distance}</h2>
                                </div>

                                <div className="space-y-8 flex-grow">
                                    {section.places.map((place, i) => (
                                        <div key={i} className="group pl-6 border-l-2 border-gray-200 hover:border-primary transition-colors duration-500 cursor-default">
                                            <div className="flex justify-between items-baseline mb-2">
                                                <h3 className="font-serif text-xl text-gray-800 group-hover:text-primary transition-colors">{place.name}</h3>
                                                <span className="text-xs font-semibold tracking-widest text-primary uppercase ml-3 shrink-0">{place.km}</span>
                                            </div>
                                            <p className="text-gray-600 font-light leading-relaxed group-hover:text-gray-600 transition-colors">{place.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>


        </div>
    );
}
