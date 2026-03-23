import type { Metadata } from "next";
import { Info, Target, Users, Shield, TrendingUp, Handshake, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "من نحن | يلا7 بلاي",
  description: "تعرف على منصة يلا7 بلاي ورؤيتنا في تقديم أفضل محتوى للألعاب والتطبيقات.",
};

export default function AboutUsPage() {
  const stats = [
    { label: "مستخدم نشط", value: "+100K", icon: Users },
    { label: "لعبة وتطبيق", value: "+5000", icon: Target },
    { label: "محتوى موثوق", value: "100%", icon: Shield },
  ];

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#1a237e] to-[#0d47a1] p-12 text-white shadow-2xl">
          <div className="relative z-10 max-w-3xl">
            <h1 className="text-4xl font-black md:text-6xl mb-6">من نحن</h1>
            <p className="text-xl text-blue-100 leading-relaxed font-bold">
              موقع يلا7 بلاي (فور تكنو سابقا) متخصص في تقديم أفضل تطبيقات وألعاب الأندرويد والآيفون بروابط آمنة وسريعة.
            </p>
          </div>
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-white/10 blur-3xl opacity-50" />
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-[1.5fr,1fr]">
          <div className="space-y-12">
            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-800 border-b-4 border-blue-600 w-fit pb-2">عن الموقع</h2>
              <p className="text-lg leading-relaxed text-slate-600 font-medium">
                تُعد منصة يلا7 بلاي واحدة من أكثر المنصات الرقمية انتشارًا في العالم العربي لتوفير الألعاب والتطبيقات الحديثة. نسعى جاهدين لتقديم تجربة ترفيهية متكاملة لجميع الفئات، من الألعاب الاستراتيجية والأكشن وحتى التطبيقات التعليمية والخدمية.
              </p>
              <p className="text-lg leading-relaxed text-slate-600 font-medium">
                في السنوات الأخيرة، شهدت ألعاب الهواتف الذكية تطورًا هائلًا، ونحن هنا لنواكب هذا التطور ونوفر لك روابط تحميل مباشرة وآمنة من المصادر الرسمية، مع مراعاة دقة التفاصيل وجودة الرسوم وتجربة اللعب.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-800 border-b-4 border-blue-600 w-fit pb-2">أهدافنا</h2>
              <div className="grid gap-6 md:grid-cols-2">
                 {[
                   { title: "الأمان", text: "فحص شامل لجميع الملفات لضمان خلوها من البرمجيات الضارة.", icon: Shield },
                   { title: "السرعة", text: "توفير روابط تحميل مباشرة وسيرفرات سريعة.", icon: Zap },
                   { title: "التنوع", text: "تقديم أضخم مكتبة متنوعة تلبي جميع أذواق المستخدمين.", icon: LayoutGrid },
                   { title: "المصداقية", text: "مراجعات حقيقية وتقييمات دقيقة لكل تطبيق ولعبة.", icon: Award },
                 ].map((item, i) => (
                   <div key={i} className="flex gap-4 rounded-[2rem] border border-slate-50 bg-white p-6 shadow-sm transition hover:shadow-lg">
                     <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shrink-0">
                        <item.icon className="h-6 w-6" />
                     </div>
                     <div>
                        <h3 className="text-lg font-black text-slate-800">{item.title}</h3>
                        <p className="text-sm font-bold text-slate-500">{item.text}</p>
                     </div>
                   </div>
                 ))}
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <div className="rounded-[3rem] bg-slate-900 p-8 text-white shadow-xl shadow-blue-900/10">
              <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                 <Handshake className="h-7 w-7 text-blue-400" />
                 انضم لفريقنا
              </h3>
              <p className="text-slate-400 mb-8 font-bold leading-relaxed">
                هل أنت منشئ محتوى؟ هل تحب تجربة الألعاب والتطبيقات؟ يمكنك الآن الربح من متابعينك عبر منصتنا.
              </p>
              <a href="/join-us" className="inline-block w-full text-center rounded-2xl bg-blue-600 py-4 font-black transition hover:bg-blue-700 shadow-lg shadow-blue-500/20">
                 ابدأ رحلتك معنا
              </a>
            </div>

            <div className="rounded-[3rem] border border-blue-100 bg-blue-50/30 p-8 border-dashed">
               <div className="flex flex-col items-center text-center space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm text-blue-600">
                    <Mail className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-black text-slate-800">للتواصل المباشر</h4>
                  <p className="text-sm font-bold text-slate-500">لأية استفسارات أو مقترحات يمكنك مراسلتنا:</p>
                  <a href="mailto:info@yalla7play.com" className="text-lg font-black text-blue-600 hover:underline">info@yalla7play.com</a>
               </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

// Icons
const Zap = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
);
const LayoutGrid = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
);
const Award = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
);
