import { Shield, Zap, Truck, Leaf } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { useI18n, type TranslationKey } from "@/lib/i18n";

const FEATURE_KEYS: { icon: typeof Shield; titleKey: TranslationKey; descKey: TranslationKey }[] = [
  { icon: Shield, titleKey: "feature.cert.title", descKey: "feature.cert.desc" },
  { icon: Zap,    titleKey: "feature.rapid.title", descKey: "feature.rapid.desc" },
  { icon: Truck,  titleKey: "feature.bulk.title",  descKey: "feature.bulk.desc"  },
  { icon: Leaf,   titleKey: "feature.eco.title",   descKey: "feature.eco.desc"   },
];

export function Features() {
  const { t } = useI18n();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURE_KEYS.map((f, index) => (
            <FadeIn key={index} delay={index * 0.09} direction="up">
              <div className="flex flex-col items-start p-6 rounded-2xl bg-muted/30 hover:bg-muted/60 transition-colors h-full">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{t(f.titleKey)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t(f.descKey)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
