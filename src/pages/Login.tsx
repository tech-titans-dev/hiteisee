import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Lock, User, ArrowLeft, ShieldCheck, GraduationCap, Code2, Cpu, Database, Star } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const portalMeta: Record<string, { name: string; color: string; accent: string; icon: typeof ShieldCheck; tagline: string }> = {
  student: { name: "Student", color: "from-blue-600 to-indigo-500", accent: "#2563eb", icon: GraduationCap, tagline: "Continue your learning journey" },
  admin: { name: "Admin", color: "from-violet-600 to-purple-500", accent: "#7c3aed", icon: ShieldCheck, tagline: "Manage the institution" },
};

const floatingIcons = [
  { Icon: Code2, x: "10%", y: "15%", delay: 0, size: 28 },
  { Icon: Database, x: "85%", y: "10%", delay: 0.5, size: 22 },
  { Icon: GraduationCap, x: "75%", y: "75%", delay: 1, size: 30 },
  { Icon: Star, x: "15%", y: "80%", delay: 1.5, size: 20 },
  { Icon: Cpu, x: "50%", y: "5%", delay: 0.3, size: 20 },
];

const Login = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const meta = portalMeta[role || ""] || portalMeta.student;
  const { name, color, accent, tagline } = meta;
  const PortalIcon = meta.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    setTimeout(() => {
      setIsLoggingIn(false);
      const targetRole = role || "student";

      if (targetRole === "admin" && username === "admin" && password === "admin123") {
        toast.success("Admin access granted. Welcome back!");
        navigate("/admin-dashboard");
      } else if (targetRole === "student" && username === "student" && password === "student123") {
        toast.success("Student login successful!");
        navigate("/student-dashboard");
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-slate-50 flex items-center justify-center">

      {/* Animated subtle gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5`} />

      {/* Animated ambient blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[120px]"
        style={{ backgroundColor: accent }}
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-32 -right-32 w-[700px] h-[700px] rounded-full blur-[120px]"
        style={{ backgroundColor: accent }}
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
          <Icon size={size} color={accent} />
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

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[1000px] mx-4 flex flex-col md:flex-row rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-200 bg-white"
        style={{ maxHeight: "92vh" }}
      >
        {/* Left panel — Branding & Impact */}
        <div className={`relative hidden md:flex flex-col items-center justify-center w-[42%] bg-gradient-to-br ${color} p-12 text-white text-center overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 bg-[url('/1.jpeg')] opacity-10 mix-blend-soft-light bg-cover bg-center" />

          {/* Animated decorative rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-[450px] h-[450px] border border-white/20 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute w-[350px] h-[350px] border border-white/10 rounded-full border-dashed"
          />

          <div className="relative z-10 w-full">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/30 shadow-2xl"
            >
              <PortalIcon className="w-10 h-10 text-white" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-6 flex flex-col items-center"
            >
              <img
                src="/logo/logo.png"
                alt="Hiteisee ADMIN Portal"
                className="w-16 h-16 p-1 bg-white rounded-xl shadow-lg mb-3 object-contain"
              />
              <p className="text-[10px] uppercase tracking-[0.3em] font-black text-white/60">Hiteisee ADMIN Portal</p>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-3xl font-heading font-extrabold tracking-tight mb-3"
            >
              {name} Portal
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-white/80 text-sm max-w-[240px] mx-auto font-medium"
            >
              {tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-10 space-y-3 text-left bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20"
            >
              {[
                "Modern Learning App",
                "ISO 9001:2015 Certified",
                "Expert Guided Mentorship"
              ].map(text => (
                <div key={text} className="flex items-center gap-3 text-white/90 text-sm font-semibold">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                    <Star className="w-2.5 h-2.5 fill-white" />
                  </div>
                  {text}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Right panel — Interaction Form */}
        <div className="flex-1 bg-white p-10 md:p-16 flex flex-col justify-center relative overflow-hidden">
          {/* Subtle background blob for the form side */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-[80px] -z-10 opacity-50" />

          {/* Mobile specific header */}
          <div className="md:hidden flex items-center gap-4 mb-10">
            <img src="/logo/logo.png" alt="Hiteisee Consulting" className="w-14 h-14 object-contain rounded-xl bg-white shadow-md p-1 border border-slate-100" />
            <div>
              <p className="font-heading font-black text-slate-900 text-xl leading-none mb-1">HITEISEE</p>
              <p className="text-slate-400 text-[9px] uppercase tracking-widest font-black">Consulting</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-full max-w-sm mx-auto"
          >
            <div className="mb-10 text-center md:text-left">
              <span
                className="inline-block px-4 py-1.5 text-[10px] font-black rounded-full mb-4 border tracking-[0.15em]"
                style={{ color: accent, borderColor: accent + "30", backgroundColor: accent + "08" }}
              >
                {name.toUpperCase()} ACCESS
              </span>
              <h1 className="text-3xl md:text-4xl font-heading font-black text-slate-900 mb-2">
                Welcome Back!
              </h1>
              <p className="text-slate-400 text-sm font-semibold max-w-[280px]">Please enter your credentials to stay connected.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="group relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center transition-all group-focus-within:border-primary/30 group-focus-within:bg-white group-focus-within:shadow-sm">
                  <User className="w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                </div>
                <Input
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username / ID"
                  className="pl-16 h-14 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-300 rounded-xl focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-base font-medium shadow-sm hover:border-slate-300"
                />
              </div>

              <div className="group relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center transition-all group-focus-within:border-primary/30 group-focus-within:bg-white group-focus-within:shadow-sm">
                  <Lock className="w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                </div>
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Secret Password"
                  className="pl-16 h-14 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-300 rounded-xl focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-base font-medium shadow-sm hover:border-slate-300"
                />
              </div>

              <div className="flex justify-end">
                <Link to="#" className="text-xs font-black hover:opacity-70 transition-opacity" style={{ color: accent }}>
                  FORGOT PASSWORD?
                </Link>
              </div>

              <motion.button
                type="submit"
                disabled={isLoggingIn}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full h-14 rounded-xl font-black text-sm tracking-widest text-white bg-gradient-to-r ${color} shadow-[0_12px_24px_-8px_rgba(0,0,0,0.2)] transition-all relative overflow-hidden group uppercase disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoggingIn ? "Authenticating..." : <>Sign In <PortalIcon className="w-4 h-4" /></>}
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </motion.button>
            </form>

            <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-slate-400 text-xs font-bold text-center sm:text-left">
                Issues logging in?{" "}
                <Link to="/contact" className="block sm:inline font-black hover:opacity-60 mt-1 sm:mt-0" style={{ color: accent }}>
                  TALK TO SUPPORT
                </Link>
              </p>

              {/* Quick role toggle with names */}
              <div className="flex items-center gap-2 p-1.5 bg-slate-50 rounded-full border border-slate-100 shadow-inner">
                {Object.entries(portalMeta).map(([k, v]) => {
                  const isActive = role === k;
                  return (
                    <Link
                      key={k}
                      to={`/login/${k}`}
                      title={`${v.name} Portal`}
                      className={`relative flex items-center justify-center transition-all duration-300 ${isActive
                        ? `bg-gradient-to-br ${v.color} text-white shadow-md px-3 py-1.5 rounded-full`
                        : "w-9 h-9 rounded-full text-slate-400 hover:text-slate-600 hover:bg-white border border-transparent hover:border-slate-200"
                        }`}
                    >
                      <v.icon className={`${isActive ? "w-3.5 h-3.5 mr-2" : "w-4 h-4"}`} />
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          className="text-[10px] font-black tracking-wider uppercase whitespace-nowrap"
                        >
                          {v.name}
                        </motion.span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
