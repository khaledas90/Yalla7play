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

    const [gamesCount, appsCount, stats] = await Promise.all([
      prisma.game.count({ where: { workerId: userId } }),
      prisma.app.count({ where: { workerId: userId } }),
      prisma.workerDailyStat.aggregate({
        where: { workerId: userId },
        _sum: { traffic: true, adViews: true, earnings: true },
      }),
    ]);

    return NextResponse.json({
      gamesCount,
      appsCount,
      traffic: stats._sum.traffic || 0,
      adViews: stats._sum.adViews || 0,
      earnings: stats._sum.earnings || 0,
    });
  } catch (error) {
    console.error("GET /api/worker/overview error:", error);
    return NextResponse.json({ error: "فشل تحميل بيانات العامل" }, { status: 500 });
  }
}
