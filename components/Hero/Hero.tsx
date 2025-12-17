import React from "react";
import Link from "next/link";
import css from "../../app/Home.module.css";
import style from "./Hero.module.css";

const Hero: React.FC = () => {
  return (
    <section className={style.section} id="hero" aria-label="Hero section">
      <div className={style.backgroundImage} aria-hidden="true"></div>
      <div className={css.container}>
        <div className={style.content}>
          <h1 className={style.title}>Find your perfect rental car</h1>
          <p className={style.description}>
            Reliable and budget-friendly rentals for any journey
          </p>
          <Link
            className={style.button}
            href="/catalog"
            aria-label="View Catalog"
          >
            View Catalog
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
