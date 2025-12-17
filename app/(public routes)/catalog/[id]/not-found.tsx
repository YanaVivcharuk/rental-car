import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>Car Not Found</h2>
      <p className={styles.description}>
        Sorry, the car you are looking for does not exist or has been removed.
      </p>
      <Link href="/catalog" className={styles.backLink}>
        Back to Catalog
      </Link>
    </div>
  );
}
