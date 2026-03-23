"use client";

import React, { createContext, useContext } from "react";

import { HOTELS, HotelId, HotelConfig } from "./hotelData";
export type { HotelId, HotelConfig };
export { HOTELS };

const HotelContext = createContext<HotelConfig>(HOTELS.erattupetta);

export function HotelProvider({
    children,
    hotel,
}: {
    children: React.ReactNode;
    hotel: HotelId;
}) {
    return (
        <HotelContext.Provider value={HOTELS[hotel]}>
            {children}
        </HotelContext.Provider>
    );
}

export function useHotel() {
    return useContext(HotelContext);
}
