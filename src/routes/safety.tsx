import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { useT } from "@/i18n/I18nProvider";
import safety from "@/assets/safety.jpg";
import safetyTraining from "@/assets/safety-training.jpg";

export const Route = createFileRoute("/safety")({
  component: SafetyPage,
  head: () => ({
    meta: [
      { title: "Safety, Quality & HSE – MFR Solutions Group" },
      { name: "description", content: "ISO 9001 and ISO 45001 certified. Documented HSE management, daily toolbox talks and zero-harm targets on every project." },
    ],
  }),
});

function SafetyPage() {
  const t = useT();
  return (
    <SiteLayout>
      <PageHero
        eyebrow={t("Safety")}
        title={t("Zero-harm is the only acceptable target.")}
        subtitle={t("Safety and quality are written into every contract, every method statement and every toolbox talk.")}
        crumbs={[{ to: "/", label: "Home" }, { to: "/safety", label: "Safety" }]}
        image={safety}
      />

      <section id="hse" className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[400px]">
          <img src={safetyTraining} alt="Daily toolbox talk on site" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="px-8 md:px-16 py-16 md:py-20 bg-white">
          <div className="eyebrow mb-3">{t("Our HSE Philosophy")}</div>
          <h2 className="display display-md mb-4">{t("Engineered safely, documented thoroughly.")}</h2>
          <p className="text-base font-light mb-4" style={{ color: "var(--color-muted-text)" }}>
            {t("Every project starts with a hazard identification and risk assessment (HIRA). Method statements, permits-to-work and daily toolbox talks ensure every team member understands the risks and controls before lifting a tool.")}
          </p>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            {[
              { id: "quality", text: "ISO 9001:2015 Quality Management System" },
              { id: "ohs", text: "ISO 45001:2018 Occupational Health & Safety" },
              { id: undefined, text: "Documented HIRA & method statements" },
              { id: undefined, text: "Daily toolbox talks and weekly HSE audits" },
              { id: undefined, text: "Certified electrical & lifting supervisors on site" },
              { id: undefined, text: "Incident reporting & root-cause analysis culture" },
            ].map((item) => (
              <li id={item.id} key={item.text} className="flex items-center gap-2" style={{ color: "var(--color-body-text)" }}>
                <span style={{ color: "var(--color-brand)" }}>✓</span> {t(item.text)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="certifications" className="section container-x" style={{ background: "var(--color-off)" }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "var(--color-border)" }}>
          {[
            { n: "0", l: "LTI in last 24 months" },
            { n: "1.2M+", l: "Safe man-hours" },
            { n: "100%", l: "PPE compliance" },
            { n: "45001", l: "ISO certified" },
          ].map((s, i) => (
            <div key={i} className="bg-white p-10 text-center">
              <div className="display text-3xl" style={{ color: "var(--color-brand)" }}>{s.n}</div>
              <div className="text-[0.7rem] mt-1 uppercase tracking-[0.14em] font-semibold" style={{ color: "var(--color-muted-text)" }}>{t(s.l)}</div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link to="/contact" className="btn-blue">{t("Request our HSE policy →")}</Link>
        </div>
      </section>
    </SiteLayout>
  );
}