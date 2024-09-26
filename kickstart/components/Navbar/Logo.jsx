"use client";
import React, { useContext, useEffect } from "react";
import { DribbbleIcon } from "lucide-react";
import Link from "next/link";
import { AuthContext } from "@/app/contexts";

export default function Logo({ user }) {
  const { loggedUser, setLoggedUser } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      console.log("hereeeeee");
      setLoggedUser(user);
    }
  }, []);
  console.log("loggedUser");
  console.log(loggedUser);
  return (
    <div>
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <DribbbleIcon className="h-6 w-6" />
        <div>{loggedUser?.name}</div>
        <span className="sr-only">Acme Inc</span>
      </Link>
    </div>
  );
}
