import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية | يلا7 بلاي",
  description: "تعرف على كيفية حماية خصوصيتك ومعلوماتك في منصة يلا7 بلاي.",
};

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "من نحن",
      content:
        "يتم توفير خدماتنا عبر منصة يلا7 بلاي (فور تكنو سابقا). عنوان موقعنا هو: https://yalla7play.com. نحن ملتزمون بحماية خصوصيتك وتوفير بيئة تحميل آمنة.",
    },
    {
      title: "التعليقات",
      content:
        "عندما يترك الزوار تعليقاتهم على الموقع، نجمع البيانات المعروضة في نموذج التعليقات، بالإضافة إلى عنوان IP الخاص بالزائر وسلسلة وكيل متصفح المستخدم للمساعدة في اكتشاف البريد العشوائي.",
    },
    {
      title: "الوسائط",
      content:
        "إذا قمت برفع صور إلى الموقع، يجب عليك تجنب رفع الصور مع بيانات الموقع المضمنة (EXIF GPS). يمكن لزوار الموقع تنزيل واستخراج أي بيانات موقع من الصور الموجودة على الموقع.",
    },
    {
      title: "ملفات تعريف الارتباط (Cookies)",
      content:
        "إذا تركت تعليقاً على موقعنا، فقد تختار حفظ اسمك وعنوان بريدك الإلكتروني وموقعك الإلكتروني في ملفات تعريف الارتباط. هذه من أجل راحتك حتى لا تضطر إلى ملء تفاصيلك مرة أخرى عند ترك تعليق آخر.",
    },
    {
      title: "المحتوى المضمن من مواقع ويب أخرى",
      content:
        "المقالات على هذا الموقع قد تشمل محتوى مضمناً (على سبيل المثال: فيديوهات، صور، مقالات، إلخ). يتصرف المحتوى المضمن من مواقع ويب أخرى بالطريقة نفسها تماماً كما لو أن الزائر قد زار الموقع الآخر.",
    },
    {
      title: "مع من نشارك بياناتك",
      content:
        "إذا طلبت إعادة تعيين كلمة المرور، فسيتم تضمين عنوان IP الخاص بك في بريد إعادة التعيين الإلكتروني. نحن لا نبيع بياناتك الشخصية لأي جهة خارجية.",
    },
    {
      title: "ماهي مدة احتفاظنا ببياناتك",
      content:
        "إذا تركت تعليقاً، فسيتم الاحتفاظ بالتعليق والبيانات الوصفية الخاصة به إلى أجل غير مسمى. هذا حتى يمكننا التعرف على أي تعليقات متابعة والموافقة عليها تلقائياً بدلاً من الاحتفاظ بها في قائمة انتظار المراجعة.",
    },
    {
      title: "ماهي الحقوق العائدة لك على بياناتك",
      content:
        "إذا كان لديك حساب على هذا الموقع، أو تركت تعليقات، يمكنك طلب الحصول على ملف يتم تصديره من البيانات الشخصية التي نحتفظ بها عنك، بما في ذلك أي بيانات قدمتها لنا. يمكنك أيضاً طلب مسح أي بيانات شخصية نحتفظ بها عنك.",
    },
  ];

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[3.5rem] border-4 border-double border-blue-50 bg-white p-8 md:p-16 shadow-2xl">
          <header className="text-center mb-16 space-y-4">
             <div className="inline-block rounded-2xl bg-blue-600 px-6 py-2 text-sm font-black text-white shadow-lg shadow-blue-500/20">قانوني</div>
             <h1 className="text-4xl font-black text-slate-800 md:text-5xl">سياسة الخصوصية</h1>
             {/* <p className="text-lg text-slate-400 font-bold italic">آخر تحديث: 24 مارس 2026</p> */}
          </header>

          <div className="space-y-16">
            {sections.map((section, i) => (
              <section key={i} className="group space-y-4">
                <div className="flex items-center gap-4">
                   <div className="h-10 w-2 rounded-full bg-blue-600 shadow-sm" />
                   <h2 className="text-2xl font-black text-slate-800 group-hover:text-blue-600 transition-colors">{section.title}</h2>
                </div>
                <p className="text-lg leading-relaxed text-slate-600 font-bold pr-6 border-r-2 border-slate-50">
                  {section.content}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-20 rounded-[2.5rem] bg-slate-900 p-8 text-white shadow-xl shadow-blue-900/10">
             <div className="grid gap-8 md:grid-cols-2 md:items-center">
                 <div className="space-y-4">
                    <h3 className="text-2xl font-black">حماية بياناتك هي أولويتنا</h3>
                    <p className="text-slate-400 font-bold tracking-wide">نستخدم أحدث التقنيات لضمان عدم تعرض بياناتك لأي مخاطر رقمية.</p>
                 </div>
                 <div className="text-left">
                    <a href="/contact-us" className="inline-block rounded-2xl bg-blue-600 px-8 py-3 font-black transition hover:bg-white hover:text-slate-900 border-2 border-transparent hover:border-blue-600">اتصل بنا للمزيد</a>
                 </div>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}
