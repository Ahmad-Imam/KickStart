import { TournamentForm } from "./_components/create-tournaments-form";
import { TournamentMultiForm } from "./_components/create-tournaments-multi-form";
import TournamentPage from "./_components/test_torunament";

export async function generateMetadata() {
  return {
    title: `KickStart - Create Tournament`,
    description: `Create a new tournament`,
  };
}

const TournamentsPage = () => {
  return (
    <div className="w-full p-4 min-h-screen flex flex-row justify-center items-center dark:bg-slate-950">
      {/* <TournamentPage /> */}
      {/* <TournamentForm /> */}
      <TournamentMultiForm />
    </div>
  );
};
export default TournamentsPage;
