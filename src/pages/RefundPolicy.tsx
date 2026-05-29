import AnimatedSection from "@/components/shared/AnimatedSection";
import { PageHero } from "@/components/shared/PageHero";
import { RefreshCcw } from "lucide-react";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-background relative pb-20">
      <PageHero
        title="Refund Policy"
        subtitle="Information regarding cancellations and fee refunds."
      />

      <section className="pt-16 pb-20 px-6 relative z-20">
        <div className="max-w-[1000px] mx-auto">
          <AnimatedSection>
            <div className="bg-card rounded-[2rem] p-8 md:p-14 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] border border-border">
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
                <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center border border-sky-500/20">
                  <RefreshCcw className="w-6 h-6 text-sky-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-widest">Brainstorm Computer Academy</p>
                  <h2 className="text-xl font-heading font-bold text-foreground">Refund Policy</h2>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Tuition Fee Refunds</h3>
              <p className="text-muted-foreground leading-relaxed text-base mb-8">
                We aim to provide the highest quality education. However, if you determine that the course is not right for you, we have established the following refund policy.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Refunds are strictly limited to the first week (7 days) of the course start date.",
                  "No refunds of any kind will be issued after the first week has concluded.",
                  "If a student is expelled due to unethical or disruptive conduct, no refund will be provided regardless of the timeframe.",
                  "Application and registration fees are non-refundable.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 p-4 rounded-xl bg-muted/40 border border-border hover:border-primary/30 transition-colors group">
                    <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                      <span className="text-xs font-extrabold text-primary">{i + 1}</span>
                    </div>
                    <p className="text-muted-foreground text-base leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
              <div className="p-6 bg-muted/40 rounded-2xl border border-border text-center">
                <p className="text-foreground font-semibold">
                  To request a refund within the eligible period, please contact our support team with your student ID and payment receipt.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
