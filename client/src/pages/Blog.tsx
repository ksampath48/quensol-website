import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { blogPosts } from "@/lib/blog-data";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

const CATEGORIES = ["All", "Buying Guide", "Technical Guide", "Procurement"];

export default function Blog() {
  const [active, setActive] = useState("All");
  const [, navigate] = useLocation();

  const filtered = active === "All" ? blogPosts : blogPosts.filter(p => p.category === active);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        {/* Header */}
        <div className="bg-slate-50 border-b border-border py-14">
          <div className="container mx-auto px-4 text-center">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Knowledge Base</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Resources & Guides</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Practical guides for hospital purchase managers, lab professionals, and procurement officers.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium border transition-all",
                  active === cat ? "bg-primary text-white border-primary" : "bg-white border-border text-muted-foreground hover:border-primary hover:text-primary"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured post */}
          {active === "All" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => navigate(`/blog/${blogPosts[0].slug}`)}
              className="bg-white rounded-2xl border border-border p-8 mb-8 cursor-pointer hover:shadow-lg transition-shadow group"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Featured</span>
                    <span className="text-xs text-muted-foreground bg-slate-100 px-3 py-1 rounded-full">{blogPosts[0].category}</span>
                  </div>
                  <h2 className="text-2xl font-heading font-bold mb-3 group-hover:text-primary transition-colors">{blogPosts[0].title}</h2>
                  <p className="text-muted-foreground mb-5 leading-relaxed">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {blogPosts[0].readTime}</span>
                    <span>{blogPosts[0].date}</span>
                    <span className="flex items-center gap-1 text-primary font-semibold group-hover:gap-2 transition-all">Read Article <ArrowRight className="w-3.5 h-3.5" /></span>
                  </div>
                </div>
                <div className="md:w-64 bg-primary/5 rounded-xl flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="text-5xl mb-2">🧤</div>
                    <p className="text-xs text-muted-foreground font-medium">{blogPosts[0].category}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(active === "All" ? filtered.slice(1) : filtered).map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => navigate(`/blog/${post.slug}`)}
                className="bg-white rounded-2xl border border-border p-6 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 group flex flex-col"
                data-testid={`card-blog-${post.slug}`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{post.category}</span>
                </div>
                <h3 className="font-heading font-bold text-lg mb-3 group-hover:text-primary transition-colors flex-1">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border mt-auto">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                  <span>{post.date}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {post.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="flex items-center gap-1 text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                      <Tag className="w-2.5 h-2.5" />{tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="container mx-auto px-4 mt-8">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
            <h3 className="font-bold text-xl mb-2">Have a specific question?</h3>
            <p className="text-muted-foreground mb-5">Our team is happy to advise on glove selection, sizing, or procurement for your facility.</p>
            <button
              onClick={() => window.open("https://wa.me/917386101845?text=Hi%2C%20I%20have%20a%20technical%20question%20about%20gloves.", "_blank")}
              className="inline-flex items-center gap-2 h-11 px-6 bg-[#25D366] text-white rounded-full font-bold text-sm hover:bg-[#20b858] transition-colors"
            >
              Ask on WhatsApp
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
