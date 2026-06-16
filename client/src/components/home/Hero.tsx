import heroBg from "@assets/generated_images/medical_hero_background.png";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { t } = useI18n();

  const openQuoteForm = () => {
    window.dispatchEvent(new CustomEvent("open-quote-form", { detail: {} }));
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="Medical Laboratory" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/85 to-transparent" />
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
              <span>{t("hero.badge")}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-heading font-bold text-foreground mb-6 leading-[1.1]">
              {t("hero.heading")} <br />
              <span className="text-gradient">{t("hero.heading.accent")}</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
              {t("hero.subheading")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#products">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-14 px-8 text-base rounded-full shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1"
                >
                  {t("hero.cta.catalog")}
                </Button>
              </a>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base rounded-full bg-white/50 backdrop-blur-sm border-primary/30 hover:bg-white"
                onClick={openQuoteForm}
              >
                {t("hero.cta.quote")} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-4 flex-wrap">
              {(["hero.cert1", "hero.cert2", "hero.cert3", "hero.cert4"] as const).map((key) => (
                <div key={key} className="text-xs font-bold text-muted-foreground border border-border px-3 py-2 rounded-md bg-white/60">
                  {t(key)}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
