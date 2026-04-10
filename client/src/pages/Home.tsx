import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

export default function Home() {
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
                <div>
                  <h4 className="font-heading font-bold text-3xl text-primary mb-2">10M+</h4>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Gloves Delivered</p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-3xl text-primary mb-2">500+</h4>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Hospital Partners</p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-3xl text-primary mb-2">ISO</h4>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Certified Quality</p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-3xl text-primary mb-2">24/7</h4>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Dedicated Support</p>
                </div>
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
                { title: "Industrial Safety", desc: "Heavy-duty protection against chemicals, abrasions, and mechanical risks." }
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
        
        <section id="products" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-foreground">Featured Catalogue</h2>
                <p className="text-muted-foreground max-w-lg">Explore our highest rated medical protection products, trusted by professionals across the globe.</p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" className="rounded-full">
                  <Filter className="w-4 h-4 mr-2" /> Filter
                </Button>
                <div className="flex bg-white rounded-full p-1 border border-border shadow-xs">
                  <button className="px-4 py-1.5 bg-primary text-white text-sm font-medium rounded-full shadow-sm">All</button>
                  <button className="px-4 py-1.5 text-muted-foreground text-sm font-medium hover:text-primary transition-colors">Nitrile</button>
                  <button className="px-4 py-1.5 text-muted-foreground text-sm font-medium hover:text-primary transition-colors">Latex</button>
                  <button className="px-4 py-1.5 text-muted-foreground text-sm font-medium hover:text-primary transition-colors">Safety</button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <Button size="lg" variant="outline" className="px-8 rounded-full h-12 border-primary text-primary hover:bg-primary hover:text-white">
                View Full Catalog
              </Button>
            </div>
          </div>
        </section>
        
        {/* Contact/CTA Section */}
        <section id="contact" className="py-24 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Equip Your Entire Facility</h2>
                <p className="text-primary-foreground/80 text-lg mb-8">
                  Get specialized pricing, automated reordering, and dedicated account management for hospitals and clinics.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                  <Button size="lg" variant="secondary" className="rounded-full px-10 h-14 text-lg font-bold shadow-2xl shadow-black/20" onClick={() => document.querySelector('button[aria-label="Request Quote"]')?.click()}>
                    Request a Quote
                  </Button>
                  <span className="text-primary-foreground/60">or call +91 7386101845</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
