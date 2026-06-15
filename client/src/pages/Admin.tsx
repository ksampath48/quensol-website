import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircle, Circle, XCircle, Mail, Phone, Package, Calendar, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const PASSWORD = "quensol2025";

interface Enquiry {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  product: string;
  quantity?: number;
  message?: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

const STATUS_CONFIG = {
  new: { label: "New", color: "bg-blue-100 text-blue-700", icon: Circle },
  contacted: { label: "Contacted", color: "bg-yellow-100 text-yellow-700", icon: CheckCircle },
  closed: { label: "Closed", color: "bg-green-100 text-green-700", icon: XCircle },
};

async function fetchEnquiries(): Promise<Enquiry[]> {
  const r = await fetch("/api/enquiries", {
    headers: { "x-admin-key": PASSWORD },
  });
  if (!r.ok) throw new Error("Failed to load enquiries");
  return r.json();
}

async function updateStatus(id: string, status: string) {
  const r = await fetch(`/api/enquiries/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "x-admin-key": PASSWORD },
    body: JSON.stringify({ status }),
  });
  if (!r.ok) throw new Error("Failed to update status");
  return r.json();
}

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [filter, setFilter] = useState<"all" | "new" | "contacted" | "closed">("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const qc = useQueryClient();
  const { data: enquiries = [], isLoading } = useQuery<Enquiry[]>({
    queryKey: ["/api/enquiries"],
    queryFn: fetchEnquiries,
    enabled: authed,
    refetchInterval: 30000,
  });

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => updateStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/enquiries"] }),
  });

  if (!authed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl mb-6 mx-auto">Q</div>
          <h1 className="text-2xl font-bold text-center mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground text-center text-sm mb-8">Quensol Enquiry Management</p>
          <form onSubmit={(e) => { e.preventDefault(); if (password === PASSWORD) setAuthed(true); }}>
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 px-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 mb-4"
              placeholder="Enter admin password"
              data-testid="input-admin-password"
            />
            <button type="submit" className="w-full h-10 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary/90" data-testid="btn-admin-login">
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filtered = filter === "all" ? enquiries : enquiries.filter((e) => e.status === filter);
  const counts = {
    all: enquiries.length,
    new: enquiries.filter((e) => e.status === "new").length,
    contacted: enquiries.filter((e) => e.status === "contacted").length,
    closed: enquiries.filter((e) => e.status === "closed").length,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">Q</div>
            <div>
              <span className="font-bold text-sm">Quensol Admin</span>
              <span className="text-muted-foreground text-xs ml-2">Enquiry Dashboard</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">← Back to Site</a>
            <button onClick={() => setAuthed(false)} className="text-sm text-red-500 hover:text-red-600">Sign Out</button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {(["all", "new", "contacted", "closed"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              data-testid={`btn-filter-${s}`}
              className={cn(
                "bg-white rounded-xl p-4 text-left border-2 transition-all hover:shadow-sm",
                filter === s ? "border-primary" : "border-transparent shadow-sm"
              )}
            >
              <p className="text-3xl font-bold text-foreground">{counts[s]}</p>
              <p className="text-sm text-muted-foreground mt-1 capitalize">{s === "all" ? "Total Enquiries" : s}</p>
            </button>
          ))}
        </div>

        {/* Enquiries */}
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-20 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-xl p-16 text-center shadow-sm">
            <p className="text-2xl font-bold mb-2">No enquiries yet</p>
            <p className="text-muted-foreground text-sm">
              {filter === "all" ? "Enquiries submitted through the website will appear here." : `No ${filter} enquiries.`}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((enq) => {
              const cfg = STATUS_CONFIG[enq.status];
              const Icon = cfg.icon;
              const isOpen = expanded === enq.id;
              return (
                <div key={enq.id} className="bg-white rounded-xl shadow-sm border border-border overflow-hidden" data-testid={`card-enquiry-${enq.id}`}>
                  <button
                    className="w-full px-5 py-4 flex items-center gap-4 text-left hover:bg-slate-50 transition-colors"
                    onClick={() => setExpanded(isOpen ? null : enq.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <p className="font-semibold text-sm">{enq.firstName} {enq.lastName}</p>
                        <span className="text-muted-foreground text-xs">·</span>
                        <p className="text-muted-foreground text-xs">{enq.company}</p>
                        <span className={cn("px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 ml-1", cfg.color)}>
                          <Icon className="w-3 h-3" /> {cfg.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 flex-wrap">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Package className="w-3 h-3" /> {enq.product}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(enq.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                        </span>
                      </div>
                    </div>
                    <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform shrink-0", isOpen && "rotate-180")} />
                  </button>

                  {isOpen && (
                    <div className="border-t border-border px-5 py-4 bg-slate-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="w-4 h-4 shrink-0" />
                          <a href={`mailto:${enq.email}`} className="text-primary hover:underline">{enq.email}</a>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="w-4 h-4 shrink-0" />
                          <a href={`tel:${enq.phone}`} className="text-primary hover:underline">{enq.phone}</a>
                        </div>
                        {enq.quantity && (
                          <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Quantity:</span> {enq.quantity} boxes</p>
                        )}
                        {enq.message && (
                          <p className="text-sm text-muted-foreground md:col-span-2"><span className="font-medium text-foreground">Message:</span> {enq.message}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mr-1">Update Status:</span>
                        {(["new", "contacted", "closed"] as const).map((s) => (
                          <button
                            key={s}
                            onClick={() => mutation.mutate({ id: enq.id, status: s })}
                            disabled={enq.status === s || mutation.isPending}
                            data-testid={`btn-status-${s}-${enq.id}`}
                            className={cn(
                              "px-3 py-1 rounded-full text-xs font-semibold transition-all border",
                              enq.status === s
                                ? `${STATUS_CONFIG[s].color} border-transparent`
                                : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                            )}
                          >
                            {STATUS_CONFIG[s].label}
                          </button>
                        ))}
                        <div className="flex gap-2 ml-auto">
                          <a href={`mailto:${enq.email}?subject=Re: Your Enquiry for ${enq.product}&body=Dear ${enq.firstName},%0A%0AThank you for your interest in ${enq.product}.`}
                            className="px-3 py-1 bg-primary text-white rounded-full text-xs font-semibold hover:bg-primary/90 transition-colors">
                            Reply by Email
                          </a>
                          <a
                            href={`https://wa.me/${enq.phone.replace(/\D/g, "")}?text=Hello%20${enq.firstName},%20this%20is%20Quensol%20team.%20Regarding%20your%20enquiry%20for%20${encodeURIComponent(enq.product)}.`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1 bg-green-600 text-white rounded-full text-xs font-semibold hover:bg-green-700 transition-colors"
                          >
                            WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
