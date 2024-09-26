import { DribbbleIcon } from "lucide-react";
import Link from "next/link";

import WebNavbar from "./WebNavbar";
import MobileNavbar from "./MobileNavbar";
import { auth } from "@/auth";

export default async function Navbar() {
  const session = await auth();
  console.log(session);

  return (
    <header className="bg-background border-b m-0 sticky top-0 z-50">
      <div className="container flex items-center justify-between h-14 px-10 bg-slate-200  dark:bg-slate-900 min-w-full">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <DribbbleIcon className="h-6 w-6" />

          <span className="sr-only">Acme Inc</span>
        </Link>

        <WebNavbar user={session?.user} />

        <MobileNavbar user={session?.user} />
      </div>
    </header>
  );
}
