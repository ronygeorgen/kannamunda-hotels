"use client";
import { useHotel } from "@/lib/hotelContext";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Check, ChevronDown, ListFilter, X } from "lucide-react";
import {
    galleryContainer,
    galleryItem,
    heroTagline,
    heroTitlePopup,
    lineWipe,
} from "@/components/animations";
import { PageCTA } from "@/components/PageCTA";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { QuickBookingModal } from "@/components/QuickBookingModal";
import { cn } from "@/lib/utils";
import {
    getGallerySections,
    flattenGalleryImages,
    categoryToSlug,
    galleryReturnKey,
    type GalleryImage,
    type RoomCategory,
} from "@/lib/galleryData";

const INITIAL_VISIBLE = 4;

export default function GalleryPage() {
    const hotel = useHotel();
    const router = useRouter();
    const containerRef = useRef(null);
    const filterRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);

    const sections = useMemo(() => getGallerySections(hotel.id), [hotel.id]);
    const allImages = useMemo(() => flattenGalleryImages(sections), [sections]);
    const spaceSections = useMemo(
        () => sections.filter((s) => !s.images.some((i) => i.category)),
        [sections]
    );
    const roomSections = useMemo(
        () => sections.filter((s) => s.images.some((i) => i.category)),
        [sections]
    );

    const [activeSection, setActiveSection] = useState<string>("all");
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [filterOpen, setFilterOpen] = useState(false);
    const [bookingRoom, setBookingRoom] = useState<Exclude<RoomCategory, null> | null>(null);
    const [expandedSections, setExpandedSections] = useState<string[]>([]);

    const toggleSection = (id: string) => {
        if (expandedSections.includes(id)) {
            setExpandedSections((prev) => prev.filter((s) => s !== id));
            requestAnimationFrame(() => {
                const el = document.getElementById(`gallery-section-${id}`);
                if (!el) return;
                const top = el.getBoundingClientRect().top + window.scrollY - 88;
                window.scrollTo({ top, behavior: "smooth" });
            });
        } else {
            setExpandedSections((prev) => [...prev, id]);
        }
    };

    const activeLabel =
        activeSection === "all"
            ? "All"
            : sections.find((s) => s.id === activeSection)?.label ?? "Gallery";

    const selectSection = (id: string) => {
        setActiveSection(id);
        setFilterOpen(false);
        requestAnimationFrame(() => {
            const grid = gridRef.current;
            if (!grid) return;
            const navOffset = 88;
            const top = grid.getBoundingClientRect().top + window.scrollY - navOffset;
            window.scrollTo({ top, behavior: "smooth" });
        });
    };

    useEffect(() => {
        if (!filterOpen) return;
        const onPointerDown = (e: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
                setFilterOpen(false);
            }
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setFilterOpen(false);
        };
        document.addEventListener("mousedown", onPointerDown);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onPointerDown);
            document.removeEventListener("keydown", onKey);
        };
    }, [filterOpen]);

    useEffect(() => {
        setFilterOpen(false);
    }, [hotel.id]);

    const visibleImages: GalleryImage[] = useMemo(() => {
        if (activeSection === "all") return allImages;
        return sections.find((s) => s.id === activeSection)?.images ?? [];
    }, [activeSection, allImages, sections]);

    const storageKey = galleryReturnKey(hotel.id);

    const handleImageClick = (img: GalleryImage) => {
        if (img.category) {
            try {
                sessionStorage.setItem(
                    storageKey,
                    JSON.stringify({
                        section: activeSection,
                        scrollY: window.scrollY,
                        expanded: expandedSections,
                    })
                );
            } catch {
                /* ignore */
            }
            router.push(
                `${hotel.basePath}/gallery/${categoryToSlug(img.category)}?photo=${encodeURIComponent(img.src)}`
            );
            return;
        }
        const idx = visibleImages.findIndex((i) => i.src === img.src);
        setLightboxIndex(idx >= 0 ? idx : 0);
    };

    // Restore filter + scroll when returning from a room category page
    useEffect(() => {
        setLightboxIndex(null);

        let saved: { section?: string; scrollY?: number; expanded?: string[] } | null = null;
        try {
            const raw = sessionStorage.getItem(storageKey);
            if (raw) {
                saved = JSON.parse(raw);
                sessionStorage.removeItem(storageKey);
            }
        } catch {
            /* ignore */
        }

        if (saved?.section) {
            setActiveSection(saved.section);
        } else {
            setActiveSection("all");
        }
        setExpandedSections(Array.isArray(saved?.expanded) ? saved.expanded : []);

        if (typeof saved?.scrollY === "number") {
            const yPos = saved.scrollY;
            const restore = () => window.scrollTo({ top: yPos, behavior: "auto" });
            requestAnimationFrame(() => requestAnimationFrame(restore));
            setTimeout(restore, 50);
        }
    }, [hotel.id, storageKey]);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {/* ── Parallax Hero ── */}
            <section ref={containerRef} className="relative h-[70vh] md:h-screen flex items-end overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-0 w-full h-full z-0">
                    <Image
                        src={hotel.galleryHeroImage}
                        alt={`${hotel.fullName} gallery`}
                        fill
                        className="object-cover"
                        style={{ objectPosition: hotel.galleryHeroPosition }}
                        sizes="100vw"
                        priority
                    />
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

            {/* ── Floating filter (far right, sticky) ── */}
            <div className="sticky top-24 z-40 h-0 w-full pointer-events-none">
                <div ref={filterRef} className="absolute right-3 md:right-5 top-3 md:top-4 pointer-events-auto">
                    <button
                        type="button"
                        onClick={() => setFilterOpen((o) => !o)}
                        aria-expanded={filterOpen}
                        aria-haspopup="listbox"
                        aria-label="Filter gallery"
                        className={cn(
                            "relative flex items-center justify-center w-11 h-11 rounded-full border shadow-lg transition-all duration-300 cursor-pointer",
                            filterOpen || activeSection !== "all"
                                ? "bg-primary text-white border-primary"
                                : "bg-white text-neutral-800 border-neutral-200 hover:border-primary hover:text-primary"
                        )}
                    >
                        {filterOpen ? <X size={18} strokeWidth={1.75} /> : <ListFilter size={18} strokeWidth={1.75} />}
                        {activeSection !== "all" && !filterOpen && (
                            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-white ring-2 ring-primary" />
                        )}
                    </button>

                    <AnimatePresence>
                        {filterOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute right-0 top-full mt-3 w-[min(18.5rem,calc(100vw-1.5rem))] max-h-[min(70vh,28rem)] overflow-y-auto rounded-sm border border-neutral-200 bg-white shadow-2xl shadow-black/15"
                                role="listbox"
                                aria-label="Gallery categories"
                            >
                                <div className="sticky top-0 z-10 bg-white border-b border-neutral-100 px-4 py-3">
                                    <p className="text-[10px] uppercase tracking-[0.28em] font-bold text-neutral-400">
                                        Filter
                                    </p>
                                    <p className="font-serif text-base text-neutral-900 mt-0.5">
                                        {activeLabel}
                                    </p>
                                </div>

                                <div className="p-2">
                                    <button
                                        type="button"
                                        role="option"
                                        aria-selected={activeSection === "all"}
                                        onClick={() => selectSection("all")}
                                        className={cn(
                                            "w-full flex items-center justify-between gap-3 px-3 py-2.5 text-left text-sm transition-colors cursor-pointer",
                                            activeSection === "all"
                                                ? "bg-primary/5 text-primary"
                                                : "text-neutral-700 hover:bg-neutral-50"
                                        )}
                                    >
                                        <span className="font-medium">All</span>
                                        <span className="flex items-center gap-2 text-[11px] tabular-nums text-neutral-400">
                                            {allImages.length}
                                            {activeSection === "all" && <Check size={14} className="text-primary" />}
                                        </span>
                                    </button>

                                    {spaceSections.length > 0 && (
                                        <div className="mt-2 pt-2 border-t border-neutral-100">
                                            <p className="px-3 py-1.5 text-[9px] uppercase tracking-[0.28em] font-bold text-neutral-300">
                                                Spaces
                                            </p>
                                            {spaceSections.map((section) => (
                                                <button
                                                    key={section.id}
                                                    type="button"
                                                    role="option"
                                                    aria-selected={activeSection === section.id}
                                                    onClick={() => selectSection(section.id)}
                                                    className={cn(
                                                        "w-full flex items-center justify-between gap-3 px-3 py-2.5 text-left text-sm transition-colors cursor-pointer",
                                                        activeSection === section.id
                                                            ? "bg-primary/5 text-primary"
                                                            : "text-neutral-700 hover:bg-neutral-50"
                                                    )}
                                                >
                                                    <span className="font-medium">{section.label}</span>
                                                    <span className="flex items-center gap-2 text-[11px] tabular-nums text-neutral-400">
                                                        {section.images.length}
                                                        {activeSection === section.id && (
                                                            <Check size={14} className="text-primary" />
                                                        )}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {roomSections.length > 0 && (
                                        <div className="mt-2 pt-2 border-t border-neutral-100">
                                            <p className="px-3 py-1.5 text-[9px] uppercase tracking-[0.28em] font-bold text-neutral-300">
                                                Rooms
                                            </p>
                                            {roomSections.map((section) => (
                                                <button
                                                    key={section.id}
                                                    type="button"
                                                    role="option"
                                                    aria-selected={activeSection === section.id}
                                                    onClick={() => selectSection(section.id)}
                                                    className={cn(
                                                        "w-full flex items-center justify-between gap-3 px-3 py-2.5 text-left text-sm transition-colors cursor-pointer",
                                                        activeSection === section.id
                                                            ? "bg-primary/5 text-primary"
                                                            : "text-neutral-700 hover:bg-neutral-50"
                                                    )}
                                                >
                                                    <span className="font-medium">{section.label}</span>
                                                    <span className="flex items-center gap-2 text-[11px] tabular-nums text-neutral-400">
                                                        {section.images.length}
                                                        {activeSection === section.id && (
                                                            <Check size={14} className="text-primary" />
                                                        )}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* ── Gallery Grid ── */}
            <section ref={gridRef} className="bg-gray-50 pt-10 md:pt-14 pb-16 md:pb-20">
                <div className="container px-4 max-w-7xl mx-auto">
                    <div className="space-y-16">
                    {activeSection !== "all" && (
                        <div className="flex items-end justify-between gap-4 pr-14">
                            <div>
                                <p className="text-primary uppercase tracking-[0.25em] text-[10px] font-bold mb-1">
                                    Filtered
                                </p>
                                <h2 className="text-2xl md:text-3xl font-serif text-gray-900">{activeLabel}</h2>
                                <div className="h-[2px] w-12 bg-primary mt-3" />
                            </div>
                            <button
                                type="button"
                                onClick={() => selectSection("all")}
                                className="text-[10px] uppercase tracking-[0.22em] font-bold text-neutral-400 hover:text-primary transition-colors cursor-pointer pb-1"
                            >
                                Clear
                            </button>
                        </div>
                    )}
                    {(activeSection === "all" ? sections : sections.filter((s) => s.id === activeSection)).map((section) => {
                        const isExpanded = expandedSections.includes(section.id);
                        const shownImages = isExpanded ? section.images : section.images.slice(0, INITIAL_VISIBLE);
                        const hiddenCount = section.images.length - INITIAL_VISIBLE;
                        return (
                        <div key={section.id} id={`gallery-section-${section.id}`}>
                            {activeSection === "all" && (
                                <div className="mb-6 flex items-end justify-between gap-4 pr-14">
                                    <div>
                                        <p className="text-primary uppercase tracking-[0.25em] text-[10px] font-bold mb-1">
                                            {section.images.some((i) => i.category) ? "Room Category" : "Space"}
                                        </p>
                                        <h2 className="text-2xl md:text-3xl font-serif text-gray-900">{section.label}</h2>
                                        <div className="h-[2px] w-12 bg-primary mt-3" />
                                    </div>
                                    <span className="text-xs text-gray-400 tracking-widest uppercase">
                                        {section.images.length} photos
                                    </span>
                                </div>
                            )}

                            <motion.div
                                variants={galleryContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-40px" }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[260px] gap-4"
                            >
                                {shownImages.map((img, idx) => (
                                    <motion.div
                                        key={`${img.src}::${img.category ?? img.section}::${idx}`}
                                        variants={galleryItem}
                                        {...(idx >= INITIAL_VISIBLE && { initial: "hidden", animate: "visible" })}
                                        className="relative overflow-hidden group cursor-pointer"
                                        onClick={() => handleImageClick(img)}
                                    >
                                        <motion.div
                                            className="absolute inset-0 bg-primary z-10 pointer-events-none origin-top"
                                            initial={{ scaleY: 1 }}
                                            whileInView={{ scaleY: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.7, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
                                        />

                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-75"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        />

                                        <div className="absolute inset-0 flex flex-col justify-end p-5 pointer-events-none">
                                            <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                                <div className="h-[2px] w-8 bg-primary mb-2" />
                                                {img.category && (
                                                    <p className="text-primary-foreground/90 text-[9px] uppercase tracking-widest font-bold mb-1 bg-primary inline-block px-2 py-0.5 rounded-sm">
                                                        {img.category}
                                                    </p>
                                                )}
                                                <h3 className="text-white font-serif text-lg tracking-wide drop-shadow">
                                                    {img.section}
                                                </h3>
                                                {img.category && (
                                                    <p className="text-white/70 text-[10px] tracking-widest uppercase mt-1">
                                                        View features →
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="absolute top-3 right-3 w-7 h-7 border-t-2 border-r-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="absolute bottom-3 left-3 w-7 h-7 border-b-2 border-l-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </motion.div>
                                ))}
                            </motion.div>

                            {hiddenCount > 0 && (
                                <div className="mt-6 flex justify-center">
                                    <button
                                        type="button"
                                        onClick={() => toggleSection(section.id)}
                                        className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold text-gray-800 hover:border-primary hover:text-primary transition-colors cursor-pointer"
                                    >
                                        {isExpanded ? "View less" : `View more (${hiddenCount})`}
                                        <ChevronDown className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-180")} />
                                    </button>
                                </div>
                            )}
                        </div>
                        );
                    })}
                    </div>
                </div>
            </section>

            <GalleryLightbox
                images={visibleImages}
                index={lightboxIndex}
                onClose={() => setLightboxIndex(null)}
                onIndexChange={setLightboxIndex}
                onBook={setBookingRoom}
            />

            <QuickBookingModal
                key={bookingRoom ?? "closed"}
                isOpen={bookingRoom !== null}
                onClose={() => setBookingRoom(null)}
                hotelName={hotel.name}
                hotelId={hotel.id}
                initialRoom={bookingRoom ?? ""}
            />

            <PageCTA />
        </div>
    );
}
