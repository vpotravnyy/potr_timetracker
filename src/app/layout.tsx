import "~/styles/globals.css";
import type { Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "~/lib/utils";

const fontSans = FontSans({
	subsets: ["latin", "cyrillic"],
	variable: "--font-sans",
});

export const metadata = {
	title: "Учет времени",
	description:
		"Time Tracker app to track time of employees of Potravnyi family",
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
	manifest: "/site.webmanifest",
	appleWebApp: {
		title: "Учет времени",
		statusBarStyle: "black-translucent",
		startupImage: ["/android-chrome-512x512.png"],
	},
	other: {
		"full-screen": "yes",
		"apple-mobile-web-app-capable": "yes",
		"mobile-web-app-capable": "yes",
		"mask-icon": {
			href: "safari-pinned-tab.svg",
			color: "#5bbad5",
		},
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
		<html lang="ru">
			<body
				className={cn(
					"h-screen overflow-hidden bg-background font-sans antialiased overscroll-y-none",
					fontSans.variable,
				)}
			>
				{children}
			</body>
		</html>
	);
}
