"use client";
import React, { useState } from "react";
import { ModeToggle } from "../ModeToggle";
import Link from "next/link";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  ChevronDownIcon,
  Dribbble,
  DribbbleIcon,
  EclipseIcon,
  MenuIcon,
  MountainIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { truncateLongString } from "@/utils/data-util";

export default function MobileNavbar({ user, wordDb }) {
  const [isOpen, setIsOpen] = useState(false);

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

  function handleSignOut() {
    signOut({ callbackUrl: "/login" });
  }

  return (
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
            {wordDb.create}
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

          {user?.name ? (
            <div className="">
              <div className="text-sm font-medium text-muted-foreground hover:underline p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md px-2">
                {truncateLongString(user?.name, 10)}
              </div>
              <button
                onClick={handleSignOut}
                className={cn(
                  "text-sm font-semibold transition-colors hover:text-foreground hover:underline md:text-lg p-2 pl-4",
                  "text-muted-foreground"
                )}
                // className={`text-sm font-medium text-muted-foreground hover:text-foreground hover:underline`}
                prefetch={false}
              >
                {wordDb.signOut}
              </button>
            </div>
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
      </SheetContent>
    </Sheet>
  );
}
