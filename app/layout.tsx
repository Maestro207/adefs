import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ADEFS: A Dedicated Environment for Studying",
  description: "A Web App focused on archiving modules and e-learning materials",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header/>
        {children}
      </body>
    </html>
  );
}
