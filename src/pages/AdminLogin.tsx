import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, User, Lock, CheckCircle, GraduationCap, Building, Users, ShieldCheck, Clock } from "lucide-react";
import { toast } from "sonner";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      // Mock login success
      sessionStorage.setItem("isAdminLoggedIn", "true");
      toast.success("Welcoming Dr. Suvendu Das Admin");
      navigate("/admin/dashboard");
    } else {
      toast.error("Please enter credentials.");
    }
  };


  return (
    <div className="min-h-screen bg-[#f3f0fb] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#8b5cf6 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      {/* Back Button */}
      <Link to="/" className="absolute top-6 left-6 z-20">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-sm text-sm font-semibold text-slate-600 hover:text-slate-900 border border-slate-100"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </motion.button>
      </Link>

      {/* Main Card Container */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[1000px] h-[600px] bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(139,92,246,0.1)] flex overflow-hidden z-10 relative"
      >
        {/* Left Side - Premium Purple Branding */}
        <div className="w-[45%] relative hidden md:flex flex-col items-start justify-between p-10 overflow-hidden text-left bg-[#8b5cf6]">
          
          {/* Ambient glowing orbs for premium feel */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[20%] -left-[10%] w-[70%] aspect-square rounded-full bg-white/20 blur-[100px]" />
            <div className="absolute top-[60%] -right-[20%] w-[60%] aspect-square rounded-full bg-indigo-400/30 blur-[100px]" />
          </div>

          <div className="relative z-10 w-full">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-white p-2.5 rounded-xl shadow-lg">
                <img src="/logo/logo.png" alt="Hiteisee Consulting" className="h-10 w-auto object-contain" />
              </div>
            </div>

            <div className="space-y-3 max-w-md">
              <h1 className="text-3xl lg:text-4xl font-sans font-bold tracking-tight text-white leading-tight">
                Admin Console
              </h1>
              <p className="text-white/90 text-[13px] leading-relaxed font-medium pb-2">
                Securely manage website content, track consultation payments, and handle client inquiries from one central dashboard.
              </p>
            </div>
          </div>

          <div className="relative z-10 space-y-3 w-full">
            {[
              { icon: ShieldCheck, title: "System Overview", desc: "Monitor website analytics, recent payments, and system health" },
              { icon: Users, title: "Client Management", desc: "Process consultation bookings and reply to new inquiries" },
              { icon: Building, title: "Content Updates", desc: "Easily publish new blog posts and update your gallery" }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 group cursor-default p-2.5 rounded-xl hover:bg-white/10 border border-transparent hover:border-white/20 transition-all">
                <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center shrink-0 shadow-inner group-hover:bg-white/30 transition-all text-white">
                  <item.icon className="w-5 h-5 transition-colors" />
                </div>
                <div className="pt-0.5">
                  <h4 className="text-sm font-bold text-white tracking-wide mb-0.5">{item.title}</h4>
                  <p className="text-[11px] text-white/90 font-medium leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-[55%] bg-white p-10 md:p-14 flex flex-col justify-center relative">
          
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
               <img src="/founder/image.png" alt="Dr. Suvendu Das" className="w-16 h-16 rounded-full object-cover border-2 border-[#8b5cf6]/30 shadow-md" />
               <div>
                  <div className="inline-block px-3 py-1 rounded-full border border-[#8b5cf6]/20 bg-[#8b5cf6]/5 text-[#8b5cf6] text-[10px] font-bold uppercase tracking-widest mb-1">
                    Admin Login
                  </div>
                  <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Welcome, Dr. Suvendu Das</h1>
               </div>
            </div>
            <p className="text-slate-500 text-sm font-medium">Enter your credentials to securely access the portal.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 mb-8">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent transition-all placeholder:font-normal placeholder:text-slate-400"
                required
              />
            </div>
            
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Secret Password"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent transition-all placeholder:font-normal placeholder:text-slate-400"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-[#8b5cf6] text-white py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase hover:bg-[#7c3aed] transition-colors shadow-lg shadow-[#8b5cf6]/20 mt-2"
            >
              Sign In
            </motion.button>
          </form>



        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
