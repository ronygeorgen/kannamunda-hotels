"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
    UtensilsCrossed, Star, Heart, Leaf, Clock, Phone, MapPin,
    CupSoda, Coffee, IceCream, Beef, Sandwich, Cookie, Flame, X, Mail, ChevronLeft, ChevronRight
} from "lucide-react";

const offerings = [
    {
        icon: CupSoda,
        title: "Shakes",
        desc: "Thick, creamy and indulgent shakes made with premium ingredients and seasonal fruits — a delightful treat.",
    },
    {
        icon: Leaf,
        title: "Fresh Juices",
        desc: "Refreshing, all-natural juices squeezed fresh from selected fruits for a burst of vitality.",
    },
    {
        icon: IceCream,
        title: "Falooda",
        desc: "Our royal falooda layered with vermicelli, basil seeds, jelly, and rich scoops of ice cream.",
    },
    {
        icon: Beef,
        title: "Burgers",
        desc: "Classic and signature burgers with juicy patties, fresh veggies, and our house-special sauces.",
    },
    {
        icon: Sandwich,
        title: "Sandwiches",
        desc: "Freshly assembled sandwiches with gourmet fillings, ideal for a quick and satisfying meal.",
    },
    {
        icon: Flame,
        title: "Puffs",
        desc: "Crispy, flaky puff pastries with delicious egg, meat, or vegetable fillings — baked fresh daily.",
    },
    {
        icon: Cookie,
        title: "Snacks",
        desc: "A variety of local savoury treats and crispy bites to perfectly complement your evening tea.",
    },
    {
        icon: IceCream,
        title: "Ice Creams",
        desc: "A wide selection of premium ice cream flavours and sundaes, the perfect sweet companion for any time.",
    },
];

export default function BakeryPage() {
    const heroRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    const galleryImages = [
        "/BAKERY/ABSM-100.webp",
        "/BAKERY/ABSM-101.webp",
        "/BAKERY/ABSM-102.webp",
        "/BAKERY/ABSM-103.webp",
    ];

    const showPrev = () =>
        setSelectedIndex((i) => (i === null ? i : (i - 1 + galleryImages.length) % galleryImages.length));
    const showNext = () =>
        setSelectedIndex((i) => (i === null ? i : (i + 1) % galleryImages.length));

    useEffect(() => {
        if (selectedIndex === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") showPrev();
            else if (e.key === "ArrowRight") showNext();
            else if (e.key === "Escape") setSelectedIndex(null);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedIndex]);

    return (
        <div className="min-h-screen bg-neutral-950 text-white overflow-x-hidden">
            {/* ── HERO ── */}
            <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-0 z-0">
                    <Image
                        src="/landing-page/Bakery/Bakery-demo.webp"
                        alt="Kannamundayil Bakes"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                </motion.div>

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-orange-950/70 via-black/60 to-neutral-950 z-[1]" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-[1]" />

                <motion.div style={{ opacity }} className="relative z-10 w-full px-4 sm:px-6 max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="flex items-center justify-center gap-2 mb-6"
                    >
                        <div className="h-px w-8 bg-orange-400/40" />
                        <span className="text-orange-400/70 text-[9px] tracking-[0.25em] uppercase">Kannamundayil Group</span>
                        <div className="h-px w-8 bg-orange-400/40" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-orange-600/20 border border-orange-500/30 backdrop-blur-sm mb-8"
                    >
                        <UtensilsCrossed size={36} className="text-orange-400" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-montserrat font-black uppercase text-white mb-4 drop-shadow-2xl leading-[0.9] tracking-tighter"
                    >
                        Kannamundayil
                        <br />
                        <span className="text-orange-400">Bakes</span>
                    </motion.h1>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "5rem" }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="h-[3px] bg-orange-600 mx-auto mb-6"
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10"
                    >
                        Freshly baked artisan breads, pastries, and confections — a local favourite crafted with love every single day.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center px-4 sm:px-0"
                    >
                        <a
                            href="tel:+919447261350"
                            className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 text-sm tracking-widest uppercase font-bold transition-colors duration-300 shadow-2xl"
                        >
                            <Phone size={16} />
                            Order Now
                        </a>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/80 px-8 py-4 text-sm tracking-widest uppercase font-medium hover:bg-white/10 transition-colors duration-300"
                        >
                            Back to Home
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* ── OFFERINGS ── */}
            <section className="py-24 md:py-36 bg-neutral-950">
                <div className="container mx-auto px-6 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16 md:mb-24"
                    >
                        <p className="text-orange-400/60 text-xs tracking-[0.35em] uppercase mb-4">Our Menu</p>
                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">What We Bake</h2>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "4rem" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="h-[2px] bg-orange-600 mx-auto"
                        />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {offerings.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                className="bg-white/5 border border-white/10 border-t-4 border-t-orange-600/50 hover:border-t-orange-600 p-10 group hover:bg-white/10 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-orange-600/10 border border-orange-600/20 flex items-center justify-center mb-6 group-hover:bg-orange-600/20 transition-colors duration-500">
                                    <item.icon size={28} className="text-orange-400" />
                                </div>
                                <h3 className="text-xl font-serif text-white mb-3">{item.title}</h3>
                                <p className="text-white/50 text-sm leading-relaxed font-light group-hover:text-white/70 transition-colors duration-500">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── VISUAL FEATURE ── */}
            <section className="py-24 md:py-36 bg-[#0d0d0d]">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <p className="text-orange-400/60 text-xs tracking-[0.3em] uppercase mb-4">Our Story</p>
                            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-6">
                                Baked with Love,<br />
                                <em className="not-italic text-orange-400">Served with Pride</em>
                            </h2>
                            <div className="h-[2px] w-16 bg-orange-600 mb-8" />
                            <p className="text-white/60 text-lg leading-relaxed font-light mb-6">
                                Kannamundayil Bakes was born from a simple belief — to provide a perfect place for refreshing juices, shakes, and savoury snacks. Starting as a small neighbourhood bakery, we've grown into a beloved community institution in Erattupetta.
                            </p>
                            <p className="text-white/50 text-lg leading-relaxed font-light mb-10">
                                From our signature faloodas and shakes to ice creams, crispy puffs and fresh burgers, every product is made with love using the finest ingredients Kerala has to offer.
                            </p>

                            <div className="space-y-4">
                                {[
                                    { icon: MapPin, text: "Kannamundayil Arcade, Erattupetta, Kottayam" },
                                    { icon: Phone, text: "+91 94472 61350" },
                                    { icon: Mail, text: "kannamundayilbakes@gmail.com" },
                                    { icon: Clock, text: "Open: 9:00 AM – 9:00 PM" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 text-white/60">
                                        <div className="w-10 h-10 rounded-full bg-orange-600/10 border border-orange-600/20 flex items-center justify-center shrink-0">
                                            <item.icon size={16} className="text-orange-400" />
                                        </div>
                                        <span className="font-light">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                            className="relative h-[400px] md:h-[560px] rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <div className="absolute inset-0 border border-orange-600/20 z-0 translate-x-4 translate-y-4 rounded-2xl" />
                            <Image
                                src="/landing-page/Bakery/Bakery-demo.webp"
                                alt="Fresh Bakes"
                                fill
                                className="object-cover rounded-2xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-orange-950/50 to-transparent rounded-2xl" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── GALLERY ── */}
            <section className="py-24 md:py-36 bg-neutral-950">
                <div className="container mx-auto px-6 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16 md:mb-24"
                    >
                        <p className="text-orange-400/60 text-xs tracking-[0.35em] uppercase mb-4">A Visual Treat</p>
                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Bakery Gallery</h2>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "4rem" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="h-[2px] bg-orange-600 mx-auto"
                        />
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {galleryImages.map((src, i) => (
                            <motion.div
                                key={src}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                onClick={() => setSelectedIndex(i)}
                                className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-900 border border-white/5 cursor-zoom-in"
                            >
                                <Image
                                    src={src}
                                    alt={`Kannamundayil Bakes ${i + 1}`}
                                    fill
                                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="bg-orange-900/20 border-t border-orange-800/20 py-24">
                <div className="container mx-auto px-6 max-w-3xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-orange-400/60 text-xs tracking-[0.35em] uppercase mb-4">Fresh Every Day</p>
                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                            Visit Us Today
                        </h2>
                        <div className="h-[2px] w-16 bg-orange-600 mx-auto mb-8" />
                        <p className="text-white/50 font-light text-lg mb-10">
                            Stop by our bakery for the freshest bakes in Erattupetta. Open daily from 9 AM to 9 PM.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="tel:+919447261350"
                                className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 text-sm tracking-widest uppercase font-bold transition-colors duration-300 shadow-2xl"
                            >
                                <Phone size={16} />
                                +91 94472 61350
                            </a>
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/70 px-8 py-4 text-sm tracking-widest uppercase font-medium hover:bg-white/10 transition-colors duration-300"
                            >
                                ← Back to Group
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── LIGHTBOX ── */}
            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedIndex(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-10 cursor-zoom-out"
                    >
                        <motion.button
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            aria-label="Close"
                            className="absolute top-6 right-6 z-10 text-white/50 hover:text-white transition-colors"
                        >
                            <X size={40} />
                        </motion.button>

                        <button
                            type="button"
                            aria-label="Previous image"
                            onClick={(e) => { e.stopPropagation(); showPrev(); }}
                            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors cursor-pointer"
                        >
                            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
                        </button>
                        <button
                            type="button"
                            aria-label="Next image"
                            onClick={(e) => { e.stopPropagation(); showNext(); }}
                            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors cursor-pointer"
                        >
                            <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-5xl aspect-[4/3] md:aspect-video"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {galleryImages.map((src, i) => (
                                <Image
                                    key={src}
                                    src={src}
                                    alt={`Kannamundayil Bakes ${i + 1}`}
                                    fill
                                    sizes="100vw"
                                    priority
                                    className={`object-contain transition-opacity duration-300 ${i === selectedIndex ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                                />
                            ))}
                        </motion.div>

                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-[0.3em] tabular-nums">
                            {selectedIndex + 1} / {galleryImages.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
