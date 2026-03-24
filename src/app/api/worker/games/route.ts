import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/db";

export async function GET() {
    try {
        const session = await auth();
        const userId = session?.user?.id;
        const role = String(session?.user?.role || "").toUpperCase();

        if (!userId || role !== "WORKER") {
            return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
        }

        const games = await prisma.game.findMany({
            where: { workerId: userId },
            include: { category: true },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(games);
    } catch (error) {
        console.error("GET /api/worker/games error:", error);
        return NextResponse.json({ error: "فشل تحميل ألعاب العامل" }, { status: 500 });
    }
}
