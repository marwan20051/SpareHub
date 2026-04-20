import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "SpareHub — Car spare parts for the Egyptian market",
  description:
    "Find genuine OEM, aftermarket, and imported car spare parts for Toyota, Hyundai, Kia, and Nissan vehicles. Competitive EGP pricing with fast delivery across Egypt.",
  keywords: "car parts, spare parts, Egypt, Toyota, Hyundai, Kia, Nissan, OEM, aftermarket",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
