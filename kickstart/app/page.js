import CardDemo from "@/components/HomeCard";
import Image from "next/image";
import Link from "next/link";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ModeToggle";

export default function Home() {
  function MenuIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    );
  }

  function MountainIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    );
  }

  return (
    <>
      {/* <div className="flex gap-5 bg-blue-500 w-full h-full mt-20 sm:flex-row md:justify-center items-start">
        <CardDemo type="tournament" />
        <CardDemo type="team" />
        <CardDemo type="players" />
      </div> */}
      <div className="dark:bg-slate-950 w-full min-h-screen grid grid-col-1 gap-2 md:flex md:flex-row justify-center items-center">
        <CardDemo type="tournament" />
        <CardDemo type="team" />
        <CardDemo type="players" />
      </div>
    </>
  );
}
