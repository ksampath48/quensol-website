import { Shield, Zap, Truck, Leaf } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

const features = [
  {
    icon: Shield,
    title: "Medical Grade Certified",
    description: "All products meet ASTM and FDA standards for medical examination and surgical use."
  },
  {
    icon: Zap,
    title: "Rapid Fulfillment",
    description: "Same-day shipping on orders placed before 2 PM EST. We keep your supply chain moving."
  },
  {
    icon: Truck,
    title: "Bulk Volume Pricing",
    description: "Direct-to-facility pricing tiers available for hospitals, clinics, and large practices."
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Options",
    description: "Ask about our new line of biodegradable nitrile gloves for sustainable practices."
  }
];

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={index * 0.09} direction="up">
              <div className="flex flex-col items-start p-6 rounded-2xl bg-muted/30 hover:bg-muted/60 transition-colors h-full">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
