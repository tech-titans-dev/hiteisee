import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   ShieldCheck, CheckCircle2, XCircle, Search,
   Fingerprint, Loader2, ArrowLeft, Download,
   Award, Calendar, User, BookOpen, ExternalLink,
   Code2, Database, Cpu, Star, GraduationCap, Printer
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const floatingIcons = [
   { Icon: Code2, x: "10%", y: "15%", delay: 0, size: 28 },
   { Icon: Database, x: "85%", y: "10%", delay: 0.5, size: 22 },
   { Icon: GraduationCap, x: "75%", y: "75%", delay: 1, size: 30 },
   { Icon: Star, x: "15%", y: "80%", delay: 1.5, size: 20 },
   { Icon: Cpu, x: "50%", y: "5%", delay: 0.3, size: 20 },
];

const Verification = () => {
   const [certNumber, setCertNumber] = useState("");
   const [isVerifying, setIsVerifying] = useState(false);
   const [verificationResult, setVerificationResult] = useState<any>(null);

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsVerifying(true);
      setVerificationResult(null);

      // Premium database lookup simulation
      setTimeout(() => {
         setIsVerifying(false);
         const cleanCert = certNumber.trim().toUpperCase();
         if (cleanCert === "BRN-2024-001") {
            setVerificationResult({
               status: 'success',
               id: "BRN-2024-001",
               name: "AMIT KUMAR",
               course: "ADCA (Advanced Diploma in Computer Applications)",
               issueDate: "March 15, 2024",
               grade: "A+",
               validUntil: "Lifetime",
               authHash: "4f8c92b...ea91",
               verifiedOn: new Date().toLocaleString(),
               institution: "Brainstorm Computer Academy, Berhampur",
            });
            toast.success("Identity & Credential Authenticated.");
         } else {
            setVerificationResult({
               status: 'error',
               message: "Identification Failure: No matching record found in the central registry. Please verify the ID and try again."
            });
            toast.error("Integrity check failed.");
         }
      }, 2500);
   };

   const handleDownload = () => {
      toast.loading("Encrypting digital certificate...");
      setTimeout(() => {
         toast.success("Authentic Certificate Downloaded.");
      }, 2000);
   };

   return (
      <div className="fixed inset-0 overflow-hidden bg-slate-50 flex items-center justify-center p-4">

         {/* Cinematic Background (Shared style with Login) */}
         <div className={`absolute inset-0 bg-gradient-to-br from-violet-600/5 to-purple-500/5 opacity-40`} />

         {/* Animated ambient blobs */}
         <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.08, 0.03] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[120px] bg-violet-600"
         />
         <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.03, 0.06, 0.03] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -bottom-32 -right-32 w-[700px] h-[700px] rounded-full blur-[120px] bg-purple-500"
         />

         {/* Floating security/tech icons */}
         {floatingIcons.map(({ Icon, x, y, delay, size }, i) => (
            <motion.div
               key={i}
               className="absolute pointer-events-none"
               style={{ left: x, top: y }}
               animate={{ y: [0, -15, 0], opacity: [0.1, 0.2, 0.1] }}
               transition={{ duration: 5 + i * 0.5, delay, repeat: Infinity, ease: "easeInOut" }}
            >
               <Icon size={size} className="text-violet-600" />
            </motion.div>
         ))}

         {/* Back button */}
         <Link
            to="/"
            className="absolute top-8 left-8 z-20 flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm font-bold transition-all bg-white/50 hover:bg-white px-5 py-2.5 rounded-full border border-slate-200 shadow-sm backdrop-blur-md"
         >
            <ArrowLeft className="w-4 h-4" /> Back to Home
         </Link>

         <div className="relative z-10 w-full max-w-[1000px] max-h-[90vh] overflow-y-auto no-scrollbar">
            <AnimatePresence mode="wait">
               {!verificationResult || verificationResult.status === 'error' ? (
                  <motion.div
                     key="verify-form"
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -30 }}
                     className="max-w-md mx-auto bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-200 p-10 relative overflow-hidden text-center"
                  >
                     <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-violet-600 to-purple-500" />

                     <div className="w-20 h-20 bg-violet-50 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-violet-100 shadow-inner">
                        <ShieldCheck className="w-10 h-10 text-violet-600" />
                     </div>

                     <h2 className="text-3xl font-heading font-black text-slate-900 mb-2">Registry Check</h2>
                     <p className="text-slate-500 text-sm font-medium mb-8">Perform a cryptographic verification of institution-issued credentials.</p>

                     <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2 text-left">
                           <Label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Credential Reference ID</Label>
                           <div className="relative group">
                              <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-violet-600 transition-colors" />
                              <Input
                                 required
                                 value={certNumber}
                                 onChange={(e) => setCertNumber(e.target.value.toUpperCase())}
                                 placeholder="e.g. BRN-2024-001"
                                 className="h-14 bg-slate-50 border-slate-200 rounded-2xl px-12 text-lg font-black tracking-widest placeholder:text-slate-300 focus:bg-white focus:ring-4 focus:ring-violet-600/5 transition-all uppercase"
                              />
                           </div>
                        </div>

                        <Button
                           type="submit"
                           disabled={isVerifying}
                           className="w-full h-14 bg-gradient-to-r from-violet-600 to-purple-500 hover:shadow-lg hover:shadow-violet-600/20 text-white font-black text-sm tracking-widest rounded-2xl transition-all hover:-translate-y-1 uppercase"
                        >
                           {isVerifying ? <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Verifying Hash...</span> : <span className="flex items-center gap-2">Execute Validation <ExternalLink size={16} /></span>}
                        </Button>
                     </form>

                     {verificationResult?.status === 'error' && (
                        <motion.div
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           className="mt-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-xs font-bold leading-relaxed"
                        >
                           {verificationResult.message}
                        </motion.div>
                     )}

                     <p className="mt-8 text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center justify-center gap-2">
                        <ShieldCheck size={10} /> ISO 9001:2015 Encrypted Datastore
                     </p>
                  </motion.div>
               ) : (
                  <motion.div
                     key="cert-view"
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="bg-white rounded-[2.5rem] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.15)] border border-slate-200 overflow-hidden"
                  >
                     <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-violet-600 to-purple-500" />

                     <div className="grid md:grid-cols-[1fr_2fr] min-h-[500px]">
                        {/* Left Side: Status & Verification Meta */}
                        <div className="bg-slate-50 p-10 border-r border-slate-100 flex flex-col justify-between">
                           <div>
                              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-emerald-500/20">
                                 <CheckCircle2 size={32} />
                              </div>
                              <h3 className="text-2xl font-black text-slate-900 mb-2">Credential Verified</h3>
                              <p className="text-slate-500 text-sm font-medium leading-relaxed">This record matches our central registry and has been authenticated as genuine.</p>

                              <div className="mt-10 space-y-6">
                                 <StatusItem icon={ShieldCheck} label="Authenticity" value="Institution Confirmed" color="text-emerald-600" />
                                 <StatusItem icon={Calendar} label="Verified On" value={verificationResult.verifiedOn} />
                                 <StatusItem icon={Fingerprint} label="Digital Hash" value={verificationResult.authHash} className="font-mono" />
                              </div>
                           </div>

                           <div className="pt-8 border-t border-slate-200 space-y-4">
                              <Button onClick={handleDownload} className="w-full h-12 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-all">
                                 <Download size={18} className="mr-2" /> Get Digital Copy
                              </Button>
                              <Button variant="outline" onClick={() => setVerificationResult(null)} className="w-full h-12 border-slate-200 text-slate-500 font-bold rounded-xl hover:bg-white transition-all">
                                 New Verification
                              </Button>
                           </div>
                        </div>

                        {/* Right Side: Visual Certificate */}
                        <div className="p-10 md:p-14 relative overflow-hidden flex items-center justify-center">
                           {/* Watermark Logo */}
                           <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] rotate-12 pointer-events-none scale-150">
                              <img src="/logo.jpg" alt="Watermark" className="w-full h-full object-contain" />
                           </div>

                           <div className="relative z-10 w-full max-w-lg bg-card p-10 rounded-2xl border-4 border-double border-slate-200 shadow-inner text-center">
                              <div className="flex justify-center mb-6">
                                 <img src="/logo.jpg" alt="Logo" className="w-16 h-16 grayscale opacity-50" />
                              </div>

                              <h4 className="font-heading font-black text-slate-400 text-[10px] tracking-[0.5em] uppercase mb-4">Certificate of Completion</h4>
                              <p className="font-serif italic text-slate-500 mb-6">This is to certify that</p>

                              <h2 className="text-4xl font-heading font-black text-slate-900 border-b-2 border-slate-100 pb-2 mb-6 inline-block">
                                 {verificationResult.name}
                              </h2>

                              <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto mb-8">
                                 has successfully successfully completed and qualified for the high-end industrial training in
                                 <span className="block font-black text-slate-800 mt-2 uppercase tracking-wide">{verificationResult.course}</span>
                              </p>

                              <div className="grid grid-cols-2 gap-8 text-left border-t border-slate-100 pt-8">
                                 <div>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Grade Accomplished</p>
                                    <p className="font-black text-emerald-600 text-xl">{verificationResult.grade}</p>
                                 </div>
                                 <div>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Issue Reference</p>
                                    <p className="font-black text-slate-900 text-sm">{verificationResult.id}</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Footer Info */}
                     <div className="bg-slate-950 p-6 flex items-center justify-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                        <div className="flex items-center gap-2">
                           <ShieldCheck className="text-emerald-500" size={14} /> Global QR-Traceable
                        </div>
                        <div className="hidden md:flex items-center gap-2">
                           <Database className="text-violet-500" size={14} /> Cloud Registry Verified
                        </div>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>
   );
};

const StatusItem = ({ icon: Icon, label, value, color = "text-slate-900", className = "" }: any) => (
   <div className="flex gap-4">
      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-300 shadow-sm border border-slate-100">
         <Icon size={18} />
      </div>
      <div className="overflow-hidden">
         <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1.5">{label}</p>
         <p className={`font-bold text-xs truncate ${color} ${className}`}>{value}</p>
      </div>
   </div>
);

export default Verification;
