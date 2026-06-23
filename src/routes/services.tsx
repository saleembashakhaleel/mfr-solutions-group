import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { useT } from "@/i18n/I18nProvider";
import elec from "@/assets/service-electrical.jpg";
import mech from "@/assets/service-mechanical.jpg";
import hvac from "@/assets/service-hvac.jpg";
import oilgas from "@/assets/service-oilgas.jpg";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services – Electrical, Mechanical, HVAC & Turnkey Projects" },
      { name: "description", content: "Full-scope engineering services: contracting, maintenance and consulting for electrical, mechanical and HVAC systems." },
    ],
  }),
});

const services = [
  {
    id: "electrical",
    img: elec, tag: "Electrical Contracting",
    t: "Power systems engineered for reliability",
    p: "Substations, switchgear, panel building, distribution boards, MV/LV cabling, earthing and lightning protection — engineered, supplied and commissioned by certified electrical specialists.",
    li: ["HV / MV / LV installations", "Switchgear & panel assembly", "Cabling, terminations & glanding", "Earthing & lightning protection"],
  },
  {
    id: "mechanical",
    img: mech, tag: "Mechanical Contracting",
    t: "Process and plant mechanical works",
    p: "Rotating equipment installation, structural steel, piping fabrication and full mechanical balance-of-plant for process industries, refineries and manufacturing facilities.",
    li: ["Rotating equipment installation", "Structural & platework fabrication", "Process piping & supports", "Mechanical erection & commissioning"],
  },
  {
    id: "hvac",
    img: hvac, tag: "HVAC & Refrigeration",
    t: "Climate control with proven uptime",
    p: "Design, installation and preventive maintenance of industrial HVAC, chillers, AHUs, cleanrooms and refrigeration plants — including 24/7 service contracts.",
    li: ["Chillers, AHUs & cooling towers", "Cleanroom & data-centre cooling", "Refrigeration plants", "AMC with KPI reporting"],
  },
  {
    id: "oilgas",
    img: oilgas, tag: "Oil & Gas Services",
    t: "Specialist services for oil, gas & petrochemical",
    p: "Engineering, construction and shutdown maintenance support for refineries, gas plants, pipelines and tank farms across the Gulf and Indian sub-continent — delivered to international HSE standards.",
    li: ["Refinery & gas-plant EPC support", "Pipelines, tank farms & terminals", "Pre-commissioning & shutdowns", "Instrumentation & fire-and-gas"],
  },
];

function ServicesPage() {
  const t = useT();
  return (
    <SiteLayout>
      <PageHero
        eyebrow={t("Services")}
        title={t("End-to-end engineering services for industry.")}
        subtitle={t("From single-discipline maintenance contracts to multi-discipline turnkey projects, our teams deliver on three core promises: safe, on time, on budget.")}
        crumbs={[{ to: "/", label: "Home" }, { to: "/services", label: "Services" }]}
        image={mech}
      />

      {/* Stats strip */}
      <div className="grid grid-cols-2 md:grid-cols-4" style={{ background: "var(--color-darker)" }}>
        {[
          { n: "120+", l: "Projects delivered" },
          { n: "3", l: "Country presence" },
          { n: "24/7", l: "Site support" },
          { n: "ISO", l: "9001 · 14001 · 45001" },
        ].map((s, i) => (
          <div key={i} className="px-6 py-8 text-center" style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,.06)" : "" }}>
            <div className="display text-3xl" style={{ color: "var(--color-brand-3)" }}>{s.n}</div>
            <div className="text-[0.66rem] mt-1 tracking-[0.16em] uppercase font-semibold" style={{ color: "rgba(255,255,255,.6)" }}>{t(s.l)}</div>
          </div>
        ))}
      </div>

      <div className="container-x section flex flex-col gap-px" style={{ background: "var(--color-border)" }}>
        {services.map((s, idx) => (
          <div id={s.id} key={idx} className="grid grid-cols-1 lg:grid-cols-2 bg-white">
            <div className={`relative min-h-[420px] overflow-hidden group ${idx % 2 ? "lg:order-2" : ""}`}>
              <img src={s.img} alt={s.t} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, transparent 55%, rgba(0,43,71,.5))" }} />
              <div className="absolute top-5 left-5 px-3 py-1.5 text-[0.62rem] font-bold tracking-[0.22em] uppercase"
                   style={{ background: "rgba(255,255,255,.96)", color: "var(--color-blue-brand)" }}>
                {`0${idx + 1}`} · {t(s.tag)}
              </div>
            </div>
            <div className="px-8 md:px-14 py-14 md:py-20 flex flex-col justify-center">
              <div className="eyebrow mb-3">{t(s.tag)}</div>
              <h2 className="display display-md mb-3">{t(s.t)}</h2>
              <p className="text-base font-light" style={{ color: "var(--color-muted-text)" }}>{t(s.p)}</p>
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm">
                {s.li.map((li, i) => (
                  <li key={i} className="flex items-start gap-2" style={{ color: "var(--color-body-text)" }}>
                    <span style={{ color: "var(--color-brand)" }}>✓</span> {t(li)}
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <Link to="/contact" className="btn-primary">{t("Discuss your project →")}</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section id="engagement" className="section container-x" style={{ background: "var(--color-off)" }}>
        <div className="max-w-2xl mb-10">
          <div className="eyebrow is-blue mb-3">{t("Engagement Models")}</div>
          <h2 className="display display-md">{t("Three ways to work with our engineering team.")}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 border" style={{ borderColor: "var(--color-border)" }}>
          {[
            { t: "Turnkey EPC", p: "We own the full scope from engineering to commissioning, with single-point accountability and fixed-price delivery." },
            { t: "Time & Material", p: "Flexible engineering and site teams deployed against agreed rates — ideal for ongoing capex programs." },
            { t: "Annual Maintenance", p: "KPI-backed maintenance contracts with 24/7 emergency response and quarterly performance reviews." },
          ].map((m, i) => (
            <div key={i} className="p-10 border-r last:border-r-0 bg-white" style={{ borderColor: "var(--color-border)" }}>
              <div className="eyebrow mb-3">{`0${i + 1}`}</div>
              <h3 className="display text-2xl mb-3">{t(m.t)}</h3>
              <p className="text-sm font-light" style={{ color: "var(--color-muted-text)" }}>{t(m.p)}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}