"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue } from "framer-motion";
import { Wifi, ShieldCheck, Car, Wind, ArrowRight, RotateCcw, Compass, MapPin, ArrowUpSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHotel } from "@/lib/hotelContext";
import {
    lineWipe,
    staggerContainer, staggerContainerSlow, fadeUp, fadeLeft, fadeRight, zoomIn,
    RevealGroup, Reveal, scaleUp, clipReveal,
} from "@/components/animations";


const baseAmenities = [
    { icon: Wind, title: "A/C & Non-A/C Rooms", desc: "Choose the comfort that suits your needs." },
    { icon: Wifi, title: "Free High-Speed WiFi", desc: "Stay connected with complimentary access." },
    { icon: ShieldCheck, title: "24/7 Security", desc: "Ensuring utmost safety for all our guests." },
    { icon: Car, title: "Ample Parking", desc: "Spacious parking facility for your vehicles." },
];

const AmenitiesShowcase = ({ amenities, href }: { amenities: typeof baseAmenities; href: string }) => (
    <div className="grid lg:grid-cols-12 gap-14 lg:gap-16 items-center">
        {/* Intro */}
        <Reveal className="lg:col-span-5 text-center lg:text-left">
            <p className="text-primary uppercase tracking-[0.25em] text-xs font-bold mb-3">Our Commitments</p>
            <h2 className="text-4xl md:text-5xl font-serif text-ink leading-tight">Signatures of Comfort</h2>
            <div className="h-[2px] w-16 bg-primary mt-6 mb-8 mx-auto lg:mx-0" />
            <p className="text-ink/75 text-lg leading-relaxed mb-10 max-w-md mx-auto lg:mx-0">
                Thoughtful essentials, ready the moment you arrive, so all that&apos;s left to do is unwind.
            </p>
            <Link
                href={href}
                className="group inline-flex items-center gap-3 rounded-full bg-primary text-white px-7 py-3.5 text-sm font-bold tracking-wide shadow-lg shadow-primary/20 hover:bg-maroon-dark transition-colors duration-300"
            >
                Explore all amenities
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
        </Reveal>

        {/* Tiles */}
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {amenities.map((item, i) => {
                // With an odd count, the last tile spans both columns so the grid stays balanced.
                const isWide = amenities.length % 2 === 1 && i === amenities.length - 1;
                return (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        className={`group relative overflow-hidden rounded-2xl bg-white border border-maroon/10 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-[box-shadow,transform] duration-500 ${isWide ? "sm:col-span-2 sm:flex sm:items-center sm:gap-6" : ""}`}
                    >
                        {/* Maroon fill that sweeps up on hover */}
                        <span className="absolute inset-0 bg-primary origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />

                        <div className={`relative flex items-start justify-between shrink-0 ${isWide ? "mb-6 sm:mb-0" : "mb-6"}`}>
                            <span className="w-14 h-14 rounded-xl bg-maroon-light text-primary flex items-center justify-center group-hover:bg-white/15 group-hover:text-white transition-colors duration-500">
                                <item.icon className="w-7 h-7 stroke-[1.5]" />
                            </span>
                            {!isWide && (
                                <span className="font-serif text-4xl leading-none text-primary/15 group-hover:text-white/30 transition-colors duration-500 select-none">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                            )}
                        </div>

                        {/* Wide tile: number pinned top-right, same spot as the other tiles */}
                        {isWide && (
                            <span className="absolute top-7 right-7 font-serif text-4xl leading-none text-primary/15 group-hover:text-white/30 transition-colors duration-500 select-none">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                        )}

                        <div className="relative">
                            <h3 className="text-xl font-bold text-ink mb-2 group-hover:text-white transition-colors duration-500">{item.title}</h3>
                            <p className="text-ink/70 leading-relaxed group-hover:text-white/85 transition-colors duration-500">{item.desc}</p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    </div>
);


const SwipeCard = ({ item, onSwipe }: { item: any, onSwipe: (dir: 'left' | 'right') => void }) => {

    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-30, 30]);
    const opacity = useTransform(x, [-180, -120, 0, 120, 180], [0.6, 1, 1, 1, 0.6]);
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
                if (info.offset.x > 130 || info.velocity.x > 600) onSwipe('right');
                else if (info.offset.x < -130 || info.velocity.x < -600) onSwipe('left');
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
                    <div className="w-14 h-14 rounded-full border-2 border-primary/50 bg-primary/20 backdrop-blur-md flex items-center justify-center">
                        <RotateCcw className="text-primary h-6 w-6 -rotate-45" />
                    </div>
                    <span className="text-primary font-bold uppercase tracking-[0.2em] text-[12px] bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">Next</span>
                </motion.div>

                <motion.div
                    style={{ opacity: visitOpacity, scale: visitScale }}
                    className="absolute top-10 left-10 z-20 pointer-events-none flex flex-col items-center gap-2"
                >
                    <div className="w-14 h-14 rounded-full border-2 border-primary bg-primary/20 backdrop-blur-md flex items-center justify-center">
                        <Compass className="text-primary h-7 w-7 animate-pulse" />
                    </div>
                    <span className="text-primary font-bold uppercase tracking-[0.2em] text-[12px] bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">Explore</span>
                </motion.div>

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <span className="text-white text-[12px] tracking-[0.3em] uppercase font-bold mb-3 inline-block bg-primary px-4 py-1.5 rounded-sm shadow-xl border border-white/10">
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
            title: "About Our Heritage",
            desc: "Discover the legacy of hospitality and the values that define our residency.",
            img: hotel.aboutImageRight,
            link: `${hotel.basePath}/about`,
            tag: "History"
        },
        {
            title: "Premium Amenities",
            desc: "Experience unmatched luxury with our curated services designed for your ultimate comfort.",
            img: `/${hotel.imagePrefix}-amenities/amenities-1.webp`,
            link: `${hotel.basePath}/amenities`,
            tag: "Luxury"
        },
        {
            title: "Local Attractions",
            desc: "Hidden gems and iconic landmarks just steps away from our residency.",
            img: `/${hotel.imagePrefix}-nearby-attractions/location3.webp`,
            link: `${hotel.basePath}/nearby-attractions`,
            tag: "Nearby"
        },
        {
            title: "Step Inside",
            desc: "Take a visual tour of our rooms, spaces and the details that make every stay memorable.",
            img: hotel.galleryHeroImage,
            link: `${hotel.basePath}/gallery`,
            tag: "Gallery"
        },
        {
            title: "Reach Out to Us",
            desc: "We are always here to assist you. Plan your stay or send us an inquiry.",
            img: `/${hotel.imagePrefix}-contact/contact-us.webp`,
            link: `${hotel.basePath}/contact`,
            tag: "Inquiry"
        },
        {
            title: "Book Your Stay",
            desc: "Reserve your luxury experience directly with us for the best rates and services.",
            img: `/${hotel.imagePrefix}-bookings/booking-hero-image.webp`,
            link: `${hotel.basePath}/bookings`,
            tag: "Booking"
        }
    ];

    const handleManualSwipe = useCallback((dir: 'left' | 'right') => {
        if (dir === 'left') {
            setActivePortalIndex((prev) => (prev + 1) % portalItems.length);
        } else {
            router.push(portalItems[activePortalIndex].link);
        }
    }, [activePortalIndex, router, portalItems]);

    // Compute amenities dynamically to show Lift Facility for Erattupetta
    const amenities = hotel.id === "erattupetta"
        ? [...baseAmenities, { icon: ArrowUpSquare, title: "Lift Facility", desc: "Modern elevator for easy access between floors." }]
        : baseAmenities;

    return (
        <div className="flex flex-col min-h-screen bg-cream text-ink">


            {/* ───── HERO ───── */}
            <section ref={containerRef} className="relative h-svh min-h-[600px] flex items-end overflow-hidden">
                <motion.div
                    style={{ y }}
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 z-0"
                >
                    <div className="hidden md:block absolute inset-0">
                        <Image
                            src={hotel.heroImage}
                            alt={`${hotel.fullName} - Desktop View`}
                            fill className="object-cover"
                            style={{ objectPosition: hotel.heroPosition }}
                            sizes="100vw"
                            priority
                        />
                    </div>
                    <div className="block md:hidden absolute inset-0">
                        <Image
                            src={hotel.heroImageMobile}
                            alt={`${hotel.fullName} - Mobile View`}
                            fill className="object-cover"
                            style={{ objectPosition: hotel.heroPositionMobile }}
                            sizes="100vw"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />
                    <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black/60 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-3/4 md:hidden bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                </motion.div>

                <motion.div style={{ opacity: opac }} className="relative z-10 w-full">
                    <div className="container mx-auto px-6 md:px-12 pb-12 md:pb-20">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } } }}
                            className="max-w-3xl"
                        >
                            <motion.div
                                variants={fadeUp}
                                className="flex items-center gap-3 md:gap-4 text-white md:text-white/80 text-[13px] md:text-xs uppercase font-semibold md:font-normal tracking-[0.2em] md:tracking-[0.35em] mb-5 md:mb-8 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]"
                            >
                                <span className="h-px w-6 md:w-10 shrink-0 bg-white/70 md:bg-white/50" />
                                Kannamundayil Residency · {hotel.name}
                            </motion.div>

                            <motion.h1
                                variants={fadeUp}
                                className="font-serif font-light text-white text-5xl sm:text-6xl md:text-8xl leading-[1.02] tracking-tight"
                            >
                                A quiet haven
                                <br />
                                <span className="italic text-white/85">in {hotel.name}.</span>
                            </motion.h1>

                            <motion.p
                                variants={fadeUp}
                                className="mt-6 md:mt-8 max-w-md text-white/80 text-base md:text-lg font-light leading-relaxed"
                            >
                                Kerala&apos;s warmth, thoughtful comfort and a calm place to rest, in the heart of {hotel.location}.
                            </motion.p>

                            <motion.div variants={fadeUp} className="mt-8 md:mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                                <Link
                                    href={`${hotel.basePath}/bookings`}
                                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-ink text-sm font-medium tracking-wide hover:bg-primary hover:text-white transition-colors duration-300"
                                >
                                    Book your stay
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href={`${hotel.basePath}/amenities`}
                                    className="group inline-flex items-center justify-center sm:justify-start gap-2 text-white/85 text-sm tracking-wide hover:text-white transition-colors"
                                >
                                    <span className="border-b border-white/30 group-hover:border-white pb-0.5 transition-colors">Explore amenities</span>
                                </Link>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 1 }}
                            className="hidden md:flex absolute right-12 bottom-20 flex-col items-end gap-4 text-white/60 text-xs tracking-[0.25em] uppercase"
                        >
                            <span className="flex items-center gap-2">
                                <MapPin className="w-3.5 h-3.5" />
                                {hotel.location}
                            </span>
                            <span className="flex flex-col items-center gap-3">
                                Scroll
                                <span className="relative block h-12 w-px overflow-hidden bg-white/20">
                                    <motion.span
                                        animate={{ y: ["100%", "-100%"] }}
                                        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                                        className="absolute inset-x-0 top-0 h-full bg-white/80"
                                    />
                                </span>
                            </span>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* ───── ABOUT STRIP ───── */}
            <section className="bg-white text-ink py-32 relative overflow-hidden">
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
                                <Image src={hotel.aboutImage} alt={`${hotel.fullName} facade`} fill className="object-cover shadow-2xl" sizes="50vw" />
                            </motion.div>
                        </div>

                        <RevealGroup>
                            <motion.p variants={fadeUp} className="text-gray-600 font-medium tracking-[0.25em] uppercase text-xs mb-3">Discover the {hotel.name} Residency</motion.p>
                            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-serif mb-6 text-ink leading-tight">
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
            <section className="bg-maroon-light py-24 md:py-32 border-t border-cream-deep overflow-hidden">
                <div className="container px-6 mx-auto max-w-7xl">
                    <AmenitiesShowcase amenities={amenities} href={`${hotel.basePath}/amenities`} />
                </div>
            </section>

            {/* ───── PORTAL SHOWCASE ───── */}
            <section className="bg-white py-32 border-t border-cream-deep overflow-hidden">
                <div className="container px-6 mx-auto max-w-[1400px]">
                    <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-16 gap-8">
                        <RevealGroup className="max-w-xl">
                            <Reveal variants={fadeUp}>
                                <p className="text-[#4b6b80] uppercase tracking-[0.2em] text-[12px] font-bold mb-4">
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
                                    className="text-4xl lg:text-5xl font-serif text-ink leading-tight"
                                >
                                    Explore the Residency Experience
                                </motion.h2>
                            </div>

                            <Reveal variants={lineWipe} delay={0.4}>
                                <div className="h-[2px] w-16 bg-[#8B3A4A]" />
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
                            {/* Next card peeking behind — visible during drag */}
                            <div className="absolute inset-0 z-0 scale-[0.93] opacity-60 rounded-3xl overflow-hidden">
                                <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10">
                                    <Image
                                        src={portalItems[(activePortalIndex + 1) % portalItems.length].img}
                                        alt="next"
                                        fill
                                        className="object-cover pointer-events-none"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-95" />
                                </div>
                            </div>

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

                        <p className="text-center text-[12px] text-gray-500 uppercase tracking-widest mt-4">
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
                                    <span className={`text-[12px] tracking-[0.3em] uppercase font-bold mb-3 inline-block transition-all duration-500 bg-primary text-white px-3 py-1 rounded-sm shadow-xl border border-white/10 lg:opacity-0 lg:group-hover:opacity-100 lg:bg-transparent lg:text-primary lg:border-none lg:shadow-none lg:px-0 lg:py-0 lg:group-hover:bg-primary lg:group-hover:text-white lg:group-hover:px-3 lg:group-hover:py-1 lg:group-hover:rounded-sm lg:group-hover:shadow-xl lg:group-hover:border lg:group-hover:border-white/10`}>
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
