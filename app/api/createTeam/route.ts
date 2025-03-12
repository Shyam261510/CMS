import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

interface Team {
  organizationId: string;
  teamName: string;
  email: string;
  name: string;
  role?: string;
  contactNumber?: string;
  userId: string;
}
export const POST = async (req: NextRequest) => {
  try {
    const {
      organizationId,
      teamName,
      email,
      name,
      contactNumber,
      userId,
    }: Team = await req.json();

    const newTeam = await prisma.team.create({
      data: {
        teamName,
        organizationId,
      },
    });

    if (newTeam) {
      await prisma.teamMember.create({
        data: {
          teamId: newTeam.id,
          email,
          name,
          role: "TeamLead",
          contactNumber,
          userId,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Team Created Successfully",
    });
  } catch (e) {
    console.error(`Error in Creating Team `);
    return NextResponse.json({
      success: false,
      message: "Could not create Team",
    });
  }
};
