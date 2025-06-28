import { PrismaClient } from "@prisma/client";
import { orderBy } from "lodash";
import { NextResponse } from "next/server";
import { verifyToken } from "src/auth/context/jwt/utils";
import prisma from "../../../utils/db";

export async function GET(request) {
  try {
    const lastBlog = await prisma.Banner.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json(
      { message: "Succeeded", body: lastBlog },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal service error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request) {
  const { valid, response, decoded } = verifyToken(request);

  if (!valid) {
    return response;
  }

  const body = await request.json();
  const { bannerUrl } = body;

  try {
    const newBanner = await prisma.Banner.create({
      data: {
        url: bannerUrl,
      },
    });

    return NextResponse.json({ message: "Succeeded" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal service error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
