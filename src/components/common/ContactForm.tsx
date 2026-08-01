"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "સામાન્ય પ્રશ્ન",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="glass rounded-[var(--r-lg)] p-6 text-center anim-fade-up">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[var(--ok-soft)] text-[var(--ok)]">
          <CheckCircle2 size={24} />
        </div>
        <h3 className="mt-3 text-lg font-bold">સંદેશ મળી ગયો છે!</h3>
        <p className="mt-1.5 text-xs text-[var(--fg-muted)]">
          ધન્યવાદ {formData.name}! આપના સંદેશનો Gyan Academy ટીમ દ્વારા ટૂંક સમયમાં સંપર્ક કરવામાં આવશે.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: "", phone: "", subject: "સામાન્ય પ્રશ્ન", message: "" });
          }}
          className="mt-4 text-xs font-semibold text-[var(--brand-1)] hover:underline"
        >
          બીજો સંદેશ મોકલો →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass space-y-3.5 rounded-[var(--r-lg)] p-4 sm:p-6">
      <h3 className="text-base font-bold">તમારો સંદેશ મોકલો</h3>
      
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-semibold text-[var(--fg-muted)] mb-1">
            તમારું નામ *
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
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
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full rounded-[var(--r-md)] border border-[var(--stroke)] bg-[var(--surface-2)] px-3 py-2 text-xs text-[var(--fg)] focus:border-[var(--brand-1)] focus:outline-none"
        />
      </div>

      <Button type="submit" className="w-full sm:w-auto shimmer-cta rounded-full text-xs px-6 py-2">
        સંદેશ મોકલો <Send size={13} className="ml-1.5" />
      </Button>
    </form>
  );
}
