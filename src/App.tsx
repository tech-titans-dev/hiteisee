import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Gallery from "./pages/Gallery";
import Mask from "./pages/Mask";
import CuringCorporateDiseases from "./pages/CuringCorporateDiseases";
import CulturalWisdom from "./pages/CulturalWisdom";
import Contact from "./pages/Contact";
import Payment from "./pages/Payment";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsCondition from "./pages/TermsCondition";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import Preloader from "./components/shared/Preloader";
import { FloatingActionMenu } from "./components/shared/FloatingActionMenu";
import AdminLogin from "./pages/AdminLogin";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAdminLoggedIn = sessionStorage.getItem("isAdminLoggedIn") === "true";
  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

const queryClient = new QueryClient();

// Reads location inside BrowserRouter to conditionally show header/footer
const AppLayout = () => {
  const location = useLocation();
  const isDashboard = location.pathname.includes("-dashboard") || location.pathname.includes("/admin");
  const isCheckout = location.pathname.includes("/checkout");

  const hideLayout = isDashboard || isCheckout;

  return (
    <>
      {!hideLayout && <Header />}
      {!hideLayout && <FloatingActionMenu />}
      <main className={hideLayout ? "" : "pt-[88px] lg:pt-[140px] min-h-screen"}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/detail/:id" element={<BlogDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/mask" element={<Mask />} />
          <Route path="/curing-corporate-diseases" element={<CuringCorporateDiseases />} />
          <Route path="/cultural-wisdom" element={<CulturalWisdom />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin-dashboard" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsCondition />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Preloader />
        <BrowserRouter>
          <ScrollToTop />
          <AppLayout />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
