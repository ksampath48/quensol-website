import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Package } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-md">
          <div className="text-8xl font-heading font-black text-primary/10 mb-4 select-none">404</div>
          <h1 className="text-3xl font-heading font-bold mb-3">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/">
              <Button className="w-full sm:w-auto rounded-full px-6 gap-2">
                <Home className="w-4 h-4" /> Back to Home
              </Button>
            </a>
            <a href="/catalog">
              <Button variant="outline" className="w-full sm:w-auto rounded-full px-6 gap-2 border-primary text-primary hover:bg-primary hover:text-white">
                <Package className="w-4 h-4" /> Browse Products
              </Button>
            </a>
          </div>
          <button
            onClick={() => window.history.back()}
            className="mt-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mx-auto"
          >
            <ArrowLeft className="w-4 h-4" /> Go back
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
