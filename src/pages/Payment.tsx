import { PageHero } from "@/components/shared/PageHero";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  CheckCircle2, 
  ArrowRight, 
  Clock,
  Video,
  FileText,
  ShieldCheck,
  PhoneCall,
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
                <motion.div variants={item} className="group p-6 rounded-2xl bg-slate-50/80 border border-slate-100 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-primary/20 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/5 transition-transform duration-300">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-primary transition-colors">45-Minute Session</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">Comprehensive discussion block dedicated entirely to your specific needs.</p>
                </motion.div>
                
                <motion.div variants={item} className="group p-6 rounded-2xl bg-slate-50/80 border border-slate-100 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-primary/20 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/5 transition-transform duration-300">
                    <Video className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-primary transition-colors">Virtual Meeting</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">Conducted via secure video conference or direct audio call based on your preference.</p>
                </motion.div>
                
                <motion.div variants={item} className="group sm:col-span-2 p-6 rounded-2xl bg-slate-50/80 border border-slate-100 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-primary/20 transition-all duration-300 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary/5 transition-transform duration-300">
                    <FileText className="w-6 h-6 text-primary" />
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
              className="bg-gradient-to-b from-[#0f172a] to-[#020617] rounded-3xl p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-white sticky top-32 border border-slate-800 transition-shadow duration-500 overflow-hidden group"
            >
              {/* Premium glare effect */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out pointer-events-none" />

              <h3 className="text-sm font-bold mb-8 uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                Consultation Fee
              </h3>
              
              <div className="flex items-baseline gap-1 mb-8 border-b border-white/10 pb-8 relative">
                <span className="text-3xl font-medium text-slate-400">₹</span>
                <span className="text-6xl font-heading font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400">299</span>
                <span className="text-slate-400 font-medium ml-1">.00</span>
              </div>
              
              <div className="space-y-4 mb-10">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-medium">Base Fee</span>
                  <span className="text-slate-200 font-bold">₹299.00</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-medium">GST (Included)</span>
                  <span className="text-slate-200 font-bold text-emerald-400">₹0.00</span>
                </div>
                <div className="w-full h-px bg-gradient-to-r from-white/10 to-transparent" />
                <div className="flex justify-between items-center pt-2">
                  <span className="font-bold text-white tracking-wide">Total Payable</span>
                  <span className="text-2xl font-black text-white">₹299.00</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-300 mb-8 justify-center bg-white/5 py-3.5 rounded-xl border border-white/5 backdrop-blur-md uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Secure & Encrypted
              </div>

              <Link to="/checkout" className="block relative group/btn">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-2xl group-hover/btn:bg-primary/30 transition-colors duration-300" />
                <Button className="w-full h-14 rounded-xl text-sm font-bold uppercase tracking-[0.15em] bg-white text-slate-900 hover:bg-slate-100 hover:scale-[1.02] transition-all duration-300 relative shadow-xl z-10 flex items-center justify-center">
                  Proceed to Payment
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1.5 transition-transform" />
                 </Button>
              </Link>
              
              <p className="text-center text-[10px] text-slate-500 mt-6 uppercase tracking-[0.2em] font-bold">
                Terms & conditions apply
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
