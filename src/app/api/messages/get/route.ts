import { NextResponse } from "next/server";
import { connectDB } from "@lib/db";
import Message from "@models/Message";

export async function GET(req: Request) {
  await connectDB();
  const url = new URL(req.url);
  const u1 = url.searchParams.get("u1");
  const u2 = url.searchParams.get("u2");

  const msgs = await Message.find({
    $or: [
      { from: u1, to: u2 },
      { from: u2, to: u1 }
    ]
  }).sort({ createdAt: 1 }).lean();

  return NextResponse.json({ messages: msgs });
}
