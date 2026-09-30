"use client";

import Image from "next/image";
import { useParams, notFound, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Bath,
    BedDouble,
    BedSingle,
    Briefcase,
    ChevronLeft,
    ChevronRight,
    Coffee,
    Droplets,
    Fan,
    ShoppingBag,
    Snowflake,
    Sparkles,
    Tv,
    Wifi,
    Shirt,
    ConciergeBell,
    type LucideIcon,
} from "lucide-react";
import { useHotel } from "@/lib/hotelContext";
import { QuickBookingModal } from "@/components/QuickBookingModal";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import {
    getRoomCategoryBySlug,
    getImagesForCategory,
    getRoomOptions,
    galleryReturnKey,
    type RoomFeatureId,
} from "@/lib/galleryData";
import { fadeUp, Reveal, RevealGroup } from "@/components/animations";
import { cn } from "@/lib/utils";

const FEATURE_META: Record<RoomFeatureId, { label: string; hint: string; icon: LucideIcon }> = {
    ac: { label: "Air Conditioning", hint: "Cool, climate-controlled stay", icon: Snowflake },
    "non-ac": { label: "Non AC", hint: "Naturally ventilated double room", icon: Fan },
    tv: { label: "Flat-screen TV", hint: "Entertainment in room", icon: Tv },
    "hot-water": { label: "Hot Water", hint: "24-hour hot water supply", icon: Droplets },
    kettle: { label: "Electric Kettle", hint: "Tea & coffee ready anytime", icon: Coffee },
    wifi: { label: "Free WiFi", hint: "Stay connected throughout", icon: Wifi },
    wardrobe: { label: "Wardrobe", hint: "Space to settle in", icon: Shirt },
    "private-bath": { label: "Private Bathroom", hint: "Attached bath & amenities", icon: Bath },
    towels: { label: "Towels & Toiletries", hint: "Fresh essentials provided", icon: Sparkles },
    "room-service": { label: "Room Service", hint: "Meals delivered on request", icon: ConciergeBell },
    "double-bed": { label: "Double Bed", hint: "Comfortable double occupancy", icon: BedDouble },
    "single-bed": { label: "Single Bed", hint: "Ideal for solo travellers", icon: BedSingle },
    "work-desk": { label: "Work Desk", hint: "Space to plan your day", icon: Briefcase },
    "premium-furnishings": { label: "Premium Furnishings", hint: "Refined executive finish", icon: Sparkles },
};

let pendingReturnClear: ReturnType<typeof setTimeout> | null = null;

export default function RoomCategoryPage() {
    const hotel = useHotel();
    const router = useRouter();
    const params = useParams<{ category: string }>();
    const slug = params.category;

    const info = useMemo(() => getRoomCategoryBySlug(slug), [slug]);
    const allowed = useMemo(() => getRoomOptions(hotel.id), [hotel.id]);

    const images = useMemo(() => {
        if (!info) return [];
        return getImagesForCategory(hotel.id, info.category);
    }, [hotel.id, info]);

    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [activeThumb, setActiveThumb] = useState(0);
    const returningToGallery = useRef(false);

    // Open on the photo that was clicked in the gallery (?photo=<src>).
    useEffect(() => {
        const photo = new URLSearchParams(window.location.search).get("photo");
        if (!photo) return;
        const idx = images.findIndex((img) => img.src === photo);
        if (idx >= 0) setActiveThumb(idx);
    }, [images]);

    // The saved gallery position is only valid for a back navigation; drop it on any other exit.
    // Removal is deferred so React Strict Mode's dev-only unmount/remount doesn't clear it.
    useEffect(() => {
        const key = galleryReturnKey(hotel.id);
        if (pendingReturnClear) {
            clearTimeout(pendingReturnClear);
            pendingReturnClear = null;
        }
        const onPopState = () => {
            returningToGallery.current = true;
        };
        window.addEventListener("popstate", onPopState);
        return () => {
            window.removeEventListener("popstate", onPopState);
            if (!returningToGallery.current) {
                pendingReturnClear = setTimeout(() => {
                    pendingReturnClear = null;
                    try {
                        sessionStorage.removeItem(key);
                    } catch {
                        /* ignore */
                    }
                }, 0);
            }
        };
    }, [hotel.id]);

    if (!info || !(allowed as readonly string[]).includes(info.category)) {
        notFound();
    }

    const category = info.category;
    const hero = images[activeThumb] ?? images[0];

    const openBook = () => {
        setIsBookingOpen(true);
    };

    const goBack = () => {
        returningToGallery.current = true;
        if (typeof window !== "undefined" && window.history.length > 1) {
            router.back();
            return;
        }
        router.push(`${hotel.basePath}/gallery`);
    };

    const prevImage = () => {
        if (images.length < 2) return;
        setActiveThumb((i) => (i - 1 + images.length) % images.length);
    };

    const nextImage = () => {
        if (images.length < 2) return;
        setActiveThumb((i) => (i + 1) % images.length);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <section className="container max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-28 sm:pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                    {/* Left — image stack */}
                    <div className="lg:col-span-7 space-y-4">
                        <Reveal>
                            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200 shadow-xl shadow-black/10 group/hero">
                                {hero ? (
                                    <>
                                        <button
                                            type="button"
                                            className="absolute inset-0 cursor-zoom-in group"
                                            onClick={() => setLightboxIndex(activeThumb)}
                                        >
                                            <Image
                                                src={hero.src}
                                                alt={hero.alt}
                                                fill
                                                priority
                                                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                                sizes="(max-width: 1024px) 100vw, 58vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                                            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 pointer-events-none">
                                                <div>
                                                    <p className="text-white/70 text-[10px] uppercase tracking-[0.3em] font-bold mb-1">
                                                        {hero.section}
                                                    </p>
                                                    <p className="text-white font-serif text-lg md:text-xl">
                                                        Click to enlarge
                                                    </p>
                                                </div>
                                                <span className="text-white/60 text-[10px] tracking-widest uppercase">
                                                    {activeThumb + 1} / {images.length}
                                                </span>
                                            </div>
                                        </button>

                                        {images.length > 1 && (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={prevImage}
                                                    aria-label="Previous image"
                                                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-black/45 text-white hover:bg-primary transition-colors cursor-pointer backdrop-blur-sm"
                                                >
                                                    <ChevronLeft size={22} strokeWidth={1.5} />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={nextImage}
                                                    aria-label="Next image"
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-black/45 text-white hover:bg-primary transition-colors cursor-pointer backdrop-blur-sm"
                                                >
                                                    <ChevronRight size={22} strokeWidth={1.5} />
                                                </button>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                                        No photos yet
                                    </div>
                                )}
                            </div>
                        </Reveal>

                        {images.length > 1 && (
                            <RevealGroup className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                                {images.map((img, i) => (
                                    <motion.button
                                        key={img.src}
                                        type="button"
                                        variants={fadeUp}
                                        onClick={() => {
                                            setActiveThumb(i);
                                            setLightboxIndex(i);
                                        }}
                                        className={cn(
                                            "relative aspect-[4/3] overflow-hidden cursor-pointer ring-offset-2 ring-offset-gray-50 transition-all",
                                            activeThumb === i
                                                ? "ring-2 ring-primary"
                                                : "opacity-80 hover:opacity-100"
                                        )}
                                    >
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            className="object-cover"
                                            sizes="160px"
                                        />
                                    </motion.button>
                                ))}
                            </RevealGroup>
                        )}
                    </div>

                    {/* Right — features + book */}
                    <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
                        <Reveal>
                            <p className="text-primary uppercase tracking-[0.35em] text-[10px] font-bold mb-3">
                                Room Category · {hotel.name}
                            </p>
                            <h1 className="text-4xl md:text-5xl font-serif text-neutral-900 leading-none mb-3">
                                {info.title}
                            </h1>
                            <div className="h-[2px] w-14 bg-primary mb-5" />
                            <p className="text-gray-500 text-sm md:text-base leading-relaxed font-light">
                                {info.subtitle}. {info.description}
                            </p>

                            <button
                                type="button"
                                onClick={goBack}
                                className="mt-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] font-bold text-gray-500 hover:text-primary transition-colors cursor-pointer"
                            >
                                <ArrowLeft size={14} />
                                Back to Gallery
                            </button>

                            <div className="mt-10 flex w-fit items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 text-[10px] uppercase tracking-[0.22em] font-bold text-neutral-700">
                                {info.isAc ? (
                                    <>
                                        <Snowflake size={12} className="text-primary" />
                                        Air Conditioned
                                    </>
                                ) : (
                                    <>
                                        <Fan size={12} className="text-primary" />
                                        Non Air Conditioned
                                    </>
                                )}
                            </div>
                        </Reveal>

                        <Reveal>
                            <h2 className="text-xs uppercase tracking-[0.28em] font-bold text-neutral-400 mb-4">
                                In-room features
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {info.features.map((fid) => {
                                    const meta = FEATURE_META[fid];
                                    const Icon = meta.icon;
                                    return (
                                        <div
                                            key={fid}
                                            className="flex items-start gap-3 bg-white border border-gray-100 p-3.5 hover:border-primary/40 transition-colors"
                                        >
                                            <div className="w-9 h-9 shrink-0 flex items-center justify-center bg-gray-50 text-neutral-700">
                                                <Icon size={16} strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-neutral-900 leading-tight">
                                                    {meta.label}
                                                </p>
                                                <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                                                    {meta.hint}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Reveal>

                        <Reveal>
                            <div className="bg-neutral-950 text-white p-6 md:p-7 relative overflow-hidden">
                                <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-primary/30 blur-2xl pointer-events-none" />
                                <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-bold mb-2 relative">
                                    Ready to reserve
                                </p>
                                <h3 className="font-serif text-2xl md:text-3xl mb-3 relative">
                                    Book the {info.title}
                                </h3>
                                <p className="text-white/60 text-sm font-light mb-6 relative max-w-sm">
                                    Enquire on WhatsApp with your dates — we&apos;ll confirm availability quickly.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => openBook()}
                                    className="relative inline-flex items-center gap-2 bg-primary hover:bg-white hover:text-neutral-900 text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
                                >
                                    <ShoppingBag size={14} />
                                    Book This Room
                                </button>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Mobile sticky book */}
            <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 p-4 bg-gradient-to-t from-gray-50 via-gray-50/95 to-transparent">
                <button
                    type="button"
                    onClick={() => openBook()}
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest shadow-lg cursor-pointer"
                >
                    <ShoppingBag size={15} />
                    Book This Room
                </button>
            </div>

            <GalleryLightbox
                images={images}
                index={lightboxIndex}
                onClose={() => setLightboxIndex(null)}
                onIndexChange={setLightboxIndex}
                onBook={openBook}
            />

            <QuickBookingModal
                key={`${isBookingOpen}-${category}`}
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                hotelName={hotel.name}
                hotelId={hotel.id}
                initialRoom={category}
            />
        </div>
    );
}
