"use client";

import { useEffect, useState } from "react";
import { useCarStore } from "@/store/carsStore";
import fetchCars from "@/services/carsService";
import Filters from "./components/Filters/Filters";
import CarList from "./components/CarList/CarList";
import Loader from "@/components/Loader/Loader";

export default function CatalogClientPage() {
  const cars = useCarStore((state) => state.cars);
  const filters = useCarStore((state) => state.filters);
  const addCars = useCarStore((state) => state.addCars);
  const removeCars = useCarStore((state) => state.removeCars);

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  // Load initial cars when filters change
  useEffect(() => {
    let isCancelled = false;

    const loadCars = async () => {
      setIsLoading(true);
      removeCars();
      setPage(1);

      const response = await fetchCars(
        {
          brand: filters.brand || null,
          price: filters.rentalPrice || null,
          mileage: {
            from: filters.minMileage ? Number(filters.minMileage) : null,
            to: filters.maxMileage ? Number(filters.maxMileage) : null,
          },
        },
        1
      );

      if (!isCancelled) {
        addCars(response.cars);
        setHasNextPage(response.page < response.totalPages);
        setIsLoading(false);
      }
    };

    loadCars();

    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.brand,
    filters.rentalPrice,
    filters.minMileage,
    filters.maxMileage,
  ]);

  const fetchNextPage = async () => {
    if (!hasNextPage || isFetchingNextPage) return;

    setIsFetchingNextPage(true);
    const nextPage = page + 1;

    const response = await fetchCars(
      {
        brand: filters.brand || null,
        price: filters.rentalPrice || null,
        mileage: {
          from: filters.minMileage ? Number(filters.minMileage) : null,
          to: filters.maxMileage ? Number(filters.maxMileage) : null,
        },
      },
      nextPage
    );

    addCars(response.cars);
    setPage(nextPage);
    setHasNextPage(response.page < response.totalPages);
    setIsFetchingNextPage(false);
  };

  return (
    <>
      {isLoading && <Loader />}
      <Filters />
      <CarList
        cars={cars}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        isLoading={isLoading}
      />
    </>
  );
}
