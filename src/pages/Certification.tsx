import AnimatedSection from "@/components/shared/AnimatedSection";
import { Award, CheckCircle, Shield, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const certTypes = [
  { title: "Course Completion Certificate", desc: "Awarded upon successful completion of any registered course program.", icon: FileText },
  { title: "Proficiency Certificate", desc: "For students who demonstrate exceptional performance in assessments.", icon: Award },
  { title: "Industry Certification", desc: "Recognized by industry partners and valid for employment applications.", icon: Shield },
];

const Certification = () => (
  <div className="min-h-screen">
    <section className="bg-primary text-primary-foreground section-padding">
      <div className="section-container">
        <AnimatedSection>
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Certification</span>
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold mt-3 mb-4">Certification Programs</h1>
          <p className="text-primary-foreground/80 max-w-2xl text-lg">Industry-recognized certifications that validate your skills and boost career prospects.</p>
        </AnimatedSection>
      </div>
    </section>

    <section className="section-padding">
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-6">
          {certTypes.map((c, i) => (
            <AnimatedSection key={c.title} delay={i * 0.1}>
              <div className="card-elevated p-8 text-center h-full">
                <c.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-heading font-bold text-lg mb-3">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-muted/50">
      <div className="section-container max-w-3xl">
        <AnimatedSection className="text-center mb-10">
          <h2 className="text-3xl font-heading font-bold">Certification <span className="gradient-text">Process</span></h2>
        </AnimatedSection>
        {["Enroll in a course program", "Complete coursework and practical projects", "Pass the certification examination", "Receive your verified digital & physical certificate"].map((step, i) => (
          <AnimatedSection key={step} delay={i * 0.1}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</div>
              <p className="text-muted-foreground pt-1">{step}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>

    <section className="section-padding bg-primary text-primary-foreground text-center">
      <div className="section-container">
        <AnimatedSection>
          <h2 className="text-3xl font-heading font-bold mb-4">Verify a Certificate</h2>
          <p className="text-primary-foreground/80 mb-8">Use our verification portal to validate any Brainstorm certificate.</p>
          <div className="flex justify-center gap-4">
            <Link to="/verification"><Button variant="cta" size="lg">Verify Now</Button></Link>
            <Link to="/apply"><Button variant="hero-outline" size="lg" className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary">Apply for Certification</Button></Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </div>
);

export default Certification;
