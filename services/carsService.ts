import { CarSearchParams } from "@/types/filters";
import { Car } from "@/types/car";
import { api } from "./api";

interface FetchCarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

interface FetchCarsParams {
  page: string;
  limit: string;
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
}

export default async function fetchCars(
  filters: CarSearchParams,
  page: number = 1
): Promise<FetchCarsResponse> {
  const params: FetchCarsParams = {
    page: String(page),
    limit: "12",
    ...(filters.brand && { brand: filters.brand }),
    ...(filters.price && { rentalPrice: String(filters.price) }),
    ...(filters.mileage?.from && { minMileage: String(filters.mileage.from) }),
    ...(filters.mileage?.to && { maxMileage: String(filters.mileage.to) }),
  };

  try {
    const response = await api.get("cars", { params });
    return {
      cars: response.data.cars || [],
      totalCars: response.data.totalCars || 0,
      page: response.data.page || page,
      totalPages: response.data.totalPages || 0,
    };
  } catch (error) {
    console.error("Error fetching cars:", error);
    return {
      cars: [],
      totalCars: 0,
      page,
      totalPages: 0,
    };
  }
}
