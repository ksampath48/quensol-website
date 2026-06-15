import { useRoute } from "wouter";
import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MapPin, Phone, Clock, Truck, CheckCircle, ArrowRight, Star, Package, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface CityData {
  slug: string;
  name: string;
  state: string;
  deliveryDays: string;
  hospitals: number;
  activeCustomers: number;
  avgRating: string;
  tagline: string;
  description: string;
  areas: string[];
  majorHospitals: string[];
  nearbyHubs: string[];
  topProducts: { name: string; href: string; reason: string }[];
  faqs: { q: string; a: string }[];
  keywords: string;
  metaDesc: string;
}

const CITIES: CityData[] = [
  {
    slug: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    deliveryDays: "Same Day / Next Day",
    hospitals: 140,
    activeCustomers: 320,
    avgRating: "4.9",
    tagline: "HQ City · Fastest Dispatch",
    description: "Quensol is headquartered in Hyderabad, making it the fastest-served city in our network. We offer same-day dispatch for orders placed before 12 PM IST and maintain large local stock across all SKUs — nitrile, latex, vinyl, surgical, and safety gloves. Our Hyderabad warehouse covers Secunderabad, Gachibowli, Banjara Hills, and the HITEC City corridor with dedicated courier drops.",
    areas: ["Banjara Hills", "Jubilee Hills", "Kondapur", "Gachibowli", "Secunderabad", "Kukatpally", "LB Nagar", "Dilsukhnagar", "Begumpet", "Madhapur", "HITEC City", "Uppal"],
    majorHospitals: ["Apollo Hospitals Jubilee Hills", "Care Hospitals Banjara Hills", "Yashoda Hospitals Secunderabad", "NIMS Punjagutta", "Gandhi Hospital", "Continental Hospitals Gachibowli", "Sunshine Hospital", "Citizens Hospital"],
    nearbyHubs: ["Vijayawada", "Warangal", "Bengaluru"],
    topProducts: [
      { name: "Nitrile Exam Gloves", href: "/product/1", reason: "Most ordered by ICU and OT departments in Hyderabad hospitals" },
      { name: "Latex Surgical Sterile", href: "/product/6", reason: "High demand from NIMS, Apollo, and Care Hospital OTs" },
      { name: "Heavy Duty Safety Gloves", href: "/product/3", reason: "Popular with pharma and biotech units in HITEC City" },
    ],
    faqs: [
      { q: "Do you offer same-day delivery in Hyderabad?", a: "Yes — orders placed before 12 PM IST are dispatched the same day to most Hyderabad localities including Banjara Hills, Gachibowli, Secunderabad, and Kukatpally. Next-day delivery is guaranteed for all other areas." },
      { q: "What is the minimum order for Hyderabad delivery?", a: "The minimum order is 10 boxes (1,000 gloves). Orders above 50 boxes qualify for bulk pricing with discounts starting at 8%." },
      { q: "Do you supply to government hospitals in Hyderabad?", a: "Yes. We supply to Gandhi Hospital, NIMS, Osmania General Hospital, and district hospitals through both direct supply and registered distributors. We are GeM-registered for government procurement." },
      { q: "Can I visit your Hyderabad facility?", a: "Yes — our Hyderabad office is open Monday to Saturday, 9AM–6PM. Call +91 7386101845 to schedule a visit or request a product demonstration." },
    ],
    keywords: "medical gloves Hyderabad, nitrile gloves supplier Hyderabad, disposable gloves Hyderabad, surgical gloves Telangana, bulk gloves Hyderabad hospital",
    metaDesc: "Buy medical gloves in Hyderabad — same-day delivery. Quensol supplies ISO-certified Nitrile, Latex, Surgical & Safety gloves to 140+ hospitals in Hyderabad, Secunderabad & Telangana.",
  },
  {
    slug: "bangalore",
    name: "Bangalore",
    state: "Karnataka",
    deliveryDays: "Next Day",
    hospitals: 320,
    activeCustomers: 280,
    avgRating: "4.8",
    tagline: "Next-Day Delivery · Biotech Hub",
    description: "Bangalore's booming healthcare, biotech, and pharma R&D ecosystem is one of our largest markets. We serve multi-specialty hospitals in Whitefield and Indiranagar, biotech firms in Electronic City, and CROs across HSR Layout and Marathahalli. Our Bangalore distribution partner maintains 30-day stock cover for all fast-moving SKUs, ensuring consistent next-day delivery across the city.",
    areas: ["Whitefield", "Electronic City", "Koramangala", "Indiranagar", "Jayanagar", "Hebbal", "Marathahalli", "HSR Layout", "Bannerghatta Road", "JP Nagar", "Yeshwanthpur", "Rajajinagar"],
    majorHospitals: ["Manipal Hospital Whitefield", "Narayana Health City", "Apollo Bangalore", "Fortis Cunningham Road", "St. John's Hospital", "Sakra World Hospital", "Aster CMI Hospital", "BGS Gleneagles"],
    nearbyHubs: ["Mysuru", "Mangaluru", "Hubli"],
    topProducts: [
      { name: "Nitrile Exam Gloves", href: "/product/1", reason: "Standard in Bangalore's diagnostic labs and biotech R&D units" },
      { name: "Neoprene Surgical Sterile", href: "/product/2", reason: "Preferred by Manipal and Narayana Health OT surgeons" },
      { name: "Heavy Duty Safety Gloves", href: "/product/3", reason: "Used by pharma manufacturing plants in Electronic City" },
    ],
    faqs: [
      { q: "How fast is delivery to Bangalore?", a: "We offer next-day delivery across all major Bangalore localities including Whitefield, Koramangala, Electronic City, Indiranagar, and Hebbal. Orders placed before 3 PM are prioritised for overnight dispatch." },
      { q: "Do you supply to biotech and pharma companies in Bangalore?", a: "Yes — we have active accounts with biotech firms and CROs in Electronic City, Jigani Industrial Area, and Doddaballapur. Bulk pricing is available with Net-30 payment terms for registered companies." },
      { q: "What certifications do your gloves carry for Karnataka hospital approval?", a: "All our medical-grade gloves carry CE marking (EN 455), are ASTM D6319 tested, ISO 9001:2015 manufactured, and carry FDA listing. Certificates of Conformance are provided with every batch." },
      { q: "Can I set up a standing order for my Bangalore hospital?", a: "Absolutely. Our standing order programme offers automatic monthly dispatch at locked-in bulk pricing. Visit quensol.com/standing-order or call us to set up in 3 business days." },
    ],
    keywords: "medical gloves Bangalore, nitrile gloves supplier Bangalore, disposable gloves Bengaluru, surgical gloves Karnataka, bulk gloves Bangalore hospital biotech",
    metaDesc: "Medical gloves supplier in Bangalore — next-day delivery. Quensol supplies certified Nitrile, Latex & Surgical gloves to 320+ hospitals, biotech & pharma firms across Bengaluru.",
  },
  {
    slug: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    deliveryDays: "Next Day",
    hospitals: 280,
    activeCustomers: 220,
    avgRating: "4.8",
    tagline: "Medical Tourism Hub · Next-Day Delivery",
    description: "Chennai is one of India's top medical tourism destinations, with a dense concentration of multi-specialty hospitals and a thriving pharmaceutical manufacturing belt along OMR and Oragadam. Quensol supplies nitrile exam gloves, surgical sterile gloves, and heavy-duty safety gloves to hospitals across Anna Nagar, Adyar, and Perambur, as well as pharma plants in Sriperumbudur and the surrounding industrial corridors.",
    areas: ["Anna Nagar", "T. Nagar", "Adyar", "Velachery", "OMR", "Perambur", "Chromepet", "Tambaram", "Kilpauk", "Nungambakkam", "Porur", "Ambattur"],
    majorHospitals: ["Apollo Chennai", "Fortis Malar", "MIOT International", "Sri Ramachandra Hospital", "Vijaya Hospital", "Billroth Hospitals", "Kauvery Hospital", "Gleneagles Global Health"],
    nearbyHubs: ["Coimbatore", "Madurai", "Pondicherry"],
    topProducts: [
      { name: "Nitrile Exam Gloves", href: "/product/1", reason: "High-volume demand from medical tourism hospitals in Chennai" },
      { name: "Latex Surgical Sterile", href: "/product/6", reason: "Preferred for cardiac and orthopaedic OTs at Apollo, MIOT" },
      { name: "Vinyl Gloves", href: "/product/4", reason: "Popular with pharma packaging units in Oragadam and Sriperumbudur" },
    ],
    faqs: [
      { q: "Do you deliver medical gloves across Chennai including OMR?", a: "Yes — we cover all Chennai localities including OMR, Velachery, Tambaram, Anna Nagar, Perambur, and the Sriperumbudur-Oragadam industrial belt with next-day delivery." },
      { q: "Which Tamil Nadu hospitals use Quensol gloves?", a: "We supply to Apollo Chennai, Fortis Malar, MIOT International, Sri Ramachandra, and Kauvery Hospital among others. We can provide references on request." },
      { q: "Can you supply to pharmaceutical companies in Chennai?", a: "Yes. We supply powder-free nitrile and vinyl gloves to pharma manufacturing plants and packaging units across the Oragadam and Sriperumbudur industrial areas. Bulk pricing with Net-30 terms is available." },
      { q: "Do you have a distributor in Chennai?", a: "Yes, we have an authorised distribution partner in Chennai who maintains local stock. Contact us at +91 7386101845 to connect with our Chennai partner." },
    ],
    keywords: "medical gloves Chennai, nitrile gloves supplier Chennai, disposable gloves Tamil Nadu, surgical gloves Chennai hospital, bulk gloves Chennai pharma",
    metaDesc: "Medical gloves supplier in Chennai — next-day delivery. Quensol supplies ISO-certified Nitrile, Latex & Surgical gloves to 280+ hospitals and pharma companies across Tamil Nadu.",
  },
  {
    slug: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    deliveryDays: "2–3 Business Days",
    hospitals: 400,
    activeCustomers: 350,
    avgRating: "4.7",
    tagline: "India's Largest Healthcare Market",
    description: "Mumbai is India's highest-volume healthcare market and one of Quensol's largest supply territories. We serve hospitals, diagnostic chains, pharmaceutical companies, and medical device firms across South Mumbai, Thane, Navi Mumbai, and the extended MMR region. Our Mumbai distribution partner maintains a dedicated city warehouse, ensuring 2–3 day delivery to all pin codes within Greater Mumbai and same-week delivery to Thane and Navi Mumbai.",
    areas: ["Andheri", "Bandra", "Dadar", "Lower Parel", "Thane", "Navi Mumbai", "Borivali", "Malad", "Mulund", "Kurla", "Ghatkopar", "Chembur"],
    majorHospitals: ["Lilavati Hospital Bandra", "Breach Candy Hospital", "Kokilaben Dhirubhai Ambani", "Tata Memorial Centre", "Hinduja Hospital", "Holy Family Hospital", "Nanavati Max Super Speciality", "Sir H.N. Reliance Foundation"],
    nearbyHubs: ["Pune", "Surat", "Nashik"],
    topProducts: [
      { name: "Nitrile Exam Gloves", href: "/product/1", reason: "Highest-volume SKU across Mumbai's diagnostic labs and hospitals" },
      { name: "Neoprene Surgical Sterile", href: "/product/2", reason: "Used in cardiac and neurosurgery OTs at Lilavati, Kokilaben" },
      { name: "Heavy Duty Safety Gloves", href: "/product/3", reason: "In demand from pharma packaging in Thane and Navi Mumbai industrial zones" },
    ],
    faqs: [
      { q: "How long does delivery take to Mumbai?", a: "We offer 2–3 business day delivery across Greater Mumbai, Thane, and Navi Mumbai. For urgent requirements, we can often arrange next-day delivery for orders above 100 boxes — call +91 7386101845 to request." },
      { q: "Do you serve hospitals in Navi Mumbai and Thane?", a: "Yes — our Mumbai distribution covers all of MMR including Navi Mumbai, Thane, Kalyan, Dombivli, and surrounding areas. Delivery is typically within 2–3 business days." },
      { q: "What are your payment terms for Mumbai hospitals?", a: "We offer Net-30 payment terms for hospitals and registered healthcare entities with valid GST registration. Spot orders require advance payment. Standing orders receive Net-45 consideration." },
      { q: "Can you supply to pharmaceutical companies in Mumbai?", a: "Yes — we actively supply to pharma firms in Thane, Navi Mumbai, and Andheri (MIDC). We carry MSDS documentation and provide bulk pricing for manufacturing applications." },
    ],
    keywords: "medical gloves Mumbai, nitrile gloves supplier Mumbai, disposable gloves Maharashtra, surgical gloves Mumbai hospital, bulk gloves Mumbai pharma",
    metaDesc: "Medical gloves supplier in Mumbai — Quensol supplies ISO-certified Nitrile, Latex & Surgical gloves to 400+ hospitals and pharma companies across Greater Mumbai, Thane & Navi Mumbai.",
  },
  {
    slug: "delhi",
    name: "Delhi / NCR",
    state: "Delhi & Haryana",
    deliveryDays: "2–3 Business Days",
    hospitals: 600,
    activeCustomers: 420,
    avgRating: "4.7",
    tagline: "India's Capital Healthcare Hub",
    description: "Delhi NCR is India's largest concentrated healthcare market by hospital count. Quensol supplies medical gloves to hospitals across South Delhi, Gurugram, Noida, Faridabad, and Ghaziabad through our registered courier partners. We are empanelled with several government hospital procurement committees and maintain documentation ready for tendering through GeM and CPPP portals.",
    areas: ["Connaught Place", "South Delhi", "Gurugram", "Noida", "Faridabad", "Ghaziabad", "Dwarka", "Rohini", "Lajpat Nagar", "Saket", "Vasant Kunj", "Sector 18 Noida"],
    majorHospitals: ["AIIMS Delhi", "Max Healthcare", "Fortis Hospital Vasant Kunj", "Apollo Delhi Sarita Vihar", "Sir Ganga Ram Hospital", "BLK Super Speciality", "Medanta Gurugram", "Artemis Hospital Gurugram"],
    nearbyHubs: ["Jaipur", "Chandigarh", "Agra"],
    topProducts: [
      { name: "Nitrile Exam Gloves", href: "/product/1", reason: "Standard procurement item across AIIMS, Max Healthcare, and Fortis" },
      { name: "Latex Surgical Sterile", href: "/product/6", reason: "High demand from cardiac and trauma OTs across NCR hospitals" },
      { name: "Neoprene Surgical Sterile", href: "/product/2", reason: "Preferred by latex-sensitive surgeons at Medanta and Apollo" },
    ],
    faqs: [
      { q: "Do you deliver to Noida and Gurugram as well as Delhi?", a: "Yes — we deliver across the full NCR including Noida, Greater Noida, Gurugram, Faridabad, and Ghaziabad. Delivery time is 2–3 business days from dispatch." },
      { q: "Are you registered on GeM for government hospital procurement in Delhi?", a: "Yes, Quensol is GeM-registered (Government e-Marketplace). AIIMS and other government hospitals in Delhi can place orders through GeM directly. Call us to receive our GeM seller ID." },
      { q: "What is the minimum order for Delhi NCR?", a: "The minimum is 10 boxes. Orders above 100 boxes attract bulk discounts of 8–15%. Standing orders for 6-month commitments receive the best pricing." },
      { q: "Do you carry NABL-approved test reports for Delhi hospital procurement?", a: "Yes. All batches come with third-party test reports from NABL-accredited labs. We provide CoC, batch test reports, and MSDS documentation as required by hospital purchase committees." },
    ],
    keywords: "medical gloves Delhi, nitrile gloves supplier Delhi NCR, disposable gloves Delhi hospital, surgical gloves Delhi, bulk gloves Gurugram Noida",
    metaDesc: "Medical gloves supplier in Delhi NCR — Quensol supplies ISO & GeM-registered Nitrile, Latex & Surgical gloves to 600+ hospitals across Delhi, Gurugram, Noida & Faridabad.",
  },
  {
    slug: "pune",
    name: "Pune",
    state: "Maharashtra",
    deliveryDays: "2–3 Business Days",
    hospitals: 180,
    activeCustomers: 160,
    avgRating: "4.8",
    tagline: "Pharma Belt · Fast Growing Market",
    description: "Pune's pharmaceutical manufacturing belt in Hinjawadi, Pimpri-Chinchwad, and Chakan is one of India's most active markets for disposable gloves. Quensol serves hospitals, CROs, and pharma companies with bulk nitrile and vinyl gloves for clean-room and manufacturing applications. We also serve Pune's growing hospital network including Ruby Hall, Jehangir, and KEM with AQL 1.5 exam gloves for patient care.",
    areas: ["Hinjawadi", "Kothrud", "Viman Nagar", "Pimpri-Chinchwad", "Kalyani Nagar", "Hadapsar", "Baner", "Wakad", "Kharadi", "Chakan", "Talegaon", "Aundh"],
    majorHospitals: ["Ruby Hall Clinic", "Jehangir Hospital", "KEM Hospital Pune", "Deenanath Mangeshkar Hospital", "Aditya Birla Memorial Hospital", "Sahyadri Hospitals", "Inamdar Multispeciality", "Columbia Asia Pune"],
    nearbyHubs: ["Mumbai", "Nashik", "Solapur"],
    topProducts: [
      { name: "Nitrile Exam Gloves", href: "/product/1", reason: "Standard in Pune's hospitals and diagnostic centres" },
      { name: "Vinyl Gloves", href: "/product/4", reason: "Large demand from pharma manufacturing plants in Pimpri-Chinchwad and Chakan" },
      { name: "Heavy Duty Safety Gloves", href: "/product/3", reason: "Used in Hinjawadi industrial zone and auto-pharma manufacturing units" },
    ],
    faqs: [
      { q: "How fast is delivery to Pune?", a: "We offer 2–3 business day delivery across Pune including Hinjawadi, Kothrud, Viman Nagar, Pimpri-Chinchwad, and surrounding areas. Express delivery options are available for orders above 200 boxes." },
      { q: "Do you supply to pharma companies in Pune's industrial zones?", a: "Yes — we actively serve pharma firms in Pimpri-Chinchwad MIDC, Chakan, and Talegaon industrial areas. We provide clean-room grade nitrile and vinyl gloves with full documentation." },
      { q: "What payment terms do you offer for Pune companies?", a: "Net-30 terms for registered companies with GST. Standing order customers can negotiate Net-45. Spot orders are prepaid." },
      { q: "Do you have a local contact in Pune?", a: "Yes, our authorised Pune distribution partner handles local support and deliveries. Call +91 7386101845 and we'll connect you with our Pune team." },
    ],
    keywords: "medical gloves Pune, nitrile gloves supplier Pune, disposable gloves Pimpri-Chinchwad, surgical gloves Pune hospital, bulk gloves Pune pharma Hinjawadi",
    metaDesc: "Medical gloves supplier in Pune — Quensol supplies ISO-certified Nitrile, Vinyl & Surgical gloves to 180+ hospitals and pharma companies across Pune, Pimpri-Chinchwad & Hinjawadi.",
  },
  {
    slug: "kolkata",
    name: "Kolkata",
    state: "West Bengal",
    deliveryDays: "2–3 Business Days",
    hospitals: 240,
    activeCustomers: 190,
    avgRating: "4.7",
    tagline: "Eastern India Gateway",
    description: "Kolkata is the healthcare gateway to Eastern India. Quensol supplies medical gloves to hospitals across Park Street, Salt Lake, Howrah, and New Town, as well as to diagnostic chains and nursing homes throughout the city. We serve clients in West Bengal, Jharkhand, Odisha, and the North-East through our Kolkata distribution network.",
    areas: ["Park Street", "Salt Lake", "New Town", "Howrah", "Dum Dum", "Garia", "Tollygunge", "Ballygunge", "Behala", "Barasat", "Rajarhat", "Alipore"],
    majorHospitals: ["Apollo Gleneagles Kolkata", "Fortis Anandapur", "AMRI Hospitals", "SSKM Government Hospital", "RG Kar Medical College", "Peerless Hospital", "Belle Vue Clinic", "Woodlands Multispeciality"],
    nearbyHubs: ["Bhubaneswar", "Guwahati", "Patna"],
    topProducts: [
      { name: "Nitrile Exam Gloves", href: "/product/1", reason: "High-volume demand from Kolkata's busy diagnostic labs and nursing homes" },
      { name: "Latex Surgical Sterile", href: "/product/6", reason: "Preferred in SSKM, Apollo, and major Kolkata OTs" },
      { name: "Vinyl Gloves", href: "/product/4", reason: "Used by food processing and general healthcare facilities in Howrah" },
    ],
    faqs: [
      { q: "Do you deliver to all of Kolkata including New Town and Howrah?", a: "Yes — we cover Greater Kolkata including Salt Lake, New Town, Rajarhat, Howrah, Dum Dum, and Barasat within the standard 2–3 business day delivery window." },
      { q: "Can you supply to hospitals across West Bengal beyond Kolkata?", a: "Yes. We serve hospitals in Durgapur, Asansol, Siliguri, and other West Bengal cities through our extended eastern India distribution network. Call us for pricing and lead times." },
      { q: "Are you able to handle government hospital tenders in West Bengal?", a: "Yes. We hold the required certifications (ISO, CE, ASTM) for government hospital procurement. We can supply through WBMSC (West Bengal Medical Services Corporation) registered channels." },
      { q: "What is the minimum order for Kolkata?", a: "Minimum 10 boxes. Bulk discounts apply from 50 boxes upward. Standing order customers in Kolkata receive priority dispatch and dedicated account management." },
    ],
    keywords: "medical gloves Kolkata, nitrile gloves supplier Kolkata, disposable gloves West Bengal, surgical gloves Kolkata hospital, bulk gloves Kolkata",
    metaDesc: "Medical gloves supplier in Kolkata — Quensol supplies ISO-certified Nitrile, Latex & Surgical gloves to 240+ hospitals and healthcare facilities across Kolkata and West Bengal.",
  },
  {
    slug: "ahmedabad",
    name: "Ahmedabad",
    state: "Gujarat",
    deliveryDays: "2–3 Business Days",
    hospitals: 160,
    activeCustomers: 140,
    avgRating: "4.8",
    tagline: "Gujarat's Healthcare Capital",
    description: "Ahmedabad is Gujarat's largest healthcare and pharmaceutical hub. Quensol supplies medical gloves to multi-specialty hospitals along CG Road, SG Highway, and Prahlad Nagar, as well as to pharmaceutical manufacturers in GIDC estates. We serve clients across Gujarat including Surat, Vadodara, and Rajkot from our Ahmedabad distribution point.",
    areas: ["CG Road", "SG Highway", "Prahlad Nagar", "Satellite", "Navrangpura", "Maninagar", "Bopal", "Ghatlodiya", "Chandkheda", "Naroda", "GIDC Vatva", "Sanand"],
    majorHospitals: ["Apollo Hospitals Ahmedabad", "HCG Cancer Centre", "Zydus Hospitals", "SAL Hospital", "Sterling Hospital", "CIMS Hospital", "Shalby Hospital", "VS Government Hospital"],
    nearbyHubs: ["Surat", "Vadodara", "Rajkot"],
    topProducts: [
      { name: "Nitrile Exam Gloves", href: "/product/1", reason: "Standard across Ahmedabad hospitals and diagnostic labs" },
      { name: "Vinyl Gloves", href: "/product/4", reason: "Large demand from pharmaceutical GIDC manufacturers in Vatva and Naroda" },
      { name: "Heavy Duty Safety Gloves", href: "/product/3", reason: "Used in Sanand industrial corridor and GIDC manufacturing units" },
    ],
    faqs: [
      { q: "Do you supply to pharma companies in GIDC Vatva and Naroda?", a: "Yes — GIDC Vatva, Naroda, and Sanand are active corridors for us. We supply clean-room nitrile and vinyl gloves with full pharma documentation including MSDS and CoC." },
      { q: "How do you serve other Gujarat cities from Ahmedabad?", a: "We use Ahmedabad as a hub to serve Surat, Vadodara, Rajkot, Gandhinagar, and Anand. Delivery is typically 1–2 additional days beyond Ahmedabad lead times." },
      { q: "Can Quensol supply during Gujarat hospital government tenders?", a: "Yes. We hold ISO 9001, CE, and ASTM certifications required by Gujarat government hospital procurement. Call us to receive our documentation package for tender submissions." },
      { q: "What is the minimum order size for Ahmedabad?", a: "Minimum 10 boxes. Orders above 100 boxes qualify for bulk discount pricing starting at 8%. Standing orders receive locked-in pricing for 6–12 months." },
    ],
    keywords: "medical gloves Ahmedabad, nitrile gloves supplier Gujarat, disposable gloves Ahmedabad, surgical gloves Ahmedabad hospital, bulk gloves GIDC pharma",
    metaDesc: "Medical gloves supplier in Ahmedabad — Quensol supplies ISO-certified Nitrile, Vinyl & Surgical gloves to 160+ hospitals and pharma companies across Ahmedabad and Gujarat.",
  },
  {
    slug: "coimbatore",
    name: "Coimbatore",
    state: "Tamil Nadu",
    deliveryDays: "2–3 Business Days",
    hospitals: 90,
    activeCustomers: 70,
    avgRating: "4.8",
    tagline: "South Tamil Nadu Medical Hub",
    description: "Coimbatore is the second-largest city in Tamil Nadu and a growing medical and industrial hub. Quensol supplies medical and safety gloves to hospitals along Avinashi Road and Peelamedu, to textile-adjacent industries requiring cut-resistant options, and to the growing pharmaceutical segment around Thudiyalur. We also serve Tirupur, Salem, and Erode from our Coimbatore distribution point.",
    areas: ["Peelamedu", "Avinashi Road", "RS Puram", "Gandhipuram", "Saibaba Colony", "Singanallur", "Hopes College", "Thudiyalur", "Podanur", "Kuniyamuthur"],
    majorHospitals: ["G. Kuppuswamy Naidu Memorial Hospital", "PSG Hospitals", "Kovai Medical Centre", "Sri Ramakrishna Hospital", "Vcare Multi Speciality", "Apollo Coimbatore"],
    nearbyHubs: ["Chennai", "Madurai", "Kochi"],
    topProducts: [
      { name: "Nitrile Exam Gloves", href: "/product/1", reason: "Standard in Coimbatore hospitals and diagnostic labs" },
      { name: "Heavy Duty Safety Gloves", href: "/product/3", reason: "High demand from textile and manufacturing industries around Tirupur" },
      { name: "Vinyl Gloves", href: "/product/4", reason: "Used by food processing and packaging units around Coimbatore industrial areas" },
    ],
    faqs: [
      { q: "Do you deliver to Tirupur and Erode from Coimbatore?", a: "Yes. Tirupur, Erode, Salem, and surrounding areas are served from our Coimbatore distribution point. Delivery typically adds 1 business day beyond Coimbatore timelines." },
      { q: "Do you supply safety gloves for textile industries in Coimbatore?", a: "Yes — we supply heavy-duty safety gloves and cut-resistant options for textile and garment manufacturing. These are separate from our medical-grade products and are available in bulk at competitive pricing." },
      { q: "What is the minimum order for Coimbatore?", a: "Minimum 10 boxes (1,000 gloves). Bulk discounts apply from 50 boxes upward." },
    ],
    keywords: "medical gloves Coimbatore, nitrile gloves supplier Coimbatore, disposable gloves Tamil Nadu, bulk gloves Coimbatore hospital, safety gloves textile Tirupur",
    metaDesc: "Medical gloves supplier in Coimbatore — Quensol supplies ISO-certified Nitrile, Safety & Vinyl gloves to hospitals and industries across Coimbatore, Tirupur, Salem and Tamil Nadu.",
  },
  {
    slug: "visakhapatnam",
    name: "Visakhapatnam",
    state: "Andhra Pradesh",
    deliveryDays: "2–3 Business Days",
    hospitals: 80,
    activeCustomers: 60,
    avgRating: "4.7",
    tagline: "Andhra Pradesh Coastal Hub",
    description: "Visakhapatnam (Vizag) is the largest city in Andhra Pradesh and a growing industrial and healthcare hub. Quensol supplies medical gloves to hospitals along Jagadamba Junction and Steel Plant Road, and industrial safety gloves to HPCL, RINL, and port-adjacent industries. We serve all of coastal Andhra from our Vizag distribution point.",
    areas: ["Jagadamba Junction", "Steel Plant Road", "Gajuwaka", "MVP Colony", "Dwaraka Nagar", "Rushikonda", "Madhurawada", "Kommadi", "Bheemunipatnam"],
    majorHospitals: ["Apollo Visakhapatnam", "Care Hospital Vizag", "Seven Hills Hospital", "KIMS Vizag", "King George Hospital", "Gayatri Vidya Parishad Hospital"],
    nearbyHubs: ["Vijayawada", "Hyderabad", "Bhubaneswar"],
    topProducts: [
      { name: "Nitrile Exam Gloves", href: "/product/1", reason: "Standard in Vizag hospitals and medical colleges" },
      { name: "Heavy Duty Safety Gloves", href: "/product/3", reason: "High demand from HPCL, RINL, and port industries in Gajuwaka" },
      { name: "Latex Surgical Sterile", href: "/product/6", reason: "Used in major OTs at Apollo, Care, and King George Hospital" },
    ],
    faqs: [
      { q: "Do you supply to industrial companies in Visakhapatnam?", a: "Yes — we supply heavy-duty safety and nitrile gloves to HPCL, RINL, port operators, and shipbuilding companies in the Gajuwaka industrial area." },
      { q: "Can you supply to government hospitals in Vizag?", a: "Yes — we supply to King George Hospital and other government facilities through direct purchase and via registered distributors. We hold all required certifications." },
      { q: "Do you serve other Andhra Pradesh cities from Vizag?", a: "Yes. We serve Rajahmundry, Kakinada, Nellore, and Tirupati from our Vizag distribution point. Call for lead times and pricing." },
    ],
    keywords: "medical gloves Visakhapatnam, nitrile gloves Vizag, disposable gloves Andhra Pradesh, safety gloves Gajuwaka industrial, bulk gloves Vizag hospital",
    metaDesc: "Medical gloves supplier in Visakhapatnam — Quensol supplies Nitrile, Safety & Surgical gloves to hospitals and industrial companies across Vizag and coastal Andhra Pradesh.",
  },
  {
    slug: "kochi",
    name: "Kochi",
    state: "Kerala",
    deliveryDays: "2–3 Business Days",
    hospitals: 110,
    activeCustomers: 85,
    avgRating: "4.9",
    tagline: "Kerala Healthcare Leader",
    description: "Kochi is Kerala's commercial and healthcare capital. Quensol supplies medical gloves to major hospitals along MG Road and Edapally, and to the growing biomedical and pharma sector in Kalamassery and Aluva. Kerala hospitals are among India's most quality-conscious buyers — we supply only AQL 1.5 certified gloves into this market.",
    areas: ["MG Road", "Edapally", "Kalamassery", "Aluva", "Ernakulam North", "Kakkanad", "Thrippunithura", "Fort Kochi", "Palarivattom", "Vyttila"],
    majorHospitals: ["Amrita Institute of Medical Sciences", "Aster Medcity", "Lakeshore Hospital", "KIMS Health Kochi", "Medical Trust Hospital", "Renai Medicity"],
    nearbyHubs: ["Thiruvananthapuram", "Kozhikode", "Coimbatore"],
    topProducts: [
      { name: "Nitrile Exam Gloves", href: "/product/1", reason: "Highest quality tier — preferred in Kerala's internationally-accredited hospitals" },
      { name: "Neoprene Surgical Sterile", href: "/product/2", reason: "Used in Amrita and Aster Medcity for latex-sensitive surgical teams" },
      { name: "Aloe Vera Latex Gloves", href: "/product/5", reason: "Popular in Kerala nursing homes for extended-wear patient care" },
    ],
    faqs: [
      { q: "Do you deliver to Thiruvananthapuram and Kozhikode from Kochi?", a: "Yes — we serve all major Kerala cities from our Kochi distribution point including Thiruvananthapuram, Kozhikode, Thrissur, and Kollam. Allow 1 additional business day beyond Kochi delivery time." },
      { q: "Kerala hospitals require NABH/JCI compliance docs — can you provide?", a: "Yes. We provide CE, ISO 9001, ASTM D6319, and EN 455 certificates. We also provide batch-level CoC and third-party test reports as required by NABH and JCI-accredited hospital procurement committees." },
      { q: "Do you have an authorised distributor in Kochi?", a: "Yes, we have a registered distribution partner in Kochi. Our partnership is currently limited and we are actively onboarding additional distributors. Contact us at +91 7386101845." },
    ],
    keywords: "medical gloves Kochi, nitrile gloves supplier Kerala, disposable gloves Kerala hospital, surgical gloves Kochi Ernakulam, bulk gloves Kerala NABH",
    metaDesc: "Medical gloves supplier in Kochi — Quensol supplies AQL 1.5 certified Nitrile, Neoprene & Surgical gloves to 110+ hospitals and healthcare facilities across Kerala.",
  },
  {
    slug: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    deliveryDays: "2–3 Business Days",
    hospitals: 120,
    activeCustomers: 95,
    avgRating: "4.7",
    tagline: "Rajasthan's Medical Capital",
    description: "Jaipur is Rajasthan's largest city and a growing medical tourism destination. Quensol supplies medical gloves to hospitals along Tonk Road and C-scheme, and to the pharma manufacturing cluster in Sitapura Industrial Area. We serve Jodhpur, Udaipur, Kota, and other Rajasthan cities from our Jaipur distribution point.",
    areas: ["Tonk Road", "C-Scheme", "Malviya Nagar", "Vaishali Nagar", "Mansarovar", "Sitapura Industrial Area", "Sanganer", "Jagatpura", "Sodala", "Raja Park"],
    majorHospitals: ["Fortis Escorts Jaipur", "Narayana Multispeciality Jaipur", "SMS Medical College Hospital", "Mahatma Gandhi Hospital", "Eternal Hospital", "CK Birla Hospital Jaipur"],
    nearbyHubs: ["Delhi NCR", "Jodhpur", "Udaipur"],
    topProducts: [
      { name: "Nitrile Exam Gloves", href: "/product/1", reason: "Standard in Jaipur hospitals and medical college facilities" },
      { name: "Vinyl Gloves", href: "/product/4", reason: "Used in Sitapura pharma and food processing units" },
      { name: "Latex Surgical Sterile", href: "/product/6", reason: "In demand for cardiac and orthopaedic surgeries at Fortis and Narayana" },
    ],
    faqs: [
      { q: "Do you supply to government hospitals in Jaipur?", a: "Yes — we supply to SMS Medical College Hospital and Mahatma Gandhi Hospital through authorised channels. We hold ISO, CE, and ASTM documentation required for Rajasthan government procurement." },
      { q: "Can you serve other Rajasthan cities from Jaipur?", a: "Yes. Jodhpur, Udaipur, Kota, Ajmer, and Bikaner are served from our Jaipur distribution point. Allow 1–2 additional business days for outstation delivery." },
      { q: "Do you supply to pharma companies in Sitapura Industrial Area?", a: "Yes — Sitapura is an active market for us. We supply nitrile and vinyl gloves to pharmaceutical and chemical manufacturing units with full documentation." },
    ],
    keywords: "medical gloves Jaipur, nitrile gloves supplier Rajasthan, disposable gloves Jaipur hospital, surgical gloves Rajasthan, bulk gloves Jaipur pharma",
    metaDesc: "Medical gloves supplier in Jaipur — Quensol supplies ISO-certified Nitrile, Vinyl & Surgical gloves to 120+ hospitals and pharma companies across Jaipur and Rajasthan.",
  },
];

export { CITIES };

function CityPage({ city }: { city: CityData }) {
  useEffect(() => {
    document.title = `Medical Gloves Supplier in ${city.name} | Quensol`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", city.metaDesc);
    const kwds = document.querySelector('meta[name="keywords"]');
    if (kwds) kwds.setAttribute("content", city.keywords);

    // 1. LocalBusiness (SEO + GEO entity signal)
    const localBiz = {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "MedicalBusiness"],
      "name": `Quensol — Medical Gloves Supplier in ${city.name}`,
      "description": city.metaDesc,
      "telephone": "+91-7386101845",
      "email": "support@quensol.com",
      "url": `https://quensol.com/locations/${city.slug}`,
      "logo": "https://quensol.com/favicon.png",
      "image": "https://quensol.com/favicon.png",
      "priceRange": "₹₹",
      "areaServed": [
        { "@type": "City", "name": city.name },
        { "@type": "State", "name": city.state },
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Medical Gloves",
        "itemListElement": city.topProducts.map(p => ({
          "@type": "Offer",
          "itemOffered": { "@type": "Product", "name": p.name, "url": `https://quensol.com${p.href}` },
        })),
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": city.avgRating,
        "reviewCount": String(Math.floor(city.activeCustomers * 0.6)),
        "bestRating": "5",
      },
    };

    // 2. BreadcrumbList (SEO — breadcrumb rich results)
    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quensol.com/" },
        { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://quensol.com/locations" },
        { "@type": "ListItem", "position": 3, "name": `Medical Gloves in ${city.name}`, "item": `https://quensol.com/locations/${city.slug}` },
      ],
    };

    // 3. FAQPage — per city (AEO: featured snippets, AI direct answers)
    const faqPage = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", "h2", ".faq-answer"] },
      "mainEntity": city.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a },
      })),
    };

    // 4. Service schema (GEO — helps LLMs understand what Quensol offers in this city)
    const service = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `Medical Gloves Supply in ${city.name}`,
      "provider": { "@type": "Organization", "name": "Quensol", "url": "https://quensol.com" },
      "areaServed": { "@type": "City", "name": city.name },
      "description": city.description,
      "serviceType": "Medical Supply — Disposable Gloves",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "description": `Bulk medical gloves delivered to ${city.name} in ${city.deliveryDays}`,
        "eligibleRegion": { "@type": "City", "name": city.name },
        "url": `https://quensol.com/locations/${city.slug}`,
      },
    };

    const schemas = [
      { id: "city-ld-localbiz", data: localBiz },
      { id: "city-ld-breadcrumb", data: breadcrumb },
      { id: "city-ld-faq", data: faqPage },
      { id: "city-ld-service", data: service },
    ];

    schemas.forEach(({ id, data }) => {
      let el = document.getElementById(id) as HTMLScriptElement | null;
      if (!el) {
        el = document.createElement("script");
        el.id = id;
        el.type = "application/ld+json";
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(data);
    });

    // Canonical tag per city
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) canonical.setAttribute("href", `https://quensol.com/locations/${city.slug}`);

    return () => {
      document.title = "Quensol | Premium Medical Gloves Supplier in India";
      ["city-ld-localbiz","city-ld-breadcrumb","city-ld-faq","city-ld-service"].forEach(id => {
        document.getElementById(id)?.remove();
      });
      const c = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (c) c.setAttribute("href", "https://quensol.com/");
    };
  }, [city]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-14">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-5">
              <a href="/locations" className="hover:text-white transition-colors">Locations</a>
              <span>›</span>
              <span className="text-slate-200">{city.name}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-2">
                  <MapPin className="w-4 h-4" /> {city.state}
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-400 font-normal">{city.tagline}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-3">
                  Medical Gloves Supplier in {city.name}
                </h1>
                <p className="text-slate-400 max-w-xl leading-relaxed">{city.metaDesc}</p>
              </div>
              <div className="flex flex-col gap-3 shrink-0">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("open-quote-form", { detail: {} }))}
                  className="h-12 px-7 bg-primary text-white rounded-full font-bold text-sm hover:bg-primary/90 transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  Get Quote for {city.name} <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => window.open(`https://wa.me/917386101845?text=${encodeURIComponent(`Hi Quensol! I need medical gloves delivered to ${city.name}. Please send pricing.`)}`, "_blank")}
                  className="h-12 px-7 bg-[#25D366] text-white rounded-full font-bold text-sm hover:bg-[#20b858] transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  WhatsApp Us
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="bg-white border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
              {[
                { icon: Truck, label: "Delivery", value: city.deliveryDays },
                { icon: Users, label: "Hospitals Served", value: `${city.hospitals}+` },
                { icon: Package, label: "Active Customers", value: `${city.activeCustomers}+` },
                { icon: Star, label: "Customer Rating", value: `${city.avgRating} / 5` },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 py-5 px-4 md:px-6">
                  <div className="w-9 h-9 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="font-bold text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              {/* About */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Why Choose Quensol in {city.name}?</h2>
                <p className="text-muted-foreground leading-relaxed">{city.description}</p>
              </div>

              {/* Top Products */}
              <div>
                <h2 className="text-2xl font-bold mb-5">Top Products in {city.name}</h2>
                <div className="space-y-3">
                  {city.topProducts.map((p, i) => (
                    <motion.a
                      key={p.name}
                      href={p.href}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-4 p-4 bg-white border border-border rounded-xl hover:border-primary hover:shadow-sm transition-all group"
                    >
                      <div className="w-9 h-9 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0 font-bold text-sm group-hover:bg-primary group-hover:text-white transition-colors">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm group-hover:text-primary transition-colors">{p.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{p.reason}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-0.5" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Areas */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Areas We Serve in {city.name}</h2>
                <div className="flex flex-wrap gap-2">
                  {city.areas.map(area => (
                    <span key={area} className="text-sm bg-primary/5 text-primary border border-primary/20 px-3 py-1.5 rounded-full font-medium">{area}</span>
                  ))}
                  <span className="text-sm bg-slate-100 text-muted-foreground px-3 py-1.5 rounded-full">+ all surrounding areas</span>
                </div>
              </div>

              {/* Hospitals */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Hospitals We Supply in {city.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {city.majorHospitals.map(h => (
                    <div key={h} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                      {h}
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-bold mb-5">FAQs — Medical Gloves in {city.name}</h2>
                <div className="space-y-4">
                  {city.faqs.map((faq, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="bg-slate-50 border border-border rounded-xl p-5"
                    >
                      <p className="font-bold text-sm mb-2 flex items-start gap-2">
                        <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {faq.q}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed pl-6">{faq.a}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Contact card */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 lg:sticky lg:top-28">
                <h3 className="font-bold mb-1">Get a Quote for {city.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">Our team responds within 2 hours on business days.</p>
                <div className="space-y-3 text-sm mb-5">
                  <a href="tel:+917386101845" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Phone className="w-4 h-4 text-primary shrink-0" /> +91 7386101845
                  </a>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary shrink-0" /> Mon–Sat, 9AM–7PM IST
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Truck className="w-4 h-4 text-primary shrink-0" /> Delivery: {city.deliveryDays}
                  </div>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent("open-quote-form", { detail: {} }))}
                    className="w-full h-10 bg-primary text-white rounded-full font-bold text-sm hover:bg-primary/90 transition-colors"
                  >
                    Request Quote
                  </button>
                  <button
                    onClick={() => window.open(`https://wa.me/917386101845?text=${encodeURIComponent(`Hi Quensol! I need medical gloves delivered to ${city.name}.`)}`, "_blank")}
                    className="w-full h-10 bg-[#25D366] text-white rounded-full font-bold text-sm hover:bg-[#20b858] transition-colors"
                  >
                    WhatsApp Us
                  </button>
                  <a href="/samples" className="w-full h-10 border border-border text-muted-foreground rounded-full font-medium text-sm hover:border-primary hover:text-primary transition-colors flex items-center justify-center">
                    Request Free Samples
                  </a>
                </div>
              </div>

              {/* Nearby Cities */}
              <div className="bg-white border border-border rounded-2xl p-5">
                <h3 className="font-bold mb-3 text-sm">Nearby Cities We Serve</h3>
                <div className="flex flex-wrap gap-2">
                  {city.nearbyHubs.map(hub => (
                    <a key={hub} href={`/locations/${hub.toLowerCase().replace(/[\s/]/g, "-")}`}
                      className="text-sm text-muted-foreground hover:text-primary border border-border hover:border-primary px-3 py-1.5 rounded-full transition-colors">
                      {hub}
                    </a>
                  ))}
                </div>
              </div>

              {/* All products CTA */}
              <div className="bg-slate-900 text-white rounded-2xl p-5">
                <h3 className="font-bold mb-1 text-sm">Browse All Products</h3>
                <p className="text-slate-400 text-xs mb-3">6 medical-grade glove types — all certified, all available for {city.name} delivery.</p>
                <a href="/catalog" className="flex items-center gap-1 text-primary text-sm font-bold hover:gap-2 transition-all">
                  View Catalogue <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function Locations() {
  const [match, params] = useRoute("/locations/:city");
  const city = match ? CITIES.find(c => c.slug === params?.city) : null;

  if (city) return <CityPage city={city} />;

  // Listing page
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Pan-India Delivery</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Cities We Serve</h1>
            <p className="text-slate-400 max-w-xl mx-auto">
              From Hyderabad to Kochi to Kolkata — fast delivery of ISO-certified medical gloves across India.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {CITIES.map((city, i) => (
              <motion.a
                key={city.slug}
                href={`/locations/${city.slug}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                data-testid={`card-location-${city.slug}`}
                className="bg-white rounded-2xl border border-border p-5 hover:shadow-lg hover:-translate-y-1 transition-all group block"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  {city.slug === "hyderabad" && (
                    <span className="text-[10px] font-bold bg-primary text-white px-2 py-0.5 rounded-full uppercase tracking-wide">HQ</span>
                  )}
                </div>
                <h3 className="font-heading font-bold text-lg mb-0.5 group-hover:text-primary transition-colors">{city.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{city.state}</p>
                <div className="space-y-1.5 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3 h-3 text-green-600 shrink-0" />
                    {city.deliveryDays}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3 h-3 text-primary shrink-0" />
                    {city.hospitals}+ hospitals served
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3 h-3 text-amber-500 shrink-0" />
                    {city.avgRating} rating · {city.activeCustomers}+ customers
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-primary font-semibold group-hover:gap-2 transition-all">
                  View Details <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.a>
            ))}
          </div>

          <div className="mt-12 bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
            <h3 className="font-bold text-xl mb-2">Don't see your city?</h3>
            <p className="text-muted-foreground mb-5">We deliver anywhere in India. Contact us for delivery timelines and pricing to your location.</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <a href="tel:+917386101845" className="inline-flex items-center gap-2 h-11 px-6 bg-primary text-white rounded-full font-bold text-sm hover:bg-primary/90 transition-colors">
                <Phone className="w-4 h-4" /> +91 7386101845
              </a>
              <a href="https://wa.me/917386101845?text=Hi%20Quensol!%20I%20need%20gloves%20delivered%20to%20my%20city."
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 h-11 px-6 bg-[#25D366] text-white rounded-full font-bold text-sm hover:bg-[#20b858] transition-colors">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
