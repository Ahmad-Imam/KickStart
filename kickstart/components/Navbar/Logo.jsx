"use client";
import React, { useEffect } from "react";
import { DribbbleIcon } from "lucide-react";
import Link from "next/link";
import { AuthContext } from "@/app/contexts";
import { useAuth } from "@/app/hooks/useAuth";

export default function Logo({ user }) {
  const { loggedUser, setLoggedUser } = useAuth();

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
        {/* <div>{loggedUser?.name}</div> */}
        <span className="sr-only">Acme Inc</span>
      </Link>
    </div>
  );
}
