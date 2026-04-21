export type HotelId = "erattupetta" | "poonjar";

export interface HotelConfig {
    id: HotelId;
    name: string;
    fullName: string;
    tagline: string;
    location: string;
    address: string;
    phones: string[];
    email?: string;
    mapQuery: string;
    heroImage: string;
    heroImageMobile: string;
    aboutImage: string;
    aboutImageRight: string;
    basePath: string;
    /** Image folder prefix used for gallery, amenities, etc. */
    imagePrefix: string;
}

export const HOTELS: Record<HotelId, HotelConfig> = {
    erattupetta: {
        id: "erattupetta",
        name: "Erattupetta",
        fullName: "Kannamundayil Residency — Erattupetta",
        tagline: "Erattupetta • Kottayam • Kerala",
        location: "Erattupetta, Kottayam",
        address: "Kannamundayil Arcade, Pala Road, Erattupetta, Kerala — 686 121",
        phones: ["+91 94471 31750", "+91 94471 89362"],
        email: "info@kannamundaresidency.com",
        mapQuery: "Kannnamundayil+Arcade+Pala+Road+Erattupetta+Kerala",
        heroImage: "/erattupetta-home/home-hero-section-landscape.webp",
        heroImageMobile: "/erattupetta-destination/kannamunda-main-building.webp",
        aboutImage: "/erattupetta-home/home-image-2.webp",
        aboutImageRight: "/erattupetta-about/about-us-right-image.webp",
        basePath: "/erattupetta-hotel",
        imagePrefix: "erattupetta",
    },
    poonjar: {
        id: "poonjar",
        name: "Poonjar",
        fullName: "Kannamundayil Residency — Poonjar",
        tagline: "Poonjar • Kottayam • Kerala",
        location: "Poonjar, Kottayam",
        address: "Kannamundayil Arcade, Opp. CMI Church, Poonjar, Kerala",
        phones: ["+91 94471 07950", "+91 94471 89362"],
        mapQuery: "Kannamundayil+Residency+Poonjar+Kerala",
        heroImage: "/poonjar-home/poonjar-kannamunda-edited.webp",
        heroImageMobile: "/poonjar-destination/kannamunda-main-building.webp",
        aboutImage: "/poonjar-home/home-image-2.webp",
        aboutImageRight: "/poonjar-about/about-us-right-image.webp",
        basePath: "/poonjar-hotel",
        imagePrefix: "poonjar",
    },
};
