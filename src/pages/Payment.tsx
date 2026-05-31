import { PageHero } from "@/components/shared/PageHero";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Clock,
  Video,
  FileText,
  ShieldCheck,
  Calendar,
  Sparkles
} from "lucide-react";

export default function Payment() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 relative pb-24">
      <PageHero
        title="Consultation Details"
        subtitle="Review the details of your professional consultation before proceeding to secure payment."
      />

      <div className="max-w-[1100px] mx-auto px-6 relative z-20 mt-16">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left info column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 xl:col-span-8 space-y-8"
          >
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm hover:shadow-md transition-shadow duration-500 border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
              
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary shrink-0 shadow-inner">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-black text-slate-900 tracking-tight">Expert Strategic Consultation</h2>
              </div>
              
              <p className="text-slate-600 text-[1.05rem] leading-relaxed mb-10 font-medium relative z-10">
                Book a 1-on-1 strategic consultation session with our senior advisors. This session is designed to address your specific corporate challenges, human capital planning, or industrial relations queries.
              </p>

              <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="grid sm:grid-cols-2 gap-5 mb-10 relative z-10"
              >
                <motion.div variants={item} className="group p-6 rounded-2xl bg-white border border-slate-100 hover:shadow-[0_8px_30px_rgba(222,47,11,0.04)] hover:border-accent/40 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-300">
                    <Clock className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-primary transition-colors">45-Minute Session</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">Comprehensive discussion block dedicated entirely to your specific needs.</p>
                </motion.div>
                
                <motion.div variants={item} className="group p-6 rounded-2xl bg-white border border-slate-100 hover:shadow-[0_8px_30px_rgba(222,47,11,0.04)] hover:border-accent/40 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-300">
                    <Video className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-primary transition-colors">Virtual Meeting</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">Conducted via secure video conference or direct audio call based on your preference.</p>
                </motion.div>
                
                <motion.div variants={item} className="group sm:col-span-2 p-6 rounded-2xl bg-white border border-slate-100 hover:shadow-[0_8px_30px_rgba(222,47,11,0.04)] hover:border-accent/40 hover:-translate-y-0.5 transition-all duration-300 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-300">
                    <FileText className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-primary transition-colors">Actionable Summary</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">Receive a detailed follow-up document outlining key strategies discussed and recommended next steps.</p>
                  </div>
                </motion.div>
              </motion.div>

              <div className="p-7 bg-gradient-to-br from-primary/[0.03] to-transparent rounded-2xl border border-primary/10 relative z-10">
                <h4 className="font-bold text-slate-900 mb-5 flex items-center gap-2.5 text-base">
                  <Calendar className="w-5 h-5 text-primary" />
                  What to prepare:
                </h4>
                <ul className="space-y-3.5">
                  {["Brief overview of your current challenges", "Specific goals you want to achieve", "Any relevant background documentation"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 text-sm font-semibold">
                      <div className="w-5 h-5 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </div>
                      <span className="pt-0.5">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Right Pricing Column */}
          <div className="lg:col-span-5 xl:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="bg-white rounded-3xl p-8 lg:p-10 shadow-[0_20px_50px_rgba(222,47,11,0.03)] hover:shadow-[0_20px_50px_rgba(222,47,11,0.06)] text-slate-900 sticky top-32 border border-slate-100 hover:border-accent/20 transition-all duration-500 overflow-hidden group"
            >
              {/* Premium glare effect */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
              <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-accent/[0.03] to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out pointer-events-none" />

              <h3 className="text-sm font-bold mb-8 uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                Consultation Fee
              </h3>
              
              <div className="flex items-baseline gap-1 mb-8 border-b border-slate-100 pb-8 relative">
                <span className="text-3xl font-medium text-accent">₹</span>
                <span className="text-6xl font-heading font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-slate-950 to-slate-800">299</span>
                <span className="text-slate-400 font-medium ml-1">.00</span>
              </div>
              
              <div className="space-y-4 mb-10">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-slate-500">Base Fee</span>
                  <span className="text-slate-800 font-bold">₹299.00</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-slate-500">GST (Included)</span>
                  <span className="text-slate-800 font-bold text-emerald-600">₹0.00</span>
                </div>
                <div className="w-full h-px bg-gradient-to-r from-slate-100 to-transparent" />
                <div className="flex justify-between items-center pt-2">
                  <span className="font-bold text-slate-900 tracking-wide">Total Payable</span>
                  <span className="text-2xl font-black text-slate-950">₹299.00</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 mb-8 justify-center bg-slate-50/80 py-3.5 rounded-xl border border-slate-100 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Secure & Encrypted
              </div>

              <Link to="/checkout" className="block relative group/btn overflow-hidden rounded-xl">
                {/* Glowing luxury gold aura under the button */}
                <div className="absolute inset-0 bg-accent/25 blur-xl rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                
                {/* Animated sliding background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-amber-500 translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />

                <Button className="w-full h-14 rounded-xl text-sm font-bold uppercase tracking-[0.15em] bg-white border border-slate-200 text-slate-900 group-hover/btn:text-white group-hover/btn:border-transparent transition-all duration-500 relative z-10 flex items-center justify-center shadow-md shadow-slate-100 group-hover/btn:shadow-xl group-hover/btn:shadow-accent/25 hover:bg-transparent">
                  Proceed to Payment
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </Button>
              </Link>
              
              <p className="text-center text-[10px] text-slate-400 mt-6 uppercase tracking-[0.2em] font-bold">
                Terms & conditions apply
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
