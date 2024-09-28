import React from "react";
import FAQ from "./_components/Faq";

export async function generateMetadata() {
  return {
    title: `KickStart - FAQ`,
    description: `KickStart FAQ page`,
  };
}

export default function FAQPage() {
  return (
    <div className="dark:bg-slate-950 min-h-screen w-full flex justify-center items-center">
      <FAQ />
    </div>
  );
}
