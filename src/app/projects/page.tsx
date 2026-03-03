"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowRight, Building2, Coins, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroTagline, heroTitle, heroTitlePopup, lineWipe } from "@/components/animations";

const projects = [
    {
        title: "Kannamundayil Residency",
        type: "Hospitality",
        icon: Building2,
        image: "/destination/kannamunda-main-building.webp",
        status: "Operating",
        desc: "Our premium family-run tourist homes offering a blend of modern amenities with Kerala's traditional hospitality. Branches in Erattupetta and Poonjar.",
    },
    {
        title: "Kannamundayil Finance",
        type: "Financial Services",
        icon: Coins,
        image: "/gallery/interior-room-image-2-edited.webp",
        status: "Expanding",
        desc: "Starting as a financier, we have grown into a trusted financial institution providing gold loan services across Kottayam district with a legacy of trust.",
    },
    {
        title: "Kannamundayil Bakes",
        type: "Food & Beverage",
        icon: Briefcase,
        image: "/gallery/interior-room-image-edited.webp",
        status: "Operating",
        desc: "Our foray into the culinary world, delivering exceptional baked goods, sweets and savory items—maintaining our commitment to quality.",
    },
];

// ─── Desktop stacked card (absolute inside sticky frame) ─────────────────────
function ProjectCard({
    project,
    idx,
    scrollYProgress,
    totalCards,
}: {
    project: (typeof projects)[0];
    idx: number;
    scrollYProgress: MotionValue<number>;
    totalCards: number;
}) {
    const isLast = idx === totalCards - 1;
    const isEven = idx % 2 === 0;
    const sections = totalCards - 1;
    const sectionSize = 1 / sections;

    const segStart = idx * sectionSize;
    const segEnd = segStart + sectionSize;

    // Diagonal exit
    const x = useTransform(scrollYProgress, [segStart, segEnd], ["0%", isEven ? "130%" : "-130%"]);
    const y = useTransform(scrollYProgress, [segStart, segEnd], ["0%", "30%"]);
    const rotate = useTransform(scrollYProgress, [segStart, segEnd], [0, isEven ? 14 : -14]);
    const opacity = useTransform(scrollYProgress, [segStart + sectionSize * 0.68, segEnd], [1, 0]);

    // Enter scale: card beneath grows as card above exits (simultaneous reveal)
    const prevSegStart = (idx - 1) * sectionSize;
    const scale = useTransform(
        scrollYProgress,
        idx === 0 ? [0, 0.001] : [prevSegStart, idx * sectionSize],
        idx === 0 ? [1, 1] : [0.93, 1.0],
    );

    return (
        <motion.div
            className="absolute inset-0 bg-white flex items-center overflow-hidden"
            style={{
                zIndex: totalCards - idx,
                scale,
                ...(isLast ? {} : { x, y, rotate, opacity }),
            }}
        >
            <div className="absolute bottom-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none z-50" />

            <div className="container px-6 max-w-7xl mx-auto w-full">
                <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-16 lg:gap-24 items-center`}>

                    {/* Image */}
                    <div className="w-full lg:w-1/2 relative h-[420px] md:h-[500px] shadow-2xl overflow-hidden group shrink-0">
                        <motion.div
                            className="absolute inset-0 bg-primary z-10 pointer-events-none origin-left"
                            initial={{ scaleX: 1 }}
                            whileInView={{ scaleX: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        />
                        <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                        <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-sm text-white text-xs tracking-widest uppercase px-3 py-1 border border-white/20">
                            {project.status}
                        </div>
                    </div>

                    {/* Text */}
                    <div className="w-full lg:w-1/2">
                        <div className="flex items-center gap-3 mb-5">
                            <project.icon className="w-6 h-6 text-primary stroke-[1.5]" />
                            <span className="text-primary uppercase tracking-[0.2em] text-xs font-medium">{project.type}</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8 leading-tight">{project.title}</h2>
                        <div className="h-[2px] w-16 bg-primary mb-8" />
                        <p className="text-gray-500 text-xl leading-relaxed font-light mb-12">{project.desc}</p>
                        <Button variant="ghost" className="group/btn px-0 hover:bg-transparent text-gray-900 text-lg rounded-none hover:text-primary pl-1 h-auto pb-2 border-b-2 border-primary/20 hover:border-primary transition-colors">
                            Discover More <ArrowRight className="ml-3 w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const stackRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(heroScroll, [0, 1], ["0%", "50%"]);

    const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });

    const totalCards = projects.length;
    const stackHeight = `${(totalCards - 1) * 200 + 100}vh`;

    return (
        <div className="min-h-screen bg-neutral-950 text-white">

            {/* ── Hero ── */}
            <section ref={heroRef} className="relative h-[65vh] flex items-end overflow-hidden">
                <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
                    <Image src="/projects/projects-1.webp" alt="Portfolio" fill className="object-cover object-bottom" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/50 to-transparent" />
                </motion.div>
                <div className="container relative z-10 px-6 pb-16">
                    <motion.p variants={heroTagline} initial="hidden" animate="visible"
                        className="inline-block bg-primary text-white px-4 py-1.5 rounded-sm uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-6 shadow-xl border border-white/10"
                    >
                        Kannamundayil Group of Companies
                    </motion.p>
                    <div className="overflow-hidden pb-1">
                        <motion.h1 variants={heroTitlePopup} initial="hidden" animate="visible" className="text-5xl md:text-8xl font-serif leading-none text-white">
                            Our Portfolio
                        </motion.h1>
                    </div>
                    <motion.div variants={lineWipe} initial="hidden" animate="visible" className="h-[3px] w-40 bg-primary mt-2" />
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════
          MOBILE  (< lg) — simple flowing list, no sticky animation
          ════════════════════════════════════════════════════════════════ */}
            <div className="lg:hidden bg-white divide-y divide-gray-100">
                {projects.map((project, idx) => (
                    <div key={idx} className="py-16 px-6">
                        {/* Image */}
                        <div className="relative w-full h-64 shadow-xl overflow-hidden mb-10 rounded-sm">
                            <motion.div
                                className="absolute inset-0 bg-primary z-10 pointer-events-none origin-left"
                                initial={{ scaleX: 1 }}
                                whileInView={{ scaleX: 0 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                            />
                            <Image src={project.image} alt={project.title} fill className="object-cover" />
                            <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-sm text-white text-xs tracking-widest uppercase px-2 py-1 border border-white/20">
                                {project.status}
                            </div>
                        </div>

                        {/* Text */}
                        <div className="flex items-center gap-3 mb-4">
                            <project.icon className="w-5 h-5 text-primary stroke-[1.5]" />
                            <span className="text-primary uppercase tracking-[0.2em] text-xs font-medium">{project.type}</span>
                        </div>
                        <h2 className="text-3xl font-serif text-gray-900 mb-5 leading-tight">{project.title}</h2>
                        <div className="h-[2px] w-12 bg-primary mb-5" />
                        <p className="text-gray-500 text-base leading-relaxed font-light mb-8">{project.desc}</p>
                        <Button variant="ghost" className="group/btn px-0 hover:bg-transparent text-gray-900 rounded-none hover:text-primary h-auto pb-2 border-b-2 border-primary/20 hover:border-primary transition-colors">
                            Discover More <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                        </Button>
                    </div>
                ))}
            </div>

            {/* ════════════════════════════════════════════════════════════════
          DESKTOP (≥ lg) — scroll-driven sticky card stack
          ════════════════════════════════════════════════════════════════ */}
            <div
                ref={stackRef}
                style={{ height: stackHeight }}
                className="relative bg-white hidden lg:block"
            >
                <div className="sticky top-0 h-screen overflow-hidden">
                    {projects.map((project, idx) => (
                        <ProjectCard
                            key={idx}
                            project={project}
                            idx={idx}
                            scrollYProgress={scrollYProgress}
                            totalCards={totalCards}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
}
