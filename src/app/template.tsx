"use client";

import { motion } from "framer-motion";
import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    useLayoutEffect(() => {
        // Snap to top instantly before the animation begins
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });

        // Ensure browser doesn't try to restore scroll
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
    }, [pathname]);

    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
            className="w-full"
        >
            {children}
        </motion.div>
    );
}
