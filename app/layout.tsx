import "./globals.css";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "styles/prosemirror.css";
import { Metadata } from "next";
import Toaster from "./toaster";
import { ReactNode } from "react";
import clsx from "classnames";
import AppProvider from "./provider";
import "react-loading-skeleton/dist/skeleton.css";

const inter = Inter({ subsets: ["latin"] });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

const title = "Bluecom Blogs";
const description = "Admin Dashboard for Bluecom Blogs";

export const metadata: Metadata = {
  title,
  description,
  icons: [
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "manifest",
      url: "/site.webmanifest",
    },
  ],
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    creator: "@himohitmehta",
  },
  metadataBase: new URL("https://novel.sh"),
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-white">
      <Toaster position="top-center" expand={true} richColors />
      <body className={clsx(inter.className, plusJakarta.className, "h-full")}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
