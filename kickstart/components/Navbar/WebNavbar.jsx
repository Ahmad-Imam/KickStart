"use client";
import React from "react";
import { ModeToggle } from "../ModeToggle";
import {
  ChevronDownIcon,
  Dribbble,
  DribbbleIcon,
  EclipseIcon,
  MenuIcon,
  MountainIcon,
} from "lucide-react";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { truncateLongString } from "@/utils/data-util";

export default function WebNavbar({ user, wordDb }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: `${wordDb.home}` },
    { href: "/tournaments", label: `${wordDb.tournaments}` },
    { href: "/players", label: `${wordDb.players}` },
    { href: "/teams", label: `${wordDb.teams}` },
    { href: "/faq", label: `${wordDb.faq}` },
  ];

  const createItems = [
    { href: "/create/teams", label: `${wordDb.createTeams}` },
    { href: "/create/players", label: `${wordDb.createPlayers}` },
    { href: "/create/tournaments", label: `${wordDb.createTournaments}` },
  ];

  const isActive = (path) => pathname === path;

  function handleSignOut() {
    signOut({ callbackUrl: "/login" });
  }

  return (
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
            <button variant="link" className="text-sm font-semibold md:text-lg">
              {wordDb.create}
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

      {user?.name ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex flex-row justify-between items-center cursor-pointer hover:underline">
              <button
                variant="link"
                className="text-sm font-semibold md:text-lg"
              >
                {truncateLongString(user?.name, 10)}
              </button>
              <ChevronDownIcon className="ml-1 h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-slate-100 dark:bg-slate-900"
          >
            <DropdownMenuItem>
              <button
                className="w-full  hover:underline p-1 md:text-lg"
                prefetch={false}
                onClick={handleSignOut}
              >
                {wordDb.signOut}
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          href={"/login"}
          className={cn(
            "text-sm font-semibold transition-colors hover:text-foreground hover:underline md:text-lg",
            "text-muted-foreground"
          )}
          // className={`text-sm font-medium text-muted-foreground hover:text-foreground hover:underline`}
          prefetch={false}
        >
          {wordDb.login}
        </Link>
      )}

      <ModeToggle />
    </nav>
  );
}
