import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { useT } from "@/i18n/I18nProvider";
// Certificate PDFs are served as static files from /public/certificates/.
// They render in-browser via an <iframe> with right-click disabled and the
// PDF.js toolbar hidden to discourage direct downloads.
const iso9001 = { url: "/certificates/iso-9001-mfr.pdf" };
const iso14001 = { url: "/certificates/iso-14001-mfr.pdf" };
const iso45001 = { url: "/certificates/iso-45001-mfr.pdf" };
import heroImg from "@/assets/hero-1.jpg";

export const Route = createFileRoute("/certifications")({
  component: CertificationsPage,
  head: () => ({
    meta: [
      { title: "Certifications – ISO 9001, 14001 & 45001 | MFR Solutions Group" },
      { name: "description", content: "MFR Solutions Group is certified to ISO 9001:2015 Quality, ISO 14001:2015 Environmental and ISO 45001:2018 Occupational Health & Safety standards." },
      { property: "og:title", content: "Certifications – MFR Solutions Group" },
      { property: "og:description", content: "ISO 9001, ISO 14001 and ISO 45001 certified engineering operations across India, Saudi Arabia and UAE." },
    ],
  }),
});

const certs = [
  {
    id: "iso-9001",
    code: "ISO 9001:2015",
    title: "Quality Management System",
    desc: "Demonstrates a documented, audited quality management system that drives consistent delivery and continual improvement across every project.",
    scope: "Provision of electrical, mechanical, HVAC and infrastructure contracting services.",
    url: iso9001.url,
    color: "#0681A5",
  },
  {
    id: "iso-14001",
    code: "ISO 14001:2015",
    title: "Environmental Management System",
    desc: "Confirms responsible site practices that identify, manage and reduce the environmental impact of our engineering and construction operations.",
    scope: "Environmental management of contracting and EPC project execution.",
    url: iso14001.url,
    color: "#009639",
  },
  {
    id: "iso-45001",
    code: "ISO 45001:2018",
    title: "Occupational Health & Safety",
    desc: "Verifies a zero-harm safety culture, documented HIRA, permit-to-work and safety leadership embedded into every site activity.",
    scope: "Occupational health & safety management on all engineering work sites.",
    url: iso45001.url,
    color: "#82BC03",
  },
];

function CertificationsPage() {
  const t = useT();
  const [viewing, setViewing] = useState<typeof certs[number] | null>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!viewing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewing(null);
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(z + 0.25, 3));
      if (e.key === "-") setZoom((z) => Math.max(z - 0.25, 0.5));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [viewing]);

  return (
    <SiteLayout>
      <PageHero
        eyebrow={t("Certifications")}
        title={t("Certified for Quality, Safety & Excellence.")}
        subtitle={t("Independently audited management systems give our clients confidence in how we plan, deliver and improve every project.")}
        crumbs={[{ to: "/", label: "Home" }, { to: "/certifications", label: "Certifications" }]}
        image={heroImg}
      />

      <section className="section container-x">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certs.map((c) => (
            <article id={c.id} key={c.id} className="relative bg-white flex flex-col"
                     style={{ border: "1px solid var(--color-border)", boxShadow: "0 14px 40px -22px rgba(8,20,35,.25)" }}>
              <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: "linear-gradient(90deg, var(--color-brand), var(--color-blue-brand))" }} />
              <div className="relative aspect-[4/3] flex items-center justify-center overflow-hidden"
                   style={{ background: `linear-gradient(135deg, ${c.color}, color-mix(in oklab, ${c.color} 55%, #0a1828))` }}>
                <div className="absolute inset-0 opacity-20"
                     style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
                <div className="relative text-center text-white px-6">
                  <div className="display text-5xl tracking-tight">ISO</div>
                  <div className="mt-1 text-xl font-bold tracking-[0.18em]">{c.code.split(":")[0].replace("ISO ", "")}</div>
                  <div className="mt-3 text-[0.65rem] font-bold tracking-[0.22em] uppercase opacity-90">Certified · {c.code.split(":")[1]}</div>
                </div>
              </div>
              <div className="p-7 flex flex-col flex-1">
                <div className="text-[0.68rem] font-bold tracking-[0.2em] uppercase" style={{ color: "var(--color-blue-brand)" }}>{c.code}</div>
                <h3 className="display text-2xl mt-1">{t(c.title)}</h3>
                <p className="mt-3 text-sm font-light" style={{ color: "var(--color-muted-text)" }}>{t(c.desc)}</p>
                <div className="mt-5 pt-4 border-t text-[0.78rem] font-light" style={{ borderColor: "var(--color-border)", color: "var(--color-body-text)" }}>
                  <span className="font-bold uppercase tracking-[0.12em] text-[0.65rem] block mb-1" style={{ color: "var(--color-ink)" }}>{t("Scope")}</span>
                  {t(c.scope)}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <button onClick={() => { setZoom(1); setViewing(c); }} className="btn-primary !py-2.5 !px-4 !text-[0.72rem]">{t("View Certificate ↗")}</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section container-x" style={{ background: "var(--color-off)" }}>
        <div className="max-w-3xl">
          <div className="eyebrow is-blue mb-3">{t("Compliance & Assurance")}</div>
          <h2 className="display display-md mb-4">{t("Audited, accredited and continually improving.")}</h2>
          <p className="text-base font-light" style={{ color: "var(--color-muted-text)" }}>
            {t("Our management systems are externally audited by UAF Americo. Each annual surveillance reinforces our commitment to consistent delivery, environmental responsibility and a zero-harm workplace.")}
          </p>
          <div className="mt-8">
            <Link to="/contact" className="btn-blue">{t("Request our policies →")}</Link>
          </div>
        </div>
      </section>

      {viewing && (
        <div
          className="fixed inset-0 z-[80] flex flex-col"
          style={{ background: "rgba(4,10,18,.92)", backdropFilter: "blur(6px)" }}
          onClick={() => setViewing(null)}
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className="flex items-center justify-between px-6 py-4 text-white border-b border-white/10" onClick={(e) => e.stopPropagation()}>
            <div>
              <div className="text-[0.65rem] font-bold tracking-[0.22em] uppercase" style={{ color: "var(--color-brand-3)" }}>{viewing.code}</div>
              <div className="font-display text-lg">{t(viewing.title)}</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setZoom((z) => Math.max(z - 0.25, 0.5))} aria-label="Zoom out" className="w-9 h-9 border border-white/20 hover:bg-white/10">−</button>
              <span className="text-xs tabular-nums w-12 text-center">{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom((z) => Math.min(z + 0.25, 3))} aria-label="Zoom in" className="w-9 h-9 border border-white/20 hover:bg-white/10">+</button>
              <button onClick={() => setZoom(1)} className="px-3 h-9 text-xs border border-white/20 hover:bg-white/10">Reset</button>
              <button onClick={() => setViewing(null)} aria-label="Close" className="w-9 h-9 border border-white/20 hover:bg-white/10">✕</button>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-6 flex items-start justify-center" onClick={(e) => e.stopPropagation()}>
            <div style={{ transform: `scale(${zoom})`, transformOrigin: "top center", transition: "transform .2s" }}>
              <iframe
                title={viewing.title}
                src={`${viewing.url}#toolbar=0&navpanes=0&scrollbar=0`}
                className="bg-white shadow-2xl"
                style={{ width: "min(900px, 92vw)", height: "82vh", border: 0, pointerEvents: "auto" }}
              />
            </div>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}