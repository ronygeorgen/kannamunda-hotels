"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize, ZoomIn, ZoomOut, Minimize } from "lucide-react";
import {
    galleryContainer,
    galleryItem,
    heroTagline,
    heroTitle,
    heroTitlePopup,
    clipReveal,
    lineWipe,
} from "@/components/animations";
import { PageCTA } from "@/components/PageCTA";

const galleryImages = [
    { src: "/gallery/interior-room-image-edited.webp", alt: "Luxurious Room Interior", span: "lg:col-span-2" },
    { src: "/gallery/interior-room-image-7.webp", alt: "Grand Reception & Lobby", span: "row-span-2" },
    { src: "/gallery/interior-room-image-6.webp", alt: "Premium Executive Suite", span: "" },
    { src: "/gallery/interior-room-image-2-edited.webp", alt: "Relaxation & Lounge Area", span: "" },
    { src: "/gallery/poonjar-kannamunda-edited.webp", alt: "Building - Poonjar", span: "row-span-2" },
    { src: "/destination/kannamunda-main-building.webp", alt: "Main Building – Erattupetta", span: "" },
    { src: "/gallery/interior-room-image-4.webp", alt: "Modern Suite Comfort", span: "" },
    { src: "/gallery/interior-room-image-8.webp", alt: "Exclusive Guest Lounge", span: "" },
    { src: "/gallery/interior-room-image-5.webp", alt: "Elegant Bedding & Decor", span: "" },
    { src: "/gallery/interior-room-image-3.webp", alt: "Sophisticated Guest Suites", span: "lg:col-start-2" },
];

export default function GalleryPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);

    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [zoom, setZoom] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const nextImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
            setZoom(1);
        }
    }, [lightboxIndex]);

    const prevImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length);
            setZoom(1);
        }
    }, [lightboxIndex]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "Escape") closeLightbox();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [lightboxIndex, nextImage, prevImage]);

    const closeLightbox = () => {
        setLightboxIndex(null);
        setZoom(1);
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        setIsFullscreen(false);
    };

    const toggleFullscreen = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const handleZoomIn = (e: React.MouseEvent) => {
        e.stopPropagation();
        setZoom(prev => Math.min(prev + 0.5, 3));
    };

    const handleZoomOut = (e: React.MouseEvent) => {
        e.stopPropagation();
        setZoom(prev => Math.max(prev - 0.5, 1));
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {/* ── Parallax Hero ── */}
            <section ref={containerRef} className="relative h-[70vh] flex items-end overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-0 w-full h-full z-0">
                    <Image src="/gallery/interior-room-image-edited.webp" alt="Gallery hero" fill className="object-cover" style={{ objectPosition: "center 80%" }} priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/50 to-transparent" />
                </motion.div>

                <div className="container relative z-10 px-6 pb-16 text-left">
                    <motion.p
                        variants={heroTagline}
                        initial="hidden"
                        animate="visible"
                        className="inline-block bg-primary text-white px-4 py-1.5 rounded-sm uppercase tracking-[0.35em] text-[10px] md:text-xs font-bold mb-6 shadow-xl border border-white/10"
                    >
                        A Visual Journey
                    </motion.p>
                    <div className="overflow-hidden pb-1">
                        <motion.h1
                            variants={heroTitlePopup}
                            initial="hidden"
                            animate="visible"
                            className="text-5xl md:text-8xl font-serif leading-none text-white"
                        >
                            Image Gallery
                        </motion.h1>
                    </div>
                    <motion.div variants={lineWipe} initial="hidden" animate="visible" className="h-[3px] w-40 bg-primary mt-2" />
                </div>
            </section>

            {/* ── Gallery Grid ── */}
            <section className="py-20 bg-gray-50">
                <div className="container px-4 max-w-7xl mx-auto">
                    <motion.div
                        variants={galleryContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[280px] gap-4"
                    >
                        {galleryImages.map((img, idx) => (
                            <motion.div
                                key={idx}
                                variants={galleryItem}
                                className={`relative overflow-hidden group cursor-pointer ${img.span}`}
                                onClick={() => setLightboxIndex(idx)}
                            >
                                {/* Clip-reveal overlay */}
                                <motion.div
                                    className="absolute inset-0 bg-primary z-10 pointer-events-none origin-top"
                                    initial={{ scaleY: 1 }}
                                    whileInView={{ scaleY: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                />

                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-75"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />

                                {/* Caption slide-up on hover */}
                                <div className="absolute inset-0 flex flex-col justify-end p-6 pointer-events-none">
                                    <div className="overflow-hidden">
                                        <motion.div
                                            className="translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                                        >
                                            <div className="h-[2px] w-10 bg-primary mb-3" />
                                            <h3 className="text-white font-serif text-xl tracking-wide">{img.alt}</h3>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Corner accent */}
                                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Lightbox ── */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl"
                        onClick={closeLightbox}
                    >
                        {/* Toolbar */}
                        <div className="absolute top-0 inset-x-0 h-16 flex items-center justify-between px-6 z-[120] bg-black/40 backdrop-blur-sm">
                            <div className="text-white/80 font-medium text-sm tracking-widest uppercase">
                                {lightboxIndex + 1} <span className="mx-1">/</span> {galleryImages.length}
                            </div>

                            <div className="flex items-center gap-4">
                                <button onClick={handleZoomOut} className="p-2 text-white/70 hover:text-white transition-colors" title="Zoom Out">
                                    <ZoomOut size={20} />
                                </button>
                                <button onClick={handleZoomIn} className="p-2 text-white/70 hover:text-white transition-colors" title="Zoom In">
                                    <ZoomIn size={20} />
                                </button>
                                <button onClick={toggleFullscreen} className="p-2 text-white/70 hover:text-white transition-colors" title="Toggle Fullscreen">
                                    {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                                </button>
                                <button onClick={closeLightbox} className="p-2 text-white/70 hover:text-white transition-colors ml-2" title="Close">
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            className="absolute left-6 top-1/2 -translate-y-1/2 z-[110] p-4 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-all"
                            onClick={prevImage}
                        >
                            <ChevronLeft size={48} strokeWidth={1} />
                        </button>
                        <button
                            className="absolute right-6 top-1/2 -translate-y-1/2 z-[110] p-4 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-all"
                            onClick={nextImage}
                        >
                            <ChevronRight size={48} strokeWidth={1} />
                        </button>

                        {/* Click Zones for Navigation */}
                        <div className="absolute inset-x-0 inset-y-16 flex z-[105]">
                            <div className="w-1/2 h-full cursor-w-resize" onClick={prevImage} />
                            <div className="w-1/2 h-full cursor-e-resize" onClick={nextImage} />
                        </div>

                        {/* Main Image Container */}
                        <div className="relative w-full h-[calc(100vh-128px)] flex items-center justify-center p-4">
                            <motion.div
                                key={lightboxIndex}
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: zoom, y: 0 }}
                                exit={{ opacity: 0, scale: 1.05, y: -10 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="relative w-full h-full flex items-center justify-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="relative w-full h-full max-w-6xl max-h-5xl">
                                    <Image
                                        src={galleryImages[lightboxIndex].src}
                                        alt={galleryImages[lightboxIndex].alt}
                                        fill
                                        className="object-contain"
                                        quality={100}
                                    />
                                </div>
                            </motion.div>
                        </div>

                        {/* Caption */}
                        <div className="absolute bottom-4 inset-x-0 text-center z-[110]">
                            <p className="text-white/90 font-serif text-lg md:text-xl tracking-wide drop-shadow-lg">
                                {galleryImages[lightboxIndex].alt}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <PageCTA />
        </div>
    );
}
