"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

const INITIAL_FORM = {
  name: "",
  phone: "",
  subject: "સામાન્ય પ્રશ્ન",
  message: "",
};

type FormData = typeof INITIAL_FORM;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    if (data.name.length < 2 || data.name.length > 80) {
      setError("કૃપા કરીને નામ 2 થી 80 અક્ષરમાં લખો.");
      return;
    }
    if (data.phone.length < 5 || data.phone.length > 25) {
      setError("કૃપા કરીને માન્ય મોબાઇલ નંબર લખો.");
      return;
    }
    if (!data.subject || data.subject.length > 80) {
      setError("કૃપા કરીને વિષય પસંદ કરો.");
      return;
    }
    if (data.message.length < 1 || data.message.length > 2000) {
      setError("સંદેશ 1 થી 2000 અક્ષરનો હોવો જોઈએ.");
      return;
    }

    const body = [
      `નામ: ${data.name}`,
      `મોબાઇલ: ${data.phone}`,
      `વિષય: ${data.subject}`,
      "",
      data.message,
    ].join("\n");
    const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      `Gyan Academy સંપર્ક: ${data.subject}`,
    )}&body=${encodeURIComponent(body)}`;

    setError("");
    window.location.href = mailto;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="glass rounded-[var(--r-lg)] p-6 text-center anim-fade-up">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[var(--ok-soft)] text-[var(--ok)]">
          <CheckCircle2 size={24} />
        </div>
        <h3 className="mt-3 text-lg font-bold">Email composer ખોલવાનો પ્રયાસ થયો છે.</h3>
        <p className="mt-1.5 text-xs text-[var(--fg-muted)]">
          સંદેશ મોકલાયો હોવાનો દાવો નથી: તમારા deviceનું email app ખુલ્યું હોય તો ત્યાંથી મોકલવાનું બાકી છે. ન ખુલ્યું હોય તો {" "}
          <a className="font-semibold text-[var(--brand-1)] hover:underline" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
          {" "}પર સીધો email કરો.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData(INITIAL_FORM);
          }}
          className="mt-4 text-xs font-semibold text-[var(--brand-1)] hover:underline"
        >
          બીજો સંદેશ લખો →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass space-y-3.5 rounded-[var(--r-lg)] p-4 sm:p-6">
      <h3 className="text-base font-bold">તમારો સંદેશ મોકલો</h3>
      {error ? (
        <p role="alert" className="rounded-[var(--r-md)] bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-semibold text-[var(--fg-muted)] mb-1">
            તમારું નામ *
          </label>
          <input
            id="contact-name"
            type="text"
            required
            maxLength={80}
            autoComplete="name"
            value={formData.name}
            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
            className="w-full rounded-[var(--r-md)] border border-[var(--stroke)] bg-[var(--surface-2)] px-3 py-2 text-xs text-[var(--fg)] focus:border-[var(--brand-1)] focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="contact-phone" className="block text-xs font-semibold text-[var(--fg-muted)] mb-1">
            મોબાઇલ નંબર *
          </label>
          <input
            id="contact-phone"
            type="tel"
            required
            maxLength={25}
            autoComplete="tel"
            value={formData.phone}
            onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
            className="w-full rounded-[var(--r-md)] border border-[var(--stroke)] bg-[var(--surface-2)] px-3 py-2 text-xs text-[var(--fg)] focus:border-[var(--brand-1)] focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-xs font-semibold text-[var(--fg-muted)] mb-1">
          વિષય
        </label>
        <select
          id="contact-subject"
          value={formData.subject}
          onChange={(event) => setFormData({ ...formData, subject: event.target.value })}
          className="w-full rounded-[var(--r-md)] border border-[var(--stroke)] bg-[var(--surface-2)] px-3 py-2 text-xs text-[var(--fg)] focus:border-[var(--brand-1)] focus:outline-none"
        >
          <option value="સામાન્ય પ્રશ્ન">સામાન્ય પ્રશ્ન</option>
          <option value="MCQ ટેસ્ટ અંગે">MCQ ટેસ્ટ અંગે</option>
          <option value="PDF પ્રશ્ન">PDF પુસ્તિકા અંગે</option>
          <option value="અન્ય સૂચન">અન્ય સૂચન</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs font-semibold text-[var(--fg-muted)] mb-1">
          સંદેશ અથવા પ્રશ્ન *
        </label>
        <textarea
          id="contact-message"
          rows={3}
          required
          maxLength={2000}
          value={formData.message}
          onChange={(event) => setFormData({ ...formData, message: event.target.value })}
          className="w-full rounded-[var(--r-md)] border border-[var(--stroke)] bg-[var(--surface-2)] px-3 py-2 text-xs text-[var(--fg)] focus:border-[var(--brand-1)] focus:outline-none"
        />
      </div>

      <Button type="submit" className="w-full sm:w-auto shimmer-cta rounded-full text-xs px-6 py-2">
        સંદેશ મોકલો <Send size={13} className="ml-1.5" />
      </Button>
    </form>
  );
}
