export function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <span className="font-heading font-bold text-xl">MediGlove</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              The trusted partner for healthcare professionals worldwide. Ensuring safety, one pair at a time.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Shop</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#" className="hover:text-primary transition-colors">Nitrile Gloves</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Latex Gloves</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Vinyl Gloves</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Surgical Sterile</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Support</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#" className="hover:text-primary transition-colors">Order Status</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Bulk Quotes</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>support@mediglove.direct</li>
              <li>1-800-GLOVES</li>
              <li>123 Medical Plaza, Suite 100<br/>Boston, MA 02115</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; 2024 MediGlove Direct. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
