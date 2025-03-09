import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { status, leaveId } = await req.json();

    if (!status || !leaveId)
      return NextResponse.json({
        success: false,
        message: "Please provide valid Status",
      });

    if (status === "approve") {
      await prisma.leave.update({
        where: {
          id: leaveId,
        },
        data: {
          approve: true,
          rejected: false,
        },
      });
      return NextResponse.json({
        success: true,
        message: "Leave approve successfully",
      });
    }
    if (status === "reject") {
      await prisma.leave.update({
        where: {
          id: leaveId,
        },
        data: {
          rejected: true,
          approve: false,
        },
      });
      return NextResponse.json({
        success: true,
        message: "Leave approve successfully",
      });
    }
  } catch (error: any) {
    console.error(`Error in approving leave ${error.message}`);
    return NextResponse.json({
      success: false,
      message: "Error in approving leave",
    });
  }
};
