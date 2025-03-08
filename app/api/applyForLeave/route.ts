import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { leaveType, reason, userId, teamId } = await req.json();

    if (!leaveType || !reason || !userId || !teamId)
      return NextResponse.json({
        success: false,
        message: "Please provide valid input feilds",
      });

    await prisma.leave.create({
      data: {
        leaveType,
        reason,
        userId,
        teamId,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Leave applied successfully. ✅",
    });
  } catch (error: any) {
    console.log(`Error while applying for leaves, Error : ${error.message}`);
    return NextResponse.json({
      success: false,
      message: "Error while applying for leave",
    });
  }
};
