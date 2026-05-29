import AnimatedSection from "@/components/shared/AnimatedSection";
import { Link } from "react-router-dom";
import { PageHero } from "@/components/shared/PageHero";

const Legal = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHero 
        title="Legal & Verification" 
        subtitle="Below are the official recognition documents, ISO certificates, and legal verifications of Brainstorm Computer Academy." 
      />

      <section className="section-padding">
        <div className="section-container max-w-4xl">
          <AnimatedSection delay={0.1}>
            <div className="bg-card border border-border rounded-3xl p-4 md:p-8 shadow-2xl relative group overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" />
               <img 
                 src="/legal/docs.jpg" 
                 alt="Brainstorm Legal Documents" 
                 className="w-full h-auto rounded-xl shadow-lg border border-border/50 transition-transform duration-700 hover:scale-[1.02]" 
                 loading="lazy"
               />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Legal;
