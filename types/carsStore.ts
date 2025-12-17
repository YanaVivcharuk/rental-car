import { Car } from "@/types/car";

export type CarStore = {
  cars: Car[];
  addCars: (cars: Car[]) => void;
  removeCars: () => void;
  filters: {
    brand: string;
    rentalPrice: string;
    minMileage: string;
    maxMileage: string;
  };
  editFilters: (filters: Partial<CarStore["filters"]>) => void;
  removeFilters: () => void;
  favorites: Car[];
  addToFavorites: (car: Car) => void;
  removeFromFavorites: (carId: string) => void;
};
