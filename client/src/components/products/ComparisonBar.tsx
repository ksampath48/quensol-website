import { useEffect } from "react";
import { X, ArrowRight, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ApiProduct } from "@/lib/api";

interface ComparisonBarProps {
  selected: ApiProduct[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onCompare: () => void;
}

const COLORS = ["bg-cyan-500", "bg-violet-500", "bg-amber-500"];

export function ComparisonBar({ selected, onRemove, onClear, onCompare }: ComparisonBarProps) {
  // Notify floating buttons to shift up when bar is open
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("comparison-bar", { detail: { open: selected.length > 0 } })
    );
  }, [selected.length]);

  if (selected.length === 0) return null;

  const canCompare = selected.length >= 2;

  return (
    <div
      data-testid="comparison-bar"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-2xl animate-in slide-in-from-bottom-2 duration-200"
    >
      {/* ── Mobile layout: single compact row ── */}
      <div className="md:hidden px-4 py-3 flex items-center gap-3">
        {/* Label */}
        <div className="flex items-center gap-1.5 shrink-0">
          <BarChart2 className="w-4 h-4 text-primary" />
          <span className="font-bold text-sm text-foreground">{selected.length}/3</span>
        </div>

        {/* Compact product chips */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {selected.map((p, i) => (
            <button
              key={p.id}
              onClick={() => onRemove(p.id)}
              data-testid={`compare-chip-${p.id}`}
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1 border border-border bg-muted/50 max-w-[100px] group"
            >
              <span className={cn("w-2 h-2 rounded-full shrink-0", COLORS[i])} />
              <span className="text-xs font-medium text-foreground truncate">
                {p.name.replace("Quensol ", "").replace(" Gloves", "").replace(" Examination", "")}
              </span>
              <X className="w-3 h-3 text-muted-foreground shrink-0 group-hover:text-foreground transition-colors" />
            </button>
          ))}
          {selected.length < 3 && (
            <span className="text-xs text-muted-foreground whitespace-nowrap">+ Add</span>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={onCompare}
          disabled={!canCompare}
          data-testid="btn-compare-now"
          className={cn(
            "shrink-0 h-9 px-4 rounded-full font-bold text-sm flex items-center gap-1.5 transition-all",
            canCompare
              ? "bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary/90 active:scale-95"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          Compare
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── Desktop layout: full chip row ── */}
      <div className="hidden md:flex container mx-auto px-4 py-3 items-center gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <BarChart2 className="w-4 h-4 text-primary" />
          <span className="font-bold text-sm text-foreground">
            Compare ({selected.length}/3)
          </span>
        </div>

        <div className="flex items-center gap-3 flex-1">
          {selected.map((p, i) => (
            <div
              key={p.id}
              data-testid={`compare-chip-${p.id}`}
              className="flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-full px-3 py-1.5"
            >
              <span className={cn("w-2 h-2 rounded-full", COLORS[i])} />
              <span className="text-sm font-medium text-primary max-w-[160px] truncate">
                {p.name}
              </span>
              <button
                onClick={() => onRemove(p.id)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          {[...Array(3 - selected.length)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-2 border border-dashed border-border rounded-full px-3 py-1.5"
            >
              <span className="text-xs text-muted-foreground">+ Add product</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onClear}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear all
          </button>
          <button
            onClick={onCompare}
            disabled={!canCompare}
            data-testid="btn-compare-now"
            className={cn(
              "flex items-center gap-2 h-9 px-5 rounded-full font-bold text-sm transition-all",
              canCompare
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
