import AnimatedSection from "@/components/shared/AnimatedSection";
import { PageHero } from "@/components/shared/PageHero";
import { AlertCircle } from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-background relative pb-20">
      <PageHero
        title="Disclaimer"
        subtitle="Important information regarding curriculum, outcomes, and liability."
      />

      <section className="pt-16 pb-20 px-6 relative z-20">
        <div className="max-w-[1000px] mx-auto">
          <AnimatedSection>
            <div className="bg-card rounded-[2rem] p-8 md:p-14 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] border border-border">
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
                <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center border border-amber-500/20">
                  <AlertCircle className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-widest">Brainstorm Computer Academy</p>
                  <h2 className="text-xl font-heading font-bold text-foreground">Disclaimer</h2>
                </div>
              </div>
              <div className="space-y-6 text-muted-foreground leading-relaxed text-base">
                <p>
                  While our Computer Institute strives for accuracy and quality in course content and website information, we cannot guarantee job placement, certification outcomes, or specific results. Course details and descriptions may change without prior notice.
                </p>
                <p>
                  We are not responsible for errors or omissions on the website. External links are for reference purposes, and the content of linked websites is beyond our control. Students are encouraged to verify information independently.
                </p>
                <div className="p-6 bg-amber-50 dark:bg-amber-500/10 rounded-2xl border border-amber-200 dark:border-amber-500/20">
                  <p className="text-amber-900 dark:text-amber-300 font-semibold m-0">
                    Your use of our services implies your acceptance of these disclaimers. If you have any concerns, please contact us. We are committed to providing an enriching educational experience for all our students.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
