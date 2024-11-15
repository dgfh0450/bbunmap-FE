import { TypesOnAirPlace } from "@/app/(main)/(routes)/onAir/onAir";
import { create } from "zustand";


type PlaceModalStore = {
    isPlaceModalOpen: boolean;
    setIsPlaceModalOpen: (modalOpen: boolean) => void;
    resetPlaceModal: () => void;
    selectedPlace: TypesOnAirPlace;
    setSelectedPlace: (data: TypesOnAirPlace) => void;
}

export const useOnAirModal = create<PlaceModalStore>((set) => ({
    isPlaceModalOpen: false,
    setIsPlaceModalOpen: (state) => set({ isPlaceModalOpen: state }),
    resetPlaceModal: () => set((state) => ({ isPlaceModalOpen: !state, selectedPlace: { placeType: '', buildingName: '', placeName: '', vote: 50, floor: '', result: 0, like: false } })),
    selectedPlace: { placeType: '', buildingName: '', placeName: '', vote: 50, floor: '', result: 0, like: false },
    setSelectedPlace: (place) => set({ selectedPlace: place })
}))