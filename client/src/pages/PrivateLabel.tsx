import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  CheckCircle, Package, Palette, Factory, Truck,
  ChevronRight, Star, AlertCircle, Layers, Tag, Award,
} from "lucide-react";

const WHATSAPP = "917386101845";

const GLOVE_TYPES = [
  "Nitrile Exam Gloves",
  "Latex Examination Gloves",
  "Latex Surgical Sterile",
  "Neoprene Surgical Sterile",
  "Vinyl Gloves",
  "Heavy Duty Safety Gloves",
];

const BRANDING_OPTIONS = [
  "Custom Logo on Box",
  "Custom Box Color",
  "Custom Brand Name on Gloves",
  "Private Label (no Quensol branding)",
  "Co-branded (Your logo + Quensol)",
  "Custom Inner Packaging",
];

const STEPS = [
  {
    icon: Palette,
    step: "01",
    title: "Share Your Brief",
    desc: "Tell us your brand name, logo, preferred colors, and the glove types you need. We'll assign a dedicated account manager.",
  },
  {
    icon: Factory,
    step: "02",
    title: "Sample & Approval",
    desc: "We produce a branded sample box within 7 working days. You approve the design before full production begins.",
  },
  {
    icon: Package,
    step: "03",
    title: "Production & QC",
    desc: "Each batch is AQL 1.5 tested and CE/ISO certified. Your branding appears exactly as approved.",
  },
  {
    icon: Truck,
    step: "04",
    title: "Delivery Pan-India",
    desc: "Packed and dispatched under your brand. Full Certificates of Conformance and test reports included.",
  },
];

const BENEFITS = [
  { icon: Star, text: "Minimum Order: 500 boxes per SKU" },
  { icon: Award, text: "All certifications transferred to your brand" },
  { icon: Layers, text: "6 glove types available for private labeling" },
  { icon: Tag, text: "15–22% margin uplift vs reselling generic brands" },
  { icon: CheckCircle, text: "Pantone-matched box colors available" },
  { icon: Package, text: "Custom inner-pack counts (50/100/200 per box)" },
];

interface PLForm {
  brandName: string;
  companyName: string;
  contactName: string;
  designation: string;
  email: string;
  phone: string;
  gloveTypes: string[];
  brandingOptions: string[];
  monthlyQuantity: string;
  targetMarket: string;
  notes: string;
}

const INIT: PLForm = {
  brandName: "", companyName: "", contactName: "", designation: "",
  email: "", phone: "", gloveTypes: [], brandingOptions: [],
  monthlyQuantity: "", targetMarket: "", notes: "",
};

export default function PrivateLabel() {
  const [form, setForm] = useState<PLForm>(INIT);
  const [errors, setErrors] = useState<Partial<Record<keyof PLForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof PLForm]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const toggleArr = (field: "gloveTypes" | "brandingOptions", val: string) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(val) ? prev[field].filter(v => v !== val) : [...prev[field], val],
    }));
  };

  const validate = () => {
    const e: Partial<Record<keyof PLForm, string>> = {};
    if (!form.brandName.trim()) e.brandName = "Brand name is required";
    if (!form.companyName.trim()) e.companyName = "Company name is required";
    if (!form.contactName.trim()) e.contactName = "Contact name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Valid 10-digit mobile required";
    if (form.gloveTypes.length === 0) e.gloveTypes = "Select at least one glove type";
    if (!form.monthlyQuantity.trim()) e.monthlyQuantity = "Monthly quantity is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    const message = [
      `🏷️ Private Label / Custom Packaging Enquiry`,
      `Brand Name: ${form.brandName}`,
      `Company: ${form.companyName}`,
      `Contact: ${form.contactName}${form.designation ? `, ${form.designation}` : ""}`,
      `Email: ${form.email} | Phone: ${form.phone}`,
      `Glove Types: ${form.gloveTypes.join(", ")}`,
      `Branding: ${form.brandingOptions.join(", ") || "Standard"}`,
      `Monthly Qty: ${form.monthlyQuantity} boxes`,
      `Target Market: ${form.targetMarket || "—"}`,
      `Notes: ${form.notes || "—"}`,
    ].join("\n");

    try {
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.contactName,
          email: form.email,
          phone: form.phone,
          company: form.companyName,
          message,
          type: "private_label",
        }),
      });
    } catch {}

    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank");
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 py-24 bg-slate-50">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Private Label Enquiry Received!</h2>
            <p className="text-muted-foreground mb-6">
              Our private labeling team will reach out to <strong>{form.contactName}</strong> within <strong>4 business hours</strong> to discuss your brand requirements for <em>{form.brandName}</em>.
            </p>
            <p className="text-sm text-muted-foreground mb-6">Redirecting to WhatsApp for faster response…</p>
            <div className="flex gap-3 justify-center">
              <a href="/"><Button variant="outline" className="rounded-full">Back to Home</Button></a>
              <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi Quensol, I submitted a private label enquiry for brand: " + form.brandName)}`}
                target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full bg-green-600 hover:bg-green-700">Open WhatsApp</Button>
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-slate-900 via-indigo-900 to-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-indigo-300 text-sm font-semibold tracking-widest uppercase mb-3">Private Label & Custom Packaging</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Sell Gloves Under<br className="hidden md:block" /> Your Own Brand
            </h1>
            <p className="text-white/75 text-base max-w-xl mx-auto mb-8">
              Quensol manufactures and packages medical gloves under your brand name — full ISO/CE certification, custom box design, pan-India delivery. MOQ: 500 boxes.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a href="#enquiry-form">
                <Button className="rounded-full px-6 py-3 bg-white text-primary hover:bg-slate-100 font-semibold shadow-lg" data-testid="btn-hero-enquire">
                  Start Your Brand Enquiry <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </a>
              <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi Quensol, I want to discuss private labeling / custom packaging for medical gloves.")}`}
                target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full px-6 py-3 bg-green-500 hover:bg-green-600 font-semibold" data-testid="btn-hero-whatsapp">
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white border-b border-border py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">What's Included</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {BENEFITS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <Icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {STEPS.map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="bg-white rounded-2xl border border-border p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-4xl font-black text-primary/20 mb-1">{step}</p>
                <h3 className="font-bold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="enquiry-form" className="container mx-auto px-4 pb-16 max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Start Your Brand Enquiry</h2>
          <p className="text-muted-foreground text-sm">Fill in your requirements and we'll get back within 4 business hours.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>

          {/* Brand & Company */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5 text-primary" /> Brand Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Brand Name *</label>
                <input name="brandName" value={form.brandName} onChange={handleChange}
                  placeholder="e.g. MediShield Pro"
                  data-testid="input-brand-name"
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors.brandName ? "border-red-400" : "border-border"}`} />
                {errors.brandName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.brandName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company Name *</label>
                <input name="companyName" value={form.companyName} onChange={handleChange}
                  placeholder="Your company / hospital"
                  data-testid="input-company-name"
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors.companyName ? "border-red-400" : "border-border"}`} />
                {errors.companyName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.companyName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contact Name *</label>
                <input name="contactName" value={form.contactName} onChange={handleChange}
                  placeholder="Your full name"
                  data-testid="input-contact-name"
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors.contactName ? "border-red-400" : "border-border"}`} />
                {errors.contactName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.contactName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Designation</label>
                <input name="designation" value={form.designation} onChange={handleChange}
                  placeholder="e.g. Director, Procurement Head"
                  data-testid="input-designation"
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="you@company.com"
                  data-testid="input-email"
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors.email ? "border-red-400" : "border-border"}`} />
                {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mobile *</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                  placeholder="10-digit mobile"
                  data-testid="input-phone"
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors.phone ? "border-red-400" : "border-border"}`} />
                {errors.phone && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Glove Types */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" /> Glove Types * (select all needed)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {GLOVE_TYPES.map(g => (
                <label key={g}
                  className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-all ${form.gloveTypes.includes(g) ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/50"}`}
                  data-testid={`checkbox-glove-${g.toLowerCase().replace(/\s+/g, "-")}`}>
                  <input type="checkbox" className="sr-only" checked={form.gloveTypes.includes(g)} onChange={() => toggleArr("gloveTypes", g)} />
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${form.gloveTypes.includes(g) ? "border-primary bg-primary" : "border-border"}`}>
                    {form.gloveTypes.includes(g) && <svg viewBox="0 0 10 8" className="w-2.5 h-2.5 text-white fill-white"><path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <span className="text-sm">{g}</span>
                </label>
              ))}
            </div>
            {errors.gloveTypes && <p className="text-red-500 text-xs mt-2 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.gloveTypes}</p>}
          </div>

          {/* Branding Options */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" /> Branding Requirements
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {BRANDING_OPTIONS.map(opt => (
                <button key={opt} type="button"
                  onClick={() => toggleArr("brandingOptions", opt)}
                  data-testid={`btn-branding-${opt.toLowerCase().replace(/[\s()\/]+/g, "-")}`}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${form.brandingOptions.includes(opt) ? "bg-primary text-white border-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}>
                  {opt}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Monthly Quantity (boxes) *</label>
                <input name="monthlyQuantity" value={form.monthlyQuantity} onChange={handleChange}
                  placeholder="e.g. 500 boxes/month"
                  data-testid="input-monthly-qty"
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors.monthlyQuantity ? "border-red-400" : "border-border"}`} />
                {errors.monthlyQuantity && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.monthlyQuantity}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Target Market</label>
                <input name="targetMarket" value={form.targetMarket} onChange={handleChange}
                  placeholder="e.g. Hospitals in AP & Telangana"
                  data-testid="input-target-market"
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Additional Notes</label>
              <textarea name="notes" value={form.notes} onChange={handleChange} rows={3}
                placeholder="Pantone colors, logo files format, special certifications needed, existing packaging references…"
                data-testid="textarea-notes"
                className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button type="submit" disabled={submitting}
              className="flex-1 rounded-full py-6 text-base font-semibold shadow-lg shadow-primary/25"
              data-testid="btn-submit-pl">
              {submitting ? "Submitting…" : "Submit Brand Enquiry"}
              {!submitting && <ChevronRight className="w-5 h-5 ml-1" />}
            </Button>
            <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi Quensol, I want to discuss private labeling / custom packaging for: " + (form.brandName || "my brand"))}`}
              target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button type="button" variant="outline"
                className="w-full rounded-full py-6 text-base border-green-500 text-green-600 hover:bg-green-50"
                data-testid="btn-whatsapp-pl">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Instead
              </Button>
            </a>
          </div>
        </form>
      </section>

      <Footer />
    </div>
  );
}
