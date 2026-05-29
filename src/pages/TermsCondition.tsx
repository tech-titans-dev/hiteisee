import AnimatedSection from "@/components/shared/AnimatedSection";
import { PageHero } from "@/components/shared/PageHero";
import { FileText } from "lucide-react";

export default function TermsCondition() {
  return (
    <div className="min-h-screen bg-background relative pb-20">
      <PageHero
        title="Terms & Conditions"
        subtitle="Please review these guidelines before using our services."
      />

      <section className="pt-16 pb-20 px-6 relative z-20">
        <div className="max-w-[1000px] mx-auto">
          <AnimatedSection>
            <div className="bg-card rounded-[2rem] p-8 md:p-14 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] border border-border">
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-widest">Brainstorm Computer Academy</p>
                  <h2 className="text-xl font-heading font-bold text-foreground">Terms & Conditions</h2>
                </div>
              </div>
              <p className="text-muted-foreground text-base mb-8 font-medium">
                Welcome to our Computer Institute. Please review these Terms and Conditions before using our services:
              </p>
              <ul className="space-y-5 text-muted-foreground list-none">
                {[
                  ["Registration", "You must provide accurate information during registration and agree to comply with our policies."],
                  ["Payment", "Tuition fees must be paid in full before the course starts, and we accept various payment methods for your convenience."],
                  ["Refund Policy", "Refunds are available within the first week of the course. No refunds will be issued after this period."],
                  ["Conduct", "Respectful and ethical behavior is expected of all students. Any disruptive or unethical conduct may result in expulsion without a refund."],
                  ["Course Materials", "All course materials provided are for personal use only and may not be distributed or reproduced without permission."],
                  ["Intellectual Property", "All content on our website is protected by copyright. Unauthorized use of our materials is prohibited."],
                  ["Privacy", "We value your privacy and collect only necessary information. We do not share your data with third parties."],
                  ["Disclaimers", "We do not guarantee job placement or specific outcomes. Course details may change without notice."],
                  ["Modifications", "We reserve the right to change these terms and conditions. Updated terms will be posted on our website."],
                ].map(([title, body]) => (
                  <li key={title} className="flex gap-4 p-4 rounded-xl hover:bg-muted/40 transition-colors group">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0 group-hover:scale-125 transition-transform" />
                    <p><strong className="text-foreground font-bold">{title}:</strong> {body}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-10 p-6 bg-muted/40 rounded-2xl border border-border text-muted-foreground text-sm font-medium">
                By using our services, you agree to these Terms and Conditions. If you have any questions, please contact our support team.
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
