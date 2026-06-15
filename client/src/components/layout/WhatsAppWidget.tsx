import { useState } from "react";
import { X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const PHONE = "917386101845";
const PRESET_MESSAGES = [
  "Hi! I'd like to know more about your gloves.",
  "I need a bulk quote for Nitrile gloves.",
  "Can I request product samples?",
  "What are your payment and delivery terms?",
];

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  const sendMessage = (msg: string) => {
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, "_blank");
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-3">
      {/* Popup card */}
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl w-72 overflow-hidden border border-border animate-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-[#25D366] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.535 5.849L.057 23.516a.5.5 0 0 0 .614.622l5.814-1.524A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.92 0-3.72-.51-5.27-1.4l-.38-.22-3.44.9.92-3.36-.25-.39A9.964 9.964 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-sm">Quensol Support</p>
                <p className="text-white/80 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-white rounded-full inline-block" />
                  Typically replies in minutes
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-[#f0f9f1]">
            <div className="bg-white rounded-xl p-3 text-sm text-slate-700 shadow-sm mb-4 relative">
              <p>👋 Hi there! How can we help you today?</p>
              <span className="text-[10px] text-slate-400 block mt-1 text-right">Quensol Team</span>
              <div className="absolute bottom-3 -left-1.5 w-3 h-3 bg-white rotate-45 shadow-[-2px_2px_0_rgba(0,0,0,0.05)]" />
            </div>
            <p className="text-xs text-slate-500 mb-2 font-medium uppercase tracking-wide">Quick Questions</p>
            <div className="flex flex-col gap-2">
              {PRESET_MESSAGES.map((msg) => (
                <button
                  key={msg}
                  onClick={() => sendMessage(msg)}
                  data-testid={`btn-wa-${msg.slice(0, 20).toLowerCase().replace(/\s/g, "-")}`}
                  className="text-left text-sm bg-white border border-[#25D366]/30 text-[#128C7E] px-3 py-2 rounded-xl hover:bg-[#25D366]/5 transition-colors font-medium"
                >
                  {msg}
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 pb-4 bg-[#f0f9f1]">
            <button
              onClick={() => sendMessage("Hi Quensol! I'd like to get in touch.")}
              className="w-full bg-[#25D366] hover:bg-[#20b858] text-white font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.535 5.849L.057 23.516a.5.5 0 0 0 .614.622l5.814-1.524A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.92 0-3.72-.51-5.27-1.4l-.38-.22-3.44.9.92-3.36-.25-.39A9.964 9.964 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Open WhatsApp Chat
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        data-testid="btn-whatsapp-widget"
        className={cn(
          "w-14 h-14 bg-[#25D366] rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95",
          open && "rotate-90"
        )}
        aria-label="Chat on WhatsApp"
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.535 5.849L.057 23.516a.5.5 0 0 0 .614.622l5.814-1.524A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.92 0-3.72-.51-5.27-1.4l-.38-.22-3.44.9.92-3.36-.25-.39A9.964 9.964 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
        )}
      </button>
    </div>
  );
}
