import { NextResponse } from "next/server";
import { connectDB } from "@lib/db";
import Product from "@models/Product";

export async function GET(req: Request) {
  await connectDB();
  const url = new URL(req.url);
  const q = url.searchParams.get("q") || "";
  const regex = new RegExp(q, "i");
  const products = await Product.find({ $or: [{ title: regex }, { description: regex }] }).limit(50).lean();
  return NextResponse.json({ products });
}
