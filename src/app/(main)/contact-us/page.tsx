import type { Metadata } from "next";
import { ContactPlatformForm } from "./_components/contact-platform-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Reach out to Yalla7Play for partnership, ad, and support inquiries.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-transparent px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-black text-slate-900">Contact Us</h1>
        <p className="mt-2 text-slate-700">
          Questions about listings, ads, rankings, or partnerships? Send us a message.
        </p>
        <div className="mt-6">
          <ContactPlatformForm />
        </div>
      </div>
    </main>
  );
}
