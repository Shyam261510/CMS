"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Users } from "lucide-react";
import { useRouter } from "next/navigation";

interface TeamCardProps {
  id: number;
  teamName: string;
  description: string;
  teamMembers: [];
}

export default function TeamCard({
  team,
  organizationId,
}: {
  team: TeamCardProps;
  organizationId: string;
}) {
  const router = useRouter();

  return (
    <Card
      className="transition-all duration-300 hover:shadow-md  cursor-pointer"
      onClick={() => {
        router.push(`/Organization/${organizationId}/${team.id}`);
      }}
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
