import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        organization: true,
        role: true,
        leaves: true,
        teamMembers: true,
      },
    });
    return NextResponse.json({ success: true, allUsers });
  } catch (error: any) {
    console.log(`Could not able to get all user's Error : ${error.message}`);
    return NextResponse.json({
      success: false,
      message: "Error in getting user",
    });
  }
};
