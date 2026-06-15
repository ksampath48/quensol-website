import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  CheckCircle, Building2, Phone, Mail, MapPin, ClipboardList,
  ShieldCheck, Truck, Award, ChevronRight, AlertCircle,
} from "lucide-react";

const GLOVE_TYPES = [
  "Nitrile Exam Gloves (Powder-free)",
  "Latex Surgical Sterile",
  "Latex Examination Gloves",
  "Vinyl Gloves",
  "Neoprene Surgical Sterile",
  "Heavy Duty Safety Gloves",
];

const HOSPITAL_TYPES = [
  "Government / District Hospital",
  "Corporate / Private Hospital",
  "Multi-Specialty Hospital Chain",
  "Nursing Home / Clinic",
  "Diagnostic Lab",
  "Pharmacy / Medical Store",
  "Pharma / Manufacturing Company",
  "Other",
];

const CERTIFICATIONS_NEEDED = [
  "ISO 9001:2015",
  "CE Marking (EN 455)",
  "FDA Listed",
  "ASTM D6319",
  "BIS / ISI Mark",
];

const CITIES = [
  "Hyderabad","Bangalore","Chennai","Mumbai","Delhi NCR","Pune",
  "Kolkata","Ahmedabad","Coimbatore","Visakhapatnam","Kochi","Jaipur","Other",
];

const URGENCY = [
  { value: "urgent", label: "Urgent (within 48 hours)", color: "text-red-600" },
  { value: "normal", label: "Normal (3–7 days)", color: "text-yellow-600" },
  { value: "planned", label: "Planned (7+ days)", color: "text-green-600" },
];

const WHATSAPP = "917386101845";

interface ProcForm {
  hospitalName: string;
  hospitalType: string;
  department: string;
  gstNumber: string;
  city: string;
  address: string;
  contactName: string;
  designation: string;
  email: string;
  phone: string;
  gloveTypes: string[];
  monthlyQuantity: string;
  sizeDistribution: string;
  certificationsNeeded: string[];
  currentSupplier: string;
  urgency: string;
  additionalNotes: string;
}

const INITIAL: ProcForm = {
  hospitalName: "", hospitalType: "", department: "", gstNumber: "",
  city: "", address: "", contactName: "", designation: "",
  email: "", phone: "", gloveTypes: [], monthlyQuantity: "",
  sizeDistribution: "", certificationsNeeded: [], currentSupplier: "",
  urgency: "normal", additionalNotes: "",
};

const TRUST = [
  { icon: Building2, label: "500+ Hospitals", sub: "Trust Quensol across India" },
  { icon: ShieldCheck, label: "ISO 9001 · CE · FDA", sub: "All certifications provided" },
  { icon: Truck, label: "Same-Day Dispatch", sub: "For Hyderabad orders" },
  { icon: Award, label: "AQL 1.5 Quality", sub: "Industry gold standard" },
];

export default function HospitalProcurement() {
  const [form, setForm] = useState<ProcForm>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ProcForm, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ProcForm]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const toggleArray = (field: "gloveTypes" | "certificationsNeeded", value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value],
    }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof ProcForm, string>> = {};
    if (!form.hospitalName.trim()) e.hospitalName = "Hospital name is required";
    if (!form.hospitalType) e.hospitalType = "Please select hospital type";
    if (!form.city) e.city = "Please select your city";
    if (!form.contactName.trim()) e.contactName = "Contact name is required";
    if (!form.designation.trim()) e.designation = "Designation is required";
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
      `🏥 Hospital Procurement Request`,
      `Hospital: ${form.hospitalName} (${form.hospitalType})`,
      `Department: ${form.department || "—"}`,
      `GST: ${form.gstNumber || "—"}`,
      `City: ${form.city}`,
      `Contact: ${form.contactName}, ${form.designation}`,
      `Email: ${form.email} | Phone: ${form.phone}`,
      `Gloves Needed: ${form.gloveTypes.join(", ")}`,
      `Monthly Qty: ${form.monthlyQuantity} boxes`,
      `Size Distribution: ${form.sizeDistribution || "—"}`,
      `Certifications: ${form.certificationsNeeded.join(", ") || "Standard"}`,
      `Current Supplier: ${form.currentSupplier || "—"}`,
      `Urgency: ${form.urgency}`,
      `Notes: ${form.additionalNotes || "—"}`,
    ].join("\n");

    try {
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.contactName,
          email: form.email,
          phone: form.phone,
          company: form.hospitalName,
          message,
          type: "hospital_procurement",
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
            <h2 className="text-2xl font-bold mb-2">Procurement Request Submitted!</h2>
            <p className="text-muted-foreground mb-6">
              We've received your request for <strong>{form.hospitalName}</strong>. Our hospital supply team will call you within <strong>2 business hours</strong>.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Redirecting you to WhatsApp for faster confirmation...
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a href="/">
                <Button variant="outline" className="rounded-full">Back to Home</Button>
              </a>
              <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi Quensol, I just submitted a hospital procurement request.")}`}
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
      <section className="pt-28 pb-14 bg-gradient-to-br from-slate-900 via-primary/90 to-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary-foreground/70 text-sm font-semibold tracking-widest uppercase mb-3">
            For Hospitals & Healthcare Facilities
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hospital Procurement Form</h1>
          <p className="text-white/75 max-w-xl mx-auto text-base">
            Submit your glove requirements and our dedicated hospital supply team will prepare a tailored quotation within 2 hours.
          </p>
        </div>

        {/* Trust bar */}
        <div className="container mx-auto px-4 mt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TRUST.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="bg-white/10 rounded-xl p-4 text-center">
                <Icon className="w-6 h-6 text-white/80 mx-auto mb-2" />
                <p className="font-semibold text-sm text-white">{label}</p>
                <p className="text-white/60 text-xs">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="container mx-auto px-4 py-12 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-8" noValidate>

          {/* Section 1 — Institution */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
            <h2 className="font-bold text-lg mb-5 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" /> Institution Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Hospital / Institution Name *</label>
                <input
                  name="hospitalName" value={form.hospitalName} onChange={handleChange}
                  placeholder="e.g. Apollo Hospitals, Hyderabad"
                  data-testid="input-hospital-name"
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors.hospitalName ? "border-red-400" : "border-border"}`}
                />
                {errors.hospitalName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.hospitalName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Institution Type *</label>
                <select
                  name="hospitalType" value={form.hospitalType} onChange={handleChange}
                  data-testid="select-hospital-type"
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors.hospitalType ? "border-red-400" : "border-border"}`}
                >
                  <option value="">Select type…</option>
                  {HOSPITAL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.hospitalType && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.hospitalType}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Department</label>
                <input
                  name="department" value={form.department} onChange={handleChange}
                  placeholder="e.g. Central Stores, OT, ICU"
                  data-testid="input-department"
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">GST Number</label>
                <input
                  name="gstNumber" value={form.gstNumber} onChange={handleChange}
                  placeholder="22AAAAA0000A1Z5"
                  data-testid="input-gst"
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">City *</label>
                <select
                  name="city" value={form.city} onChange={handleChange}
                  data-testid="select-city"
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors.city ? "border-red-400" : "border-border"}`}
                >
                  <option value="">Select city…</option>
                  {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.city && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.city}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Delivery Address</label>
                <textarea
                  name="address" value={form.address} onChange={handleChange}
                  rows={2} placeholder="Full delivery address with PIN code"
                  data-testid="input-address"
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2 — Contact */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
            <h2 className="font-bold text-lg mb-5 flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" /> Contact Person
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <input
                  name="contactName" value={form.contactName} onChange={handleChange}
                  placeholder="Dr. / Mr. / Ms."
                  data-testid="input-contact-name"
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors.contactName ? "border-red-400" : "border-border"}`}
                />
                {errors.contactName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.contactName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Designation *</label>
                <input
                  name="designation" value={form.designation} onChange={handleChange}
                  placeholder="e.g. Purchase Manager, CMO, Admin Head"
                  data-testid="input-designation"
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors.designation ? "border-red-400" : "border-border"}`}
                />
                {errors.designation && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.designation}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email Address *</label>
                <input
                  type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="purchase@hospital.com"
                  data-testid="input-email"
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors.email ? "border-red-400" : "border-border"}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Mobile Number *</label>
                <input
                  type="tel" name="phone" value={form.phone} onChange={handleChange}
                  placeholder="10-digit mobile"
                  data-testid="input-phone"
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors.phone ? "border-red-400" : "border-border"}`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Section 3 — Requirements */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
            <h2 className="font-bold text-lg mb-5 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-primary" /> Glove Requirements
            </h2>

            <div className="mb-5">
              <label className="block text-sm font-medium mb-2">Glove Types Required * (select all that apply)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {GLOVE_TYPES.map(g => (
                  <label
                    key={g}
                    className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-all ${
                      form.gloveTypes.includes(g)
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                    data-testid={`checkbox-glove-${g.toLowerCase().replace(/[\s()/-]+/g, "-")}`}
                  >
                    <input
                      type="checkbox" className="sr-only"
                      checked={form.gloveTypes.includes(g)}
                      onChange={() => toggleArray("gloveTypes", g)}
                    />
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                      form.gloveTypes.includes(g) ? "border-primary bg-primary" : "border-border"
                    }`}>
                      {form.gloveTypes.includes(g) && <svg viewBox="0 0 10 8" className="w-2.5 h-2.5 text-white fill-white"><path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                    <span className="text-sm">{g}</span>
                  </label>
                ))}
              </div>
              {errors.gloveTypes && <p className="text-red-500 text-xs mt-2 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.gloveTypes}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Monthly Quantity (boxes) *</label>
                <input
                  name="monthlyQuantity" value={form.monthlyQuantity} onChange={handleChange}
                  placeholder="e.g. 200 boxes/month"
                  data-testid="input-monthly-quantity"
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors.monthlyQuantity ? "border-red-400" : "border-border"}`}
                />
                {errors.monthlyQuantity && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.monthlyQuantity}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Size Distribution</label>
                <input
                  name="sizeDistribution" value={form.sizeDistribution} onChange={handleChange}
                  placeholder="e.g. S:20% M:50% L:25% XL:5%"
                  data-testid="input-size-distribution"
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Certifications Required</label>
              <div className="flex flex-wrap gap-2">
                {CERTIFICATIONS_NEEDED.map(cert => (
                  <button
                    key={cert} type="button"
                    onClick={() => toggleArray("certificationsNeeded", cert)}
                    data-testid={`btn-cert-${cert.toLowerCase().replace(/[\s/:]+/g, "-")}`}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      form.certificationsNeeded.includes(cert)
                        ? "bg-primary text-white border-primary"
                        : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    {cert}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4 — Additional */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
            <h2 className="font-bold text-lg mb-5 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" /> Additional Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Current Supplier (if any)</label>
                <input
                  name="currentSupplier" value={form.currentSupplier} onChange={handleChange}
                  placeholder="Who do you currently buy from?"
                  data-testid="input-current-supplier"
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Urgency Level</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  {URGENCY.map(u => (
                    <label
                      key={u.value}
                      className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer flex-1 transition-all ${
                        form.urgency === u.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}
                      data-testid={`radio-urgency-${u.value}`}
                    >
                      <input
                        type="radio" name="urgency" value={u.value}
                        checked={form.urgency === u.value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        form.urgency === u.value ? "border-primary" : "border-border"
                      }`}>
                        {form.urgency === u.value && <div className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                      <span className={`text-sm font-medium ${u.color}`}>{u.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Additional Notes / Special Requirements</label>
                <textarea
                  name="additionalNotes" value={form.additionalNotes} onChange={handleChange}
                  rows={3}
                  placeholder="Any specific requirements, existing contract terms, preferred delivery schedule, etc."
                  data-testid="textarea-notes"
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="submit" disabled={submitting}
              className="flex-1 rounded-full py-6 text-base font-semibold shadow-lg shadow-primary/25"
              data-testid="btn-submit-procurement"
            >
              {submitting ? "Submitting…" : "Submit Procurement Request"}
              {!submitting && <ChevronRight className="w-5 h-5 ml-1" />}
            </Button>
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi Quensol, I want to discuss hospital procurement for " + (form.hospitalName || "my hospital") + ".")}`}
              target="_blank" rel="noopener noreferrer"
              className="flex-1"
            >
              <Button
                type="button" variant="outline"
                className="w-full rounded-full py-6 text-base border-green-500 text-green-600 hover:bg-green-50"
                data-testid="btn-whatsapp-procurement"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Instead
              </Button>
            </a>
          </div>

          <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
            <Mail className="w-3 h-3" /> A confirmation will be sent to your email. Our team responds within 2 business hours.
          </p>
        </form>
      </section>

      <Footer />
    </div>
  );
}
