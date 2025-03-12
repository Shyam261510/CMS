import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const organization = await prisma.user.findUnique({
        where: { id },
        select: {
          organization: true,
        },
      });

      return NextResponse.json({
        success: true,
        organization: organization?.organization,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: `Error not able to Get organinazation `,
    });
  }
};
