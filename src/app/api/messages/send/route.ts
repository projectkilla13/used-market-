import { NextResponse } from "next/server";
import { connectDB } from "@lib/db";
import Message from "@models/Message";

export async function POST(req: Request) {
  await connectDB();
  const { from, to, text } = await req.json();
  const msg = await Message.create({ from, to, text });
  return NextResponse.json({ msg });
}
