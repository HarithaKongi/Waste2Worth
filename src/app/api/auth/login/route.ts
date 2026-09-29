import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession, verifyPassword } from "@/lib/auth";
import { loginSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const parsed = loginSchema.safeParse({ email: form.get("email"), password: form.get("password") });
    if (!parsed.success) return NextResponse.json({ error: "Invalid login details." }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
    if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
      return NextResponse.redirect(new URL("/login?error=invalid", request.url));
    }

    await createSession(user.id);
    return NextResponse.redirect(new URL(user.role === "ADMIN" ? "/admin" : "/dashboard", request.url));
  } catch {
    return NextResponse.json({ error: "Unable to sign in." }, { status: 500 });
  }
}
