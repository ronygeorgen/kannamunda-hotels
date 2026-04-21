"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, fadeUp, lineWipe } from "@/components/animations";

function ContactPageContent() {
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
                    `📩 *New Inquiry — Kannamundayil Group*`,
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

    return (
        <div className="min-h-screen bg-neutral-950 text-white relative">
            {/* Background Image Layer */}
            <div className="fixed top-0 left-0 w-screen h-screen z-0 overflow-hidden pointer-events-none">
                <Image
                    src="/landing-page/Contact/landing-contact.webp"
                    alt="Contact Background"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                    quality={90}
                />
                <div className="absolute inset-0 bg-neutral-950/90 backdrop-blur-[2px]" />
            </div>

            {/* Inquiry Form Section */}
            <section className="relative z-10 pt-40 pb-24 md:pb-32">
                <div className="container px-6 max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-16">
                        {/* Info Column */}
                        <div className="lg:col-span-4 lg:pr-8">
                            <Reveal className="mb-12">
                                <p className="text-white/40 uppercase tracking-[0.25em] text-[10px] mb-3">Send an Inquiry</p>
                                <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Leave Us a Message</h2>
                                <div className="h-[2px] w-16 bg-primary" />
                            </Reveal>

                            <RevealGroup className="space-y-10">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm tracking-wide mb-1 uppercase text-white/30">Main Office</h4>
                                        <p className="text-white/60 font-light leading-relaxed">Kannnamundayil Arcade, Pala Road, Erattupetta, Kerala</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                                        <Phone className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm tracking-wide mb-1 uppercase text-white/30">Call Us</h4>
                                        <p className="text-white/60 font-light leading-relaxed">+91 94471 89362</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                                        <Mail className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm tracking-wide mb-1 uppercase text-white/30">Email Us</h4>
                                        <p className="text-white/60 font-light leading-relaxed">info@kannamundaresidency.com</p>
                                    </div>
                                </div>
                            </RevealGroup>
                        </div>

                        {/* Form Column */}
                        <div className="lg:col-span-8">
                            <motion.div
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="bg-[#0d0d0d] p-8 md:p-12 shadow-2xl border border-white/5 rounded-2xl"
                            >
                                <form className="space-y-8" onSubmit={handleSubmit}>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-widest font-bold text-white">First Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                className="w-full h-12 border-0 border-b border-white/10 focus:outline-none focus:border-primary bg-transparent transition-colors px-0 font-light text-lg text-white"
                                                placeholder="Enter your first name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-widest font-bold text-white">Last Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                className="w-full h-12 border-0 border-b border-white/10 focus:outline-none focus:border-primary bg-transparent transition-colors px-0 font-light text-lg text-white"
                                                placeholder="Enter your last name"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest font-bold text-white">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full h-12 border-0 border-b border-white/10 focus:outline-none focus:border-primary bg-transparent transition-colors px-0 font-light text-lg text-white"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest font-bold text-white">Your Message</label>
                                        <textarea
                                            rows={4}
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full py-4 border-0 border-b border-white/10 focus:outline-none focus:border-primary bg-transparent resize-none transition-colors px-0 font-light text-lg text-white"
                                            placeholder="How can we help you?"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={formStatus === "submitting"}
                                        className="w-full h-16 text-xs tracking-[0.25em] uppercase rounded-xl bg-primary hover:bg-gray-900 transition-all duration-300 shadow-xl group/btn"
                                    >
                                        {formStatus === "submitting" ? (
                                            <div className="flex items-center gap-3">
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Sending Inquiry...
                                            </div>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                Submit Message
                                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </span>
                                        )}
                                    </Button>
                                </form>
                            </motion.div>
                        </div>
                    </div>

                    {/* Back to Group button */}
                    <div className="mt-24 pt-12 border-t border-white/5 text-center">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 border border-white/10 text-white/40 hover:text-white hover:border-white/30 px-10 py-4 text-xs tracking-[0.25em] uppercase font-bold transition-all duration-300 rounded-full group"
                        >
                            <span className="group-hover:-translate-x-1 transition-transform">←</span>
                            Back to Group Home
                        </Link>
                    </div>
                </div>
            </section>

            {/* Toasts */}
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
                                {formStatus === "success" ? "Message Sent!" : "Submission Error"}
                            </p>
                            <p className="text-white/70 text-xs font-light">
                                {formStatus === "success"
                                    ? `Redirecting to WhatsApp in ${countdown}s...`
                                    : "Please try again later."}
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
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function GroupContactPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-neutral-950" />}>
            <ContactPageContent />
        </Suspense>
    );
}
