import { ShoppingCart, Menu, Search, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-border py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform">
              M
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl leading-none text-primary">
                MediGlove
              </span>
              <span className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase">
                Direct
              </span>
            </div>
          </a>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#products" className="text-sm font-medium hover:text-primary transition-colors">Products</a>
          <a href="#industries" className="text-sm font-medium hover:text-primary transition-colors">Industries</a>
          <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">About Us</a>
          <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground mr-4">
            <Phone className="w-4 h-4" />
            <span>1-800-GLOVES</span>
          </div>
          
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="w-5 h-5" />
          </Button>
          
          <Button variant="default" size="icon" className="rounded-full relative shadow-lg shadow-primary/20">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
              0
            </span>
          </Button>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
