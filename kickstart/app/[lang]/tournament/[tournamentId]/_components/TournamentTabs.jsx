"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TournamentTabs({ wordDb, children }) {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 gap-2 px-2 h-auto py-2 dark:bg-slate-900 cardFull custom-border-shadow border-1">
          <TabsTrigger
            value="overview"
            // style={{
            //   "--tw-bg-opacity": 1,
            //   backgroundColor:
            //     activeTab === "overview"
            //       ? "rgb(30 41 59 / var(--tw-bg-opacity))"
            //       : "white",
            //   color: activeTab === "overview" ? "white" : "black",
            //   cursor: "pointer",
            //   borderRadius: "5px",
            //   transition: "background-color 0.3s",
            // }}
          >
            {wordDb.overview}
          </TabsTrigger>
          <TabsTrigger
            // style={{
            //   "--tw-bg-opacity": 1,
            //   backgroundColor:
            //     activeTab === "teams"
            //       ? "rgb(30 41 59 / var(--tw-bg-opacity))"
            //       : "white",
            //   color: activeTab === "teams" ? "white" : "black",
            //   cursor: "pointer",
            //   borderRadius: "5px",
            //   transition: "background-color 0.3s",
            // }}
            value="teams"
          >
            {wordDb.teams}
          </TabsTrigger>
          <TabsTrigger
            // style={{
            //   "--tw-bg-opacity": 1,
            //   backgroundColor:
            //     activeTab === "matches"
            //       ? "rgb(30 41 59 / var(--tw-bg-opacity))"
            //       : "white",
            //   color: activeTab === "matches" ? "white" : "black",
            //   cursor: "pointer",
            //   borderRadius: "5px",
            //   transition: "background-color 0.3s",
            // }}
            value="matches"
          >
            {wordDb.matches}
          </TabsTrigger>
          <TabsTrigger
            // style={{
            //   "--tw-bg-opacity": 1,
            //   backgroundColor:
            //     activeTab === "groups"
            //       ? "rgb(30 41 59 / var(--tw-bg-opacity))"
            //       : "white",
            //   color: activeTab === "groups" ? "white" : "black",
            //   cursor: "pointer",
            //   borderRadius: "5px",
            //   transition: "background-color 0.3s",
            // }}
            value="groups"
          >
            {wordDb.groups}
          </TabsTrigger>
        </TabsList>
        {children}
      </Tabs>
    </>
  );
}
