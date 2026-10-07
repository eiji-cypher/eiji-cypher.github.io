import type { Metadata } from "next";
import { Bebas_Neue, Montserrat } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Double V Business Support Services",
  description:
    "Professional business support services including accounts monitoring, business registration, statutory compliance, IPO registration, and audit services in Dipolog City and nationwide.",
  keywords: "business registration, SEC, BIR, accounting, compliance, audit, Dipolog City, Philippines",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Double V Business Support Services",
    description: "Your trusted partner in business compliance and registration.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${montserrat.variable} scroll-smooth`}>
      <body className="font-montserrat antialiased bg-white text-brand-navy">
        {children}
      </body>
    </html>
  );
}

