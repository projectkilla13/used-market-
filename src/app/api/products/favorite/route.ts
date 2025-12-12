import { NextResponse } from "next/server";
import { connectDB } from "@lib/db";
import User from "@models/User";

export async function POST(req: Request) {
  await connectDB();
  const { userId, productId } = await req.json();
  const user = await User.findById(userId);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const idx = user.favorites.findIndex((f: any) => f.toString() === productId);
  if (idx === -1) {
    user.favorites.push(productId);
  } else {
    user.favorites.splice(idx, 1);
  }
  await user.save();
  return NextResponse.json({ favorites: user.favorites });
}
