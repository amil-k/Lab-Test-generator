import { NextResponse } from "next/server";
import { listRecords, upsertRecord, deleteRecord } from "@/lib/store";

export async function GET() {
  return NextResponse.json(listRecords("doctors"));
}

export async function POST(request) {
  const body = await request.json();
  const saved = upsertRecord("doctors", body);
  return NextResponse.json(saved);
}

export async function DELETE(request) {
  const { id } = await request.json();
  deleteRecord("doctors", id);
  return NextResponse.json({ ok: true });
}
