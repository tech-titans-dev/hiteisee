import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, Mail, Lock, User, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Career", path: "/careers" },
  { label: "Blog", path: "/blog" },
  { label: "Gallery", path: "/gallery" },
  { label: "Payment", path: "/payment" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform ${scrolled ? 'pt-2 md:pt-4 px-3 md:px-5' : 'pt-0 px-0'}`}
      >
        {/* Top Bar Area */}
        <div
          className={`hidden lg:flex items-center justify-between w-full bg-primary text-white/90 text-xs font-semibold tracking-[0.2em] transition-all duration-500 overflow-hidden mx-auto ${scrolled ? 'h-0 opacity-0 max-w-[1400px] rounded-full px-0' : 'h-12 opacity-100 max-w-full rounded-none px-6 lg:px-10'}`}
        >
          <div className="flex items-center gap-6">
            <span className="uppercase text-[10px]">COMPLETE PEOPLE SOLUTIONS DELIVERED</span>
          </div>

          <div className="flex items-center gap-5 tracking-wider h-full">
            <a href="tel:+918763666511" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-accent" /> +91 8763666511
            </a>
            <a href="mailto:info@hiteisee.in" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-accent" /> info@hiteisee.in
            </a>
            <div className="h-4 w-px bg-white/20 mx-2"></div>
            <Link
              to="/admin/login"
              className="flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Lock className="w-3.5 h-3.5" /> Portal
            </Link>
          </div>
        </div>

        {/* Main sticky navbar */}
        <div
          className={`mx-auto flex items-center justify-between transition-all duration-500 overflow-visible w-full ${scrolled
            ? 'max-w-[1400px] glass-card rounded-full h-16 md:h-20 px-4 lg:px-8'
            : 'max-w-full bg-white/95 backdrop-blur-md border-b border-border shadow-sm h-20 md:h-[88px] px-6 lg:px-10'
            }`}
        >
          {/* Logo Section */}
          <div className="flex-1 flex justify-start">
            <Link to="/" className="inline-flex items-center gap-4 hover:opacity-90 transition-opacity">
              <div className={`flex items-center justify-center transition-all ${scrolled ? 'scale-95 origin-left' : 'scale-100'}`}>
                <img
                  src="/logo/logo.png"
                  alt="Hiteisee Consulting Logo"
                  className="h-12 md:h-16 w-auto object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex flex-none items-center justify-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[13px] font-bold uppercase tracking-wider transition-colors relative group py-2 ${isActive ? "text-primary" : "text-secondary hover:text-foreground"}`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 w-full h-[2px] rounded-t-full transition-transform duration-300 ease-out origin-left bg-primary ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex flex-1 items-center justify-end gap-6 ml-auto">
            <Link to="/contact">
              <Button className="rounded-full px-8 font-bold tracking-widest text-xs h-12 transition-all hover:scale-105 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 uppercase">
                Start Inquiry
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            className="lg:hidden p-2 rounded-full ml-auto transition-colors text-foreground bg-secondary/10 hover:bg-secondary/20"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu Content */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: -10 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="lg:hidden absolute top-full left-4 right-4 mt-4 glass-card rounded-3xl overflow-hidden z-[60]"
            >
              <div className="p-6 space-y-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-5 py-3.5 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all ${isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-secondary/10"
                        }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                <div className="my-5 h-px bg-border w-full" />

                <Link
                  to="/admin/login"
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 text-center text-xs font-bold uppercase tracking-wider text-foreground hover:text-primary bg-secondary/5 hover:bg-primary/10 rounded-2xl transition-colors border border-border"
                >
                  <Lock className="w-3.5 h-3.5" /> Portal Login
                </Link>

                <div className="pt-2">
                  <Link to="/contact" className="block w-full" onClick={() => setMobileOpen(false)}>
                    <Button size="lg" className="w-full justify-center h-14 rounded-2xl shadow-lg font-bold tracking-widest text-xs uppercase bg-primary text-white hover:bg-primary/90">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>


    </>
  );
};

export default Header;
