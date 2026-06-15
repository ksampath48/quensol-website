import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { SlidersHorizontal, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, type ApiProduct } from "@/lib/api";
import { productImages } from "@/lib/data";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Nitrile", "Latex", "Vinyl", "Safety", "Surgical"];
const SORT_OPTIONS = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name A–Z", value: "name-asc" },
];

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("price-asc");
  const [search, setSearch] = useState("");

  const { data: products = [], isLoading } = useQuery<ApiProduct[]>({
    queryKey: ["/api/products"],
    queryFn: fetchProducts,
  });

  const filtered = useMemo(() => {
    let list = products;
    if (activeCategory !== "All") list = list.filter((p) => p.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return a.name.localeCompare(b.name);
    });
    return list.map((p) => ({ ...p, image: productImages[p.id] }));
  }, [products, activeCategory, sort, search]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Header */}
        <div className="bg-slate-50 border-b border-border py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Full Range</p>
                <h1 className="text-4xl font-heading font-bold text-foreground">Product Catalog</h1>
                <p className="text-muted-foreground mt-2">
                  {filtered.length} products available — Bulk discounts on orders above 100 boxes
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search products…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 pr-4 h-10 rounded-full border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-56"
                    data-testid="input-catalog-search"
                  />
                </div>
                <div className="flex items-center gap-2 bg-white border border-border rounded-full px-3 h-10">
                  <SlidersHorizontal className="w-4 h-4 text-muted-foreground shrink-0" />
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="text-sm bg-transparent focus:outline-none pr-1"
                    data-testid="select-catalog-sort"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 mt-6">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  data-testid={`btn-category-${cat.toLowerCase()}`}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium transition-all border",
                    activeCategory === cat
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-white text-muted-foreground border-border hover:border-primary hover:text-primary"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="container mx-auto px-4 mt-12">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-muted/30 rounded-2xl animate-pulse h-80" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-2xl font-bold mb-2">No products found</p>
              <p className="text-muted-foreground">Try a different category or search term.</p>
              <button onClick={() => { setActiveCategory("All"); setSearch(""); }} className="mt-4 text-primary underline">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* Bulk CTA */}
        <div className="container mx-auto px-4 mt-16">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Need a custom order?</h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              We handle bulk hospital procurement, monthly standing orders, and custom packaging. Call us or send a quote request.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:+917386101845" className="inline-flex items-center justify-center h-11 px-6 bg-primary text-white rounded-full font-semibold text-sm hover:bg-primary/90 transition-colors">
                📞 Call +91 7386101845
              </a>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("open-quote-form", { detail: {} }))}
                className="inline-flex items-center justify-center h-11 px-6 border border-primary text-primary rounded-full font-semibold text-sm hover:bg-primary hover:text-white transition-colors"
                data-testid="btn-bulk-quote"
              >
                Request Bulk Quote
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
