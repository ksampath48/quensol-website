import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    name: "Dr. Ramesh Naidu",
    title: "Purchase Head, Apollo Hospitals",
    location: "Hyderabad",
    category: "Healthcare",
    text: "We switched our entire nitrile supply to Quensol 18 months ago. The consistency in quality and on-time delivery has been exceptional. Our procurement costs dropped by 19% on comparable spec gloves.",
    rating: 5,
    stat: "19% cost reduction",
  },
  {
    name: "Priya Venkataraman",
    title: "Lab Manager, Dr. Reddy's Laboratories",
    location: "Hyderabad",
    category: "Pharma",
    text: "In a clean-room environment, we can't afford glove failures. Quensol's powder-free nitrile gloves have never once failed our incoming inspection. Their team even helped us set up a standing order system.",
    rating: 5,
    stat: "Zero failed inspections",
  },
  {
    name: "Suresh Iyer",
    title: "Operations Director, FreshBite Foods",
    location: "Pune",
    category: "Food Processing",
    text: "We needed a reliable supplier for food-safe vinyl gloves at scale. Quensol delivers 500 boxes a month on a fixed schedule. The pricing is transparent and there are no surprises on the invoice.",
    rating: 5,
    stat: "500 boxes/month",
  },
  {
    name: "Col. (Retd.) A.K. Sharma",
    title: "Admin Officer, Army Hospital",
    location: "Delhi",
    category: "Healthcare",
    text: "Government procurement is tough — we need ISI-compliant products with full documentation. Quensol provided all the certifications upfront and has been a registered vendor with us for two years now.",
    rating: 5,
    stat: "2 years running",
  },
  {
    name: "Kavitha Rajan",
    title: "CEO, MediCare Distributors",
    location: "Chennai",
    category: "Distribution",
    text: "As a distributor, we resell to 40+ clinics. Quensol's wholesale pricing and reliable lead times let us promise delivery to our customers. Their support team is always reachable on WhatsApp.",
    rating: 5,
    stat: "40+ clinics served",
  },
];

const CATEGORIES = ["All", "Healthcare", "Pharma", "Food Processing", "Distribution"];
const INITIALS = (name: string) => name.split(" ").map(n => n[0]).join("").slice(0, 2);
const COLORS = ["bg-primary", "bg-purple-500", "bg-green-600", "bg-orange-500", "bg-rose-500"];

export function Testimonials() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? TESTIMONIALS : TESTIMONIALS.filter(t => t.category === active);

  return (
    <section className="py-20 bg-slate-50" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Real Results</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Trusted by 500+ Organisations</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From government hospitals to Fortune 500 pharma labs — here's what our partners say.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium border transition-all",
                active === cat ? "bg-primary text-white border-primary" : "bg-white border-border text-muted-foreground hover:border-primary hover:text-primary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow flex flex-col"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-3" />
              <p className="text-sm text-foreground leading-relaxed flex-1 mb-5">"{t.text}"</p>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className={cn("w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0", COLORS[i % COLORS.length])}>
                    {INITIALS(t.name)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.title}</p>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">{t.stat}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
