"use client";

import { LeaveSection } from "@/components/LeaveSection";
import Navbar from "@/components/navbar";
import { TeamSection } from "@/components/TeamSection";
import { useParams } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSelector } from "react-redux";
import { TeamCardProps } from "@/components/team-card";
import { getUserData } from "@/hooks/getUserData";
import { getOrganization } from "@/hooks/getOrganization";
import { fetchAllUsers } from "@/hooks/fetchAllUser";
import { getTeamData } from "@/hooks/getTeam";

export default function Team() {
  const param = useParams();
  let { teamId } = param;
  const teams = useSelector((state: any) => state.userSlice.team);
  const organization = useSelector(
    (state: any) => state.userSlice.organization
  );

  const team = teams.filter((data: TeamCardProps) =>
    data.teamMembers?.some((memmber) => memmber.teamId === teamId)
  );

  // Getting user info like id , email , name etc.

  getUserData();

  // getting organization data

  getOrganization();

  // Getting all user's how have login in to our portal
  fetchAllUsers();

  //getting team data

  getTeamData(String(organization.id));

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
            <Tabs defaultValue="Team">
              <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
                <TabsTrigger value="Team">Team</TabsTrigger>
                <TabsTrigger value="Leaves">Leaves</TabsTrigger>
              </TabsList>
              <TabsContent value="Team">
                {/* team[0] because i use filter
              method to get the team and filter method return an array */}
                <TeamSection team={team[0]} />
              </TabsContent>
              <TabsContent value="Leaves">
                <LeaveSection team={team[0]} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
