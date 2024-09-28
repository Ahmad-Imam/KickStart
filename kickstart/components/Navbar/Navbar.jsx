import { DribbbleIcon } from "lucide-react";
import Link from "next/link";

import WebNavbar from "./WebNavbar";
import MobileNavbar from "./MobileNavbar";
import { auth } from "@/auth";
import Logo from "./Logo";
import { getUserByEmail } from "@/queries/users";
import { dbConnect } from "@/service/mongo";

export default async function Navbar({ wordDb }) {
  const session = await auth();
  await dbConnect();
  // console.log(session);
  let loggedUser = null;

  if (session?.user) {
    console.log("session user", session?.user);
    loggedUser = await getUserByEmail(session?.user?.email);
    // console.log(loggedUser);
  }

  return (
    <header className="bg-background border-b m-0 sticky top-0 z-50">
      <div className="container flex items-center justify-between h-14 px-10 bg-slate-200  dark:bg-slate-900 min-w-full">
        <Logo user={loggedUser} />

        <WebNavbar user={session?.user} wordDb={wordDb} />

        <MobileNavbar user={session?.user} wordDb={wordDb} />
      </div>
    </header>
  );
}
