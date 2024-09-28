import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { capitalizeFirstLetter, truncateLongString } from "@/utils/data-util";
import { MailIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";
import { TournamentModeratorsDrawer } from "./TournamentModeratorsDrawer";
import Image from "next/image";

export default function TournamentModerators({
  moderatorsList,
  allUsersList,
  tournamentDetails,
  wordDb,
}) {
  return (
    <div className="my-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mt-4 mb-4">{wordDb.moderators}</h2>
        <TournamentModeratorsDrawer
          moderatorsList={moderatorsList}
          allUsersList={allUsersList}
          tournamentDetails={tournamentDetails}
          wordDb={wordDb}
        />
      </div>
      <Card className="dark:bg-slate-900 cardFull ">
        <CardContent className="py-2 px-2">
          <ul className="">
            {moderatorsList?.length === 0 ? (
              <div className="p-2">{wordDb.noModerators}</div>
            ) : (
              moderatorsList.map((user) => (
                <li
                  key={user?.id}
                  type="button"
                  className=" dark:bg-slate-800 dark:hover:bg-slate-600 p-2 border-1 rounded-md last:border-b-0 cursor-pointer hover:bg-slate-200 bg-slate-100 my-3"
                >
                  <div className="flex flex-row justify-between text-start items-center gap-2 text-sm">
                    <div>{`${truncateLongString(user?.name, 15)}`}</div>
                    <div className="flex">
                      <MailIcon className="mr-2" />
                      {`${truncateLongString(user?.email, 15)}`}
                    </div>

                    <Image
                      className="rounded-full "
                      src={user?.image}
                      width={35}
                      height={35}
                      alt="user"
                    />

                    {/* <Badge>{capitalizeFirstLetter(player?.position)}</Badge> */}
                  </div>
                </li>
              ))
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
