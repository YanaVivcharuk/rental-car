export interface Car {
  id: string;
  model: string;
  year: number;
  img: string;
  price: number;
  mileage: number;
  address: string;
  type: string;
  fuelConsumption: string;
}
export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string; // можно использовать number
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string; // можно использовать number
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  mileage: number;
}

export type CarsResponse = {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
};
