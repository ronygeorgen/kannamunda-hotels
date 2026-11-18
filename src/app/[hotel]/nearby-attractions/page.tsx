"use client";
import { useHotel } from "@/lib/hotelContext";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { MapPin, Navigation, ArrowUpRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { heroTagline, heroTitlePopup, lineWipe, Reveal } from "@/components/animations";

interface AttractionPlace {
    name: string;
    km: string;
    desc: string;
}

interface AttractionSection {
    distance: string;
    accent: string;
    places: AttractionPlace[];
}

/** Descriptions longer than this get a "Read more" toggle. */
const LONG_DESC_CHARS = 110;

/** "Within 10 km" -> "10 km" for the compact journey-line labels. */
const shortDistance = (distance: string) => distance.replace(/^Within\s+/i, "");

function DistanceJourney({
    sections,
    activeIdx,
    onSelect,
}: {
    sections: AttractionSection[];
    activeIdx: number;
    onSelect: (idx: number) => void;
}) {
    const count = sections.length;
    // Dots sit at the centre of each equal-width column, so the line spans
    // from the first column's centre to the last column's centre.
    const edge = `${50 / count}%`;
    const progress = count > 1 ? activeIdx / (count - 1) : 1;

    return (
        <div className="relative mb-14 md:mb-16">
            {/* Track + progress (desktop) */}
            <div className="hidden md:block absolute top-[26px] h-[2px] bg-cream-deep" style={{ left: edge, right: edge }}>
                <motion.div
                    className="h-full bg-primary origin-left"
                    initial={false}
                    animate={{ scaleX: progress }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
            </div>

            <div
                className="relative flex md:grid gap-3 md:gap-0 overflow-x-auto no-scrollbar -mx-6 px-6 md:mx-0 md:px-0 snap-x"
                style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
            >
                {sections.map((section, idx) => {
                    const isActive = idx === activeIdx;
                    const isPassed = idx < activeIdx;
                    return (
                        <button
                            key={section.distance}
                            type="button"
                            onClick={() => onSelect(idx)}
                            aria-pressed={isActive}
                            className={cn(
                                "group snap-start shrink-0 flex md:flex-col items-center gap-3 md:gap-4 cursor-pointer",
                                "rounded-full md:rounded-none px-5 py-3 md:p-0 border md:border-0 transition-colors duration-300",
                                isActive ? "bg-primary md:bg-transparent border-primary" : "bg-white md:bg-transparent border-cream-deep"
                            )}
                        >
                            <span
                                className={cn(
                                    "hidden md:flex w-[54px] h-[54px] rounded-full items-center justify-center border-2 transition-all duration-500",
                                    isActive
                                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/30 scale-110"
                                        : isPassed
                                            ? "bg-maroon-light border-primary text-primary"
                                            : "bg-white border-cream-deep text-ink/50 group-hover:border-primary group-hover:text-primary"
                                )}
                            >
                                <MapPin className="w-5 h-5" />
                            </span>
                            <span className="flex flex-col md:items-center text-left md:text-center">
                                <span
                                    className={cn(
                                        "whitespace-nowrap font-bold text-base md:text-lg leading-tight transition-colors",
                                        isActive ? "text-white md:text-primary" : "text-ink group-hover:text-primary"
                                    )}
                                >
                                    <span className="md:hidden">{section.distance}</span>
                                    <span className="hidden md:inline">{shortDistance(section.distance)}</span>
                                </span>
                                <span
                                    className={cn(
                                        "whitespace-nowrap text-xs uppercase tracking-[0.18em] font-semibold mt-0.5",
                                        isActive ? "text-white/80 md:text-ink/60" : "text-ink/50"
                                    )}
                                >
                                    {section.places.length} {section.places.length === 1 ? "place" : "places"}
                                </span>
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function AttractionCard({ place, index }: { place: AttractionPlace; index: number }) {
    const [expanded, setExpanded] = useState(false);
    const isLong = place.desc.length > LONG_DESC_CHARS;
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.name}, Kottayam, Kerala`)}`;

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex flex-col bg-white rounded-2xl border border-cream-deep p-7 md:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-[box-shadow,transform] duration-500 overflow-hidden"
        >
            {/* Accent bar that sweeps in on hover */}
            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary to-maroon-light origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

            <div className="flex items-start justify-between gap-4 mb-6">
                <span className="font-serif text-5xl leading-none text-primary/20 group-hover:text-primary/40 transition-colors duration-500 select-none">
                    {String(index + 1).padStart(2, "0")}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-maroon-light text-maroon-dark px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                    <Navigation className="w-3.5 h-3.5" />
                    {place.km}
                </span>
            </div>

            <h3
                title={place.name}
                className="text-xl md:text-[1.35rem] font-bold text-ink truncate mb-3 group-hover:text-primary transition-colors duration-300"
            >
                {place.name}
            </h3>

            <p className={cn("text-ink/75 leading-relaxed", !expanded && "line-clamp-3")}>{place.desc}</p>

            <div className="mt-auto pt-6">
                <div className="flex items-center justify-between gap-4 pt-5 border-t border-cream-deep">
                    {isLong ? (
                        <button
                            type="button"
                            onClick={() => setExpanded((v) => !v)}
                            aria-expanded={expanded}
                            className="inline-flex items-center gap-1 text-sm font-bold text-ink/70 hover:text-primary transition-colors cursor-pointer"
                        >
                            {expanded ? "Show less" : "Read more"}
                            <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", expanded && "rotate-180")} />
                        </button>
                    ) : (
                        <span />
                    )}
                    <a
                        href={mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:text-maroon-dark transition-colors"
                    >
                        View on map
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                </div>
            </div>
        </motion.article>
    );
}

const within60KmSection = {
    distance: "Within 60 km",
    accent: "border-gray-500",
    places: [
        { name: "Kuttikkanam", km: "49 km", desc: "A charming hill station nestled in the Western Ghats, known for its cool climate, lush greenery, tea plantations, and tranquil natural beauty." },
        { name: "Panchalimedu, Kuttikkanam", km: "49 km", desc: "A breathtaking hilltop destination steeped in local legends, offering lush green landscapes, misty valleys, and panoramic views of the Western Ghats." },
        { name: "Parunthumpara, Kuttikkanam", km: "60 km", desc: "A scenic viewpoint famous for its rolling hills, cool climate, and spectacular vistas, making it a popular spot for nature lovers and photographers." },
    ],
};

const poonjarWithin60KmSection = {
    distance: "Within 60 km",
    accent: "border-gray-500",
    places: [
        { name: "Kuttikkanam", km: "44 km", desc: "A charming hill station nestled in the Western Ghats, known for its cool climate, lush greenery, tea plantations, and tranquil natural beauty." },
        { name: "Panchalimedu, Kuttikkanam", km: "43 km", desc: "A breathtaking hilltop destination steeped in local legends, offering lush green landscapes, misty valleys, and panoramic views of the Western Ghats." },
        { name: "Parunthumpara, Kuttikkanam", km: "54 km", desc: "A scenic viewpoint famous for its rolling hills, cool climate, and spectacular vistas, making it a popular spot for nature lovers and photographers." },
    ],
};

const erattupettaAttractions = [
    {
        distance: "Within 10 km",
        accent: "border-primary",
        places: [
            { name: "Aruvithura Church", km: "600 m", desc: "St. George Forane Church, Aruvithura is a historic landmark and renowned pilgrimage destination in Kerala, celebrated for its rich heritage, beautiful architecture, and serene atmosphere. The church offers visitors a unique glimpse into the region's deep-rooted Christian traditions and cultural legacy." },
            { name: "Poonjar Palace", km: "8 km", desc: "12th-century palace turned museum featuring ancient woodwork and artifacts." },
            { name: "Nadukani Viewpoint", km: "10 km", desc: "Breathtaking panoramic views of the Western Ghats." },
        ]
    },
    {
        distance: "Within 20 km",
        accent: "border-gray-700",
        places: [
            { name: "Aruvikachal Waterfalls", km: "13 km", desc: "Aruvikachal Waterfalls, the highest waterfall in Kottayam district, is a scenic natural wonder nestled near Pathampuzha on the fringes of the Western Ghats. Celebrated for its milky cascades, lush green surroundings, and safe bathing spots, it offers visitors a refreshing escape into Kerala's untouched hill country." },
            { name: "Marmala Waterfalls", km: "13 km", desc: "Marmala Waterfalls is a hidden gem near Teekoy village in Kottayam district, cascading about 60 metres into a deep pool surrounded by lush rubber plantations and forest. A rewarding trek through scenic estate trails leads to this serene natural wonder, popular with trekkers and nature lovers en route to Vagamon." },
            { name: "Meadows", km: "15 km", desc: "The rolling green meadows of Vagamon offer endless stretches of lush grassland set against misty hills and open skies. A favourite spot for picnics, photography, and sunset views, they capture the serene beauty of Kerala's hill country at its finest." },
            { name: "Boating", km: "15 km", desc: "Enjoy a peaceful boating experience on the tranquil lake nestled between Vagamon's verdant hills. Pedal boats and rowboats glide across calm waters surrounded by rolling meadows and pine forests, making it a perfect family-friendly outing." },
            { name: "Adventure Park", km: "15 km", desc: "Vagamon Adventure Park offers thrilling activities including zip-lining, rope courses, paragliding, and more amid stunning hilltop scenery. A fun-filled destination for families and adventure seekers looking to experience the excitement of the Western Ghats." },
            { name: "Kottathavalam", km: "15 km", desc: "A scenic village surrounded by lush rolling hills." },
            { name: "Vazhikkadavu", km: "20 km", desc: "The perfect rugged spot for trekking enthusiasts." },
        ]
    },
    {
        distance: "Within 30 km",
        accent: "border-white/30",
        places: [
            { name: "Ilaveezhapoonchira", km: "23 km", desc: "Ilaveezhapoonchira is a breathtaking valley nestled among three hillocks in Kottayam district, famed for its treeless meadows, misty vistas, and legendary Pandava connections. A premier trekking and sunrise destination, it transforms into a scenic pond during the monsoon and offers panoramic views across the Western Ghats." },
            { name: "Vagamon", km: "25 km", desc: "Famous hill station renowned for scenic pine forests and meadows." },
            { name: "Illikkal Kallu", km: "23 km", desc: "Iconic rock formation with stunning views across the valley." },
            { name: "Kurishumala, Vazhikkadavu", km: "23 km", desc: "A scenic hilltop pilgrimage destination known for its peaceful atmosphere, panoramic views, and the annual Way of the Cross pilgrimage." },
            { name: "Thangal Para, Vazhikkadavu", km: "30 km", desc: "A revered spiritual site associated with the Muslim saint Sheikh Fariduddin, attracting visitors with its historical significance and natural beauty." },
            { name: "Murugan Mala, Vazhikkadavu", km: "25 km", desc: "A picturesque hill dedicated to Lord Murugan, offering a serene environment, trekking opportunities, and breathtaking views of the surrounding landscape." },
            { name: "Vagamon Pine Forest", km: "30 km", desc: "Vagamon Pine Forest is a serene man-made woodland in the hills of Vagamon, famed for its towering pine trees, misty trails, and peaceful atmosphere. A beloved spot for nature walks and photography, it offers a refreshing escape into one of Kerala's most scenic hill country landscapes." },
        ]
    },
    within60KmSection,
];

const poonjarAttractions = [
    {
        distance: "Within 15 km",
        accent: "border-primary",
        places: [
            { name: "Aruvithura Church", km: "6 km", desc: "St. George Forane Church, Aruvithura is a historic landmark and renowned pilgrimage destination in Kerala, celebrated for its rich heritage, beautiful architecture, and serene atmosphere. The church offers visitors a unique glimpse into the region's deep-rooted Christian traditions and cultural legacy." },
            { name: "Aruvikachal Waterfalls", km: "7 km", desc: "Aruvikachal Waterfalls, the highest waterfall in Kottayam district, is a scenic natural wonder nestled near Pathampuzha on the fringes of the Western Ghats. Celebrated for its milky cascades, lush green surroundings, and safe bathing spots, it offers visitors a refreshing escape into Kerala's untouched hill country." },
            { name: "Poonjar Palace", km: "8 km", desc: "12th-century palace turned museum featuring ancient woodwork and artifacts." },
            { name: "Nadukani Viewpoint", km: "10 km", desc: "Breathtaking panoramic views of the Western Ghats." },
            { name: "Kottathavalam", km: "15 km", desc: "A scenic village surrounded by lush rolling hills." },
        ]
    },
    {
        distance: "Within 30 km",
        accent: "border-white/30",
        places: [
            {
                name: "Vagamon",
                km: "25 km",
                desc: "Vagamon is a famous hill station in the Western Ghats, renowned for its cool climate, pine forests, and rolling landscapes. Highlights include the lush Meadows — endless grasslands perfect for picnics and sunset views; Boating on the tranquil hilltop lake surrounded by verdant hills; and the Adventure Park with zip-lining, rope courses, and paragliding. Nearby at Vazhikkadavu, visit Kurishumala — a scenic hilltop pilgrimage site known for panoramic views and the annual Way of the Cross; Thangal Para — a revered spiritual site associated with Sheikh Fariduddin; and Murugan Mala — a picturesque hill dedicated to Lord Murugan with serene trekking trails and breathtaking valley views.",
            },
            { name: "Illikkal Kallu", km: "25 km", desc: "Iconic rock formation with stunning views across the valley." },
        ]
    },
    poonjarWithin60KmSection,
];

export default function NearbyAttractionsPage() {
    const hotel = useHotel();
    const attractions = hotel.id === "erattupetta" ? erattupettaAttractions : poonjarAttractions;
    const [activeIdx, setActiveIdx] = useState(0);
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    const activeSection = attractions[Math.min(activeIdx, attractions.length - 1)];

    return (
        <div className="min-h-screen bg-cream text-ink">
            {/* ── Hero ── */}
            <section ref={heroRef} className="relative h-[70vh] md:h-screen flex items-end overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-0 z-0">
                    <Image src={`/${hotel.imagePrefix}-nearby-attractions/location3.webp`} alt="Nearby Attractions" fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent" />
                </motion.div>
                <div className="container relative z-10 px-6 pb-16">
                    <motion.p variants={heroTagline} initial="hidden" animate="visible"
                        className="inline-block bg-primary text-white px-4 py-1.5 rounded-sm uppercase tracking-[0.3em] text-[12px] md:text-xs font-bold mb-6 shadow-xl border border-white/10"
                    >
                        Explore Wonders
                    </motion.p>
                    <div className="overflow-hidden pb-1">
                        <motion.h1 variants={heroTitlePopup} initial="hidden" animate="visible" className="text-5xl md:text-8xl font-serif leading-none text-white drop-shadow-2xl">Nearby Attractions</motion.h1>
                    </div>
                    <motion.div variants={lineWipe} initial="hidden" animate="visible" className="h-[3px] w-40 bg-primary mt-2" />
                </div>
            </section>

            {/* ── Attractions ── */}
            <section className="py-20 md:py-28 bg-cream">
                <div className="container px-6 max-w-7xl mx-auto">
                    <Reveal className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
                        <p className="text-primary uppercase tracking-[0.3em] text-xs font-bold mb-3">Plan Your Day Trips</p>
                        <h2 className="text-4xl md:text-5xl font-serif text-ink mb-5">Explore Around {hotel.name}</h2>
                        <div className="h-[2px] w-16 bg-primary mx-auto mb-6" />
                        <p className="text-ink/75 text-lg">
                            Waterfalls, hill stations, heritage sites and viewpoints, sorted by how far they are from the hotel.
                            Pick a distance to see what&apos;s nearby.
                        </p>
                    </Reveal>

                    <DistanceJourney sections={attractions} activeIdx={activeIdx} onSelect={setActiveIdx} />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection.distance}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="grid gap-6 md:gap-7 sm:grid-cols-2 lg:grid-cols-3 items-start"
                        >
                            {activeSection.places.map((place, i) => (
                                <AttractionCard key={`${activeSection.distance}-${place.name}`} place={place} index={i} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>


        </div>
    );
}
