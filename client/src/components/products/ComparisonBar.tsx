import { X, ArrowRight, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ApiProduct } from "@/lib/api";

interface ComparisonBarProps {
  selected: ApiProduct[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onCompare: () => void;
}

export function ComparisonBar({ selected, onRemove, onClear, onCompare }: ComparisonBarProps) {
  if (selected.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-border shadow-2xl animate-in slide-in-from-bottom-4 duration-200">
      <div className="container mx-auto px-4 py-3 flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 shrink-0">
          <BarChart2 className="w-4 h-4 text-primary" />
          <span className="font-bold text-sm text-foreground">Compare ({selected.length}/3)</span>
        </div>

        <div className="flex items-center gap-3 flex-1 flex-wrap">
          {selected.map((p) => (
            <div key={p.id} className="flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-full px-3 py-1.5" data-testid={`compare-chip-${p.id}`}>
              <span className="text-sm font-medium text-primary max-w-[140px] truncate">{p.name}</span>
              <button onClick={() => onRemove(p.id)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          {/* Empty slots */}
          {[...Array(3 - selected.length)].map((_, i) => (
            <div key={i} className="flex items-center gap-2 border border-dashed border-border rounded-full px-3 py-1.5">
              <span className="text-xs text-muted-foreground">+ Add product</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button onClick={onClear} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Clear all
          </button>
          <button
            onClick={onCompare}
            disabled={selected.length < 2}
            data-testid="btn-compare-now"
            className={cn(
              "flex items-center gap-2 h-9 px-5 rounded-full font-bold text-sm transition-all",
              selected.length >= 2
                ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            Compare Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
