import { create } from "zustand";

type PlaceModalStore = {
    isPlaceModalOpen: boolean;
    setIsPlaceModalOpen: (modalOpen: boolean) => void;
    handlePlaceModalOpen: () => void;
    selectedPlace: { building: string, place: string, value: number };
    setSelectedPlace: (data: { building: string, place: string, value: number }) => void;
}

export const useOnAirModal = create<PlaceModalStore>((set) => ({
    isPlaceModalOpen: false,
    setIsPlaceModalOpen: (state) => set({ isPlaceModalOpen: !state }),
    handlePlaceModalOpen: () => set((state) => ({ isPlaceModalOpen: !state.isPlaceModalOpen })),
    selectedPlace: { building: '', place: '', value: 50 },
    setSelectedPlace: (place) => set({ selectedPlace: place })
}))