import { create } from "zustand";
import { persist } from "zustand/middleware";

type state = {
    [key: string]: any;
}

type StateBeforeLogin = {
    isSaving: boolean;
    setIsSaving: (isSaving: boolean) => void;
    state: state
    setState: (state: state) => void;
    resetState: () => void;
};

export const useStoreLoginState = create<StateBeforeLogin>()(persist(
    (set) => ({
        isSaving: false,
        setIsSaving: (isSaving) => { set(() => ({ isSaving: isSaving })) },
        state: {},
        setState: (state) => set(() => ({ state: state })),
        resetState: () => set(() => ({ isSaving: false, state: {} }))
    }),
    { name: 'state-before-login' }
));
