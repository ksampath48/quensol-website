import { useRoute } from "wouter";
import { products } from "@/lib/data";
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
  Info 
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function ProductDetails() {
  const [match, params] = useRoute("/product/:id");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedType, setSelectedType] = useState("Box (100 ct)");

  const product = products.find(p => p.id === params?.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-primary">Home</a>
            <ChevronRight className="w-4 h-4" />
            <a href="/#products" className="hover:text-primary">Products</a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">{product.name}</span>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Product Image Gallery */}
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="aspect-square bg-white rounded-3xl border border-border flex items-center justify-center p-12 shadow-sm relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 to-transparent pointer-events-none" />
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain drop-shadow-2xl z-10"
                />
                {product.badge && (
                  <div className="absolute top-6 left-6 bg-secondary text-secondary-foreground text-sm font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide z-20">
                    {product.badge}
                  </div>
                )}
              </motion.div>
              
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={cn(
                    "aspect-square rounded-xl border bg-white p-2 cursor-pointer transition-all hover:border-primary",
                    i === 0 ? "border-primary ring-2 ring-primary/20" : "border-border"
                  )}>
                    <img 
                      src={product.image} 
                      alt="Thumbnail" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info & Options */}
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-primary font-bold tracking-wider text-xs uppercase">{product.category} Series</span>
                  <span className="text-border">|</span>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs font-bold text-foreground">4.9</span>
                    <span className="text-xs text-muted-foreground">(1,204 Reviews)</span>
                  </div>
                </div>
                
                <h1 className="text-4xl font-heading font-bold text-foreground mb-4">{product.name}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {product.description} Engineered for superior protection and tactile sensitivity. Meets ASTM D6319 standards for medical examination gloves.
                </p>
                
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-3xl font-bold text-foreground">₹{product.price.toLocaleString("en-IN")}</span>
                  <span className="text-muted-foreground">/ box</span>
                </div>
              </div>

              <div className="space-y-8">
                {/* Size Selection */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="font-bold text-sm">Select Size</label>
                    <button className="text-primary text-xs font-medium hover:underline flex items-center gap-1">
                      <Info className="w-3 h-3" /> Size Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-3">
                    {["XS", "S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "h-12 rounded-lg font-bold text-sm transition-all border-2",
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

                {/* Quantity Type */}
                <div>
                  <label className="font-bold text-sm block mb-3">Packaging</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div 
                      onClick={() => setSelectedType("Box (100 ct)")}
                      className={cn(
                        "p-4 rounded-xl border-2 cursor-pointer transition-all relative",
                        selectedType === "Box (100 ct)" 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold">Single Box</span>
                        {selectedType === "Box (100 ct)" && <Check className="w-4 h-4 text-primary" />}
                      </div>
                      <p className="text-xs text-muted-foreground">100 Gloves / Box</p>
                    </div>

                    <div 
                      onClick={() => setSelectedType("Case (1000 ct)")}
                      className={cn(
                        "p-4 rounded-xl border-2 cursor-pointer transition-all relative",
                        selectedType === "Case (1000 ct)" 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="absolute -top-3 right-4 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        SAVE 15%
                      </div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold">Bulk Case</span>
                        {selectedType === "Case (1000 ct)" && <Check className="w-4 h-4 text-primary" />}
                      </div>
                      <p className="text-xs text-muted-foreground">10 Boxes / Case</p>
                    </div>
                  </div>
                </div>

                {/* Add to Cart */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
                  <div className="flex items-center border border-border rounded-full h-14 w-full sm:w-40 px-4">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-primary"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="flex-1 text-center font-bold text-lg">{quantity}</div>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-primary"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <Button className="flex-1 h-14 rounded-full text-lg font-bold shadow-xl shadow-primary/20">
                    Request Quote - ₹{(product.price * quantity).toLocaleString("en-IN")}
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>Medical Grade Certified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <span>Free Shipping on Cases</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specs Section */}
          <div className="mt-24 border-t border-border pt-16">
            <h2 className="text-2xl font-heading font-bold mb-8">Technical Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-muted/20 p-6 rounded-xl">
                <h3 className="font-bold mb-4">Material Standards</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex justify-between border-b border-border/50 pb-2">
                    <span>Material</span>
                    <span className="font-medium text-foreground">{product.category}</span>
                  </li>
                  <li className="flex justify-between border-b border-border/50 pb-2">
                    <span>Sterility</span>
                    <span className="font-medium text-foreground">Non-Sterile</span>
                  </li>
                  <li className="flex justify-between border-b border-border/50 pb-2">
                    <span>Powder Content</span>
                    <span className="font-medium text-foreground">Powder-Free</span>
                  </li>
                  <li className="flex justify-between pt-2">
                    <span>Color</span>
                    <span className="font-medium text-foreground">Blue</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-muted/20 p-6 rounded-xl">
                <h3 className="font-bold mb-4">Dimensions (Size M)</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex justify-between border-b border-border/50 pb-2">
                    <span>Length</span>
                    <span className="font-medium text-foreground">min. 240mm</span>
                  </li>
                  <li className="flex justify-between border-b border-border/50 pb-2">
                    <span>Palm Width</span>
                    <span className="font-medium text-foreground">95 ± 10mm</span>
                  </li>
                  <li className="flex justify-between border-b border-border/50 pb-2">
                    <span>Fingertip Thickness</span>
                    <span className="font-medium text-foreground">0.10mm</span>
                  </li>
                  <li className="flex justify-between pt-2">
                    <span>Palm Thickness</span>
                    <span className="font-medium text-foreground">0.07mm</span>
                  </li>
                </ul>
              </div>

              <div className="bg-muted/20 p-6 rounded-xl">
                <h3 className="font-bold mb-4">Performance</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex justify-between border-b border-border/50 pb-2">
                    <span>Tensile Strength</span>
                    <span className="font-medium text-foreground">18 MPa</span>
                  </li>
                  <li className="flex justify-between border-b border-border/50 pb-2">
                    <span>Elongation</span>
                    <span className="font-medium text-foreground">500%</span>
                  </li>
                  <li className="flex justify-between border-b border-border/50 pb-2">
                    <span>AQL</span>
                    <span className="font-medium text-foreground">1.5</span>
                  </li>
                  <li className="flex justify-between pt-2">
                    <span>Shelf Life</span>
                    <span className="font-medium text-foreground">3 Years</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
