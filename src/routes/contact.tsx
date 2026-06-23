import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { useT } from "@/i18n/I18nProvider";
import hero from "@/assets/hero-3.jpg";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact MFR Solutions Group – India · KSA · UAE" },
      { name: "description", content: "Reach our engineering team in Trichy (India), Riyadh (Saudi Arabia) and Dubai (UAE). Project enquiries answered within one business day." },
    ],
  }),
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const t = useT();

  return (
    <SiteLayout>
      <PageHero
        eyebrow={t("Contact")}
        title={t("Let's talk about your project.")}
        subtitle={t("Tell us about the scope and we'll respond within one business day with the right engineering team.")}
        crumbs={[{ to: "/", label: "Home" }, { to: "/contact", label: "Contact" }]}
        image={hero}
      />

      <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.7fr]">
        <div className="px-8 md:px-14 py-16" style={{ background: "var(--color-dark)" }}>
          <div className="eyebrow is-light mb-3">{t("Reach Us")}</div>
          <h2 className="display text-3xl mb-4" style={{ color: "#fff" }}>{t("Our Offices")}</h2>
          <p className="text-sm font-light" style={{ color: "rgba(255,255,255,0.6)" }}>
            {t("Three regional offices across India, Saudi Arabia and the United Arab Emirates.")}
          </p>

          <div className="mt-8 flex flex-col gap-5">
            {[
              {
                flag: "🇮🇳", country: "India · Headquarters", city: "Trichy, Tamil Nadu, India",
                lines: ["Operating since 2020"], phone: null,
              },
              {
                flag: "🇸🇦", country: "Saudi Arabia", city: "Riyadh",
                lines: ["B12, RFRA3688, Khurais Branch Road", "Al Rawdah District, Riyadh 13211"],
                phone: { v: "+966 11 402 9211", href: "tel:+966114029211" },
              },
              {
                flag: "🇦🇪", country: "United Arab Emirates", city: "Dubai, UAE",
                lines: ["Branch Office"], phone: null,
              },
            ].map((c, i) => (
              <div key={i} className="p-5"
                   style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.flag}</span>
                  <div>
                    <div className="text-[0.62rem] font-bold tracking-[0.18em] uppercase" style={{ color: "var(--color-brand)" }}>{t(c.country)}</div>
                    <div className="text-sm font-bold" style={{ color: "#fff" }}>{t(c.city)}</div>
                  </div>
                </div>
                <div className="mt-3 text-sm font-light" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {c.lines.map((l, j) => <div key={j}>{t(l)}</div>)}
                  {c.phone && (
                    <a href={c.phone.href} className="block mt-1.5 hover:underline" style={{ color: "var(--color-blue-brand-3)" }}>📞 {c.phone.v}</a>
                  )}
                </div>
              </div>
            ))}

            <div className="pt-3 mt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
              <a href="mailto:contact@mfrsolutionsgroup.com" className="block text-sm font-light hover:underline" style={{ color: "var(--color-blue-brand-3)" }}>✉ contact@mfrsolutionsgroup.com</a>
            </div>
          </div>
        </div>

        <div className="px-8 md:px-14 py-16" style={{ background: "var(--color-off)" }}>
          <h2 className="display text-3xl mb-2">{t("Project enquiry")}</h2>
          <p className="text-sm font-light mb-8" style={{ color: "var(--color-muted-text)" }}>
            {t("All fields are required. We respond within one business day.")}
          </p>

          {sent ? (
            <div className="bg-white p-8 border" style={{ borderColor: "var(--color-border)" }}>
              <div className="eyebrow is-blue mb-3">{t("Thank you")}</div>
              <h3 className="display text-2xl mb-2">{t("Your enquiry has been received.")}</h3>
              <p className="text-sm font-light" style={{ color: "var(--color-muted-text)" }}>
                {t("A member of our engineering team will be in touch within one business day.")}
              </p>
            </div>
          ) : (
            <form
              className="bg-white p-8 border space-y-5"
              style={{ borderColor: "var(--color-border)" }}
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label={t("Full Name")} name="name" required />
                <Field label={t("Company")} name="company" required />
                <Field label={t("Email")} name="email" type="email" required />
                <Field label={t("Phone")} name="phone" type="tel" />
              </div>
              <div>
                <Label>{t("Service of Interest")}</Label>
                <select required name="service" className="w-full bg-white border px-4 py-3 text-sm outline-none"
                        style={{ borderColor: "var(--color-border)", color: "var(--color-ink)" }}>
                  <option value="">{t("Select a service…")}</option>
                  <option>{t("Electrical Contracting")}</option>
                  <option>{t("Mechanical Contracting")}</option>
                  <option>{t("HVAC & Refrigeration")}</option>
                  <option>{t("Annual Maintenance Contract")}</option>
                  <option>{t("Turnkey EPC")}</option>
                  <option>{t("Engineering Consulting")}</option>
                </select>
              </div>
              <div>
                <Label>{t("Project Details")}</Label>
                <textarea required name="message" rows={5}
                          className="w-full bg-white border px-4 py-3 text-sm outline-none"
                          style={{ borderColor: "var(--color-border)", color: "var(--color-ink)" }}
                          placeholder={t("Tell us about your scope, location and timeline…")} />
              </div>
              <button type="submit" className="btn-blue">{t("Send Enquiry →")}</button>
            </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[0.7rem] font-bold tracking-[0.14em] uppercase mb-2" style={{ color: "var(--color-ink)" }}>
      {children}
    </label>
  );
}
function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        name={name} type={type} required={required}
        className="w-full bg-white border px-4 py-3 text-sm outline-none focus:ring-2"
        style={{ borderColor: "var(--color-border)", color: "var(--color-ink)" }}
      />
    </div>
  );
}