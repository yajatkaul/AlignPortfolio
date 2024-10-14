import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "@/context/AuthContext";

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
      <head>
        <link rel="icon" href="/TabImg.png" />
      </head>
      <body
        className={`bg-[url('/bg.jpg')] bg-fixed bg-no-repeat bg-cover min-h-screen font-customFont bg-center`}
      >
        <AuthContextProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
