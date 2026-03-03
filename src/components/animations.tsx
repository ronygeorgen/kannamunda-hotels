"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

/* ─── Shared Variants ─────────────────────────────────────── */

export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeDown: Variants = {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeLeft: Variants = {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeRight: Variants = {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export const scaleUp: Variants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export const zoomIn: Variants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
};

export const staggerContainerSlow: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.15 },
    },
};

/* ─── Reusable Section Reveal Wrappers ───────────────────── */

interface RevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    variants?: Variants;
    viewport?: any;
}

export function Reveal({ children, className = "", delay = 0, variants = fadeUp, viewport }: RevealProps) {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={viewport || { once: false, margin: "-80px" }}
            variants={variants}
            transition={{ delay }}
        >
            {children}
        </motion.div>
    );
}

export function RevealGroup({ children, className = "", viewport }: { children: ReactNode; className?: string; viewport?: any }) {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={viewport || { once: false, margin: "-60px" }}
            variants={staggerContainer}
        >
            {children}
        </motion.div>
    );
}

/* ─── Hero Text Animations ────────────────────────────────── */

export const heroTagline: Variants = {
    hidden: { opacity: 0, y: 20, letterSpacing: "0.5em" },
    visible: {
        opacity: 1, y: 0, letterSpacing: "0.3em",
        transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    },
};

export const heroTitle: Variants = {
    hidden: { opacity: 0, y: 40, skewY: 3 },
    visible: {
        opacity: 1, y: 0, skewY: 0,
        transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }
    },
};

export const heroTitlePopup: Variants = {
    hidden: { opacity: 0, y: "100%" },
    visible: {
        opacity: 1, y: 0,
        transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }
    },
};

export const staggerChildren: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
        }
    }
};

export const wordLuxuryReveal: Variants = {
    hidden: { opacity: 0, y: 50, filter: "blur(8px)", rotateX: 45 },
    visible: {
        opacity: 1, y: 0, filter: "blur(0px)", rotateX: 0,
        transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] }
    }
};

export const heroCta: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.7 } },
};

/* ─── Image Clip Reveal ───────────────────────────────────── */

export const clipReveal: Variants = {
    hidden: { clipPath: "inset(100% 0% 0% 0%)", opacity: 1 },
    visible: {
        clipPath: "inset(0% 0% 0% 0%)", opacity: 1,
        transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] }
    },
};

/* ─── Gallery Pop ─────────────────────────────────────────── */

export const galleryItem: Variants = {
    hidden: { opacity: 0, scale: 0.75, y: 40, rotate: 1.5 },
    visible: {
        opacity: 1, scale: 1, y: 0, rotate: 0,
        transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
    },
};

export const galleryContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.09, delayChildren: 0.1 },
    },
};

/* ─── Line Wipe ───────────────────────────────────────────── */

export const lineWipe: Variants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 } },
};
