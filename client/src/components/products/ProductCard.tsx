import { Product } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Star, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [, navigate] = useLocation();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-white rounded-2xl border border-border p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative"
    >
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        className="relative aspect-square rounded-xl overflow-hidden bg-muted/30 mb-4 p-6 flex items-center justify-center cursor-pointer"
      >
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
          />
        )}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide">
            {product.badge}
          </div>
        )}

        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-foreground shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
            <Eye className="w-4 h-4" /> View Options
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
        ))}
        <span className="text-xs text-muted-foreground ml-1">(120)</span>
      </div>

      <h3
        onClick={() => navigate(`/product/${product.id}`)}
        className="font-heading font-bold text-lg text-foreground mb-1 cursor-pointer hover:text-primary transition-colors"
      >
        {product.name}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>

      <div className="mt-auto flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Starting at</span>
          <span className="font-bold text-xl text-primary">₹{product.price.toLocaleString("en-IN")}</span>
        </div>
        <Button
          size="sm"
          className="rounded-full px-4 shadow-lg shadow-primary/10 hover:shadow-primary/30"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          Request Quote
        </Button>
      </div>
    </motion.div>
  );
}
