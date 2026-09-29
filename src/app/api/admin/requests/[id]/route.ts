import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { statusSchema } from "@/lib/validators";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = statusSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Invalid status." }, { status: 400 });

    await prisma.wasteRequest.update({
      where: { id },
      data: {
        status: parsed.data.status,
        events: { create: { status: parsed.data.status, note: parsed.data.note ?? "Status updated by admin." } }
      }
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unable to update request." }, { status: 500 });
  }
}
