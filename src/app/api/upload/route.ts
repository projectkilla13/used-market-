import { NextResponse } from "next/server";
import { connectDB } from "@lib/db";
import cloudinary from "@lib/cloudinary";
import multer from "multer";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false
  }
};

// simple multer storage
const upload = multer({ dest: "/tmp/uploads" });

export async function POST(req: any) {
  // multer doesn't work natively in Next.js route handlers; this is a simplified approach:
  // For actual multipart handling, use an external express endpoint (see server.js) or client direct-to-cloudinary uploads.
  return NextResponse.json({ error: "Use the express upload server (server.js) or direct client uploads for files." }, { status: 400 });
}
