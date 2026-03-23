"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    Landmark, ShieldCheck, TrendingUp, Clock, Users, ArrowRight, Phone, Mail, MapPin,
} from "lucide-react";

const services = [
    {
        icon: Landmark,
        title: "Gold Loans",
        desc: "Quick, hassle-free gold loans at competitive interest rates. Get instant liquidity against your gold assets with minimal documentation.",
    },
    {
        icon: ShieldCheck,
        title: "Secure & Trusted",
        desc: "Your gold is stored in bank-grade vaulted security with full insurance coverage — your peace of mind is our priority.",
    },
    {
        icon: TrendingUp,
        title: "Competitive Rates",
        desc: "We offer among the best per-gram rates in the district, ensuring you get maximum value for your gold assets.",
    },
    {
        icon: Clock,
        title: "Instant Process",
        desc: "Loan disbursed within minutes. No lengthy paperwork, no wait times — walk in, get assessed, walk out with funds.",
    },
];

const stats = [
    { value: "25+", label: "Years of Trust" },
    { value: "₹Cr+", label: "Disbursed in Loans" },
    { value: "1000+", label: "Happy Customers" },
    { value: "24/7", label: "Customer Support" },
];

export default function FinancePage() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    return (
        <div className="min-h-screen bg-neutral-950 text-white overflow-x-hidden">
            {/* ── HERO ── */}
            <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-0 z-0">
                    <Image
                        src="/landing-page/Finance/Finance-gold-demo.webp"
                        alt="Kannamundayil Finance"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                </motion.div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-amber-950/70 via-black/60 to-neutral-950 z-[1]" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-[1]" />

                <motion.div style={{ opacity }} className="relative z-10 w-full px-4 sm:px-6 max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="flex items-center justify-center gap-2 mb-6"
                    >
                        <div className="h-px w-8 bg-amber-400/40" />
                        <span className="text-amber-400/70 text-[9px] tracking-[0.25em] uppercase">Kannamundayil Group</span>
                        <div className="h-px w-8 bg-amber-400/40" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-amber-600/20 border border-amber-500/30 backdrop-blur-sm mb-8"
                    >
                        <Landmark size={36} className="text-amber-400" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-4 drop-shadow-2xl leading-tight"
                    >
                        Kannamundayil
                        <br />
                        <em className="not-italic text-amber-400">Finance</em>
                    </motion.h1>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "5rem" }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="h-[3px] bg-amber-600 mx-auto mb-6"
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10"
                    >
                        Trusted Gold Loan & Financial Services across Kottayam district — 25+ years of financial excellence.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center px-4 sm:px-0"
                    >
                        <a
                            href="tel:+919447131750"
                            className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-8 py-4 text-sm tracking-widest uppercase font-bold transition-colors duration-300 shadow-2xl"
                        >
                            <Phone size={16} />
                            Call Now
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

            {/* ── STATS ── */}
            <section className="bg-amber-900/20 border-y border-amber-800/20 py-16">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                            >
                                <p className="text-4xl md:text-5xl font-serif text-amber-400 mb-2">{stat.value}</p>
                                <p className="text-white/40 text-xs tracking-[0.2em] uppercase">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SERVICES ── */}
            <section className="py-24 md:py-36 bg-neutral-950">
                <div className="container mx-auto px-6 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16 md:mb-24"
                    >
                        <p className="text-amber-400/60 text-xs tracking-[0.35em] uppercase mb-4">What We Offer</p>
                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Our Services</h2>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "4rem" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="h-[2px] bg-amber-600 mx-auto"
                        />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((svc, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                className="bg-white/5 border border-white/10 border-t-4 border-t-amber-600/50 hover:border-t-amber-600 p-10 group hover:bg-white/10 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-amber-600/10 border border-amber-600/20 flex items-center justify-center mb-6 group-hover:bg-amber-600/20 transition-colors duration-500">
                                    <svc.icon size={28} className="text-amber-400" />
                                </div>
                                <h3 className="text-xl font-serif text-white mb-3">{svc.title}</h3>
                                <p className="text-white/50 text-sm leading-relaxed font-light group-hover:text-white/70 transition-colors duration-500">
                                    {svc.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ABOUT / VISUAL ── */}
            <section className="py-24 md:py-36 bg-[#0d0d0d]">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                            className="relative h-[400px] md:h-[560px] rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <div className="absolute inset-0 border border-amber-600/20 z-0 translate-x-4 translate-y-4 rounded-2xl" />
                            <Image
                                src="/landing-page/Finance/Finance-gold-demo.webp"
                                alt="Kannamundayil Finance"
                                fill
                                className="object-cover rounded-2xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-amber-950/50 to-transparent rounded-2xl" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        >
                            <p className="text-amber-400/60 text-xs tracking-[0.3em] uppercase mb-4">About Us</p>
                            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-6">
                                A Legacy of Financial<br />
                                <em className="not-italic text-amber-400">Trust & Transparency</em>
                            </h2>
                            <div className="h-[2px] w-16 bg-amber-600 mb-8" />
                            <p className="text-white/60 text-lg leading-relaxed font-light mb-6">
                                Kannamundayil Finance has been a cornerstone of financial services in Kottayam district for over two decades. Founded on principles of transparency and customer-first service, we have grown into one of the most trusted gold loan providers in the region.
                            </p>
                            <p className="text-white/50 text-lg leading-relaxed font-light mb-10">
                                Our team of experienced professionals ensures you get the best value for your gold with minimal formalities and maximum speed.
                            </p>

                            <div className="space-y-4">
                                {[
                                    { icon: MapPin, text: "Kannamundayil Arcade, Erattupetta, Kottayam" },
                                    { icon: Phone, text: "+91 94471 31750" },
                                    { icon: Mail, text: "info@kannamundaresidency.com" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 text-white/60">
                                        <div className="w-10 h-10 rounded-full bg-amber-600/10 border border-amber-600/20 flex items-center justify-center shrink-0">
                                            <item.icon size={16} className="text-amber-400" />
                                        </div>
                                        <span className="font-light">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="bg-amber-900/30 border-t border-amber-800/20 py-24">
                <div className="container mx-auto px-6 max-w-3xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-amber-400/60 text-xs tracking-[0.35em] uppercase mb-4">Get Started Today</p>
                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                            Need a Quick Loan?
                        </h2>
                        <div className="h-[2px] w-16 bg-amber-600 mx-auto mb-8" />
                        <p className="text-white/50 font-light text-lg mb-10">
                            Walk in to our Erattupetta office or call us now. Loans are disbursed within minutes.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="tel:+919447131750"
                                className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-8 py-4 text-sm tracking-widest uppercase font-bold transition-colors duration-300"
                            >
                                <Phone size={16} />
                                +91 94471 31750
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
        </div>
    );
}
