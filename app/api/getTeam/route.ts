import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const organizationId = searchParams.get("organizationId");

    if (organizationId) {
      const team = await prisma.team.findMany({
        where: {
          organizationId,
        },
        select: {
          id: true,
          teamMembers: true,
          teamName: true,
          organizationId: true,
          leaves: true,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Team founded Success fully",
        team,
      });
    }
    return NextResponse.json({
      success: false,
      message: "Please Provide Organization Id",
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: `Error Getting Team ${error.message}`,
    });
  }
};
