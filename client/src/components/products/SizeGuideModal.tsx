import { X } from "lucide-react";

interface SizeGuideModalProps {
  onClose: () => void;
}

const SIZES = [
  { size: "XS", hand: "< 17 cm", glove: "6", weight: "< 60 kg (approx)" },
  { size: "S", hand: "17–19 cm", glove: "6.5 – 7", weight: "60–70 kg (approx)" },
  { size: "M", hand: "19–21 cm", glove: "7.5 – 8", weight: "70–85 kg (approx)" },
  { size: "L", hand: "21–23 cm", glove: "8.5 – 9", weight: "85–100 kg (approx)" },
  { size: "XL", hand: "> 23 cm", glove: "9.5 – 10", weight: "> 100 kg (approx)" },
];

export function SizeGuideModal({ onClose }: SizeGuideModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h3 className="font-heading font-bold text-xl">Glove Size Guide</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* How to measure */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
            <p className="font-bold text-sm mb-2">📏 How to Measure</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Wrap a soft measuring tape around the widest part of your hand (just below the knuckles, excluding the thumb). Note the measurement in centimeters. Use the table below to find your size.
            </p>
          </div>

          {/* Size table */}
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-border">
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Size</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Hand Circumference</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Glove Size (EN)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {SIZES.map((row) => (
                  <tr key={row.size} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-primary">{row.size}</td>
                    <td className="px-4 py-3 text-foreground">{row.hand}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.glove}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            * Sizes may vary slightly between product lines. When in doubt, size up for a comfortable fit during extended use.
          </p>

          <button
            onClick={onClose}
            className="mt-5 w-full h-10 bg-primary text-white rounded-full font-semibold text-sm hover:bg-primary/90 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
