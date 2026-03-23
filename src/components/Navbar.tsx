"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavItem {
    name: string;
    href: string;
    items?: { name: string; href: string }[];
}

/** Returns the active hotel context from the current path, or null if not in a hotel sub-route */
function useActiveHotel() {
    const pathname = usePathname();
    if (pathname.startsWith("/erattupetta-hotel")) {
        return { id: "erattupetta", name: "Erattupetta", base: "/erattupetta-hotel" };
    }
    if (pathname.startsWith("/poonjar-hotel")) {
        return { id: "poonjar", name: "Poonjar", base: "/poonjar-hotel" };
    }
    return null;
}

/** Build hotel-specific nav items */
function buildHotelNav(base: string): NavItem[] {
    return [
        { name: "Home", href: base },
        { name: "About", href: `${base}/about` },
        { name: "Amenities", href: `${base}/amenities` },
        { name: "Attractions", href: `${base}/nearby-attractions` },
        { name: "Gallery", href: `${base}/gallery` },
        { name: "Contact", href: `${base}/contact` },
    ];
}

/** Root level nav (on landing / finance / bakery) */
const rootNavItems: NavItem[] = [
    {
        name: "Hotels",
        href: "#",
        items: [
            { name: "Hotel-Erattupetta", href: "/erattupetta-hotel" },
            { name: "Hotel-Poonjar", href: "/poonjar-hotel" }
        ]
    },
    { name: "Finance", href: "/finance" },
    { name: "Bakery", href: "/bakery" },
    { name: "Contact", href: "/contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);
    const pathname = usePathname();
    const activeHotel = useActiveHotel();

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const groupPages = ["/", "/finance", "/bakery", "/contact"];
    const heroPages = [...groupPages, "/erattupetta-hotel", "/poonjar-hotel"];
    const isHeroPage = heroPages.includes(pathname);
    const isTransparent = isHeroPage && !scrolled && !isOpen;
    const isDarkStyle = isTransparent || (groupPages.includes(pathname) && !isOpen);

    // Determine the active top-level section for the mobile switcher
    const activeSectionHref = pathname.startsWith("/erattupetta-hotel")
        ? "/erattupetta-hotel"
        : pathname.startsWith("/poonjar-hotel")
            ? "/poonjar-hotel"
            : pathname.startsWith("/finance")
                ? "/finance"
                : pathname.startsWith("/bakery")
                    ? "/bakery"
                    : pathname.startsWith("/contact")
                        ? "/contact"
                        : "/";

    // Decide which nav to show
    const navigation: NavItem[] = activeHotel
        ? buildHotelNav(activeHotel.base)
        : rootNavItems;

    // Show "Book Stay" button only on hotel pages
    const showBooking = !!activeHotel;
    const bookingHref = activeHotel ? `${activeHotel.base}/bookings` : null;

    return (
        <>
            <nav
                className={cn(
                    "fixed w-full z-50 transition-all duration-500",
                    isTransparent
                        ? "bg-transparent py-4"
                        : groupPages.includes(pathname)
                            ? "bg-black/80 backdrop-blur-lg border-b border-white/10 shadow-sm py-2"
                            : "bg-white/95 backdrop-blur-md border-b border-black/5 shadow-sm py-2"
                )}
            >
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo — always links to the group landing page */}
                        <div className="flex-shrink-0 z-50">
                            <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                                <Image
                                    src="/common/Kannamunda-logo.webp"
                                    alt="Kannamundayil Group"
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

                        {/* Branch Switcher Dropdown (desktop) */}
                        {!!activeHotel && (
                            <div className="hidden md:block relative group/switcher ml-4">
                                <button className={cn(
                                    "flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-bold px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer",
                                    isTransparent
                                        ? "bg-primary/80 text-white border-white/10 backdrop-blur-sm hover:bg-primary"
                                        : "bg-primary text-white border-primary shadow-md hover:shadow-lg"
                                )}>
                                    {pathname === "/finance" ? "Finance" :
                                        pathname === "/bakery" ? "Bakery" :
                                            pathname === "/contact" ? "Contact" :
                                                activeHotel ? `${activeHotel.name} Hotel` : "Main Page"}
                                    <ChevronDown className="w-3 h-3" />
                                </button>

                                <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover/switcher:opacity-100 group-hover/switcher:visible transition-all duration-300 z-[60]">
                                    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden min-w-[220px] py-2">
                                        {[
                                            { name: "Main Page", href: "/" },
                                            { name: "Erattupetta Hotel", href: "/erattupetta-hotel" },
                                            { name: "Poonjar Hotel", href: "/poonjar-hotel" },
                                            { name: "Finance", href: "/finance" },
                                            { name: "Bakery", href: "/bakery" },
                                        ].map((branch) => (
                                            <Link
                                                key={branch.href}
                                                href={branch.href}
                                                className={cn(
                                                    "px-6 py-3 text-[10px] tracking-[0.15em] uppercase font-bold block transition-colors",
                                                    pathname === branch.href
                                                        ? "bg-primary/10 text-primary"
                                                        : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                                                )}
                                            >
                                                {branch.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Desktop nav */}
                        <div className="hidden lg:ml-6 lg:flex lg:items-center lg:space-x-7">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href || (item.href !== activeHotel?.base && pathname.startsWith(item.href));

                                if (item.items) {
                                    return (
                                        <div key={item.name} className="relative group/dropdown">
                                            <button
                                                className={cn(
                                                    "flex items-center gap-1 text-sm font-medium transition-all duration-300 group cursor-pointer",
                                                    isDarkStyle ? "text-white/90 hover:text-white" : "text-gray-600 hover:text-primary"
                                                )}
                                            >
                                                {item.name}
                                                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover/dropdown:rotate-180" />
                                            </button>

                                            {/* Dropdown Menu */}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300 z-50">
                                                <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden min-w-[200px] flex flex-col py-2">
                                                    {item.items.map((subItem) => (
                                                        <Link
                                                            key={subItem.href}
                                                            href={subItem.href}
                                                            className="px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors whitespace-nowrap"
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "text-sm font-medium transition-all duration-300 relative group",
                                            isDarkStyle ? "text-white/90 hover:text-white" : "text-gray-600 hover:text-primary",
                                            isActive && !isDarkStyle && "text-primary font-semibold"
                                        )}
                                    >
                                        {item.name}
                                        <span className={cn(
                                            "absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full",
                                            isDarkStyle ? "bg-white" : "bg-primary",
                                            isActive && !isDarkStyle ? "w-full" : ""
                                        )} />
                                    </Link>
                                );
                            })}
                            {showBooking && bookingHref && (
                                <Link href={bookingHref}>
                                    <Button
                                        className={cn(
                                            "ml-2 rounded-full px-6 transition-all duration-300 cursor-pointer",
                                            isDarkStyle
                                                ? "bg-white text-black hover:bg-gray-100"
                                                : "bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg"
                                        )}
                                    >
                                        Book Stay
                                    </Button>
                                </Link>
                            )}
                        </div>

                        {/* Mobile hamburger */}
                        <div className="flex items-center lg:hidden z-50">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className={cn(
                                    "inline-flex items-center justify-center rounded-full p-2 focus:outline-none transition-colors",
                                    isDarkStyle && !isOpen ? "text-white hover:bg-white/20" : "text-gray-600 hover:bg-gray-100"
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

            {/* Mobile menu */}
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
                            {/* ── Section Switcher (always visible on mobile) ── */}
                            <div className="w-full px-4 mb-6">
                                <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 font-bold mb-3 text-center">You are in</p>
                                <div className="grid grid-cols-1 gap-2">
                                    {[
                                        { name: "Main Home", href: "/" },
                                        { name: "Erattupetta Hotel", href: "/erattupetta-hotel" },
                                        { name: "Poonjar Hotel", href: "/poonjar-hotel" },
                                        { name: "Finance", href: "/finance" },
                                        { name: "Bakery", href: "/bakery" },
                                    ].map((branch) => (
                                        <Link
                                            key={branch.href}
                                            href={branch.href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "w-full py-3 px-6 rounded-xl text-sm font-bold uppercase tracking-widest transition-all text-center",
                                                activeSectionHref === branch.href
                                                    ? "bg-primary text-white shadow-lg"
                                                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                                            )}
                                        >
                                            {branch.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full h-px bg-gray-100 mb-2" />

                            {navigation.map((item, i) => {
                                const isActive = pathname === item.href;

                                if (item.items) {
                                    return (
                                        <div key={item.name} className="w-full flex flex-col items-center">
                                            <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-bold mb-4">{item.name}</p>
                                            <div className="flex flex-col space-y-4">
                                                {item.items.map((subItem) => (
                                                    <Link
                                                        key={subItem.href}
                                                        href={subItem.href}
                                                        onClick={() => setIsOpen(false)}
                                                        className="text-xl font-light hover:text-primary transition-colors"
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                }

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
                            {showBooking && bookingHref && (
                                <Link href={bookingHref} className="pt-8 w-full max-w-xs mx-auto" onClick={() => setIsOpen(false)}>
                                    <Button className="w-full h-14 rounded-full text-lg shadow-lg cursor-pointer">
                                        Book Your Stay
                                    </Button>
                                </Link>
                            )}
                            {/* Back to group landing */}
                            {activeHotel && (
                                <Link
                                    href="/"
                                    onClick={() => setIsOpen(false)}
                                    className="text-xs tracking-[0.25em] uppercase text-gray-400 hover:text-primary transition-colors mt-2"
                                >
                                    ← Back to Group
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
