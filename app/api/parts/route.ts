import { NextResponse } from "next/server";
import partsData from "@/data/parts.json";

export async function GET() {
  return NextResponse.json(partsData);
}
