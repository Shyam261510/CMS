"use client";

import { LeaveSection } from "@/components/LeaveSection";
import Navbar from "@/components/navbar";
import { TeamSection } from "@/components/TeamSection";
import { useParams } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSelector } from "react-redux";
import { TeamCardProps } from "@/components/team-card";
import { Leave } from "@/lib/dataSlice";

export default function Team() {
  const userMap = new Map();

  const param = useParams();
  let { teamId } = param;
  const teams = useSelector((state: any) => state.userSlice.team);
  const allUsers = useSelector((state: any) => state.userSlice.allUsers);

  allUsers.forEach((user: any) => {
    let { id, name } = user;
    userMap.set(id, name);
  });

  const team = teams.filter((data: TeamCardProps) =>
    data.teamMembers?.some((memmber) => memmber.teamId === teamId)
  );

  const teamPendingLeaves = team[0].leaves
    ?.filter((leave: Leave) => !leave.approve && !leave.rejected)
    .map((leave: any) => {
      let { id, leaveType, reason, userId } = leave;
      if (userMap.has(userId)) {
        let name = userMap.get(userId);
        return { id, reason, name, userId, leaveType };
      }
    });

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
              <TabsList className="grid w-full grid-cols-2 md:w-[400px] ">
                <TabsTrigger value="Team">Team</TabsTrigger>
                <TabsTrigger value="Leaves">Leaves</TabsTrigger>
              </TabsList>
              <TabsContent value="Team">
                {/* team[0] because i use filter
              method to get the team and filter method return an array */}
                <TeamSection team={team[0]} />
              </TabsContent>
              <TabsContent value="Leaves">
                <LeaveSection
                  team={team[0]}
                  teamPendingLeaves={teamPendingLeaves}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
