import { prisma } from "@/utils/Prima";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { id, organizationName } = await req.json();

    // creating orgainization
    // Creating organization and retrieving its ID
    const organization = await prisma.organization.create({
      data: {
        organizationName,
      },
    });

    // adding orignization in user Model
    await prisma.user.update({
      where: { id },
      data: {
        organizationId: organization.id,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Organization Created Successfully",
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: `Could not able to create Organization ${error.message}`,
    });
  }
};
