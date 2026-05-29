import AnimatedSection from "@/components/shared/AnimatedSection";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/shared/PageHero";

const Jobs = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHero 
        title="Join Our Team" 
        subtitle="Explore exciting career opportunities at Brainstorm and help us shape the future of digital education." 
      />

      <section className="section-padding">
        <div className="section-container max-w-4xl">
          <AnimatedSection delay={0.1}>
            <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-border/50 rounded-3xl bg-card">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold font-heading mb-4">No Open Positions Currently</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8 text-lg">
                We are currently not hiring, but we are always looking for passionate educators and professionals.
              </p>
              <Link to="/contact">
                <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20 hover:shadow-primary/40">
                  Send Your Resume
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Jobs;
