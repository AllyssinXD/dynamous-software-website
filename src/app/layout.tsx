import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/Navbar/Navbar";
import {
  ThemeController,
  ThemeProvider,
} from "../components/ThemeController/ThemeController";
import AppProvider from "../components/ThemeController/AppController";
import Head from "next/head";
import PopupProvider from "@/components/PopupController/PopupController";
const axiformaRegular = localFont({
  src: [
    {
      path: "../fonts/axiforma-light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/axiforma-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/axiforma-semi-bold.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-axiforma",
});

export const metadata: Metadata = {
  title: "Agência de Criação de Sites, Webapps e Software | Dynamous Software",
  description:
    "Criação de sites profissionais, aplicativos web e sistemas personalizados. Soluções sob medida para impulsionar negócios locais e empresas com tecnologia de ponta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>

      <body className={`${axiformaRegular.className} antialiased`}>
        <AppProvider>
          <ThemeProvider>
            <ThemeController>
              <PopupProvider>
                <Navbar />
                {children}
              </PopupProvider>
            </ThemeController>
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
