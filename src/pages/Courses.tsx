import AnimatedSection from "@/components/shared/AnimatedSection";
import { PageHero } from "@/components/shared/PageHero";
import { Clock, IndianRupee, ArrowRight, CheckCircle, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const courses = [
  { title: "CCA", desc: "Certificate in Computer Applications", duration: "3 Months", fee: "Contact Us", image: "/1.jpeg", level: "Beginner" },
  { title: "DCA", desc: "Diploma in Computer Applications", duration: "6 Months", fee: "Contact Us", image: "/2.jpeg", level: "Beginner" },
  { title: "PGDCA", desc: "Post Graduate Diploma", duration: "12 Months", fee: "Contact Us", image: "/3.jpeg", level: "Advanced" },
  { title: "ADCA", desc: "Advanced Diploma in Applications", duration: "12 Months", fee: "Contact Us", image: "/1.jpeg", level: "Advanced" },
  { title: "Tally ERP 9", desc: "Comprehensive Accounting Software", duration: "3 Months", fee: "Contact Us", image: "/2.jpeg", level: "Intermediate" },
  { title: "Spoken English", desc: "Fluency & Communication Skills", duration: "3 Months", fee: "Contact Us", image: "/3.jpeg", level: "Beginner" },
  { title: "Class 5th–10th Coaching", desc: "Foundation & Board Preparation", duration: "1 Year", fee: "Contact Us", image: "/1.jpeg", level: "Foundation" },
  { title: "+2 Arts & Commerce", desc: "Higher Secondary Education", duration: "2 Years", fee: "Contact Us", image: "/2.jpeg", level: "Higher Secondary" },
];

const features = [
  "Industry recognized certifications", 
  "Experienced professionals and instructors", 
  "Hands-on practicals and lab facilities", 
  "100% Job Placement Assistance"
];

const Courses = () => {
  return (
    <div className="min-h-screen">
      <PageHero 
        title="Our Courses" 
        subtitle="Check out our cutting-edge programs to jumpstart your career in the IT industry. All courses include practical training and job assistance." 
      />

      {/* Feature Highlights */}
      <section className="bg-card border-b border-border py-6 shadow-sm z-20 relative">
        <div className="section-container">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="section-padding bg-muted/30">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course, i) => (
              <AnimatedSection key={course.title} delay={i * 0.05}>
                <div className="group bg-card rounded-3xl overflow-hidden border border-border shadow-md hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                  {/* Image Header */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/1.jpeg";
                      }}
                    />
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full font-bold text-xs z-20 shadow-md flex items-center gap-1 text-primary">
                      <GraduationCap className="w-3.5 h-3.5" />
                      {course.level}
                    </div>
                  </div>
                  
                  {/* Content Body */}
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="font-heading font-bold text-xl mb-4 line-clamp-2 leading-tight group-hover:text-primary transition-colors min-h-[56px]">
                      {course.title}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-1.5 text-sm text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="font-medium">{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
                        <span className="text-primary">{course.fee}</span>
                      </div>
                    </div>
                    
                    <div className="mt-auto flex flex-col sm:flex-row gap-3">
                      <Link to="/apply" className="flex-2 w-full">
                        <Button className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
                          Enquiry Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="section-padding bg-card border-t border-border">
        <div className="section-container">
          <div className="bg-gradient-to-tr from-primary to-accent rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('/3.jpeg')] mix-blend-overlay opacity-20 object-cover" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Not Sure Which Course to Pick?</h2>
              <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                Get in touch with our expert counselors to help you find the right computer course suited for your background and career goals.
              </p>
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="px-10 rounded-full font-bold shadow-xl text-primary">
                  Talk to an Expert
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
