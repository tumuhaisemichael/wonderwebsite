import fs from "node:fs";
import path from "node:path";
import Script from "next/script";

const inlineHeadStyles = fs.readFileSync(
  path.join(process.cwd(), "app/content/inline-head.css"),
  "utf8"
);

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "WonderWedding - AI Wedding Planning App",
  description:
    "All-in-one wedding planning application with AI assistant, fundraising tools, guest management, and vendor marketplace",
  url: "https://wonderwedding.afrisoft.org",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Android, iOS, Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "10000",
    bestRating: "5"
  },
  author: {
    "@type": "Organization",
    name: "WonderWedding",
    url: "https://wonderwedding.afrisoft.org",
    logo: "https://wonderwedding.afrisoft.org/wonderlogo.png"
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "WonderWedding",
  url: "https://wonderwedding.afrisoft.org",
  logo: "https://wonderwedding.afrisoft.org/wonderlogo.png",
  description:
    "AI-powered wedding planning application helping couples plan perfect weddings",
  sameAs: [
    "https://facebook.com/wonderwedding",
    "https://instagram.com/wonderweddingapp",
    "https://twitter.com/wonderweddingapp"
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Wedding Planning Software",
  provider: {
    "@type": "Organization",
    name: "WonderWedding"
  },
  areaServed: {
    "@type": "Country",
    name: "Worldwide"
  },
  description:
    "AI-powered wedding planning services including budget management, guest coordination, vendor connections, and timeline creation",
  keywords:
    "wedding planning, wedding app, AI wedding assistant, wedding budget, wedding checklist, wedding fundraising"
};

export const metadata = {
  title: "WonderWedding - Your Magical Wedding Planner",
  description:
    "Plan your dream wedding with WonderWedding's AI magic. Free wedding planning app with fundraising, guest management, vendor marketplace and AI wedding assistant.",
  keywords:
    "wedding planning app, AI wedding planner, free wedding organizer, wedding budget calculator, wedding guest list manager, wedding vendor finder, wedding fundraising, wedding checklist, wedding timeline, wedding website builder",
  openGraph: {
    type: "website",
    url: "https://wonderwedding.afrisoft.org/",
    title: "WonderWedding - AI Wedding Planning App | Plan Your Dream Wedding",
    description:
      "Magical AI wedding planning app with fundraising, guest management, vendor marketplace and AI wedding genie.",
    images: [
      {
        url: "https://wonderwedding.afrisoft.org/wonderlogo.png",
        alt: "WonderWedding - AI Wedding Planning App Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "WonderWedding - AI Wedding Planning App",
    description:
      "Plan your dream wedding with AI magic. All-in-one wedding planning app, free to start.",
    images: ["https://wonderwedding.afrisoft.org/wonderlogo.png"]
  },
  icons: {
    icon: "/wonderlogo.png",
    shortcut: "/wonderlogo.png",
    apple: "/wonderlogo.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800&family=Parisienne&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          href="https://unpkg.com/aos@2.3.1/dist/aos.css"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/take2.css" />
        <style dangerouslySetInnerHTML={{ __html: inlineHeadStyles }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      </head>
      <body suppressHydrationWarning>
        <Script
          src="https://unpkg.com/aos@2.3.1/dist/aos.js"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}
