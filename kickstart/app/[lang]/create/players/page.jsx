import { auth } from "@/auth";
import { PlayersForm } from "./_components/create-players-form";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  return {
    title: `KickStart - Create Player`,
    description: `Create a new player`,
  };
}

const CreatePlayerPage = async () => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  // console.log(session);

  return (
    <div className="dark:bg-slate-950 min-h-screen w-full flex-col flex items-center justify-center p-4">
      <PlayersForm />
    </div>
  );
};
export default CreatePlayerPage;
