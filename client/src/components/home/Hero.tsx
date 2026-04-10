import heroBg from "@assets/generated_images/medical_hero_background.png";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Medical Laboratory"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-sm font-medium mb-6 border border-secondary">
              <ShieldCheck className="w-4 h-4" />
              <span>FDA Approved & Medical Grade Certified</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-foreground mb-6 leading-[1.1]">
              Premium Protection <br />
              <span className="text-gradient">For Professionals</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Sourcing the highest quality medical gloves directly to clinics, hospitals, and laboratories. Nitrile, Latex, and Vinyl options available with bulk pricing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#products">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base rounded-full shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1">
                  Shop All Products
                </Button>
              </a>
              <a href="#contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base rounded-full bg-white/50 backdrop-blur-sm border-primary/20 hover:bg-white">
                  Request Bulk Quote <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </div>

            <div className="mt-12 flex items-center gap-8 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Trust badges placeholders */}
              <div className="text-xs font-bold text-muted-foreground border border-border px-3 py-2 rounded-md">ISO 9001</div>
              <div className="text-xs font-bold text-muted-foreground border border-border px-3 py-2 rounded-md">FDA 510(k)</div>
              <div className="text-xs font-bold text-muted-foreground border border-border px-3 py-2 rounded-md">ASTM D6319</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
