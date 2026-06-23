import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/mfr-logo.png";
import { useI18n } from "@/i18n/I18nProvider";

type SubLink = { to: string; hash: string; label: string; desc?: string; icon: string };
type NavItem = { to: string; label: string; submenu?: SubLink[] };

const nav: NavItem[] = [
  { to: "/", label: "Home" },
  {
    to: "/about",
    label: "About",
    submenu: [
      { to: "/about", hash: "story", icon: "01", label: "Our Story", desc: "Who we are and what we stand for" },
      { to: "/about", hash: "mission", icon: "02", label: "Mission & Vision", desc: "Purpose driving every project" },
      { to: "/about", hash: "why-us", icon: "03", label: "Why Choose Us", desc: "Single-source accountability" },
    ],
  },
  {
    to: "/services",
    label: "Services",
    submenu: [
      { to: "/services", hash: "electrical", icon: "⚡", label: "Electrical Contracting", desc: "HV / MV / LV systems" },
      { to: "/services", hash: "mechanical", icon: "◆", label: "Mechanical Contracting", desc: "Process & plant mechanical" },
      { to: "/services", hash: "hvac", icon: "❄", label: "HVAC & Refrigeration", desc: "Design, install & 24/7 AMC" },
      { to: "/services", hash: "oilgas", icon: "⛽", label: "Oil & Gas Services", desc: "Refinery, pipelines & EPC" },
      { to: "/services", hash: "engagement", icon: "↗", label: "Turnkey EPC Projects", desc: "End-to-end delivery" },
    ],
  },
  {
    to: "/capabilities",
    label: "Capabilities",
    submenu: [
      { to: "/capabilities", hash: "cad", icon: "⌁", label: "CAD Design Studio", desc: "Schematics & 3D plant models" },
      { to: "/capabilities", hash: "automation", icon: "◈", label: "Automation & PLC", desc: "SCADA, BMS, instrumentation" },
      { to: "/capabilities", hash: "testing", icon: "✓", label: "Inspection & Testing", desc: "Commissioning & thermography" },
      { to: "/capabilities", hash: "maintenance", icon: "24", label: "Maintenance Contracts", desc: "Annual KPIs & response" },
    ],
  },
  {
    to: "/safety",
    label: "Safety",
    submenu: [
      { to: "/safety", hash: "hse", icon: "⛑", label: "HSE Philosophy", desc: "Zero-harm culture" },
      { to: "/safety", hash: "quality", icon: "Q", label: "ISO 9001 Quality", desc: "Quality management system" },
      { to: "/safety", hash: "ohs", icon: "S", label: "ISO 45001 OH&S", desc: "Occupational health & safety" },
      { to: "/safety", hash: "certifications", icon: "✓", label: "Certifications", desc: "Accreditations & compliance" },
    ],
  },
  {
    to: "/certifications",
    label: "Certifications",
    submenu: [
      { to: "/certifications", hash: "iso-9001", icon: "Q", label: "ISO 9001:2015", desc: "Quality Management System" },
      { to: "/certifications", hash: "iso-14001", icon: "E", label: "ISO 14001:2015", desc: "Environmental Management" },
      { to: "/certifications", hash: "iso-45001", icon: "S", label: "ISO 45001:2018", desc: "Occupational Health & Safety" },
    ],
  },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const routeHash = useRouterState({ select: (s) => s.location.hash });
  const { lang, setLang, t } = useI18n();
  const isHome = pathname === "/";
  // Transparent purely on scroll position — never triggered by hover/focus
  const transparent = isHome && !scrolled && !open;

  useEffect(() => {
    if (!routeHash) return;
    const targetId = routeHash.replace(/^#/, "");
    window.setTimeout(() => document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  }, [routeHash, pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Main nav */}
      <nav
        className={`${isHome ? "fixed" : "sticky"} top-0 inset-x-0 z-50 transition-all duration-300 ${transparent ? "" : "backdrop-blur-xl"}`}
        style={{
          background: transparent
            ? "linear-gradient(180deg, rgba(4,10,18,.55), rgba(4,10,18,.18) 70%, transparent)"
            : "rgba(255,255,255,0.94)",
          borderBottom: transparent ? "1px solid transparent" : "1px solid color-mix(in oklab, var(--color-brand) 18%, var(--color-border))",
          boxShadow: transparent ? "none" : "0 4px 24px -12px rgba(8,20,35,0.18)",
        }}
        onMouseLeave={() => setHover(null)}
      >
        <div className="flex items-stretch justify-between container-x h-[82px]">
          <Link to="/" className="flex items-center pr-7 md:border-r" style={{ borderColor: transparent ? "rgba(255,255,255,.15)" : "var(--color-border)" }}>
            <img
              src={logo}
              alt="MFR Solutions Group"
              className="h-12 md:h-14 w-auto object-contain transition-[filter] duration-300"
              style={{ filter: transparent ? "brightness(0) invert(1)" : "none" }}
            />
          </Link>

          <ul className="hidden lg:flex items-stretch flex-1 pl-6">
            {nav.map((n) => {
              const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
              const isOpen = hover === n.label;
              const linkColor = transparent
                ? (active || isOpen ? "#b8e040" : "#fff")
                : (active || isOpen ? "var(--color-brand)" : "var(--color-ink)");
              return (
                <li
                  key={n.label}
                  className="relative flex items-stretch"
                  onMouseEnter={() => setHover(n.label)}
                >
                  <Link
                    to={n.to}
                    className="nav-link-main flex items-center gap-1 px-4 text-[0.78rem] font-semibold uppercase tracking-[0.08em] whitespace-nowrap transition-colors"
                    style={{ color: linkColor }}
                  >
                    {t(n.label)}
                    {n.submenu && (
                      <svg width="10" height="10" viewBox="0 0 10 10" style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .25s" }}>
                        <path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    <span
                      className="absolute left-4 right-4 bottom-0 h-[3px] origin-left transition-transform"
                      style={{
                        background: "linear-gradient(90deg, var(--color-brand), var(--color-blue-brand))",
                        transform: active || isOpen ? "scaleX(1)" : "scaleX(0)",
                        borderRadius: "3px 3px 0 0",
                      }}
                    />
                  </Link>

                  {n.submenu && isOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3" style={{ minWidth: 390 }}>
                      <div
                        className="mega-panel overflow-hidden"
                        style={{
                          background: "linear-gradient(145deg, rgba(255,255,255,.98), color-mix(in oklab, var(--color-blue-brand) 5%, white))",
                          border: "1px solid color-mix(in oklab, var(--color-blue-brand) 16%, var(--color-border))",
                          boxShadow: "0 28px 70px -24px rgba(8,20,35,0.42)",
                          animation: "menuIn .22s ease-out",
                        }}
                      >
                        <div className="px-5 pt-4 pb-3" style={{ background: "linear-gradient(105deg, var(--color-darker), color-mix(in oklab, var(--color-blue-brand) 38%, var(--color-dark)))" }}>
                          <div className="text-[0.62rem] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--color-brand-3)" }}>{t(n.label)}</div>
                          <div className="mt-1 text-[0.78rem]" style={{ color: "rgba(255,255,255,.68)" }}>{t("Explore focused engineering capabilities")}</div>
                        </div>
                        {n.submenu.map((s, i) => (
                          <Link
                            key={i}
                            to={s.to}
                            hash={s.hash}
                            onClick={() => setHover(null)}
                            className="mega-link group grid grid-cols-[42px_1fr_22px] items-center gap-3 px-5 py-4 transition-all"
                            style={{
                              borderBottom: i < n.submenu!.length - 1 ? "1px solid color-mix(in oklab, var(--color-border) 60%, transparent)" : "",
                            }}
                          >
                            <span className="mega-icon flex h-[42px] w-[42px] items-center justify-center text-[0.78rem] font-bold transition-all">
                              {s.icon}
                            </span>
                            <span>
                              <span className="mega-title block text-[0.88rem] font-bold transition-colors">
                                {t(s.label)}
                              </span>
                            {s.desc && (
                              <span className="mega-desc block text-[0.72rem] mt-0.5 font-light transition-colors">
                                {t(s.desc)}
                              </span>
                            )}
                            </span>
                            <span className="mega-arrow transition-all">→</span>
                          </Link>
                        ))}
                        <Link to={n.to} onClick={() => setHover(null)} className="mega-view-all flex items-center justify-between px-5 py-3 text-[0.72rem] font-bold uppercase tracking-[0.16em]">
                          {t("View overview")} <span>↗</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:flex items-center gap-4 pl-6 border-l h-full" style={{ borderColor: transparent ? "rgba(255,255,255,.15)" : "var(--color-border)" }}>
            <LangSwitcher transparent={transparent} lang={lang} setLang={setLang} />
          </div>

          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="w-6 h-0.5" style={{ background: transparent ? "#fff" : "var(--color-ink)" }} />
            <span className="w-6 h-0.5" style={{ background: transparent ? "#fff" : "var(--color-ink)" }} />
            <span className="w-6 h-0.5" style={{ background: transparent ? "#fff" : "var(--color-ink)" }} />
          </button>
        </div>

        {open && (
          <div className="lg:hidden border-t" style={{ borderColor: "var(--color-border)", background: "var(--color-darker)" }}>
            <div className="flex flex-col py-6 container-x gap-4">
              <div className="flex gap-2 pb-3 border-b" style={{ borderColor: "rgba(255,255,255,.08)" }}>
                <button onClick={() => setLang("en")} className="px-3 py-1.5 text-xs font-bold" style={{ background: lang === "en" ? "var(--color-brand)" : "transparent", color: "#fff", border: "1px solid rgba(255,255,255,.2)" }}>🇬🇧 English</button>
                <button onClick={() => setLang("ar")} className="px-3 py-1.5 text-xs font-bold" style={{ background: lang === "ar" ? "var(--color-brand)" : "transparent", color: "#fff", border: "1px solid rgba(255,255,255,.2)" }}>🇸🇦 العربية</button>
              </div>
              {nav.map((n) => (
                <div key={n.label} className="border-b pb-3" style={{ borderColor: "rgba(255,255,255,.08)" }}>
                  <Link
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="font-display text-2xl transition-colors"
                    style={{ fontFamily: "var(--font-display)", color: "rgba(255,255,255,.96)" }}
                  >
                    {t(n.label)}
                  </Link>
                  {n.submenu && (
                    <div className="mt-2 grid grid-cols-1 gap-2">
                      {n.submenu.map((s) => (
                        <Link key={s.label} to={s.to} hash={s.hash} onClick={() => setOpen(false)} className="text-sm" style={{ color: "rgba(255,255,255,.55)" }}>
                          {t(s.label)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary w-fit mt-2">{t("Get in Touch")}</Link>
            </div>
          </div>
        )}
        <style>{`@keyframes menuIn{from{opacity:0;transform:translateY(-8px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}`}</style>
      </nav>
    </>
  );
}

function LangSwitcher({ transparent, lang, setLang }: { transparent: boolean; lang: "en" | "ar"; setLang: (l: "en" | "ar") => void }) {
  return (
    <div className={`lang-pill ${transparent ? "is-transparent" : ""}`} role="group" aria-label="Language">
      <button onClick={() => setLang("en")} className={lang === "en" ? "is-active" : ""} aria-label="English">
        <span className="lang-flag" aria-hidden="true">🇬🇧</span>
        <span>EN</span>
      </button>
      <button onClick={() => setLang("ar")} className={lang === "ar" ? "is-active" : ""} aria-label="Arabic">
        <span className="lang-flag" aria-hidden="true">🇸🇦</span>
        <span>AR</span>
      </button>
    </div>
  );
}

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer
      style={{
        background:
          "linear-gradient(160deg, #0a1828 0%, #0f2740 45%, #142a3d 100%)",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.4fr] gap-12 container-x pt-16 pb-12 border-b border-white/5">
        <div>
          <img src={logo} alt="MFR Solutions Group" className="h-16 w-auto object-contain mb-5" style={{ filter: "brightness(0) invert(1)" }} />
          <p className="text-sm font-light max-w-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
            {t("A multidisciplinary engineering company delivering industrial, electrical, infrastructure and EPC solutions across India, Saudi Arabia and the UAE.")}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["ISO 9001:2015", "ISO 14001:2015", "ISO 45001:2018"].map((c) => (
              <span key={c} className="px-3 py-1 text-[0.62rem] font-bold tracking-[0.16em] uppercase"
                    style={{ background: "color-mix(in oklab, var(--color-brand) 14%, transparent)", color: "var(--color-brand-3)", border: "1px solid color-mix(in oklab, var(--color-brand) 30%, transparent)" }}>
                {c}
              </span>
            ))}
          </div>
        </div>

        <FooterCol title={t("Quick Links")} items={[
          { to: "/", label: "Home" },
          { to: "/about", label: "About" },
          { to: "/services", label: "Services" },
          { to: "/capabilities", label: "Capabilities" },
          { to: "/safety", label: "Safety" },
          { to: "/certifications", label: "Certifications" },
          { to: "/contact", label: "Contact" },
        ].map(i => ({ ...i, label: t(i.label) }))} />

        <div>
          <div className="text-[0.65rem] font-bold tracking-[0.2em] uppercase pb-2 mb-4 border-b"
               style={{ color: "var(--color-brand)", borderColor: "color-mix(in oklab, var(--color-brand) 20%, transparent)" }}>
            {t("Our Offices")}
          </div>
          <ul className="flex flex-col gap-4 text-sm font-light" style={{ color: "rgba(255,255,255,0.55)" }}>
            <li>
              <div className="text-[0.7rem] font-bold tracking-[0.16em] uppercase" style={{ color: "var(--color-brand-3)" }}>{t("India · Headquarters")}</div>
              <div className="mt-1">{t("Trichy, Tamil Nadu, India")}</div>
            </li>
            <li>
              <div className="text-[0.7rem] font-bold tracking-[0.16em] uppercase" style={{ color: "var(--color-brand-3)" }}>{t("Saudi Arabia")}</div>
              <div className="mt-1">{t("B12, RFRA3688, Khurais Branch Road,")}<br />{t("Al Rawdah District, Riyadh 13211")}</div>
              <a href="tel:+966114029211" className="block mt-1" style={{ color: "var(--color-blue-brand-3)" }}>+966 11 402 9211</a>
            </li>
            <li>
              <div className="text-[0.7rem] font-bold tracking-[0.16em] uppercase" style={{ color: "var(--color-brand-3)" }}>{t("United Arab Emirates")}</div>
              <div className="mt-1">{t("Dubai, United Arab Emirates")}</div>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 container-x py-5 text-xs"
           style={{ color: "rgba(255,255,255,0.35)" }}>
        <span>© {new Date().getFullYear()} MFR Solutions Group. {t("All rights reserved.")}</span>
        <div className="flex gap-7">
          <Link to="/contact" style={{ color: "inherit" }}>{t("Privacy")}</Link>
          <Link to="/contact" style={{ color: "inherit" }}>{t("Terms")}</Link>
          <Link to="/contact" style={{ color: "inherit" }}>{t("Sitemap")}</Link>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { to: string; label: string }[] }) {
  return (
    <div>
      <div className="text-[0.65rem] font-bold tracking-[0.2em] uppercase pb-2 mb-4 border-b"
           style={{ color: "var(--color-brand)", borderColor: "color-mix(in oklab, var(--color-brand) 20%, transparent)" }}>
        {title}
      </div>
      <ul className="flex flex-col gap-2">
        {items.map((i, idx) => (
          <li key={idx}>
            <Link to={i.to} className="text-sm font-light flex items-center gap-1.5 transition-colors hover:translate-x-1"
                  style={{ color: "rgba(255,255,255,0.4)" }}>
              <span style={{ color: "color-mix(in oklab, var(--color-brand) 45%, transparent)" }}>›</span>
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      {/* Spacer so fixed header (homepage) doesn't overlap content on other pages */}
      {!isHome && <div aria-hidden style={{ height: 0 }} />}
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <Link
        to="/contact"
        aria-label="Contact us"
        className="fixed bottom-6 right-6 w-12 h-12 flex items-center justify-center text-xl text-white shadow-lg transition-transform hover:scale-110 z-40"
        style={{ background: "var(--color-brand)", boxShadow: "0 4px 20px color-mix(in oklab, var(--color-brand) 50%, transparent)" }}
      >
        💬
      </Link>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  crumbs,
  image,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  crumbs?: { to: string; label: string }[];
  image?: string;
}) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ marginTop: 0 }}
    >
      {image && (
        <img
          src={image}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "saturate(1.05)" }}
        />
      )}
      {/* Brand gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: image
            ? "linear-gradient(108deg, rgba(0,28,50,.94) 0%, rgba(0,63,102,.82) 45%, color-mix(in oklab, #0681A5 60%, transparent) 100%), linear-gradient(18deg, color-mix(in oklab, #82BC03 28%, transparent), transparent 55%)"
            : "linear-gradient(115deg, #001C32 0%, #00355A 30%, #0681A5 70%, #2B9A4F 100%)",
        }}
      />
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.55) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(circle at 30% 50%, black, transparent 75%)",
        }}
      />
      {/* Glow */}
      <div
        aria-hidden
        className="absolute -right-20 -top-20 w-[420px] h-[420px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(130,188,3,.28), transparent 65%)", filter: "blur(20px)" }}
      />

      <div className="container-x relative py-24 md:py-32">
        {crumbs && (
          <div className="flex items-center gap-2 text-xs mb-5" style={{ color: "rgba(255,255,255,0.55)" }}>
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                <Link to={c.to} className="hover:underline" style={{ color: "var(--color-brand-3)" }}>{c.label}</Link>
                {i < crumbs.length - 1 && <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-start gap-5">
          {/* Accent bar */}
          <div
            aria-hidden
            className="hidden md:block w-[5px] self-stretch min-h-[120px] rounded-full"
            style={{ background: "linear-gradient(180deg, var(--color-brand), var(--color-blue-brand-3))" }}
          />
          <div className="flex-1">
            {eyebrow && <div className="eyebrow is-light mb-3">{eyebrow}</div>}
            <h1 className="display display-lg" style={{ color: "#fff" }}>{title}</h1>
            {subtitle && (
              <p className="mt-5 max-w-2xl text-base font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.78)" }}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
      {/* Bottom accent line */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-[3px]"
        style={{ background: "linear-gradient(90deg, var(--color-brand), var(--color-blue-brand), var(--color-brand))" }}
      />
    </section>
  );
}