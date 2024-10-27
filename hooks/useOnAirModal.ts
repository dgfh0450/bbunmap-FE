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
    resetPlaceModal: () => set((state) => ({ isPlaceModalOpen: !state, selectedPlace: { id: -1, placeType: '', buildingName: '', placeName: '', vote: 50, floor: '' } })),
    selectedPlace: { id: -1, placeType: '', buildingName: '', placeName: '', vote: 50, floor: '' },
    setSelectedPlace: (place) => set({ selectedPlace: place })
}))