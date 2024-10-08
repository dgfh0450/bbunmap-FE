import { create } from "zustand";

export type OnAirPlace = { building: string, place: string, rating: number }

type PlaceModalStore = {
    isPlaceModalOpen: boolean;
    setIsPlaceModalOpen: (modalOpen: boolean) => void;
    resetPlaceModal: () => void;
    selectedPlace: OnAirPlace;
    setSelectedPlace: (data: OnAirPlace) => void;
}

export const useOnAirModal = create<PlaceModalStore>((set) => ({
    isPlaceModalOpen: false,
    setIsPlaceModalOpen: (state) => set({ isPlaceModalOpen: state }),
    resetPlaceModal: () => set((state) => ({ isPlaceModalOpen: !state, selectedPlace: { building: '', place: '', rating: 50 } })),
    selectedPlace: { building: '', place: '', rating: 50 },
    setSelectedPlace: (place) => set({ selectedPlace: place })
}))