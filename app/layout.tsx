import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/providers/LenisProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://imobiliaria-luxo.com.br";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0C0A09",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Imobiliária de Ultra Luxo — Rio de Janeiro",
    default: "Imóveis de Ultra Luxo no Rio de Janeiro | Coberturas, Penthouses e Mansões",
  },
  description:
    "Curadoria exclusiva dos imóveis mais sofisticados do Rio de Janeiro. Coberturas, penthouses e mansões em Ipanema, Leblon, Barra e Recreio. Atendimento personalizado 24h.",
  keywords: [
    "imóveis de luxo Rio de Janeiro",
    "cobertura duplex Recreio",
    "penthouse Ipanema",
    "apartamento alto padrão Leblon",
    "mansão Barra da Tijuca",
    "imobiliária luxo RJ",
    "imóveis exclusivos Rio",
  ],
  authors: [{ name: "Imobiliária Luxo RJ" }],
  creator: "Imobiliária Luxo RJ",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Imobiliária Luxo RJ",
    title: "Imóveis de Ultra Luxo no Rio de Janeiro",
    description: "Curadoria exclusiva dos imóveis mais sofisticados do Rio de Janeiro.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Imobiliária Luxo RJ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Imóveis de Ultra Luxo no Rio de Janeiro",
    description: "Curadoria exclusiva dos imóveis mais sofisticados do Rio de Janeiro.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable} dark`}>
      <head>
        {/* Google Tag Manager */}
        {GTM_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        )}
        {/* Meta Pixel */}
        {META_PIXEL_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`,
            }}
          />
        )}
      </head>
      <body className="bg-stone-950 text-stone-200 font-sans antialiased">
        {/* GTM noscript fallback */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
