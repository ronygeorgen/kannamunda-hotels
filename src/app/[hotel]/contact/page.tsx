"use client";
import { useHotel } from "@/lib/hotelContext";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Clock, Facebook, Instagram, Linkedin, Globe, XCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
    heroTagline, heroTitle, heroTitlePopup, lineWipe,
    fadeUp, staggerContainer, Reveal, RevealGroup,
} from "@/components/animations";

function ContactContent() {
    const hotel = useHotel();
    const heroRef = useRef(null);
    const formSectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    const [activeBranch, setActiveBranch] = useState<'erattupetta' | 'poonjar' | null>(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        const branch = searchParams.get('branch');
        if (branch === 'erattupetta' || branch === 'poonjar') {
            setActiveBranch(branch as 'erattupetta' | 'poonjar');
            // Small delay to ensure the section is ready to scroll
            const timer = setTimeout(() => {
                formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [searchParams]);

    const handleGetDirections = (branch: 'erattupetta' | 'poonjar') => {
        setActiveBranch(branch);
        setTimeout(() => {
            formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
    };

    const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: ""
    });

    const [countdown, setCountdown] = useState(0);
    const [waMsg, setWaMsg] = useState("");

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (formStatus === "success" && countdown > 0) {
            timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
        } else if (formStatus === "success" && countdown === 0 && waMsg) {
            window.location.href = `https://wa.me/919447189362?text=${encodeURIComponent(waMsg)}`;
            // We don't reset immediately to allow the user to see the success state if the redirect takes a moment
            setTimeout(() => {
                setFormStatus("idle");
                setWaMsg("");
                setFormData({ firstName: "", lastName: "", email: "", message: "" });
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, [formStatus, countdown, waMsg]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus("submitting");

        try {
            const response = await fetch('/api/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const msg = [
                    `📩 *New Inquiry — Kannamundayil Hotels*`,
                    `*Name:* ${formData.firstName} ${formData.lastName}`,
                    `*Email:* ${formData.email}`,
                    `*Message:* ${formData.message}`,
                ].join("\n");

                setWaMsg(msg);
                setFormStatus("success");
                setCountdown(3);
            } else {
                setFormStatus("error");
                setTimeout(() => setFormStatus("idle"), 5000);
            }
        } catch (error) {
            console.error(error);
            setFormStatus("error");
            setTimeout(() => setFormStatus("idle"), 5000);
        }
    };

    const branchMaps = {
        erattupetta: "https://www.google.com/maps?q=Kannnamundayil+Arcade+Pala+Road+Erattupetta+Kerala&output=embed",
        poonjar: "https://www.google.com/maps?q=Kannamundayil+Residency+Poonjar+Kerala&output=embed"
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            {/* ── Hero ── */}
            <section ref={heroRef} className="relative h-[65vh] flex items-end overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-0 z-0">
                    <Image src={`/${hotel.imagePrefix}-contact/contact-us.webp`} alt="Contact Us" fill className="object-cover" style={{ objectPosition: "center 25%" }} priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/50 to-transparent" />
                </motion.div>
                <div className="container relative z-10 px-6 pb-16">
                    <motion.p variants={heroTagline} initial="hidden" animate="visible"
                        className="inline-block bg-primary text-white px-4 py-1.5 rounded-sm uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-6 shadow-xl border border-white/10"
                    >
                        We're Here for You
                    </motion.p>
                    <div className="overflow-hidden pb-1">
                        <motion.h1
                            variants={heroTitlePopup}
                            initial="hidden"
                            animate="visible"
                            className="text-5xl md:text-8xl font-serif leading-none"
                        >
                            Get in Touch
                        </motion.h1>
                    </div>
                    <motion.div variants={lineWipe} initial="hidden" animate="visible" className="h-[3px] w-40 bg-primary mt-2" />
                </div>
            </section>

            {/* ── Quick Contact Design (requested additional) ── */}
            <section className="py-20 md:py-32 bg-white">
                <div className="container px-6 max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                    {/* Left: Heading & Social */}
                    <div className="lg:w-1/4">
                        <motion.h2
                            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-serif text-gray-900 leading-[1.1] mb-8"
                        >
                            We would love to hear from you
                        </motion.h2>
                        <motion.div
                            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
                            className="flex gap-4"
                        >
                            {[Facebook, Globe, Instagram, Linkedin].map((Icon, idx) => (
                                <motion.a
                                    key={idx}
                                    variants={fadeUp}
                                    href="#"
                                    className="p-2 text-gray-900 border border-gray-100 hover:text-primary hover:border-primary transition-all duration-300"
                                >
                                    <Icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right: Modern Cards */}
                    <div className="lg:w-3/4 grid sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
                        {[
                            {
                                icon: MapPin,
                                title: "Our Location",
                                content: "Kannamundayil Arcade\nPala Road, Erattupetta\nKottayam, Kerala\nPin: 686121"
                            },
                            {
                                icon: Phone,
                                title: "Our Phone",
                                content: "+91 94471 31750\n+91 94471 89362\nOffice: +91 4822 231750"
                            },
                            {
                                icon: Mail,
                                title: "Mail Address",
                                content: "info@kannamundaresidency.com\nreservations@kannamundaresidency.com"
                            }
                        ].map((card, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative bg-gray-50 border border-gray-100 py-16 px-10 rounded-xl text-center flex flex-col items-center overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
                            >
                                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-8 border-4 border-white shadow-lg group-hover:bg-primary transition-colors duration-500">
                                    <card.icon className="text-white w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{card.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line font-light">
                                    {card.content}
                                </p>

                                {/* Triangular Accent - The requested corner design */}
                                <div
                                    className="absolute bottom-0 right-0 w-16 h-16 bg-primary opacity-90 transition-transform duration-500 group-hover:scale-110"
                                    style={{ clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)' }}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Branch Cards ── */}
            <section className="py-20 md:py-32 bg-white">
                <div className="container px-6 max-w-6xl mx-auto">
                    <RevealGroup className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                city: "Erattupetta",
                                address: "Kannnamundayil Arcade, Pala Road, Erattupetta, Kerala",
                                phones: ["+91 94471 31750", "+91 94471 89362"],
                            },
                            {
                                city: "Poonjar",
                                address: "Kannnamundayil Arcade, Opp. CMI Church, Poonjar, Kerala",
                                phones: ["+91 94471 07950", "+91 94471 89362"],
                            }
                        ].map((branch, i) => (
                            <motion.div key={i} variants={fadeUp}
                                className="bg-gray-50 p-12 border border-gray-100 border-t-4 border-t-primary hover:shadow-xl transition-all duration-500 group flex flex-col">
                                <div className="flex flex-col items-center text-center mb-10">
                                    <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-500 rounded-xl">
                                        <MapPin className="text-primary w-8 h-8 stroke-[1.25]" />
                                    </div>
                                    <h2 className="text-3xl font-serif text-gray-900 mb-2">{branch.city}</h2>
                                    <div className="w-8 h-[2px] bg-primary/30 group-hover:w-20 transition-all duration-500 mt-1" />
                                </div>

                                <div className="space-y-8 flex-grow text-center">
                                    <div>
                                        <p className="text-gray-600 tracking-widest uppercase text-[10px] mb-2">Address</p>
                                        <p className="text-gray-700 font-light leading-relaxed text-lg">{branch.address}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 tracking-widest uppercase text-[10px] mb-2">Reservations</p>
                                        {branch.phones.map((p, pi) => (
                                            <a key={pi} href={`tel:${p.replace(/\s/g, '')}`} className="block text-gray-700 hover:text-primary font-medium text-lg transition-colors">{p}</a>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleGetDirections(branch.city.toLowerCase() as 'erattupetta' | 'poonjar')}
                                    className="w-full mt-12 h-14 text-xs tracking-widest uppercase border-2 border-primary/20 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 font-medium cursor-pointer"
                                >
                                    Get Directions
                                </button>
                            </motion.div>
                        ))}
                    </RevealGroup>
                </div>
            </section>


            {/* ── Inquiry Form ── */}
            <section ref={formSectionRef} className="py-20 md:py-32 bg-white text-gray-900 border-t border-gray-50">
                <div className="container px-6 max-w-6xl mx-auto">
                    <Reveal className="mb-16">
                        <p className="text-gray-600 uppercase tracking-[0.25em] text-[10px] mb-3">Send an Inquiry</p>
                        <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-2">Leave Us a Message</h2>
                        <motion.div variants={lineWipe} initial="hidden" whileInView="visible" viewport={{ once: false }} className="h-[2px] w-16 bg-primary mt-6" />
                    </Reveal>

                    <RevealGroup>
                        {activeBranch && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 flex justify-end"
                            >
                                <Button
                                    onClick={() => setActiveBranch(null)}
                                    size="sm"
                                    className="w-full md:w-auto bg-gray-900 hover:bg-primary text-white border-0 shadow-lg transition-all duration-300 rounded-lg text-xs tracking-widest uppercase font-bold px-6 h-12 cursor-pointer"
                                >
                                    <Phone className="w-4 h-4 mr-2" />
                                    Show Contact Details
                                </Button>
                            </motion.div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-5 shadow-2xl overflow-hidden border border-gray-100 transition-all duration-500">
                            {/* Map / Sidebar */}
                            {activeBranch ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="md:col-span-2 relative md:h-auto overflow-hidden bg-gray-100 w-full flex flex-col"
                                >
                                    <div className="relative flex-grow h-[350px] md:h-full overflow-hidden">
                                        <iframe
                                            src={branchMaps[activeBranch]}
                                            className="absolute inset-0 w-full h-full border-0 grayscale-[0.2] brightness-[0.9] hover:grayscale-0 transition-all duration-700"
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div variants={fadeUp} className="bg-gray-900 text-white md:col-span-2 p-12 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-3xl font-serif mb-4 text-white">Contact Details</h3>
                                        <motion.div variants={lineWipe} initial="hidden" whileInView="visible" viewport={{ once: false }} className="h-[2px] w-10 bg-primary mb-10" />
                                        <div className="space-y-10">
                                            {[
                                                { icon: Phone, text: "+91 94471 89362" },
                                                { icon: Mail, text: "info@kannamundaresidency.com" },
                                                { icon: Clock, text: "Always Open 24 / 7" },
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-start gap-4">
                                                    <item.icon className="w-5 h-5 text-primary stroke-[1.5] mt-0.5 shrink-0" />
                                                    <span className="font-light text-white/70 text-base leading-relaxed">{item.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Form */}
                            <motion.div variants={fadeUp} className="md:col-span-3 p-12 lg:p-16 bg-white relative z-10">
                                <form className="space-y-10" onSubmit={handleSubmit}>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-widest font-medium text-gray-800">First Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                className="w-full h-11 border-0 border-b-2 border-gray-200 focus:outline-none focus:border-primary bg-transparent transition-colors px-0 font-light text-lg text-gray-900"
                                                placeholder="First Name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-widest font-medium text-gray-800">Last Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                className="w-full h-11 border-0 border-b-2 border-gray-200 focus:outline-none focus:border-primary bg-transparent transition-colors px-0 font-light text-lg text-gray-900"
                                                placeholder="Last Name"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest font-medium text-gray-800">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full h-11 border-0 border-b-2 border-gray-200 focus:outline-none focus:border-primary bg-transparent transition-colors px-0 font-light text-lg text-gray-900"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest font-medium text-gray-800">Your Message</label>
                                        <textarea
                                            rows={3}
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full py-3 border-0 border-b-2 border-gray-200 focus:outline-none focus:border-primary bg-transparent resize-none transition-colors px-0 font-light text-lg text-gray-900"
                                            placeholder="How can we assist you?"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={formStatus === "submitting"}
                                        className="w-full h-14 text-xs tracking-widest uppercase rounded-none bg-primary hover:bg-gray-900 transition-colors shadow-lg mt-4 cursor-pointer"
                                    >
                                        {formStatus === "submitting" ? (
                                            <div className="flex items-center gap-3">
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Sending...
                                            </div>
                                        ) : "Submit Inquiry"}
                                    </Button>
                                </form>
                            </motion.div>
                        </div>
                    </RevealGroup>
                </div>
            </section>

            {/* ── Toasts ── */}
            <AnimatePresence>
                {(formStatus === "success" || formStatus === "error") && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-4 text-white px-8 py-5 rounded-2xl shadow-2xl border border-white/10 min-w-[320px] ${formStatus === "success" ? "bg-gray-900" : "bg-red-900"}`}
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${formStatus === "success" ? "bg-green-500" : "bg-red-500"}`}>
                            {formStatus === "success" ? <CheckCircle2 className="w-6 h-6 text-white" /> : <XCircle className="w-6 h-6 text-white" />}
                        </div>
                        <div>
                            <p className="font-bold text-sm tracking-wide">
                                {formStatus === "success" ? "Inquiry Sent Successfully!" : "Submission Failed"}
                            </p>
                            <p className="text-white/70 text-xs font-light">
                                {formStatus === "success"
                                    ? `Redirecting to WhatsApp in ${countdown}s...`
                                    : "Please check your network or try again."}
                            </p>
                            {formStatus === "success" && (
                                <a
                                    href={`https://wa.me/919447189362?text=${encodeURIComponent(waMsg)}`}
                                    className="block mt-4 bg-green-500 hover:bg-green-600 text-white text-[10px] font-bold uppercase tracking-widest py-2 px-4 rounded-lg transition-colors text-center"
                                >
                                    Chat on WhatsApp Now
                                </a>
                            )}
                        </div>
                        <button
                            onClick={() => setFormStatus("idle")}
                            className="ml-auto text-white/30 hover:text-white transition-colors"
                        >
                            <XCircle className="w-5 h-5" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function ContactPage() {
    const hotel = useHotel();
    return (
        <Suspense fallback={<div className="min-h-screen bg-neutral-950" />}>
            <ContactContent />
        </Suspense>
    );
}
