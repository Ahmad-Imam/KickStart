import { Inter } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/main-nav";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ModeToggle";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KickStart",
  description: "KickStart - A tournament management platform",
};

export default function RootLayout({ children }) {
  const navLinks = [
    {
      title: "Features",
      href: "/#features",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Documentation",
      href: "/docs",
    },
  ];

  // <div className="flex h-screen flex-col items-center justify-between px-2 bg-yellow-500">
  //   <header className="bg-red-500 border-b w-5/6 h-20">
  //     <div className="container flex items-center justify-between py-4 ">
  //       <MainNav items={navLinks} />
  //       <ModeToggle />
  //     </div>
  //   </header>
  //   {/* <footer className="bg-background/80 text-foreground/60 py-4 text-center bg-red-500 w-full">
  //   <div className="">
  //   <p>&copy; 2022</p>
  //   </div>
  //   </footer> */}
  // </div>;

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position="top-center" duration="1500" richColors />
          <Navbar />
          {children}
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
