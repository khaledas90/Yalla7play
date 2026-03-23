import type { Metadata } from "next";
import { Mail, MessageCircle, Phone, MapPin, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "اتصل بنا | يلا7 بلاي",
  description: "تواصل معنا لأي استفسار أو اقتراح، فريقنا جاهز للرد عليك في أي وقت.",
};

export default function ContactUsPage() {
  const contactInfo = [
    { label: "البريد الإلكتروني", value: "support@yalla7play.com", icon: Mail, color: "bg-blue-50 text-blue-600" },
    { label: "تيليجرام", value: "@yalla7play_support", icon: MessageCircle, color: "bg-sky-50 text-sky-600" },
    { label: "رقم الهاتف", value: "+966 500 000 000", icon: Phone, color: "bg-indigo-50 text-indigo-600" },
    { label: "الموقع", value: "المنطقة الشرقية، المملكة العربية السعودية", icon: MapPin, color: "bg-slate-50 text-slate-600" },
  ];

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <h1 className="text-4xl font-black text-slate-800 md:text-5xl">تواصل معنا</h1>
          <p className="text-lg text-slate-600 leading-relaxed">فريق يلا7 بلاي دائماً في خدمتك، لا تتردد في مراسلتنا في أي وقت.</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-fit">
            {contactInfo.map((info, i) => (
              <div key={i} className="group overflow-hidden rounded-[2.5rem] border border-blue-50 bg-white p-8 transition hover:shadow-xl">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${info.color} transition-colors`}>
                  <info.icon className="h-6 w-6" />
                </div>
                <div className="text-sm font-bold text-slate-400 mb-1">{info.label}</div>
                <div className="text-lg font-black text-slate-800 break-words">{info.value}</div>
              </div>
            ))}
          </div>

          <form className="overflow-hidden rounded-[3rem] border border-blue-100 bg-white p-8 md:p-12 shadow-sm transition hover:shadow-xl">
            <h2 className="text-2xl font-black text-slate-800 mb-8">أرسل رسالة</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 mr-2">الاسم</label>
                <input type="text" className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 px-6 py-3 font-medium text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none" placeholder="الاسم الكامل" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 mr-2">البريد الإلكتروني</label>
                <input type="email" className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 px-6 py-3 font-medium text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none" placeholder="example@mail.com" />
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <label className="text-sm font-bold text-slate-500 mr-2">الموضوع</label>
              <input type="text" className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 px-6 py-3 font-medium text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none" placeholder="اقتراح / استفسار / شكوى" />
            </div>
            <div className="mt-6 space-y-2">
              <label className="text-sm font-bold text-slate-500 mr-2">الرسالة</label>
              <textarea className="w-full rounded-[2rem] border-2 border-slate-50 bg-slate-50/50 px-6 py-4 font-medium text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none min-h-[160px]" placeholder="اكتب رسالتك هنا..." defaultValue={""} />
            </div>
            <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 font-black text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-700 hover:shadow-blue-500/40">
              إرسال الرسالة
              <Send className="h-5 w-5 rotate-180" />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
