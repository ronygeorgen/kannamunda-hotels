export type RoomCategory =
    | "Deluxe room"
    | "Executive room"
    | "Single Room"
    | "Standard room"
    | "non AC double room"
    | null;

export interface GalleryImage {
    src: string;
    alt: string;
    /** Folder / section label shown in the gallery */
    section: string;
    /** Booking dropdown value when Book This Room is clicked */
    category: RoomCategory;
    /** Bathroom shots: listed last and never show Book This Room */
    isBathroom?: boolean;
}

export interface GallerySection {
    id: string;
    label: string;
    images: GalleryImage[];
}

function files(
    base: string,
    section: string,
    category: RoomCategory,
    names: string[],
    altPrefix?: string
): GalleryImage[] {
    return names.map((name) => ({
        src: `${base}/${name}`,
        alt: altPrefix ? `${altPrefix} — ${name.replace(/\.webp$/i, "")}` : `${section} — ${name.replace(/\.webp$/i, "")}`,
        section,
        category,
        isBathroom: /-bathroom\.webp$/i.test(name),
    }));
}

function bathroomsLast(images: GalleryImage[]): GalleryImage[] {
    return [...images.filter((i) => !i.isBathroom), ...images.filter((i) => i.isBathroom)];
}

/** Erattupetta: filters by space + room category (not room numbers) */
function buildErattupettaGallery(): GallerySection[] {
    const e = "/Erattupetta";
    const g = e + "/erattupetta-gallery";
    const room8 = ["ABSM-41.webp", "ABSM-42.webp", "ABSM-43.webp", "ABSM-44-bathroom.webp"] as const;

    return [
        {
            id: "facade",
            label: "Facade",
            images: files(g + "/FACADE", "Facade", null, [
                "ABSM-93.webp", "ABSM-94.webp", "ABSM-95.webp", "ABSM-96.webp",
                "ABSM-97.webp", "ABSM-98.webp", "ABSM-99.webp",
            ]),
        },
        {
            id: "reception",
            label: "Reception",
            images: files(g + "/RECEPTION", "Reception", null, [
                "ABSM-104.webp", "ABSM-50.webp", "ABSM-51.webp", "ABSM-52.webp",
            ]),
        },
        {
            id: "lobby",
            label: "Lobby",
            images: files(g + "/LOBBY", "Lobby", null, [
                "ABSM-34.webp", "ABSM-35.webp", "ABSM-37.webp",
                "ABSM-45.webp", "ABSM-47.webp", "ABSM-48.webp",
            ]),
        },
        {
            id: "corridor",
            label: "Corridor",
            images: files(g + "/CORRIDOR", "Corridor", null, [
                "ABSM-36.webp", "ABSM-46.webp", "ABSM-49.webp", "ABSM-53.webp",
            ]),
        },
        {
            id: "deluxe-room",
            label: "Deluxe room",
            images: bathroomsLast([
                ...files(e + "/erattupetta-deluxe-room/ROOM1", "Deluxe room", "Deluxe room", [
                    "ABSM-4.webp", "ABSM-5.webp", "ABSM-6.webp",
                    "ABSM-7.webp", "ABSM-8-bathroom.webp", "ABSM-9-bathroom.webp",
                ]),
                ...files(e + "/erattupetta-deluxe-room/ROOM2", "Deluxe room", "Deluxe room", [
                    "ABSM-10.webp", "ABSM-11.webp", "ABSM-12.webp",
                    "ABSM-13.webp", "ABSM-14.webp", "ABSM-3-bathroom.webp",
                ]),
                ...files(e + "/erattupetta-deluxe-room/ROOM4", "Deluxe room", "Deluxe room", [
                    "ABSM-23.webp", "ABSM-24.webp", "ABSM-25.webp", "ABSM-26-bathroom.webp",
                ]),
                ...files(e + "/erattupetta-deluxe-room/ROOM5", "Deluxe room", "Deluxe room", [
                    "ABSM-27.webp", "ABSM-28.webp", "ABSM-29.webp",
                ]),
                ...files(e + "/erattupetta-deluxe-room/ROOM7", "Deluxe room", "Deluxe room", [
                    "ABSM-38.webp", "ABSM-39.webp", "ABSM-40.webp",
                ]),
            ]),
        },
        {
            id: "executive-room",
            label: "Executive room",
            images: bathroomsLast(files(e + "/erattupetta-executive-room", "Executive room", "Executive room", [
                "ABSM-15.webp", "ABSM-16.webp", "ABSM-17.webp", "ABSM-18.webp",
                "ABSM-19.webp", "ABSM-20.webp", "ABSM-21.webp", "ABSM-22.webp",
                "ABSM-1-bathroom.webp", "ABSM-2-bathroom.webp", "DSC01331e-bathroom.webp",
            ])),
        },
        {
            id: "single-room",
            label: "Single Room",
            images: bathroomsLast(files(e + "/erattupetta-single-room/ROOM6", "Single Room", "Single Room", [
                "ABSM-30.webp", "ABSM-31.webp", "ABSM-32.webp", "ABSM-33-bathroom.webp",
            ])),
        },
        {
            id: "standard-room",
            label: "Standard room",
            images: bathroomsLast(files(e + "/erattupetta-standard-room/ROOM8", "Standard room", "Standard room", [...room8])),
        },
        {
            id: "non-ac-double-room",
            label: "non AC double room",
            images: bathroomsLast(files(e + "/erattupetta-non-ac-double-room/ROOM8", "non AC double room", "non AC double room", [...room8])),
        },
        {
            id: "extra-bathroom",
            label: "Extra Bathroom",
            images: files(g + "/EXTRA BATHRROM", "Extra Bathroom", null, [
                "DSC01367e2.webp", "DSC01599e.webp",
            ]),
        },
    ];
}

/** Poonjar: filters by space + room category (not room numbers) */
function buildPoonjarGallery(): GallerySection[] {
    const p = "/Poonjar";
    const g = p + "/poonjar-gallery";

    return [
        {
            id: "facade",
            label: "Facade",
            images: files(g + "/FACADE", "Facade", null, [
                "ABSM-73.webp", "ABSM-74.webp", "ABSM-75.webp", "ABSM-76.webp", "ABSM-77.webp",
            ]),
        },
        {
            id: "reception",
            label: "Reception",
            images: files(g + "/RECEPTION", "Reception", null, [
                "ABSM-70.webp", "ABSM-71.webp", "ABSM-72.webp",
            ]),
        },
        {
            id: "corridor",
            label: "Corridor",
            images: files(g + "/CORRIDOR", "Corridor", null, [
                "ABSM-68.webp", "ABSM-69.webp",
            ]),
        },
        {
            id: "deluxe-room",
            label: "Deluxe room",
            images: bathroomsLast(files(p + "/poonjar-deluxe-room/ROOM1", "Deluxe room", "Deluxe room", [
                "ABSM-85.webp", "ABSM-86.webp", "ABSM-87.webp", "ABSM-88.webp",
                "ABSM-89.webp", "ABSM-92.webp", "ABSM-90-bathroom.webp", "ABSM-91-bathroom.webp",
            ])),
        },
        {
            id: "standard-room",
            label: "Standard room",
            images: bathroomsLast(files(p + "/poonjar-standard-room/ROOM2", "Standard room", "Standard room", [
                "ABSM-78.webp", "ABSM-79.webp", "ABSM-80.webp", "ABSM-81.webp",
                "ABSM-82.webp", "ABSM-83.webp", "ABSM-84.webp",
                "ABSM-66-bathroom.webp", "ABSM-67-bathroom.webp",
            ])),
        },
        {
            id: "non-ac-double-room",
            label: "non AC double room",
            images: bathroomsLast([
                ...files(p + "/poonjar-non-ac-double-room/ROOM3", "non AC double room", "non AC double room", [
                    "ABSM-55.webp", "ABSM-56.webp", "ABSM-57.webp",
                    "ABSM-58.webp", "ABSM-59.webp", "ABSM-54-bathroom.webp",
                ]),
                ...files(p + "/poonjar-non-ac-double-room/ROOM4", "non AC double room", "non AC double room", [
                    "ABSM-60.webp", "ABSM-61.webp", "ABSM-62.webp",
                    "ABSM-63.webp", "ABSM-64.webp", "ABSM-65-bathroom.webp",
                ]),
            ]),
        },
    ];
}

/** sessionStorage key holding the gallery filter + scroll to restore after returning from a room page */
export function galleryReturnKey(hotelId: "erattupetta" | "poonjar"): string {
    return `gallery-return:${hotelId}`;
}

export function getGallerySections(hotelId: "erattupetta" | "poonjar"): GallerySection[] {
    return hotelId === "poonjar" ? buildPoonjarGallery() : buildErattupettaGallery();
}

export function flattenGalleryImages(sections: GallerySection[]): GalleryImage[] {
    return sections.flatMap((s) => s.images);
}

export const ERATTUPETTA_ROOM_OPTIONS = [
    "Deluxe room",
    "Executive room",
    "Single Room",
    "Standard room",
    "non AC double room",
] as const;

export const POONJAR_ROOM_OPTIONS = [
    "Deluxe room",
    "Standard room",
    "non AC double room",
] as const;

export function getRoomOptions(hotelId: "erattupetta" | "poonjar"): readonly string[] {
    return hotelId === "poonjar" ? POONJAR_ROOM_OPTIONS : ERATTUPETTA_ROOM_OPTIONS;
}

export type RoomFeatureId =
    | "ac"
    | "non-ac"
    | "tv"
    | "hot-water"
    | "kettle"
    | "wifi"
    | "wardrobe"
    | "private-bath"
    | "towels"
    | "room-service"
    | "double-bed"
    | "single-bed"
    | "work-desk"
    | "premium-furnishings";

export interface RoomCategoryInfo {
    category: Exclude<RoomCategory, null>;
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    /** false only for explicitly non-AC categories */
    isAc: boolean;
    features: RoomFeatureId[];
}

const SHARED_ROOM_FEATURES: RoomFeatureId[] = [
    "tv",
    "hot-water",
    "kettle",
    "wifi",
    "wardrobe",
    "private-bath",
    "towels",
    "room-service",
];

const ROOM_CATEGORY_INFO: Record<Exclude<RoomCategory, null>, RoomCategoryInfo> = {
    "Deluxe room": {
        category: "Deluxe room",
        slug: "deluxe-room",
        title: "Deluxe Room",
        subtitle: "Spacious comfort with full amenities",
        description:
            "A well-appointed deluxe stay with air conditioning, entertainment, and thoughtful in-room comforts for a restful visit.",
        isAc: true,
        features: ["ac", "double-bed", ...SHARED_ROOM_FEATURES, "work-desk"],
    },
    "Executive room": {
        category: "Executive room",
        slug: "executive-room",
        title: "Executive Room",
        subtitle: "Elevated space for a refined stay",
        description:
            "Our executive rooms offer a more premium layout with air conditioning and the full set of comforts for business or leisure.",
        isAc: true,
        features: ["ac", "double-bed", ...SHARED_ROOM_FEATURES, "work-desk", "premium-furnishings"],
    },
    "Single Room": {
        category: "Single Room",
        slug: "single-room",
        title: "Single Room",
        subtitle: "Ideal for the solo traveller",
        description:
            "A cosy air-conditioned single room with essential comforts — TV, hot water, kettle, and more — sized for one guest.",
        isAc: true,
        features: ["ac", "single-bed", ...SHARED_ROOM_FEATURES],
    },
    "Standard room": {
        category: "Standard room",
        slug: "standard-room",
        title: "Standard Room",
        subtitle: "Classic AC comfort, everyday ease",
        description:
            "A comfortable air-conditioned standard room with TV, hot water, kettle, WiFi, and private bath — everything you need for a smooth stay.",
        isAc: true,
        features: ["ac", "double-bed", ...SHARED_ROOM_FEATURES],
    },
    "non AC double room": {
        category: "non AC double room",
        slug: "non-ac-double-room",
        title: "Non AC Double Room",
        subtitle: "Double occupancy without air conditioning",
        description:
            "A practical double room without AC, still equipped with TV, hot water, kettle, WiFi, and private bathroom facilities.",
        isAc: false,
        features: ["non-ac", "double-bed", ...SHARED_ROOM_FEATURES],
    },
};

export function categoryToSlug(category: Exclude<RoomCategory, null>): string {
    return ROOM_CATEGORY_INFO[category].slug;
}

export function getRoomCategoryBySlug(slug: string): RoomCategoryInfo | null {
    return Object.values(ROOM_CATEGORY_INFO).find((c) => c.slug === slug) ?? null;
}

export function getRoomCategoryInfo(category: Exclude<RoomCategory, null>): RoomCategoryInfo {
    return ROOM_CATEGORY_INFO[category];
}

/** All gallery images for a booking category. */
export function getImagesForCategory(
    hotelId: "erattupetta" | "poonjar",
    category: Exclude<RoomCategory, null>
): GalleryImage[] {
    return flattenGalleryImages(getGallerySections(hotelId)).filter(
        (img) => img.category === category
    );
}
