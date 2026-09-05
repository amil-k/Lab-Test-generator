import { NextResponse } from "next/server";
import { listRecords, upsertRecord, deleteRecord } from "@/lib/store";

export async function GET() {
  return NextResponse.json(listRecords("clinics"));
}

export async function POST(request) {
  const body = await request.json();
  const saved = upsertRecord("clinics", body);
  return NextResponse.json(saved);
}

export async function DELETE(request) {
  const { id } = await request.json();
  deleteRecord("clinics", id);
  return NextResponse.json({ ok: true });
}
