"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TeamsTTabs({ wordDb, children }) {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="my-6 grid w-full grid-cols-2 gap-2 px-2 h-auto py-2 dark:bg-slate-900 cardFull custom-border-shadow border-1">
          <TabsTrigger value="overview">{wordDb.overview}</TabsTrigger>
          <TabsTrigger value="matches">{wordDb.matches}</TabsTrigger>
        </TabsList>
        {children}
      </Tabs>
    </>
  );
}
