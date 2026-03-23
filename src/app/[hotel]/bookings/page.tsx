"use client";
import { useHotel } from "@/lib/hotelContext";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Calendar, User, Users, Phone, Mail, FileText, CheckCircle2, XCircle, MapPin } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    heroTagline, heroTitlePopup, lineWipe,
    fadeUp, Reveal, RevealGroup,
} from "@/components/animations";

export default function BookingPage() {
    const hotel = useHotel();
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        checkIn: "",
        checkOut: "",
        room: "",
        adults: "",
        children: "",
        phone: "",
        name: "",
        email: "",
        notes: "",
        location: hotel.name
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Date Validation
        if (new Date(formData.checkOut) <= new Date(formData.checkIn)) {
            setFormStatus("error");
            setTimeout(() => setFormStatus("idle"), 5000);
            return;
        }

        setFormStatus("submitting");

        try {
            const response = await fetch('/api/booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormStatus("success");
                // Reset form data
                setFormData({
                    checkIn: "",
                    checkOut: "",
                    room: "",
                    adults: "",
                    children: "",
                    phone: "",
                    name: "",
                    email: "",
                    notes: "",
                    location: hotel.name
                });
                // Reset toast after 5 seconds
                setTimeout(() => setFormStatus("idle"), 5000);
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

    const inputClasses = "w-full bg-white border border-gray-200 rounded-xl px-5 py-4 text-gray-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 placeholder:text-gray-400 font-light";
    const labelClasses = "block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2 ml-1";

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="min-h-screen bg-white">
            {/* ── Hero ── */}
            <section ref={heroRef} className="relative h-[60vh] flex items-end overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-0 z-0">
                    <Image
                        src={`/${hotel.imagePrefix}-bookings/booking-hero-image.webp`}
                        alt="Book Your Stay"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </motion.div>

                <div className="container relative z-10 px-6 pb-16">
                    <motion.p variants={heroTagline} initial="hidden" animate="visible"
                        className="inline-block bg-primary text-white px-4 py-1.5 rounded-sm uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-6 shadow-xl border border-white/10"
                    >
                        Reservation
                    </motion.p>
                    <div className="overflow-hidden pb-1">
                        <motion.h1
                            variants={heroTitlePopup}
                            initial="hidden"
                            animate="visible"
                            className="text-5xl md:text-8xl font-serif leading-none text-white"
                        >
                            Book Your Stay
                        </motion.h1>
                    </div>
                    <motion.div variants={lineWipe} initial="hidden" animate="visible" className="h-[3px] w-40 bg-primary mt-2" />
                </div>
            </section>

            {/* ── Booking Form Section ── */}
            <section className="py-20 md:py-32 bg-gray-50">
                <div className="container px-6 max-w-4xl mx-auto">
                    <Reveal className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">Confirm Your Reservation</h2>
                        <p className="text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
                            Complete the form below to book your luxury experience at Kannamundayil Residency. Our team will contact you shortly to confirm your details.
                        </p>
                    </Reveal>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-100"
                    >
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Selected Location Display */}
                            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] uppercase tracking-[2px] font-bold text-primary mb-1">Confirming Reservation For</p>
                                    <h3 className="text-xl font-serif text-gray-900">{hotel.name} Hotel</h3>
                                </div>
                                <div className="hidden md:block">
                                    <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center">
                                        <MapPin className="text-primary w-5 h-5" />
                                    </div>
                                </div>
                            </div>

                            {/* Dates & Room */}
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className={labelClasses}>Check In</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-primary w-4 h-4 opacity-50" />
                                        <input
                                            type="date"
                                            required
                                            min={today}
                                            value={formData.checkIn}
                                            className={`${inputClasses} pl-12`}
                                            onKeyDown={(e) => e.preventDefault()}
                                            onChange={(e) => {
                                                const newCheckIn = e.target.value;
                                                setFormData(prev => ({
                                                    ...prev,
                                                    checkIn: newCheckIn,
                                                    // Clear checkout if it's now before new check-in
                                                    checkOut: prev.checkOut && new Date(prev.checkOut) <= new Date(newCheckIn) ? "" : prev.checkOut
                                                }));
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className={labelClasses}>Check Out</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-primary w-4 h-4 opacity-50" />
                                        <input
                                            type="date"
                                            required
                                            min={formData.checkIn || today}
                                            value={formData.checkOut}
                                            className={`${inputClasses} pl-12`}
                                            onKeyDown={(e) => e.preventDefault()}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                if (!formData.checkIn || new Date(val) > new Date(formData.checkIn)) {
                                                    setFormData({ ...formData, checkOut: val });
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className={labelClasses}>Room Type</label>
                                    <div className="relative">
                                        <Users className="absolute left-5 top-1/2 -translate-y-1/2 text-primary w-4 h-4 opacity-50" />
                                        <select
                                            required
                                            value={formData.room}
                                            className={`${inputClasses} pl-12 appearance-none`}
                                            onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                                        >
                                            <option value="">Select Room</option>
                                            <option value="deluxe">Deluxe Room</option>
                                            <option value="executive">Executive Suite</option>
                                            <option value="family">Family Suite</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Guests & Phone */}
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className={labelClasses}>Adults</label>
                                    <div className="relative">
                                        <User className="absolute left-5 top-1/2 -translate-y-1/2 text-primary w-4 h-4 opacity-50" />
                                        <input
                                            type="number"
                                            min="1"
                                            value={formData.adults}
                                            placeholder="Adults"
                                            className={`${inputClasses} pl-12`}
                                            onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className={labelClasses}>Children</label>
                                    <div className="relative">
                                        <User className="absolute left-5 top-1/2 -translate-y-1/2 text-primary w-4 h-4 opacity-50" />
                                        <input
                                            type="number"
                                            min="0"
                                            value={formData.children}
                                            placeholder="Children"
                                            className={`${inputClasses} pl-12`}
                                            onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className={labelClasses}>Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-primary w-4 h-4 opacity-50" />
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            placeholder="Your Phone"
                                            className={`${inputClasses} pl-12`}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Name & Email */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className={labelClasses}>Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        placeholder="Enter your full name"
                                        className={inputClasses}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className={labelClasses}>Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute right-5 top-1/2 -translate-y-1/2 text-primary w-4 h-4 opacity-50" />
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            placeholder="name@email.com"
                                            className={`${inputClasses} pr-12`}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="space-y-2">
                                <label className={labelClasses}>Additional Notes</label>
                                <div className="relative">
                                    <FileText className="absolute left-5 top-6 text-primary w-4 h-4 opacity-50" />
                                    <textarea
                                        rows={4}
                                        value={formData.notes}
                                        placeholder="Any special requests or details we should know?"
                                        className={`${inputClasses} pl-12 resize-none`}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={formStatus === "submitting"}
                                className="w-full h-16 rounded-xl bg-primary hover:bg-gray-900 transition-all duration-300 text-sm tracking-[0.2em] uppercase font-bold shadow-xl shadow-primary/20 cursor-pointer"
                            >
                                {formStatus === "submitting" ? (
                                    <div className="flex items-center gap-3">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Processing...
                                    </div>
                                ) : (
                                    "Confirm Booking Now"
                                )}
                            </Button>
                        </form>
                    </motion.div>
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
                                {formStatus === "success" ? "Booking Request Sent!" : "Submission Failed"}
                            </p>
                            <p className="text-white/70 text-xs font-light">
                                {formStatus === "success" ? "We'll contact you shortly." : "Please check your network or try again."}
                            </p>
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
