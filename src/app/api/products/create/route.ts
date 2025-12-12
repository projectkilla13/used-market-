import { NextResponse } from "next/server";
import { connectDB } from "@lib/db";
import Product from "@models/Product";

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const product = await Product.create(body);
  return NextResponse.json({ product });
}
