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
        
        <section id="products" className="py-20 bg-slate-50/50">
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
                  <button className="px-4 py-1.5 text-muted-foreground text-sm font-medium hover:text-primary transition-colors">Surgical</button>
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
        
        {/* CTA Section */}
        <section className="py-24 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Equip Your Entire Facility</h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Get specialized pricing, automated reordering, and dedicated account management for hospitals and clinics.
            </p>
            <Button size="lg" variant="secondary" className="rounded-full px-10 h-14 text-lg font-bold shadow-2xl shadow-black/20">
              Contact Sales Team
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
