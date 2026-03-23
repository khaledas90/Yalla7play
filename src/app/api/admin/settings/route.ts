import { NextResponse } from "next/server";
import { getAdminSettings, updateAdminSettings } from "@/lib/settings";

export async function GET() {
  try {
    const settings = await getAdminSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("GET /api/admin/settings error:", error);
    return NextResponse.json(
      { error: "فشل تحميل الإعدادات" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const payload = await request.json();
    const settings = await updateAdminSettings(payload);
    return NextResponse.json(settings);
  } catch (error) {
    console.error("PATCH /api/admin/settings error:", error);
    return NextResponse.json(
      { error: "فشل حفظ الإعدادات" },
      { status: 500 }
    );
  }
}
