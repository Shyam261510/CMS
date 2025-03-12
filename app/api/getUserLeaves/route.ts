import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId)
      return NextResponse.json({
        success: false,
        message: "Could not able to get your leaves",
      });

    const leaves = await prisma.leave.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Getting your leaves successfully",
      leaves,
    });
  } catch (error) {
    console.log(`Error in getting user leaves `);
    return NextResponse.json({
      success: false,
      message: "Error in getting you leaves",
    });
  }
};
