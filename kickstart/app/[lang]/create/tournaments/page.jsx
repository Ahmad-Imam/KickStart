import { auth } from "@/auth";

import { TournamentMultiForm } from "./_components/create-tournaments-multi-form";

import { redirect } from "next/navigation";
import { getDictionary } from "@/app/dictionary/dictionaries";

export async function generateMetadata() {
  return {
    title: `KickStart - Create Tournament`,
    description: `Create a new tournament`,
  };
}

const CreateTournamentsPage = async ({ params: { lang } }) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const wordDb = await getDictionary(lang);

  return (
    <div className="w-full p-4 min-h-screen flex flex-row justify-center items-center dark:bg-slate-950">
      {/* <TournamentPage /> */}
      {/* <TournamentForm /> */}
      <TournamentMultiForm wordDb={wordDb} />
    </div>
  );
};
export default CreateTournamentsPage;
