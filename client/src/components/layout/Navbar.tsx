import { Phone, Menu, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useI18n, LANG_LABELS, type Lang } from "@/lib/i18n";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { lang, setLang, t } = useI18n();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.products"), href: "/catalog" },
    { label: t("nav.blog"), href: "/blog" },
    { label: t("nav.locations"), href: "/locations" },
    { label: t("nav.samples"), href: "/samples" },
    { label: t("nav.videos"), href: "/videos" },
    { label: t("nav.about"), href: "/#about" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-border py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo — plain <a> so it always navigates */}
        <a href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform">
            Q
          </div>
          <div className="flex flex-col text-left">
            <span className="font-heading font-bold text-xl leading-none text-primary">Quensol</span>
            <span className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase">Direct</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium hover:text-primary transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+917386101845"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>+91 7386101845</span>
          </a>

          {/* Language Switcher */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setLangOpen(!langOpen)}
              data-testid="btn-lang-switcher"
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded-lg hover:bg-primary/5 border border-transparent hover:border-border"
            >
              <Globe className="w-4 h-4" />
              <span>{LANG_LABELS[lang]}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-border py-1 z-50 min-w-[90px]">
                {(Object.entries(LANG_LABELS) as [Lang, string][]).map(([code, label]) => (
                  <button
                    key={code}
                    onClick={() => { setLang(code); setLangOpen(false); }}
                    data-testid={`btn-lang-${code}`}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm hover:bg-primary/5 hover:text-primary transition-colors",
                      lang === code ? "text-primary font-semibold" : "text-foreground"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button
            variant="default"
            size="sm"
            className="hidden md:flex rounded-full shadow-md shadow-primary/20 px-5"
            onClick={() => {
              const btn = document.getElementById("sticky-quote-btn");
              if (btn) btn.click();
            }}
            data-testid="btn-nav-get-quote"
          >
            {t("cta.getQuote")}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            data-testid="btn-nav-mobile-menu"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-border px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium py-2 hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href="tel:+917386101845" className="text-sm font-medium text-primary flex items-center gap-2 py-2">
            <Phone className="w-4 h-4" /> +91 7386101845
          </a>
          {/* Mobile Language Switcher */}
          <div className="flex items-center gap-2 pt-1 border-t border-border">
            <Globe className="w-4 h-4 text-muted-foreground" />
            {(Object.entries(LANG_LABELS) as [Lang, string][]).map(([code, label]) => (
              <button
                key={code}
                onClick={() => { setLang(code); setMenuOpen(false); }}
                data-testid={`btn-mobile-lang-${code}`}
                className={cn(
                  "px-3 py-1 rounded-full text-sm font-medium border transition-all",
                  lang === code
                    ? "bg-primary text-white border-primary"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
