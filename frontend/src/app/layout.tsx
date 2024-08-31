import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "@/context/AuthContext";
import { FilterContextProvider } from "@/context/FilterContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Align",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/TabImg.png" />
      <body className={inter.className}>
        <AuthContextProvider>
          <FilterContextProvider>
            <ThemeProvider attribute="class" defaultTheme="light">
              {children}
              <Toaster />
            </ThemeProvider>
          </FilterContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
