import { notFound } from "next/navigation";
import { HotelProvider } from "@/lib/hotelContext";
import { HOTELS, HotelId } from "@/lib/hotelData";

export default async function HotelLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ hotel: string }>;
}) {
    const { hotel } = await params;

    const hotelId = hotel.replace("-hotel", "") as HotelId;

    if (!HOTELS[hotelId]) {
        notFound();
    }

    return <HotelProvider hotel={hotelId}>{children}</HotelProvider>;
}
