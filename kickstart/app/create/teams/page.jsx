import { TeamsForm } from "./_components/create-teams-form";

export async function generateMetadata() {
  return {
    title: `KickStart - Create Team`,
    description: `Create a new team`,
  };
}

const CreateTeamsPage = () => {
  return (
    <div className="dark:bg-slate-950 w-full min-h-screen flex-col flex items-center justify-center p-4">
      <TeamsForm />
    </div>
  );
};
export default CreateTeamsPage;
