import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">Q</div>
              <div>
                <span className="font-heading font-bold text-xl">Quensol</span>
                <span className="text-slate-500 text-[10px] ml-1 uppercase tracking-widest">Direct</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              The trusted partner for healthcare professionals and industrial suppliers across India. Ensuring safety, one pair at a time.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* WhatsApp */}
              <a
                href="https://wa.me/917386101845"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-[#25D366] rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.535 5.849L.057 23.516a.5.5 0 0 0 .614.622l5.814-1.524A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.92 0-3.72-.51-5.27-1.4l-.38-.22-3.44.9.92-3.36-.25-.39A9.964 9.964 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
              </a>
              {/* Email */}
              <a
                href="mailto:support@quensol.com"
                className="w-9 h-9 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              {/* Phone */}
              <a
                href="tel:+917386101845"
                className="w-9 h-9 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-300">Shop</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="/catalog" className="hover:text-primary transition-colors">All Products</a></li>
              <li><a href="/catalog?cat=Nitrile" className="hover:text-primary transition-colors">Nitrile Gloves</a></li>
              <li><a href="/catalog?cat=Latex" className="hover:text-primary transition-colors">Latex Gloves</a></li>
              <li><a href="/catalog?cat=Vinyl" className="hover:text-primary transition-colors">Vinyl Gloves</a></li>
              <li><a href="/catalog?cat=Surgical" className="hover:text-primary transition-colors">Surgical Sterile</a></li>
              <li><a href="/catalog?cat=Safety" className="hover:text-primary transition-colors">Safety Gloves</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-300">Support</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("open-quote-form", { detail: {} }))}
                  className="hover:text-primary transition-colors"
                >
                  Request a Quote
                </button>
              </li>
              <li><a href="/shipping" className="hover:text-primary transition-colors">Shipping Policy</a></li>
              <li><a href="/returns" className="hover:text-primary transition-colors">Returns & Refunds</a></li>
              <li><a href="mailto:support@quensol.com" className="hover:text-primary transition-colors">Email Support</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-300">Contact Us</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <a href="tel:+917386101845" className="hover:text-white transition-colors">+91 7386101845</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <a href="mailto:support@quensol.com" className="hover:text-white transition-colors">support@quensol.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <span>Industrial Estate,<br />Hyderabad, Telangana 500081</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Certifications */}
        <div className="border-t border-slate-800 pt-8 pb-6">
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {["ISO 9001:2015", "CE Marked", "FDA Listed", "ASTM D6319", "EN 374"].map((cert) => (
              <span key={cert} className="text-xs text-slate-500 border border-slate-700 px-3 py-1 rounded-md">
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Quensol Direct. All rights reserved.</p>
          <div className="flex gap-5 flex-wrap justify-center">
            <a href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="/shipping" className="hover:text-slate-300 transition-colors">Shipping Policy</a>
            <a href="/returns" className="hover:text-slate-300 transition-colors">Returns</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
