import { PageHero } from "@/components/shared/PageHero";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Mail, Phone, Building, ArrowRight, MessageSquare, Send } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { addContact } from "@/lib/adminData";
import { toast } from "sonner";
import { useCallback } from "react";

// ─── 3D Tilt Card Component ──────────────────────────────────────────────────

const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

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
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
};

const Contact = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const firstName = (form.elements.namedItem('firstName') as HTMLInputElement).value;
    const lastName = (form.elements.namedItem('lastName') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    addContact({
      name: `${firstName} ${lastName}`.trim(),
      email,
      phone,
      subject: "New Website Inquiry",
      message
    });

    toast.success('Inquiry submitted successfully!');
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <PageHero
        title="Start a Conversation"
        subtitle="Connect with our experts to discuss how we can help transform your business and create sustainable competitive advantage."
      />

      <section className="py-20 md:py-28 relative overflow-hidden bg-background">
        {/* Parallax background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[120px]" />
          <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-accent/3 blur-[100px]" />
        </div>

        <div className="max-w-[1240px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Left Column: Typography & Contact Details */}
            <div className="lg:col-span-5">
              <AnimatedSection direction="up" delay={0.1}>
                <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 backdrop-blur-sm">
                  <MessageSquare className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/80">Get In Touch</span>
                </div>
                
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-foreground mb-6 tracking-tight leading-[1.1]">
                  Let's shape the{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[size:200%_auto] animate-[gradient-shift_3s_ease-in-out_infinite]">
                    future together.
                  </span>
                </h3>
                
                <p className="text-base md:text-lg text-muted-foreground font-light mb-12 leading-relaxed border-l-2 border-primary/20 pl-4">
                  Whether you're looking for strategic HR consulting or comprehensive industrial relations management, our team is ready to deliver complete people solutions.
                </p>
              </AnimatedSection>

              <div className="space-y-6">
                <AnimatedSection direction="up" delay={0.2}>
                  <TiltCard>
                    <div className="flex gap-5 group bg-white dark:bg-white/5 p-6 rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <Building className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                      </div>
                      <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
                        <h4 className="font-heading font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">Corporate Headquarters</h4>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">
                          2/6, Kanchanjanga VIP Enclaves, Chandrasekharpur, Bhubaneswar - 751016, Odisha, India
                        </p>
                      </div>
                    </div>
                  </TiltCard>
                </AnimatedSection>

                <AnimatedSection direction="up" delay={0.3}>
                  <TiltCard>
                    <div className="flex gap-5 group bg-white dark:bg-white/5 p-6 rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                        <Phone className="w-5 h-5 text-accent group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex flex-col gap-1" style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
                        <h4 className="font-heading font-bold text-lg text-foreground mb-1 group-hover:text-accent transition-colors">Direct Lines</h4>
                        <a href="tel:+918763666511" className="text-sm text-muted-foreground font-light hover:text-foreground transition-colors inline-block hover:translate-x-1 duration-300">+91 8763666511 / 8591231077</a>
                        <a href="tel:06742744700" className="text-sm text-muted-foreground font-light hover:text-foreground transition-colors inline-block hover:translate-x-1 duration-300">0674-2744700</a>
                      </div>
                    </div>
                  </TiltCard>
                </AnimatedSection>

                <AnimatedSection direction="up" delay={0.4}>
                  <TiltCard>
                    <div className="flex gap-5 group bg-white dark:bg-white/5 p-6 rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <Mail className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                      </div>
                      <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
                        <h4 className="font-heading font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">Electronic Mail</h4>
                        <a href="mailto:info@hiteisee.in" className="text-base text-muted-foreground font-medium hover:text-foreground transition-colors inline-block hover:translate-x-1 duration-300">info@hiteisee.in</a>
                      </div>
                    </div>
                  </TiltCard>
                </AnimatedSection>
              </div>
            </div>

            {/* Right Column: Premium Glassmorphic Contact Form */}
            <div className="lg:col-span-7">
              <AnimatedSection direction="left" delay={0.3}>
                <motion.div 
                  className="relative p-[1px] rounded-[2rem] overflow-hidden group/form shadow-2xl shadow-black/5"
                  whileHover="hovered"
                  initial="idle"
                >
                  {/* Rotating gradient border effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/30 to-primary/30 rounded-[2rem] opacity-50 blur-[2px]" />
                  
                  {/* Form Container */}
                  <div className="relative bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl p-8 md:p-12 rounded-[2rem] border border-white/50 dark:border-white/10 z-10 h-full overflow-hidden">
                    {/* Inner glowing orb */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10 group-hover/form:bg-primary/20 group-hover/form:scale-110 transition-all duration-700" />
                    
                    <div className="mb-8 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                        <Send className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-foreground">Send an Inquiry</h3>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="relative group">
                          <input 
                            type="text" 
                            id="firstName"
                            required
                            className="w-full bg-black/5 dark:bg-white/5 border border-border focus:border-primary px-4 pt-6 pb-2 outline-none transition-all duration-300 peer rounded-xl focus:bg-white dark:focus:bg-black/50 shadow-inner"
                            placeholder=" "
                          />
                          <label htmlFor="firstName" className="absolute left-4 top-4 text-sm font-semibold text-muted-foreground transition-all duration-300 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-primary peer-focus:uppercase peer-focus:tracking-widest peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:tracking-widest cursor-text">
                            First Name
                          </label>
                        </div>
                        <div className="relative group">
                          <input 
                            type="text" 
                            id="lastName"
                            required
                            className="w-full bg-black/5 dark:bg-white/5 border border-border focus:border-primary px-4 pt-6 pb-2 outline-none transition-all duration-300 peer rounded-xl focus:bg-white dark:focus:bg-black/50 shadow-inner"
                            placeholder=" "
                          />
                          <label htmlFor="lastName" className="absolute left-4 top-4 text-sm font-semibold text-muted-foreground transition-all duration-300 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-primary peer-focus:uppercase peer-focus:tracking-widest peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:tracking-widest cursor-text">
                            Last Name
                          </label>
                        </div>
                      </div>

                      <div className="relative group">
                        <input 
                          type="email" 
                          id="email"
                          required
                          className="w-full bg-black/5 dark:bg-white/5 border border-border focus:border-primary px-4 pt-6 pb-2 outline-none transition-all duration-300 peer rounded-xl focus:bg-white dark:focus:bg-black/50 shadow-inner"
                          placeholder=" "
                        />
                        <label htmlFor="email" className="absolute left-4 top-4 text-sm font-semibold text-muted-foreground transition-all duration-300 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-primary peer-focus:uppercase peer-focus:tracking-widest peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:tracking-widest cursor-text">
                          Corporate Email
                        </label>
                      </div>

                      <div className="relative group">
                        <input 
                          type="tel" 
                          id="phone"
                          className="w-full bg-black/5 dark:bg-white/5 border border-border focus:border-primary px-4 pt-6 pb-2 outline-none transition-all duration-300 peer rounded-xl focus:bg-white dark:focus:bg-black/50 shadow-inner"
                          placeholder=" "
                        />
                        <label htmlFor="phone" className="absolute left-4 top-4 text-sm font-semibold text-muted-foreground transition-all duration-300 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-primary peer-focus:uppercase peer-focus:tracking-widest peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:tracking-widest cursor-text">
                          Phone Number
                        </label>
                      </div>

                      <div className="relative group">
                        <textarea 
                          id="message"
                          rows={5}
                          required
                          className="w-full bg-black/5 dark:bg-white/5 border border-border focus:border-primary px-4 pt-6 pb-2 outline-none transition-all duration-300 peer rounded-xl resize-none focus:bg-white dark:focus:bg-black/50 shadow-inner"
                          placeholder=" "
                        />
                        <label htmlFor="message" className="absolute left-4 top-4 text-sm font-semibold text-muted-foreground transition-all duration-300 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-primary peer-focus:uppercase peer-focus:tracking-widest peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:tracking-widest cursor-text">
                          Write your message
                        </label>
                      </div>

                      <motion.button 
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full inline-flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all shadow-xl group/btn overflow-hidden relative"
                      >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{
                            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)",
                            backgroundSize: "200% 100%",
                            animation: "card-shimmer 2s ease-in-out infinite",
                          }}
                        />
                        <span className="relative z-10">Submit Inquiry</span>
                        <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                      </motion.button>
                    </form>
                  </div>
                </motion.div>
              </AnimatedSection>
            </div>
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

export default Contact;
