import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { useT } from "@/i18n/I18nProvider";
import team from "@/assets/about-team.jpg";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About MFR Solutions Group – Our Story & Values" },
      { name: "description", content: "Multidisciplinary engineering firm delivering electrical, mechanical, HVAC and EPC contracting and consulting since 2020 across India, Saudi Arabia and UAE." },
    ],
  }),
});

function AboutPage() {
  const t = useT();
  return (
    <SiteLayout>
      <PageHero
        eyebrow={t("About")}
        title={t("Engineering trust, project after project.")}
        subtitle={t("MFR Solutions Group is a multidisciplinary engineering firm built on technical depth, disciplined execution and long-term client partnerships.")}
        crumbs={[{ to: "/", label: "Home" }, { to: "/about", label: "About" }]}
        image={team}
      />

      <section id="story" className="grid grid-cols-1 lg:grid-cols-2">
        <div className="px-8 md:px-16 py-16 md:py-20">
          <div className="eyebrow is-blue mb-3">{t("Our Story")}</div>
          <h2 className="display display-md mb-5">{t("From a Trichy engineering hub to a regional partner across India, KSA and UAE.")}</h2>
          <p className="text-base font-light mb-4" style={{ color: "var(--color-muted-text)" }}>
            {t("Established in 2020 and headquartered in Trichy, Tamil Nadu, MFR Solutions Group delivers multidisciplinary engineering projects across India, Saudi Arabia and the United Arab Emirates — combining contracting, maintenance, consulting and global trading under one accountable team.")}
          </p>
          <p className="text-base font-light" style={{ color: "var(--color-muted-text)" }}>
            {t("Our engineers bring decades of combined experience across power, process and infrastructure sectors, and our delivery model is built on transparency, safety and on-time completion.")}
          </p>
        </div>
        <div className="relative min-h-[400px] lg:min-h-full">
          <img src={team} alt="MFR engineering team on site" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </section>

      <section id="mission" className="section container-x" style={{ background: "var(--color-off)" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "var(--color-border)" }}>
          {[
            { t: "Mission", p: "To deliver engineering solutions that empower our clients to operate safer, more efficient and more sustainable assets." },
            { t: "Vision", p: "To be the most trusted multidisciplinary engineering partner across India and the wider Asia-Middle East region." },
            { t: "Values", p: "Safety first, technical integrity, transparent communication and long-term partnerships over short-term wins." },
          ].map((b, i) => (
            <div key={i} className="bg-white p-10">
              <div className="eyebrow mb-3">{t(b.t)}</div>
              <p className="text-base font-light" style={{ color: "var(--color-muted-text)" }}>{t(b.p)}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="why-us" className="section container-x">
        <div className="max-w-2xl mb-12">
          <div className="eyebrow mb-3">{t("Why Choose Us")}</div>
          <h2 className="display display-md">{t("Five reasons clients keep coming back.")}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "var(--color-border)" }}>
          {[
            ["Single accountable team", "Design, supply, install and commission — no finger-pointing between contractors."],
            ["Multi-discipline depth", "Electrical, mechanical, HVAC and instrumentation under one roof."],
            ["Safety-first culture", "ISO 45001 certified with documented HSE management on every site."],
            ["Regional footprint", "Operations across India, Saudi Arabia and the United Arab Emirates."],
            ["Global supply network", "Direct OEM partnerships across Europe, North America and Asia."],
            ["24/7 response", "Annual maintenance contracts backed by round-the-clock emergency service."],
          ].map(([head, body], i) => (
            <div key={i} className="card-tile flex flex-col gap-3">
              <div className="ico-box text-xl">{String(i + 1).padStart(2, "0")}</div>
              <div className="font-bold text-sm" style={{ color: "var(--color-ink)" }}>{t(head)}</div>
              <div className="text-sm font-light" style={{ color: "var(--color-muted-text)" }}>{t(body)}</div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <Link to="/services" className="btn-primary">{t("Browse Services →")}</Link>
          <Link to="/contact" className="btn-blue">{t("Talk to an Engineer")}</Link>
        </div>
      </section>
    </SiteLayout>
  );
}