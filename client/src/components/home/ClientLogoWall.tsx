const LOGOS = [
  { name: "Apollo Hospitals", short: "Apollo" },
  { name: "Fortis Healthcare", short: "Fortis" },
  { name: "AIIMS Delhi", short: "AIIMS" },
  { name: "Max Healthcare", short: "Max" },
  { name: "Manipal Hospitals", short: "Manipal" },
  { name: "Medanta", short: "Medanta" },
  { name: "Yashoda Hospitals", short: "Yashoda" },
  { name: "Care Hospitals", short: "Care" },
  { name: "Narayana Health", short: "Narayana" },
  { name: "Kamineni Hospitals", short: "Kamineni" },
  { name: "KIMS Hospital", short: "KIMS" },
  { name: "Rainbow Children's", short: "Rainbow" },
];

const COLORS = [
  "bg-blue-50 text-blue-700 border-blue-100",
  "bg-cyan-50 text-cyan-700 border-cyan-100",
  "bg-teal-50 text-teal-700 border-teal-100",
  "bg-indigo-50 text-indigo-700 border-indigo-100",
  "bg-sky-50 text-sky-700 border-sky-100",
  "bg-emerald-50 text-emerald-700 border-emerald-100",
];

export function ClientLogoWall() {
  const track = [...LOGOS, ...LOGOS];

  return (
    <section className="py-16 bg-white border-y border-border overflow-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 28s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="container mx-auto px-4 mb-8 text-center">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
          Trusted by 500+ healthcare institutions across India
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, white, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, white, transparent)" }} />

        <div className="flex marquee-track" style={{ width: "max-content" }}>
          {track.map((logo, i) => (
            <div
              key={i}
              title={logo.name}
              className={`mx-3 flex items-center gap-2.5 px-5 py-3 rounded-xl border font-bold text-sm whitespace-nowrap shrink-0 select-none cursor-default ${COLORS[i % COLORS.length]}`}
            >
              <div className="w-7 h-7 rounded-md bg-current/10 flex items-center justify-center font-black text-xs shrink-0">
                {logo.short.slice(0, 2).toUpperCase()}
              </div>
              {logo.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
