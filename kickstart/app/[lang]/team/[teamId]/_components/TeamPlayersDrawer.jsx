"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TeamPlayersForm from "./TeamPlayersForm";
import { useAuth } from "@/app/[lang]/hooks/useAuth";

export function TeamsPlayersDrawer({ playersInfo, team, wordDb }) {
  const [open, setOpen] = React.useState(false);

  const { loggedUser } = useAuth();

  return (
    <div>
      {loggedUser?.id && (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <div className="w-40 customButton" variant="outline">
              {wordDb.editTeam}
            </div>
          </DrawerTrigger>
          <DrawerContent className="dark:bg-slate-900">
            <DrawerHeader className="text-left">
              <DrawerTitle>{wordDb.editSquad}</DrawerTitle>
              <DrawerDescription>{wordDb.editSquad1}</DrawerDescription>
            </DrawerHeader>
            {/* <ProfileForm className="px-4" /> */}
            <TeamPlayersForm
              playersInfo={playersInfo}
              setOpen={setOpen}
              team={team}
              wordDb={wordDb}
            />
            <DrawerFooter className="pt-2 flex flex-row justify-center">
              <DrawerClose asChild className="">
                <button variant="outline" className="w-1/2 customButton">
                  {wordDb.cancel}
                </button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
