import { PlayersForm } from "./_components/create-players-form";

export async function generateMetadata() {
  return {
    title: `KickStart - Create Player`,
    description: `Create a new player`,
  };
}

const CreatePlayerPage = () => {
  return (
    <div className="dark:bg-slate-950 min-h-screen w-full flex-col flex items-center justify-center p-4">
      <PlayersForm />
    </div>
  );
};
export default CreatePlayerPage;
