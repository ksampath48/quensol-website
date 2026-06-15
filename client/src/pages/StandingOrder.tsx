import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check, RefreshCw, Shield, TrendingDown, Clock, Truck } from "lucide-react";

const PRODUCTS = [
  "Quensol Nitrile Exam Gloves",
  "Quensol Latex Surgical",
  "Quensol Heavy Duty Safety Gloves",
  "Quensol Neoprene Surgical",
  "Quensol Vinyl Gloves",
  "Quensol Aloe Latex",
];

const FREQUENCIES = [
  { value: "weekly", label: "Weekly", desc: "Every 7 days" },
  { value: "biweekly", label: "Bi-weekly", desc: "Every 14 days" },
  { value: "monthly", label: "Monthly", desc: "Every 30 days" },
  { value: "quarterly", label: "Quarterly", desc: "Every 90 days" },
];

const WHATSAPP = "917386101845";

interface StandingForm {
  firstName: string; lastName: string; company: string;
  designation: string; email: string; phone: string;
  product: string; quantity: string; frequency: string;
  startDate: string; deliveryAddress: string; notes: string;
}

export default function StandingOrder() {
  const [form, setForm] = useState<StandingForm>({
    firstName: "", lastName: "", company: "", designation: "",
    email: "", phone: "", product: PRODUCTS[0], quantity: "",
    frequency: "monthly", startDate: "", deliveryAddress: "", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: form.firstName, lastName: form.lastName,
        company: form.company, email: form.email, phone: form.phone,
        product: form.product, quantity: Number(form.quantity) || 1,
        message: `STANDING ORDER REQUEST\nDesignation: ${form.designation}\nFrequency: ${form.frequency}\nStart Date: ${form.startDate}\nDelivery Address: ${form.deliveryAddress}\nNotes: ${form.notes}`,
      }),
    });
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      const msg = `Hi Quensol! I'd like to set up a standing order.\n\nCompany: ${form.company}\nProduct: ${form.product}\nQuantity: ${form.quantity} boxes\nFrequency: ${form.frequency}\n\nPlease get in touch to confirm.`;
      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
    }, 1500);
  };

  const inputCls = "w-full h-10 px-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-24">
        {/* Hero */}
        <div className="bg-gradient-to-br from-primary/5 to-cyan-50 border-b border-border py-14">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-widest mb-3">
              <RefreshCw className="w-3.5 h-3.5" /> Automated Supply
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Set Up a Standing Order</h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Never run out of stock. Schedule automatic recurring deliveries — weekly, bi-weekly, or monthly — at locked-in bulk pricing.
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white border-b border-border py-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { icon: TrendingDown, title: "5–12% Discount", desc: "Locked-in pricing below standard bulk rates" },
                { icon: Truck, title: "Priority Dispatch", desc: "Standing orders ship before spot orders" },
                { icon: Shield, title: "Guaranteed Stock", desc: "Reserved inventory for your facility" },
                { icon: Clock, title: "Zero Admin Work", desc: "No need to re-order every month" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="text-center p-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="font-bold text-sm mb-1">{title}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-12">
          <div className="max-w-2xl mx-auto">
            {submitted ? (
              <div className="bg-white rounded-2xl border border-border p-12 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Standing Order Submitted!</h3>
                <p className="text-muted-foreground mb-2">Our team will call you within 4 hours to confirm terms and pricing.</p>
                <p className="text-sm text-muted-foreground">Opening WhatsApp to send you a confirmation…</p>
                <a href="/" className="mt-6 inline-block text-primary text-sm hover:underline">← Back to Home</a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-border p-8 space-y-5">
                <h2 className="font-heading font-bold text-xl">Standing Order Setup</h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">First Name *</label>
                    <input required name="firstName" value={form.firstName} onChange={handleChange} className={inputCls} placeholder="Rahul" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">Last Name</label>
                    <input name="lastName" value={form.lastName} onChange={handleChange} className={inputCls} placeholder="Sharma" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">Organisation *</label>
                    <input required name="company" value={form.company} onChange={handleChange} className={inputCls} placeholder="Apollo Hospital" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">Designation</label>
                    <input name="designation" value={form.designation} onChange={handleChange} className={inputCls} placeholder="Purchase Manager" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">Email *</label>
                    <input required type="email" name="email" value={form.email} onChange={handleChange} className={inputCls} placeholder="rahul@hospital.com" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">Phone *</label>
                    <input required type="tel" name="phone" value={form.phone} onChange={handleChange} className={inputCls} placeholder="+91 98765 43210" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">Product *</label>
                  <select required name="product" value={form.product} onChange={handleChange} className={inputCls}>
                    {PRODUCTS.map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">Quantity (Boxes/Order) *</label>
                    <input required type="number" min="10" name="quantity" value={form.quantity} onChange={handleChange} className={inputCls} placeholder="e.g. 100" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">Preferred Start Date</label>
                    <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className={inputCls} />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">Delivery Frequency *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {FREQUENCIES.map(f => (
                      <button
                        type="button"
                        key={f.value}
                        onClick={() => setForm(prev => ({ ...prev, frequency: f.value }))}
                        className={`p-3 rounded-xl border-2 text-left transition-all ${form.frequency === f.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}
                      >
                        <p className="font-bold text-sm">{f.label}</p>
                        <p className="text-xs text-muted-foreground">{f.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">Delivery Address *</label>
                  <textarea required name="deliveryAddress" value={form.deliveryAddress} onChange={handleChange} rows={2}
                    className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none"
                    placeholder="Full delivery address with PIN code" />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">Additional Notes</label>
                  <textarea name="notes" value={form.notes} onChange={handleChange} rows={2}
                    className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none"
                    placeholder="Special packaging, size preferences, etc." />
                </div>

                <Button type="submit" className="w-full h-12 text-base font-bold rounded-full shadow-lg" disabled={submitting}>
                  {submitting ? "Submitting…" : "Set Up Standing Order"}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Our team will confirm pricing and terms within 4 business hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
