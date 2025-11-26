import { Product } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group bg-white rounded-2xl border border-border p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className="relative aspect-square rounded-xl overflow-hidden bg-muted/30 mb-4 p-6 flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
        />
        {product.badge && (
          <div className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide">
            {product.badge}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
        ))}
        <span className="text-xs text-muted-foreground ml-1">(120)</span>
      </div>

      <h3 className="font-heading font-bold text-lg text-foreground mb-1">{product.name}</h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>

      <div className="mt-auto flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Starting at</span>
          <span className="font-bold text-xl text-primary">${product.price}</span>
        </div>
        <Button size="icon" className="rounded-full w-10 h-10 shadow-lg shadow-primary/10 hover:shadow-primary/30">
          <ShoppingCart className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}
