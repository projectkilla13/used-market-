import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@lib/jwt";

export async function authenticate(req: NextRequest) {
  const auth = req.headers.get("authorization") || "";
  const token = auth.replace("Bearer ", "");
  if (!token) return NextResponse.json({ error: "Missing token" }, { status: 401 });
  try {
    const payload = verifyToken(token as string);
    const res = NextResponse.next();
    res.headers.set("x-user-payload", JSON.stringify(payload));
    return res;
  } catch (e) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
