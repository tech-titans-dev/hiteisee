import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Search, FileText, CheckCircle2, User, BookOpen,
  Award, Loader2, ArrowLeft, Download, Printer,
  ShieldCheck, Star, Code2, Database, Cpu, Mail,
  ExternalLink, GraduationCap
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

const Results = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [resultData, setResultData] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setResultData(null);

    // Premium search simulation
    setTimeout(() => {
      setIsSearching(false);
      const cleanRoll = rollNumber.trim().toUpperCase();
      if (cleanRoll === "ROLL100") {
        setResultData({
          name: "AMIT KUMAR",
          rollNo: "ROLL100",
          regNo: "BRN/2024/0488",
          fatherName: "Rajesh Kumar",
          course: "ADCA (Advanced Diploma in Computer Applications)",
          duration: "12 Months",
          grade: "A+",
          percentage: "92%",
          totalMarks: 700,
          securedMarks: 644,
          status: "PASSED",
          issueDate: "March 15, 2024",
          marks: [
            { subject: "Computer Fundamentals", total: 100, secured: 92, grade: "A+" },
            { subject: "Operating System (Win 10)", total: 100, secured: 88, grade: "A" },
            { subject: "MS Office Suite (Word, Excel, PPT)", total: 100, secured: 95, grade: "A+" },
            { subject: "Programming in C/C++", total: 100, secured: 90, grade: "A+" },
            { subject: "Web Designing (HTML, CSS, JS)", total: 100, secured: 94, grade: "A+" },
            { subject: "Tally Prime & GST", total: 100, secured: 91, grade: "A+" },
            { subject: "Practical & Viva-Voce", total: 100, secured: 94, grade: "A+" },
          ]
        });
        toast.success("Record found in academy database.");
      } else {
        setResultData({ error: "No matching record found for this Roll Number. Please verify and try again." });
        toast.error("Registry lookup failed.");
      }
    }, 2000);
  };

  const handleDownload = () => {
    toast.loading("Generating secure PDF transcript...");
    setTimeout(() => {
      toast.success("Official Marksheet Downloaded Successfully.");
    }, 2000);
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-slate-50 flex items-center justify-center p-4">

      {/* Cinematic Background (Shared with Login) */}
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-500/5 opacity-40`} />

      {/* Animated ambient blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[120px] bg-blue-600"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-32 -right-32 w-[700px] h-[700px] rounded-full blur-[120px] bg-indigo-500"
      />

      {/* Floating tech icons */}
      {floatingIcons.map(({ Icon, x, y, delay, size }, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: x, top: y }}
          animate={{ y: [0, -15, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 5 + i * 0.5, delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon size={size} className="text-blue-600" />
        </motion.div>
      ))}

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiAwaDZ2LTZoLTZ2NnptLTYtNmg2di02aC02djZ6bTYgMGg2di02aC02djZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />

      {/* Back button */}
      <Link
        to="/"
        className="absolute top-8 left-8 z-20 flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm font-bold transition-all bg-white/50 hover:bg-white px-5 py-2.5 rounded-full border border-slate-200 shadow-sm backdrop-blur-md"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="relative z-10 w-full max-w-[1100px] max-h-[90vh] overflow-y-auto no-scrollbar">
        <AnimatePresence mode="wait">
          {!resultData || resultData.error ? (
            <motion.div
              key="search-form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="max-w-md mx-auto bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-200 p-10 relative overflow-hidden text-center"
            >
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-500" />

              <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-blue-100 shadow-inner">
                <FileText className="w-10 h-10 text-blue-600" />
              </div>

              <h2 className="text-3xl font-heading font-black text-slate-900 mb-2">Student Portal</h2>
              <p className="text-slate-500 text-sm font-medium mb-8">Access your digital marksheets and academic records securely.</p>

              <form onSubmit={handleSearch} className="space-y-6">
                <div className="space-y-2 text-left">
                  <Label htmlFor="roll" className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Examination Roll Number</Label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    <Input
                      id="roll"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      placeholder="ENTER ROLL NO."
                      className="h-14 bg-slate-50 border-slate-200 rounded-2xl px-12 text-lg font-black tracking-widest placeholder:text-slate-300 focus:bg-white focus:ring-4 focus:ring-blue-600/5 transition-all uppercase"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSearching}
                  className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-500 hover:shadow-lg hover:shadow-blue-600/20 text-white font-black text-sm tracking-widest rounded-2xl transition-all hover:-translate-y-1 uppercase"
                >
                  {isSearching ? <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Fetching Record...</span> : <span className="flex items-center gap-2">Verify & View Result <ExternalLink size={16} /></span>}
                </Button>
              </form>

              {resultData?.error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-xs font-bold leading-relaxed"
                >
                  {resultData.error}
                </motion.div>
              )}

              <p className="mt-8 text-[10px] text-slate-400 font-black uppercase tracking-widest">Digital Registry Powered by Brainstorm v2.0</p>
            </motion.div>
          ) : (
            <motion.div
              key="marksheet-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[2.5rem] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.15)] border border-slate-200 overflow-hidden relative"
            >
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-blue-600 to-indigo-500" />

              {/* Marksheet Header */}
              <div className="p-10 md:p-12 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-6">
                  <div className="bg-white p-2 rounded-2xl shadow-xl border border-white">
                     <img src="/logo/logo.png" alt="Logo" className="h-16 w-auto object-contain" />
                  </div>
                  <div className="text-center md:text-left">
                     <h1 className="text-2xl md:text-3xl font-heading font-black text-slate-900 leading-none mb-1">HITEISEE CONSULTING</h1>
                     <p className="text-[10px] uppercase tracking-[0.4em] font-black text-slate-400">Transformative Solutions</p>
                     <p className="text-[9px] uppercase tracking-widest font-bold text-blue-600 mt-2">Strategic HR & IR Services</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => window.print()} className="h-12 px-6 rounded-xl border-slate-200 font-bold text-slate-600 hover:bg-white shadow-sm">
                    <Printer size={18} className="mr-2" /> Print
                  </Button>
                  <Button onClick={handleDownload} className="h-12 px-6 rounded-xl bg-slate-900 border-none font-bold text-white hover:bg-black shadow-lg shadow-black/10">
                    <Download size={18} className="mr-2" /> Download Marksheet
                  </Button>
                </div>
              </div>

              {/* Student Details Info Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-100 border-b border-slate-100">
                <DetailBox label="Student Name" value={resultData.name} />
                <DetailBox label="Roll Number" value={resultData.rollNo} />
                <DetailBox label="Regd. Number" value={resultData.regNo} />
                <DetailBox label="Course Name" value={resultData.course} />
              </div>

              {/* Marksheet Body */}
              <div className="p-10 md:p-12">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest">Statement of Marks</h2>
                    <p className="text-xs font-bold text-slate-400">Annual Examination Session 2023-2024</p>
                  </div>
                  <div className="text-center bg-blue-600 text-white px-6 py-2 rounded-full font-black text-sm shadow-lg shadow-blue-600/20">
                    FINAL GRADE: {resultData.grade}
                  </div>
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-sm">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50">
                      <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                        <th className="px-8 py-5">Sr. No.</th>
                        <th className="px-8 py-5">Subject/Module Name</th>
                        <th className="px-8 py-5">Total Marks</th>
                        <th className="px-8 py-5">Obtained Marks</th>
                        <th className="px-8 py-5 text-right">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {resultData.marks.map((m: any, i: number) => (
                        <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">{String(i + 1).padStart(2, '0')}</td>
                          <td className="px-8 py-4 font-bold text-slate-700">{m.subject}</td>
                          <td className="px-8 py-4 font-bold text-slate-500">{m.total}</td>
                          <td className="px-8 py-4 font-black text-slate-900">{m.secured}</td>
                          <td className="px-8 py-4 text-right">
                            <span className="inline-block px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-black">{m.grade}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-900 text-white border-t-2 border-slate-800">
                      <tr className="font-black text-sm uppercase tracking-widest">
                        <td colSpan={2} className="px-8 py-6 text-right opacity-50">Grand Total Achievement</td>
                        <td className="px-8 py-6">{resultData.totalMarks}</td>
                        <td className="px-8 py-6 text-xl text-sky-400">{resultData.securedMarks}</td>
                        <td className="px-8 py-6 text-right">
                          <span className="bg-white/10 px-4 py-2 rounded-xl border border-white/10">Result: {resultData.status}</span>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 items-end gap-12">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="text-emerald-500 w-5 h-5" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Institution Authenticated</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed">This is a system-generated marksheet and does not require a physical signature for initial verification. All records are verifiable via BRN-ID.</p>
                  </div>

                    <div className="flex flex-col items-center">
                       <div className="w-32 h-16 opacity-10 grayscale contrast-200 brightness-50 mb-2">
                          <img src="/logo/logo.png" alt="Seal" className="w-full h-full object-contain" />
                       </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Company Seal (Digital)</span>
                  </div>

                  <div className="text-right">
                    <div className="font-serif italic text-slate-400 mb-2 text-xl opacity-30 select-none">Hiteisee Consulting</div>
                    <div className="h-px w-48 bg-slate-200 ml-auto mb-2" />
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-900">Controller of Examinations</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date: {resultData.issueDate}</div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setResultData(null)}
                className="w-full py-4 bg-slate-50 hover:bg-slate-100 transition-colors text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center justify-center gap-2"
              >
                <ArrowLeft size={12} /> Clear Current View & Perform New Search
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const DetailBox = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-white p-6 hover:bg-slate-50 transition-colors">
    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
    <p className="text-sm font-black text-slate-900 uppercase truncate">{value}</p>
  </div>
);

export default Results;
