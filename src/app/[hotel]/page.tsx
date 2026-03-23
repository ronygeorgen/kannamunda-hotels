"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue } from "framer-motion";
import { Wifi, ShieldCheck, Car, Wind, ArrowRight, ArrowLeft, RotateCcw, Compass, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHotel } from "@/lib/hotelContext";
import {
    heroTagline, heroTitle, heroCta, lineWipe,
    staggerChildren, wordLuxuryReveal,
    staggerContainer, staggerContainerSlow, fadeUp, fadeLeft, fadeRight, zoomIn,
    RevealGroup, Reveal, scaleUp, clipReveal,
} from "@/components/animations";


const amenities = [
    { icon: Wind, title: "A/C & Non-A/C Rooms", desc: "Choose the comfort that suits your needs." },
    { icon: Wifi, title: "Free High-Speed WiFi", desc: "Stay connected with complimentary access." },
    { icon: ShieldCheck, title: "24/7 Security", desc: "Ensuring utmost safety for all our guests." },
    { icon: Car, title: "Ample Parking", desc: "Spacious parking facility for your vehicles." },
];



const SwipeCard = ({ item, onSwipe }: { item: any, onSwipe: (dir: 'left' | 'right') => void }) => {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-15, 15]);
    const opacity = useTransform(x, [-180, -120, 0, 120, 180], [0, 1, 1, 1, 0]);
    const nextOpacity = useTransform(x, [-100, -40], [1, 0]);
    const visitOpacity = useTransform(x, [40, 100], [0, 1]);
    const nextScale = useTransform(x, [-120, -40], [1.1, 0.8]);
    const visitScale = useTransform(x, [40, 120], [0.8, 1.1]);

    return (
        <motion.div
            style={{ x, rotate, opacity }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            dragMomentum={true}
            onDragEnd={(e, info) => {
                if (info.offset.x > 80 || info.velocity.x > 500) onSwipe('right');
                else if (info.offset.x < -80 || info.velocity.x < -500) onSwipe('left');
            }}
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }}
            exit={{
                x: x.get() < 0 ? -700 : 700,
                opacity: 0,
                rotate: x.get() < 0 ? -20 : 20,
                transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] }
            }}
            className="absolute inset-0 z-10 touch-none cursor-grab active:cursor-grabbing"
        >
            <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-2xl border border-white/10">
                <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-95" />

                <motion.div
                    style={{ opacity: nextOpacity, scale: nextScale }}
                    className="absolute top-10 right-10 z-20 pointer-events-none flex flex-col items-center gap-2"
                >
                    <div className="w-14 h-14 rounded-full border-2 border-primary/50 bg-black/40 backdrop-blur-md flex items-center justify-center">
                        <RotateCcw className="text-primary h-6 w-6 -rotate-45" />
                    </div>
                    <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px] bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">Next</span>
                </motion.div>

                <motion.div
                    style={{ opacity: visitOpacity, scale: visitScale }}
                    className="absolute top-10 left-10 z-20 pointer-events-none flex flex-col items-center gap-2"
                >
                    <div className="w-14 h-14 rounded-full border-2 border-primary bg-primary/20 backdrop-blur-md flex items-center justify-center">
                        <Compass className="text-primary h-7 w-7 animate-pulse" />
                    </div>
                    <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px] bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">Explore</span>
                </motion.div>

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <span className="text-white text-[10px] tracking-[0.3em] uppercase font-bold mb-3 inline-block bg-primary px-4 py-1.5 rounded-sm shadow-xl border border-white/10">
                        {item.tag}
                    </span>
                    <h3 className="text-3xl font-serif text-white mb-3">
                        {item.title}
                    </h3>
                    <p className="text-white/70 font-light text-sm leading-relaxed mb-6">
                        {item.desc}
                    </p>
                    <div className="flex gap-4">
                        <Link href={item.link}>
                            <Button
                                variant="outline"
                                className="bg-transparent border-white/30 text-white hover:bg-primary hover:border-primary px-8 h-12 rounded-none text-xs tracking-widest uppercase pointer-events-auto"
                            >
                                View Details
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default function HotelHomePage() {
    const hotel = useHotel();
    const router = useRouter();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);
    const opac = useTransform(scrollYProgress, [0, 0.6], [1, 0]);


    const [activePortalIndex, setActivePortalIndex] = useState(0);

    const portalItems = [
        {
            title: "Premium Amenities",
            desc: "Experience unmatched luxury with our curated services designed for your ultimate comfort.",
            img: `/${hotel.imagePrefix}-amenities/amenities-1.webp`,
            link: `${hotel.basePath}/amenities`,
            tag: "Signatures"
        },
        {
            title: "Business Projects",
            desc: "Exploring our diverse ventures from construction to hospitality across Kerala.",
            img: `/${hotel.imagePrefix}-projects/projects-1.webp`,
            link: `${hotel.basePath}/projects`,
            tag: "Ventures"
        },
        {
            title: "Our Locations",
            desc: `Discover our beautiful properties nestled in the heart of ${hotel.name}.`,
            img: `/${hotel.imagePrefix}-destination/kannamunda-main-building.webp`,
            link: `${hotel.basePath}/destination`,
            tag: "Destinations"
        },
        {
            title: "Local Attractions",
            desc: "Hidden gems and iconic landmarks just steps away from our residency.",
            img: `/${hotel.imagePrefix}-nearby-attractions/location3.webp`,
            link: `${hotel.basePath}/nearby-attractions`,
            tag: "Nearby"
        },
        {
            title: "Captured Moments",
            desc: "A visual journey through our architecture, ambiance, and the smiles of our guests.",
            img: `/${hotel.imagePrefix}-gallery/interior-room-image-edited.webp`,
            link: `${hotel.basePath}/gallery`,
            tag: "Gallery"
        },
        {
            title: "Reach Out to Us",
            desc: "We are always here to assist you. Plan your stay or send us an inquiry.",
            img: `/${hotel.imagePrefix}-contact/contact-us.webp`,
            link: `${hotel.basePath}/contact`,
            tag: "Inquiry"
        }
    ];

    const handleManualSwipe = useCallback((dir: 'left' | 'right') => {
        if (dir === 'left') {
            setActivePortalIndex((prev) => (prev + 1) % portalItems.length);
        } else {
            router.push(portalItems[activePortalIndex].link);
        }
    }, [activePortalIndex, router, portalItems]);



    return (
        <div className="flex flex-col min-h-screen bg-neutral-950 text-white">


            {/* ───── HERO ───── */}
            <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-0 z-0">
                    {/* Desktop Overlay Image */}
                    <div className="hidden md:block absolute inset-0">
                        <Image
                            src={hotel.heroImage}
                            alt={`${hotel.fullName} - Desktop View`}
                            fill className="object-cover object-right-bottom"
                            priority
                        />
                    </div>
                    {/* Mobile Overlay Image */}
                    <div className="block md:hidden absolute inset-0">
                        <Image
                            src={hotel.heroImageMobile}
                            alt={`${hotel.fullName} - Mobile View`}
                            fill className="object-cover object-right-bottom"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-neutral-950/90" />
                </motion.div>

                <motion.div style={{ opacity: opac }} className="relative z-10 container px-6 text-center flex flex-col items-center pt-24 md:pt-32">
                    <motion.div
                        variants={heroTagline} initial="hidden" whileInView="visible" viewport={{ once: false }}
                        className="text-white/80 uppercase mb-4 text-xs md:text-sm font-medium tracking-[0.3em] flex flex-wrap items-center justify-center gap-x-2 gap-y-4"
                    >
                        <span>Welcome to</span>
                        <span className="md:bg-primary/90 text-white md:px-3 md:py-1 md:rounded-sm md:shadow-xl font-bold font-serif md:border md:border-white/10 md:brightness-110">
                            Kannamundayil Residency
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={staggerChildren}
                        initial="hidden"
                        animate="visible"
                        className="text-4xl md:text-7xl font-serif leading-tight max-w-5xl text-white drop-shadow-2xl mb-4"
                        style={{ perspective: "1000px" }}
                    >
                        {["A", "Haven", "of"].map((word, i) => (
                            <motion.span key={i} variants={wordLuxuryReveal} className="inline-block mr-[0.25em]">
                                {word}
                            </motion.span>
                        ))}
                        <motion.span variants={wordLuxuryReveal} className="inline-block mr-[0.25em]">
                            <em className="text-primary brightness-150 not-italic drop-shadow-[0_2px_2px_rgba(255,255,255,0.2)]">
                                Comfort
                            </em>
                        </motion.span>
                        <motion.span variants={wordLuxuryReveal} className="inline-block mr-[0.25em]">
                            &amp;
                        </motion.span>
                        <motion.span variants={wordLuxuryReveal} className="inline-block">
                            Luxury
                        </motion.span>
                    </motion.h1>

                    {/* Hotel Location Indicator */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="flex items-center gap-3 mb-4"
                    >
                        <div className="h-[2px] w-8 bg-primary/60" />
                        <span className="bg-white/95 text-primary text-[10px] md:text-xs tracking-[0.25em] uppercase font-bold px-3 py-1 rounded-sm shadow-md">
                            {hotel.name} Branch
                        </span>
                        <div className="h-[2px] w-8 bg-primary/60" />
                    </motion.div>

                    <motion.div variants={lineWipe} initial="hidden" whileInView="visible" viewport={{ once: false }} className="h-[3px] w-32 bg-primary mt-6 md:mb-2 mb-6 drop-shadow-md" />

                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="text-white drop-shadow-md text-base md:text-xl max-w-2xl mb-8 md:mb-12 font-medium leading-relaxed px-4 md:px-0"
                    >
                        Nestled in the heart of {hotel.location} where Kerala's warmth meets unparalleled comfort.
                    </motion.p>

                    <motion.div variants={heroCta} initial="hidden" whileInView="visible" viewport={{ once: false }} className="flex flex-col sm:flex-row gap-5">
                        <Link href={`${hotel.basePath}/bookings`}>
                            <Button size="lg" className="bg-primary hover:bg-white hover:text-primary rounded-none h-14 px-10 text-sm tracking-widest uppercase shadow-2xl transition-all duration-300">
                                Book Your Stay
                            </Button>
                        </Link>
                        <Link href={`${hotel.basePath}/amenities`}>
                            <Button size="lg" variant="outline" className="rounded-none h-14 px-10 text-sm tracking-widest uppercase border-white/40 hover:bg-white hover:text-black bg-white/10 backdrop-blur-md text-white transition-all duration-300">
                                Explore Amenities
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="flex flex-col items-center gap-2 mt-12"
                    >
                        <span className="text-white/40 text-xs tracking-[0.25em] uppercase">Scroll</span>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent"
                        />
                    </motion.div>
                </motion.div>
            </section>

            {/* ───── ABOUT STRIP ───── */}
            <section className="bg-white text-gray-900 py-32 relative overflow-hidden">
                <div className="absolute -right-10 top-1/2 -translate-y-1/2 text-[20vw] font-serif text-gray-100 select-none pointer-events-none leading-none">K</div>

                <div className="container px-6 mx-auto max-w-7xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative h-[620px] w-full hidden lg:block">
                            <div className="absolute inset-6 border border-primary/20 z-0 -translate-x-5 translate-y-5" />
                            <motion.div
                                variants={clipReveal}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                className="relative z-10 w-full h-full"
                            >
                                <Image src={hotel.aboutImage} alt="Luxurious Room Interior" fill className="object-cover shadow-2xl" sizes="50vw" />
                            </motion.div>
                        </div>

                        <RevealGroup>
                            <motion.p variants={fadeUp} className="text-gray-600 font-medium tracking-[0.25em] uppercase text-xs mb-3">Discover the {hotel.name} Residency</motion.p>
                            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-serif mb-6 text-gray-900 leading-tight">
                                A Home Away From Home in Kerala
                            </motion.h2>
                            <motion.div variants={lineWipe} className="h-[2px] w-16 bg-primary mb-8" />
                            <motion.p variants={fadeUp} className="text-gray-600 text-lg leading-relaxed font-light mb-5">
                                Located in the heart of {hotel.location}, Kannamundayil Residency is a family-run tourist home that embodies the warmth and hospitality of Kerala.
                            </motion.p>
                            <motion.p variants={fadeUp} className="text-gray-600 text-lg leading-relaxed font-light mb-12">
                                Whether visiting for business or leisure, we offer an environment blending modern convenience with traditional charm at our {hotel.name} property.
                            </motion.p>
                            <motion.div variants={fadeUp}>
                                <Link href={`${hotel.basePath}/about`}>
                                    <Button variant="link" className="group h-12 px-0 text-primary text-base hover:no-underline font-medium tracking-wide cursor-pointer">
                                        Our Complete Story
                                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                                    </Button>
                                </Link>
                            </motion.div>
                        </RevealGroup>
                    </div>
                </div>
            </section>

            {/* ───── AMENITIES ───── */}
            <section className="bg-[#3a0a14] py-32 border-t border-white/5">
                <div className="container px-6 mx-auto max-w-7xl">
                    <Reveal className="text-center mb-20">
                        <p className="text-white/60 uppercase tracking-[0.25em] text-xs mb-3">Our Commitments</p>
                        <h2 className="text-4xl md:text-5xl font-serif text-white">Signatures of Comfort</h2>
                        <motion.div
                            variants={lineWipe} initial="hidden" whileInView="visible" viewport={{ once: false }}
                            className="h-[2px] w-16 bg-white mx-auto mt-8"
                        />
                    </Reveal>

                    <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {amenities.map((item, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                className="bg-white/5 backdrop-blur-sm p-10 group hover:bg-white/10 hover:-translate-y-1 transition-all duration-500 border border-white/10 border-t-4 border-t-primary/40 hover:border-t-primary flex flex-col items-center text-center"
                            >
                                <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white/15 transition-colors duration-500">
                                    <item.icon className="h-9 w-9 text-white/60 group-hover:text-white transition-colors duration-500 stroke-[1.25]" />
                                </div>
                                <h3 className="text-xl font-serif text-white mb-3">{item.title}</h3>
                                <p className="text-white/60 font-light leading-relaxed group-hover:text-white/80 transition-colors duration-500">{item.desc}</p>
                            </motion.div>
                        ))}
                    </RevealGroup>
                </div>
            </section>

            {/* ───── PORTAL SHOWCASE ───── */}
            <section className="bg-white py-32 border-t border-gray-50 overflow-hidden">
                <div className="container px-6 mx-auto max-w-[1400px]">
                    <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-16 gap-8">
                        <RevealGroup className="max-w-xl">
                            <Reveal variants={fadeUp}>
                                <p className="text-[#4b6b80] uppercase tracking-[0.2em] text-[10px] font-bold mb-4">
                                    Gateway to Excellence
                                </p>
                            </Reveal>

                            <div className="relative overflow-hidden mb-6">
                                <motion.h2
                                    variants={{
                                        hidden: { y: "100%", opacity: 0 },
                                        visible: {
                                            y: 0,
                                            opacity: 1,
                                            transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }
                                        }
                                    }}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="text-4xl lg:text-5xl font-serif text-gray-900 leading-tight"
                                >
                                    Explore the Residency Experience
                                </motion.h2>
                            </div>

                            <Reveal variants={lineWipe} delay={0.4}>
                                <div className="h-[2px] w-16 bg-[#6a1224]" />
                            </Reveal>
                        </RevealGroup>

                        <Reveal variants={fadeUp} delay={0.6} className="lg:max-w-md lg:text-right">
                            <p className="text-[#4b6b80] font-light text-[15px] leading-relaxed">
                                From world-class amenities to local charms, discover everything that makes your stay at Kannamundayil truly unforgettable.
                            </p>
                        </Reveal>
                    </div>

                    {/* Mobile Swipe Deck */}
                    <div className="md:hidden relative px-4 h-[520px]">
                        <div className="relative w-full h-full">
                            <AnimatePresence mode="popLayout" initial={false}>
                                <SwipeCard
                                    key={activePortalIndex}
                                    item={portalItems[activePortalIndex]}
                                    onSwipe={handleManualSwipe}
                                />
                            </AnimatePresence>
                        </div>

                        <div className="flex justify-center gap-2 mt-8">
                            {portalItems.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActivePortalIndex(idx)}
                                    className={`h-1.5 transition-all duration-300 rounded-full ${activePortalIndex === idx ? "w-8 bg-primary" : "w-1.5 bg-gray-200"}`}
                                />
                            ))}
                        </div>

                        <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest mt-4">
                            Swipe Left for next • Swipe Right to visit
                        </p>
                    </div>

                    {/* Desktop Static Grid */}
                    <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
                        {portalItems.map((item, i) => (
                            <motion.div
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, y: 50 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 } }
                                }}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-80px" }}
                                className="group relative h-[450px] overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-700"
                            >
                                <motion.div
                                    variants={{
                                        hidden: { clipPath: "inset(100% 0% 0% 0%)" },
                                        visible: {
                                            clipPath: "inset(0% 0% 0% 0%)",
                                            transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 + 0.1 }
                                        }
                                    }}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-80px" }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={item.img}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                </motion.div>

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/95 group-hover:via-black/60 transition-all duration-700" />

                                <div className="absolute inset-0 p-10 flex flex-col justify-end lg:translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-700">
                                    <span className={`text-[10px] tracking-[0.3em] uppercase font-bold mb-3 inline-block transition-all duration-500 bg-primary text-white px-3 py-1 rounded-sm shadow-xl border border-white/10 lg:opacity-0 lg:group-hover:opacity-100 lg:bg-transparent lg:text-primary lg:border-none lg:shadow-none lg:px-0 lg:py-0 lg:group-hover:bg-primary lg:group-hover:text-white lg:group-hover:px-3 lg:group-hover:py-1 lg:group-hover:rounded-sm lg:group-hover:shadow-xl lg:group-hover:border lg:group-hover:border-white/10`}>
                                        {item.tag}
                                    </span>

                                    <h3 className="text-2xl font-serif mb-4 drop-shadow-lg transition-all duration-500 text-white lg:text-white/70 lg:group-hover:text-white lg:group-hover:[text-shadow:_0_2px_16px_rgba(0,0,0,0.9)]">
                                        {item.title}
                                    </h3>
                                    <div className="h-[2px] bg-primary mb-4 w-12 lg:w-0 lg:group-hover:w-12 transition-all duration-700" />

                                    <p className="font-light text-sm leading-relaxed mb-8 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 delay-100 text-white/90 lg:group-hover:[text-shadow:_0_1px_8px_rgba(0,0,0,0.8)]">
                                        {item.desc}
                                    </p>
                                    <Link href={item.link}>
                                        <Button
                                            variant="outline"
                                            className="bg-transparent border-white/30 text-white hover:bg-primary hover:border-primary px-8 h-12 rounded-none text-xs tracking-widest uppercase transition-all duration-300 w-fit"
                                        >
                                            View Details
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
