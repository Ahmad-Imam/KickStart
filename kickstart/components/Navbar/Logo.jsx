"use client";
import React, { useEffect } from "react";
import { DribbbleIcon } from "lucide-react";
import Link from "next/link";
import { AuthContext } from "@/app/[lang]/contexts";
import { useAuth } from "@/app/[lang]/hooks/useAuth";

export default function Logo({ user }) {
  const { loggedUser, setLoggedUser } = useAuth();

  useEffect(() => {
    if (user) {
      setLoggedUser(user);
    }
  }, []);

  return (
    <div>
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <DribbbleIcon className="h-6 w-6" />

        <span className="sr-only">Acme Inc</span>
      </Link>
    </div>
  );
}
