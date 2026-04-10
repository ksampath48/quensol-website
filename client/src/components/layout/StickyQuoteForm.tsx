import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, X } from "lucide-react";
import { submitEnquiry, type EnquiryPayload } from "@/lib/api";

export function StickyQuoteForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<EnquiryPayload>({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    product: "Nitrile Gloves",
    quantity: undefined,
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
        setForm({ firstName: "", lastName: "", company: "", email: "", phone: "", product: "Nitrile Gloves", quantity: undefined, message: "" });
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        data-testid="btn-sticky-quote"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-primary text-white px-5 py-3 rounded-full shadow-2xl hover:bg-primary/90 transition-all hover:scale-105 flex items-center gap-2 font-bold"
      >
        <MessageSquare className="w-5 h-5" />
        Request Quote
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-primary p-6 text-white flex justify-between items-center shrink-0">
              <div>
                <h3 className="font-heading font-bold text-xl">Request a Bulk Quote</h3>
                <p className="text-primary-foreground/80 text-sm">We typically respond within 2 hours.</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              {isSubmitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-xl mb-2">Request Received!</h4>
                  <p className="text-muted-foreground">Our sales team will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-200">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">First Name *</label>
                      <input
                        required
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        className="w-full h-10 px-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">Last Name</label>
                      <input
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        className="w-full h-10 px-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Company Name *</label>
                    <input
                      required
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      className="w-full h-10 px-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Email Address *</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full h-10 px-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Phone Number *</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full h-10 px-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">Product *</label>
                      <select
                        required
                        name="product"
                        value={form.product}
                        onChange={handleChange}
                        className="w-full h-10 px-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                      >
                        <option>Nitrile Gloves</option>
                        <option>Latex Gloves</option>
                        <option>Vinyl Gloves</option>
                        <option>Safety Gloves</option>
                        <option>Surgical Gloves</option>
                        <option>Mixed Order</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">Quantity (Boxes)</label>
                      <input
                        type="number"
                        name="quantity"
                        min="1"
                        placeholder="e.g. 50"
                        value={form.quantity ?? ""}
                        onChange={(e) => setForm((prev) => ({ ...prev, quantity: e.target.value ? Number(e.target.value) : undefined }))}
                        className="w-full h-10 px-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Additional Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Any specific requirements..."
                      className="w-full px-3 py-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 mt-2 text-base font-bold shadow-lg shadow-primary/20"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending Request..." : "Submit Quote Request"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
