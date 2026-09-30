"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    X, ChevronLeft, ChevronRight, Maximize, ZoomIn, ZoomOut, Minimize, ShoppingBag,
} from "lucide-react";
import type { GalleryImage, RoomCategory } from "@/lib/galleryData";

interface GalleryLightboxProps {
    images: GalleryImage[];
    index: number | null;
    onClose: () => void;
    onIndexChange: (index: number) => void;
    onBook?: (category: Exclude<RoomCategory, null>) => void;
}

export function GalleryLightbox({
    images,
    index,
    onClose,
    onIndexChange,
    onBook,
}: GalleryLightboxProps) {
    const [zoom, setZoom] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const activeImage = index !== null ? images[index] : null;

    const nextImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (index === null || images.length === 0) return;
        onIndexChange((index + 1) % images.length);
        setZoom(1);
    }, [index, images.length, onIndexChange]);

    const prevImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (index === null || images.length === 0) return;
        onIndexChange((index - 1 + images.length) % images.length);
        setZoom(1);
    }, [index, images.length, onIndexChange]);

    const close = useCallback(() => {
        setZoom(1);
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        setIsFullscreen(false);
        onClose();
    }, [onClose]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (index === null) return;
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "Escape") close();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [index, nextImage, prevImage, close]);

    useEffect(() => {
        setZoom(1);
    }, [index]);

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

    return (
        <AnimatePresence>
            {index !== null && activeImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl"
                    onClick={close}
                >
                    <div className="absolute top-0 inset-x-0 h-16 flex items-center justify-between px-6 z-[120] bg-black/40 backdrop-blur-sm">
                        <div className="text-white/70 font-medium text-[10px] tracking-widest uppercase">
                            {index + 1} <span className="mx-1">/</span> {images.length}
                            <span className="ml-3 text-white/40 hidden sm:inline">· {activeImage.section}</span>
                        </div>

                        <div className="flex items-center gap-2 md:gap-4">
                            {activeImage.category && !activeImage.isBathroom && onBook && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onBook(activeImage.category!);
                                    }}
                                    className="flex items-center gap-2 bg-primary hover:bg-white hover:text-primary text-white px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all duration-300 shadow-lg cursor-pointer whitespace-nowrap"
                                >
                                    <ShoppingBag size={14} />
                                    <span>Book<span className="hidden md:inline"> This Room</span></span>
                                </button>
                            )}
                            <button type="button" onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.max(z - 0.5, 1)); }} className="p-2 text-white/70 hover:text-white transition-colors" title="Zoom Out">
                                <ZoomOut size={20} />
                            </button>
                            <button type="button" onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.min(z + 0.5, 3)); }} className="p-2 text-white/70 hover:text-white transition-colors" title="Zoom In">
                                <ZoomIn size={20} />
                            </button>
                            <button type="button" onClick={toggleFullscreen} className="p-2 text-white/70 hover:text-white transition-colors" title="Toggle Fullscreen">
                                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                            </button>
                            <button type="button" onClick={(e) => { e.stopPropagation(); close(); }} className="p-2 text-white/70 hover:text-white transition-colors ml-2" title="Close">
                                <X size={24} />
                            </button>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="absolute left-6 top-1/2 -translate-y-1/2 z-[110] p-4 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-all"
                        onClick={prevImage}
                    >
                        <ChevronLeft size={48} strokeWidth={1} />
                    </button>
                    <button
                        type="button"
                        className="absolute right-6 top-1/2 -translate-y-1/2 z-[110] p-4 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-all"
                        onClick={nextImage}
                    >
                        <ChevronRight size={48} strokeWidth={1} />
                    </button>

                    <div className="absolute inset-x-0 inset-y-16 flex z-[105]">
                        <div className="w-1/2 h-full cursor-w-resize" onClick={prevImage} />
                        <div className="w-1/2 h-full cursor-e-resize" onClick={nextImage} />
                    </div>

                    <div className="relative w-full h-[calc(100vh-128px)] flex items-center justify-center p-4">
                        <motion.div
                            key={activeImage.src}
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: zoom, y: 0 }}
                            exit={{ opacity: 0, scale: 1.05, y: -10 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="relative w-full h-full flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full h-full max-w-6xl max-h-5xl">
                                <Image
                                    src={activeImage.src}
                                    alt={activeImage.alt}
                                    fill
                                    className="object-contain"
                                    quality={100}
                                />
                            </div>
                        </motion.div>
                    </div>

                    <div className="absolute bottom-4 inset-x-0 text-center z-[110] px-4">
                        {activeImage.category && (
                            <p className="text-primary text-[10px] uppercase tracking-widest font-bold mb-1">
                                {activeImage.category}
                            </p>
                        )}
                        <p className="text-white/70 font-serif text-lg md:text-xl tracking-wide drop-shadow-lg">
                            {activeImage.alt}
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
