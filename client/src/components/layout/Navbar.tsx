import { Phone, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Products", href: "/#products" },
    { label: "Industries", href: "/#industries" },
    { label: "About Us", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-border py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform">
            Q
          </div>
          <div className="flex flex-col text-left">
            <span className="font-heading font-bold text-xl leading-none text-primary">Quensol</span>
            <span className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase">Direct</span>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium hover:text-primary transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <a
            href="tel:+917386101845"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mr-2"
          >
            <Phone className="w-4 h-4" />
            <span>+91 7386101845</span>
          </a>

          <Button
            variant="default"
            size="sm"
            className="hidden md:flex rounded-full shadow-md shadow-primary/20 px-5"
            onClick={() => {
              const btn = document.getElementById("sticky-quote-btn");
              if (btn) btn.click();
            }}
          >
            Get Quote
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
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
        </div>
      )}
    </nav>
  );
}
