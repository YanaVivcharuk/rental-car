import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CarStore } from "@/types/carsStore";
import { Car } from "@/types/car";

export const initialFilters = {
  brand: "",
  rentalPrice: "",
  minMileage: "",
  maxMileage: "",
};

export const useCarStore = create<CarStore>()(
  persist(
    (set) => {
      return {
        cars: [],
        addCars: (cars: Car[]) =>
          set((state) => ({ cars: [...state.cars, ...cars] })),
        removeCars: () => set({ cars: [] }),
        filters: initialFilters,
        editFilters: (filters: Partial<CarStore["filters"]>) =>
          set((state) => ({ filters: { ...state.filters, ...filters } })),
        removeFilters: () => set({ filters: initialFilters }),
        favorites: [],
        addToFavorites: (car: Car) =>
          set((state) => ({ favorites: [...state.favorites, car] })),
        removeFromFavorites: (carId: string) =>
          set((state) => ({
            favorites: state.favorites.filter((car) => car.id !== carId),
          })),
      };
    },
    {
      name: "car-store",
      partialize: (state) => ({
        favorites: state.favorites,
        filters: state.filters,
      }),
    }
  )
);
