import type { Metadata } from "next";
import { Mail, MessageCircle, Phone, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "اتصل بنا | يلا7 بلاي",
  description: "تواصل معنا لأي استفسار أو اقتراح، فريقنا جاهز للرد عليك في أي وقت.",
};

export default function ContactUsPage() {
  const contactInfo = [
    {
      label: "البريد الإلكتروني",
      value: "support@yalla7play.com",
      href: "mailto:support@yalla7play.com",
      icon: Mail,
      color: "bg-[#FFF8EE] text-[#FF8A00]"
    },
    {
      label: "تيليجرام",
      value: "@yalla7play_support",
      href: "https://t.me/yalla7play_support",
      icon: MessageCircle,
      color: "bg-[#FFF8EE] text-[#FF8A00]"
    },
    {
      label: "رقم الهاتف",
      value: "+20 10 35445759",
      href: "tel:+201035445759",
      icon: Phone,
      color: "bg-[#FFF8EE] text-[#FF8A00]"
    },
  ];

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <h1 className="text-4xl font-black text-slate-800 md:text-5xl">تواصل معنا</h1>
          <p className="text-lg text-slate-600 leading-relaxed font-bold">فريق يلا7 بلاي دائماً في خدمتك، لا تتردد في مراسلتنا في أي وقت.</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Contact Form */}
          <form className="overflow-hidden rounded-[3rem] border border-orange-100 bg-white p-8 md:p-12 shadow-sm transition hover:shadow-xl">
            <h2 className="text-2xl font-black text-slate-800 mb-8">أرسل رسالة</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 mr-2">الاسم</label>
                <input type="text" className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 px-6 py-3 font-medium text-slate-900 transition focus:border-[#FF8A00] focus:bg-white focus:outline-none" placeholder="الاسم الكامل" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 mr-2">البريد الإلكتروني</label>
                <input type="email" className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 px-6 py-3 font-medium text-slate-900 transition focus:border-[#FF8A00] focus:bg-white focus:outline-none" placeholder="example@mail.com" />
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <label className="text-sm font-bold text-slate-500 mr-2">الموضوع</label>
              <input type="text" className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 px-6 py-3 font-medium text-slate-900 transition focus:border-[#FF8A00] focus:bg-white focus:outline-none" placeholder="اقتراح / استفسار / شكوى" />
            </div>
            <div className="mt-6 space-y-2">
              <label className="text-sm font-bold text-slate-500 mr-2">الرسالة</label>
              <textarea className="w-full rounded-[2rem] border-2 border-slate-50 bg-slate-50/50 px-6 py-4 font-medium text-slate-900 transition focus:border-[#FF8A00] focus:bg-white focus:outline-none min-h-[160px]" placeholder="اكتب رسالتك هنا..." />
            </div>
            <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FF8A00] py-4 font-black text-white shadow-lg shadow-orange-500/30 transition hover:bg-[#e67e00] hover:shadow-orange-500/40" type="button">
              إرسال الرسالة
              <Send className="h-5 w-5 rotate-180" />
            </button>
          </form>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((info, i) => (
              <a
                key={i}
                href={info.href}
                target={info.href.startsWith("http") ? "_blank" : undefined}
                rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group block overflow-hidden rounded-[2.5rem] border border-orange-50 bg-white p-8 transition hover:shadow-xl hover:border-orange-100"
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${info.color} transition-colors group-hover:scale-110 duration-300`}>
                  <info.icon className="h-6 w-6" />
                </div>
                <div className="text-sm font-bold text-slate-400 mb-1">{info.label}</div>
                <div className="text-lg font-black text-slate-800 break-words group-hover:text-[#FF8A00] transition-colors">{info.value}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
