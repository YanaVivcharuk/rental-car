import { notFound } from "next/navigation";
import { api } from "@/services/api";
import { Car } from "@/types/car";
import CarDetails from "./CarDetails";

interface CarDetailPageProps {
  params: { id: string };
}

async function getCarById(id: string): Promise<Car | null> {
  try {
    const response = await api.get(`cars/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching car:", error);
    return null;
  }
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = await getCarById(id);

  if (!car) return notFound();
  return <CarDetails vehicle={car} />;
}
