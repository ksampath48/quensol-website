import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Play, X, Clock, Tag, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CATEGORIES = ["All", "Product Demos", "How-To Guides", "Quality & Certifications", "Customer Stories"];

interface Video {
  id: string;
  title: string;
  desc: string;
  duration: string;
  category: string;
  youtubeId: string;
}

const VIDEOS: Video[] = [
  {
    id: "v1",
    title: "Quensol Nitrile Exam Gloves — Full Product Demo",
    desc: "See AQL 1.5 powder-free nitrile gloves tested for puncture resistance, tensile strength, and fit across all five sizes.",
    duration: "4:32",
    category: "Product Demos",
    youtubeId: "8piqd2BWeaI",
  },
  {
    id: "v2",
    title: "Latex Surgical Sterile Gloves — Unboxing & Test",
    desc: "Step-by-step unboxing of our sterile latex surgical gloves, including donning technique and sterility verification.",
    duration: "3:18",
    category: "Product Demos",
    youtubeId: "bHQqvYy5KYo",
  },
  {
    id: "v3",
    title: "Heavy Duty Safety Gloves — Cut Resistance Demo",
    desc: "Live blade-resistance test on our EN 388 Level 4 safety gloves for industrial and hospital housekeeping use.",
    duration: "2:45",
    category: "Product Demos",
    youtubeId: "LXb3EKWsInQ",
  },
  {
    id: "v4",
    title: "How to Choose the Right Medical Glove",
    desc: "A practical guide comparing nitrile vs latex vs vinyl — covering allergy risk, AQL, thickness, and cost per glove.",
    duration: "6:10",
    category: "How-To Guides",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "v5",
    title: "Glove Sizing Guide — Find Your Perfect Fit",
    desc: "How to measure hand circumference and map it to XS–XL glove sizes for clinical and surgical use.",
    duration: "2:20",
    category: "How-To Guides",
    youtubeId: "9bZkp7q19f0",
  },
  {
    id: "v6",
    title: "How to Set Up a Standing Order with Quensol",
    desc: "Walk through the standing order portal, set dispatch frequency, lock pricing, and manage monthly stock automatically.",
    duration: "3:55",
    category: "How-To Guides",
    youtubeId: "M7lc1UVf-VE",
  },
  {
    id: "v7",
    title: "ISO 9001:2015 & CE EN 455 — Our Certification Process",
    desc: "A behind-the-scenes look at how Quensol maintains ISO 9001 quality management and CE marking across all product lines.",
    duration: "5:40",
    category: "Quality & Certifications",
    youtubeId: "ktvTqknDobU",
  },
  {
    id: "v8",
    title: "AQL 1.5 Testing — What It Means for Your Hospital",
    desc: "Learn what Acceptable Quality Level 1.5 means, how batch testing is done, and why it matters for clinical safety.",
    duration: "4:15",
    category: "Quality & Certifications",
    youtubeId: "fJ9rUzIMcZQ",
  },
  {
    id: "v9",
    title: "Apollo Pharmacy — Switching to Quensol Nitrile",
    desc: "How Apollo Pharmacy reduced glove procurement cost by 18% while upgrading to AQL 1.5 nitrile across 40 branches.",
    duration: "3:02",
    category: "Customer Stories",
    youtubeId: "YQHsXMglC9A",
  },
  {
    id: "v10",
    title: "Nellore District Hospital — Bulk Supply Case Study",
    desc: "District government hospital shares how Quensol's standing order solved their recurring stock shortage problem.",
    duration: "4:48",
    category: "Customer Stories",
    youtubeId: "CevxZvSJLk8",
  },
  {
    id: "v11",
    title: "Vinyl Gloves vs Nitrile — Cost & Performance Breakdown",
    desc: "Side-by-side comparison of vinyl and nitrile gloves for high-volume, low-risk clinical tasks like food prep and housekeeping.",
    duration: "3:30",
    category: "Product Demos",
    youtubeId: "OPf0YbXqDm0",
  },
  {
    id: "v12",
    title: "How to Request Free Samples from Quensol",
    desc: "A quick walkthrough of the free sample request portal — choose up to 3 product types and receive them within 48 hours.",
    duration: "1:55",
    category: "How-To Guides",
    youtubeId: "hTWKbfoikeg",
  },
];

function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
      data-testid="video-modal-backdrop"
    >
      <div
        className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-1.5 transition-colors"
          data-testid="video-modal-close"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <div className="bg-slate-900 px-5 py-4">
          <p className="font-semibold text-white text-sm">{video.title}</p>
          <p className="text-slate-400 text-xs mt-1">{video.desc}</p>
        </div>
      </div>
    </div>
  );
}

function VideoCard({ video, onPlay }: { video: Video; onPlay: () => void }) {
  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
      onClick={onPlay}
      data-testid={`card-video-${video.id}`}
    >
      <div className="relative aspect-video bg-slate-100 overflow-hidden">
        <img
          src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 text-primary fill-primary ml-1" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-md flex items-center gap-1">
          <Clock className="w-3 h-3" /> {video.duration}
        </div>
        <div className="absolute top-2 left-2 bg-primary/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
          <Tag className="w-3 h-3" /> {video.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-2">
          {video.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2">{video.desc}</p>
      </div>
    </div>
  );
}

export default function Videos() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  const filtered = activeCategory === "All"
    ? VIDEOS
    : VIDEOS.filter(v => v.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-slate-900 via-primary/90 to-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary-foreground/70 text-sm font-semibold tracking-widest uppercase mb-3">Video Library</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">See Quensol in Action</h1>
          <p className="text-white/75 max-w-xl mx-auto text-base">
            Product demos, how-to guides, quality certification explainers, and real customer stories — all in one place.
          </p>
          <p className="mt-3 text-white/50 text-sm">{VIDEOS.length} videos across {CATEGORIES.length - 1} categories</p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-testid={`filter-video-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                  activeCategory === cat
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-white text-muted-foreground border-border hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <main className="container mx-auto px-4 py-10 flex-1">
        <p className="text-sm text-muted-foreground mb-6">
          Showing <span className="font-semibold text-foreground">{filtered.length}</span> video{filtered.length !== 1 ? "s" : ""}
          {activeCategory !== "All" && <> in <span className="font-semibold text-primary">{activeCategory}</span></>}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(video => (
            <VideoCard key={video.id} video={video} onPlay={() => setActiveVideo(video)} />
          ))}
        </div>
      </main>

      {/* CTA Banner */}
      <section className="bg-primary/5 border-t border-primary/15 py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold mb-1">Ready to Order?</h2>
            <p className="text-muted-foreground text-sm">Get bulk pricing tailored to your hospital or clinic within 2 hours.</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <a href="/samples">
              <Button variant="outline" className="rounded-full gap-2" data-testid="btn-free-samples">
                Request Free Samples <ChevronRight className="w-4 h-4" />
              </Button>
            </a>
            <a
              href={`https://wa.me/917386101845?text=${encodeURIComponent("Hi Quensol, I watched your videos and want to enquire about bulk pricing.")}`}
              target="_blank" rel="noopener noreferrer"
            >
              <Button className="rounded-full gap-2 bg-green-600 hover:bg-green-700" data-testid="btn-whatsapp-videos">
                WhatsApp Us <ChevronRight className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />}
    </div>
  );
}
