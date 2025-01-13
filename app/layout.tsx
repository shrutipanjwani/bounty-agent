import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_BASE_URL || ""),
  title: "MadHat",
  description: "MadHat",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "MadHat",
    description: "MadHat",
    url: "/",
    siteName: "MadHat",
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
