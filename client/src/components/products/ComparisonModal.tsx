import { X, Check, Minus } from "lucide-react";
import type { ApiProduct } from "@/lib/api";
import { productImages } from "@/lib/data";

interface ComparisonModalProps {
  products: ApiProduct[];
  onClose: () => void;
}

const SPECS: { label: string; key: (p: ApiProduct) => string }[] = [
  { label: "Material", key: (p) => p.category },
  { label: "Price / Box", key: (p) => `₹${p.price.toLocaleString("en-IN")}` },
  { label: "Content", key: () => "100 gloves / box" },
  { label: "Powder", key: () => "Powder-Free" },
  { label: "Sterility", key: (p) => p.category === "Surgical" ? "Sterile" : "Non-Sterile" },
  { label: "AQL Rating", key: (p) => p.category === "Safety" ? "2.5" : "1.5" },
  { label: "Colour", key: (p) => p.category === "Surgical" ? "Green" : p.category === "Vinyl" ? "Clear" : "Blue" },
  { label: "Texture", key: (p) => p.category === "Vinyl" ? "Smooth" : "Textured Fingertips" },
  { label: "Shelf Life", key: () => "3 Years" },
  { label: "Latex-Free", key: (p) => ["Nitrile", "Vinyl", "Safety"].includes(p.category) ? "yes" : "no" },
  { label: "Food Safe", key: (p) => ["Nitrile", "Vinyl"].includes(p.category) ? "yes" : "no" },
  { label: "Chemical Resistant", key: (p) => ["Nitrile", "Safety"].includes(p.category) ? "yes" : "partial" },
];

function Badge({ value }: { value: string }) {
  if (value === "yes") return <span className="inline-flex items-center gap-1 text-green-600 font-semibold text-sm"><Check className="w-3.5 h-3.5" /> Yes</span>;
  if (value === "no") return <span className="inline-flex items-center gap-1 text-slate-400 text-sm"><Minus className="w-3.5 h-3.5" /> No</span>;
  if (value === "partial") return <span className="text-amber-600 font-semibold text-sm">Partial</span>;
  return <span className="text-sm text-foreground">{value}</span>;
}

export function ComparisonModal({ products, onClose }: ComparisonModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 overflow-auto">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative z-10">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-white rounded-t-2xl z-10">
          <h2 className="font-heading font-bold text-xl">Product Comparison</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Product header row */}
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-4 w-36 text-xs font-semibold text-muted-foreground uppercase tracking-wide bg-slate-50">Feature</th>
                {products.map((p) => (
                  <th key={p.id} className="px-6 py-4 text-center min-w-[200px]">
                    <div className="flex flex-col items-center gap-3">
                      {productImages[p.id] && (
                        <img src={productImages[p.id]} alt={p.name} className="w-20 h-20 object-contain" />
                      )}
                      <div>
                        <p className="font-bold text-sm text-foreground">{p.name}</p>
                        {p.badge && (
                          <span className="text-[10px] font-bold text-secondary-foreground bg-secondary px-2 py-0.5 rounded-full uppercase tracking-wide">
                            {p.badge}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          window.dispatchEvent(new CustomEvent("open-quote-form", { detail: { product: p.name } }));
                          onClose();
                        }}
                        className="w-full h-8 bg-primary text-white rounded-full text-xs font-bold hover:bg-primary/90 transition-colors"
                      >
                        Get Quote
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SPECS.map((spec, i) => (
                <tr key={spec.label} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                  <td className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap bg-slate-50 border-r border-border">
                    {spec.label}
                  </td>
                  {products.map((p) => (
                    <td key={p.id} className="px-6 py-3 text-center">
                      <Badge value={spec.key(p)} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-border text-center text-xs text-muted-foreground">
          Specifications are indicative. Confirm exact parameters with our team before ordering.
        </div>
      </div>
    </div>
  );
}
