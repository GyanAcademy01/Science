import type { Metadata } from "next";
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Mail,
  ExternalLink,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { BackArrow } from "@/components/common/BackArrow";
import { ContactForm } from "@/components/common/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "સંપર્ક",
  description: `Gyan Academy, ${siteConfig.place} — સંપર્ક માહિતી અને સરનામું.`,
};

const FAQS = [
  {
    q: "શું આ એપમાં બધી સામગ્રી મફત (Free) છે?",
    a: "હા, ધોરણ ૬ વિજ્ઞાનની તમામ થિયરી, MCQ ટેસ્ટ અને ઓરિજિનલ PDF પુસ્તિકાઓ સંપૂર્ણપણે મફત છે.",
  },
  {
    q: "MCQ ટેસ્ટ આપ્યા પછી રિઝલ્ટ ક્યાં જોઈ શકાય?",
    a: "દરેક પ્રશ્નના જવાબ સાથે તરત જ સમજૂતી મળે છે અને ટેસ્ટ પૂરી થતાં જ તમારો ફાઇનલ સ્કોર અને પ્રગતિ બતાવવામાં આવે છે.",
  },
  {
    q: "એપમાં કોઈ ભૂલ કે સુધારો સૂચવવો હોય તો શું કરવું?",
    a: "તમે નીચે આપેલા ફોર્મ દ્વારા અથવા વોટ્સએપ (WhatsApp) પર સીધો મેસેજ મોકલીને તમારું સૂચન આપી શકો છો.",
  },
];

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-[960px] px-3.5 py-4 sm:px-6 sm:py-7">
      <BackArrow href="/" label="હોમ" />

      {/* Header */}
      <header className="mt-3 mb-6 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--stroke-strong)] bg-[var(--surface)] px-3 py-1 text-xs font-semibold text-[var(--fg-muted)] shadow-sm">
          <Sparkles size={13} className="text-[var(--brand-1)]" />
          Gyan Academy Helpline
        </span>
        <h1 className="mt-2.5 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
          <span className="text-grad">સંપર્ક કરો</span>
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[var(--fg-muted)] max-w-[480px] mx-auto">
          અમારી ટીમ તમારો સંપર્ક કરવા અથવા માર્ગદર્શન આપવા માટે હંમેશા તૈયાર છે.
        </p>
      </header>

      {/* Contact Info Cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Phone */}
        <Card accentTop className="anim-fade-up p-4 flex flex-col justify-between">
          <div>
            <span
              className="grid h-10 w-10 place-items-center rounded-xl"
              style={{ background: "rgba(6,182,212,0.14)", color: "var(--brand-1)" }}
            >
              <Phone size={18} strokeWidth={2.2} />
            </span>
            <h2 className="mt-3 text-sm font-bold">ફોન હેલ્પલાઇન</h2>
            <div className="mt-2 flex flex-col gap-1">
              {siteConfig.phone.map((number) => (
                <a
                  key={number}
                  href={`tel:${number.replace(/\s/g, "")}`}
                  className="text-xs font-semibold text-[var(--brand-1)] transition-opacity hover:opacity-75"
                >
                  📞 {number}
                </a>
              ))}
            </div>
          </div>
          <p className="mt-3 text-[0.7rem] text-[var(--fg-muted)] border-t border-[var(--stroke)] pt-2">
            કૉલ કરવાનો સમય: સવારે ૯ થી ૭
          </p>
        </Card>

        {/* WhatsApp & Message */}
        <Card accentTop className="anim-fade-up p-4 flex flex-col justify-between" style={{ animationDelay: "0.08s" }}>
          <div>
            <span
              className="grid h-10 w-10 place-items-center rounded-xl"
              style={{ background: "rgba(16,185,129,0.14)", color: "#10b981" }}
            >
              <MessageCircle size={18} strokeWidth={2.2} />
            </span>
            <h2 className="mt-3 text-sm font-bold">વોટ્સએપ સંદેશ</h2>
            <p className="mt-1.5 text-xs text-[var(--fg-muted)]">
              કોઈપણ પ્રશ્ન માટે સીધો વોટ્સએપ મેસેજ કરો.
            </p>
          </div>
          <a
            href="https://wa.me/918758277555"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center justify-center gap-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors"
          >
            WhatsApp પર વાત કરો <ExternalLink size={12} />
          </a>
        </Card>

        {/* Location */}
        <Card accentTop className="anim-fade-up p-4 flex flex-col justify-between" style={{ animationDelay: "0.16s" }}>
          <div>
            <span
              className="grid h-10 w-10 place-items-center rounded-xl"
              style={{ background: "rgba(124,58,237,0.14)", color: "#8b5cf6" }}
            >
              <MapPin size={18} strokeWidth={2.2} />
            </span>
            <h2 className="mt-3 text-sm font-bold">અમારા વિશે / સ્થળ</h2>
            <p className="mt-1.5 text-xs leading-relaxed text-[var(--fg-muted)]">
              Gyan Academy
              <br />
              {siteConfig.place}
            </p>
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Gyan Academy Gandhinagar")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-[0.72rem] font-semibold text-[var(--brand-1)] hover:underline"
          >
            મેપ પર શોધો <ExternalLink size={11} />
          </a>
        </Card>

        {/* Hours & Email */}
        <Card accentTop className="anim-fade-up p-4 flex flex-col justify-between" style={{ animationDelay: "0.24s" }}>
          <div>
            <span
              className="grid h-10 w-10 place-items-center rounded-xl"
              style={{ background: "rgba(245,158,11,0.16)", color: "#f59e0b" }}
            >
              <Clock size={18} strokeWidth={2.2} />
            </span>
            <h2 className="mt-3 text-sm font-bold">ઓફિસ સમય</h2>
            <p className="mt-1.5 text-xs leading-relaxed text-[var(--fg-muted)]">
              સોમવારથી શનિવાર
              <br />
              સવારે ૯:૦૦ થી સાંજે ૭:૦૦
            </p>
          </div>
          <div className="mt-3 border-t border-[var(--stroke)] pt-2 flex items-center gap-1.5 text-[0.7rem] text-[var(--fg-muted)]">
            <Mail size={12} className="shrink-0 text-[var(--brand-1)]" />
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-semibold text-[var(--fg)] hover:text-[var(--brand-1)] transition-colors break-all"
            >
              {siteConfig.email}
            </a>
          </div>
        </Card>
      </div>

      {/* Interactive Form Section */}
      <section className="mt-8">
        <ContactForm />
      </section>

      {/* FAQ Section */}
      <section className="mt-8 border-t border-[var(--stroke)] pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle size={18} className="text-[var(--brand-1)]" />
          <h2 className="text-base font-bold">સામાન્ય રીતે પૂછાતા પ્રશ્નો (FAQ)</h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {FAQS.map((faq) => (
            <div key={faq.q} className="glass rounded-[var(--r-md)] p-3.5">
              <p className="text-xs font-bold text-[var(--fg)]">{faq.q}</p>
              <p className="mt-1.5 text-[0.75rem] leading-relaxed text-[var(--fg-muted)]">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
