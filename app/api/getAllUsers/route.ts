import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return NextResponse.json({ success: true, users });
  } catch (error: any) {
    console.log(`Could not able to get User's Error : ${error.message}`);
    return NextResponse.json({
      success: false,
      message: `Could not able to get User's`,
    });
  }
};
