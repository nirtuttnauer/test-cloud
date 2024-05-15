'use client'
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { BookProvider } from "@/contexts/BookContext";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayoutProps({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="he" suppressHydrationWarning dir="rtl">
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <BookProvider>

          <NavBar />
          <main>
            {children}
              </main>
            <Footer />
          </BookProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
