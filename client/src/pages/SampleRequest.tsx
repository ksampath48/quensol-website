import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check, Package, FlaskConical, Clock, Truck } from "lucide-react";

const PRODUCTS = [
  "Quensol Nitrile Exam Gloves",
  "Quensol Latex Surgical",
  "Quensol Heavy Duty Safety Gloves",
  "Quensol Neoprene Surgical",
  "Quensol Vinyl Gloves",
  "Quensol Aloe Latex",
];

const WHATSAPP_NUMBER = "917386101845";

interface SampleForm {
  firstName: string;
  lastName: string;
  organisation: string;
  designation: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  products: string[];
  purpose: string;
}

export default function SampleRequest() {
  const [form, setForm] = useState<SampleForm>({
    firstName: "", lastName: "", organisation: "", designation: "",
    email: "", phone: "", address: "", city: "",
    products: [], purpose: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const toggleProduct = (p: string) => {
    setForm(prev => ({
      ...prev,
      products: prev.products.includes(p) ? prev.products.filter(x => x !== p) : prev.products.length < 3 ? [...prev.products, p] : prev.products,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.products.length === 0) return alert("Please select at least one product.");
    setSubmitting(true);
    // Submit as enquiry
    await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: form.firstName, lastName: form.lastName,
        company: form.organisation, email: form.email, phone: form.phone,
        product: form.products.join(", "),
        message: `SAMPLE REQUEST\nDesignation: ${form.designation}\nCity: ${form.city}\nAddress: ${form.address}\nPurpose: ${form.purpose}`,
        quantity: 1,
      }),
    });
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      const msg = `Hi Quensol! I'd like to request glove samples.\n\nName: ${form.firstName} ${form.lastName}\nOrganisation: ${form.organisation}\nCity: ${form.city}\nProducts: ${form.products.join(", ")}\n\nPlease confirm availability.`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    }, 1500);
  };

  const inputCls = "w-full h-10 px-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <div className="bg-slate-50 border-b border-border py-12 mb-12">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-widest mb-3">
              <FlaskConical className="w-4 h-4" /> Free Sample Program
            </span>
            <h1 className="text-4xl font-heading font-bold mb-4">Request Free Product Samples</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Evaluate our gloves in your environment before committing to a bulk order. We dispatch up to 3 product samples within 48 hours.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {/* Info sidebar */}
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-4">How It Works</h3>
                <div className="space-y-4">
                  {[
                    { icon: Package, step: "1", label: "Choose Products", desc: "Select up to 3 glove types from our range." },
                    { icon: Check, step: "2", label: "Submit Request", desc: "Fill the form — takes under 2 minutes." },
                    { icon: Truck, step: "3", label: "We Dispatch", desc: "Samples shipped within 48 hours." },
                    { icon: Clock, step: "4", label: "Evaluate & Order", desc: "Place a bulk order when you're ready." },
                  ].map(({ icon: Icon, step, label, desc }) => (
                    <div key={step} className="flex gap-3">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">{step}</div>
                      <div>
                        <p className="font-semibold text-sm">{label}</p>
                        <p className="text-xs text-muted-foreground">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
                <p className="font-bold text-sm mb-2">📦 What You Get</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 1 box per requested product (100 gloves)</li>
                  <li>• Certificate of conformance</li>
                  <li>• Product data sheet</li>
                  <li>• Bulk pricing sheet</li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <p className="font-bold text-sm mb-1 text-amber-800">Courier Charges</p>
                <p className="text-xs text-amber-700">Free within Hyderabad. ₹150 flat for other cities — adjusted against your first order.</p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-white rounded-2xl border border-border p-12 text-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Request Received!</h3>
                  <p className="text-muted-foreground mb-4">We'll dispatch your samples within 48 hours. Opening WhatsApp to confirm…</p>
                  <a href="/" className="text-primary text-sm hover:underline">← Back to Home</a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-border p-8 space-y-5">
                  <h3 className="font-bold text-lg mb-1">Your Details</h3>
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
                      <input required name="organisation" value={form.organisation} onChange={handleChange} className={inputCls} placeholder="Apollo Hospital" />
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">Delivery City *</label>
                      <input required name="city" value={form.city} onChange={handleChange} className={inputCls} placeholder="Hyderabad" />
                    </div>
                  </div>

                  {/* Product selection */}
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">
                      Select Products (up to 3) *
                      <span className="text-primary ml-2 normal-case">{form.products.length}/3 selected</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {PRODUCTS.map((p) => {
                        const selected = form.products.includes(p);
                        const disabled = !selected && form.products.length >= 3;
                        return (
                          <button
                            type="button"
                            key={p}
                            onClick={() => toggleProduct(p)}
                            disabled={disabled}
                            data-testid={`btn-sample-product-${p.slice(0, 15).toLowerCase().replace(/\s/g, "-")}`}
                            className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all text-sm ${
                              selected ? "border-primary bg-primary/5 text-primary font-semibold" :
                              disabled ? "border-border text-muted-foreground opacity-40 cursor-not-allowed" :
                              "border-border hover:border-primary/50 text-foreground"
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${selected ? "bg-primary border-primary" : "border-current"}`}>
                              {selected && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <span className="line-clamp-1">{p}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">Purpose / Notes</label>
                    <textarea
                      name="purpose" value={form.purpose} onChange={handleChange} rows={2}
                      placeholder="e.g. Evaluating for ICU ward use, need size M and L…"
                      className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full h-12 text-base font-bold rounded-full shadow-lg" disabled={submitting}>
                    {submitting ? "Submitting…" : "Submit Sample Request"}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">WhatsApp confirmation will be sent automatically after submission.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
