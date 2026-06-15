import { useRoute } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MapPin, Phone, Clock, Truck, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CityData {
  slug: string;
  name: string;
  state: string;
  deliveryDays: string;
  hospitals: number;
  description: string;
  areas: string[];
  majorHospitals: string[];
  nearbyHubs: string[];
}

const CITIES: CityData[] = [
  {
    slug: "hyderabad", name: "Hyderabad", state: "Telangana", deliveryDays: "Same Day / Next Day",
    hospitals: 140, description: "Quensol is headquartered in Hyderabad, making it the fastest-served city in our network. We offer same-day dispatch for orders placed before 12 PM IST and maintain a large local stock across all SKUs.",
    areas: ["Banjara Hills", "Jubilee Hills", "Kondapur", "Gachibowli", "Secunderabad", "Kukatpally", "LB Nagar", "Dilsukhnagar"],
    majorHospitals: ["Apollo Hospitals", "Care Hospitals", "Yashoda Hospitals", "NIMS", "Gandhi Hospital", "Continental Hospitals"],
    nearbyHubs: ["Pune", "Bengaluru", "Chennai"],
  },
  {
    slug: "mumbai", name: "Mumbai", state: "Maharashtra", deliveryDays: "2–3 Business Days",
    hospitals: 400, description: "Mumbai is one of our highest-volume markets. We serve hospitals, diagnostic labs, and pharmaceutical companies across South Mumbai, Thane, Navi Mumbai, and the extended MMR region.",
    areas: ["Andheri", "Bandra", "Dadar", "Lower Parel", "Thane", "Navi Mumbai", "Borivali", "Malad"],
    majorHospitals: ["Lilavati Hospital", "Breach Candy Hospital", "Kokilaben Dhirubhai Ambani", "Tata Memorial", "Hinduja Hospital", "Holy Family Hospital"],
    nearbyHubs: ["Pune", "Surat", "Nashik"],
  },
  {
    slug: "delhi", name: "Delhi / NCR", state: "Delhi & Haryana", deliveryDays: "2–3 Business Days",
    hospitals: 600, description: "We supply medical gloves to hospitals and medical institutions across Delhi NCR including Gurugram, Noida, Faridabad, and Ghaziabad through our registered courier partners.",
    areas: ["Connaught Place", "South Delhi", "Gurugram", "Noida", "Faridabad", "Ghaziabad", "Dwarka", "Rohini"],
    majorHospitals: ["AIIMS", "Max Healthcare", "Fortis Hospital", "Apollo Delhi", "Sir Ganga Ram Hospital", "BLK Super Speciality"],
    nearbyHubs: ["Jaipur", "Chandigarh", "Agra"],
  },
  {
    slug: "bengaluru", name: "Bengaluru", state: "Karnataka", deliveryDays: "2–3 Business Days",
    hospitals: 320, description: "Bengaluru's growing healthcare and biotech ecosystem is a key market for Quensol. We serve hospitals, pharma R&D labs, and biotech companies in Electronic City, Whitefield, and across the city.",
    areas: ["Whitefield", "Electronic City", "Koramangala", "Indiranagar", "Jayanagar", "Hebbal", "Marathahalli", "HSR Layout"],
    majorHospitals: ["Manipal Hospital", "Narayana Health", "Apollo Bengaluru", "Fortis Cunningham", "St. John's Hospital", "Sakra World Hospital"],
    nearbyHubs: ["Mysuru", "Mangaluru", "Hubli"],
  },
  {
    slug: "chennai", name: "Chennai", state: "Tamil Nadu", deliveryDays: "2–3 Business Days",
    hospitals: 280, description: "Chennai is a major medical tourism hub. We supply nitrile and surgical gloves to multi-specialty hospitals across the city and to pharmaceutical manufacturing units in nearby Oragadam and Sriperumbudur.",
    areas: ["Anna Nagar", "T. Nagar", "Adyar", "Velachery", "OMR", "Perambur", "Chromepet", "Tambaram"],
    majorHospitals: ["Apollo Chennai", "Fortis Malar", "MIOT International", "Sri Ramachandra Hospital", "Vijaya Hospital", "Billroth Hospitals"],
    nearbyHubs: ["Coimbatore", "Madurai", "Pondicherry"],
  },
  {
    slug: "pune", name: "Pune", state: "Maharashtra", deliveryDays: "2–3 Business Days",
    hospitals: 180, description: "Pune's pharma belt (Hinjawadi, Pimpri-Chinchwad) and growing healthcare sector make it one of our fastest-growing markets. We serve hospitals, CROs, and pharma companies with quick turnaround.",
    areas: ["Hinjawadi", "Kothrud", "Viman Nagar", "Pimpri-Chinchwad", "Kalyani Nagar", "Hadapsar", "Baner", "Wakad"],
    majorHospitals: ["Ruby Hall Clinic", "Jehangir Hospital", "KEM Hospital", "Deenanath Mangeshkar", "Aditya Birla Memorial", "Sahyadri Hospitals"],
    nearbyHubs: ["Mumbai", "Nashik", "Solapur"],
  },
];

export default function Locations() {
  const [match, params] = useRoute("/locations/:city");
  const city = match ? CITIES.find(c => c.slug === params?.city) : null;

  // City detail page
  if (city) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-20">
          <div className="bg-slate-50 border-b border-border py-12">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <a href="/locations" className="hover:text-primary">Locations</a>
                <span>›</span>
                <span className="text-foreground">{city.name}</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-2">
                    <MapPin className="w-4 h-4" /> {city.state}
                  </div>
                  <h1 className="text-4xl font-heading font-bold">Medical Glove Supplier in {city.name}</h1>
                  <p className="text-muted-foreground mt-2 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-green-600" />
                    Delivery: <strong>{city.deliveryDays}</strong>
                    <span className="mx-2">·</span>
                    <strong>{city.hospitals}+</strong> hospitals served
                  </p>
                </div>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("open-quote-form", { detail: {} }))}
                  className="shrink-0 h-11 px-6 bg-primary text-white rounded-full font-bold text-sm hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  Get Quote for {city.name} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Why Choose Quensol in {city.name}?</h2>
                  <p className="text-muted-foreground leading-relaxed">{city.description}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Areas We Serve in {city.name}</h2>
                  <div className="flex flex-wrap gap-2">
                    {city.areas.map(area => (
                      <span key={area} className="text-sm bg-primary/5 text-primary border border-primary/20 px-3 py-1.5 rounded-full font-medium">{area}</span>
                    ))}
                    <span className="text-sm bg-slate-100 text-muted-foreground px-3 py-1.5 rounded-full">+ all surrounding areas</span>
                  </div>
                </div>

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
              </div>

              <div className="space-y-5">
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
                  <h3 className="font-bold mb-4">Contact for {city.name}</h3>
                  <div className="space-y-3 text-sm">
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
                  <button
                    onClick={() => window.open("https://wa.me/917386101845?text=Hi%2C%20I%20need%20a%20quote%20for%20" + encodeURIComponent(city.name), "_blank")}
                    className="w-full mt-5 h-10 bg-[#25D366] text-white rounded-full font-bold text-sm hover:bg-[#20b858] transition-colors flex items-center justify-center gap-2"
                  >
                    WhatsApp for {city.name}
                  </button>
                </div>

                <div className="bg-white border border-border rounded-2xl p-6">
                  <h3 className="font-bold mb-4">Nearby Cities</h3>
                  <div className="flex flex-wrap gap-2">
                    {city.nearbyHubs.map(hub => (
                      <a key={hub} href={`/locations/${hub.toLowerCase().replace(/\s/g, "-")}`}
                        className="text-sm text-muted-foreground hover:text-primary border border-border hover:border-primary px-3 py-1 rounded-full transition-colors">
                        {hub}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Locations listing page
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="bg-slate-50 border-b border-border py-14">
          <div className="container mx-auto px-4 text-center">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Pan-India Delivery</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Cities We Serve</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From Hyderabad to Mumbai to Delhi — we supply medical gloves across India with fast, reliable delivery.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CITIES.map((city, i) => (
              <motion.a
                key={city.slug}
                href={`/locations/${city.slug}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                data-testid={`card-location-${city.slug}`}
                className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg hover:-translate-y-1 transition-all group block"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  {city.slug === "hyderabad" && (
                    <span className="text-[10px] font-bold bg-primary text-white px-2 py-0.5 rounded-full uppercase tracking-wide">HQ City</span>
                  )}
                </div>
                <h3 className="font-heading font-bold text-xl mb-1 group-hover:text-primary transition-colors">{city.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{city.state}</p>
                <div className="space-y-2 text-sm text-muted-foreground mb-5">
                  <div className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-green-600 shrink-0" />
                    {city.deliveryDays}
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />
                    {city.hospitals}+ hospitals served
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-primary font-semibold group-hover:gap-2 transition-all">
                  View Details <ArrowRight className="w-4 h-4" />
                </div>
              </motion.a>
            ))}
          </div>

          <div className="mt-12 bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
            <h3 className="font-bold text-xl mb-2">Don't see your city?</h3>
            <p className="text-muted-foreground mb-5">We deliver anywhere in India. Contact us for delivery timelines and pricing to your location.</p>
            <a href="tel:+917386101845" className="inline-flex items-center gap-2 h-11 px-6 bg-primary text-white rounded-full font-bold text-sm hover:bg-primary/90 transition-colors">
              📞 Call +91 7386101845
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
