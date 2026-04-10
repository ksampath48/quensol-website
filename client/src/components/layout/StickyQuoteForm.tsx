import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, X } from "lucide-react";
import { useForm } from "react-form"; // We will mock this simply

export function StickyQuoteForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-primary text-white p-4 rounded-full shadow-2xl hover:bg-primary/90 transition-all hover:scale-105 flex items-center gap-2 group"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="font-bold hidden max-w-0 group-hover:max-w-xs group-hover:block transition-all whitespace-nowrap overflow-hidden">
          Request Quote
        </span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-primary p-6 text-white flex justify-between items-center shrink-0">
              <div>
                <h3 className="font-heading font-bold text-xl">Request a Bulk Quote</h3>
                <p className="text-primary-foreground/80 text-sm">We typically respond within 2 hours.</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              {isSubmitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-xl mb-2">Request Received!</h4>
                  <p className="text-muted-foreground">Our sales team will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Name *</label>
                      <input required className="w-full h-10 px-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name</label>
                      <input className="w-full h-10 px-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company Name *</label>
                    <input required className="w-full h-10 px-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address *</label>
                    <input required type="email" className="w-full h-10 px-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number *</label>
                    <input required type="tel" className="w-full h-10 px-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Product</label>
                      <select className="w-full h-10 px-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <option>Nitrile Gloves</option>
                        <option>Latex Gloves</option>
                        <option>Vinyl Gloves</option>
                        <option>Safety Gloves</option>
                        <option>Mixed Order</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Quantity (Boxes)</label>
                      <input type="number" min="10" placeholder="Min 10" className="w-full h-10 px-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 mt-4 text-base font-bold shadow-lg shadow-primary/20"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending Request..." : "Submit Quote Request"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
