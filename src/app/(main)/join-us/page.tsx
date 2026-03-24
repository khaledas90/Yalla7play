import type { Metadata } from "next";
import { CheckCircle2, Banknote, Calendar, Zap, MessageSquare, Globe, Users } from "lucide-react";


export const metadata: Metadata = {
  title: "انضم إلينا واربح | يلا7 بلاي",
  description: "انضم إلى نظام الربح من زيارات متابعينك في منصة يلا7 بلاي.",
};

export default function JoinUsPage() {
  const features = [
    {
      title: "سعر ثابت لكل 1000 زيارة",
      description: "بنحاسبك على كل 1000 زيارة بسعر ثابت مش بيتغير..",
      icon: Target,
    },
    {
      title: "دفع أسبوعي أو يومي",
      description: "نُحوّل أرباحك أسبوعيًا أو يوميًا في يوم محدد وثابت، مهما كانت قيمة المبلغ..",
      icon: Calendar,
    },
    {
      title: "اكسب من فيديوهاتك",
      description: "حوّل متابعيك لزيارات، وحوّل الزيارات لأرباح – كل ده من خلال شغلك اللي بتحبه.",
      icon: Zap,
    },
    {
      title: "دعم ومتابعة شخصية",
      description: "مش لوحدك! فريقنا بيتابعك بشكل دائم ويوجهك لزيادة الأرباح.",
      icon: MessageSquare,
    },
  ];

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#0b1c3d] to-[#1a237e] p-8 text-white shadow-2xl md:p-16">
          <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
            <h1 className="text-4xl font-black md:text-6xl tracking-tight leading-tight">
              انضم إلي نظام الربح من زيارات متابعينك
            </h1>
            <p className="text-xl text-blue-50 font-bold opacity-90">تم فتح باب التسجيل في منصة يلا7 بلاي (منصة الملوك)!</p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="rounded-2xl bg-white/10 px-6 py-3 backdrop-blur-md">
                <span className="text-2xl font-black">150+ EGP</span>
                <p className="text-xs font-bold text-blue-200">أرباح أسبوعية متوقعة</p>
              </div>
              <div className="rounded-2xl bg-white/10 px-6 py-3 backdrop-blur-md">
                <span className="text-2xl font-black">50,000 EGP</span>
                <p className="text-xs font-bold text-blue-200">تم تحويلهم للمبدعين</p>
              </div>
            </div>
          </div>
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-[#FF8A00]/10 blur-3xl opacity-30" />
          <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-white/5 blur-3xl opacity-20" />
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
           {features.map((f, i) => (
             <div key={i} className="group relative overflow-hidden rounded-[2.5rem] border border-orange-50 bg-white p-8 transition hover:shadow-xl">
               <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF8EE] text-[#FF8A00] transition group-hover:bg-[#FF8A00] group-hover:text-white">
                 <f.icon className="h-7 w-7" />
               </div>
               <h3 className="text-xl font-black text-slate-800 mb-2">{f.title}</h3>
               <p className="text-sm font-bold leading-relaxed text-slate-500">{f.description}</p>
             </div>
           ))}
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-8">
                <div className="space-y-6">
                    <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3">
                        <Users className="h-8 w-8 text-[#FF8A00]" />
                        هل أنت الشخص المناسب؟
                    </h2>
                    <ul className="space-y-4">
                        {[
                            "عندك صفحة أو قناة على تيك توك، يوتيوب، إنستجرام أو فيسبوك.",
                            "بتتكلم عن محتوى ألعاب أو تطبيقات على منصاتك.",
                            "بتعرف تسجل بصوتك بشكل واضح وتمنتج الفيديوهات.",
                            "قادر توصل لجمهورك وتخليهم يتفاعلوا معك.",
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 transition hover:bg-white hover:shadow-md border border-transparent hover:border-orange-100">
                                <CheckCircle2 className="mt-1 h-5 w-5 text-green-500 shrink-0" />
                                <span className="text-lg font-bold text-slate-700">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="text-lg font-bold text-slate-600 bg-[#FFF8EE] p-6 rounded-[2rem] border border-orange-100">
                لو الشروط دي بتنطبق عليك، فإنت الشخص المثالي لفرصتنا! هنساعدك تطور المحتوى بتاعك وتكسب دخل ثابت ومتصاعد.
                </p>
            </div>

            <div className="space-y-6 p-8 rounded-[3rem] border border-slate-100 bg-white shadow-xl shadow-orange-900/5">
                <h2 className="text-2xl font-black text-slate-800">📌 نظام المحاسبة والدفع</h2>
                <div className="space-y-4">
                    <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-sm leading-relaxed text-slate-600 italic">
                        بنحاسبك على كل 1000 زيارة بسعر ثابت مش بيتغير، والمميز عندنا إن كل زيارة بتجيبها بتتحسب 100% بالكامل، من غير أي نقصان أو تلاعب في الأرقام.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 rounded-2xl border border-orange-50 p-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
                             <Banknote className="h-6 w-6" />
                         </div>

                        <div>
                            <p className="text-lg font-black text-slate-800">دفع أسبوعي ويومي</p>
                            <p className="text-sm font-bold text-slate-500">نُحوّل أرباحك في يوم محدد وثابت بدون أي تأخير.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-2xl border border-orange-50 p-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF8EE] text-[#FF8A00]">
                            <Zap className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-lg font-black text-slate-800">سرعة استجابة فائقة</p>
                            <p className="text-sm font-bold text-slate-500">أي لعبة أو تطبيق بتطلبه بنضيفه في أقل من 6 ساعات.</p>
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                    <h3 className="text-lg font-black text-slate-800 mb-4">💰 وسائل الدفع المتاحة</h3>

                    <div className="flex flex-wrap gap-2">
                        {["فودافون كاش", "أورانج كاش", "اتصالات كاش", "إنستا باي", "تحويل بنكي", "PayPal", "Binance"].map((method, i) => (
                            <span key={i} className="rounded-xl bg-[#FFF8EE] px-3 py-1.5 text-sm font-bold text-[#FF8A00] border border-orange-100">{method}</span>
                        ))}
                    </div>
                    <p className="mt-4 text-xs font-bold text-slate-400">بنوفر لك أسهل وأسرع طرق الدفع، سواء كنت داخل أو خارج مصر.</p>
                </div>
            </div>
        </div>

        <div className="mt-20 text-center">
             <button className="rounded-[2rem] bg-[#FF8A00] px-12 py-5 text-xl font-black text-white shadow-2xl shadow-orange-600/30 transition hover:bg-[#e67e00] hover:scale-105 active:scale-95">
               سجل الآن وابدأ الربح
             </button>
             <p className="mt-4 text-sm font-bold text-slate-400">إذا كان عندك 5,000 متابع أو أكثر، بادر بتقديم طلبك الآن.</p>
        </div>

      </div>
    </main>
  );
}

// Reuse some icons with local aliases if not available
const Target = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
);
