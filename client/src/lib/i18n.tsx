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
  | "hero.badge" | "hero.heading" | "hero.heading.accent"
  | "hero.subheading" | "hero.cta.quote" | "hero.cta.whatsapp" | "hero.cta.catalog"
  | "hero.cert1" | "hero.cert2" | "hero.cert3" | "hero.cert4"
  | "cta.getQuote" | "cta.whatsapp" | "cta.requestQuote"
  | "cta.freeSamples" | "cta.viewCatalog"
  | "section.whyQuensol" | "section.ourProducts" | "section.hospitals"
  | "section.certifications" | "section.testimonials"
  | "section.about.label" | "section.about.heading" | "section.about.body1" | "section.about.body2"
  | "section.industries.label" | "section.industries.heading" | "section.industries.sub"
  | "section.products.label" | "section.products.heading" | "section.products.sub"
  | "section.contact.heading" | "section.contact.sub"
  | "footer.cta.heading" | "footer.cta.sub"
  | "misc.callUs" | "misc.trusted" | "misc.delivery"
  | "feature.cert.title" | "feature.cert.desc"
  | "feature.rapid.title" | "feature.rapid.desc"
  | "feature.bulk.title" | "feature.bulk.desc"
  | "feature.eco.title" | "feature.eco.desc";

type Translations = Record<TranslationKey, string>;

const translations: Record<Lang, Translations> = {
  en: {
    /* ── Navigation ── */
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.blog": "Blog",
    "nav.locations": "Locations",
    "nav.samples": "Samples",
    "nav.videos": "Videos",
    "nav.about": "About",

    /* ── Hero ── */
    "hero.badge": "ISO Certified & Medical Grade Protection",
    "hero.heading": "Premium Protection",
    "hero.heading.accent": "For Professionals",
    "hero.subheading": "Sourcing the highest quality medical gloves directly to clinics, hospitals, and laboratories across India. Nitrile, Latex, Vinyl and Safety options with bulk pricing.",
    "hero.cta.catalog": "Shop All Products",
    "hero.cta.quote": "Request Bulk Quote",
    "hero.cta.whatsapp": "WhatsApp Us",
    "hero.cert1": "ISO 9001",
    "hero.cert2": "FDA 510(k)",
    "hero.cert3": "ASTM D6319",
    "hero.cert4": "CE Marked",

    /* ── CTAs ── */
    "cta.getQuote": "Get Quote",
    "cta.whatsapp": "WhatsApp Us",
    "cta.requestQuote": "Request Quote",
    "cta.freeSamples": "Request Free Samples",
    "cta.viewCatalog": "View Full Catalog",

    /* ── Section headings ── */
    "section.whyQuensol": "Why Choose Quensol?",
    "section.ourProducts": "Our Products",
    "section.hospitals": "Hospitals We Serve",
    "section.certifications": "Certifications & Quality",
    "section.testimonials": "What Our Customers Say",

    /* ── About ── */
    "section.about.label": "Our Story",
    "section.about.heading": "Built on Trust, Driven by Quality",
    "section.about.body1": "At Quensol, we are dedicated to providing the highest quality protective equipment to healthcare professionals, industrial workers, and laboratories across India. With our state-of-the-art manufacturing partners and rigorous quality control processes, we ensure every pair of gloves meets international safety standards.",
    "section.about.body2": "Our mission is to protect those who protect others. We believe in building long-term partnerships with our clients by offering reliable supply chains, transparent pricing, and unparalleled customer support.",

    /* ── Industries ── */
    "section.industries.label": "Sectors We Cover",
    "section.industries.heading": "Industries We Serve",
    "section.industries.sub": "Specialized hand protection solutions tailored for diverse professional environments.",

    /* ── Products ── */
    "section.products.label": "Our Range",
    "section.products.heading": "Featured Catalogue",
    "section.products.sub": "Explore our highest-rated medical protection products, trusted by professionals across India.",

    /* ── Contact CTA ── */
    "section.contact.heading": "Equip Your Entire Facility",
    "section.contact.sub": "Get specialized pricing, automated reordering, and dedicated account management for hospitals, clinics, and labs.",

    /* ── Footer ── */
    "footer.cta.heading": "Ready to place a bulk order?",
    "footer.cta.sub": "Get a quote within 2 hours. Same-day dispatch for Hyderabad orders.",

    /* ── Features ── */
    "feature.cert.title": "Medical Grade Certified",
    "feature.cert.desc": "All products meet ASTM and FDA standards for medical examination and surgical use.",
    "feature.rapid.title": "Rapid Fulfillment",
    "feature.rapid.desc": "Same-day shipping on orders placed before 2 PM. We keep your supply chain moving.",
    "feature.bulk.title": "Bulk Volume Pricing",
    "feature.bulk.desc": "Direct-to-facility pricing tiers available for hospitals, clinics, and large practices.",
    "feature.eco.title": "Eco-Friendly Options",
    "feature.eco.desc": "Ask about our new line of biodegradable nitrile gloves for sustainable practices.",

    /* ── Misc ── */
    "misc.callUs": "Call Us",
    "misc.trusted": "Trusted by 500+ hospitals",
    "misc.delivery": "Same-day dispatch",
  },

  hi: {
    /* ── Navigation ── */
    "nav.home": "होम",
    "nav.products": "उत्पाद",
    "nav.blog": "ब्लॉग",
    "nav.locations": "स्थान",
    "nav.samples": "नमूने",
    "nav.videos": "वीडियो",
    "nav.about": "हमारे बारे में",

    /* ── Hero ── */
    "hero.badge": "ISO प्रमाणित और मेडिकल ग्रेड सुरक्षा",
    "hero.heading": "प्रीमियम सुरक्षा",
    "hero.heading.accent": "पेशेवरों के लिए",
    "hero.subheading": "भारत भर के क्लीनिक, अस्पतालों और प्रयोगशालाओं को सीधे उच्चतम गुणवत्ता के मेडिकल ग्लव्स। नाइट्राइल, लेटेक्स, विनाइल और सेफ्टी विकल्प बल्क मूल्य पर।",
    "hero.cta.catalog": "सभी उत्पाद देखें",
    "hero.cta.quote": "बल्क कोटेशन मांगें",
    "hero.cta.whatsapp": "व्हाट्सएप करें",
    "hero.cert1": "ISO 9001",
    "hero.cert2": "FDA 510(k)",
    "hero.cert3": "ASTM D6319",
    "hero.cert4": "CE मार्क्ड",

    /* ── CTAs ── */
    "cta.getQuote": "कोटेशन पाएं",
    "cta.whatsapp": "व्हाट्सएप करें",
    "cta.requestQuote": "कोटेशन अनुरोध",
    "cta.freeSamples": "मुफ़्त नमूने मांगें",
    "cta.viewCatalog": "पूरा कैटलॉग देखें",

    /* ── Section headings ── */
    "section.whyQuensol": "Quensol क्यों चुनें?",
    "section.ourProducts": "हमारे उत्पाद",
    "section.hospitals": "जिन अस्पतालों की हम सेवा करते हैं",
    "section.certifications": "प्रमाणन और गुणवत्ता",
    "section.testimonials": "हमारे ग्राहक क्या कहते हैं",

    /* ── About ── */
    "section.about.label": "हमारी कहानी",
    "section.about.heading": "विश्वास पर निर्मित, गुणवत्ता से संचालित",
    "section.about.body1": "Quensol में, हम भारत भर के स्वास्थ्य पेशेवरों, औद्योगिक कामगारों और प्रयोगशालाओं को उच्चतम गुणवत्ता के सुरक्षा उपकरण प्रदान करने के लिए समर्पित हैं। हमारे उत्पादन भागीदारों और सख्त गुणवत्ता नियंत्रण के साथ हम सुनिश्चित करते हैं कि हर जोड़ी दस्ताने अंतर्राष्ट्रीय मानकों को पूरा करे।",
    "section.about.body2": "हमारा लक्ष्य उन लोगों की रक्षा करना है जो दूसरों की रक्षा करते हैं। हम विश्वसनीय आपूर्ति श्रृंखला, पारदर्शी मूल्य निर्धारण और बेजोड़ ग्राहक सहायता के माध्यम से दीर्घकालिक साझेदारी बनाने में विश्वास रखते हैं।",

    /* ── Industries ── */
    "section.industries.label": "हम जिन क्षेत्रों में काम करते हैं",
    "section.industries.heading": "जिन उद्योगों की हम सेवा करते हैं",
    "section.industries.sub": "विविध पेशेवर वातावरणों के लिए विशेष हाथ सुरक्षा समाधान।",

    /* ── Products ── */
    "section.products.label": "हमारी श्रेणी",
    "section.products.heading": "फीचर्ड कैटलॉग",
    "section.products.sub": "भारत भर के पेशेवरों द्वारा भरोसेमंद हमारे उच्च-रेटेड मेडिकल प्रोटेक्शन उत्पाद देखें।",

    /* ── Contact CTA ── */
    "section.contact.heading": "अपनी पूरी सुविधा को सुसज्जित करें",
    "section.contact.sub": "अस्पतालों, क्लीनिकों और लैब के लिए विशेष मूल्य निर्धारण, स्वचालित पुनर्ऑर्डरिंग और समर्पित खाता प्रबंधन प्राप्त करें।",

    /* ── Footer ── */
    "footer.cta.heading": "बल्क ऑर्डर देने के लिए तैयार हैं?",
    "footer.cta.sub": "2 घंटे में कोटेशन पाएं। हैदराबाद ऑर्डर के लिए उसी दिन डिस्पैच।",

    /* ── Features ── */
    "feature.cert.title": "मेडिकल ग्रेड प्रमाणित",
    "feature.cert.desc": "सभी उत्पाद ASTM और FDA मानकों को पूरा करते हैं।",
    "feature.rapid.title": "त्वरित डिलीवरी",
    "feature.rapid.desc": "दोपहर 2 बजे से पहले दिए गए ऑर्डर पर उसी दिन शिपिंग।",
    "feature.bulk.title": "बल्क वॉल्यूम मूल्य निर्धारण",
    "feature.bulk.desc": "अस्पतालों, क्लीनिकों और बड़ी प्रैक्टिस के लिए सीधे-सुविधा मूल्य।",
    "feature.eco.title": "पर्यावरण अनुकूल विकल्प",
    "feature.eco.desc": "टिकाऊ प्रथाओं के लिए हमारी बायोडिग्रेडेबल नाइट्राइल ग्लव्स श्रृंखला के बारे में पूछें।",

    /* ── Misc ── */
    "misc.callUs": "हमें कॉल करें",
    "misc.trusted": "500+ अस्पतालों द्वारा भरोसेमंद",
    "misc.delivery": "उसी दिन डिस्पैच",
  },

  te: {
    /* ── Navigation ── */
    "nav.home": "హోమ్",
    "nav.products": "ఉత్పత్తులు",
    "nav.blog": "బ్లాగ్",
    "nav.locations": "స్థానాలు",
    "nav.samples": "నమూనాలు",
    "nav.videos": "వీడియోలు",
    "nav.about": "మా గురించి",

    /* ── Hero ── */
    "hero.badge": "ISO సర్టిఫైడ్ & మెడికల్ గ్రేడ్ రక్షణ",
    "hero.heading": "ప్రీమియం రక్షణ",
    "hero.heading.accent": "నిపుణుల కోసం",
    "hero.subheading": "భారతదేశంలోని క్లినిక్‌లు, ఆస్పత్రులు మరియు లేబొరేటరీలకు నేరుగా అత్యుత్తమ నాణ్యత గల వైద్య గ్లవ్‌లు. నైట్రైల్, లాటెక్స్, వినైల్ మరియు సేఫ్టీ ఎంపికలు బల్క్ ధరలలో.",
    "hero.cta.catalog": "అన్ని ఉత్పత్తులు చూడండి",
    "hero.cta.quote": "బల్క్ కోటేషన్ అభ్యర్థించండి",
    "hero.cta.whatsapp": "వాట్సాప్ చేయండి",
    "hero.cert1": "ISO 9001",
    "hero.cert2": "FDA 510(k)",
    "hero.cert3": "ASTM D6319",
    "hero.cert4": "CE మార్క్డ్",

    /* ── CTAs ── */
    "cta.getQuote": "కోటేషన్ పొందండి",
    "cta.whatsapp": "వాట్సాప్ చేయండి",
    "cta.requestQuote": "కోటేషన్ అభ్యర్థన",
    "cta.freeSamples": "ఉచిత నమూనాలు అభ్యర్థించండి",
    "cta.viewCatalog": "పూర్తి కేటలాగ్ చూడండి",

    /* ── Section headings ── */
    "section.whyQuensol": "Quensol ఎందుకు ఎంచుకోవాలి?",
    "section.ourProducts": "మా ఉత్పత్తులు",
    "section.hospitals": "మేము సేవలందించే ఆస్పత్రులు",
    "section.certifications": "సర్టిఫికేషన్లు & నాణ్యత",
    "section.testimonials": "మా కస్టమర్లు ఏమి చెప్తున్నారు",

    /* ── About ── */
    "section.about.label": "మా కథ",
    "section.about.heading": "నమ్మకంపై నిర్మించబడి, నాణ్యతతో నడుస్తుంది",
    "section.about.body1": "Quensol లో, మేము భారతదేశం అంతటా ఆరోగ్య నిపుణులు, పారిశ్రామిక కార్మికులు మరియు లేబొరేటరీలకు అత్యుత్తమ నాణ్యత గల రక్షణ పరికరాలు అందించడానికి అంకితమయ్యాము.",
    "section.about.body2": "ఇతరులను రక్షించే వారిని రక్షించడం మా లక్ష్యం. విశ్వసనీయ సప్లై చైన్, పారదర్శక ధరలు మరియు అసాధారణ కస్టమర్ మద్దతు ద్వారా దీర్ఘకాలిక భాగస్వామ్యాలు నిర్మించడంలో మేము నమ్ముతాము.",

    /* ── Industries ── */
    "section.industries.label": "మేము కవర్ చేసే రంగాలు",
    "section.industries.heading": "మేము సేవలందించే పరిశ్రమలు",
    "section.industries.sub": "విభిన్న వృత్తిపరమైన వాతావరణాలకు అనుగుణంగా రూపొందించిన చేతి రక్షణ పరిష్కారాలు.",

    /* ── Products ── */
    "section.products.label": "మా శ్రేణి",
    "section.products.heading": "ఫీచర్డ్ కేటలాగ్",
    "section.products.sub": "భారతదేశంలోని నిపుణులు నమ్మే మా అత్యధిక రేటింగ్ పొందిన వైద్య రక్షణ ఉత్పత్తులను అన్వేషించండి.",

    /* ── Contact CTA ── */
    "section.contact.heading": "మీ మొత్తం సౌకర్యాన్ని సిద్ధం చేయండి",
    "section.contact.sub": "ఆస్పత్రులు, క్లినిక్‌లు మరియు లేబ్‌లకు ప్రత్యేక ధరలు, స్వయంచాలక రీఆర్డరింగ్ మరియు అంకితమైన ఖాతా నిర్వహణ పొందండి.",

    /* ── Footer ── */
    "footer.cta.heading": "బల్క్ ఆర్డర్ ఇవ్వడానికి సిద్ధంగా ఉన్నారా?",
    "footer.cta.sub": "2 గంటల్లో కోటేషన్ పొందండి. హైదరాబాద్ ఆర్డర్‌లకు అదే రోజు డిస్పాచ్.",

    /* ── Features ── */
    "feature.cert.title": "మెడికల్ గ్రేడ్ సర్టిఫైడ్",
    "feature.cert.desc": "అన్ని ఉత్పత్తులు ASTM మరియు FDA వైద్య పరీక్ష మానదండాలను పాటిస్తాయి.",
    "feature.rapid.title": "శీఘ్ర నెరవేర్పు",
    "feature.rapid.desc": "మధ్యాహ్నం 2 గంటల లోపు ఆర్డర్‌లకు అదే రోజు షిప్పింగ్.",
    "feature.bulk.title": "బల్క్ వాల్యూమ్ ధరలు",
    "feature.bulk.desc": "ఆస్పత్రులు, క్లినిక్‌లు మరియు పెద్ద సంస్థలకు నేరుగా ధర స్తరాలు.",
    "feature.eco.title": "పర్యావరణ అనుకూల ఎంపికలు",
    "feature.eco.desc": "సుస్థిర అభ్యాసాల కోసం మా బయోడిగ్రేడబుల్ నైట్రైల్ గ్లవ్‌ల గురించి అడగండి.",

    /* ── Misc ── */
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
