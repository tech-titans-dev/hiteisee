import { PageHero } from "@/components/shared/PageHero";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Mail, Briefcase, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Careers = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageHero 
        title="Career at Hiteisee" 
        subtitle="Join our team of passionate professionals dedicated to transforming businesses and fostering sustainable growth." 
        theme="career"
      />

      <section className="py-12 relative overflow-hidden bg-background">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[50%] bg-accent/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-[700px] mx-auto px-6 relative z-10">
          <AnimatedSection>
            <div className="glass-card rounded-3xl p-6 md:p-10 border border-border shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-10 transition-colors duration-500 group-hover:bg-primary/10" />
              
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-105 transition-transform duration-500">
                <Briefcase className="w-6 h-6" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3 tracking-tight">
                Didn't Find Your <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Desired Role?</span>
              </h2>
              
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-light">
                Don’t worry. At Hiteisee, we are always on the lookout for passionate, talented individuals who share our commitment to sustainable business transformation and innovation. While there may not be an open position that matches your specific skills or career goals at this moment, we encourage you to stay connected with us.
              </p>

              <a 
                href="mailto:career@hiteisee.in" 
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3.5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-primary/90 hover:scale-[1.02] transition-all shadow-[0_8px_20px_rgba(30,58,138,0.15)] group/btn"
              >
                <Mail className="w-3.5 h-3.5" />
                Send Application via Email
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Careers;
