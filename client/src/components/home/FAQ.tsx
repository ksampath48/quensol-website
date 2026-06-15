import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "What is the minimum order quantity (MOQ)?",
    a: "Our minimum order is 10 boxes (1,000 gloves) for standard items. For custom packaging or specific lot requirements, the MOQ is 50 boxes. There is no MOQ for sample requests — we provide up to 2 boxes of any product for evaluation.",
  },
  {
    q: "Do you provide ISI / FDA certifications with each order?",
    a: "Yes. Every order ships with a Certificate of Conformance and available third-party test reports. We can also provide ISI mark certificates, FDA 510(k) documentation, CE declarations, and ASTM D6319 compliance reports on request.",
  },
  {
    q: "What are your standard payment terms?",
    a: "For new customers, we offer 100% advance payment with a 2% discount. For repeat customers with a purchase history, we extend Net-30 credit terms after a brief credit assessment. We accept NEFT, RTGS, IMPS, and account-payee cheques.",
  },
  {
    q: "How long does delivery take?",
    a: "Metro cities (Hyderabad, Mumbai, Delhi, Bangalore, Chennai): 2–4 business days. Tier 2 cities: 4–7 business days. Remote areas: 7–12 business days. Urgent orders can be processed with same-day dispatch for orders placed before 12 PM IST.",
  },
  {
    q: "Can we request product samples before placing a bulk order?",
    a: "Absolutely. We offer a free sample request program — up to 2 boxes of any glove type for hospitals, clinics, and labs. Just fill out our sample request form and samples are dispatched within 48 hours. Courier charges apply for locations outside Hyderabad.",
  },
  {
    q: "Do you support standing orders / auto-replenishment?",
    a: "Yes. We offer a Monthly Standing Order (MSO) program where we automatically dispatch your standard order on a set date each month. You get a 5% loyalty discount on MSO orders and priority stock allocation during shortages.",
  },
  {
    q: "Are your gloves latex-free?",
    a: "Our Nitrile, Vinyl, and Safety gloves are 100% latex-free and safe for users with latex allergies. Our Latex and Surgical Latex gloves contain natural rubber latex and carry appropriate allergy warnings on all packaging.",
  },
  {
    q: "Do you raise GST-compliant invoices?",
    a: "Yes. All invoices include our GSTIN, HSN code (for medical gloves: 4015), applicable GST rate (12% for medical grade / 18% for industrial grade), and are compliant with Indian GST e-invoicing norms for B2B transactions above ₹5 lakhs.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white" id="faq">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
          <div className="lg:col-span-1">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Got Questions?</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-5">Frequently Asked Questions</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Everything you need to know about ordering, certifications, and delivery. Can't find your answer?
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+917386101845"
                className="inline-flex items-center justify-center h-11 px-5 bg-primary text-white rounded-full font-semibold text-sm hover:bg-primary/90 transition-colors gap-2"
              >
                📞 Call Us
              </a>
              <button
                onClick={() => window.open("https://wa.me/917386101845?text=Hi%2C%20I%20have%20a%20question%20about%20your%20products.", "_blank")}
                className="inline-flex items-center justify-center h-11 px-5 bg-[#25D366] text-white rounded-full font-semibold text-sm hover:bg-[#20b858] transition-colors gap-2"
              >
                💬 WhatsApp Us
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 hover:bg-slate-50 transition-colors"
                  data-testid={`btn-faq-${i}`}
                >
                  <span className="font-semibold text-sm text-foreground">{faq.q}</span>
                  <ChevronDown className={cn("w-4 h-4 text-muted-foreground shrink-0 transition-transform", open === i && "rotate-180")} />
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border bg-slate-50/50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
