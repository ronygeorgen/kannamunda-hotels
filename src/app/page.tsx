"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue } from "framer-motion";
import { Wifi, ShieldCheck, Car, Wind, ArrowRight, ArrowLeft, RotateCcw, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const brands = [
  { name: "Residency", styles: "bg-white text-gray-900 border-white/20" },
  { name: "Finance", styles: "bg-amber-600 text-white border-amber-400/30" },
  { name: "Bakery", styles: "bg-orange-600 text-white border-orange-400/30" },
];

const portalItems = [
  {
    title: "Premium Amenities",
    desc: "Experience unmatched luxury with our curated services designed for your ultimate comfort.",
    img: "/amenities/amenities-1.webp",
    link: "/amenities",
    tag: "Signatures"
  },
  {
    title: "Business Projects",
    desc: "Exploring our diverse ventures from construction to hospitality across Kerala.",
    img: "/projects/projects-1.webp",
    link: "/projects",
    tag: "Ventures"
  },
  {
    title: "Our Locations",
    desc: "Discover our beautiful properties nestled in the heart of Erattupetta and Poonjar.",
    img: "/destination/kannamunda-main-building.webp",
    link: "/destination",
    tag: "Destinations"
  },
  {
    title: "Local Attractions",
    desc: "Hidden gems and iconic landmarks just steps away from our residency.",
    img: "/nearby-attractions/location3.webp",
    link: "/nearby-attractions",
    tag: "Nearby"
  },
  {
    title: "Captured Moments",
    desc: "A visual journey through our architecture, ambiance, and the smiles of our guests.",
    img: "/gallery/interior-room-image-edited.webp",
    link: "/gallery",
    tag: "Gallery"
  },
  {
    title: "Reach Out to Us",
    desc: "We are always here to assist you. Plan your stay or send us an inquiry.",
    img: "/contact/contact-us.webp",
    link: "/contact",
    tag: "Inquiry"
  }
];

const SwipeCard = ({ item, onSwipe }: { item: any, onSwipe: (dir: 'left' | 'right') => void }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  // Dynamic feedback for the user while dragging
  const nextOpacity = useTransform(x, [-100, -50], [1, 0]);
  const visitOpacity = useTransform(x, [50, 100], [0, 1]);
  const nextScale = useTransform(x, [-150, -50], [1.2, 0.8]);
  const visitScale = useTransform(x, [50, 150], [0.8, 1.2]);

  return (
    <motion.div
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(e, info) => {
        if (info.offset.x > 100) onSwipe('right');
        else if (info.offset.x < -100) onSwipe('left');
      }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{
        x: x.get() < 0 ? -500 : 500,
        opacity: 0,
        scale: 0.5,
        transition: { duration: 0.3 }
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

        {/* Swipe Indicators (Bumble Style) */}
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
          <span className="text-primary text-[10px] tracking-widest uppercase font-bold mb-3 block">
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

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);
  const opac = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [brandIndex, setBrandIndex] = useState(0);
  const [activePortalIndex, setActivePortalIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBrandIndex((prev) => (prev + 1) % brands.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-white">
      {/* ───── HERO ───── */}
      <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          {/* Desktop Overlay Image */}
          <div className="hidden md:block absolute inset-0">
            <Image
              src="/home/home-hero-section-landscape.webp"
              alt="Kannamundayil Residency - Desktop View"
              fill className="object-cover object-right-bottom"
              priority
            />
          </div>
          {/* Mobile Overlay Image */}
          <div className="block md:hidden absolute inset-0">
            <Image
              src="/destination/kannamunda-main-building.webp"
              alt="Kannamundayil Residency - Mobile View"
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
              Kannamundayil
            </span>
            <div className="relative h-7 md:h-8 min-w-[120px] md:min-w-[150px] overflow-hidden inline-flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={brands[brandIndex].name}
                  initial={{ y: 20, opacity: 0, rotateX: -45 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  exit={{ y: -20, opacity: 0, rotateX: 45 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`px-3 py-1 rounded-sm shadow-xl font-bold font-serif border brightness-110 whitespace-nowrap ${brands[brandIndex].styles} flex items-center h-full`}
                >
                  {brands[brandIndex].name}
                </motion.span>
              </AnimatePresence>
            </div>
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

          <motion.div variants={lineWipe} initial="hidden" whileInView="visible" viewport={{ once: false }} className="h-[3px] w-32 bg-primary mt-6 md:mb-2 mb-6 drop-shadow-md" />

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-white drop-shadow-md text-lg md:text-xl max-w-2xl mb-8 md:mb-12 font-medium leading-relaxed"
          >
            Nestled in the heart of Erattupetta &amp; Poonjar where Kerala's warmth meets unparalleled comfort.
          </motion.p>

          <motion.div variants={heroCta} initial="hidden" whileInView="visible" viewport={{ once: false }} className="flex flex-col sm:flex-row gap-5">
            <Link href="/bookings">
              <Button size="lg" className="bg-primary hover:bg-white hover:text-primary rounded-none h-14 px-10 text-sm tracking-widest uppercase shadow-2xl transition-all duration-300">
                Book Your Stay
              </Button>
            </Link>
            <Link href="/amenities">
              <Button size="lg" variant="outline" className="rounded-none h-14 px-10 text-sm tracking-widest uppercase border-white/40 hover:bg-white hover:text-black bg-white/10 backdrop-blur-md text-white transition-all duration-300">
                Explore Amenities
              </Button>
            </Link>
          </motion.div>

          {/* Scroll indicator — below buttons */}
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
        {/* big watermark letter */}
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
                <Image src="/home/home-image-2.webp" alt="Luxurious Room Interior" fill className="object-cover shadow-2xl" sizes="50vw" />
              </motion.div>
            </div>

            <RevealGroup>
              <motion.p variants={fadeUp} className="text-primary font-medium tracking-[0.25em] uppercase text-sm mb-3">Discover the Residency</motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-serif mb-6 text-gray-900 leading-tight">
                A Home Away From Home in Kerala
              </motion.h2>
              <motion.div variants={lineWipe} className="h-[2px] w-16 bg-primary mb-8" />
              <motion.p variants={fadeUp} className="text-gray-500 text-lg leading-relaxed font-light mb-5">
                Nestled in the heart of Erattupetta and Poonjar, Kannamundayil Residency is a family-run tourist home that embodies the warmth and hospitality of Kerala.
              </motion.p>
              <motion.p variants={fadeUp} className="text-gray-500 text-lg leading-relaxed font-light mb-12">
                Whether visiting for business or leisure, we offer an environment blending modern convenience with traditional charm.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link href="/about">
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
      {/* ───── AMENITIES (Signatures of Comfort) ───── */}
      <section className="bg-gray-50 py-32 border-t border-gray-100">
        <div className="container px-6 mx-auto max-w-7xl">
          <Reveal className="text-center mb-20">
            <p className="text-primary uppercase tracking-[0.25em] text-sm mb-3">Our Commitments</p>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900">Signatures of Comfort</h2>
            <motion.div
              variants={lineWipe} initial="hidden" whileInView="visible" viewport={{ once: false }}
              className="h-[2px] w-16 bg-primary mx-auto mt-8"
            />
          </Reveal>

          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {amenities.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white p-10 group hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border border-gray-100 border-t-4 border-t-primary/20 hover:border-t-primary flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 bg-primary/8 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/15 transition-colors duration-500">
                  <item.icon className="h-9 w-9 text-primary/60 group-hover:text-primary transition-colors duration-500 stroke-[1.25]" />
                </div>
                <h3 className="text-xl font-serif text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-400 font-light leading-relaxed group-hover:text-gray-600 transition-colors duration-500">{item.desc}</p>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ───── PORTAL SHOWCASE ───── */}
      <section className="bg-white py-32 border-t border-gray-50 overflow-hidden">
        <div className="container px-6 mx-auto max-w-[1400px]">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
            <RevealGroup className="max-w-2xl">
              <Reveal variants={fadeUp}>
                <p className="text-primary uppercase tracking-[0.25em] text-sm mb-3">
                  Gateway to Excellence
                </p>
              </Reveal>

              <div className="relative overflow-hidden">
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
                  className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight"
                >
                  Explore the Residency Experience
                </motion.h2>
              </div>

              <Reveal variants={lineWipe} delay={0.4}>
                <div className="h-[2px] w-16 bg-primary mt-8" />
              </Reveal>
            </RevealGroup>

            <Reveal variants={fadeUp} delay={0.6} className="hidden lg:block text-right">
              <p className="text-gray-500 font-light max-w-md">
                From world-class amenities to local charms, discover everything that makes your stay at Kannamundayil truly unforgettable.
              </p>
            </Reveal>
          </div>

          {/* Mobile Swipe Deck (Bumble Style) */}
          <div className="md:hidden relative px-4 h-[520px]">
            <div className="relative w-full h-full">
              <AnimatePresence mode="popLayout">
                <SwipeCard
                  key={activePortalIndex}
                  item={portalItems[activePortalIndex]}
                  onSwipe={(dir) => {
                    if (dir === 'left') {
                      setActivePortalIndex((prev) => (prev + 1) % portalItems.length);
                    } else {
                      window.location.href = portalItems[activePortalIndex].link;
                    }
                  }}
                />
              </AnimatePresence>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {portalItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePortalIndex(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-full ${activePortalIndex === idx ? "w-8 bg-primary" : "w-1.5 bg-gray-200"}`}
                />
              ))}
            </div>

            <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest mt-4">
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
                {/* Clip-Reveal Image (like About page) */}
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

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/95 group-hover:via-black/60 transition-all duration-700" />

                {/* Content */}
                <div className="absolute inset-0 p-10 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                  {/* Tag — hero-style badge on hover */}
                  <span className={`text-[10px] tracking-[0.3em] uppercase font-bold mb-3 inline-block transition-all duration-500 ${'opacity-0 group-hover:opacity-100 group-hover:bg-primary group-hover:text-white group-hover:px-3 group-hover:py-1 group-hover:rounded-sm group-hover:shadow-xl group-hover:border group-hover:border-white/10 text-primary'
                    }`}>
                    {item.tag}
                  </span>

                  {/* Title — highlighted on hover */}
                  <h3 className="text-2xl font-serif mb-4 drop-shadow-lg transition-all duration-500 text-white/70 group-hover:text-white group-hover:[text-shadow:_0_2px_16px_rgba(0,0,0,0.9)]">
                    {item.title}
                  </h3>
                  <div className="h-[2px] w-0 bg-primary group-hover:w-12 transition-all duration-700 mb-4" />

                  {/* Description — appears with text highlight background on hover */}
                  <p className="font-light text-sm leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 text-white/90 group-hover:[text-shadow:_0_1px_8px_rgba(0,0,0,0.8)]">
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
