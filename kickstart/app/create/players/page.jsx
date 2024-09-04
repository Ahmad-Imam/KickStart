import { PlayersForm } from "./_components/create-players-form";

const LoginPage = () => {
  return (
    <div className="w-full flex-col h-screen flex items-center justify-center">
      <div className="container">
        <PlayersForm />
      </div>
    </div>
  );
};
export default LoginPage;
