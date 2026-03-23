import { Role } from "@prisma/client";

type AppRole = Role | "USER";

export const roleRoutes: Record<AppRole, string[]> = {
  USER: ["/profile"],
  SUPER_ADMIN: ["/admin"],
  ADMIN: ["/admin"],
};

export const publicRoutes = [
  "/",
  "/login",
  "/auth/register",
  "/services",
  "/services/[serviceId]",
  "/samples",
];

export function canAccessRoute(role: AppRole, pathname: string): boolean {
  // Check public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return true;
  }

  const normalizedRole = String(role || "").toUpperCase();

  if (normalizedRole === "USER") {
    return pathname.startsWith("/profile");
  }

  if (normalizedRole === "SUPER_ADMIN" || normalizedRole === "ADMIN") {
    return pathname.startsWith("/admin");
  }

  // Check role-specific routes
  const allowedRoutes = roleRoutes[role] || [];
  return allowedRoutes.some((route) => pathname.startsWith(route));
}

export function getRedirectPath(role: AppRole): string {
  switch (role) {
    case "USER":
      return "/profile";
    case "SUPER_ADMIN":
      return "/admin";
    case "ADMIN":
      return "/admin";
    default:
      return "/login";
  }
}
