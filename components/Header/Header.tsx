"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import css from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <div className={css.container}>
        {/* LOGO */}
        <Link href="/" className={css.logo}>
          Rental<span>Car</span>
        </Link>

        {/* NAVIGATION */}
        <nav className={css.nav}>
          <ul>
            <li>
              <Link href="/" className={pathname === "/" ? css.active : ""}>
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/catalog"
                className={pathname.startsWith("/catalog") ? css.active : ""}
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
