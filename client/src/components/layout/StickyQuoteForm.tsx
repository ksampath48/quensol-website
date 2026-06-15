import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, X, Check } from "lucide-react";
import { submitEnquiry, type EnquiryPayload } from "@/lib/api";

const WHATSAPP_NUMBER = "917386101845";

function buildWhatsAppMessage(data: EnquiryPayload): string {
  return encodeURIComponent(
    `Hello Quensol Team,\n\nI'd like to request a quote:\n\n` +
    `Name: ${data.firstName} ${data.lastName || ""}\n` +
    `Company: ${data.company}\n` +
    `Email: ${data.email}\n` +
    `Phone: ${data.phone}\n` +
    `Product: ${data.product}\n` +
    `Quantity: ${data.quantity ?? "–"} boxes\n` +
    (data.message ? `Message: ${data.message}\n` : "") +
    `\nPlease get back to me with pricing. Thank you!`
  );
}

interface StickyQuoteFormProps {
  initialProduct?: string;
}

export function StickyQuoteForm({ initialProduct }: StickyQuoteFormProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [barOpen, setBarOpen] = useState(false);

  useEffect(() => {
    const onBar = (e: Event) => setBarOpen((e as CustomEvent).detail.open);
    window.addEventListener("comparison-bar", onBar);
    return () => window.removeEventListener("comparison-bar", onBar);
  }, []);

  const emptyForm = (): EnquiryPayload => ({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    product: initialProduct || "Nitrile Gloves",
    quantity: undefined,
    message: "",
  });

  const [form, setForm] = useState<EnquiryPayload>(emptyForm);

  // Allow external triggers via custom event
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.product) {
        setForm((prev) => ({ ...prev, product: detail.product }));
      }
      setIsOpen(true);
    };
    window.addEventListener("open-quote-form", handler);
    return () => window.removeEventListener("open-quote-form", handler);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await submitEnquiry(form);
      setIsSubmitted(true);

      // Open WhatsApp with prefilled message after 1.5s
      setTimeout(() => {
        const msg = buildWhatsAppMessage(form);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
      }, 1500);

      // Reset after 4s
      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
        setForm(emptyForm());
      }, 4000);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls =
    "w-full h-10 px-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm";

  return (
    <>
      {/* Floating Button */}
      <button
        id="sticky-quote-btn"
        data-testid="btn-sticky-quote"
        onClick={() => setIsOpen(true)}
        className={`fixed right-6 z-40 bg-primary text-white px-5 py-3 rounded-full shadow-2xl hover:bg-primary/90 transition-all hover:scale-105 flex items-center gap-2 font-bold text-sm ${barOpen ? "bottom-[4.5rem] md:bottom-6" : "bottom-6"}`}
      >
        <MessageSquare className="w-5 h-5" />
        Request Quote
      </button>

      {/* Backdrop + Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 flex flex-col max-h-[92vh]">
            {/* Header */}
            <div className="bg-primary p-5 text-white flex justify-between items-start rounded-t-2xl shrink-0">
              <div>
                <h3 className="font-heading font-bold text-xl">Request a Bulk Quote</h3>
                <p className="text-primary-foreground/80 text-sm mt-0.5">
                  We respond within 2 hours • +91 7386101845
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors mt-0.5 shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              {isSubmitted ? (
                <div className="py-10 text-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-xl mb-2">Request Received!</h4>
                  <p className="text-muted-foreground text-sm mb-4">
                    Our team will contact you shortly. Opening WhatsApp for you…
                  </p>
                  <div className="flex items-center justify-center gap-2 text-green-600 font-semibold text-sm">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.535 5.849L.057 23.516a.5.5 0 0 0 .614.622l5.814-1.524A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.92 0-3.72-.51-5.27-1.4l-.38-.22-3.44.9.92-3.36-.25-.39A9.964 9.964 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                    </svg>
                    Opening WhatsApp…
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-200">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">First Name *</label>
                      <input required name="firstName" value={form.firstName} onChange={handleChange} className={inputCls} placeholder="Rahul" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">Last Name</label>
                      <input name="lastName" value={form.lastName} onChange={handleChange} className={inputCls} placeholder="Sharma" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">Company *</label>
                    <input required name="company" value={form.company} onChange={handleChange} className={inputCls} placeholder="City Hospital" />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">Email *</label>
                    <input required type="email" name="email" value={form.email} onChange={handleChange} className={inputCls} placeholder="rahul@hospital.com" />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">Phone *</label>
                    <input required type="tel" name="phone" value={form.phone} onChange={handleChange} className={inputCls} placeholder="+91 98765 43210" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">Product *</label>
                      <select required name="product" value={form.product} onChange={handleChange} className={inputCls}>
                        <option>Nitrile Gloves</option>
                        <option>Latex Gloves</option>
                        <option>Vinyl Gloves</option>
                        <option>Safety Gloves</option>
                        <option>Surgical Gloves</option>
                        <option>Mixed Order</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">Qty (Boxes)</label>
                      <input
                        type="number"
                        name="quantity"
                        min="1"
                        placeholder="e.g. 50"
                        value={form.quantity ?? ""}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            quantity: e.target.value ? Number(e.target.value) : undefined,
                          }))
                        }
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Any specific requirements…"
                      className="w-full px-3 py-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20 mt-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending…" : "Submit & Continue on WhatsApp"}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    After submitting, WhatsApp will open with your details pre-filled.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
