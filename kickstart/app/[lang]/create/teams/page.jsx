import { auth } from "@/auth";
import { CreateTeamsForm } from "./_components/create-teams-form";
import { redirect } from "next/navigation";
import { getDictionary } from "@/app/dictionary/dictionaries";

export async function generateMetadata() {
  return {
    title: `KickStart - Create Team`,
    description: `Create a new team`,
  };
}

const CreateTeamsPage = async ({ params: { lang } }) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const wordDb = await getDictionary(lang);
  return (
    <div className="dark:bg-slate-950 w-full min-h-screen flex-col flex items-center justify-center p-4">
      <CreateTeamsForm wordDb={wordDb} />
    </div>
  );
};
export default CreateTeamsPage;
