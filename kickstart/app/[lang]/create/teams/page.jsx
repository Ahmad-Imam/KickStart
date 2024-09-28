import { auth } from "@/auth";
import { TeamsForm } from "./_components/create-teams-form";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  return {
    title: `KickStart - Create Team`,
    description: `Create a new team`,
  };
}

const CreateTeamsPage = async () => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="dark:bg-slate-950 w-full min-h-screen flex-col flex items-center justify-center p-4">
      <TeamsForm />
    </div>
  );
};
export default CreateTeamsPage;
