import { NextRequest, NextResponse } from "next/server";

export default function GET(req: NextRequest) {
  return NextResponse.redirect(new URL('/home', req.url));
  };