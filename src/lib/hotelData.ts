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
    /** CSS object-position keeping the building in frame when the hero crops */
    heroPosition: string;
    heroPositionMobile: string;
    galleryHeroImage: string;
    galleryHeroPosition: string;
    amenitiesHeroImage: string;
    amenitiesHeroPosition: string;
    aboutImage: string;
    aboutHeroImage: string;
    aboutHeroImageMobile: string;
    aboutHeroPosition: string;
    aboutHeroPositionMobile: string;
    aboutImageRight: string;
    aboutImageRightPosition: string;
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
        heroImage: "/Erattupetta/erattupetta-gallery/FACADE/ABSM-96.webp",
        heroImageMobile: "/Erattupetta/erattupetta-gallery/FACADE/ABSM-95.webp",
        heroPosition: "center 40%",
        heroPositionMobile: "22% center",
        galleryHeroImage: "/Erattupetta/erattupetta-executive-room/ABSM-15.webp",
        galleryHeroPosition: "40% 70%",
        amenitiesHeroImage: "/Erattupetta/erattupetta-gallery/RECEPTION/ABSM-50.webp",
        amenitiesHeroPosition: "50% 60%",
        aboutImage: "/Erattupetta/erattupetta-gallery/FACADE/ABSM-93.webp",
        aboutHeroImage: "/Erattupetta/erattupetta-gallery/FACADE/ABSM-97.webp",
        aboutHeroImageMobile: "/Erattupetta/erattupetta-gallery/FACADE/ABSM-99.webp",
        aboutHeroPosition: "center 40%",
        aboutHeroPositionMobile: "center center",
        aboutImageRight: "/Erattupetta/erattupetta-gallery/FACADE/ABSM-94.webp",
        aboutImageRightPosition: "center center",
        basePath: "/erattupetta-hotel",
        imagePrefix: "Erattupetta/erattupetta",
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
        heroImage: "/Poonjar/poonjar-gallery/FACADE/ABSM-73 copy.webp",
        heroImageMobile: "/Poonjar/poonjar-gallery/FACADE/ABSM-73 copy.webp",
        heroPosition: "center 45%",
        heroPositionMobile: "47% center",
        galleryHeroImage: "/Poonjar/poonjar-standard-room/ROOM2/ABSM-78.webp",
        galleryHeroPosition: "55% 60%",
        amenitiesHeroImage: "/Poonjar/poonjar-gallery/RECEPTION/ABSM-71.webp",
        amenitiesHeroPosition: "40% 60%",
        aboutImage: "/Poonjar/poonjar-gallery/FACADE/ABSM-77.webp",
        aboutHeroImage: "/Poonjar/poonjar-gallery/FACADE/ABSM-75.webp",
        aboutHeroImageMobile: "/Poonjar/poonjar-gallery/FACADE/ABSM-73.webp",
        aboutHeroPosition: "center 40%",
        aboutHeroPositionMobile: "40% center",
        aboutImageRight: "/Poonjar/poonjar-gallery/FACADE/ABSM-76.webp",
        aboutImageRightPosition: "45% center",
        basePath: "/poonjar-hotel",
        imagePrefix: "Poonjar/poonjar",
    },
};
