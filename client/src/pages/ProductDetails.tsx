import { useRoute } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Check,
  Shield,
  Truck,
  Star,
  ChevronRight,
  Minus,
  Plus,
  Info,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";
import { SizeGuideModal } from "@/components/products/SizeGuideModal";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct, type ApiProduct } from "@/lib/api";
import { productImages } from "@/lib/data";

export default function ProductDetails() {
  const [, params] = useRoute("/product/:id");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedType, setSelectedType] = useState("Box (100 ct)");
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const { data: product, isLoading } = useQuery<ApiProduct>({
    queryKey: [`/api/products/${params?.id}`],
    queryFn: () => fetchProduct(params!.id),
    enabled: !!params?.id,
  });

  const openQuoteForm = () => {
    if (!product) return;
    window.dispatchEvent(
      new CustomEvent("open-quote-form", {
        detail: { product: product.name },
      })
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <a href="/" className="text-primary hover:underline">← Back to Home</a>
        </div>
      </div>
    );
  }

  const image = productImages[product.id];
  const totalPrice = (product.price * quantity).toLocaleString("en-IN");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
            <a href="/" className="hover:text-primary">Home</a>
            <ChevronRight className="w-4 h-4 shrink-0" />
            <a href="/#products" className="hover:text-primary">Products</a>
            <ChevronRight className="w-4 h-4 shrink-0" />
            <span className="text-foreground font-medium">{product.name}</span>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Product Image */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="aspect-square bg-white rounded-3xl border border-border flex items-center justify-center p-12 shadow-sm relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 to-transparent pointer-events-none" />
                {image && (
                  <img src={image} alt={product.name} className="w-full h-full object-contain drop-shadow-2xl z-10" />
                )}
                {product.badge && (
                  <div className="absolute top-6 left-6 bg-secondary text-secondary-foreground text-sm font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide z-20">
                    {product.badge}
                  </div>
                )}
              </motion.div>

              <div className="grid grid-cols-4 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "aspect-square rounded-xl border bg-white p-2 cursor-pointer transition-all hover:border-primary",
                      i === 0 ? "border-primary ring-2 ring-primary/20" : "border-border"
                    )}
                  >
                    {image && <img src={image} alt="Thumbnail" className="w-full h-full object-contain" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-primary font-bold tracking-wider text-xs uppercase">{product.category} Series</span>
                  <span className="text-muted-foreground">|</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-xs font-bold ml-1">4.9</span>
                    <span className="text-xs text-muted-foreground">(1,204 reviews)</span>
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">{product.name}</h1>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  {product.description} Engineered for superior protection and tactile sensitivity. Meets ASTM D6319 standards for medical examination gloves.
                </p>

                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-3xl font-bold text-foreground">₹{product.price.toLocaleString("en-IN")}</span>
                  <span className="text-muted-foreground">/ box</span>
                  <span className="text-xs text-muted-foreground ml-2">(100 gloves)</span>
                </div>
              </div>

              <div className="space-y-6">
                {/* Size */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="font-bold text-sm">Select Size</label>
                    <button
                      onClick={() => setShowSizeGuide(true)}
                      data-testid="btn-size-guide"
                      className="text-primary text-xs font-medium hover:underline flex items-center gap-1"
                    >
                      <Info className="w-3 h-3" /> Size Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {["XS", "S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "h-11 rounded-lg font-bold text-sm transition-all border-2",
                          selectedSize === size
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/50 text-muted-foreground"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Packaging */}
                <div>
                  <label className="font-bold text-sm block mb-3">Packaging</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Single Box", sub: "100 Gloves / Box", key: "Box (100 ct)" },
                      { label: "Bulk Case", sub: "10 Boxes / Case", key: "Case (1000 ct)", save: "SAVE 15%" },
                    ].map(({ label, sub, key, save }) => (
                      <div
                        key={key}
                        onClick={() => setSelectedType(key)}
                        className={cn(
                          "p-4 rounded-xl border-2 cursor-pointer transition-all relative",
                          selectedType === key
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        {save && (
                          <div className="absolute -top-3 right-3 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {save}
                          </div>
                        )}
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-sm">{label}</span>
                          {selectedType === key && <Check className="w-4 h-4 text-primary" />}
                        </div>
                        <p className="text-xs text-muted-foreground">{sub}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quantity + CTA */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
                  <div className="flex items-center border border-border rounded-full h-12 w-full sm:w-36 px-3 shrink-0">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-primary"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="flex-1 text-center font-bold text-lg">{quantity}</div>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-primary"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <Button
                    className="flex-1 h-12 rounded-full font-bold shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                    onClick={openQuoteForm}
                    data-testid="btn-request-quote"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Request Quote — ₹{totalPrice}
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2 bg-muted/30 rounded-lg p-3">
                    <Shield className="w-4 h-4 text-green-600 shrink-0" />
                    <span>Medical Grade Certified</span>
                  </div>
                  <div className="flex items-center gap-2 bg-muted/30 rounded-lg p-3">
                    <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Pan-India Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specs */}
          <div className="mt-20 border-t border-border pt-16">
            <h2 className="text-2xl font-heading font-bold mb-8">Technical Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Material Standards",
                  rows: [["Material", product.category], ["Sterility", "Non-Sterile"], ["Powder Content", "Powder-Free"], ["Color", "Blue"]],
                },
                {
                  title: "Dimensions (Size M)",
                  rows: [["Length", "min. 240mm"], ["Palm Width", "95 ± 10mm"], ["Fingertip Thickness", "0.10mm"], ["Palm Thickness", "0.07mm"]],
                },
                {
                  title: "Performance",
                  rows: [["Tensile Strength", "18 MPa"], ["Elongation", "500%"], ["AQL", "1.5"], ["Shelf Life", "3 Years"]],
                },
              ].map(({ title, rows }) => (
                <div key={title} className="bg-muted/20 p-6 rounded-xl">
                  <h3 className="font-bold mb-4">{title}</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {rows.map(([label, value], i) => (
                      <li key={i} className={cn("flex justify-between", i < rows.length - 1 ? "border-b border-border/50 pb-2" : "pt-2")}>
                        <span>{label}</span>
                        <span className="font-medium text-foreground">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      {showSizeGuide && <SizeGuideModal onClose={() => setShowSizeGuide(false)} />}
    </div>
  );
}
