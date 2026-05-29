import { PageHero } from "@/components/shared/PageHero";
import {
  Heart,
  Eye,
  Star,
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  BookOpen,
  Mic,
  Sparkles,
  Quote,
  Briefcase,
  GraduationCap,
  Building2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useCallback } from "react";

// ─── Animated Counter ────────────────────────────────────────────────────────

const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.5 }}
      onViewportEnter={() => {
        let start = 0;
        const end = value;
        const duration = 2000;
        const stepTime = Math.max(Math.floor(duration / end), 20);
        const timer = setInterval(() => {
          start += Math.ceil(end / (duration / stepTime));
          if (start >= end) {
            start = end;
            clearInterval(timer);
          }
          setCount(start);
        }, stepTime);
      }}
      className="tabular-nums"
    >
      {count.toLocaleString()}{suffix}
    </motion.span>
  );
};

// ─── 3D Tilt Card ────────────────────────────────────────────────────────────

const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: "1200px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── Stats Data ──────────────────────────────────────────────────────────────

const stats = [
  { value: 40, suffix: "+", label: "Years Experience", icon: Award },
  { value: 42000, suffix: "+", label: "Managers Trained", icon: Users },
  { value: 200, suffix: "+", label: "Students Guided", icon: GraduationCap },
  { value: 40000, suffix: "+", label: "Workforce Managed", icon: Building2 },
];

const founderBadges = [
  { label: "People Management Expert", icon: Users },
  { label: "Spiritual Scientist", icon: Sparkles },
  { label: "Life Transformer", icon: Heart },
  { label: "Thought Therapist", icon: BookOpen },
  { label: "Professional Trainer", icon: GraduationCap },
  { label: "Inspirational Speaker", icon: Mic },
  { label: "Mentor & Author", icon: BookOpen },
];

const positions = [
  { role: "Group President – HR", company: "OSL Group", period: "Leadership" },
  { role: "Vice President – HR", company: "Paradeep Phosphates Ltd.", period: "Strategic HR" },
  { role: "Dy. General Manager (P&A)", company: "SAIL", period: "Industrial Relations" },
];

const values = [
  { text: "Trust of Customers", icon: ShieldCheck },
  { text: "Absolute Confidentiality", icon: ShieldCheck },
  { text: "Quality of Service", icon: ShieldCheck },
  { text: "Corporate Ethics", icon: ShieldCheck },
];

// ─── About Page ──────────────────────────────────────────────────────────────

const About = () => {
  const heroParallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroParallaxRef,
    offset: ["start end", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, -80]);

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        title="About Us"
        subtitle="We are a boutique consulting firm that aspires to serve industries & businesses improve competitiveness in both local and global markets and help create sustainable competitive advantage."
      />

      {/* ── Overview with Split Layout ────────────────────────────────── */}
      <section ref={heroParallaxRef} className="py-12 md:py-16 relative overflow-hidden bg-background">
        {/* Parallax background orbs */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[120px]" />
          <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full bg-accent/3 blur-[100px]" />
        </motion.div>

        <div className="max-w-[1240px] mx-auto px-6 relative z-10">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/80">About Us</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground tracking-tight mb-4">
              Who We{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[size:200%_auto] animate-[gradient-shift_3s_ease-in-out_infinite]">
                Are
              </span>
            </h2>
          </motion.div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left — Big quote & text */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative mb-10">
                <Quote className="w-12 h-12 text-accent/20 absolute -top-4 -left-2" />
                <p className="text-xl md:text-2xl text-foreground font-light leading-relaxed pl-8 border-l-3 border-accent">
                  We are a boutique consulting firm that aspires to serve industries & businesses improve competitiveness in both local and global markets and help create sustainable competitive advantage.
                </p>
              </div>

              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  We support, help, and guide our customers to improve performance across different verticals and functions.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  We believe that the alignment of goals and interventions is key to achieving lasting success. A well-defined, articulated, and continuously shared corporate strategy aligned with appropriate people engagement leads to lasting success and sustainable competitive advantage.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Delivering value through designing and implementing best practices drives our delivery commitment. In every field of activity, we bring customized best practices and that is our hallmark.
                </motion.p>
              </div>
            </motion.div>

            {/* Right — Interactive stats grid */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, i) => (
                <TiltCard key={i}>
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="group relative bg-white dark:bg-white/5 rounded-2xl border border-border/50 p-6 md:p-8 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer overflow-hidden"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Accent glow */}
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Inner content pushed forward for parallax effect */}
                    <div style={{ transform: "translateZ(30px)" }}>
                      <stat.icon className="w-6 h-6 text-accent mb-4 group-hover:scale-110 transition-transform duration-300" />
                      <div className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2 drop-shadow-sm">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      </div>
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  </motion.div>
                </TiltCard>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── The 3H Framework — Dark Immersive Section ─────────────── */}
      <section className="py-16 md:py-20 relative bg-foreground overflow-hidden border-y border-white/5">
        {/* Ambient glow */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="max-w-[1240px] mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 text-accent" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">Foundation</span>
            </div>
            <h3 className="text-4xl md:text-6xl font-heading font-bold text-white tracking-tight mb-4">
              The 3H Framework
            </h3>
            <p className="text-white/40 max-w-xl mx-auto text-sm">
              Help • Heal • Happiness — the pillars that define our approach to every engagement
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Heart,
                title: "Our Mission",
                color: "from-rose-500/20 to-rose-600/5",
                borderColor: "hover:border-rose-500/30",
                glowColor: "bg-rose-500/10",
                content: (
                  <p className="text-slate-300 font-light leading-relaxed">
                    To <span className="text-white font-semibold">HELP</span> individuals & organizations in{" "}
                    <span className="text-white font-semibold">HEALING</span> their pain areas through services that bring a difference in their lives, holistic health, and deliver{" "}
                    <span className="text-white font-semibold">HAPPINESS</span>.
                  </p>
                ),
              },
              {
                icon: Eye,
                title: "Our Vision",
                color: "from-blue-500/20 to-blue-600/5",
                borderColor: "hover:border-blue-500/30",
                glowColor: "bg-blue-500/10",
                content: (
                  <p className="text-slate-300 font-light leading-relaxed">
                    To become the most trusted & effective brand that delivers value and qualitative differences to organizations & people internationally within the next five years.
                  </p>
                ),
              },
              {
                icon: Star,
                title: "Our Values",
                color: "from-amber-500/20 to-amber-600/5",
                borderColor: "hover:border-amber-500/30",
                glowColor: "bg-amber-500/10",
                content: (
                  <ul className="space-y-3 text-slate-300 font-light">
                    {values.map((v, i) => (
                      <li key={i} className="flex items-center gap-3 group/item">
                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-accent/30 transition-colors">
                          <v.icon className="w-3 h-3 text-accent" />
                        </div>
                        {v.text}
                      </li>
                    ))}
                  </ul>
                ),
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard className="h-full">
                  <div className={`h-full relative bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-[1.5rem] border border-white/10 ${card.borderColor} transition-all duration-500 group overflow-hidden`}>
                    {/* Gradient bg on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-b ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[1.5rem]`} />
                    {/* Glow */}
                    <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 w-2/3 h-20 ${card.glowColor} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-white/10 group-hover:border-white/20 group-hover:scale-110 transition-all duration-500">
                        <card.icon className="w-6 h-6 text-accent" />
                      </div>
                      <h4 className="font-heading font-bold text-2xl text-white mb-5">{card.title}</h4>
                      {card.content}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founder Profile — Cinematic Split ─────────────────────── */}
      <section className="py-16 md:py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-accent/3 blur-[120px]" />
        </div>

        <div className="max-w-[1240px] mx-auto px-6 relative z-10">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10">
              <Award className="w-3 h-3 text-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/80">Leadership</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground tracking-tight">
              The Visionary
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left — Photo with overlay */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative">
                <TiltCard>
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/10 group">
                    {/* Image */}
                    <div className="aspect-[3/4] relative">
                      <img
                        src="/founder/image.png"
                        alt="Dr. Suvendu Das"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Name plate at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: false }}
                          transition={{ delay: 0.3, duration: 0.6 }}
                        >
                          <h4 className="font-heading font-bold text-3xl md:text-4xl text-white mb-2 drop-shadow-lg">
                            Dr. Suvendu Das
                          </h4>
                          <p className="text-accent text-sm font-bold tracking-widest uppercase">
                            Founder & Managing Director
                          </p>
                        </motion.div>
                      </div>
                    </div>

                    {/* Shimmer on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"
                      style={{
                        background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
                        backgroundSize: "250% 100%",
                        animation: "card-shimmer 2s ease-in-out infinite",
                      }}
                    />
                  </div>
                </TiltCard>

                {/* Floating stat cards around the photo */}
                <motion.div
                  initial={{ opacity: 0, x: -20, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
                  className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-border/50 p-4 z-30"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Award className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-heading font-bold text-foreground">40+</p>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Years</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Career Timeline — Moved to Left Column */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7 }}
                className="mt-16"
              >
                <h4 className="font-heading font-bold text-xl text-foreground mb-8 flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-accent" />
                  Recent Corporate Positions
                </h4>

                <div className="space-y-0 relative">
                  {/* Vertical timeline line */}
                  <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-primary via-accent to-primary/20 rounded-full" />

                  {positions.map((pos, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ delay: i * 0.15, duration: 0.6 }}
                      className="relative pl-12 pb-8 last:pb-0 group"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-[11px] top-2 w-[18px] h-[18px] rounded-full bg-background border-[3px] border-primary group-hover:bg-primary group-hover:scale-125 transition-all duration-300 z-10" />
                      
                      <div className="bg-white dark:bg-white/5 rounded-xl border border-border/50 p-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-accent mb-1">
                          {pos.period}
                        </p>
                        <h5 className="font-heading font-bold text-lg text-foreground mb-1">
                          {pos.role}
                        </h5>
                        <p className="text-sm text-muted-foreground">{pos.company}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right — Bio & Details */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              {/* Expertise badges — interactive pills */}
              <div className="mb-10">
                <h3 className="text-[11px] font-bold text-primary tracking-[0.2em] uppercase mb-5">
                  Areas of Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {founderBadges.map((badge, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 hover:bg-primary/10 hover:border-primary/25 transition-all duration-300 cursor-default"
                    >
                      <badge.icon className="w-3.5 h-3.5 text-primary/60 group-hover:text-primary transition-colors" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-primary/80 group-hover:text-primary transition-colors">
                        {badge.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bio text with staggered reveal */}
              <div className="space-y-5 mb-12">
                {[
                  "Dr. Suvendu Das is a People Management Expert, Spiritual Scientist, Life Transformer, Thought Therapist, Mind Masseur, Professional Trainer, Inspirational Speaker, Mentor, and Author.",
                  "Currently, as the Founder & Managing Director of Hiteisee Consulting, he is leading the consulting practice in People Strategy, IR, Employee Relations, Organisational Change, Learning & Development, CSR, Talent Management, and Legal Services.",
                  "Dr. Das has over 40 years of national corporate experience, having worked with organizations employing anywhere between 1,000 to 40,000 individuals in manufacturing, process, mining, service, healthcare, and hospitality. He is a certified Lead Auditor in IMS, a certified psychometric analyst, and a professional trainer on human behavior, having trained over 42,000 managers in India.",
                ].map((text, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="text-muted-foreground leading-relaxed"
                  >
                    {text}
                  </motion.p>
                ))}

              </div>

              {/* Additional Affiliations — Styled as Cards to balance layout */}
              <div className="grid sm:grid-cols-2 gap-6 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="bg-white dark:bg-white/5 rounded-2xl border border-border/50 p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 flex flex-col"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-foreground mb-3">Teaching Experience</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    An ardent academician, Dr. Das is a visiting professor at numerous prestigious institutions and has guided over 200 management students in their academic projects.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="bg-white dark:bg-white/5 rounded-2xl border border-border/50 p-6 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 flex flex-col"
                >
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-foreground mb-3">Professional Associations</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Chairman of NIPM – Utkal Chapter. Holds memberships in several professional organizations. Has served on advisory boards and as rapporteur at international conferences.
                  </p>
                </motion.div>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-12"
              >
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="group inline-flex items-center gap-3 h-14 px-10 rounded-full font-bold tracking-widest text-xs uppercase bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/15 transition-all duration-300"
                  >
                    Connect with Dr. Das
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Keyframes */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 200% center; }
        }
        @keyframes card-shimmer {
          0% { background-position: -250% center; }
          100% { background-position: 250% center; }
        }
      `}</style>
    </div>
  );
};

export default About;
