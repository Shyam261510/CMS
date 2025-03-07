"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "./ui/input";
import { TeamCardProps, TeamMember } from "./team-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { PopupCard } from "./PopUpCard";
import { useSelector } from "react-redux";

export const TeamSection = ({ team }: { team: TeamCardProps }) => {
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const allUsers = useSelector((state: any) => state.userSlice.allUsers);

  const teamMemeberUserIds = team.teamMembers.map((data: any) => data.userId);

  const userNotInTeam = allUsers.filter(
    (user: any) =>
      !user.teamMembers.some((member: TeamMember) =>
        teamMemeberUserIds.includes(member.userId)
      )
  );

  return (
    <div className=" w-full">
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap justify-between">
          <div className="flex gap-4 items-center">
            <h2 className="text-2xl font-bold">Team Member</h2>
            <Badge variant="secondary" className="rounded-full ">
              {team.teamMembers.length > 0 ? team.teamMembers.length : 0}
            </Badge>
          </div>
          <Button
            className="flex gap-3 cursor-pointer  "
            onClick={() => setIsModelOpen(true)}
          >
            <Plus />
            <span>Add Member</span>
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute top-2 left-2" />
          <Input
            type="text"
            placeholder="Seach memebers..."
            className="pl-10 "
          />
        </div>
        <div className="flex justify-between flex-wrap p-8  ">
          {team.teamMembers?.map((member: TeamMember) => (
            <div
              key={member.id}
              className="flex items-center gap-4 py-10 px-4   border-1   shadow-lg rounded-lg
            transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <Avatar>
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
              <h2>{member.name}</h2>
              <Badge>{member.role ? member.role : "Not assign"}</Badge>
            </div>
          ))}
        </div>
      </div>
      <PopupCard
        isOpen={isModelOpen}
        onClose={() => setIsModelOpen(false)}
        title="Add Team Members"
        description="Search for users and add them to your team."
      >
        <div className="flex flex-col gap-5">
          <div className="relative">
            <Search className="absolute top-2 left-2" />
            <Input
              type="text"
              placeholder="Seach by name  . . ."
              className="pl-10 "
            />
          </div>
          <div className="flex flex-col gap-4">
            {userNotInTeam.map((user: any) => (
              <div
                key={user.id}
                className="flex p-2 justify-between items-center border-1 rounded-lg cursor-pointer"
              >
                <div className="flex gap-4">
                  {" "}
                  <Avatar>
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <h2>{user.name}</h2>
                </div>

                <Button className="h-10 w-10 rounded-full ">
                  <Plus />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </PopupCard>
    </div>
  );
};
