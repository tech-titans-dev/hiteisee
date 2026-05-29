import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, BookOpen, Download, CreditCard, LogOut, 
  Settings, Bell, CheckCircle2, Clock, FileText,
  Mail, Phone, MapPin, Calendar, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.info("Logging out from Student Portal...");
    setTimeout(() => navigate("/login/student"), 1000);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Student Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col items-center py-8 relative shadow-2xl z-20">
        <div className="flex flex-col items-center mb-10 w-full px-6 text-center">
          <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-4 border-2 border-primary/20 p-1 overflow-hidden">
             <div className="w-full h-full bg-primary rounded-2xl flex items-center justify-center text-white text-3xl font-black">
               AK
             </div>
          </div>
          <h1 className="font-heading font-black text-slate-900 leading-none mb-1 text-lg">Amit Kumar</h1>
          <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">Roll: BRN-2024-100</p>
        </div>

        <nav className="flex-1 w-full px-4 space-y-2">
          <SidebarItem 
            icon={BookOpen} 
            label="My Courses" 
            active={activeTab === "overview"} 
            onClick={() => setActiveTab("overview")} 
          />
          <SidebarItem 
            icon={User} 
            label="Profile Details" 
            active={activeTab === "profile"} 
            onClick={() => setActiveTab("profile")} 
          />
          <SidebarItem 
            icon={FileText} 
            label="Study Materials" 
            active={activeTab === "resources"} 
            onClick={() => setActiveTab("resources")} 
          />
          <SidebarItem 
            icon={CreditCard} 
            label="Fees & Dues" 
            active={activeTab === "dues"} 
            onClick={() => setActiveTab("dues")} 
          />
        </nav>

        <div className="px-6 w-full mt-auto">
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full flex items-center justify-start gap-3 h-12 rounded-xl text-rose-500 hover:text-rose-600 hover:bg-rose-50 font-bold transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-white/40 backdrop-blur-md">
        {/* Transparent Header */}
        <header className="h-20 flex items-center justify-between px-10 sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-50">
           <h2 className="text-xl font-heading font-black text-slate-900 capitalize">{activeTab}</h2>
           <div className="flex items-center gap-6">
              <button className="relative text-slate-400 hover:text-primary transition-colors">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
              </button>
              <div className="h-8 w-px bg-slate-100" />
              <div className="flex items-center gap-3">
                 <div className="text-right hidden sm:block">
                   <p className="text-xs font-black text-slate-900 uppercase tracking-tighter">Academic Year</p>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">2024-25</p>
                 </div>
              </div>
           </div>
        </header>

        <div className="p-10">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div key="ov" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-6 border-none shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] rounded-3xl bg-gradient-to-br from-primary to-blue-600 text-white relative overflow-hidden">
                       <div className="relative z-10">
                        <h4 className="text-white/60 text-xs font-black uppercase tracking-widest mb-1">Current Progress</h4>
                        <div className="text-4xl font-black mb-4">78%</div>
                        <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                           <div className="bg-white h-full" style={{width: '78%'}} />
                        </div>
                       </div>
                       <BookOpen size={100} className="absolute -right-5 -bottom-5 text-white/10" />
                    </Card>
                    <HorizontalStat label="Attendance" value="92%" icon={CheckCircle2} color="text-emerald-500" />
                    <HorizontalStat label="Assignments" value="14/15" icon={FileText} color="text-amber-500" />
                 </div>

                 <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                       <Clock size={20} className="text-primary" /> My Learning Path
                    </h3>
                    <div className="space-y-4">
                       <LearningModule title="Module 1: Advanced Excel & Tally" status="Completed" />
                       <LearningModule title="Module 2: Database Management System" status="In Progress" />
                       <LearningModule title="Module 3: Project Work & Practical" status="Locked" />
                    </div>
                 </div>
              </motion.div>
            )}

            {activeTab === "profile" && (
                <motion.div key="pr" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} className="max-w-4xl">
                   <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                      <div className="h-32 bg-gradient-to-r from-slate-100 to-slate-200" />
                      <div className="px-10 pb-12">
                         <div className="flex flex-col md:flex-row gap-8 items-end -mt-16 mb-12">
                            <div className="w-32 h-32 rounded-3xl bg-white border-4 border-white shadow-xl flex items-center justify-center text-4xl font-black text-primary uppercase">
                               AK
                            </div>
                            <div className="flex-1 pb-2">
                               <h3 className="text-3xl font-black text-slate-900">Amit Kumar</h3>
                               <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Student ID: BRN-100-2024</p>
                            </div>
                            <Button className="h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 shadow-xl">
                              Edit Personal Details
                            </Button>
                         </div>

                         <div className="grid md:grid-cols-2 gap-8">
                            <ProfileDetail icon={Mail} label="Email Address" value="amit.kumar@student.com" />
                            <ProfileDetail icon={Phone} label="Contact Number" value="+91 99388 28835" />
                            <ProfileDetail icon={MapPin} label="Local Address" value="Brajanagar, Brahmapur, Odisha" />
                            <ProfileDetail icon={Calendar} label="Date of Birth" value="12 June 2004" />
                            <ProfileDetail icon={BookOpen} label="Course Enrolled" value="ADCA (Advance Diploma)" />
                            <ProfileDetail icon={Award} label="Academy Batch" value="Morning Batch - 2024" />
                         </div>
                      </div>
                   </div>
                </motion.div>
            )}

            {activeTab === "resources" && (
                <motion.div key="re" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="grid md:grid-cols-2 gap-6">
                    <ResourceCard title="ADCA Module 1 - Fundamentals" size="2.4 MB" date="15 Mar 2024" />
                    <ResourceCard title="Tally ERP 9 Mastery Guide" size="8.1 MB" date="20 Mar 2024" />
                    <ResourceCard title="Assignment: Excel Pro Formulas" size="1.2 MB" date="04 Apr 2024" />
                    <ResourceCard title="Sample Question Paper - Finals" size="5.6 MB" date="12 Apr 2024" />
                </motion.div>
            )}

            {activeTab === "dues" && (
                <motion.div key="du" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="max-w-2xl mx-auto text-center space-y-8 py-10">
                   <div className="w-24 h-24 bg-amber-50 rounded-[2rem] flex items-center justify-center text-amber-500 mx-auto border border-amber-100 shadow-xl shadow-amber-500/5">
                      <CreditCard size={40} />
                   </div>
                   <div>
                      <h3 className="text-3xl font-black text-slate-900 mb-2">Academic Fees</h3>
                      <p className="text-slate-400 font-medium">Clear your outstanding balances to maintain portal access.</p>
                   </div>
                   
                   <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm space-y-6">
                      <div className="flex justify-between items-center text-slate-500 text-sm font-bold uppercase tracking-widest">
                         <span>Pending Amount</span>
                         <span className="text-slate-900 text-3xl font-black">₹4,500</span>
                      </div>
                      <Link to="/payment">
                         <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-black text-lg rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]">
                            Pay Dues Securely
                         </Button>
                      </Link>
                      <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.2em]">Secured by SSL Encryption</p>
                   </div>

                   <p className="text-slate-400 text-xs font-bold">Having trouble? <Link to="/contact" className="text-primary hover:underline">Contact the Accounts Office</Link></p>
                </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 h-14 rounded-2xl px-6 transition-all duration-300 relative group overflow-hidden ${
      active ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
    }`}
  >
    <Icon className={`w-5 h-5 relative z-10 transition-colors ${active ? "text-white" : "group-hover:text-primary"}`} />
    <span className="font-bold text-sm relative z-10">{label}</span>
  </button>
);

const HorizontalStat = ({ label, value, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
       <div className={`w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center ${color}`}>
          <Icon size={20} />
       </div>
       <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">{label}</p>
          <p className="text-xl font-black text-slate-900">{value}</p>
       </div>
    </div>
);

const LearningModule = ({ title, status }: any) => (
    <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-md transition-all">
       <div className="flex items-center gap-4">
          <div className={`w-3 h-3 rounded-full ${status === 'Completed' ? 'bg-emerald-500' : status === 'In Progress' ? 'bg-primary animate-pulse' : 'bg-slate-300'}`} />
          <span className="font-bold text-slate-700">{title}</span>
       </div>
       <span className={`text-[10px] font-black uppercase tracking-widest ${status === 'Completed' ? 'text-emerald-500' : 'text-slate-400'}`}>{status}</span>
    </div>
);

const ProfileDetail = ({ icon: Icon, label, value }: any) => (
    <div className="flex gap-4">
       <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 shrink-0">
          <Icon size={18} />
       </div>
       <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1.5">{label}</p>
          <p className="font-bold text-slate-700 leading-tight">{value}</p>
       </div>
    </div>
);

const ResourceCard = ({ title, size, date }: any) => (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-6 group hover:shadow-xl transition-all">
       <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
          <FileText size={24} />
       </div>
       <div>
          <h4 className="font-bold text-slate-900 mb-1">{title}</h4>
          <div className="flex items-center gap-3 text-slate-400 text-xs font-bold uppercase tracking-tighter">
             <span>{size}</span>
             <span className="w-1 h-1 bg-slate-200 rounded-full" />
             <span>Uploaded: {date}</span>
          </div>
       </div>
       <Button className="w-fit h-10 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-100 font-bold px-5">
          <Download size={16} className="mr-2" /> Download Document
       </Button>
    </div>
);

export default StudentDashboard;
