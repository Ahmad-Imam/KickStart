import { auth } from "@/auth";
import { CreatePlayersForm } from "./_components/create-players-form";
import { redirect } from "next/navigation";
import { getDictionary } from "@/app/dictionary/dictionaries";

export async function generateMetadata() {
  return {
    title: `KickStart - Create Player`,
    description: `Create a new player`,
  };
}

const CreatePlayerPage = async ({ params: { lang } }) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const wordDb = await getDictionary(lang);

  return (
    <div className="dark:bg-slate-950 min-h-screen w-full flex-col flex items-center justify-center p-4">
      <CreatePlayersForm wordDb={wordDb} />
    </div>
  );
};
export default CreatePlayerPage;
