import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LAMARINA BG - Металообработка | Огъване, рязане, заваръчни работи",
  description: "LAMARINA BG е водеща компания в България, специализирана в металообработка, огъване, рязане и заваръчни работи. Висококачествени решения за индустриални и частни клиенти.",
  keywords: "металообработка, огъване, рязане, заваръчни работи, стомана, алуминий, персонализирани решения",
  authors: [{ name: "LAMARINA BG" }],
  creator: "LAMARINA BG",
  publisher: "LAMARINA BG",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url: "https://lamarina.bg",
    title: "LAMARINA BG - Металообработка",
    description: "Водеща компания в България за металообработка, огъване, рязане и заваръчни работи",
    siteName: "LAMARINA BG",
  },
  twitter: {
    card: "summary_large_image",
    title: "LAMARINA BG - Металообработка",
    description: "Водеща компания в България за металообработка, огъване, рязане и заваръчни работи",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1a365d',
                color: '#fff',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
