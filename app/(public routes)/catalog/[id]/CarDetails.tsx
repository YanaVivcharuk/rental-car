"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Car } from "@/types/car";
import Image from "next/image";
import { useCarStore } from "@/store/carsStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import styles from "./CarDetails.module.css";
import mainStyles from "@/app/Home.module.css";

type CarDetailsProps = {
  vehicle: Car;
};

type ReservationFormValues = {
  fullName: string;
  userEmail: string;
  startDate: Date | null;
  userComment: string;
};

const reservationFormValidation = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Name must contain at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .required("Name is required"),
  userEmail: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  startDate: Yup.date()
    .nullable()
    .required("Booking date is required")
    .min(new Date(), "Booking date must be in the future"),
  userComment: Yup.string().max(500, "Comment cannot exceed 500 characters"),
});

const CarDetails = ({ vehicle }: CarDetailsProps) => {
  const favorites = useCarStore((state) => state.favorites);
  const addToFavorites = useCarStore((state) => state.addToFavorites);
  const removeFromFavorites = useCarStore((state) => state.removeFromFavorites);

  const formatMileage = (mileage: number): string => {
    return mileage.toLocaleString("uk-UA").replace(/,/g, " ");
  };

  const formatRentalConditions = (
    conditions: string[]
  ): Array<{ label: string; value: string }> => {
    return conditions.map((condition) => {
      const parts = condition.split(":");
      if (parts.length === 2) {
        return { label: parts[0], value: parts[1] };
      }
      return { label: condition, value: "" };
    });
  };

  const handleSubmit = async (
    values: ReservationFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success("Thank you! Your booking request has been received.");
      resetForm();
    } catch (error) {
      toast.error("Error submitting form. Please try again.");
    }
  };

  const rentalConditions = formatRentalConditions(vehicle.rentalConditions);

  const toggleFavorite = () => {
    if (favorites.some((favCar) => favCar.id === vehicle.id)) {
      removeFromFavorites(vehicle.id);
    } else {
      addToFavorites(vehicle);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={mainStyles.container}>
        <div className={styles.content}>
          <div className={styles.leftColumn}>
            <div className={styles.imageSection}>
              <Image
                src={vehicle.img}
                alt={`${vehicle.brand} ${vehicle.model}`}
                width={640}
                height={512}
                className={styles.carImage}
                priority
              />
              <button
                type="button"
                className={styles.favoriteButton}
                onClick={toggleFavorite}
                aria-label="Add to favorites"
                suppressHydrationWarning
              >
                <svg className={styles.favoriteIcon}>
                  <use
                    href={`/symbol-defs.svg#${favorites.some((favCar) => favCar.id === vehicle.id) ? "icon-heart-favorite" : "icon-heart"}`}
                  />
                </svg>
              </button>
            </div>

            <div className={styles.formSection}>
              <h2 className={styles.formTitle}>Book your car now</h2>
              <p className={styles.formSubtitle}>
                Stay connected! We are always ready to assist you.
              </p>
              <Formik
                initialValues={{
                  fullName: "",
                  userEmail: "",
                  startDate: null,
                  userComment: "",
                }}
                validationSchema={reservationFormValidation}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched, setFieldValue, values }) => (
                  <Form className={styles.rentalForm} suppressHydrationWarning>
                    <div className={styles.formGroup}>
                      <Field
                        type="text"
                        name="fullName"
                        placeholder="Full Name*"
                        className={`${styles.formInput} ${errors.fullName && touched.fullName ? styles.inputError : ""}`}
                        suppressHydrationWarning
                      />
                      <ErrorMessage
                        name="fullName"
                        component="div"
                        className={styles.errorMessage}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <Field
                        type="email"
                        name="userEmail"
                        placeholder="Email*"
                        className={`${styles.formInput} ${errors.userEmail && touched.userEmail ? styles.inputError : ""}`}
                        suppressHydrationWarning
                      />
                      <ErrorMessage
                        name="userEmail"
                        component="div"
                        className={styles.errorMessage}
                      />
                    </div>

                    <div className={styles.formGroup} suppressHydrationWarning>
                      <DatePicker
                        selected={values.startDate}
                        onChange={(date) => setFieldValue("startDate", date)}
                        placeholderText="Booking Date*"
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()}
                        className={`${styles.formInput} ${errors.startDate && touched.startDate ? styles.inputError : ""}`}
                      />
                      <ErrorMessage
                        name="startDate"
                        component="div"
                        className={styles.errorMessage}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <Field
                        as="textarea"
                        name="userComment"
                        placeholder="Comment"
                        rows={4}
                        className={`${styles.formInput} ${styles.formTextarea} ${errors.userComment && touched.userComment ? styles.inputError : ""}`}
                      />
                      <ErrorMessage
                        name="userComment"
                        component="div"
                        className={styles.errorMessage}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={styles.submitButton}
                      suppressHydrationWarning
                    >
                      {isSubmitting ? "Sending..." : "Send"}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <h1 className={styles.carTitle}>
              {vehicle.brand}&nbsp;{" "}
              <span className={styles.carModel}>{vehicle.model}</span>,{" "}
              {vehicle.year}
              <span className={styles.carId}>Id: {vehicle.id}</span>
            </h1>

            <div className={styles.carMeta}>
              <div className={styles.metaItem}>
                <svg className={styles.metaIcon}>
                  <use href="/symbol-defs.svg#icon-Location" />
                </svg>
                <span className={styles.metaText}>
                  {vehicle.address.split(",").slice(1).join(",").trim()}
                </span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaText}>
                  Mileage: {formatMileage(vehicle.mileage)} km
                </span>
              </div>
            </div>

            <div className={styles.priceSection}>
              <span className={styles.price}>${vehicle.rentalPrice}</span>
            </div>

            <p className={styles.description}>{vehicle.description}</p>

            <div className={styles.conditionsSection}>
              <h2 className={styles.conditionsTitle}>Rental Conditions:</h2>
              <ul className={styles.conditionsList}>
                {rentalConditions.map((condition, index) => (
                  <li key={index} className={styles.conditionItem}>
                    <svg className={styles.conditionIcon}>
                      <use href="/symbol-defs.svg#icon-check-circle" />
                    </svg>
                    <span className={styles.conditionText}>
                      {condition.label}
                      {condition.value && (
                        <>
                          :{" "}
                          <span className={styles.conditionValue}>
                            {condition.value}
                          </span>
                        </>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <h2 className={styles.specsTitle}>Car Specifications:</h2>
            <ul className={styles.carDetailsList}>
              <li className={styles.detailRow}>
                <svg className={styles.specIcon}>
                  <use href="/symbol-defs.svg#icon-calendar" />
                </svg>
                <span className={styles.detailItem}>Year: {vehicle.year}</span>
              </li>
              <li className={styles.detailRow}>
                <svg className={styles.specIcon}>
                  <use href="/symbol-defs.svg#icon-car" />
                </svg>
                <span className={styles.detailItem}>Type: {vehicle.type}</span>
              </li>
              <li className={styles.detailRow}>
                <svg className={styles.specIcon}>
                  <use href="/symbol-defs.svg#icon-fuel-pump" />
                </svg>
                <span className={styles.detailItem}>
                  Fuel Consumption: {vehicle.fuelConsumption}
                </span>
              </li>
              <li className={styles.detailRow}>
                <svg className={styles.specIcon}>
                  <use href="/symbol-defs.svg#icon-gear" />
                </svg>
                <span className={styles.detailItem}>
                  Engine Size: {vehicle.engineSize}
                </span>
              </li>
            </ul>

            <div className={styles.specsSection}>
              <h2 className={styles.specsTitle}>
                Accessories and functionalities:
              </h2>
              <ul className={styles.specsList}>
                {vehicle.accessories.map((accessory, index) => (
                  <li key={`acc-${index}`} className={styles.specsRow}>
                    <svg className={styles.specIcon}>
                      <use href="/symbol-defs.svg#icon-check-circle" />
                    </svg>
                    <span className={styles.specItem}>{accessory}</span>
                  </li>
                ))}
                {vehicle.functionalities.map((functionality, index) => (
                  <li key={`func-${index}`} className={styles.specsRow}>
                    <svg className={styles.specIcon}>
                      <use href="/symbol-defs.svg#icon-check-circle" />
                    </svg>
                    <span className={styles.specItem}>{functionality}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
