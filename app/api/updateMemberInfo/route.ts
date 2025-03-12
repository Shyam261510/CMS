import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const {
      memberId,
      teamId,
      contactNumber,
      role,
    }: {
      memberId: string;
      teamId: string;
      contactNumber?: string;
      role?: string;
    } = await req.json();
    if (!memberId || !teamId)
      return NextResponse.json({
        success: false,
        message: "Please provide valid input",
      });

    const teamMember = await prisma.teamMember.findUnique({
      where: {
        id: memberId,
      },
    });

    if (!teamMember)
      return NextResponse.json({
        success: false,
        message: "Team member not found",
      });

    await prisma.teamMember.update({
      where: {
        id: memberId,
      },
      data: {
        ...(contactNumber && { contactNumber }),
        ...(role && { role }),
      },
    });

    return NextResponse.json({ success: true, message: "Information updated" });
  } catch (error) {
    console.log(`Error in updating teamMember info `);
  }
};
