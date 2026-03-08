import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const getSessionStorage = () => {
    if (typeof window === "undefined") {
        return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
        };
    }

    return window.sessionStorage;
};

export const useAuthStore = create(
    persist(
        (set) => ({
            token: "",
            hasHydrated: false,
            login: (authToken) => set({ token: authToken }),
            logout: () => set({ token: "" }),
            setHasHydrated: (value) => set({ hasHydrated: value }),
        }),
        {
            name: "auth-session",
            storage: createJSONStorage(getSessionStorage),
            partialize: (state) => ({ token: state.token }),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);
