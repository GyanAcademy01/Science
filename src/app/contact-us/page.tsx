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
    <main className="mx-auto w-full max-w-[900px] px-3 py-3 sm:py-5">
      <BackArrow href="/" label="હોમ" />

      <header className="mt-3 mb-4 text-center">
        <h1 className="text-[1.25rem] sm:text-[1.75rem]">
          <span className="text-grad">સંપર્ક કરો</span>
        </h1>
        <p className="mt-1.5 text-[0.8rem] text-[var(--fg-muted)]">
          કોઈ પ્રશ્ન કે સૂચન હોય તો અમને જણાવો
        </p>
      </header>

      <div className="grid gap-2.5 md:grid-cols-2">
        <Card accentTop className="anim-fade-up p-3.5 sm:p-4">
          <span
            className="grid h-9 w-9 place-items-center rounded-[var(--r-md)]"
            style={{ background: "rgba(6,182,212,0.14)" }}
          >
            <Phone size={17} strokeWidth={2.2} />
          </span>
          <h2 className="mt-2 text-[0.98rem]">ફોન</h2>
          <div className="mt-1.5 flex flex-col gap-1">
            {siteConfig.phone.map((number) => (
              <a
                key={number}
                href={`tel:${number.replace(/\s/g, "")}`}
                className="text-[0.86rem] font-semibold text-[var(--brand-2)] transition-opacity hover:opacity-75"
              >
                {number}
              </a>
            ))}
          </div>
        </Card>

        <Card
          accentTop
          className="anim-fade-up p-3.5 sm:p-4"
          style={{ animationDelay: "0.08s" }}
        >
          <span
            className="grid h-9 w-9 place-items-center rounded-[var(--r-md)]"
            style={{ background: "rgba(124,58,237,0.14)" }}
          >
            <MapPin size={17} strokeWidth={2.2} />
          </span>
          <h2 className="mt-2 text-[0.98rem]">સ્થળ</h2>
          <p className="mt-1.5 text-[0.84rem] leading-relaxed text-[var(--fg-muted)]">
            Gyan Academy
            <br />
            {siteConfig.place}
          </p>
        </Card>

        <Card
          accentTop
          className="anim-fade-up p-3.5 sm:p-4"
          style={{ animationDelay: "0.16s" }}
        >
          <span
            className="grid h-9 w-9 place-items-center rounded-[var(--r-md)]"
            style={{ background: "rgba(245,158,11,0.16)" }}
          >
            <Clock size={17} strokeWidth={2.2} />
          </span>
          <h2 className="mt-2 text-[0.98rem]">સમય</h2>
          <p className="mt-1.5 text-[0.84rem] leading-relaxed text-[var(--fg-muted)]">
            સોમવારથી શનિવાર
            <br />
            સવારે ૯:૦૦ થી સાંજે ૭:૦૦
          </p>
        </Card>

        <Card
          accentTop
          className="anim-fade-up p-3.5 sm:p-4"
          style={{ animationDelay: "0.24s" }}
        >
          <span
            className="grid h-9 w-9 place-items-center rounded-[var(--r-md)]"
            style={{ background: "rgba(16,185,129,0.14)" }}
          >
            <MessageCircle size={17} strokeWidth={2.2} />
          </span>
          <h2 className="mt-2 text-[0.98rem]">સૂચન</h2>
          <p className="mt-1.5 text-[0.84rem] leading-relaxed text-[var(--fg-muted)]">
            લખાણમાં કોઈ ભૂલ જણાય કે નવું પ્રકરણ જોઈતું હોય, તો ઉપરના નંબર પર
            સંદેશ મોકલો.
          </p>
        </Card>
      </div>
    </main>
  );
}
