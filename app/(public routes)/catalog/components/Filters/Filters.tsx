"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { SingleValue } from "react-select";
import { useCarStore } from "@/store/carsStore";
import { fetchBrands } from "@/services/filtersService";
import SelectInput from "@/components/SelectInput/SelectInput";
import styles from "./Filters.module.css";

interface OptionType {
  value: string | null;
  label: string;
}

interface FormValues {
  brand: OptionType;
  price: OptionType;
  mileageFrom: string;
  mileageTo: string;
}

export default function Filters() {
  const setFilters = useCarStore((state) => state.editFilters);

  const [brandOptions, setBrandOptions] = useState<OptionType[]>([
    { value: null, label: "Choose a brand" },
  ]);

  const priceOptions: OptionType[] = [
    { value: null, label: "Choose a price" },
    ...Array.from({ length: 10 }, (_, i) => {
      const price = (i + 1) * 10;
      return {
        value: String(price),
        label: String(price),
      };
    }),
  ];

  useEffect(() => {
    const loadBrands = async () => {
      const brands = await fetchBrands();
      const mapped = [
        { value: null, label: "Choose a brand" },
        ...brands.map((b: string) => ({
          value: b,
          label: b,
        })),
      ];
      setBrandOptions(mapped);
    };

    loadBrands();
  }, []);

  const initialValues: FormValues = {
    brand: brandOptions[0],
    price: priceOptions[0],
    mileageFrom: "",
    mileageTo: "",
  };

  const handleSubmit = (values: FormValues) => {
    setFilters({
      brand: values.brand?.value ?? "",
      rentalPrice: values.price?.value ?? "",
      minMileage: values.mileageFrom || "",
      maxMileage: values.mileageTo || "",
    });
  };

  return (
    <div className={styles.filtersWrapper}>
      <h3>Filters</h3>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form className={styles.form}>
            <div className={styles.selectWrapper}>
              <label>Car brand</label>
              <SelectInput
                options={brandOptions}
                value={values.brand}
                onChange={(opt: SingleValue<OptionType>) =>
                  opt && setFieldValue("brand", opt)
                }
                instanceId="brand"
              />
            </div>

            <div className={styles.selectWrapper}>
              <label>Price / hour</label>
              <SelectInput
                options={priceOptions}
                value={values.price}
                onChange={(opt: SingleValue<OptionType>) =>
                  opt && setFieldValue("price", opt)
                }
                instanceId="price"
              />
            </div>

            <div className={styles.inputWrapper}>
              <label>Car mileage / km</label>

              <Field
                type="number"
                name="mileageFrom"
                placeholder="From"
                className={styles.input}
                suppressHydrationWarning
              />

              <Field
                type="number"
                name="mileageTo"
                placeholder="To"
                className={styles.input}
                suppressHydrationWarning
              />
            </div>

            <button
              type="submit"
              className={styles.searchButton}
              suppressHydrationWarning
            >
              Search
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
