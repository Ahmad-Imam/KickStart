import { PlayersForm } from "./_components/create-players-form";

const CreatePlayerPage = () => {
  return (
    <div className="w-full flex-col flex items-center justify-center py-20">
      <div className="container">
        <PlayersForm />
      </div>
    </div>
  );
};
export default CreatePlayerPage;
