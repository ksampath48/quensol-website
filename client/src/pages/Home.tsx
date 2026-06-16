import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { ClientLogoWall } from "@/components/home/ClientLogoWall";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, type ApiProduct } from "@/lib/api";
import { productImages } from "@/lib/data";
import { useState } from "react";
import { ArrowRight, Award, Building2, FlaskConical, HardHat, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const INDUSTRIES = [
  { icon: Stethoscope, title: "Healthcare & Hospitals", desc: "Surgical and examination gloves meeting strict medical-grade standards for ORs, ICUs, and patient wards.", color: "bg-blue-50 text-blue-600" },
  { icon: FlaskConical, title: "Pharmaceuticals", desc: "Sterile, powder-free environments requiring absolute contamination control in clean rooms and labs.", color: "bg-purple-50 text-purple-600" },
  { icon: Building2, title: "Food Processing", desc: "Food-safe, highly durable vinyl and nitrile options for high-volume use in packaging and processing lines.", color: "bg-green-50 text-green-600" },
  { icon: HardHat, title: "Industrial Safety", desc: "Heavy-duty protection against chemicals, abrasions, and mechanical risks for EMS and field workers.", color: "bg-orange-50 text-orange-600" },
];

const STATS = [
  { value: "10M+", label: "Gloves Delivered", sub: "Since inception" },
  { value: "500+", label: "Hospital Partners", sub: "Across India" },
  { value: "ISO", label: "Certified Quality", sub: "9001:2015 Standard" },
  { value: "24/7", label: "Dedicated Support", sub: "+91 7386101845" },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { t } = useI18n();

  const { data: products = [], isLoading } = useQuery<ApiProduct[]>({
    queryKey: ["/api/products"],
    queryFn: fetchProducts,
  });

  const categories = ["All", "Nitrile", "Latex", "Vinyl", "Safety", "Surgical"];
  const filtered = activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory);
  const enriched = filtered.map((p) => ({ ...p, image: productImages[p.id] }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <ClientLogoWall />

        {/* About */}
        <section id="about" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeIn direction="left">
                <div>
                  <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">{t("section.about.label")}</p>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">{t("section.about.heading")}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-5">{t("section.about.body1")}</p>
                  <p className="text-muted-foreground leading-relaxed mb-8">{t("section.about.body2")}</p>
                  <div className="flex flex-wrap gap-3">
                    {["ISO 9001:2015", "CE Marked", "FDA Listed", "ASTM D6319"].map((cert) => (
                      <span key={cert} className="flex items-center gap-1.5 text-xs font-semibold border border-border px-3 py-1.5 rounded-full text-muted-foreground">
                        <Award className="w-3 h-3 text-primary" /> {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
              <div className="grid grid-cols-2 gap-5">
                {STATS.map((stat, i) => (
                  <FadeIn key={i} delay={i * 0.1} direction="up">
                    <div className="bg-slate-50 rounded-2xl p-6 border border-border h-full">
                      <h4 className="font-heading font-black text-3xl text-primary mb-1">{stat.value}</h4>
                      <p className="font-semibold text-sm text-foreground">{stat.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{stat.sub}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Industries */}
        <section id="industries" className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <FadeIn direction="up">
              <div className="text-center mb-14">
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">{t("section.industries.label")}</p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">{t("section.industries.heading")}</h2>
                <p className="text-muted-foreground max-w-xl mx-auto">{t("section.industries.sub")}</p>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {INDUSTRIES.map((industry, i) => (
                <FadeIn key={i} delay={i * 0.09} direction="up">
                  <div className="bg-white p-7 rounded-2xl shadow-sm border border-border hover:shadow-md transition-all hover:-translate-y-1 group h-full">
                    <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center mb-4", industry.color)}>
                      <industry.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base mb-2">{industry.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{industry.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section id="products" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <FadeIn direction="up">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">{t("section.products.label")}</p>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">{t("section.products.heading")}</h2>
                  <p className="text-muted-foreground max-w-lg">{t("section.products.sub")}</p>
                </div>
                <div className="flex flex-wrap bg-white rounded-full p-1 border border-border shadow-xs gap-1 self-start">
                  {categories.map((cat) => (
                    <button key={cat} onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${activeCategory === cat ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-primary"}`}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </FadeIn>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => <div key={i} className="bg-muted/30 rounded-2xl animate-pulse h-80" />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {enriched.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}

            <FadeIn delay={0.2} direction="up">
              <div className="mt-14 text-center">
                <a href="/catalog">
                  <Button size="lg" className="px-8 rounded-full h-12 shadow-lg shadow-primary/20 gap-2">
                    {t("cta.viewCatalog")} <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />

        {/* FAQ */}
        <FAQ />

        {/* Contact CTA */}
        <section id="contact" className="py-24 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <FadeIn direction="up">
                <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">{t("section.contact.heading")}</h2>
                <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
                  {t("section.contact.sub")}
                </p>
              </FadeIn>
              <FadeIn delay={0.15} direction="up">
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                  <a href="tel:+917386101845"
                    className="inline-flex items-center justify-center h-12 px-8 bg-white text-primary font-bold rounded-full hover:bg-white/90 transition-colors shadow-lg">
                    📞 {t("misc.callUs")} +91 7386101845
                  </a>
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent("open-quote-form", { detail: {} }))}
                    className="inline-flex items-center justify-center h-12 px-8 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors gap-2">
                    {t("cta.requestQuote")} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/70">
                  <div className="flex items-center gap-2">
                    <a href="/samples" className="underline underline-offset-2 hover:text-white">{t("cta.freeSamples")}</a>
                  </div>
                  <div>📧 support@quensol.com</div>
                  <div>📍 Hyderabad, India</div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
