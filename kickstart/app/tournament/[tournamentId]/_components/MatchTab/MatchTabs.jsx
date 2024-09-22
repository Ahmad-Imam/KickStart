"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MatchTabs({ children }) {
  const [activeTab, setActiveTab] = useState("group");
  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 gap-2 px-2 h-auto py-2 dark:bg-slate-900 cardFull custom-border-shadow border-1">
          <TabsTrigger value="group" className="px-6 py-2 my-1 ">
            Group
          </TabsTrigger>
          <TabsTrigger className="px-6 py-2 my-1 " value="knockout">
            Knockout
          </TabsTrigger>

          <TabsTrigger className="px-6 py-2 my-1 " value="bracket">
            Bracket
          </TabsTrigger>
        </TabsList>
        {children}
      </Tabs>
    </>
  );
}
