"use client";

import { useState } from "react";

export function ContactPlatformForm() {
  const [status, setStatus] = useState<"idle" | "success">("idle");

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setStatus("success");
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          name="name"
          placeholder="Name"
          className="rounded-xl border border-white/15 bg-slate-900/60 px-4 py-2.5 text-white outline-none ring-blue-400/30 placeholder:text-slate-400 focus:ring"
        />
        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          className="rounded-xl border border-white/15 bg-slate-900/60 px-4 py-2.5 text-white outline-none ring-blue-400/30 placeholder:text-slate-400 focus:ring"
        />
      </div>
      <textarea
        required
        name="message"
        placeholder="Message"
        rows={6}
        className="w-full rounded-xl border border-white/15 bg-slate-900/60 px-4 py-3 text-white outline-none ring-blue-400/30 placeholder:text-slate-400 focus:ring"
      />
      <button
        type="submit"
        className="rounded-xl bg-gradient-to-r from-[#F97316] to-[#FACC15] px-5 py-2.5 font-bold text-slate-900 transition hover:scale-[1.01]"
      >
        Send Message
      </button>
      {status === "success" ? (
        <p className="text-sm text-green-300">Thanks! Your message has been submitted.</p>
      ) : null}
    </form>
  );
}
