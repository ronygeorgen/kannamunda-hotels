"use client";
import { useHotel } from "@/lib/hotelContext";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, ChevronDown } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
    heroTagline, heroTitle, heroTitlePopup, lineWipe,
    fadeUp, galleryContainer, galleryItem,
    RevealGroup, Reveal,
} from "@/components/animations";

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

const COLLAPSED_ITEM_LIMIT = 3;

function AttractionSectionCard({
    section,
    sectionIdx,
    expandedPlaceId,
    expandedCardIdx,
    onTogglePlace,
    onToggleCard,
}: {
    section: AttractionSection;
    sectionIdx: number;
    expandedPlaceId: string | null;
    expandedCardIdx: number | null;
    onTogglePlace: (id: string) => void;
    onToggleCard: (idx: number) => void;
}) {
    const needsCardExpand = section.places.length > COLLAPSED_ITEM_LIMIT;
    const isCardExpanded = expandedCardIdx === sectionIdx;
    const visiblePlaces =
        needsCardExpand && !isCardExpanded
            ? section.places.slice(0, COLLAPSED_ITEM_LIMIT)
            : section.places;
    const hiddenCount = section.places.length - COLLAPSED_ITEM_LIMIT;

    return (
        <motion.div
            variants={galleryItem}
            className={cn(
                "border-t-4 border-primary bg-gray-50 p-10 flex flex-col w-full hover:bg-white hover:shadow-xl transition-all duration-500 rounded-sm",
                expandedCardIdx === null ? "h-full" : "self-start",
                isCardExpanded && "shadow-xl bg-white relative z-10"
            )}
        >
            <div className="flex items-center gap-4 mb-10 shrink-0">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary stroke-[1.5]" />
                </div>
                <h2 className="text-2xl font-serif text-gray-900">{section.distance}</h2>
            </div>

            <div className="flex flex-col flex-1 min-h-0">
                <div className="space-y-8 flex-1">
                    {visiblePlaces.map((place, i) => {
                        const originalIndex =
                            needsCardExpand && !isCardExpanded ? i : section.places.indexOf(place);
                        const resolvedItemId = `${sectionIdx}-${originalIndex}`;

                        return (
                            <AttractionPlaceItem
                                key={resolvedItemId}
                                place={place}
                                itemId={resolvedItemId}
                                isExpanded={expandedPlaceId === resolvedItemId}
                                onToggle={onTogglePlace}
                            />
                        );
                    })}
                </div>

                <div
                    className={cn(
                        "mt-auto shrink-0 w-full pt-5 mt-8 min-h-[52px] flex items-center justify-center",
                        needsCardExpand ? "border-t border-gray-200" : "border-t border-transparent"
                    )}
                >
                    {needsCardExpand && (
                        <button
                            type="button"
                            onClick={() => onToggleCard(sectionIdx)}
                            aria-expanded={isCardExpanded}
                            className="w-full flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-semibold text-primary hover:text-gray-900 transition-colors cursor-pointer"
                        >
                            {isCardExpanded ? (
                                <>Show Less<ChevronDown className="w-4 h-4 rotate-180 transition-transform" /></>
                            ) : (
                                <>
                                    View {hiddenCount} More
                                    <ChevronDown className="w-4 h-4 transition-transform" />
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
function AttractionPlaceItem({
    place,
    itemId,
    isExpanded,
    onToggle,
}: {
    place: AttractionPlace;
    itemId: string;
    isExpanded: boolean;
    onToggle: (id: string) => void;
}) {
    return (
        <div className="group pl-6 border-l-2 border-gray-200 hover:border-primary transition-colors duration-500">
            <button
                type="button"
                onClick={() => onToggle(itemId)}
                aria-expanded={isExpanded}
                className="w-full text-left cursor-pointer min-w-0"
            >
                <h3 className="font-serif text-xl text-gray-800 group-hover:text-primary transition-colors leading-snug break-words">
                    {place.name}
                </h3>
                <div className="mt-1.5 flex items-center justify-end gap-1.5">
                    <span className="text-xs font-semibold tracking-widest text-primary uppercase whitespace-nowrap">
                        {place.km}
                    </span>
                    <ChevronDown
                        className={cn(
                            "w-4 h-4 shrink-0 text-gray-400 group-hover:text-primary transition-all duration-300",
                            isExpanded && "rotate-180 text-primary"
                        )}
                    />
                </div>
                <p
                    className={cn(
                        "mt-2 text-gray-600 font-light leading-relaxed transition-all duration-300",
                        !isExpanded && "line-clamp-1"
                    )}
                >
                    {place.desc}
                </p>
            </button>
        </div>
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
    const [expandedPlaceId, setExpandedPlaceId] = useState<string | null>(null);
    const [expandedCardIdx, setExpandedCardIdx] = useState<number | null>(null);
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    const handleTogglePlace = (id: string) => {
        setExpandedPlaceId((current) => (current === id ? null : id));
    };

    const handleToggleCard = (idx: number) => {
        setExpandedCardIdx((current) => (current === idx ? null : idx));
        setExpandedPlaceId(null);
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            {/* ── Hero ── */}
            <section ref={heroRef} className="relative h-[65vh] flex items-end overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-0 z-0">
                    <Image src={`/${hotel.imagePrefix}-nearby-attractions/location3.webp`} alt="Nearby Attractions" fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/50 to-transparent" />
                </motion.div>
                <div className="container relative z-10 px-6 pb-16">
                    <motion.p variants={heroTagline} initial="hidden" animate="visible"
                        className="inline-block bg-primary text-white px-4 py-1.5 rounded-sm uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-6 shadow-xl border border-white/10"
                    >
                        Explore Wonders
                    </motion.p>
                    <div className="overflow-hidden pb-1">
                        <motion.h1 variants={heroTitlePopup} initial="hidden" animate="visible" className="text-5xl md:text-8xl font-serif leading-none">Nearby Attractions</motion.h1>
                    </div>
                    <motion.div variants={lineWipe} initial="hidden" animate="visible" className="h-[3px] w-40 bg-primary mt-2" />
                </div>
            </section>

            {/* ── Attractions ── */}
            <section className="py-20 md:py-32 bg-white">
                <div className="container px-6 max-w-7xl mx-auto">
                    <motion.div
                        variants={galleryContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: "-50px" }}
                        className={cn(
                            "grid sm:grid-cols-2 gap-8",
                            expandedCardIdx === null ? "items-stretch" : "items-start",
                            attractions.length === 3
                                ? "lg:grid-cols-3"
                                : "xl:grid-cols-4"
                        )}
                    >
                        {attractions.map((section, idx) => (
                            <AttractionSectionCard
                                key={idx}
                                section={section}
                                sectionIdx={idx}
                                expandedPlaceId={expandedPlaceId}
                                expandedCardIdx={expandedCardIdx}
                                onTogglePlace={handleTogglePlace}
                                onToggleCard={handleToggleCard}
                            />
                        ))}
                    </motion.div>
                </div>
            </section>


        </div>
    );
}
