import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/i18n";
import { StickyQuoteForm } from "@/components/layout/StickyQuoteForm";
import { DualCTABar } from "@/components/layout/DualCTABar";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { CookieConsent } from "@/components/layout/CookieConsent";
import Home from "@/pages/Home";
import Catalog from "@/pages/Catalog";
import ProductDetails from "@/pages/ProductDetails";
import Admin from "@/pages/Admin";
import Legal from "@/pages/Legal";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Locations from "@/pages/Locations";
import SampleRequest from "@/pages/SampleRequest";
import StandingOrder from "@/pages/StandingOrder";
import Distributor from "@/pages/Distributor";
import Videos from "@/pages/Videos";
import HospitalProcurement from "@/pages/HospitalProcurement";
import PrivateLabel from "@/pages/PrivateLabel";
import NotFound from "@/pages/not-found";

function Router() {
  return (
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
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Router />
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
