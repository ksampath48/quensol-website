import { Switch, Route, useLocation } from "wouter";
import { lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/i18n";
import { StickyQuoteForm } from "@/components/layout/StickyQuoteForm";
import { DualCTABar } from "@/components/layout/DualCTABar";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { PageLoader } from "@/components/ui/PageLoader";
import { AnimatePresence, motion } from "framer-motion";

const Home = lazy(() => import("@/pages/Home"));
const Catalog = lazy(() => import("@/pages/Catalog"));
const ProductDetails = lazy(() => import("@/pages/ProductDetails"));
const Admin = lazy(() => import("@/pages/Admin"));
const Legal = lazy(() => import("@/pages/Legal"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Locations = lazy(() => import("@/pages/Locations"));
const SampleRequest = lazy(() => import("@/pages/SampleRequest"));
const StandingOrder = lazy(() => import("@/pages/StandingOrder"));
const Distributor = lazy(() => import("@/pages/Distributor"));
const Videos = lazy(() => import("@/pages/Videos"));
const HospitalProcurement = lazy(() => import("@/pages/HospitalProcurement"));
const PrivateLabel = lazy(() => import("@/pages/PrivateLabel"));
const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/catalog" component={Catalog} />
          <Route path="/product/:id" component={ProductDetails} />
          <Route path="/admin" component={Admin} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="/locations" component={Locations} />
          <Route path="/locations/:city" component={Locations} />
          <Route path="/samples" component={SampleRequest} />
          <Route path="/standing-order" component={StandingOrder} />
          <Route path="/distributors" component={Distributor} />
          <Route path="/videos" component={Videos} />
          <Route path="/hospital-procurement" component={HospitalProcurement} />
          <Route path="/private-label" component={PrivateLabel} />
          <Route path="/privacy">{() => <Legal page="privacy" />}</Route>
          <Route path="/terms">{() => <Legal page="terms" />}</Route>
          <Route path="/shipping">{() => <Legal page="shipping" />}</Route>
          <Route path="/returns">{() => <Legal page="returns" />}</Route>
          <Route component={NotFound} />
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Suspense fallback={<PageLoader />}>
            <Router />
          </Suspense>
          <StickyQuoteForm />
          <DualCTABar />
          <ScrollToTop />
          <CookieConsent />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
