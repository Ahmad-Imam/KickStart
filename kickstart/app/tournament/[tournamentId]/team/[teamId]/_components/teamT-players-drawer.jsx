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
import TeamsTPlayersForm from "./teamT-players-form";

export function TeamsTPlayersDrawer({ playersInfo, teamsTournament }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="w-40 customButton" variant="outline">
          Edit Team
        </div>
      </DrawerTrigger>
      <DrawerContent className="dark:bg-slate-950">
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit Squad</DrawerTitle>
          <DrawerDescription>
            Make changes to your team squad in the tournament here. Save when
            you're done.
          </DrawerDescription>
        </DrawerHeader>
        {/* <ProfileForm className="px-4" /> */}
        <TeamsTPlayersForm
          playersInfo={playersInfo}
          setOpen={setOpen}
          teamsTournament={teamsTournament}
        />
        <DrawerFooter className="pt-2 flex flex-row justify-center">
          <DrawerClose asChild className="">
            <Button
              variant="outline"
              className="w-1/2 bg-slate-800 dark:bg-slate-800  text-white"
            >
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
