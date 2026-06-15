import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

const PAGES = {
  privacy: {
    title: "Privacy Policy",
    updated: "June 1, 2025",
    content: [
      {
        heading: "1. Information We Collect",
        body: `When you submit a quote request or contact us, we collect the following information: your name, company name, email address, phone number, and the product you are enquiring about. We do not collect payment information, as all orders are handled offline or via invoice.`,
      },
      {
        heading: "2. How We Use Your Information",
        body: `Your information is used solely to respond to your enquiry and provide you with a quotation. We may also use your contact details to follow up regarding your order status or to inform you of relevant products that match your interest. We do not sell, rent, or trade your personal information to third parties.`,
      },
      {
        heading: "3. Data Storage & Security",
        body: `All enquiry data is stored securely on our servers hosted in India. We implement reasonable technical and organizational measures to protect your data from unauthorized access, disclosure, or loss.`,
      },
      {
        heading: "4. Cookies",
        body: `Our website uses minimal cookies only for essential functionality such as session management. We do not use third-party tracking cookies or advertising networks.`,
      },
      {
        heading: "5. Your Rights",
        body: `You have the right to request access to the personal data we hold about you, to request its correction or deletion, or to withdraw your consent for us to contact you at any time. To exercise these rights, contact us at support@quensol.com.`,
      },
      {
        heading: "6. Contact",
        body: `For privacy-related concerns, write to: support@quensol.com or call +91 7386101845.`,
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    updated: "June 1, 2025",
    content: [
      {
        heading: "1. Acceptance of Terms",
        body: `By accessing or using the Quensol website and submitting a quote request, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website.`,
      },
      {
        heading: "2. Products & Pricing",
        body: `All prices listed on the website are indicative and in Indian Rupees (INR). Final pricing is confirmed via a formal quotation. Prices may vary based on order volume, product specifications, and current stock levels.`,
      },
      {
        heading: "3. Orders & Payment",
        body: `All orders are subject to confirmation by Quensol. Orders are binding only upon written acceptance or issuance of a Purchase Order acknowledgment. Payment terms are specified in the invoice issued for each order.`,
      },
      {
        heading: "4. Shipping & Delivery",
        body: `We ship across India via registered courier services. Estimated delivery times are provided at the time of order confirmation and are subject to logistics partner availability and destination.`,
      },
      {
        heading: "5. Returns & Cancellations",
        body: `Due to the medical nature of our products, returns are accepted only for items that are defective, damaged in transit, or incorrectly supplied. Cancellations must be communicated within 24 hours of order placement.`,
      },
      {
        heading: "6. Intellectual Property",
        body: `All content on this website, including text, images, and brand assets, is the property of Quensol and may not be reproduced without prior written consent.`,
      },
      {
        heading: "7. Limitation of Liability",
        body: `Quensol's liability is limited to the value of the products purchased. We are not responsible for indirect or consequential losses arising from use of our products.`,
      },
    ],
  },
  shipping: {
    title: "Shipping Policy",
    updated: "June 1, 2025",
    content: [
      {
        heading: "Pan-India Delivery",
        body: `We ship to all states and union territories across India. Orders are dispatched within 2–3 business days of order confirmation and payment receipt.`,
      },
      {
        heading: "Estimated Delivery Times",
        body: `Metro cities (Mumbai, Delhi, Bengaluru, Hyderabad, Chennai, Kolkata): 2–4 business days.\nTier 2 & 3 cities: 4–7 business days.\nRemote areas: 7–12 business days.\nThese are estimates and may vary depending on the logistics partner.`,
      },
      {
        heading: "Shipping Charges",
        body: `Shipping is free for orders above ₹10,000. For orders below this threshold, a flat shipping charge of ₹150 applies. Exact charges are confirmed in the formal quotation.`,
      },
      {
        heading: "Tracking",
        body: `Once your order is dispatched, a tracking number and courier name will be shared via email and/or WhatsApp message.`,
      },
      {
        heading: "Damaged Shipments",
        body: `If your order arrives damaged, please photograph the package immediately and contact us within 48 hours at support@quensol.com or call +91 7386101845. We will arrange a replacement or credit.`,
      },
    ],
  },
  returns: {
    title: "Returns & Refunds",
    updated: "June 1, 2025",
    content: [
      {
        heading: "Return Eligibility",
        body: `Returns are accepted only in the following situations:\n• Products are defective or damaged on arrival.\n• Products supplied are incorrect (wrong SKU or specification).\n• Products are clearly different from what was confirmed in the purchase order.\nReturns are NOT accepted for products that have been opened, used, or returned for change-of-mind after delivery.`,
      },
      {
        heading: "How to Initiate a Return",
        body: `Contact our support team at support@quensol.com or call +91 7386101845 within 5 business days of receiving the goods. Share your order number, description of the issue, and photographs of the product and packaging.`,
      },
      {
        heading: "Refund Process",
        body: `Once the returned product is inspected and the return is approved, we will issue a credit note or arrange a replacement shipment within 7 business days. Refunds, if applicable, are processed via NEFT/IMPS to the bank account on record.`,
      },
      {
        heading: "Non-Returnable Items",
        body: `Sterile surgical gloves, custom-packaged products, and any items sold at clearance prices are non-returnable unless they are defective.`,
      },
    ],
  },
};

type PageKey = keyof typeof PAGES;

export default function Legal({ page }: { page?: PageKey }) {
  const [location] = useLocation();
  const key = (page || (location.replace("/", "") as PageKey)) || "privacy";
  const data = PAGES[key] || PAGES.privacy;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Tab Nav */}
        <div className="bg-slate-50 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex gap-0 overflow-x-auto">
              {(Object.keys(PAGES) as PageKey[]).map((k) => (
                <a
                  key={k}
                  href={`/${k}`}
                  className={cn(
                    "px-5 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors",
                    key === k
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {PAGES[k].title}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">{data.title}</h1>
          <p className="text-muted-foreground text-sm mb-10">Last updated: {data.updated}</p>

          <div className="space-y-8">
            {data.content.map((section, i) => (
              <div key={i}>
                <h2 className="text-lg font-bold mb-3">{section.heading}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 p-6 bg-primary/5 border border-primary/20 rounded-xl">
            <p className="font-bold mb-1">Have questions?</p>
            <p className="text-sm text-muted-foreground">
              Contact us at{" "}
              <a href="mailto:support@quensol.com" className="text-primary hover:underline">support@quensol.com</a>
              {" "}or{" "}
              <a href="tel:+917386101845" className="text-primary hover:underline">+91 7386101845</a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
