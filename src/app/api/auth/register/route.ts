import { NextResponse } from "next/server";
import { connectDB } from "@lib/db";
import User from "@models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@lib/jwt";

export async function POST(req: Request) {
  await connectDB();
  const { email, password, username } = await req.json();

  const exists = await User.findOne({ email });
  if (exists) return NextResponse.json({ error: "Email exists" }, { status: 400 });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed, username });

  const token = signToken({ id: user._id, email: user.email, role: user.role });
  return NextResponse.json({ user: { id: user._id, email: user.email, username: user.username }, token });
}
