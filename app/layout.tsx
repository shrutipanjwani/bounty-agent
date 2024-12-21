import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_BASE_URL || ""),
  title: "Mad Hatter",
  description: "MadHat",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Mad Hatter",
    description: "MadHat",
    url: "/",
    siteName: "Mad Hatter",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
