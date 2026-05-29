import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Particles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px]" />

      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white/20 rounded-full"
          style={{
            width: Math.random() * 2 + 1 + 'px',
            height: Math.random() * 2 + 1 + 'px',
          }}
          initial={{
            opacity: Math.random() * 0.3 + 0.1,
            x: `${Math.random() * 100}%`,
            y: "-10%",
          }}
          animate={{
            y: "110%",
            x: `calc(${Math.random() * 100}% + ${Math.random() * 20 - 10}px)`,
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
        />
      ))}
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="relative bg-foreground text-white overflow-hidden mt-0">
      <Particles />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground/95 to-black/80 pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 pt-24 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">

          <div className="lg:col-span-4 pr-4">
            <h3 className="text-3xl font-heading font-bold text-white mb-6 tracking-tight flex items-baseline">
              Hiteisee<span className="text-accent text-4xl leading-none">.</span>
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-8 max-w-sm font-light">
              We are a boutique consulting firm aspiring to serve industries and businesses to improve competitiveness and create sustainable competitive advantage.
            </p>
            <div className="flex gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-foreground px-6 py-3 rounded-full text-xs uppercase tracking-widest font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                Start Inquiry
              </Link>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white font-heading font-bold text-lg mb-6 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", path: "/" },
                { label: "About Us", path: "/about" },
                { label: "Services", path: "/services" },
                { label: "Career", path: "/careers" },
                { label: "Blog", path: "/blog" },
                { label: "Gallery", path: "/gallery" },
                { label: "Contact Us", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-slate-400 hover:text-white hover:translate-x-1 inline-flex transition-all duration-300 group font-light tracking-wide">
                    <ArrowRight className="w-3.5 h-3.5 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-accent" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-heading font-bold text-lg mb-6 tracking-wide">
              Portals
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Payment Gateway", path: "/payment" },
                { label: "Privacy Policy", path: "/privacy-policy" },
                { label: "Terms & Conditions", path: "/terms-conditions" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-slate-400 hover:text-white hover:translate-x-1 inline-flex transition-all duration-300 group font-light tracking-wide">
                    <ArrowRight className="w-3.5 h-3.5 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-accent" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white font-heading font-bold text-lg mb-6 tracking-wide">
              Corporate Office
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 text-sm text-slate-300 group">
                <div className="pt-0.5">
                  <MapPin className="w-5 h-5 text-accent mb-2" />
                  <span className="font-light leading-relaxed block">2/6, Kanchanjanga VIP Enclaves, Chandrasekharpur, Bhubaneswar - 751016, Odisha, India</span>
                </div>
              </li>
              <li className="flex items-start gap-4 text-sm text-slate-300 group">
                <div className="pt-0.5 flex flex-col gap-1">
                  <Phone className="w-5 h-5 text-accent mb-1" />
                  <a href="tel:+918763666511" className="text-slate-300 hover:text-white transition-colors font-light">+91 8763666511 / 8591231077</a>
                  <a href="tel:06742744700" className="text-slate-300 hover:text-white transition-colors font-light">0674-2744700</a>
                </div>
              </li>
              <li className="flex items-start gap-4 text-sm text-slate-300 group">
                <div className="pt-0.5">
                  <Mail className="w-5 h-5 text-accent mb-2" />
                  <a href="mailto:info@hiteisee.in" className="text-slate-300 hover:text-white transition-colors font-light">info@hiteisee.in</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 relative">
          <p className="text-xs text-slate-500 text-center md:text-left font-medium tracking-wide">
            © 2026 <span className="text-white font-bold">Hiteisee Consulting</span>. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/about" className="text-[11px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">About</Link>
            <Link to="/services" className="text-[11px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">Services</Link>
            <Link to="/careers" className="text-[11px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">Career</Link>
            <Link to="/contact" className="text-[11px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
