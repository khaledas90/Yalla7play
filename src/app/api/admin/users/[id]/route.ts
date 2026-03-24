import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
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

    if (!name || !email) {
      return NextResponse.json(
        { error: "الاسم والبريد الإلكتروني مطلوبان" },
        { status: 400 }
      );
    }

    const data: { name: string; email: string; role: "USER" | "ADMIN" | "SUPER_ADMIN" | "WORKER"; password?: string } = {
      name,
      email,
      role: role as "USER" | "ADMIN" | "SUPER_ADMIN" | "WORKER",
    };
    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "البريد الإلكتروني مستخدم بالفعل" },
        { status: 409 }
      );
    }
    console.error("PATCH /api/admin/users/[id] error:", error);
    return NextResponse.json(
      { error: "فشل تعديل المستخدم" },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    const { id } = await params;
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/users/[id] error:", error);
    return NextResponse.json(
      { error: "فشل حذف المستخدم" },
      { status: 500 }
    );
  }
}
