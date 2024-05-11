import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
// import Header from "../components/Header"

const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito({ subsets: ["latin"] });

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
      <body className={`${nunito.className}`}>
        {children}
        
      </body>
    </html>
  );
}
