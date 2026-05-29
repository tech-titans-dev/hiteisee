import AnimatedSection from "@/components/shared/AnimatedSection";
import { PageHero } from "@/components/shared/PageHero";
import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background relative pb-20">
      <PageHero
        title="Privacy Policy"
        subtitle="Our commitment to protecting your personal information."
      />

      <section className="pt-16 pb-20 px-6 relative z-20">
        <div className="max-w-[1000px] mx-auto">
          <AnimatedSection>
            <div className="bg-card rounded-[2rem] p-8 md:p-14 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] border border-border">
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-widest">Hiteisee Consulting</p>
                  <h2 className="text-xl font-heading font-bold text-foreground">Privacy Policy</h2>
                </div>
              </div>
              <div className="space-y-6 text-muted-foreground leading-relaxed text-base">
                <p>
                  Our commitment to your privacy is paramount. We collect and store minimal personal data, solely for educational purposes. Your information remains confidential and is never shared with third parties. We employ robust security measures to protect data integrity.
                </p>
                <p>
                  By using our services, you consent to our Privacy Policy. For comprehensive details, kindly review our Privacy Policy on our website. Your trust is vital, and we are dedicated to safeguarding your privacy while providing an exceptional learning experience.
                </p>
                <p>
                  If you have any inquiries or concerns regarding how we handle your personal data, please do not hesitate to contact us at <a href="mailto:info@hiteisee.in" className="text-primary font-semibold hover:underline">info@hiteisee.in</a>.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
