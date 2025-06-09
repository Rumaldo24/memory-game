import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
// import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: '/manifest.webmanifest',
  title: "doblix | Juego de Memoria",
  description:
    "Juego interactivo de memoria donde debes encontrar todas las parejas de cartas en el menor tiempo y con la menor cantidad de movimientos posibles.",
  keywords: [
    "juego de memoria",
    "memory game",
    "doblix",
    "doblix.fun",
    "juego de memoria online",
    "juego de memoria gratis",
    "juego de memoria para niños",
    "juego de memoria para adultos",
    "juego de memoria educativo",
    "juego de memoria interactivo",
    "juego de memoria en línea",
    "juego de memoria divertido",
    "juego de memoria clásico",
    "juego de cartas",
    "juego de parejas",
    "juego educativo",
    "juego para niños",
    "juego para adultos",
    "entrenamiento cerebral",
    "juego online",
    "juego gratis",
    "juego de concentración",
    "juego de atención",
  ],
  authors: [{ name: "R. RUMALDO V." }],
  creator: "R. RUMALDO V.",
  publisher: "R. RUMALDO V.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.doblix.fun"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "doblix | Juego de Memoria",
    description:
      "Juego interactivo de memoria donde debes encontrar todas las parejas de cartas en el menor tiempo y con la menor cantidad de movimientos posibles.",
    url: "https://www.doblix.fun",
    siteName: "Juego de Memoria",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HGnmRY8NnSBkN7HZy5J2ASUgs5NuHX.png",
        width: 1200,
        height: 630,
        alt: "doblix - Juego de Memoria",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "doblix | Juego de Memoria",
    description:
      "Juego interactivo de memoria donde debes encontrar todas las parejas de cartas en el menor tiempo y con la menor cantidad de movimientos posibles.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HGnmRY8NnSBkN7HZy5J2ASUgs5NuHX.png",
    ],
    creator: "@R_J_Rumaldo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
        {/* Script de Google AdSense */}
        {/* <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7441679162161349"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        /> */}
      </head>

      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
