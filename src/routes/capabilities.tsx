import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { useT } from "@/i18n/I18nProvider";
import cad from "@/assets/cap-cad.jpg";
import automation from "@/assets/cap-automation.jpg";

export const Route = createFileRoute("/capabilities")({
  component: CapabilitiesPage,
  head: () => ({
    meta: [
      { title: "Engineering Capabilities – MFR Solutions Group" },
      { name: "description", content: "Electrical installations, HV systems, inspection & testing, automation, CAD design studio and low-carbon energy solutions." },
    ],
  }),
});

const capabilities = [
  { id: "electrical", t: "Electrical Installations", p: "Complete electrical scope: LV/MV/HV installations, panel assembly, cabling, glanding and testing.", li: ["LT & HT panels", "Cabling & terminations", "Earthing systems"] },
  { id: "high-voltage", t: "High Voltage Systems", p: "Substation engineering up to 33 kV: switchgear, transformers, protection and SCADA integration.", li: ["33 kV substations", "Protection relays", "Transformer commissioning"] },
  { id: "testing", t: "Inspection & Testing", p: "Pre-commissioning, thermography, insulation testing and acceptance testing per IEC standards.", li: ["Thermography surveys", "Insulation & HiPot", "Relay coordination"] },
  { id: "automation", t: "Automation & PLC", p: "Allen Bradley, Siemens and Mitsubishi PLC programming, SCADA, HMI and BMS integration.", li: ["PLC programming", "SCADA / HMI", "BMS integration"] },
  { id: "cad", t: "CAD Design Studio", p: "Single-line diagrams, schematics, GA drawings and 3D plant models using AutoCAD and Revit.", li: ["SLDs & schematics", "GA & layout drawings", "3D plant modelling"] },
  { id: "maintenance", t: "Maintenance Contracts", p: "KPI-backed preventive maintenance, emergency response and asset-health reporting for critical systems.", li: ["AMC planning", "24/7 callouts", "Performance reports"] },
];

function CapabilitiesPage() {
  const t = useT();
  return (
    <SiteLayout>
      <PageHero
        eyebrow={t("Capabilities")}
        title={t("Deep technical capabilities across six disciplines.")}
        subtitle={t("Our engineers combine field experience with disciplined documentation, so every system we touch is well-built and well-recorded.")}
        crumbs={[{ to: "/", label: "Home" }, { to: "/capabilities", label: "Capabilities" }]}
        image={cad}
      />

      <section className="section container-x">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((c, i) => (
            <article id={c.id} key={i} className="p-9 transition-all hover:-translate-y-0.5"
                     style={{ background: "#fff", border: "1px solid var(--color-border)" }}>
              <div className="flex items-center gap-4 pb-4 mb-4 border-b" style={{ borderColor: "var(--color-border)" }}>
                <div className="ico-box text-lg">⚙</div>
                <div>
                  <div className="eyebrow">{t("Capability")} 0{i + 1}</div>
                  <div className="font-bold text-base mt-1" style={{ color: "var(--color-ink)" }}>{t(c.t)}</div>
                </div>
              </div>
              <p className="text-sm font-light mb-4" style={{ color: "var(--color-muted-text)" }}>{t(c.p)}</p>
              <ul className="flex flex-col gap-1.5 text-sm">
                {c.li.map((li, k) => (
                  <li key={k} className="flex items-center gap-2" style={{ color: "var(--color-body-text)" }}>
                    <span style={{ color: "var(--color-brand)" }}>✓</span> {t(li)}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2">
        {[{ img: cad, t: "CAD Studio", p: "From single-line diagrams to fully coordinated 3D plant models." },
          { img: automation, t: "Automation", p: "PLC, SCADA and BMS engineering for industrial uptime." }].map((b, i) => (
          <div key={i} className="relative min-h-[400px] overflow-hidden group">
            <img src={b.img} alt={b.t} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(4,10,18,.92), rgba(4,10,18,.2) 65%, transparent)" }} />
            <div className="absolute bottom-0 left-0 right-0 p-9">
              <div className="eyebrow is-light mb-3">{t(b.t)}</div>
              <h3 className="display text-2xl text-white max-w-md">{t(b.p)}</h3>
              <Link to="/contact" className="inline-flex items-center gap-2 mt-4 text-sm font-bold" style={{ color: "var(--color-brand-3)" }}>
                {t("Talk to our team →")}
              </Link>
            </div>
          </div>
        ))}
      </section>
    </SiteLayout>
  );
}