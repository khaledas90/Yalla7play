import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "إخلاء مسؤولية | يلا7 بلاي",
  description: "نخلي مسؤوليتنا من المحتوى والروابط والخدمات المقدمة من أطراف ثالثة عبر منصتنا.",
};

export default function DisclaimerPage() {
  const intro = "نحن في منصة يلا7 بلاي (فور تكنو سابقا) نعتبر منصة عربية تهدف لإثراء المحتوى المتنوع بكافة المجالات، ويجب أن نحيطكم علماً أننا نخلي مسؤوليتنا مما يلي:";

  const sections = [
    {
      title: "المحتوى",
      content:
        "جميع المقالات والمواضيع المنشورة على موقعنا تعود مسؤوليتها الكاملة على الكتاب والمحررين الذين قاموا بنشرها.",
    },
    {
      title: "الروابط الخارجية",
      content:
        "قد يحتوي موقعنا على روابط لمواقع خارجية، ونحن لا نتحمل أي مسؤولية عن محتوى هذه المواقع أو أي أضرار قد تنشأ عن استخدامها أو الدخول إليها.",
    },
    {
      title: "المعلومات والنصائح",
      content:
        "يجب على القراء استخدام المعلومات والنصائح والإرشادات المقدمة على موقعنا بحكمة ومسؤولية شخصية، وعدم تجربة أي شيء بدون استشارة مختصين، خاصة في المواضيع الصحية والتقنية الحساسة.",
    },
    {
      title: "المحتوى الديني والأدبي",
      content:
        "بالنسبة للمحتوى الديني والأدبي، نحن نسعى لتقديم معلومات دقيقة وموثوقة، ولكن يجب على القراء التحقق من المعلومات واستخدامها بحذر وفهم شخصي.",
    },
    {
      title: "التطبيقات والألعاب",
      content:
        "يوجد في الموقع الكثير من المواضيع التي تتناول مواقع ويب وتطبيقات وألعاب، ولسنا مسؤولين عن أي ضرر يلحق بالزائر من قبل محتوى هذه التطبيقات أو المواقع أو الألعاب الخارجية.",
    },
    {
      title: "الصور والوسائط",
      content:
        "الصور المستخدمة في الموقع تستخدم لأغراض الشرح والتوضيح فقط، ونحن نخلي مسؤوليتنا عن أي صور أو خلفيات مأخوذة من مواقع أخرى، وتقع هذه المسؤولية على عاتق المحرر المسؤول عن المقالة.",
    },
  ];

  const conclusion = "في النهاية، نحن في يلا7 بلاي نسعى جاهدين للتأكد من دقة المعلومات المقدمة، ولكن لا يمكننا ضمان الصحة الكاملة والدقة المطلقة للمحتوى المنشور على موقعنا. نحن غير مسؤولين عن أي روابط ضارة أو أي أضرار أدبية أو قانونية قد تنشأ عن استخدام المعلومات المقدمة على الموقع.";

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[3.5rem] border-4 border-double border-orange-50 bg-white p-8 md:p-16 shadow-2xl">
          <header className="text-center mb-16 space-y-4">
             <div className="inline-block rounded-2xl bg-[#FF8A00] px-6 py-2 text-sm font-black text-white shadow-lg shadow-orange-500/20">قانوني</div>
             <h1 className="text-4xl font-black text-slate-800 md:text-5xl">إخلاء مسؤولية</h1>
          </header>

          <div className="mb-12">
            <p className="text-xl leading-relaxed text-slate-700 font-bold bg-slate-50 p-8 rounded-[2rem] border-r-4 border-[#FF8A00]">
              {intro}
            </p>
          </div>

          <div className="space-y-16">
            {sections.map((section, i) => (
              <section key={i} className="group space-y-4">
                <div className="flex items-center gap-4">
                   <div className="h-10 w-2 rounded-full bg-[#FF8A00] shadow-sm" />
                   <h2 className="text-2xl font-black text-slate-800 group-hover:text-[#FF8A00] transition-colors">{section.title}</h2>
                </div>
                <p className="text-lg leading-relaxed text-slate-600 font-bold pr-6 border-r-2 border-slate-50">
                  {section.content}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-16 p-8 rounded-[2rem] bg-orange-50/50 border border-orange-100">
             <p className="text-lg leading-relaxed text-slate-700 font-bold text-center italic">
               "{conclusion}"
             </p>
          </div>

          <div className="mt-20 rounded-[2.5rem] bg-slate-900 p-8 text-white shadow-xl shadow-orange-900/10 relative overflow-hidden">
             <div className="relative z-10 grid gap-8 md:grid-cols-2 md:items-center">
                 <div className="space-y-4">
                    <h3 className="text-2xl font-black">هل لديك استفسار قانوني؟</h3>
                    <p className="text-slate-400 font-bold tracking-wide">إذا كنت تعتقد أن هناك محتوى ينتهك حقوقك، يرجى التواصل معنا فوراً لمراجعة الأمر.</p>
                 </div>
                 <div className="text-left">
                    <a href="/contact-us" className="inline-block rounded-2xl bg-[#FF8A00] px-8 py-3 font-black transition hover:bg-white hover:text-slate-900 border-2 border-transparent hover:border-[#FF8A00]">تواصل معنا</a>
                 </div>
             </div>
             <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-[#FF8A00]/10 blur-2xl" />
          </div>
        </div>
      </div>
    </main>
  );
}
