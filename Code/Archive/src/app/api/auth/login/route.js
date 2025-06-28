import { PrismaClient } from "@prisma/client";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "./auth/[...nextauth]";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../../../../utils/db";
// import { isAsyncFunction } from "util/types";

const secretKey = process.env.JWT_SECRET;

export async function GET(request) {
  return NextResponse.json({ message: "Development Test" }, { status: 200 });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: {
        username: email,
      },
    });

    // Check password using bcrypt
    if (!user) {
      return NextResponse.json(
        { message: "User name or password wrong" },
        { status: 403 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "User name or password wrong" },
        { status: 403 }
      );
    }

    const accessToken = jwt.sign(
      {
        email: user.username,
        id: 1,
      },
      secretKey,
      { expiresIn: "2h" }
    );

    return NextResponse.json(
      { message: "Succeeded", user: user.username, accessToken: accessToken },
      { status: 200 }
    );
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
