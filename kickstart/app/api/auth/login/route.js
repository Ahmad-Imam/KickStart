import { userModel } from "@/models/user-model";
import { dbConnect } from "@/service/mongo";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (request) => {
  const { name, email, image } = await request.json();

  const superAdmin = false;

  await dbConnect();

  const newUser = {
    name,
    email,
    image,
    superAdmin,
  };

  try {
    await userModel.create(newUser);
    return new NextResponse(newUser);
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
