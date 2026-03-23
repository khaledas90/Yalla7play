import { Role } from "@prisma/client";

export const roleRoutes: Record<Role, string[]> = {
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

export function canAccessRoute(role: Role, pathname: string): boolean {
  // Check public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return true;
  }

  if (role === "SUPER_ADMIN" || role === "ADMIN") {
    return pathname.startsWith("/admin");
  }

  // Check role-specific routes
  const allowedRoutes = roleRoutes[role];
  return allowedRoutes.some((route) => pathname.startsWith(route));
}

export function getRedirectPath(role: Role): string {
  switch (role) {
    case "SUPER_ADMIN":
      return "/admin";
    case "ADMIN":
      return "/admin";
    default:
      return "/login";
  }
}
