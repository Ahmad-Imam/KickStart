import Home from "@/components/Home";
import { getDictionary } from "../dictionary/dictionaries";

export default async function HomePage({ params: { lang } }) {
  const wordDb = await getDictionary(lang);

  return (
    <>
      <div className="dark:bg-slate-950">
        <Home wordDb={wordDb} />
      </div>
    </>
  );
}
