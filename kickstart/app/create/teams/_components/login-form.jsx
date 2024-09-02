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

export function LoginForm() {
  return (
    <Card className="mx-auto max-w-lg w-full bg-red-100">
      <CardHeader>
        <CardTitle className="text-2xl">Create Your team</CardTitle>
        <CardDescription>Enter your team information</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="teamName">Name</Label>
              <Input
                id="teamName"
                name="teamName"
                type="text"
                placeholder="Chelsea FC"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="teamBio">Bio</Label>
              <Input
                id="teamBio"
                name="teamBio"
                type="text"
                placeholder="London is Blue"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="teamLocation">Location</Label>
              <Input
                id="teamLocation"
                name="teamLocation"
                type="text"
                placeholder="London"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="teamName">Name</Label>
              <Input
                id="teamName"
                name="teamName"
                type="text"
                placeholder="Chelsea FC"
                required
              />
            </div>
            <Label htmlFor="teamPlayers">Players</Label>

            <SearchBox />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <p>
            Register as{" "}
            <Link href="/register/instructor" className="underline">
              Instructor
            </Link>{" "}
            or{" "}
            <Link href="/register/student" className="underline">
              Student
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
