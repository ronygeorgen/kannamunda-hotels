"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
    const pathname = usePathname();
    const isPoonjar = pathname.startsWith("/poonjar-hotel");
    const base = isPoonjar ? "/poonjar-hotel" : "/erattupetta-hotel";
    return (
        <footer className="bg-[#3a0a14] text-white relative z-10">
            {/* Top decorative border */}
            <div className="h-[3px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <div className="container mx-auto px-6 md:px-10 pt-16 pb-10">

                {/* Main grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

                    {/* Brand — wider column */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Logo — directly on dark bg, no white box */}
                        <Image
                            src="/common/footer-logo.webp"
                            alt="Kannamundayil Residency"
                            width={260}
                            height={90}
                            className="w-56 h-auto object-contain"
                        />

                        <p className="text-white/60 text-sm leading-relaxed max-w-xs font-light">
                            Luxurious Accommodation, Unparalleled Comfort. A family-run tourist home embodying the warmth and hospitality of Kerala.
                        </p>

                        {/* Divider */}
                        <div className="h-px w-12 bg-white/20" />

                        {/* Social */}
                        <div className="flex items-center gap-4">
                            <Link href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white hover:border-white/40 transition-all duration-300">
                                <Facebook size={15} />
                            </Link>
                            <Link href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white hover:border-white/40 transition-all duration-300">
                                <Instagram size={15} />
                            </Link>
                            <Link href="#" aria-label="Twitter" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white hover:border-white/40 transition-all duration-300">
                                <Twitter size={15} />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2">
                        <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-white/70 mb-5">Navigation</h3>
                        <ul className="space-y-3">
                            {/* All nav items with inline sub-links */}
                            {[
                                {
                                    name: "Home",
                                    sub: [
                                        { label: "Main Home", href: "/" },
                                        { label: "Hotel-Erattupetta", href: "/erattupetta-hotel" },
                                        { label: "Hotel-Poonjar", href: "/poonjar-hotel" },
                                    ],
                                },
                                {
                                    name: "About", sub: [
                                        { label: "Hotel-Erattupetta", href: "/erattupetta-hotel/about" },
                                        { label: "Hotel-Poonjar", href: "/poonjar-hotel/about" },
                                    ]
                                },
                                {
                                    name: "Amenities", sub: [
                                        { label: "Hotel-Erattupetta", href: "/erattupetta-hotel/amenities" },
                                        { label: "Hotel-Poonjar", href: "/poonjar-hotel/amenities" },
                                    ]
                                },
                                {
                                    name: "Attractions", sub: [
                                        { label: "Hotel-Erattupetta", href: "/erattupetta-hotel/nearby-attractions" },
                                        { label: "Hotel-Poonjar", href: "/poonjar-hotel/nearby-attractions" },
                                    ]
                                },
                                {
                                    name: "Gallery", sub: [
                                        { label: "Hotel-Erattupetta", href: "/erattupetta-hotel/gallery" },
                                        { label: "Hotel-Poonjar", href: "/poonjar-hotel/gallery" },
                                    ]
                                },
                                {
                                    name: "Contact",
                                    sub: [
                                        { label: "Group Contact", href: "/contact" },
                                        { label: "Hotel-Erattupetta", href: "/erattupetta-hotel/contact" },
                                        { label: "Hotel-Poonjar", href: "/poonjar-hotel/contact" },
                                    ],
                                },
                            ].map((item) => (
                                <li key={item.name} className="group/item">
                                    <span className="text-white/60 group-hover/item:text-white transition-colors text-sm flex items-center gap-2 cursor-default select-none">
                                        <span className="w-0 group-hover/item:w-3 h-px bg-white transition-all duration-300 inline-block" />
                                        {item.name}
                                    </span>
                                    <ul className={`pl-5 mt-1.5 space-y-1.5 overflow-hidden max-h-0 group-hover/item:max-h-28 transition-all duration-300`}>
                                        {item.sub.map((s) => (
                                            <li key={s.href}>
                                                <Link
                                                    href={s.href}
                                                    className="text-white/40 hover:text-white transition-colors text-xs flex items-center gap-2 group"
                                                >
                                                    <span className="w-0 group-hover:w-2 h-px bg-white/50 transition-all duration-300 inline-block" />
                                                    {s.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Erattupetta */}
                    <div className="lg:col-span-3">
                        <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-white/70 mb-5">Erattupetta</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="https://maps.app.goo.gl/ESpLdSY6SBB82YH1A"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-3 text-white/60 hover:text-white transition-colors text-sm group"
                                >
                                    <MapPin size={16} className="mt-0.5 shrink-0 text-white/30 group-hover:text-white transition-colors" />
                                    <span>Kannamundayil Arcade, Pala Road, Erattupetta</span>
                                </Link>
                            </li>
                            <li className="flex items-start gap-3 text-white/60 text-sm">
                                <Phone size={16} className="mt-0.5 shrink-0 text-white/30" />
                                <div className="flex flex-col gap-1">
                                    <a href="tel:+919447131750" className="hover:text-white transition-colors">+91 94471 31750</a>
                                    <a href="tel:+919447189362" className="hover:text-white transition-colors">+91 94471 89362</a>
                                </div>
                            </li>
                            <li className="flex items-center gap-3 text-white/60 text-sm">
                                <Mail size={16} className="shrink-0 text-white/30" />
                                <a href="mailto:info@kannamundaresidency.com" className="hover:text-white transition-colors break-all">
                                    info@kannamundaresidency.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Poonjar */}
                    <div className="lg:col-span-3">
                        <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-white/70 mb-5">Poonjar</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="https://maps.app.goo.gl/urwncMWU44pSTUF69"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-3 text-white/60 hover:text-white transition-colors text-sm group"
                                >
                                    <MapPin size={16} className="mt-0.5 shrink-0 text-white/30 group-hover:text-white transition-colors" />
                                    <span>Kannamundayil Arcade, Opp. CMI Church, Poonjar</span>
                                </Link>
                            </li>
                            <li className="flex items-start gap-3 text-white/60 text-sm">
                                <Phone size={16} className="mt-0.5 shrink-0 text-white/30" />
                                <div className="flex flex-col gap-1">
                                    <a href="tel:+919447107950" className="hover:text-white transition-colors">+91 94471 07950</a>
                                    <a href="tel:+919447189362" className="hover:text-white transition-colors">+91 94471 89362</a>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/30 text-xs tracking-wide">
                        © {new Date().getFullYear()} Kannamundayil Residency. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-xs text-white/30">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <span className="opacity-30">|</span>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
