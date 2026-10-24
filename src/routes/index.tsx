import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useT } from "@/i18n/I18nProvider";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import elec from "@/assets/service-electrical.jpg";
import mech from "@/assets/service-mechanical.jpg";
import hvac from "@/assets/service-hvac.jpg";
import oilgas from "@/assets/service-oilgas.jpg";
import cad from "@/assets/cap-cad.jpg";
import automation from "@/assets/cap-automation.jpg";
import team from "@/assets/about-team.jpg";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "MFR Solutions Group – Engineering Excellence" },
      {
        name: "description",
        content:
          "Trusted partner for electrical, mechanical and HVAC contracting, maintenance and engineering consulting across India and global markets.",
      },
    ],
  }),
});

const slides = [
  { img: hero1, tag: "Engineering Excellence",      title: "Engineering Excellence Across Borders" },
  { img: hero3, tag: "Electrical Infrastructure",   title: "Reliable Industrial Infrastructure Solutions" },
  { img: hero5, tag: "Industrial Solutions",        title: "Powering Critical Industrial Operations" },
  { img: hero2, tag: "EPC Services",                title: "Delivering Quality Through Engineering" },
  { img: hero4, tag: "Transmission & Distribution", title: "Clean Energy For A Sustainable Future" },
];
const HERO_SUB = "Delivering safe, reliable and innovative engineering solutions across India, Saudi Arabia and the UAE.";

function HomePage() {
  const [i, setI] = useState(0);
  const t = useT();
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, []);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative h-screen min-h-[620px] overflow-hidden">
        {slides.map((s, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: idx === i ? 1 : 0, pointerEvents: idx === i ? "auto" : "none" }}
          >
            <img
              src={s.img}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{ transform: idx === i ? "scale(1)" : "scale(1.06)", transition: "transform 8s ease" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(108deg, rgba(4,10,18,.92) 0%, rgba(4,10,18,.68) 42%, color-mix(in oklab, var(--color-blue-brand) 36%, rgba(4,10,18,.18)) 100%), linear-gradient(18deg, color-mix(in oklab, var(--color-brand) 24%, transparent), transparent 48%)",
              }}
            />
            <div className="relative h-full container-x flex flex-col justify-center max-w-2xl pb-12 pt-24">
              <span
                className="reveal inline-flex items-center gap-2 px-4 py-1.5 text-[0.66rem] font-bold tracking-[0.24em] uppercase w-fit mb-5"
                style={{
                  color: "#b8e040",
                  background: "color-mix(in oklab, var(--color-brand) 14%, transparent)",
                  border: "1px solid color-mix(in oklab, var(--color-brand) 35%, transparent)",
                }}
              >
                {t(s.tag)}
              </span>
              <h1 className="reveal display display-lg" style={{ color: "#fff" }}>
                {t(s.title)}
              </h1>
              <p className="reveal mt-4 max-w-xl text-base font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.78)" }}>
                {t(HERO_SUB)}
              </p>
              <div className="reveal mt-8 flex flex-wrap gap-3">
                <Link to="/services" className="btn-primary">{t("Explore Services →")}</Link>
                <Link to="/contact" className="btn-outline-light">{t("Request a Quote")}</Link>
              </div>
            </div>
          </div>
        ))}
        {/* Dots */}
        <div className="absolute bottom-8 left-[8%] flex gap-2 z-10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Slide ${idx + 1}`}
              className="h-[3px] transition-all"
              style={{
                width: idx === i ? 46 : 24,
                background: idx === i ? "var(--color-brand)" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      </section>

      {/* CREDIBILITY STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-t-[3px]"
           style={{
             background: "linear-gradient(135deg, var(--color-dark), #0e2030)",
             borderColor: "var(--color-brand)",
           }}>
        {[
          "Established 2020",
          "Engineering & Infrastructure",
          "Industrial Solutions",
          "Electrical & EPC Services",
          "Safety-First Culture",
          "ISO Certified Operations",
        ].map((s, idx) => (
          <div key={idx} className="px-5 py-8 text-center transition-colors hover:bg-white/[0.04]"
               style={{ borderRight: idx < 5 ? "1px solid rgba(255,255,255,0.06)" : "" }}>
            <div className="text-[0.78rem] font-semibold tracking-[0.08em]" style={{ color: "rgba(255,255,255,0.78)" }}>{t(s)}</div>
          </div>
        ))}
      </div>

      {/* SERVICES */}
      <section className="section container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="eyebrow mb-3">{t("What we do")}</div>
            <h2 className="display display-md">{t("Engineering services for industry and infrastructure")}</h2>
          </div>
          <Link to="/services" className="text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all" style={{ color: "var(--color-blue-brand)" }}>
            {t("View all services →")}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { img: elec, tag: "Electrical", t: "High & Low Voltage Systems", p: "Substations, switchgear, panels, cabling and full electrical balance-of-plant for industrial sites." },
            { img: mech, tag: "Mechanical", t: "Process & Plant Mechanical", p: "Rotating equipment, piping, structural fabrication and turnkey mechanical erection." },
            { img: hvac, tag: "HVAC", t: "Climate & Refrigeration", p: "Industrial HVAC design, installation and 24/7 preventive maintenance contracts." },
            { img: oilgas, tag: "Oil & Gas", t: "Refinery, Pipelines & EPC", p: "Engineering, construction and shutdown maintenance for refineries, gas plants, pipelines and tank farms across the Gulf." },
          ].map((c, idx) => (
            <article key={idx} className="bg-white overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl group cursor-pointer"
                     style={{ border: "1px solid var(--color-border)" }}>
              <div className="h-52 overflow-hidden">
                <img src={c.img} alt={c.t} loading="lazy" width={1280} height={800} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-7">
                <div className="text-[0.63rem] font-bold tracking-[0.22em] uppercase mb-2" style={{ color: "var(--color-blue-brand)" }}>{t(c.tag)}</div>
                <h3 className="display text-xl mb-2">{t(c.t)}</h3>
                <p className="text-sm font-light" style={{ color: "var(--color-muted-text)" }}>{t(c.p)}</p>
                <Link to="/services" className="inline-flex items-center gap-1 mt-4 text-xs font-bold transition-all group-hover:gap-2"
                      style={{ color: "var(--color-brand)" }}>
                  {t("Learn more →")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SPLIT - About */}
      <section className="grid grid-cols-1 lg:grid-cols-2" style={{ background: "var(--color-off)" }}>
        <div className="relative min-h-[400px]">
          <img src={team} alt="MFR engineering team" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="px-8 md:px-16 py-16 md:py-20 bg-white">
          <div className="eyebrow is-blue mb-3">{t("About MFR")}</div>
          <h2 className="display display-md mb-4">{t("A multidisciplinary engineering partner built on trust.")}</h2>
          <p className="text-base font-light max-w-xl" style={{ color: "var(--color-muted-text)" }}>
            {t("Headquartered in Trichy, Tamil Nadu, MFR Solutions Group serves clients across India, the Middle East and South-East Asia with contracting, maintenance, consulting and global trading services.")}
          </p>
          <div className="mt-7 flex flex-col">
            {[
              { t: "Single-source delivery", p: "Engineering, supply, install and commissioning under one accountable team." },
              { t: "Cross-discipline expertise", p: "Electrical, mechanical, HVAC and instrumentation specialists working together." },
              { t: "Quality & safety first", p: "ISO 9001 quality system and ISO 45001 occupational health & safety." },
              { t: "Global supply chain", p: "Strategic partnerships with OEMs across Europe, North America and Asia." },
            ].map((k, idx) => (
              <div key={idx} className="flex gap-4 py-4 border-b last:border-b-0 transition-all hover:translate-x-1"
                   style={{ borderColor: "var(--color-border)" }}>
                <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 mt-0.5"
                     style={{ background: "color-mix(in oklab, var(--color-brand) 10%, transparent)",
                              border: "1px solid color-mix(in oklab, var(--color-brand) 22%, transparent)",
                              color: "var(--color-brand)" }}>✓</div>
                <div>
                  <div className="font-bold text-sm" style={{ color: "var(--color-ink)" }}>{t(k.t)}</div>
                  <div className="text-sm font-light" style={{ color: "var(--color-muted-text)" }}>{t(k.p)}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/about" className="btn-blue">{t("About the company →")}</Link>
          </div>
        </div>
      </section>

      {/* CAPABILITIES TILES */}
      <section className="section container-x">
        <div className="mb-14 max-w-2xl">
          <div className="eyebrow mb-3">{t("Capabilities")}</div>
          <h2 className="display display-md">{t("From concept to commissioning — under one roof.")}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "var(--color-border)" }}>
          {[
            { ico: "⚡", t: "Electrical Installations", p: "LV, MV and HV systems, panels, cabling and earthing." },
            { ico: "🔧", t: "Inspection & Testing", p: "Commissioning, thermography and protection relay testing." },
            { ico: "🤖", t: "Automation & PLC", p: "PLC, SCADA and BMS integration with field instruments." },
            { ico: "📐", t: "CAD Design Studio", p: "Electrical and mechanical schematics, 3D plant models." },
            { ico: "🏭", t: "Turnkey Projects", p: "EPC delivery with full engineering accountability." },
            { ico: "🌱", t: "Low-Carbon Solutions", p: "Solar PV, energy efficiency and electrification." },
            { ico: "🌐", t: "Global Trading", p: "Sourcing and supply of critical engineering equipment." },
            { ico: "🛠️", t: "Maintenance Contracts", p: "Annual maintenance with KPIs and 24/7 response." },
          ].map((tile, idx) => (
            <div key={idx} className="card-tile flex flex-col gap-3">
              <div className="ico-box text-2xl">{tile.ico}</div>
              <div className="font-bold text-sm" style={{ color: "var(--color-ink)" }}>{t(tile.t)}</div>
              <div className="text-sm font-light" style={{ color: "var(--color-muted-text)" }}>{t(tile.p)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Visual cards */}
      <section className="container-x pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { img: cad, tag: "CAD Studio", t: "Schematics and 3D plant modelling that de-risk every project." },
            { img: automation, tag: "Automation", t: "PLC, SCADA and instrumentation engineered for uptime." },
          ].map((c, idx) => (
            <Link to="/capabilities" key={idx} className="relative overflow-hidden min-h-[340px] flex items-end group">
              <img src={c.img} alt={c.t} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0"
                   style={{ background: "linear-gradient(0deg, rgba(4,10,18,.92) 0%, rgba(4,10,18,.18) 65%, transparent 100%)" }} />
              <div className="relative z-10 p-7">
                <div className="text-[0.63rem] font-bold tracking-[0.22em] uppercase mb-2" style={{ color: "var(--color-brand)" }}>{c.tag}</div>
                <h3 className="display text-xl text-white mb-3">{c.t}</h3>
                <span className="inline-flex items-center gap-2 text-xs font-bold border-b pb-0.5"
                      style={{ color: "var(--color-brand)", borderColor: "color-mix(in oklab, var(--color-brand) 40%, transparent)" }}>
                  Discover →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* GLOBAL PRESENCE */}
      <section className="section" style={{ background: "linear-gradient(180deg, #0a1828 0%, #0f2740 100%)" }}>
        <div className="container-x">
          <div className="max-w-2xl mb-12">
            <div className="eyebrow is-light mb-3">{t("Our Presence")}</div>
            <h2 className="display display-md" style={{ color: "#fff" }}>
              {t("Serving Clients Across India, Saudi Arabia & UAE")}
            </h2>
            <p className="mt-4 text-base font-light" style={{ color: "rgba(255,255,255,0.62)" }}>
              {t("Three regional offices delivering engineering, contracting and EPC services to industrial and infrastructure clients.")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { flag: "🇮🇳", country: "India", city: "Trichy, Tamil Nadu, India", role: "Headquarters" },
              { flag: "🇸🇦", country: "Saudi Arabia", city: "Riyadh, Saudi Arabia", role: "Main Branch" },
              { flag: "🇦🇪", country: "United Arab Emirates", city: "Dubai, United Arab Emirates", role: "Regional Presence" },
            ].map((p, i) => (
              <div key={i} className="group relative overflow-hidden p-8 transition-all hover:-translate-y-1"
                   style={{
                     background: "linear-gradient(160deg, rgba(255,255,255,.04), rgba(255,255,255,.01))",
                     border: "1px solid rgba(255,255,255,.08)",
                   }}>
                <div className="absolute inset-x-0 top-0 h-[3px]"
                     style={{ background: "linear-gradient(90deg, var(--color-brand), var(--color-blue-brand))" }} />
                <div className="text-5xl mb-4">{p.flag}</div>
                <div className="text-[0.62rem] font-bold tracking-[0.22em] uppercase" style={{ color: "var(--color-brand-3)" }}>{t(p.role)}</div>
                <h3 className="display text-2xl mt-1" style={{ color: "#fff" }}>{t(p.country)}</h3>
                <div className="text-sm font-semibold mt-3 flex items-center gap-2" style={{ color: "var(--color-blue-brand-3)" }}>
                  <span aria-hidden>📍</span> {t(p.city)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="section container-x">
        <div className="max-w-2xl mb-12">
          <div className="eyebrow mb-3">{t("Certifications")}</div>
          <h2 className="display display-md">{t("Certified for Quality, Safety & Excellence.")}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { code: "ISO 9001:2015", t: "Quality Management System", p: "Documented processes ensuring consistent quality across every engagement." },
            { code: "ISO 14001:2015", t: "Environmental Management", p: "Responsible operations that minimize environmental impact across projects." },
            { code: "ISO 45001:2018", t: "Occupational Health & Safety", p: "Zero-harm culture backed by audited HSE management on every site." },
          ].map((c, i) => (
            <Link key={i} to="/certifications" className="group relative bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-2xl"
                  style={{ border: "1px solid var(--color-border)" }}>
              <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: "linear-gradient(90deg, var(--color-brand), var(--color-blue-brand))" }} />
              <div className="w-16 h-16 flex items-center justify-center text-white text-xs font-bold tracking-wider"
                   style={{ background: "linear-gradient(135deg, var(--color-blue-brand), var(--color-brand))" }}>ISO</div>
              <div className="mt-5 text-[0.7rem] font-bold tracking-[0.2em] uppercase" style={{ color: "var(--color-blue-brand)" }}>{t(c.code)}</div>
              <h3 className="display text-xl mt-1">{t(c.t)}</h3>
              <p className="mt-3 text-sm font-light" style={{ color: "var(--color-muted-text)" }}>{t(c.p)}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-bold transition-all group-hover:gap-2" style={{ color: "var(--color-brand)" }}>{t("View certificate →")}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden gradient-brand">
        <div className="absolute inset-0 opacity-[0.08]" style={{ background: "radial-gradient(circle at 20% 50%, white 0%, transparent 45%), radial-gradient(circle at 80% 30%, white 0%, transparent 45%)" }} />
        <div className="relative z-10 container-x py-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="max-w-2xl">
            <div className="text-[0.7rem] font-bold tracking-[0.24em] uppercase mb-3" style={{ color: "rgba(255,255,255,0.8)" }}>{t("Project Inquiry")}</div>
            <h2 className="display text-3xl md:text-4xl text-white">{t("Ready to Discuss Your Project?")}</h2>
            <p className="mt-4 text-white/85 font-light max-w-xl">
              {t("Connect with our engineering experts to discuss your industrial, infrastructure, electrical or EPC requirements.")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white px-7 py-3.5 text-sm font-bold transition-all hover:-translate-y-0.5 hover:shadow-2xl"
                  style={{ color: "#005B8F" }}>{t("Request a Quote →")}</Link>
            <Link to="/contact" className="btn-outline-light !border-white/70 hover:!border-white">{t("Contact Engineering Team")}</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
