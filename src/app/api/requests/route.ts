import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calculateEstimatedValue } from "@/lib/calculations";
import { requestSchema } from "@/lib/validators";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const requests = await prisma.wasteRequest.findMany({
    where: { userId: user.id },
    include: { category: true },
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json(requests);
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Please provide valid waste details." }, { status: 400 });

    const category = await prisma.wasteCategory.findUnique({ where: { id: parsed.data.categoryId } });
    if (!category) return NextResponse.json({ error: "Waste category not found." }, { status: 404 });

    const estimatedValue = calculateEstimatedValue(parsed.data.quantityKg, category.pricePerKg);

    const created = await prisma.wasteRequest.create({
      data: {
        userId: user.id,
        categoryId: category.id,
        quantityKg: parsed.data.quantityKg,
        estimatedValue,
        location: parsed.data.location,
        events: { create: { status: "PENDING", note: "Request submitted by user." } }
      }
    });

    return NextResponse.json({ id: created.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to create request." }, { status: 500 });
  }
}
