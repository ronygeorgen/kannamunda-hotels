"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealGroup, fadeUp, lineWipe } from "@/components/animations";
import { useHotel } from "@/lib/hotelContext";

const branches = [
    {
        city: "Erattupetta",
        address: "Kannnamundayil Arcade, Pala Road, Erattupetta",
        phones: ["94471 31750", "94471 89362"],
        href: "tel:+919447131750",
    },
    {
        city: "Poonjar",
        address: "Kannnamundayil Arcade, Opp. CMI Church, Poonjar",
        phones: ["94471 07950", "94471 89362"],
        href: "tel:+919447107950",
    },
];

export function PageCTA() {
    const hotel = useHotel();
    const activeBranch = branches.find(b => b.city.toLowerCase() === hotel.id) || branches[0];

    return (
        <section className="bg-gray-50 py-24 border-t border-gray-100">
            <div className="container px-6 max-w-7xl mx-auto">
                {/* Header */}
                <RevealGroup className="text-center mb-16">
                    <motion.p
                        variants={fadeUp}
                        className="text-primary uppercase tracking-[0.25em] text-sm mb-3"
                    >
                        Ready to Arrive?
                    </motion.p>
                    <motion.h2
                        variants={fadeUp}
                        className="text-4xl md:text-5xl font-serif text-gray-900 mb-4"
                    >
                        Reserve Your Stay
                    </motion.h2>
                    <motion.div
                        variants={lineWipe}
                        className="h-[2px] w-16 bg-primary mx-auto mb-6"
                    />
                    <motion.p
                        variants={fadeUp}
                        className="text-gray-500 text-lg font-light max-w-2xl mx-auto leading-relaxed"
                    >
                        Experience unparalleled comfort and hospitality at our {hotel.name} Residency. Get in touch with us today to reserve your stay.
                    </motion.p>
                </RevealGroup>

                {/* Cards */}
                <RevealGroup className="flex justify-center mb-12">
                    <motion.div
                        variants={fadeUp}
                        className="bg-white max-w-xl w-full rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-500 group flex flex-col"
                    >
                        <div className="flex items-start gap-5 mb-6">
                            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                                <MapPin className="w-6 h-6 text-primary stroke-[1.5]" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-serif text-gray-900 mb-1">{activeBranch.city}</h3>
                                <div className="w-8 h-[2px] bg-primary/30 group-hover:w-16 transition-all duration-500" />
                            </div>
                        </div>

                        <p className="text-gray-500 font-light leading-relaxed mb-6 text-base pl-[4.75rem]">
                            {activeBranch.address}
                        </p>

                        <div className="pl-[4.75rem] mb-8">
                            <div className="flex items-center gap-2 mb-2">
                                <Phone className="w-4 h-4 text-primary stroke-[1.5]" />
                                <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">Reservations</span>
                            </div>
                            {activeBranch.phones.map((phone, pi) => (
                                <a
                                    key={pi}
                                    href={`tel:+91${phone.replace(/\s/g, "")}`}
                                    className="block text-gray-700 font-medium text-lg hover:text-primary transition-colors"
                                >
                                    +91 {phone}
                                </a>
                            ))}
                        </div>

                        <div className="mt-auto">
                            <Link href={`${hotel.basePath}/contact?branch=${hotel.id}`}>
                                <Button
                                    variant="outline"
                                    className="w-full h-12 rounded-xl border-primary/20 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group/btn text-sm tracking-wide font-medium"
                                >
                                    View on Map
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </RevealGroup>

                {/* Book Now CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-center"
                >
                    <Link href={`${hotel.basePath}/bookings`}>
                        <Button
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-white rounded-full h-14 px-12 text-sm tracking-widest uppercase shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            Book Your Stay Now
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
