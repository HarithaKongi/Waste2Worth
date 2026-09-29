import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession, hashPassword } from "@/lib/auth";
import { registerSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const parsed = registerSchema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      password: form.get("password")
    });
    if (!parsed.success) return NextResponse.json({ error: "Invalid registration details." }, { status: 400 });

    const email = parsed.data.email.toLowerCase();
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return NextResponse.redirect(new URL("/login?error=exists", request.url));

    const user = await prisma.user.create({
      data: { name: parsed.data.name, email, passwordHash: await hashPassword(parsed.data.password) }
    });
    await createSession(user.id);
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } catch {
    return NextResponse.json({ error: "Unable to create account." }, { status: 500 });
  }
}
