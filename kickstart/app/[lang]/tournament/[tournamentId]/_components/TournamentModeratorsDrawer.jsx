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
import TournamentModeratorsForm from "./TournamentModeratorsForm";

export function TournamentModeratorsDrawer({
  moderatorsList,
  allUsersList,
  tournamentDetails,
  wordDb,
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="w-40 customButton" variant="outline">
          {wordDb.editModerators}
        </div>
      </DrawerTrigger>
      <DrawerContent className="dark:bg-slate-900">
        <DrawerHeader className="text-left">
          <DrawerTitle>
            {`${wordDb.editModerators1}`}: {tournamentDetails?.name}
          </DrawerTitle>
          <DrawerDescription>{wordDb.editModerators2}</DrawerDescription>
        </DrawerHeader>
        {/* <ProfileForm className="px-4" /> */}
        <TournamentModeratorsForm
          moderatorsList={moderatorsList}
          setOpen={setOpen}
          allUsersList={allUsersList}
          tournamentDetails={tournamentDetails}
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
  );
}
