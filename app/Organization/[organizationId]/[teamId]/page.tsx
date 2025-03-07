"use client";

import { LeaveSection } from "@/components/LeaveSection";
import Navbar from "@/components/navbar";
import { TeamSection } from "@/components/TeamSection";
import { useParams } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSelector } from "react-redux";
import { TeamCardProps } from "@/components/team-card";
export default function Team() {
  const param = useParams();
  let { teamId } = param;
  const teams = useSelector((state: any) => state.userSlice.team);

  const team = teams.filter((data: TeamCardProps) =>
    data.teamMembers?.some((memmber) => memmber.teamId === teamId)
  );

  return (
    <div className="min-h-full min-w-screen ">
      <Navbar />
      <div className=" bg-background  w-full">
        <div className="container mx-auto py-6 px-4 md:px-6 lg:px-8">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Team Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your team members and leave requests
              </p>
            </div>
            <Tabs defaultValue="account">
              <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
                <TabsTrigger value="Team">Team</TabsTrigger>
                <TabsTrigger value="Leaves">Leaves</TabsTrigger>
              </TabsList>
              <TabsContent value="Team">
                <TeamSection team={team[0]} />
              </TabsContent>
              <TabsContent value="Leaves">
                <LeaveSection />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
