import { TournamentForm } from "./_components/create-tournaments-form";
import { TournamentMultiForm } from "./_components/create-tournaments-multi-form";
import TournamentPage from "./_components/test_torunament";

const TournamentsPage = () => {
  return (
    <div className="w-full px-6 py-10">
      {/* <TournamentPage /> */}
      {/* <TournamentForm /> */}
      <TournamentMultiForm />
    </div>
  );
};
export default TournamentsPage;
