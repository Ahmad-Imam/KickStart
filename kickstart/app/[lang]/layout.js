import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./providers/theme-provider";
import { ModeToggle } from "@/components/ModeToggle";
import Navbar from "@/components/Navbar/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import AuthProvider from "./providers/AuthProvider";
import Provider from "./providers/Provider";
import { getDictionary } from "../dictionary/dictionaries";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KickStart",
  description: "KickStart - A tournament management platform",
};

export default async function RootLayout({ children, params: { lang } }) {
  const wordDb = await getDictionary(lang);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster position="top-center" duration="1500" richColors />
              <Navbar wordDb={wordDb} />
              {children}
              <ScrollToTop />
            </ThemeProvider>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
