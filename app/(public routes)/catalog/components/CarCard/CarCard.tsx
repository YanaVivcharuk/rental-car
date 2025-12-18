'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Car } from '@/types/car';
import { useCarStore } from '@/store/carsStore';
import styles from './CarCard.module.css';

interface CarCardProps {
  car: Car;
  priority?: boolean;
}

export default function CarCard({ car, priority = false }: CarCardProps) {
  const favorites = useCarStore(state => state.favorites);
  const addToFavorites = useCarStore(state => state.addToFavorites);
  const removeFromFavorites = useCarStore(state => state.removeFromFavorites);

  const formatMileage = (mileage: number): string => {
    return mileage.toLocaleString('en-US').replace(/,/g, ' ');
  };

  const onClickFavorite = () => {
    if (favorites.some(favCar => favCar.id === car.id)) {
      removeFromFavorites(car.id);
    } else {
      addToFavorites(car);
    }
  };

  return (
    <li className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={car.img}
          alt={`${car.description} ${car.model}`}
          width={274}
          height={268}
          className={styles.image}
        />
        <button
          type="button"
          className={`${styles.favoriteBtn} ${favorites.some(favCar => favCar.id === car.id) ? styles.active : ''}`}
          onClick={onClickFavorite}
          aria-label="Add to favorites"
        >
          <svg className={styles.favoriteIcon}>
            <use
              href={`/symbol-defs.svg#${favorites.some(favCar => favCar.id === car.id) ? 'icon-fillHeart' : 'icon-defaultHeart'}`}
            />
          </svg>
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            {car.brand} <span className={styles.model}>{car.model}</span>,{' '}
            {car.year}
          </h3>
          <span className={styles.price}>${car.rentalPrice}</span>
        </div>

        <ul className={styles.carDetails}>
          <li className={styles.carDetailsItem}>
            {car.address.split(',')[1]?.trim()}
          </li>
          <li className={styles.carDetailsItem}>
            {car.address.split(',')[2]?.trim()}
          </li>
          <li className={styles.carDetailsItem}>{car.rentalCompany}</li>
          <li className={styles.carDetailsItem}>{car.type}</li>
          <li className={styles.carDetailsItem}>{car.model}</li>
          <li className={styles.carDetailsItem}>
            {formatMileage(car.mileage)}
          </li>
          <li className={styles.carDetailsItem}>{car.functionalities?.[0]}</li>
        </ul>

        <Link href={`/catalog/${car.id}`} className={styles.readMoreBtn}>
          Read more
        </Link>
      </div>
    </li>
  );
}
