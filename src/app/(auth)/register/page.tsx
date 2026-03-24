"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2, UserPlus } from "lucide-react";
import { toast } from "sonner";

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("USER");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const isPasswordMismatch = confirmPassword.length > 0 && password !== confirmPassword;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isPasswordMismatch) {
            toast.error("كلمتا المرور غير متطابقتين");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, role }),
            });

            const raw = await response.text();
            let data: { error?: string } = {};
            try {
                data = JSON.parse(raw);
            } catch {
                data = {};
            }
            if (!response.ok) {
                throw new Error(data.error || "فشل إنشاء الحساب");
            }

            toast.success("تم إنشاء الحساب بنجاح");
            router.push("/login");
        } catch (error: any) {
            toast.error(error.message || "فشل إنشاء الحساب");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center my-16 justify-center bg-gradient-to-b from-slate-100 to-slate-200 p-4" dir="rtl">
            <Card className="w-full max-w-md border-2 bg-white/95 shadow-xl backdrop-blur-sm">
                <CardHeader className="space-y-3 pb-6">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="rounded-full bg-blue-600 p-3">
                            <UserPlus className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-center text-3xl font-bold text-gray-900">إنشاء حساب جديد</CardTitle>
                        <CardDescription className="text-center text-gray-600">
                            أنشئ مستخدم جديد للدخول إلى النظام
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label>الاسم</Label>
                            <Input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="ادخل الاسم الكامل"
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <Label>البريد الإلكتروني</Label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@email.com"
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div>

                            <Label>كلمة المرور</Label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    minLength={6}
                                    required
                                    className="pl-10"
                                    placeholder="6 أحرف على الأقل"
                                    disabled={isLoading}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute left-1 top-1 h-8 w-8"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    disabled={isLoading}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>
                        <div>
                            <Label>تأكيد كلمة المرور</Label>
                            <div className="relative">
                                <Input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    minLength={6}
                                    required
                                    className={`pl-10 ${isPasswordMismatch ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                    placeholder="أعد كتابة كلمة المرور"
                                    disabled={isLoading}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute left-1 top-1 h-8 w-8"
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    disabled={isLoading}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                            {isPasswordMismatch && (
                                <p className="mt-1 text-xs text-red-500">كلمتا المرور غير متطابقتين</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            disabled={isLoading || isPasswordMismatch}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                                    جاري الإنشاء...
                                </>
                            ) : (
                                "تسجيل"
                            )}
                        </Button>
                    </form>
                    <p className="mt-6 text-center text-xs text-gray-500">
                        لديك حساب؟{" "}
                        <Link href="/login" className="font-medium text-blue-600 hover:text-blue-700 hover:underline">
                            تسجيل الدخول
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
