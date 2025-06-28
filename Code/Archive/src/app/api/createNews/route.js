import { PrismaClient } from "@prisma/client";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "./auth/[...nextauth]";
import { NextResponse } from "next/server";
import { verifyToken } from "src/auth/context/jwt/utils";
// import { isAsyncFunction } from "util/types";
import prisma from "../../../utils/db";

export async function POST(request) {
  const { valid, response, decoded } = verifyToken(request);

  if (!valid) {
    return response;
  }

  try {
    const body = await request.json();
    const { title, editorContent, thumbnail_url, isPublished, subtitle, type } =
      body;

    const numericalBool = isPublished ? 1 : 0;
    const newBlog = await prisma.blog.create({
      data: {
        title: title,
        body: editorContent,
        subtitle: subtitle,
        thumbnail_url: thumbnail_url,
        is_published: numericalBool,
        createdDate: new Date(),
        type: type,
      },
    });

    return NextResponse.json({ message: "Succeeded" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal service error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
