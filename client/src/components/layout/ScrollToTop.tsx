import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [barOpen, setBarOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollY > 400);
      setProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);
    };
    const onBar = (e: Event) => setBarOpen((e as CustomEvent).detail.open);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("comparison-bar", onBar);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("comparison-bar", onBar);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      data-testid="btn-scroll-to-top"
      aria-label="Scroll to top"
      className={cn(
        "fixed right-6 z-40 w-12 h-12 flex items-center justify-center transition-all duration-300",
        // Shift up when comparison bar is open on mobile
        barOpen ? "bottom-[5.5rem] md:bottom-24" : "bottom-24",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 44 44"
        fill="none"
      >
        <circle cx="22" cy="22" r={radius} stroke="currentColor" strokeWidth="2.5" className="text-border" />
        <circle
          cx="22" cy="22" r={radius}
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
          className="text-primary transition-all duration-150"
        />
      </svg>
      <div className="relative w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/25 hover:bg-primary/90 hover:scale-110 active:scale-95 transition-all duration-150">
        <ArrowUp className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
      </div>
    </button>
  );
}
