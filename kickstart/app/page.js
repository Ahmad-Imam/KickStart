import CardDemo from "@/components/HomeCard";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-5 bg-blue-500 w-full mt-20 sm:flex-row md:justify-center p-5">
        <CardDemo type="tournament" />
        <CardDemo type="team" />
        <CardDemo type="players" />
      </div>
    </>
  );
}
