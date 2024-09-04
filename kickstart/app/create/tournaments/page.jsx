import { TournamentForm } from "./_components/create-tournaments-form";
import { TournamentMultiForm } from "./_components/create-tournaments-multi-form";
import TournamentPage from "./_components/test_torunament";

const TournamentsPage = () => {
  return (
    <div className="w-full flex-col h-screen flex items-center justify-center py-20">
      <div className="container">
        {/* <TournamentPage /> */}
        {/* <TournamentForm /> */}
        <TournamentMultiForm />
      </div>
    </div>
  );
};
export default TournamentsPage;
