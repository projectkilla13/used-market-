import { NextResponse } from "next/server";
import { connectDB } from "@lib/db";
import User from "@models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@lib/jwt";

export async function POST(req: Request) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = signToken({ id: user._id, email: user.email, role: user.role });
  return NextResponse.json({ user: { id: user._id, email: user.email, username: user.username }, token });
}
