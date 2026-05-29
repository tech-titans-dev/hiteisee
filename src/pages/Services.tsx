import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { PageHero } from "@/components/shared/PageHero";
import { ArrowRight } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { getServices, getCategoryIcon, type ServiceItem } from "@/lib/adminData";

export const serviceCategories = [
  { id: "all", label: "All Capabilities" },
  { id: "ir-legal", label: "Industrial Relations & Legal" },
  { id: "strategy", label: "Corporate Strategy & Growth" },
  { id: "hr-ops", label: "Human Capital & Operations" },
  { id: "risk", label: "Risk & Asset Protection" },
];

// Helper to create a URL‑friendly slug from a title
export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// Category-relevant background images
const categoryImages: Record<string, string[]> = {
  "ir-legal": [
    "/gallery/10004.jpg",  // IR Conclave - Industrial Relations
    "/gallery/10005.jpg",  // CII Workshop - Legal/Compliance
    "/gallery/10028.jpg",  // Employee Relations Seminar
  ],
  strategy: [
    "/hero_business.png",  // Corporate boardroom strategy
    "/gallery/10003.jpg",  // Smart Infra conference
    "/gallery/10016.jpg",  // Orientation Programme
  ],
  "hr-ops": [
    "/gallery/10025.jpg",  // Workplace training group photo
    "/gallery/10017.jpg",  // Group photo - team/HR
    "/gallery/10002.jpg",  // CSR event - people focused
  ],
  risk: [
    "/gallery/10021.jpg",  // CSR Conclave - community/safety
    "/gallery/10024.jpg",  // Institution event - security context
    "/gallery/10003.jpg",  // Infrastructure/safety
  ],
};

// Get relevant image for a service based on category and index
const getCardImage = (category: string, serviceIndex: number): string => {
  const images = categoryImages[category] || categoryImages["hr-ops"];
  return images[serviceIndex % images.length];
};

// Category color accents for the glow and border effects
const categoryAccents: Record<string, { gradient: string; glow: string; border: string; overlay: string }> = {
  "ir-legal": {
    gradient: "from-amber-600/40 via-orange-500/20 to-amber-900/60",
    glow: "rgba(245, 158, 11, 0.25)",
    border: "rgba(245, 158, 11, 0.4)",
    overlay: "from-amber-950/70 via-amber-900/40 to-amber-950/80",
  },
  strategy: {
    gradient: "from-emerald-600/40 via-teal-500/20 to-emerald-900/60",
    glow: "rgba(16, 185, 129, 0.25)",
    border: "rgba(16, 185, 129, 0.4)",
    overlay: "from-emerald-950/70 via-emerald-900/40 to-emerald-950/80",
  },
  "hr-ops": {
    gradient: "from-blue-600/40 via-indigo-500/20 to-blue-900/60",
    glow: "rgba(59, 130, 246, 0.25)",
    border: "rgba(59, 130, 246, 0.4)",
    overlay: "from-blue-950/70 via-blue-900/40 to-blue-950/80",
  },
  risk: {
    gradient: "from-rose-600/40 via-pink-500/20 to-rose-900/60",
    glow: "rgba(244, 63, 94, 0.25)",
    border: "rgba(244, 63, 94, 0.4)",
    overlay: "from-rose-950/70 via-rose-900/40 to-rose-950/80",
  },
};

// Track how many services per category we've seen (for image cycling)
const categoryCounters: Record<string, number> = {};

// ─── 3D Tilt Card with Scroll Animation ─────────────────────────────────────

interface ServiceCardProps {
  cap: ServiceItem;
  index: number;
  onNavigate: (slug: string) => void;
}

const ServiceCard = ({ cap, index, onNavigate }: ServiceCardProps) => {
  // 3D tilt mouse tracking
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
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const IconComponent = getCategoryIcon(cap.category);
  // Track per-category index for image cycling
  if (!categoryCounters[cap.category]) categoryCounters[cap.category] = 0;
  const catIndex = categoryCounters[cap.category]++;
  const bgImage = getCardImage(cap.category, catIndex);
  const accent = categoryAccents[cap.category] || categoryAccents["hr-ops"];

  // Alternating slide direction: columns from left/right
  const colInRow = index % 4;
  const slideFromLeft = colInRow < 2;
  const slideX = slideFromLeft ? -100 : 100;
  // Row-based stagger delay
  const rowDelay = Math.floor(index / 4) * 0.15;
  const colDelay = (index % 4) * 0.1;

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        x: slideX,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      viewport={{ once: false, amount: 0.15, margin: "-30px" }}
      transition={{
        duration: 0.8,
        delay: colDelay + rowDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group h-full"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onNavigate(`/services/${slugify(cap.title)}`)}
        className="h-full relative rounded-2xl cursor-pointer overflow-hidden shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-black/15 transition-shadow duration-500"
      >
        {/* Background image — clearly visible */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          {/* Light semi-transparent overlay — image stays visible */}
          <div className={`absolute inset-0 bg-gradient-to-b ${accent.overlay} transition-all duration-500 group-hover:opacity-80`} />
          {/* Subtle blur only on the bottom part for text readability */}
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

        {/* Bottom glow on hover */}
        <div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-20 rounded-full blur-3xl opacity-0 group-hover:opacity-80 transition-all duration-600 z-[1]"
          style={{ backgroundColor: accent.glow }}
        />

        {/* Card content */}
        <div className="relative z-10 h-full p-6 flex flex-col items-start rounded-2xl border border-white/10 group-hover:border-white/25 transition-all duration-500 min-h-[220px]">
          {/* Icon container */}
          <motion.div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-white/15 text-white backdrop-blur-md border border-white/20 group-hover:bg-white/25 group-hover:border-white/40 group-hover:shadow-lg transition-all duration-500"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <IconComponent className="w-5 h-5" />
          </motion.div>

          {/* Category tag */}
          <div className="mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/50 group-hover:text-white/70 transition-colors duration-300">
              {serviceCategories.find((c) => c.id === cap.category)?.label || "Service"}
            </span>
          </div>

          {/* Title */}
          <h4 className="font-heading font-bold text-base md:text-lg leading-snug text-white drop-shadow-md mb-3 transition-all duration-300 group-hover:translate-x-1 group-hover:drop-shadow-lg">
            {cap.title}
          </h4>

          {/* Decorative line */}
          <div className="w-8 h-[2px] rounded-full mb-4 transition-all duration-500 group-hover:w-16 bg-white/30 group-hover:bg-white/70" />

          {/* Arrow button */}
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

// ─── Parallax Section Background ─────────────────────────────────────────────

const ParallaxBackground = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating parallax orbs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] opacity-60"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-1/3 -left-40 w-[400px] h-[400px] rounded-full bg-accent/8 blur-[80px] opacity-50"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full bg-secondary/5 blur-[90px] opacity-40"
      />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-40" />
    </div>
  );
};

// ─── Main Services Page ──────────────────────────────────────────────────────

export const Services = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [servicesList, setServicesList] = useState<ServiceItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setServicesList(getServices());
  }, []);

  // Reset category counters on each render so image cycling is consistent
  Object.keys(categoryCounters).forEach((k) => { categoryCounters[k] = 0; });

  const filteredCapabilities = servicesList.filter(
    (cap) => activeFilter === "all" || cap.category === activeFilter
  );

  return (
    <div className="min-h-screen bg-background">
      <PageHero 
        title="Our Services" 
        subtitle="Comprehensive solutions tailored to elevate your business performance and human capital." 
        theme="training"
      />

      <section className="py-16 md:py-24 relative overflow-hidden bg-background min-h-[60vh]">
        <ParallaxBackground />

        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          {/* Section Heading — slides down into view */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/80">
                What We Deliver
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
              Our Expertise,{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[size:200%_auto] animate-[gradient-shift_3s_ease-in-out_infinite]">
                Your Advantage
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Comprehensive corporate solutions crafted by industry veterans with decades of experience
            </p>
          </motion.div>

          {/* Filter Pills — slide up into view */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              {serviceCategories.map((cat, i) => (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border backdrop-blur-sm ${
                    activeFilter === cat.id
                      ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                      : "bg-white/50 dark:bg-white/5 text-muted-foreground border-border/50 hover:border-primary/40 hover:text-foreground hover:bg-white/80 dark:hover:bg-white/10 hover:shadow-md"
                  }`}
                >
                  {cat.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 items-stretch"
          >
            <AnimatePresence mode="popLayout">
              {filteredCapabilities.map((cap, i) => (
                <ServiceCard
                  key={`${cap.title}-${cap.id}`}
                  cap={cap}
                  index={i}
                  onNavigate={navigate}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filteredCapabilities.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground text-lg">
                No services found in this category.
              </p>
            </motion.div>
          )}
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

export default Services;
