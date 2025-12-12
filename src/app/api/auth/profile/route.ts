import { NextResponse } from "next/server";
import { connectDB } from "@lib/db";
import User from "@models/User";

export async function PUT(req: Request) {
  await connectDB();
  const { id, updates } = await req.json();

  const user = await User.findByIdAndUpdate(id, updates, { new: true }).select("-password");
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ user });
}
