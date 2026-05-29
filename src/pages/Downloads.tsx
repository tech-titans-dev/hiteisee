import AnimatedSection from "@/components/shared/AnimatedSection";
import { FileText, FileDown } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";

const files = [
  { name: "Brainstorm Admission Form 2024", type: "PDF", size: "245 KB" },
  { name: "Syllabus - Data Automation & Analytics", type: "PDF", size: "1.2 MB" },
  { name: "Syllabus - Master Diploma in Computer App", type: "PDF", size: "980 KB" },
  { name: "Fee Structure Overview 2024-25", type: "PDF", size: "120 KB" },
  { name: "Student Code of Conduct & Rules", type: "PDF", size: "2.1 MB" },
  { name: "Brainstorm Franchise Registration Form", type: "PDF", size: "180 KB" },
];

const Downloads = () => (
  <div className="min-h-screen bg-background relative pb-20">
    <PageHero 
      title="Download Center"
      subtitle="Access important admission forms, detailed syllabi, fee structures, and application documents."
    />

    <section className="pt-16 pb-20 bg-muted/20 relative z-10">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -z-10" />
      
      <div className="section-container max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {files.map((file, i) => (
            <AnimatedSection key={file.name} delay={i * 0.05} direction="up">
              <div className="card-elevated p-6 flex items-center justify-between group bg-card hover:bg-muted/50 border border-border rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary/10 to-primary/5 flex items-center justify-center border border-primary/10 group-hover:scale-110 transition-transform">
                    <FileText className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-base mb-1 group-hover:text-primary transition-colors">{file.name}</div>
                    <div className="text-xs font-semibold tracking-wider text-muted-foreground flex items-center gap-2">
                       <span className="bg-muted px-2 py-0.5 rounded text-foreground">{file.type}</span>
                       <span>•</span>
                       <span>{file.size}</span>
                    </div>
                  </div>
                </div>
                <button className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center hover:bg-primary transition-colors group/btn shrink-0 ml-4 border border-primary/10 hover:shadow-[0_0_15px_rgba(var(--primary),0.4)]">
                  <FileDown className="w-5 h-5 text-primary group-hover/btn:text-primary-foreground transition-colors" />
                </button>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Downloads;
