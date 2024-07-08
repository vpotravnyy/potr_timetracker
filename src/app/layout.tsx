import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";

import { TRPCReactProvider } from "~/trpc/react";
export const metadata = {
  title: "Time Tracker",
  description: "Time Tracker app to track time of employees of Potravnyi family",
  generator: "Next.js",
  applicationName: "potr-timetracker",
  referrer: "origin-when-cross-origin",
  keywords: ["Next.js", "React", "JavaScript"],
  creator: "Viacheslav Potravnyi",
  publisher: "Viacheslav Potravnyi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/android-chrome-512x512.png",
    shortcut: "favicon.ico",
    apple: "/apple-touch-icon-180x180.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-180x180-precomposed.png",
    },
  },
  manifest: "/manifest.json",
  appleWebApp: {
    title: "Time Tracker",
    statusBarStyle: "black-translucent",
    startupImage: ["/android-chrome-512x512.png"],
  },
  other: {
    "full-screen": "yes",
    "apple-mobile-web-app-capable": "yes",
    "mobile-web-app-capable": "yes",
    "mask-icon": {
      href: "safari-pinned-tab.svg",
      color: "#5bbad5"
    }
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "white",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
