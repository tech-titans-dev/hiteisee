import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { getServices, getCategoryIcon, type ServiceItem } from "@/lib/adminData";
import { useState, useEffect, useCallback } from "react";
import { slugify, serviceCategories } from "./Services";

// Fisher-Yates shuffle to pick N random items
const pickRandom = <T,>(arr: T[], count: number): T[] => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
};

// Category-relevant background images (same mapping as Services page)
const categoryImages: Record<string, string[]> = {
  "ir-legal": [
    "/gallery/10004.jpg",
    "/gallery/10005.jpg",
    "/gallery/10028.jpg",
  ],
  strategy: [
    "/hero_business.png",
    "/gallery/10003.jpg",
    "/gallery/10016.jpg",
  ],
  "hr-ops": [
    "/gallery/10025.jpg",
    "/gallery/10017.jpg",
    "/gallery/10002.jpg",
  ],
  risk: [
    "/gallery/10021.jpg",
    "/gallery/10024.jpg",
    "/gallery/10003.jpg",
  ],
};

const getCardImage = (category: string, serviceIndex: number): string => {
  const images = categoryImages[category] || categoryImages["hr-ops"];
  return images[serviceIndex % images.length];
};

const categoryAccents: Record<string, { glow: string; border: string; overlay: string }> = {
  "ir-legal": {
    glow: "rgba(245, 158, 11, 0.25)",
    border: "rgba(245, 158, 11, 0.4)",
    overlay: "from-amber-950/70 via-amber-900/40 to-amber-950/80",
  },
  strategy: {
    glow: "rgba(16, 185, 129, 0.25)",
    border: "rgba(16, 185, 129, 0.4)",
    overlay: "from-emerald-950/70 via-emerald-900/40 to-emerald-950/80",
  },
  "hr-ops": {
    glow: "rgba(59, 130, 246, 0.25)",
    border: "rgba(59, 130, 246, 0.4)",
    overlay: "from-blue-950/70 via-blue-900/40 to-blue-950/80",
  },
  risk: {
    glow: "rgba(244, 63, 94, 0.25)",
    border: "rgba(244, 63, 94, 0.4)",
    overlay: "from-rose-950/70 via-rose-900/40 to-rose-950/80",
  },
};

// ─── Home Service Card (with background image & 3D tilt) ─────────────────────

interface HomeServiceCardProps {
  service: ServiceItem;
  index: number;
  catIndex: number;
}

const HomeServiceCard = ({ service, index, catIndex }: HomeServiceCardProps) => {
  const navigate = useNavigate();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const IconComponent = getCategoryIcon(service.category);
  const bgImage = getCardImage(service.category, catIndex);
  const accent = categoryAccents[service.category] || categoryAccents["hr-ops"];

  // Alternate: even from left, odd from right
  const slideX = index % 2 === 0 ? -80 : 80;

  return (
    <motion.div
      initial={{ opacity: 0, x: slideX, y: 30 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group h-full"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => navigate(`/services/${slugify(service.title)}`)}
        className="h-full relative rounded-2xl cursor-pointer overflow-hidden shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-black/15 transition-shadow duration-500"
      >
        {/* Background image — clearly visible */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          <div className={`absolute inset-0 bg-gradient-to-b ${accent.overlay} transition-all duration-500 group-hover:opacity-80`} />
          <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/60 via-black/30 to-transparent backdrop-blur-[2px]" />
        </div>

        {/* Shimmer sweep on hover */}
        <div
          className="absolute inset-0 z-[2] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.12) 55%, transparent 60%)",
            backgroundSize: "250% 100%",
            animation: "card-shimmer 1.8s ease-in-out infinite",
          }}
        />

        {/* Glowing border on hover */}
        <div
          className="absolute inset-0 z-[1] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 0 1.5px ${accent.border}, 0 0 20px ${accent.glow}`,
          }}
        />

        {/* Bottom glow */}
        <div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-20 rounded-full blur-3xl opacity-0 group-hover:opacity-80 transition-all z-[1]"
          style={{ backgroundColor: accent.glow }}
        />

        {/* Card content */}
        <div className="relative z-10 h-full p-6 flex flex-col items-start rounded-2xl border border-white/10 group-hover:border-white/25 transition-all duration-500 min-h-[260px]">
          {/* Icon */}
          <motion.div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-white/15 text-white backdrop-blur-md border border-white/20 group-hover:bg-white/25 group-hover:border-white/40 group-hover:shadow-lg transition-all duration-500"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <IconComponent className="w-5 h-5" />
          </motion.div>

          {/* Category tag */}
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/50 group-hover:text-white/70 transition-colors duration-300 mb-2">
            {serviceCategories.find((c) => c.id === service.category)?.label || "Service"}
          </span>

          {/* Title */}
          <h4 className="font-heading font-bold text-lg leading-snug text-white drop-shadow-md mb-2 transition-all duration-300 group-hover:translate-x-1">
            {service.title}
          </h4>

          {/* Service details preview */}
          <p className="text-white/50 text-xs leading-relaxed mb-4 line-clamp-2 group-hover:text-white/70 transition-colors duration-300">
            {service.details.slice(0, 2).join(" • ")}
          </p>

          {/* Decorative line */}
          <div className="w-8 h-[2px] rounded-full mb-4 transition-all duration-500 group-hover:w-16 bg-white/30 group-hover:bg-white/70" />

          {/* Arrow */}
          <div className="mt-auto self-end">
            <motion.div
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 bg-white/10 backdrop-blur-md text-white/70 group-hover:bg-white group-hover:text-gray-900 group-hover:border-white group-hover:shadow-lg group-hover:shadow-white/20"
              whileHover={{ scale: 1.15, x: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Partners ────────────────────────────────────────────────────────────────

const partners = [
  { name: "CIIR", path: "/partners/ciir.png" },
  { name: "Coal India", path: "/partners/coal.png" },
  { name: "Cost", path: "/partners/cost.png" },
  { name: "Fashion", path: "/partners/fashion.png" },
  { name: "IFFCO", path: "/partners/iffco.png" },
  { name: "Aditya", path: "/partners/aditya.png" },
  { name: "Jaikishan", path: "/partners/jaikishan.png" },
  { name: "KIIT", path: "/partners/kiit.png" },
  { name: "Mayfair", path: "/partners/mayfair.png" },
  { name: "MCF", path: "/partners/mcf.png" },
  { name: "MCL", path: "/partners/mcl.png" },
  { name: "NALCO", path: "/partners/nalco.png" },
  { name: "Odisha Sasan", path: "/partners/odishasasan.png" },
  { name: "OPTCL", path: "/partners/optcl.png" },
  { name: "Prasar India", path: "/partners/prasar%20india.png" },
  { name: "Simon India", path: "/partners/simon%20india.png" }
];

// ─── Main Index Page ─────────────────────────────────────────────────────────

const DISPLAY_COUNT = 4;
const ROTATE_INTERVAL = 4000;

const Index = () => {
  const [allServices, setAllServices] = useState<ServiceItem[]>([]);
  const [displayedServices, setDisplayedServices] = useState<ServiceItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const services = getServices();
    setAllServices(services);
    setDisplayedServices(pickRandom(services, DISPLAY_COUNT));
  }, []);

  // Auto-rotate every 4 seconds
  useEffect(() => {
    if (allServices.length <= DISPLAY_COUNT) return;
    const interval = setInterval(() => {
      setDisplayedServices(pickRandom(allServices, DISPLAY_COUNT));
    }, ROTATE_INTERVAL);
    return () => clearInterval(interval);
  }, [allServices]);

  // Track per-category counters for image assignment
  const catCounters: Record<string, number> = {};
  const servicesWithCatIndex = displayedServices.map((s) => {
    if (!catCounters[s.category]) catCounters[s.category] = 0;
    const ci = catCounters[s.category]++;
    return { service: s, catIndex: ci };
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        
        {/* Background Video & Ambient Overlay */}
        <div className="absolute inset-0 z-0 bg-black">
          <video 
            src="/hero/hero.mp4" 
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center select-none pointer-events-none opacity-90"
          />
          {/* Dark Overlay as requested (rgba(0,0,0,0.45)) */}
          <div className="absolute inset-0 bg-black/45 z-10 pointer-events-none" />
        </div>
        
        <div className="relative z-20 w-full max-w-[1240px] mx-auto px-6 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[550px] flex flex-col items-start text-left mt-16 md:mt-0"
          >
            <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-heading font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80 leading-[1.1] mb-6 tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              Complete People <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[size:200%_auto] animate-[gradient-shift_3s_ease-in-out_infinite]">Solutions</span> Delivered.
            </h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="hidden sm:flex flex-col gap-4 mb-10 max-w-[500px]"
            >
              <div className="w-16 h-[3px] bg-gradient-to-r from-primary to-accent rounded-full drop-shadow-[0_2px_10px_rgba(245,158,11,0.5)]" />
              <p className="text-base md:text-[1.1rem] text-white/95 leading-[1.7] font-medium drop-shadow-lg">
                <span className="text-white font-bold">Transforming Individuals, Leaders and Organizations</span> through Consulting, Training, Strategy and Human Development.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link to="/contact">
                <Button 
                  className="h-12 px-8 text-xs font-bold uppercase tracking-widest bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20 rounded-full transition-all duration-300"
                >
                  Start Inquiry
                </Button>
              </Link>
              <Link to="/services">
                <Button 
                  className="h-12 px-8 text-xs font-bold uppercase tracking-widest text-white border border-white/30 bg-white/5 hover:bg-white/15 backdrop-blur-md rounded-full transition-all duration-300"
                >
                  Explore Services
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview Grid — 4 Random Cards, Auto-Rotating */}
      <section className="py-16 md:py-20 relative bg-background overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[100px]" />
          <div className="absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full bg-accent/3 blur-[80px]" />
        </div>

        <div className="max-w-[1240px] mx-auto px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6"
          >
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-primary/5 border border-primary/10">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80">
                  Core Competencies
                </span>
              </div>
              <h3 className="text-2xl md:text-4xl font-heading font-bold text-foreground tracking-tight">
                Transformative{" "}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[size:200%_auto] animate-[gradient-shift_3s_ease-in-out_infinite]">
                  Solutions
                </span>
              </h3>
            </div>
            <Link to="/services" className="group inline-flex items-center text-xs font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors">
              View All Services
              <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center ml-3 group-hover:border-accent group-hover:bg-accent/10 transition-all">
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </motion.div>

          {/* Cards Grid — 2x2 with AnimatePresence for smooth rotation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[300px]">
            <AnimatePresence mode="popLayout">
              {servicesWithCatIndex.map(({ service, catIndex }, i) => (
                <HomeServiceCard
                  key={service.id}
                  service={service}
                  index={i}
                  catIndex={catIndex}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Show More Services — redirects to /services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mt-12"
          >
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group relative inline-flex items-center gap-3 h-14 px-10 rounded-full font-bold tracking-widest text-xs uppercase bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/15 transition-all duration-300 overflow-hidden"
              >
                {/* Shimmer effect on button */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
                    backgroundSize: "200% 100%",
                    animation: "card-shimmer 2s ease-in-out infinite",
                  }}
                />
                <span className="relative z-10">
                  Show All {allServices.length} Services
                </span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Client Showcase (Infinite Scroll Ribbon) */}
      <section className="pt-14 pb-10 bg-muted/40 dark:bg-muted/10 border-y border-border" style={{ overflowX: "clip", overflowY: "visible" }}>
        <div className="max-w-[1240px] mx-auto px-6 mb-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80">
                Trusted Partners
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground tracking-tight">
              Our Esteemed Customers
            </h3>
          </motion.div>
        </div>

        <div className="relative w-full flex group/marquee" style={{ overflowX: "clip", overflowY: "visible" }}>
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-muted/60 dark:from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-muted/60 dark:from-background to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee whitespace-nowrap flex items-center gap-10 motion-safe:animate-marquee group-hover/marquee:[animation-play-state:paused] pt-4 pb-4">
            {[...partners, ...partners, ...partners].map((partner, i) => (
              <div key={i} className="relative inline-flex flex-shrink-0 mx-4" style={{ zIndex: 20 }}>
                <motion.div
                  className="relative cursor-pointer"
                  whileHover="hovered"
                  initial="idle"
                >
                  {/* Normal state logo */}
                  <motion.div
                    className="h-12 md:h-14 w-auto flex items-center justify-center px-2"
                    variants={{
                      idle: { scale: 1, opacity: 1 },
                      hovered: { scale: 0.8, opacity: 0.2 },
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <img
                      src={partner.path}
                      alt={partner.name}
                      className="h-full w-auto object-contain select-none"
                      draggable={false}
                    />
                  </motion.div>

                  {/* Popup card — positioned ABOVE the logo */}
                  <motion.div
                    className="absolute left-1/2 bottom-full z-[100] pointer-events-none flex flex-col items-center mb-3"
                    variants={{
                      idle: {
                        x: "-50%",
                        y: 20,
                        scale: 0.5,
                        opacity: 0,
                      },
                      hovered: {
                        x: "-50%",
                        y: 0,
                        scale: 1,
                        opacity: 1,
                      },
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 20,
                      mass: 0.7,
                    }}
                  >
                    <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl rounded-2xl border border-border/60 dark:border-white/15 shadow-2xl shadow-black/15 p-6 md:p-8 flex flex-col items-center gap-4 min-w-[180px] md:min-w-[220px]">
                      {/* Glow aura */}
                      <div className="absolute -inset-3 rounded-3xl bg-primary/6 blur-2xl -z-10" />
                      
                      {/* Large logo */}
                      <div className="h-20 md:h-28 w-auto flex items-center justify-center">
                        <img
                          src={partner.path}
                          alt={partner.name}
                          className="h-full w-auto max-w-[200px] object-contain drop-shadow-lg"
                          draggable={false}
                        />
                      </div>

                      {/* Decorative line */}
                      <div className="w-12 h-[2px] rounded-full bg-primary/20" />

                      {/* Partner name */}
                      <span className="text-xs md:text-sm font-bold uppercase tracking-[0.12em] text-foreground/80 dark:text-white/80 whitespace-nowrap">
                        {partner.name}
                      </span>
                    </div>

                    {/* Arrow pointing down to the logo */}
                    <div className="w-3 h-3 bg-white/90 dark:bg-gray-900/90 border-r border-b border-border/60 dark:border-white/15 rotate-45 -mt-[7px] shadow-sm" />
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Section */}
      <section className="py-20 relative bg-background overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />

        <div className="max-w-[1000px] mx-auto px-6 relative z-10 text-center">
          <AnimatedSection>
            <div className="w-16 h-16 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center mb-6 border border-border text-primary">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6 tracking-tight">
              Ready to transform your business? <br className="hidden md:block" /> Let's Start the Conversation.
            </h2>
            <p className="text-base text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with Dr. Suvendu Das and the Hiteisee team to explore customized best practices tailored for your organizational success.
            </p>
            <Link to="/contact">
              <Button className="h-12 px-10 rounded-full font-bold tracking-widest text-xs uppercase bg-primary text-white hover:bg-primary/90 shadow-xl hover:scale-105 transition-all">
                Contact Us
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Custom keyframes */}
      <style>{`
        @keyframes card-shimmer {
          0% { background-position: -250% center; }
          100% { background-position: 250% center; }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
};

export default Index;
