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

export function TeamsPlayersDrawer({ playersInfo, team }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="w-40 customButton" variant="outline">
          Edit Team
        </div>
      </DrawerTrigger>
      <DrawerContent className="dark:bg-slate-900">
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit Squad</DrawerTitle>
          <DrawerDescription>
            Make changes to your team. This will not affect the ongoing
            tournament squad.
          </DrawerDescription>
        </DrawerHeader>
        {/* <ProfileForm className="px-4" /> */}
        <TeamPlayersForm
          playersInfo={playersInfo}
          setOpen={setOpen}
          team={team}
        />
        <DrawerFooter className="pt-2 flex flex-row justify-center">
          <DrawerClose asChild className="">
            <button variant="outline" className="w-1/2 customButton">
              Cancel
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
