import { NextResponse } from "next/server";
import { connectDB } from "@lib/db";
import Product from "@models/Product";

export async function GET(req: Request) {
  await connectDB();
  const products = await Product.find({ archived: { $ne: true } }).sort({ createdAt: -1 }).limit(100).lean();
  return NextResponse.json({ products });
}
