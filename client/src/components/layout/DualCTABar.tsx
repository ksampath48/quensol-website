import { useState, useEffect } from "react";
import { MessageSquare, X } from "lucide-react";

const PHONE = "917386101845";
const PRESET_MESSAGES = [
  "Hi! I'd like to know more about your gloves.",
  "I need a bulk quote for Nitrile gloves.",
  "Can I request product samples?",
  "What are your payment and delivery terms?",
];

const WaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.535 5.849L.057 23.516a.5.5 0 0 0 .614.622l5.814-1.524A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.92 0-3.72-.51-5.27-1.4l-.38-.22-3.44.9.92-3.36-.25-.39A9.964 9.964 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
);

export function DualCTABar() {
  const [waOpen, setWaOpen] = useState(false);
  const [barOpen, setBarOpen] = useState(false);

  useEffect(() => {
    const onBar = (e: Event) => setBarOpen((e as CustomEvent).detail.open);
    window.addEventListener("comparison-bar", onBar);
    return () => window.removeEventListener("comparison-bar", onBar);
  }, []);

  const openQuote = () => {
    setWaOpen(false);
    window.dispatchEvent(new CustomEvent("open-quote-form"));
  };

  const sendMessage = (msg: string) => {
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, "_blank");
    setWaOpen(false);
  };

  const mobileBottom = barOpen ? "bottom-14 md:bottom-0" : "bottom-0";

  return (
    <>
      {/* ── WhatsApp popup (shared mobile + desktop) ── */}
      {waOpen && (
        <>
          {/* Mobile: anchored above the bottom bar */}
          <div className={`fixed left-0 right-0 z-50 flex justify-end px-4 md:hidden transition-all duration-300 ${barOpen ? "bottom-[calc(3.5rem+3.75rem)]" : "bottom-[3.75rem]"}`}>
            <WaPopup onClose={() => setWaOpen(false)} onSend={sendMessage} />
          </div>

          {/* Desktop: anchored above the FAB stack */}
          <div className="fixed bottom-[5.5rem] right-6 z-50 hidden md:flex justify-end">
            <WaPopup onClose={() => setWaOpen(false)} onSend={sendMessage} />
          </div>

          <div className="fixed inset-0 z-40" onClick={() => setWaOpen(false)} />
        </>
      )}

      {/* ══════════════════════════════════════
          MOBILE — full-width bottom bar
          Shows only on screens < md
      ══════════════════════════════════════ */}
      <div
        className={`fixed left-0 right-0 z-40 flex h-14 md:hidden transition-all duration-300 ${mobileBottom}`}
        data-testid="dual-cta-bar"
      >
        <button
          onClick={openQuote}
          data-testid="btn-request-quote-bar"
          className="flex-1 flex items-center justify-center gap-2.5 bg-primary hover:bg-primary/90 active:scale-[0.98] text-white font-semibold text-sm tracking-wide transition-all select-none"
        >
          <MessageSquare className="w-5 h-5 shrink-0" />
          Request Quote
        </button>

        <div className="w-px bg-white/25 shrink-0" />

        <button
          onClick={() => setWaOpen((v) => !v)}
          data-testid="btn-whatsapp-bar"
          className="flex-1 flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20b858] active:scale-[0.98] text-white font-semibold text-sm tracking-wide transition-all select-none"
          aria-label="Open WhatsApp"
        >
          <WaIcon className="w-5 h-5 shrink-0 text-white" />
          WhatsApp Us
        </button>
      </div>

      {/* ══════════════════════════════════════
          DESKTOP — floating action buttons
          Bottom-right corner, shows only md+
      ══════════════════════════════════════ */}
      <div
        className={`fixed right-6 z-40 hidden md:flex flex-col gap-3 items-end transition-all duration-300 ${barOpen ? "bottom-14" : "bottom-6"}`}
        data-testid="desktop-fab-stack"
      >
        {/* Request Quote FAB */}
        <button
          onClick={openQuote}
          data-testid="btn-request-quote-fab"
          className="group flex items-center gap-0 bg-primary hover:bg-primary/90 text-white font-semibold text-sm rounded-full shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 overflow-hidden h-14 w-14 hover:w-52 hover:px-5 hover:gap-3"
          aria-label="Request a Quote"
        >
          <MessageSquare className="w-6 h-6 shrink-0 mx-auto group-hover:mx-0 transition-all duration-300" />
          <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-200 delay-100">
            Request a Quote
          </span>
        </button>

        {/* WhatsApp FAB */}
        <button
          onClick={() => setWaOpen((v) => !v)}
          data-testid="btn-whatsapp-fab"
          className="group flex items-center gap-0 bg-[#25D366] hover:bg-[#20b858] text-white font-semibold text-sm rounded-full shadow-xl shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-all duration-300 overflow-hidden h-14 w-14 hover:w-44 hover:px-5 hover:gap-3"
          aria-label="WhatsApp Us"
        >
          <WaIcon className="w-6 h-6 shrink-0 mx-auto group-hover:mx-0 transition-all duration-300" />
          <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-200 delay-100">
            WhatsApp Us
          </span>
        </button>
      </div>
    </>
  );
}

/* ── Shared WhatsApp popup card ── */
function WaPopup({
  onClose,
  onSend,
}: {
  onClose: () => void;
  onSend: (msg: string) => void;
}) {
  const WaIcon2 = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.535 5.849L.057 23.516a.5.5 0 0 0 .614.622l5.814-1.524A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.92 0-3.72-.51-5.27-1.4l-.38-.22-3.44.9.92-3.36-.25-.39A9.964 9.964 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );

  return (
    <div className="w-80 bg-white rounded-2xl shadow-2xl border border-border overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
      <div className="bg-[#25D366] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center shrink-0">
            <WaIcon2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">Quensol Support</p>
            <p className="text-white/80 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
              Typically replies in minutes
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white p-1 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 bg-[#f0f9f1]">
        <div className="bg-white rounded-xl rounded-tl-sm p-3 text-sm text-slate-700 shadow-sm mb-4">
          <p>👋 Hi! How can we help you today?</p>
          <span className="text-[10px] text-slate-400 block mt-1 text-right">Quensol Team</span>
        </div>

        <p className="text-[11px] text-slate-500 mb-2 font-semibold uppercase tracking-wide">
          Quick messages
        </p>
        <div className="flex flex-col gap-2">
          {PRESET_MESSAGES.map((msg) => (
            <button
              key={msg}
              onClick={() => onSend(msg)}
              data-testid={`btn-wa-${msg.slice(0, 20).toLowerCase().replace(/\s/g, "-")}`}
              className="text-left text-sm bg-white border border-[#25D366]/30 text-[#128C7E] px-3 py-2 rounded-xl hover:bg-[#25D366]/5 active:scale-95 transition-all font-medium"
            >
              {msg}
            </button>
          ))}
        </div>

        <button
          onClick={() => onSend("Hi Quensol! I'd like to get in touch.")}
          className="mt-3 w-full bg-[#25D366] hover:bg-[#20b858] active:scale-95 text-white font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-all"
        >
          <WaIcon2 className="w-4 h-4 text-white" />
          Open WhatsApp Chat
        </button>
      </div>
    </div>
  );
}
