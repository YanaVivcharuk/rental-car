import type { Metadata } from "next";
import { manrope } from "./fonts";
import { Toaster } from "react-hot-toast";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import "./globals.css";
import css from "@/app/Home.module.css";
import "modern-normalize";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  title: "RentalCar App",
  description:
    "A user-friendly platform for effortless and convenient car rentals.",
  icons: {
    icon: "/favicon.ico.svg",
  },
  openGraph: {
    title: "RentalCar App",
    description:
      "A user-friendly platform for effortless and convenient car rentals.",
    url: "https://localhost:3000",
    images: [
      {
        url: "/public/hero.png",
        width: 1200,
        height: 630,
        alt: "A user-friendly platform for effortless and convenient car rentals.",
      },
    ],
  },
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable}`}>
        <TanStackProvider>
          <Toaster position="top-right" />
          <Header />
          <main className={css.main}>{children}</main>
        </TanStackProvider>
      </body>
    </html>
  );
}
