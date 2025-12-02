import { create } from "zustand";


export const useBaseUrlStore = create((set, get) => ({
    baseUrl : "http://localhost:8080/"
}));

//https://consultingserver.onrender.com/