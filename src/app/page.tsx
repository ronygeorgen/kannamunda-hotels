"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
} from "framer-motion";
import { ArrowRight, Building2, Landmark, UtensilsCrossed, ChevronDown, MapPin } from "lucide-react";

// ──────────────────────────────────────────────────────────────────
//  Data
// ──────────────────────────────────────────────────────────────────
const businesses = [
  {
    id: "hotels",
    label: "Hotels",
    icon: Building2,
    tagline: "Luxury Stays in Kerala's Heart",
    description:
      "Experience unparalleled hospitality at Kannamundayil Residency. Two iconic properties — Erattupetta & Poonjar — each offering warmth, comfort, and the spirit of Kerala.",
    accentColor: "#6a1224",
    bgGradient: "from-[#3a0a14] via-[#6a1224]/80 to-black/60",
    borderColor: "border-[#6a1224]",
    badgeStyle: "bg-[#6a1224] text-white",
    children: [
      {
        name: "Erattupetta",
        subtitle: "Kannamundayil Residency",
        link: "/erattupetta-hotel",
        img: "/erattupetta-home/home-hero-section-landscape.webp",
        location: "Erattupetta, Kottayam",
      },
      {
        name: "Poonjar",
        subtitle: "Kannamundayil Residency",
        link: "/poonjar-hotel",
        img: "/poonjar-home/poonjar-kannamunda-edited.webp",
        location: "Poonjar, Kottayam",
      },
    ],
  },
  {
    id: "finance",
    label: "Gold Loan",
    icon: Landmark,
    tagline: "Trusted Gold Loan & Financial Services",
    description:
      "Kannamundayil Gold Loan offers reliable gold loan services and financial solutions built on decades of trust across Kottayam district.",
    accentColor: "#b8860b",
    bgGradient: "from-[#3d2f00] via-[#b8860b]/60 to-black/60",
    borderColor: "border-amber-600",
    badgeStyle: "bg-amber-600 text-white",
    link: "/finance",
    img: "/landing-page/Finance/Finance-gold-demo.webp",
    children: null,
  },
  {
    id: "bakery",
    label: "Bakery",
    icon: UtensilsCrossed,
    tagline: "Fresh Bakes, Every Day",
    description:
      "Kannamundayil Bakes offers a delightful range of shakes, fresh juices, faloodas, ice creams, and savoury snacks crafted with love — a local favourite.",
    accentColor: "#c05a2d",
    bgGradient: "from-[#3d1500] via-[#c05a2d]/60 to-black/60",
    borderColor: "border-orange-600",
    badgeStyle: "bg-orange-600 text-white",
    link: "/bakery",
    img: "/landing-page/Bakery/Bakery-demo.webp",
    children: null,
  },
];

// ──────────────────────────────────────────────────────────────────
//  Sub-components
// ──────────────────────────────────────────────────────────────────

/** Animated counter */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (timestamp: number, startTime: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame((ts) => step(ts, startTime));
    };
    requestAnimationFrame((ts) => step(ts, ts));
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/** Single hotel card inside Hotels section */
function HotelCard({ child, i }: { child: NonNullable<(typeof businesses)[0]["children"]>[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 }}
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
    >
      <Link href={child.link} className="block h-full">
        {/* Image */}
        <div className="relative h-[460px] md:h-[580px] overflow-hidden">
          <Image
            src={child.img}
            alt={child.name}
            fill
            className="object-cover transition-transform duration-[1200ms] group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 group-hover:from-black/90 transition-all duration-700" />

          {/* Corner flourish */}
          <div className="absolute top-5 right-5 w-12 h-12 border-t-2 border-r-2 border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" />
          <div className="absolute bottom-5 left-5 w-12 h-12 border-b-2 border-l-2 border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" />

          {/* Location badge */}
          <div className="absolute top-5 left-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
              className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10"
            >
              <MapPin size={12} className="text-[#6a1224]" />
              <span className="text-white/80 text-[10px] tracking-[0.2em] uppercase">{child.location}</span>
            </motion.div>
          </div>

          {/* Content */}
          <div className="absolute inset-x-0 bottom-0 p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <p className="inline-block bg-[#6a1224] text-white text-[9px] tracking-[0.25em] uppercase font-bold mb-4 px-3 py-1 rounded-sm shadow-xl border border-white/10">
              {child.subtitle}
            </p>
            <h3 className="text-white text-4xl md:text-5xl font-serif mb-3 drop-shadow-lg">
              {child.name}
            </h3>
            <div className="h-[2px] w-0 bg-[#6a1224] group-hover:w-16 transition-all duration-700 mb-4" />
            <motion.div
              className="flex items-center gap-2 text-white/0 group-hover:text-white/80 transition-all duration-500 text-sm tracking-widest uppercase"
            >
              <span>Enter</span>
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/** Business section card (Finance / Bakery) */
function BusinessCard({
  biz,
  index,
}: {
  biz: (typeof businesses)[1];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = biz.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: index * 0.2 }}
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
    >
      <Link href={biz.link!} className="block h-full">
        <div className="relative h-[420px] md:h-[540px] overflow-hidden">
          <Image
            src={biz.img!}
            alt={biz.label}
            fill
            className="object-cover transition-transform duration-[1200ms] group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${biz.bgGradient} opacity-90 group-hover:opacity-95 transition-all duration-700`} />

          {/* Decorative grid lines */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700"
            style={{
              backgroundImage: `linear-gradient(${biz.accentColor} 1px, transparent 1px), linear-gradient(90deg, ${biz.accentColor} 1px, transparent 1px)`,
              backgroundSize: "40px 40px"
            }}
          />

          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
            {/* Top */}
            <div className="flex items-center justify-between">
              <span
                className={`text-[10px] tracking-[0.3em] uppercase font-bold px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-sm ${biz.badgeStyle}`}
              >
                {biz.label}
              </span>
              <div
                className="w-12 h-12 rounded-full border border-white/20 backdrop-blur-sm flex items-center justify-center group-hover:border-white/60 transition-colors duration-500"
                style={{ backgroundColor: `${biz.accentColor}30` }}
              >
                <Icon size={20} className="text-white" />
              </div>
            </div>

            {/* Bottom */}
            <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-white/60 text-xs tracking-[0.25em] uppercase mb-3">{biz.tagline}</p>
              <h3 className="text-white text-4xl md:text-5xl font-serif mb-4 drop-shadow-lg">
                Kannamundayil<br />
                <em className="not-italic" style={{ color: biz.accentColor === "#b8860b" ? "#f5d47a" : biz.accentColor === "#c05a2d" ? "#ffb085" : biz.accentColor }}>
                  {biz.label}
                </em>
              </h3>
              <div
                className="h-[2px] w-0 group-hover:w-16 transition-all duration-700 mb-5"
                style={{ backgroundColor: biz.accentColor }}
              />
              <p className="text-white/70 font-light text-sm leading-relaxed max-w-sm opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                {biz.description}
              </p>
              <div className="flex items-center gap-2 text-white/80 mt-6 text-sm tracking-widest uppercase">
                <span>Explore</span>
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────────
//  Main Page
// ──────────────────────────────────────────────────────────────────
export default function GroupLandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [activeHero, setActiveHero] = useState(0);
  const [showHotelOptions, setShowHotelOptions] = useState(false);

  /** Auto-cycle hero background among demos */
  const heroBgs = [
    "/erattupetta-home/home-hero-section-landscape.webp",
    "/poonjar-home/poonjar-kannamunda-edited.webp",
    "/landing-page/Finance/Finance-gold-demo.webp",
    "/landing-page/Bakery/Bakery-demo.webp",
  ];

  useEffect(() => {
    const t = setInterval(() => setActiveHero((p) => (p + 1) % heroBgs.length), 5000);

    // Close dropdown on click outside
    const handleClickOutside = () => setShowHotelOptions(false);
    window.addEventListener("click", handleClickOutside);

    return () => {
      clearInterval(t);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-white overflow-x-hidden">
      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Animated background slideshow */}
        <AnimatePresence mode="sync">
          <motion.div
            key={activeHero}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-0"
          >
            <motion.div style={{ y: heroY }} className="absolute inset-0">
              <Image
                src={heroBgs[activeHero]}
                alt="Kannamundayil Group"
                fill
                className="object-cover object-center"
                priority
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Multi-layer overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/40 to-neutral-950" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/50 to-transparent" />

        {/* Animated grain texture */}
        <div
          className="absolute inset-0 z-[2] opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 flex flex-col items-center text-center px-6 max-w-6xl mx-auto pt-20"
        >
          {/* Pre-title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6"
          >
            <div className="h-px w-8 md:w-12 bg-white/30" />
            <span className="text-white/70 text-[9px] md:text-[11px] tracking-[0.3em] md:tracking-[0.5em] uppercase font-bold text-nowrap">
              Welcome to the
            </span>
            <div className="h-px w-8 md:w-12 bg-white/30" />
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-montserrat font-black uppercase text-white leading-tight md:leading-[0.85] mb-4 md:mb-6 drop-shadow-2xl tracking-tighter"
          >
            Kannamundayil
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "3rem" }}
            transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="h-[2px] md:h-[3px] bg-[#6a1224] mb-4 md:mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-white/60 text-xs md:text-lg tracking-[0.3em] md:tracking-[0.8em] uppercase font-medium max-w-2xl leading-relaxed mb-10 md:mb-14"
          >
            Group of Companies
          </motion.p>

          {/* Pill badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10 md:mb-14"
          >
            {[
              { label: "Hotels", color: "bg-[#6a1224]" },
              { label: "Gold Loan", color: "bg-amber-700" },
              { label: "Bakery", color: "bg-orange-700" },
            ].map((b) => (
              <span
                key={b.label}
                className={`${b.color} text-white text-[8px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase font-bold px-3 md:px-5 py-1.5 md:py-2 rounded-full border border-white/10 shadow-lg`}
              >
                {b.label}
              </span>
            ))}
          </motion.div>

          {/* Slideshow dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex gap-2"
          >
            {heroBgs.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveHero(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${activeHero === i ? "w-8 bg-white" : "w-1.5 bg-white/30"
                  }`}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">Discover</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            <ChevronDown size={24} className="text-white/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════
          STATS STRIP
      ══════════════════════════════ */}
      <section className="bg-[#3a0a14] py-16 border-y border-white/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 25, suffix: "+", label: "Years of Legacy" },
              { value: 2, suffix: "", label: "Hotel Properties" },
              { value: 1000, suffix: "+", label: "Happy Guests" },
              { value: 3, suffix: "", label: "Business Verticals" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <p className="text-4xl md:text-5xl font-serif text-white mb-2">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-white/40 text-xs tracking-[0.2em] uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          HOTELS SECTION
      ══════════════════════════════ */}
      <section className="py-24 md:py-36 bg-neutral-950">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Section header */}
          <div className="mb-14 md:mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-4 mb-5"
            >
              <div className="w-10 h-10 rounded-xl bg-[#6a1224]/20 border border-[#6a1224]/30 flex items-center justify-center">
                <Building2 size={18} className="text-[#6a1224]" />
              </div>
              <span className="text-white/40 text-xs tracking-[0.35em] uppercase">Our Properties</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-6xl font-serif text-white leading-tight mb-4"
            >
              Kannamundayil Hotels
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-[2px] bg-[#6a1224] mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-white/50 text-lg font-light max-w-xl"
            >
              Choose your destination — two exceptional properties across Kerala's most scenic regions.
            </motion.p>
          </div>

          {/* Two hotel cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {businesses[0].children!.map((child, i) => (
              <HotelCard key={child.name} child={child} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          FINANCE + BAKERY SECTION
      ══════════════════════════════ */}
      <section className="py-24 md:py-36 bg-[#0d0d0d]">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-14 md:mb-20"
          >
            <p className="text-white/30 text-xs tracking-[0.35em] uppercase mb-4">More From Us</p>
            <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-4">
              Our Other Ventures
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-[2px] bg-amber-600 mb-6"
            />
            <p className="text-white/40 font-light max-w-xl text-lg">
              Beyond hospitality — financial services and artisan baking that serve our community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {businesses.slice(1).map((biz, i) => (
              <BusinessCard key={biz.id} biz={biz as any} index={i} />
            ))}
          </div>
        </div>
      </section>



      {/* ══════════════════════════════
          CTA FOOTER STRIP
      ══════════════════════════════ */}
      <section className="bg-[#3a0a14] py-24">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-white/40 text-xs tracking-[0.35em] uppercase mb-4">Plan Your Visit</p>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
              Ready to Experience Kannamundayil?
            </h2>
            <div className="h-[2px] w-16 bg-white/30 mx-auto mb-8" />
            <p className="text-white/60 text-lg font-light mb-12 max-w-xl mx-auto">
              Whether you're looking for a luxurious stay, financial services, or fresh bakes — we're here for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="relative w-full sm:w-auto" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setShowHotelOptions(!showHotelOptions)}
                  className="w-full inline-flex items-center justify-center gap-3 bg-white text-[#3a0a14] px-10 py-5 text-sm tracking-widest uppercase font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl relative z-10"
                >
                  <Building2 size={18} />
                  View Hotels
                  <ChevronDown size={18} className={`transition-transform duration-500 ease-out ${showHotelOptions ? 'rotate-180 text-primary' : 'text-[#3a0a14]/40'}`} />
                </button>

                <AnimatePresence>
                  {showHotelOptions && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute bottom-[calc(100%+12px)] left-0 right-0 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-sm overflow-hidden z-20 flex flex-col min-w-[240px] border border-white/10"
                    >
                      <div className="p-3 bg-gray-50/50 border-b border-gray-100">
                        <p className="text-[10px] tracking-[0.2em] font-bold text-gray-400 uppercase text-center">Select Destination</p>
                      </div>
                      <Link
                        href="/erattupetta-hotel"
                        className="px-8 py-5 text-xs tracking-[0.25em] uppercase font-bold text-[#3a0a14] hover:bg-[#3a0a14] hover:text-white transition-all duration-300 flex items-center justify-between group"
                      >
                        Erattupetta
                        <ArrowRight size={14} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </Link>
                      <Link
                        href="/poonjar-hotel"
                        className="px-8 py-5 text-xs tracking-[0.25em] uppercase font-bold text-[#3a0a14] hover:bg-[#3a0a14] hover:text-white transition-all duration-300 flex items-center justify-between group"
                      >
                        Poonjar
                        <ArrowRight size={14} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/30 text-white px-10 py-5 text-sm tracking-widest uppercase font-medium hover:bg-white/10 transition-colors duration-300"
              >
                Contact Us
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
