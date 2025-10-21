import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "react-hot-toast";
import { generateLocalBusinessSchema } from "@/lib/seo";
import { initializeCriticalOptimizations } from "@/lib/critical-css";

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
  const localBusinessSchema = generateLocalBusinessSchema();
  
  return (
    <html lang="bg" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://lamarina.bg" />
        <link rel="alternate" hrefLang="bg" href="https://lamarina.bg" />
        <link rel="alternate" hrefLang="en" href="https://lamarina.bg/en" />
        <link rel="alternate" hrefLang="x-default" href="https://lamarina.bg" />
        
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://your-supabase-url.supabase.co" />
        
        {/* Critical resource preloads */}
        <link rel="preload" href="/images/hero-bg.webp" as="image" />
        <link rel="preload" href="/images/logo.svg" as="image" />
        
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema)
          }}
        />
        
        {/* Critical CSS injection */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                ${initializeCriticalOptimizations.toString()}();
              })();
            `
          }}
        />
      </head>
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
