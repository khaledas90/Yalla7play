import { redirect } from "next/navigation";

export default async function PageRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const mapping: Record<string, string> = {
    "about-us": "/about-us",
    "privacy-policy": "/privacy-policy",
    "terms": "/terms",
    "contact": "/contact-us",
  };

  const target = mapping[slug];
  if (target) {
    redirect(target);
  }

  redirect("/");
}
