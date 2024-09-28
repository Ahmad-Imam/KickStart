import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronRight,
  Trophy,
  Users,
  UserPlus,
  Wallet2Icon,
  TrophyIcon,
} from "lucide-react";
import Link from "next/link";

export default function Home({ wordDb }) {
  return (
    <div className="flex flex-col min-h-screen w-full items-center ">
      <main className="w-full flex flex-col items-center">
        <section className="w-full py-12 md:py-20 lg:py-26 xl:py-30 bg-green-900 flex flex-row justify-center">
          <div className="container px-4 md:px-6 ">
            <div className="flex flex-col items-center space-y-4 text-center ">
              <div className="space-y-2 text-white">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  {wordDb.homeTitle}
                </h1>
                <p className="mx-auto max-w-[700px] md:text-xl ">
                  {wordDb.homeSubtitle}
                </p>
              </div>
              {/* <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div> */}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-20 lg:py-24 bg-white dark:bg-slate-950 flex flex-row justify-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              {wordDb.kickStart}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
              <Card className="cardFull dark:bg-slate-900">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <UserPlus className="w-6 h-6" />
                    <span>{wordDb.createPlayers}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    <li>{wordDb.createPlayersCard1}</li>
                    <li>{wordDb.createPlayersCard2}</li>
                    <li>{wordDb.createPlayersCard3}</li>
                    <li>{wordDb.createPlayersCard4}</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="cardFull dark:bg-slate-900">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-6 h-6" />
                    <span>{wordDb.createTeams}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    <li>{wordDb.createTeamsCard1}</li>
                    <li>{wordDb.createTeamsCard2}</li>
                    <li>{wordDb.createTeamsCard3}</li>
                    <li>{wordDb.createTeamsCard4}</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="cardFull dark:bg-slate-900">
                <CardHeader className="pr-0">
                  <CardTitle className="flex items-center gap-1">
                    <TrophyIcon className="w-6 h-6" />
                    <div>{wordDb.createTournaments}</div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    <li>{wordDb.createTournamentsCard1}</li>
                    <li>{wordDb.createTournamentsCard2}</li>
                    <li>{wordDb.createTournamentsCard3}</li>
                    <li>{wordDb.createTournamentsCard4}</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-emerald-950 flex flex-row justify-center  text-white ">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              {wordDb.howItWorks}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">{wordDb.signUp}</h3>
                <p className="">{wordDb.signUp1}</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {wordDb.createPlayersTeams}
                </h3>
                <p className="">{wordDb.createPlayersTeams1}</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {wordDb.setUpTournaments}
                </h3>
                <p className="">{wordDb.setUpTournaments1}</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white text-xl font-bold mb-4">
                  4
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {wordDb.manageEnjoy}
                </h3>
                <p className="">{wordDb.manageEnjoy1}</p>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-slate-950 flex flex-row justify-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-4">
                  <p className="text-gray-600 mb-4">
                    "TourneyMaster made organizing our local football league a
                    breeze. Highly recommended!"
                  </p>
                  <p className="font-semibold">- John D., League Organizer</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <p className="text-gray-600 mb-4">
                    "The player management system is top-notch. It's so easy to
                    keep track of stats and performance."
                  </p>
                  <p className="font-semibold">- Sarah L., Team Manager</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <p className="text-gray-600 mb-4">
                    "As a player, I love how I can easily view my stats and
                    upcoming matches. Great app!"
                  </p>
                  <p className="font-semibold">- Mike R., Football Player</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section> */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-900 dark:bg-slate-950 flex flex-row justify-center text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {wordDb.readyToKickStart}
                </h2>
                <p className="mx-auto max-w-[600px]  md:text-xl ">
                  {wordDb.joinThousands}
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/create/tournaments">
                  <Button size="lg">
                    {wordDb.getStarted}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Kickstart. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="/">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="/">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
