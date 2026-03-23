import { NextResponse } from "next/server";
import { ServerFileUploadService } from "@/utils/file-upload";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file");
        const subDir = String(formData.get("subDir") || "").trim() || undefined;
        const fileTypeRaw = String(formData.get("fileType") || "image").trim();

        if (!file || !(file instanceof File)) {
            return NextResponse.json(
                { error: "لم يتم إرسال ملف صالح" },
                { status: 400 }
            );
        }

        const fileType =
            fileTypeRaw === "pdf" || fileTypeRaw === "document" ? fileTypeRaw : "image";

        const result = await ServerFileUploadService.uploadFile(
            file,
            subDir,
            fileType
        );

        if (!result.success || !result.filePath) {
            return NextResponse.json(
                { error: result.error || "فشل رفع الملف" },
                { status: 400 }
            );
        }

        return NextResponse.json({ url: result.filePath }, { status: 200 });
    } catch (error) {
        console.error("POST /api/upload error:", error);
        return NextResponse.json(
            { error: "حدث خطأ أثناء رفع الملف" },
            { status: 500 }
        );
    }
}
