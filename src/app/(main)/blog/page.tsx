"use client";

import React, { useState, useEffect } from "react";
import { PageHero } from "@/components/common/page-hero";
import { BlogList } from "./_components/blog-list";
import AnimatedContent from "@/components/animated-content";

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* About Us style Hero */}
        <AnimatedContent distance={22} duration={0.7}>
          <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-[#0b1c3d] to-[#1a237e] p-8 md:p-12 text-white shadow-2xl mb-12 md:mb-16">
            <div className="relative z-10 max-w-3xl">
              <h1 className="text-4xl font-black md:text-6xl mb-6">المدونة</h1>
              <p className="text-xl text-blue-50 leading-relaxed font-bold opacity-90">
                اكتشف آخر المقالات، المراجعات، وأهم أخبار الألعاب والتطبيقات التي تهمك في الوطن العربي.
              </p>
            </div>
            <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-white/5 blur-3xl opacity-30" />
            <div className="absolute left-10 top-10 h-24 w-24 rounded-full bg-[#FF8A00]/10 blur-2xl opacity-40" />
          </div>
        </AnimatedContent>



        <AnimatedContent distance={18} duration={0.65} delay={0.06}>
          <BlogList />
        </AnimatedContent>
      </div>
    </main>
  );
}


