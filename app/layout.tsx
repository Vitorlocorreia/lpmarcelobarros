import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.marcelobarrosadvogados.com.br"),
  title: "Marcelo Barros | Advogados Associados",
  description: "Estratégia jurídica para proteger o que realmente importa. Advocacia corporativa, cível e consultiva em Recife - PE.",
  alternates: {
    canonical: "https://www.marcelobarrosadvogados.com.br",
  },
  openGraph: {
    title: "Marcelo Barros | Advogados Associados",
    description: "Estratégia jurídica para proteger o que realmente importa. Advocacia em Recife - PE.",
    url: "https://www.marcelobarrosadvogados.com.br",
    siteName: "Marcelo Barros & Advogados Associados",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/logo-marcelo-barros.png",
        width: 800,
        height: 600,
        alt: "Marcelo Barros & Advogados Associados",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcelo Barros | Advogados Associados",
    description: "Estratégia jurídica para proteger o que realmente importa.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "Marcelo Barros & Advogados Associados",
    "image": "https://www.marcelobarrosadvogados.com.br/logo-marcelo-barros.png",
    "@id": "https://www.marcelobarrosadvogados.com.br",
    "url": "https://www.marcelobarrosadvogados.com.br",
    "telephone": "+5581982285597",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua Bruno Veloso, 1280, Sala 609, Edf. Grand Tower Shopping",
      "addressLocality": "Recife",
      "addressRegion": "PE",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -8.1170068,
      "longitude": -34.8988636
    },
    "sameAs": [
      "https://www.instagram.com/marcelobarros.adv/"
    ]
  };

  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
