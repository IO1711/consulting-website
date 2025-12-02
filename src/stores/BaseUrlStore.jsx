import { create } from "zustand";


export const useBaseUrlStore = create((set, get) => ({
    baseUrl : "https://consultingserver.onrender.com/"
}));

//https://consultingserver.onrender.com/
//http://localhost:8080/