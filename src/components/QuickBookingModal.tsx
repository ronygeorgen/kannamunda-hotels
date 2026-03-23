"use client";
import { useState } from "react";
import { X, Calendar, User, Users, Phone, Mail, FileText, CheckCircle2, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

interface QuickBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialRoom?: string;
    hotelName: string;
}

export function QuickBookingModal({ isOpen, onClose, initialRoom = "", hotelName }: QuickBookingModalProps) {
    const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        checkIn: "",
        checkOut: "",
        room: initialRoom,
        adults: "1",
        children: "0",
        phone: "",
        name: "",
        email: "",
        notes: "",
        location: hotelName
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus("submitting");

        try {
            const response = await fetch('/api/booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormStatus("success");
                setTimeout(() => {
                    setFormStatus("idle");
                    onClose();
                }, 3000);
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

    const inputClasses = "w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 text-gray-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 placeholder:text-gray-400 font-light text-sm";
    const labelClasses = "block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1 ml-1";
    const today = new Date().toISOString().split('T')[0];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-primary p-8 text-white relative">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClose();
                                }}
                                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors z-[210] cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-70 mb-1">Quick Reservation</p>
                            <h2 className="text-3xl font-serif">Plan Your Stay</h2>
                            <p className="text-white/60 text-xs mt-2 font-light">Confirming request for <span className="text-white font-medium">{hotelName} Hotel</span></p>
                        </div>

                        {/* Form */}
                        <div className="p-8 max-h-[70vh] overflow-y-auto">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className={labelClasses}>Check In</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-4 h-4 opacity-50" />
                                            <input type="date" required min={today} value={formData.checkIn} className={`${inputClasses} pl-11`} onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className={labelClasses}>Check Out</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-4 h-4 opacity-50" />
                                            <input type="date" required min={formData.checkIn || today} value={formData.checkOut} className={`${inputClasses} pl-11`} onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })} />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className={labelClasses}>Room Category</label>
                                        <div className="relative">
                                            <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-4 h-4 opacity-50" />
                                            <select
                                                required
                                                disabled
                                                value={formData.room}
                                                className={`${inputClasses} pl-11 appearance-none bg-gray-100/50 cursor-not-allowed text-gray-700 font-medium`}
                                                onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                                            >
                                                <option value="">Select Room</option>
                                                <option value="deluxe">Deluxe Room</option>
                                                <option value="executive">Executive Suite</option>
                                                <option value="family">Family Suite</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className={labelClasses}>Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-4 h-4 opacity-50" />
                                            <input type="tel" required value={formData.phone} placeholder="Your Phone" className={`${inputClasses} pl-11`} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className={labelClasses}>Full Name</label>
                                        <input type="text" required value={formData.name} placeholder="Your Name" className={inputClasses} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className={labelClasses}>Email Address</label>
                                        <input type="email" required value={formData.email} placeholder="your@email.com" className={inputClasses} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={formStatus === "submitting"}
                                    className="w-full h-14 rounded-xl bg-primary hover:bg-black transition-all duration-300 text-xs tracking-widest uppercase font-bold text-white mt-4"
                                >
                                    {formStatus === "submitting" ? "Processing Application..." : "Send Reservation Request"}
                                </Button>
                            </form>
                        </div>

                        {/* Success/Error Overlays */}
                        <AnimatePresence>
                            {formStatus === "success" && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-white flex flex-col items-center justify-center p-12 text-center z-10">
                                    <CheckCircle2 size={64} className="text-green-500 mb-4" />
                                    <h3 className="text-2xl font-serif text-gray-900">Request Sent!</h3>
                                    <p className="text-gray-500 mt-2 font-light">Your reservation request for {hotelName} has been received. Our team will contact you shortly.</p>
                                </motion.div>
                            )}
                            {formStatus === "error" && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-white flex flex-col items-center justify-center p-12 text-center z-10">
                                    <XCircle size={64} className="text-red-500 mb-4" />
                                    <h3 className="text-2xl font-serif text-gray-900">System Error</h3>
                                    <p className="text-gray-500 mt-2 font-light">We encountered an issue processing your request. Please try again or contact us directly.</p>
                                    <Button onClick={() => setFormStatus("idle")} className="mt-6 bg-gray-900">Try Again</Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
