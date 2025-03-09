"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Leave } from "@/lib/dataSlice";

import { Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export interface TeamMember {
  id: string;
  contactNumber?: string;
  role?: string;
  teamId: string;
  userId: string;
  email: string;
  name: string;
}

export interface TeamCardProps {
  id: string;
  teamName: string;
  description: string;
  teamMembers: TeamMember[];
  organizationId?: string;
  leaves?: Leave[];
}

export default function TeamCard({
  team,
  organizationId,
}: {
  team: TeamCardProps;
  organizationId: string;
}) {
  const router = useRouter();
  const userData = useSelector((state: any) => state.userSlice.userData);

  const redirectToTeamDetails = () => {
    const isTeamMemberExist = team.teamMembers.some(
      (member: TeamMember) => member.userId === userData.id
    );
    if (isTeamMemberExist) {
      router.push(`/Organization/${organizationId}/${team.id}`);
    } else {
      alert(`You are not member of ${team.teamName}`);
    }
  };
  return (
    <Card
      className="transition-all duration-300 hover:shadow-md  cursor-pointer"
      onClick={redirectToTeamDetails}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{team.teamName}</h2>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{team.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t bg-muted/40 px-6 py-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="mr-2 h-4 w-4" />
          {team.teamMembers?.length > 0 ? team.teamMembers.length : 0} members
        </div>
      </CardFooter>
    </Card>
  );
}
