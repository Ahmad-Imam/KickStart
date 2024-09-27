import { DribbbleIcon } from "lucide-react";
import Link from "next/link";

import WebNavbar from "./WebNavbar";
import MobileNavbar from "./MobileNavbar";
import { auth } from "@/auth";
import Logo from "./Logo";
import { getUserByEmail } from "@/queries/users";

export default async function Navbar() {
  const session = await auth();
  // console.log(session);
  let loggedUser = null;

  if (session) {
    loggedUser = await getUserByEmail(session?.user?.email);
    // console.log(loggedUser);
  }

  return (
    <header className="bg-background border-b m-0 sticky top-0 z-50">
      <div className="container flex items-center justify-between h-14 px-10 bg-slate-200  dark:bg-slate-900 min-w-full">
        <Logo user={loggedUser} />

        <WebNavbar user={session?.user} />

        <MobileNavbar user={session?.user} />
      </div>
    </header>
  );
}
