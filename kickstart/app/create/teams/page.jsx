import { TeamsForm } from "./_components/create-teams-form";

const CreateTeamsPage = () => {
  return (
    <div className="w-full flex-col flex items-center justify-center py-20">
      <div className="container">
        <TeamsForm />
      </div>
    </div>
  );
};
export default CreateTeamsPage;
