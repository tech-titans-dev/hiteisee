import AnimatedSection from "@/components/shared/AnimatedSection";
import { PageHero } from "@/components/shared/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Phone, MapPin, MessageSquare, Send, Clock, Building, CalendarCheck } from "lucide-react";

const Apply = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Application submitted successfully! We'll contact you shortly.");
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHero 
        title="Apply Online" 
        subtitle="Take the first step towards your digital mastery. Fill out the application form below."
        bgImage="/2.jpeg"
      />

      {/* Main Dual-Column Section (Compact Light Theme) */}
      <section className="relative py-12 md:py-20 overflow-hidden bg-slate-50/50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-100/50 rounded-full blur-[100px] pointer-events-none" />

        <div className="section-container relative z-10 max-w-[1100px]">
          <div className="grid lg:grid-cols-12 gap-10 md:gap-14 items-start">
            
            {/* Left Column: Contact & Info Box */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <AnimatedSection direction="left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-100/80 text-blue-700 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm border border-blue-200/50">
                  <MessageSquare className="w-3.5 h-3.5" /> Have Queries?
                </div>
                
                <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-800 leading-[1.15] mb-4">
                  Enroll <span className="text-blue-600">Today</span>
                </h2>
                
                <p className="text-slate-500 leading-relaxed mb-10 text-sm font-medium">
                  We're here to guide you through every step of your educational journey. Get fast answers to your questions.
                </p>

                <div className="space-y-8 relative border-l-2 border-slate-200/60 pl-6 ml-3">
                  <div className="flex flex-col gap-1 relative group">
                    <div className="absolute -left-[45px] top-0 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0 group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
                      <Phone className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Call Us</h4>
                    <a href="tel:+919237536004" className="block text-slate-700 font-bold hover:text-blue-600 transition-colors text-sm">+91 92375 36004</a>
                    <a href="tel:+919861842434" className="block text-slate-700 font-bold hover:text-blue-600 transition-colors text-sm">+91 98618 42434</a>
                  </div>

                  <div className="flex flex-col gap-1 relative group">
                    <div className="absolute -left-[45px] top-0 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0 group-hover:bg-sky-50 group-hover:border-sky-200 transition-colors">
                      <Mail className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors" />
                    </div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Email Support</h4>
                    <a href="mailto:info@hiteisee.in" className="block text-slate-700 font-bold hover:text-sky-600 transition-colors text-sm">info@hiteisee.in</a>
                  </div>

                  <div className="flex flex-col gap-1 relative group">
                    <div className="absolute -left-[45px] top-0 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0 group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-colors">
                      <MapPin className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                    </div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Office</h4>
                    <p className="text-slate-700 font-bold text-sm leading-tight">Near New Bus Stand,<br/><span className="text-slate-500 font-medium text-xs mt-0.5 block">Pallahat, Khordha - 752056</span></p>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Right Column: Compact Application Form */}
            <div className="lg:col-span-8">
              <AnimatedSection direction="up" delay={0.2}>
                <div className="bg-white p-6 md:p-8 lg:p-10 rounded-2xl border border-slate-200/60 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden group">
                  <div className="mb-8">
                    <h3 className="text-2xl font-heading font-extrabold text-slate-800 mb-1.5 flex items-center gap-2">
                      <CalendarCheck className="w-5 h-5 text-blue-500"/> Submit Application
                    </h3>
                    <p className="text-slate-500 text-sm font-medium">Please provide accurate details for registration.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <Label htmlFor="firstName" className="text-slate-700 text-xs font-bold uppercase tracking-wider ml-1">First Name <span className="text-red-500">*</span></Label>
                        <Input id="firstName" required placeholder="John" className="bg-slate-50/50 border-slate-200 text-slate-800 font-medium placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-blue-500 h-11 rounded-lg" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="lastName" className="text-slate-700 text-xs font-bold uppercase tracking-wider ml-1">Last Name <span className="text-red-500">*</span></Label>
                        <Input id="lastName" required placeholder="Doe" className="bg-slate-50/50 border-slate-200 text-slate-800 font-medium placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-blue-500 h-11 rounded-lg" />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-slate-700 text-xs font-bold uppercase tracking-wider ml-1">Email <span className="text-red-500">*</span></Label>
                        <Input id="email" type="email" required placeholder="john@example.com" className="bg-slate-50/50 border-slate-200 text-slate-800 font-medium placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-blue-500 h-11 rounded-lg" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="phone" className="text-slate-700 text-xs font-bold uppercase tracking-wider ml-1">Mobile No <span className="text-red-500">*</span></Label>
                        <Input id="phone" type="tel" required placeholder="+91 XXXXX XXXXX" className="bg-slate-50/50 border-slate-200 text-slate-800 font-medium placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-blue-500 h-11 rounded-lg" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-slate-700 text-xs font-bold uppercase tracking-wider ml-1">Select Program <span className="text-red-500">*</span></Label>
                      <Select required>
                        <SelectTrigger className="bg-slate-50/50 border-slate-200 text-slate-800 focus:ring-blue-500 h-11 rounded-lg font-medium">
                          <SelectValue placeholder="Choose a course" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-slate-200 text-slate-800 rounded-lg shadow-xl">
                          {["Computer Basics (CCC)", "Data Automation & Analytics", "Tally ERP 9 And Prime", "Python Programming With AI", "Full Stack Web Development", "Graphic Design"].map((c) => (
                            <SelectItem key={c} value={c.toLowerCase().replace(/\s+/g, "-")} className="hover:bg-blue-50 focus:bg-blue-50 cursor-pointer py-2.5 font-medium">{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="qualification" className="text-slate-700 text-xs font-bold uppercase tracking-wider ml-1">Highest Qualification</Label>
                      <Input id="qualification" placeholder="e.g., 12th Pass, Graduate Base" className="bg-slate-50/50 border-slate-200 text-slate-800 font-medium placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-blue-500 h-11 rounded-lg" />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-slate-700 text-xs font-bold uppercase tracking-wider ml-1">Additional Notes</Label>
                      <Textarea id="message" placeholder="Optional comments or requirements..." rows={3} className="bg-slate-50/50 border-slate-200 text-slate-800 font-medium placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-blue-500 resize-none rounded-lg p-3" />
                    </div>
                    
                    <div className="pt-3">
                      <Button size="lg" type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-lg font-bold text-sm shadow-[0_4px_14px_rgba(37,99,235,0.25)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.35)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                        Submit Application <Send className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </form>
                </div>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      {/* Modern Compact Map & Campus Details Section */}
      <section className="py-12 md:py-20 bg-white border-t border-slate-100">
        <div className="section-container max-w-[1100px]">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-10 items-stretch">
            
            {/* Left: Interactive Map */}
            <AnimatedSection direction="left" className="h-[350px] md:h-[400px]">
              <div className="w-full h-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative group">
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-md border border-slate-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">Our Location</span>
                </div>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3744.9750058981453!2d85.6171542!3d20.1768484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19abccaccc6f23%3A0xe7a505b22b27bc1d!2sNew%20Bus%20Stand%2C%20Pallahat%2C%20Khordha!5e0!3m2!1sen!2sin!4v1711718873095!5m2!1sen!2sin" 
                  className="w-full h-full border-0 absolute inset-0 filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" 
                  allowFullScreen={true} 
                  loading="lazy" 
                  title="Hiteisee Location Map"
                ></iframe>
              </div>
            </AnimatedSection>

            {/* Right: Campus & Timing Details */}
            <AnimatedSection direction="right" className="h-full">
              <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-8 lg:p-12 h-full flex flex-col justify-center relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
                
                <h3 className="text-2xl lg:text-3xl font-heading font-extrabold text-slate-800 mb-8 tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">Visit Our</span> Campus
                </h3>
                
                <div className="space-y-8 relative z-10">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <Building className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-1">Head Office</h4>
                      <p className="text-slate-700 font-medium text-sm leading-relaxed">
                        Near New Bus Stand, Pallahat,<br/>
                        Khordha, Odisha - 752056
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="w-full">
                      <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">Business Hours</h4>
                      <div className="space-y-1.5 text-sm">
                        <div className="flex justify-between items-center border-b border-slate-200 pb-1.5">
                          <span className="text-slate-600 font-medium">Monday - Saturday</span>
                          <span className="text-slate-800 font-bold">07:00 AM - 08:00 PM</span>
                        </div>
                        <div className="flex justify-between items-center pt-0.5">
                          <span className="text-slate-600 font-medium">Sunday</span>
                          <span className="text-slate-800 font-bold">08:00 AM - 02:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Apply;
