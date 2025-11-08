import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
    token: "",
    login: (authToken) => set((state) => {
        return {token: authToken}
    })
}));