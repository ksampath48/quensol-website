import { useState, useEffect } from "react";
import { Cookie, X, ChevronDown, ChevronUp } from "lucide-react";

const COOKIE_KEY = "quensol_cookie_consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(COOKIE_KEY);
    if (!saved) {
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-16 left-0 right-0 z-[60] px-4 pb-2 pointer-events-none">
      <div
        className="max-w-2xl mx-auto bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 pointer-events-auto animate-in slide-in-from-bottom-4 duration-300"
        data-testid="cookie-consent-banner"
      >
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-9 h-9 bg-primary/20 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                <Cookie className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm mb-1">We use cookies</p>
                <p className="text-slate-400 text-xs leading-relaxed">
                  We use cookies to improve your experience, analyse traffic, and personalise content. By continuing, you agree to our{" "}
                  <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
                </p>

                {expanded && (
                  <div className="mt-3 space-y-2 text-xs text-slate-400">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 shrink-0" />
                      <div><span className="text-white font-medium">Essential cookies</span> — Required for the site to function correctly.</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 shrink-0" />
                      <div><span className="text-white font-medium">Analytics cookies</span> — Help us understand how visitors interact with the site.</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 shrink-0" />
                      <div><span className="text-white font-medium">Preference cookies</span> — Remember your settings and choices.</div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 mt-2 transition-colors"
                >
                  {expanded ? <><ChevronUp className="w-3 h-3" /> Hide details</> : <><ChevronDown className="w-3 h-3" /> Cookie details</>}
                </button>
              </div>
            </div>

            <button
              onClick={decline}
              className="text-slate-500 hover:text-slate-300 transition-colors shrink-0 p-1"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <button
              onClick={accept}
              data-testid="btn-accept-cookies"
              className="h-9 px-5 bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-full transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={decline}
              data-testid="btn-decline-cookies"
              className="h-9 px-5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium rounded-full transition-colors"
            >
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
