import type { Metadata } from "next";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { BackArrow } from "@/components/common/BackArrow";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "સંપર્ક",
  description: `Gyan Academy, ${siteConfig.place} — સંપર્ક માહિતી.`,
};

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-[900px] px-4 py-6 sm:py-10">
      <BackArrow href="/" label="હોમ" />

      <header className="mt-4 mb-6 text-center">
        <h1 className="text-[1.5rem] sm:text-[2.25rem]">
          <span className="text-grad">સંપર્ક કરો</span>
        </h1>
        <p className="mt-2 text-[0.88rem] text-[var(--fg-muted)]">
          કોઈ પ્રશ્ન કે સૂચન હોય તો અમને જણાવો
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Card accentTop className="anim-fade-up p-5 sm:p-6">
          <span
            className="grid h-11 w-11 place-items-center rounded-[var(--r-md)]"
            style={{ background: "rgba(6,182,212,0.14)" }}
          >
            <Phone size={20} strokeWidth={2.2} />
          </span>
          <h2 className="mt-3 text-[1.1rem]">ફોન</h2>
          <div className="mt-2 flex flex-col gap-1.5">
            {siteConfig.phone.map((number) => (
              <a
                key={number}
                href={`tel:${number.replace(/\s/g, "")}`}
                className="text-[0.95rem] font-semibold text-[var(--brand-2)] transition-opacity hover:opacity-75"
              >
                {number}
              </a>
            ))}
          </div>
        </Card>

        <Card
          accentTop
          className="anim-fade-up p-5 sm:p-6"
          style={{ animationDelay: "0.08s" }}
        >
          <span
            className="grid h-11 w-11 place-items-center rounded-[var(--r-md)]"
            style={{ background: "rgba(124,58,237,0.14)" }}
          >
            <MapPin size={20} strokeWidth={2.2} />
          </span>
          <h2 className="mt-3 text-[1.1rem]">સ્થળ</h2>
          <p className="mt-2 text-[0.92rem] leading-relaxed text-[var(--fg-muted)]">
            Gyan Academy
            <br />
            {siteConfig.place}
          </p>
        </Card>

        <Card
          accentTop
          className="anim-fade-up p-5 sm:p-6"
          style={{ animationDelay: "0.16s" }}
        >
          <span
            className="grid h-11 w-11 place-items-center rounded-[var(--r-md)]"
            style={{ background: "rgba(245,158,11,0.16)" }}
          >
            <Clock size={20} strokeWidth={2.2} />
          </span>
          <h2 className="mt-3 text-[1.1rem]">સમય</h2>
          <p className="mt-2 text-[0.92rem] leading-relaxed text-[var(--fg-muted)]">
            સોમવારથી શનિવાર
            <br />
            સવારે ૯:૦૦ થી સાંજે ૭:૦૦
          </p>
        </Card>

        <Card
          accentTop
          className="anim-fade-up p-5 sm:p-6"
          style={{ animationDelay: "0.24s" }}
        >
          <span
            className="grid h-11 w-11 place-items-center rounded-[var(--r-md)]"
            style={{ background: "rgba(16,185,129,0.14)" }}
          >
            <MessageCircle size={20} strokeWidth={2.2} />
          </span>
          <h2 className="mt-3 text-[1.1rem]">સૂચન</h2>
          <p className="mt-2 text-[0.92rem] leading-relaxed text-[var(--fg-muted)]">
            લખાણમાં કોઈ ભૂલ જણાય કે નવું પ્રકરણ જોઈતું હોય, તો ઉપરના નંબર પર
            સંદેશ મોકલો.
          </p>
        </Card>
      </div>
    </main>
  );
}
