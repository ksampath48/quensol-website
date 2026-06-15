import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "hi" | "te";

export const LANG_LABELS: Record<Lang, string> = {
  en: "EN",
  hi: "हिं",
  te: "తె",
};

export type TranslationKey =
  | "nav.home" | "nav.products" | "nav.blog" | "nav.locations"
  | "nav.samples" | "nav.videos" | "nav.about"
  | "hero.badge" | "hero.heading" | "hero.subheading"
  | "hero.cta.quote" | "hero.cta.whatsapp" | "hero.cta.catalog"
  | "cta.getQuote" | "cta.whatsapp" | "cta.requestQuote"
  | "cta.freeSamples" | "cta.viewCatalog"
  | "section.whyQuensol" | "section.ourProducts" | "section.hospitals"
  | "section.certifications" | "section.testimonials"
  | "footer.cta.heading" | "footer.cta.sub"
  | "misc.callUs" | "misc.trusted" | "misc.delivery";

type Translations = Record<TranslationKey, string>;

const translations: Record<Lang, Translations> = {
  en: {
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.blog": "Blog",
    "nav.locations": "Locations",
    "nav.samples": "Samples",
    "nav.videos": "Videos",
    "nav.about": "About",
    "hero.badge": "ISO 9001 · CE Certified · AQL 1.5",
    "hero.heading": "Medical Gloves, Bulk-Ready for India's Hospitals",
    "hero.subheading": "Nitrile, Latex, Vinyl, Surgical & Safety gloves — same-day dispatch from Hyderabad. Trusted by 500+ hospitals.",
    "hero.cta.quote": "Get Free Quote",
    "hero.cta.whatsapp": "WhatsApp Us",
    "hero.cta.catalog": "Browse Catalogue",
    "cta.getQuote": "Get Quote",
    "cta.whatsapp": "WhatsApp Us",
    "cta.requestQuote": "Request Quote",
    "cta.freeSamples": "Request Free Samples",
    "cta.viewCatalog": "View Catalogue",
    "section.whyQuensol": "Why Choose Quensol?",
    "section.ourProducts": "Our Products",
    "section.hospitals": "Hospitals We Serve",
    "section.certifications": "Certifications & Quality",
    "section.testimonials": "What Our Customers Say",
    "footer.cta.heading": "Ready to place a bulk order?",
    "footer.cta.sub": "Get a quote within 2 hours. Same-day dispatch for Hyderabad orders.",
    "misc.callUs": "Call Us",
    "misc.trusted": "Trusted by 500+ hospitals",
    "misc.delivery": "Same-day dispatch",
  },

  hi: {
    "nav.home": "होम",
    "nav.products": "उत्पाद",
    "nav.blog": "ब्लॉग",
    "nav.locations": "स्थान",
    "nav.samples": "नमूने",
    "nav.videos": "वीडियो",
    "nav.about": "हमारे बारे में",
    "hero.badge": "ISO 9001 · CE प्रमाणित · AQL 1.5",
    "hero.heading": "भारत के अस्पतालों के लिए मेडिकल ग्लव्स",
    "hero.subheading": "नाइट्राइल, लेटेक्स, विनाइल, सर्जिकल और सेफ्टी ग्लव्स — हैदराबाद से उसी दिन डिस्पैच। 500+ अस्पतालों द्वारा भरोसेमंद।",
    "hero.cta.quote": "मुफ़्त कोटेशन पाएं",
    "hero.cta.whatsapp": "व्हाट्सएप करें",
    "hero.cta.catalog": "कैटलॉग देखें",
    "cta.getQuote": "कोटेशन पाएं",
    "cta.whatsapp": "व्हाट्सएप करें",
    "cta.requestQuote": "कोटेशन अनुरोध",
    "cta.freeSamples": "मुफ़्त नमूने मांगें",
    "cta.viewCatalog": "कैटलॉग देखें",
    "section.whyQuensol": "Quensol क्यों चुनें?",
    "section.ourProducts": "हमारे उत्पाद",
    "section.hospitals": "जिन अस्पतालों की हम सेवा करते हैं",
    "section.certifications": "प्रमाणन और गुणवत्ता",
    "section.testimonials": "हमारे ग्राहक क्या कहते हैं",
    "footer.cta.heading": "बल्क ऑर्डर देने के लिए तैयार हैं?",
    "footer.cta.sub": "2 घंटे में कोटेशन पाएं। हैदराबाद ऑर्डर के लिए उसी दिन डिस्पैच।",
    "misc.callUs": "हमें कॉल करें",
    "misc.trusted": "500+ अस्पतालों द्वारा भरोसेमंद",
    "misc.delivery": "उसी दिन डिस्पैच",
  },

  te: {
    "nav.home": "హోమ్",
    "nav.products": "ఉత్పత్తులు",
    "nav.blog": "బ్లాగ్",
    "nav.locations": "స్థానాలు",
    "nav.samples": "నమూనాలు",
    "nav.videos": "వీడియోలు",
    "nav.about": "మా గురించి",
    "hero.badge": "ISO 9001 · CE సర్టిఫైడ్ · AQL 1.5",
    "hero.heading": "భారతదేశ ఆస్పత్రులకు వైద్య గ్లవ్‌లు",
    "hero.subheading": "నైట్రైల్, లాటెక్స్, వినైల్, సర్జికల్ & సేఫ్టీ గ్లవ్‌లు — హైదరాబాద్ నుండి అదే రోజు డిస్పాచ్. 500+ ఆస్పత్రులు నమ్ముకున్నాయి.",
    "hero.cta.quote": "ఉచిత కోటేషన్ పొందండి",
    "hero.cta.whatsapp": "వాట్సాప్ చేయండి",
    "hero.cta.catalog": "కేటలాగ్ చూడండి",
    "cta.getQuote": "కోటేషన్ పొందండి",
    "cta.whatsapp": "వాట్సాప్ చేయండి",
    "cta.requestQuote": "కోటేషన్ అభ్యర్థన",
    "cta.freeSamples": "ఉచిత నమూనాలు అభ్యర్థించండి",
    "cta.viewCatalog": "కేటలాగ్ చూడండి",
    "section.whyQuensol": "Quensol ఎందుకు ఎంచుకోవాలి?",
    "section.ourProducts": "మా ఉత్పత్తులు",
    "section.hospitals": "మేము సేవలందించే ఆస్పత్రులు",
    "section.certifications": "సర్టిఫికేషన్లు & నాణ్యత",
    "section.testimonials": "మా కస్టమర్లు ఏమి చెప్తున్నారు",
    "footer.cta.heading": "బల్క్ ఆర్డర్ ఇవ్వడానికి సిద్ధంగా ఉన్నారా?",
    "footer.cta.sub": "2 గంటల్లో కోటేషన్ పొందండి. హైదరాబాద్ ఆర్డర్‌లకు అదే రోజు డిస్పాచ్.",
    "misc.callUs": "మాకు కాల్ చేయండి",
    "misc.trusted": "500+ ఆస్పత్రులు నమ్ముకున్నాయి",
    "misc.delivery": "అదే రోజు డిస్పాచ్",
  },
};

interface I18nContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const stored = (localStorage.getItem("quensol-lang") as Lang) || "en";
  const [lang, setLangState] = useState<Lang>(stored);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("quensol-lang", l);
  };

  const t = (key: TranslationKey): string =>
    translations[lang][key] ?? translations["en"][key] ?? key;

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
