import { PrismaClient } from "@prisma/client";
import { set } from "lodash";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "./auth/[...nextauth]";
import { NextResponse } from "next/server";
// import { isAsyncFunction } from "util/types";
import prisma from "../../../../utils/db";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    if (blog) {
      return NextResponse.json(
        { message: "Succeeded", body: blog },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
