export interface MileageFilter {
  from?: number | null;
  to?: number | null;
}

export interface CarFilters {
  brand?: string | null;
  price?: string | null;
  mileage?: MileageFilter | null;
}

export interface CarSearchParams extends CarFilters {
  page?: number;
}
