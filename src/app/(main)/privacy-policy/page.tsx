import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Yalla7Play games and applications platform.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-transparent px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-4xl rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-black text-slate-900">Privacy Policy</h1>
        <div className="mt-6 space-y-4 text-slate-700">
          <p>
            We collect limited analytics and account data to improve discovery, ranking quality,
            and platform performance.
          </p>
          <p>
            Ads may be served in configured positions (header, sidebar, between cards, footer)
            and can include image or script-based placements.
          </p>
          <p>
            We do not sell personal user data. Contact us through the contact page for any privacy
            requests, data export, or deletion inquiries.
          </p>
        </div>
      </section>
    </main>
  );
}
