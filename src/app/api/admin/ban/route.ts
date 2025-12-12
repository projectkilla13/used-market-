import { NextResponse } from "next/server";
import { connectDB } from "@lib/db";
import User from "@models/User";
import Log from "@models/Log";

export async function POST(req: Request) {
  await connectDB();
  const { userId, reason } = await req.json();
  const user = await User.findByIdAndUpdate(userId, { banned: true }, { new: true });
  await Log.create({ level: "admin", message: "user banned", meta: { userId, reason } });
  return NextResponse.json({ user });
}
