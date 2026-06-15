import { useRoute, useLocation } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { blogPosts } from "@/lib/blog-data";
import { ArrowLeft, Clock, Tag, Share2 } from "lucide-react";
import { motion } from "framer-motion";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const [, navigate] = useLocation();

  const post = blogPosts.find(p => p.slug === params?.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Article not found</h2>
            <button onClick={() => navigate("/blog")} className="text-primary hover:underline">← Back to Resources</button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const others = blogPosts.filter(p => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Back */}
          <button
            onClick={() => navigate("/blog")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Resources
          </button>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{post.category}</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
              <span className="text-xs text-muted-foreground">{post.date}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-tight">{post.title}</h1>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{post.excerpt}</p>

            <div className="flex items-center justify-between py-4 border-y border-border mb-8">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">Q</div>
                <div>
                  <p className="font-semibold text-sm">{post.author}</p>
                  <p className="text-xs text-muted-foreground">{post.authorRole}</p>
                </div>
              </div>
              <button
                onClick={() => navigator.clipboard?.writeText(window.location.href)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </motion.div>

          {/* Content */}
          <div className="prose prose-slate max-w-none">
            {post.content.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="mb-6"
              >
                {section.heading && (
                  <h2 className="text-xl font-heading font-bold text-foreground mb-3 mt-8">{section.heading}</h2>
                )}
                <p className="text-muted-foreground leading-relaxed">{section.body}</p>
              </motion.div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-border">
            {post.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                <Tag className="w-3 h-3" />{tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
            <h3 className="font-bold text-lg mb-2">Ready to order?</h3>
            <p className="text-muted-foreground text-sm mb-4">Get a customised bulk quote within 2 hours.</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("open-quote-form", { detail: {} }))}
                className="h-10 px-6 bg-primary text-white rounded-full font-bold text-sm hover:bg-primary/90 transition-colors"
              >
                Get a Quote
              </button>
              <a href="/samples" className="h-10 px-6 border border-primary text-primary rounded-full font-bold text-sm hover:bg-primary hover:text-white transition-colors flex items-center">
                Request Samples
              </a>
            </div>
          </div>

          {/* More articles */}
          {others.length > 0 && (
            <div className="mt-14">
              <h3 className="font-heading font-bold text-xl mb-6">More Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {others.map(p => (
                  <div
                    key={p.slug}
                    onClick={() => navigate(`/blog/${p.slug}`)}
                    className="bg-white border border-border rounded-xl p-4 cursor-pointer hover:border-primary hover:shadow-sm transition-all"
                  >
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{p.category}</span>
                    <p className="font-semibold text-sm mt-2 hover:text-primary">{p.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{p.readTime}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
