"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SearchBox from "./searchBoxForPlayers";
import { addPlayers, addTeams } from "@/app/actions";

export function PlayersForm() {
  const players = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
    "Honeydew",
    "Kiwi",
    "Lemon",
    "Mango",
    "Nectarine",
    "Orange",
    "Papaya",
    "Quince",
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const nickName = formData.get("nickName");
    const country = formData.get("country");
    const jersey = formData.get("jersey");

    const playerData = {
      name,
      nickName,
      country,
      jersey,
    };

    console.log(playerData);
    const teams = await addPlayers(playerData);
    // Call the API to create the team
  }

  return (
    <Card className="mx-auto max-w-lg w-full ">
      <CardHeader>
        <CardTitle className="text-2xl">Create Your player</CardTitle>
        <CardDescription>Enter your player information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Lionel Messi"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="nickName">NickName</Label>
              <Input
                id="nickName"
                name="nickName"
                type="text"
                placeholder="Goat"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                type="text"
                placeholder="Argentina"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="jersey">Jersey Number</Label>
              <Input
                id="jersey"
                name="jersey"
                type="text"
                placeholder="10"
                required
              />
            </div>

            <Label htmlFor="players">Team</Label>

            <SearchBox />

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
