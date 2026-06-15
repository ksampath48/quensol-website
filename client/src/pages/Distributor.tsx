import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check, MapPin, TrendingUp, Users, Package, Award, ArrowRight } from "lucide-react";

const TERRITORIES = [
  { city: "Hyderabad", state: "Telangana", status: "open" },
  { city: "Bangalore", state: "Karnataka", status: "open" },
  { city: "Chennai", state: "Tamil Nadu", status: "open" },
  { city: "Mumbai", state: "Maharashtra", status: "limited" },
  { city: "Delhi NCR", state: "Delhi", status: "open" },
  { city: "Pune", state: "Maharashtra", status: "open" },
  { city: "Kolkata", state: "West Bengal", status: "open" },
  { city: "Ahmedabad", state: "Gujarat", status: "open" },
  { city: "Jaipur", state: "Rajasthan", status: "open" },
  { city: "Coimbatore", state: "Tamil Nadu", status: "open" },
  { city: "Visakhapatnam", state: "Andhra Pradesh", status: "open" },
  { city: "Kochi", state: "Kerala", status: "limited" },
];

const WHATSAPP = "917386101845";

interface DistForm {
  firstName: string; lastName: string; company: string;
  email: string; phone: string; city: string; state: string;
  experience: string; turnover: string; channels: string; message: string;
}

export default function Distributor() {
  const [form, setForm] = useState<DistForm>({
    firstName: "", lastName: "", company: "", email: "", phone: "",
    city: "", state: "", experience: "", turnover: "", channels: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: form.firstName, lastName: form.lastName,
        company: form.company, email: form.email, phone: form.phone,
        product: "Distributor Application",
        message: `DISTRIBUTOR APPLICATION\nCity: ${form.city}, ${form.state}\nExperience: ${form.experience}\nTurnover: ${form.turnover}\nDistribution Channels: ${form.channels}\nMessage: ${form.message}`,
        quantity: 1,
      }),
    });
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      const msg = `Hi Quensol! I'd like to apply as a distributor.\n\nCompany: ${form.company}\nLocation: ${form.city}, ${form.state}\nExperience: ${form.experience}\n\nPlease share more details.`;
      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
    }, 1500);
  };

  const inputCls = "w-full h-10 px-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-24">
        {/* Hero */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              <Users className="w-3.5 h-3.5" /> Partner Programme
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-5">Become a Quensol Distributor</h1>
            <p className="text-slate-400 max-w-xl mx-auto text-lg mb-8">
              Partner with India's fastest-growing medical gloves brand. Earn industry-leading margins with dedicated territory support.
            </p>
            <a href="#apply">
              <button className="h-12 px-8 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-colors flex items-center gap-2 mx-auto">
                Apply Now <ArrowRight className="w-4 h-4" />
              </button>
            </a>
          </div>
        </div>

        {/* Benefits */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold mb-3">Why Distribute Quensol?</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">Everything you need to build a profitable distribution business in healthcare.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { icon: TrendingUp, title: "20–35% Gross Margins", desc: "Industry-leading margins with volume-based incentives and quarterly bonuses." },
                { icon: MapPin, title: "Exclusive Territory", desc: "Protected geographic territory — no channel conflict, your customers are yours." },
                { icon: Package, title: "Drop-ship Support", desc: "We ship directly to your customers. No warehousing required to get started." },
                { icon: Award, title: "Certifications & Training", desc: "Full product training, marketing materials, and sales support from day one." },
                { icon: Users, title: "Dedicated Account Manager", desc: "Direct line to a Quensol account manager for pricing, escalations, and support." },
                { icon: Check, title: "No Minimum for Trial", desc: "Start with a pilot order of just 50 boxes — no large upfront commitment needed." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-slate-50 rounded-2xl p-6 border border-border">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Open Territories */}
        <div className="py-16 bg-slate-50 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-heading font-bold mb-2">Open Territories</h2>
              <p className="text-muted-foreground">Cities actively seeking new distribution partners.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
              {TERRITORIES.map(t => (
                <div key={t.city}
                  className={`flex items-center gap-2.5 rounded-xl px-4 py-3 border ${t.status === "open" ? "bg-white border-border" : "bg-amber-50 border-amber-200"}`}
                >
                  <MapPin className={`w-3.5 h-3.5 shrink-0 ${t.status === "open" ? "text-primary" : "text-amber-600"}`} />
                  <div>
                    <p className="font-semibold text-sm">{t.city}</p>
                    <p className="text-xs text-muted-foreground">{t.status === "open" ? "Open" : "Limited"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div id="apply" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-heading font-bold mb-2">Apply to Become a Partner</h2>
                <p className="text-muted-foreground">We review applications within 3 business days.</p>
              </div>

              {submitted ? (
                <div className="bg-white rounded-2xl border border-border p-12 text-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Application Received!</h3>
                  <p className="text-muted-foreground mb-2">Our partnerships team will be in touch within 3 business days.</p>
                  <a href="/" className="mt-4 inline-block text-primary text-sm hover:underline">← Back to Home</a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-border p-8 space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">First Name *</label>
                      <input required name="firstName" value={form.firstName} onChange={handleChange} className={inputCls} placeholder="Rajesh" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">Last Name</label>
                      <input name="lastName" value={form.lastName} onChange={handleChange} className={inputCls} placeholder="Kumar" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">Company / Business Name *</label>
                    <input required name="company" value={form.company} onChange={handleChange} className={inputCls} placeholder="Kumar Medical Supplies Pvt Ltd" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">Email *</label>
                      <input required type="email" name="email" value={form.email} onChange={handleChange} className={inputCls} placeholder="rajesh@kumar-medical.com" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">Phone *</label>
                      <input required type="tel" name="phone" value={form.phone} onChange={handleChange} className={inputCls} placeholder="+91 98765 43210" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">City *</label>
                      <input required name="city" value={form.city} onChange={handleChange} className={inputCls} placeholder="Bangalore" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">State *</label>
                      <input required name="state" value={form.state} onChange={handleChange} className={inputCls} placeholder="Karnataka" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">Years in Medical Distribution</label>
                      <select name="experience" value={form.experience} onChange={handleChange} className={inputCls}>
                        <option value="">Select</option>
                        <option>Less than 1 year</option>
                        <option>1–3 years</option>
                        <option>3–5 years</option>
                        <option>5–10 years</option>
                        <option>10+ years</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">Annual Turnover (approx)</label>
                      <select name="turnover" value={form.turnover} onChange={handleChange} className={inputCls}>
                        <option value="">Select</option>
                        <option>Under ₹25 Lakhs</option>
                        <option>₹25–50 Lakhs</option>
                        <option>₹50 Lakhs–1 Crore</option>
                        <option>₹1–5 Crore</option>
                        <option>Above ₹5 Crore</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">Current Distribution Channels</label>
                    <input name="channels" value={form.channels} onChange={handleChange} className={inputCls} placeholder="e.g. Hospitals, clinics, pharmacies, government tenders…" />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">Why do you want to partner with Quensol?</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={3}
                      className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none"
                      placeholder="Tell us about your network and why you'd be a great fit…" />
                  </div>

                  <Button type="submit" className="w-full h-12 text-base font-bold rounded-full shadow-lg" disabled={submitting}>
                    {submitting ? "Submitting…" : "Submit Partnership Application"}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">Our partnerships team reviews all applications within 3 business days.</p>
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
