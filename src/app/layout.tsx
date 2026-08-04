import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Chrome } from "@/components/site/chrome";
import { Footer } from "@/components/site/footer";
import { themeScript } from "@/components/site/theme-toggle";
import { profile } from "@/content/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const site = "https://gandhimardav.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: `${profile.name}, ${profile.role}`,
    template: `%s / ${profile.name}`,
  },
  description: profile.blurb,
  keywords: [
    "Mardav Gandhi",
    "software engineer",
    "hackathons",
    "AI agents",
    "observability",
    "NITK",
  ],
  authors: [{ name: profile.name, url: site }],
  creator: profile.name,
  openGraph: {
    type: "website",
    url: site,
    title: `${profile.name}, ${profile.role}`,
    description: profile.blurb,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name}, ${profile.role}`,
    description: profile.blurb,
    creator: "@Mardav_Gandhi",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1ea" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0c0a" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <div className="grain" aria-hidden />
        <Chrome />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
