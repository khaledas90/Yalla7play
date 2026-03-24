import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const roleParam = String(searchParams.get("role") || "").trim().toUpperCase();
    const users = await prisma.user.findMany({
      where:
        roleParam === "USER" ||
        roleParam === "ADMIN" ||
        roleParam === "SUPER_ADMIN" ||
        roleParam === "WORKER"
          ? { role: roleParam as any }
          : undefined,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("GET /api/admin/users error:", error);
    return NextResponse.json(
      { error: "فشل تحميل المستخدمين" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "").trim();
    const roleRaw = String(body.role || "USER").trim().toUpperCase();
    const role =
      roleRaw === "SUPER_ADMIN" ||
      roleRaw === "ADMIN" ||
      roleRaw === "USER" ||
      roleRaw === "WORKER"
        ? roleRaw
        : "USER";

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "الاسم والبريد الإلكتروني وكلمة المرور مطلوبان" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role as any,
      },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "البريد الإلكتروني مستخدم بالفعل" },
        { status: 409 }
      );
    }
    console.error("POST /api/admin/users error:", error);
    return NextResponse.json(
      { error: "فشل إضافة المستخدم" },
      { status: 500 }
    );
  }
}
