import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./mobile_global.css";
import "./globals.css";
import Header from "@/components/server/Header";
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "UNIU",
	description: "Generated by create next app",
};
const Footer = dynamic(() => import('@/components/client/Footer'), { ssr: false });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" type="image/x-icon" href="../../uniu_logo_filled.svg" />
			</head>
			<body className={inter.className}>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
