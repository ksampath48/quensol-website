import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, type ApiProduct } from "@/lib/api";
import { productImages } from "@/lib/data";
import { useState } from "react";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: products = [], isLoading } = useQuery<ApiProduct[]>({
    queryKey: ["/api/products"],
    queryFn: fetchProducts,
  });

  const categories = ["All", "Nitrile", "Latex", "Vinyl", "Safety", "Surgical"];

  const filtered = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const enriched = filtered.map((p) => ({ ...p, image: productImages[p.id] }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <Hero />

        <Features />

        {/* About Us Section */}
        <section id="about" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-foreground">About Quensol</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                At Quensol, we are dedicated to providing the highest quality protective equipment to healthcare professionals, industrial workers, and laboratories across India. With our state-of-the-art manufacturing partners and rigorous quality control processes, we ensure that every pair of gloves meets international safety standards.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                Our mission is to protect those who protect others. We believe in building long-term partnerships with our clients by offering reliable supply chains, transparent pricing, and unparalleled customer support.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-border">
                {[
                  { value: "10M+", label: "Gloves Delivered" },
                  { value: "500+", label: "Hospital Partners" },
                  { value: "ISO", label: "Certified Quality" },
                  { value: "24/7", label: "Dedicated Support" },
                ].map((stat, i) => (
                  <div key={i}>
                    <h4 className="font-heading font-bold text-3xl text-primary mb-2">{stat.value}</h4>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section id="industries" className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-foreground">Industries We Serve</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Specialized hand protection solutions tailored for the specific demands of diverse professional environments.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Healthcare & Hospitals", desc: "Surgical and examination gloves meeting strict medical grade standards." },
                { title: "Pharmaceuticals", desc: "Sterile, powder-free environments requiring absolute contamination control." },
                { title: "Food Processing", desc: "Food-safe, highly durable vinyl and nitrile options for high-volume use." },
                { title: "Industrial Safety", desc: "Heavy-duty protection against chemicals, abrasions, and mechanical risks." },
              ].map((industry, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center font-bold text-xl mb-4">
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{industry.title}</h3>
                  <p className="text-sm text-muted-foreground">{industry.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-foreground">Featured Catalogue</h2>
                <p className="text-muted-foreground max-w-lg">Explore our highest rated medical protection products, trusted by professionals across the globe.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex flex-wrap bg-white rounded-full p-1 border border-border shadow-xs gap-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${activeCategory === cat ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-primary"}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-muted/30 rounded-2xl animate-pulse h-80" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {enriched.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            <div className="mt-16 text-center">
              <Button size="lg" variant="outline" className="px-8 rounded-full h-12 border-primary text-primary hover:bg-primary hover:text-white">
                View Full Catalog
              </Button>
            </div>
          </div>
        </section>

        {/* Contact / CTA Section */}
        <section id="contact" className="py-24 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Equip Your Entire Facility</h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Get specialized pricing, automated reordering, and dedicated account management for hospitals and clinics.
            </p>
            <p className="text-primary-foreground/90 font-bold text-xl mb-2">📞 +91 7386101845</p>
            <p className="text-primary-foreground/70 mb-8">support@quensol.com</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
