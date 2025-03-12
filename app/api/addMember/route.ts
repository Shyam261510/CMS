import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const {
      teamId,
      name,
      email,
      role = "",
      contactNumber = "",
      organizationId,
      userId,
    }: {
      teamId: string;
      name: string;
      email: string;
      role?: string;
      contactNumber?: string;
      organizationId: string;
      userId: string;
    } = await req.json();
    if (!teamId || !email || !name || !organizationId)
      return NextResponse.json({
        success: false,
        message: "Please provide valid input's",
      });

    // Check if the team exists
    const teamExists = await prisma.team.findUnique({
      where: { id: teamId },
    });
    if (!teamExists) {
      return NextResponse.json({
        success: false,
        message: "Team does not found.",
      });
    }

    // Check if the user exists
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) {
      return NextResponse.json({
        success: false,
        message: "User does not found.",
      });
    }
    // Check if the organization exists
    const organizationExists = await prisma.organization.findUnique({
      where: { id: organizationId },
    });
    if (!organizationExists) {
      return NextResponse.json({
        success: false,
        message: "Organization does not exist.",
      });
    }
    await prisma.teamMember.create({
      data: {
        teamId,
        email,
        name,
        role,
        contactNumber,
        userId,
      },
    });
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        organizationId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Team member added successfully",
    });
  } catch (error) {
    console.log(`Error in adding Team Member in Team `);
    return NextResponse.json({
      success: false,
      message: "Error is adding Team Member in Team",
    });
  }
};
