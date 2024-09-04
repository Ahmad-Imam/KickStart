import { TeamsForm } from "./_components/create-teams-form";

const LoginPage = () => {
  return (
    <div className="w-full flex-col h-screen flex items-center justify-center py-20">
      <div className="container">
        <TeamsForm />
      </div>
    </div>
  );
};
export default LoginPage;
