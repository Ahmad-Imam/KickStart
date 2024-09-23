"use client";
import React, { useState } from "react";
import { ModeToggle } from "./ModeToggle";
import {
  ChevronDownIcon,
  Dribbble,
  DribbbleIcon,
  EclipseIcon,
  MenuIcon,
  MountainIcon,
} from "lucide-react";
import Link from "next/link";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/tournaments", label: "Tournaments" },
    { href: "/players", label: "Players" },
    { href: "/teams", label: "Teams" },
  ];

  const createItems = [
    { href: "/create/teams", label: "Create Team" },
    { href: "/create/players", label: "Create Player" },
    { href: "/create/tournaments", label: "Create Tournament" },
  ];

  const isActive = (path) => pathname === path;

  return (
    <header className="bg-background border-b m-0 sticky top-0 z-50">
      <div className="container flex items-center justify-between h-14 px-10 bg-slate-200  dark:bg-slate-900 min-w-full">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <DribbbleIcon className="h-6 w-6" />

          <span className="sr-only">Acme Inc</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-semibold transition-colors hover:text-foreground hover:underline md:text-lg",
                isActive(item.href)
                  ? "dark:text-teal-400 text-emerald-600"
                  : "text-muted-foreground"
              )}
              // className={`text-sm font-medium text-muted-foreground hover:text-foreground hover:underline`}
              prefetch={false}
            >
              {item.label}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex flex-row justify-between items-center cursor-pointer hover:underline">
                <button
                  variant="link"
                  className="text-sm font-semibold md:text-lg"
                >
                  Create
                </button>
                <ChevronDownIcon className="ml-1 h-4 w-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-slate-100 dark:bg-slate-900"
            >
              {createItems.map((item) => (
                <DropdownMenuItem key={item.href}>
                  <Link
                    href={item.href}
                    className="w-full hover:underline p-1 md:text-lg"
                    prefetch={false}
                  >
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
        </nav>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden dark:bg-slate-950 "
            >
              <MenuIcon className="h-6 w-6 " />
              <span className="sr-only">Toggle navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className=" bg-slate-100 dark:bg-slate-900">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium text-muted-foreground hover:text-foreground hover:underline p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md px-2`}
                  prefetch={false}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="text-sm font-medium text-muted-foreground hover:underline p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md px-2">
                Create
              </div>
              {createItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground pl-4 hover:underline p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md px-2"
                  prefetch={false}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <ModeToggle />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
