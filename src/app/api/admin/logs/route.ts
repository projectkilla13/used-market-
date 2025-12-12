import { NextResponse } from "next/server";
import { connectDB } from "@lib/db";
import Log from "@models/Log";

export async function GET() {
  await connectDB();
  const logs = await Log.find().sort({ createdAt: -1 }).limit(200).lean();
  return NextResponse.json({ logs });
}
