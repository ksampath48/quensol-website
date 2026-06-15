import { useState, useEffect } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";

const COOKIE_KEY = "quensol_cookie_consent";

function CookieIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.598 11.064a1.006 1.006 0 0 0-.854-.172A2.938 2.938 0 0 1 20 11c-1.654 0-3-1.346-3.003-2.937.005-.034.016-.136.017-.17a1 1 0 0 0-1.224-1.02 2.99 2.99 0 0 1-3.68-3.403 1 1 0 0 0-1.237-1.109c-.89.213-1.754.59-2.56 1.12C5.91 5.012 4 8.217 4 12c0 4.411 3.589 8 8 8 3.773 0 7.01-2.535 7.818-6.155a1 1 0 0 0-.22-.781zM12 18c-3.309 0-6-2.691-6-6 0-2.448 1.321-4.571 3.279-5.676a4.98 4.98 0 0 0 4.963 4.714A4.982 4.982 0 0 0 17.987 11C17.989 11 18 11 18 11c.003.328.052.637.12.938C17.624 15.478 15.114 18 12 18z"/>
      <circle cx="9.5" cy="13.5" r="1.5"/>
      <circle cx="13" cy="16" r="1"/>
      <circle cx="14" cy="12" r="1"/>
    </svg>
  );
}

export function CookieConsent() {
  const [status, setStatus] = useState<"pending" | "minimised" | "done">("done");
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(COOKIE_KEY);
    if (!saved) {
      const t = setTimeout(() => {
        setStatus("pending");
        setOpen(true);
      }, 1200);
      return () => clearTimeout(t);
    } else {
      setStatus("minimised");
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setOpen(false);
    setTimeout(() => setStatus("minimised"), 350);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setOpen(false);
    setTimeout(() => setStatus("minimised"), 350);
  };

  if (status === "done") return null;

  return (
    <>
      {/* Floating cookie button (visible when minimised) */}
      {status === "minimised" && (
        <button
          onClick={() => { setOpen(true); setStatus("pending"); }}
          aria-label="Cookie preferences"
          data-testid="btn-cookie-icon"
          title="Cookie preferences"
          className="fixed bottom-20 left-4 z-[60] w-12 h-12 bg-white border border-border rounded-full shadow-lg flex items-center justify-center text-primary hover:scale-110 hover:shadow-xl transition-all duration-200 group"
        >
          <CookieIcon className="w-6 h-6 group-hover:rotate-12 transition-transform duration-200" />
        </button>
      )}

      {/* Consent panel */}
      {status === "pending" && (
        <div
          className={`fixed bottom-[72px] left-4 z-[60] w-[calc(100vw-2rem)] max-w-sm pointer-events-auto transition-all duration-300 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
          data-testid="cookie-consent-banner"
        >
          <div className="bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-slate-700">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <CookieIcon className="w-4 h-4 text-primary" />
                </div>
                <span className="font-bold text-sm">Cookie Preferences</span>
              </div>
              <button
                onClick={decline}
                aria-label="Dismiss"
                className="text-slate-500 hover:text-slate-300 transition-colors p-1 rounded-full hover:bg-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="px-4 py-3">
              <p className="text-slate-400 text-xs leading-relaxed">
                We use cookies to improve your experience and analyse traffic. See our{" "}
                <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
              </p>

              {/* Expandable details */}
              {expanded && (
                <div className="mt-3 space-y-2 text-xs text-slate-400 border-t border-slate-700 pt-3">
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-1 shrink-0" />
                    <div><span className="text-white font-medium">Essential</span> — Required for core site functions.</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-1 shrink-0" />
                    <div><span className="text-white font-medium">Analytics</span> — Helps us improve the site.</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-amber-400 rounded-full mt-1 shrink-0" />
                    <div><span className="text-white font-medium">Preferences</span> — Saves your settings.</div>
                  </div>
                </div>
              )}

              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-300 mt-2 transition-colors"
              >
                {expanded ? <><ChevronUp className="w-3 h-3" />Hide details</> : <><ChevronDown className="w-3 h-3" />View details</>}
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-2 px-4 pb-4">
              <button
                onClick={accept}
                data-testid="btn-accept-cookies"
                className="flex-1 h-9 bg-primary hover:bg-primary/90 text-white text-xs font-bold rounded-full transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={decline}
                data-testid="btn-decline-cookies"
                className="flex-1 h-9 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium rounded-full transition-colors"
              >
                Essential Only
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
