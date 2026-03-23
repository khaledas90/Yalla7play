import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "شروط الاستخدام | يلا7 بلاي",
  description: "اطلع على شروط استخدام منصة يلا7 بلاي والقواعد المنظمة للخدمة.",
};

export default function TermsPage() {
  const sections = [
    {
      title: "قبول الشروط",
      content:
        "باستخدامك لموقع يلا7 بلاي، فإنك تقر بموافقتك الكاملة على هذه الشروط والأحكام. إذا كنت لا توافق على أي جزء منها، فيجب عليك التوقف عن استخدام الموقع فوراً.",
    },
    {
      title: "الملكية الفكرية",
      content:
        "جميع المحتويات المتوفرة على الموقع، بما في ذلك النصوص والرسومات والشعارات والأيقونات والبرمجيات، هي ملك للموقع أو لمرخصيه ومحمية بموجب قوانين الملكية الفكرية الدولية. يُمنع إعادة نشر أو توزيع أي جزء من المحتوى دون إذن كتابي مسبق.",
    },
    {
      title: "استخدام الخدمات",
      content:
        "يُسمح لك باستخدام المحتوى المتوفر للتحميل الشخصي وغير التجاري فقط. يُحظر تماماً استخدام الموقع في أي أنشطة غير قانونية أو ضارة أو تهدف إلى تعطيل خدمات الموقع أو الإضرار بالمستخدمين الآخرين.",
    },
    {
      title: "إخلاء المسؤولية",
      content:
        "يتم تقديم الألعاب والتطبيقات 'كما هي' دون أي ضمانات من أي نوع. الموقع غير مسؤول عن أي أضرار قد تلحق بجهازك نتيجة تحميل أو استخدام أي محتوى، أو عن دقة وموثوقية الروابط الخارجية.",
    },
    {
      title: "التعديلات",
      content:
        "نحتفظ بالحق في تعديل هذه الشروط في أي وقت ودون إخطار مسبق. يُعد استمرارك في استخدام الموقع بعد نشر التعديلات موافقة منك عليها.",
    },
    {
      title: "روابط الطرف الثالث",
      content:
        "قد يحتوي موقعنا على روابط لمواقع خارجية لا تخضع لسيطرتنا. نحن لا نتحمل المسؤولية عن محتوى أو سياسات هذه المواقع وننصحك بقراءة شروط كل موقع تزوره.",
    },
  ];

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[3.5rem] border-4 border-double border-slate-50 bg-white p-8 md:p-16 shadow-2xl">
          <header className="text-center mb-16 space-y-4">
             <div className="inline-block rounded-2xl bg-indigo-600 px-6 py-2 text-sm font-black text-white shadow-lg shadow-indigo-500/20">قانوني</div>
             <h1 className="text-4xl font-black text-slate-800 md:text-5xl">شروط الاستخدام</h1>
          </header>

          <div className="space-y-16">
            {sections.map((section, i) => (
              <section key={i} className="group space-y-4">
                <div className="flex items-center gap-4">
                   <div className="h-10 w-2 rounded-full bg-indigo-600 shadow-sm" />
                   <h2 className="text-2xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors">{section.title}</h2>
                </div>
                <p className="text-lg leading-relaxed text-slate-600 font-bold pr-6 border-r-2 border-slate-50">
                  {section.content}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-20 rounded-[2.5rem] border border-slate-100 bg-slate-50 p-8 text-center">
             <p className="text-slate-400 font-bold">بموافقتك على استخدام الموقع، أنت تلتزم بالقواعد أعلاه لضمان تجربة آمنة للجميع.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
