"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Amenities", href: "/amenities" },
    { name: "Projects", href: "/projects" },
    { name: "Location", href: "/destination" },
    { name: "Attractions", href: "/nearby-attractions" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);
    const pathname = usePathname();

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isTransparent = pathname === "/" && !scrolled && !isOpen;

    return (
        <>
            <nav
                className={cn(
                    "fixed w-full z-50 transition-all duration-500",
                    isTransparent
                        ? "bg-transparent py-4"
                        : "bg-white/95 backdrop-blur-md border-b border-black/5 shadow-sm py-2"
                )}
            >
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex-shrink-0 z-50">
                            <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                                <Image
                                    src="/Kannamunda-logo.png"
                                    alt="Kannamundayil Residency"
                                    width={150}
                                    height={50}
                                    className={cn(
                                        "h-12 w-auto object-contain transition-all duration-500",
                                        isTransparent ? "drop-shadow-md" : ""
                                    )}
                                    priority
                                />
                            </Link>
                        </div>

                        <div className="hidden lg:ml-6 lg:flex lg:items-center lg:space-x-8">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "text-sm font-medium transition-all duration-300 relative group",
                                            isTransparent ? "text-white/90 hover:text-white" : "text-gray-600 hover:text-primary",
                                            isActive && !isTransparent && "text-primary font-semibold"
                                        )}
                                    >
                                        {item.name}
                                        <span className={cn(
                                            "absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full",
                                            isTransparent ? "bg-white" : "bg-primary",
                                            isActive && !isTransparent ? "w-full" : ""
                                        )} />
                                    </Link>
                                );
                            })}
                            <Link href="/bookings">
                                <Button
                                    className={cn(
                                        "ml-4 rounded-full px-6 transition-all duration-300 cursor-pointer",
                                        isTransparent
                                            ? "bg-white text-black hover:bg-gray-100"
                                            : "bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg"
                                    )}
                                >
                                    Book Stay
                                </Button>
                            </Link>
                        </div>

                        <div className="flex items-center lg:hidden z-50">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className={cn(
                                    "inline-flex items-center justify-center rounded-full p-2 focus:outline-none transition-colors",
                                    isTransparent && !isOpen ? "text-white hover:bg-white/20" : "text-gray-600 hover:bg-gray-100"
                                )}
                            >
                                <span className="sr-only">Open main menu</span>
                                {isOpen ? (
                                    <X className="block h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <Menu className="block h-6 w-6" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-white pt-24 pb-6 px-4 overflow-y-auto"
                    >
                        <div className="flex flex-col items-center space-y-6 text-center">
                            {navigation.map((item, i) => {
                                const isActive = pathname === item.href;
                                return (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + i * 0.05 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "block text-2xl font-light tracking-wide transition-colors",
                                                isActive ? "text-primary font-medium" : "text-gray-800 hover:text-primary"
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                            <Link href="/bookings" className="pt-8 w-full max-w-xs mx-auto" onClick={() => setIsOpen(false)}>
                                <Button className="w-full h-14 rounded-full text-lg shadow-lg cursor-pointer">
                                    Book Your Stay
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
