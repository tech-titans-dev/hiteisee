import { useState } from "react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { addPayment } from "@/lib/adminData";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Phone, 
  CheckCircle2, 
  Download, 
  ArrowRight, 
  Info, 
  ChevronRight,
  Landmark,
  ShieldCheck,
  ArrowLeft
} from "lucide-react";

export default function Checkout() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState<"details" | "pay" | "success">("details");
  
  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [txnId, setTxnId] = useState("");
  
  // Generated receipt reference info
  const [receiptNumber, setReceiptNumber] = useState("");
  const [paymentDate, setPaymentDate] = useState("");

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({
        title: "Name is required",
        description: "Please enter your full name to proceed.",
        variant: "destructive",
      });
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive",
      });
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    setStep("pay");
  };

  const handlePaymentVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txnId.trim()) {
      toast({
        title: "Transaction ID Required",
        description: "Please enter the UPI transaction ID / UTR number.",
        variant: "destructive",
      });
      return;
    }
    if (txnId.trim().length < 8) {
      toast({
        title: "Invalid Transaction ID",
        description: "A valid transaction ID is typically 8-12 characters long.",
        variant: "destructive",
      });
      return;
    }

    // Save to Admin Panel database
    addPayment({
      name,
      phone,
      email: email.trim(),
      amount: 299,
      transactionId: txnId.trim(),
      status: "pending"
    });

    setStep("success");
    
    toast({
      title: "Verification in Progress",
      description: "We have received your details. Please wait for admin verification.",
    });
  };



  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 font-sans relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

      <div className="w-full max-w-[1000px] grid lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Left Info Panel */}
        <div className="lg:col-span-5 h-full">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-primary rounded-3xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden h-full flex flex-col"
          >
            {/* Subtle glow inside left panel */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            
            <button 
              onClick={() => navigate('/payment')}
              className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors mb-12 w-fit z-10"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Details
            </button>

            <div className="flex items-center gap-3 mb-4 z-10">
              <ShieldCheck className="w-6 h-6 text-accent" />
              <span className="text-accent font-bold tracking-widest uppercase text-xs">Secure Checkout</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight z-10">
              Complete your transaction
            </h2>

            <p className="text-white/80 leading-relaxed mb-12 z-10 text-sm md:text-base">
              You are one step away from scheduling your professional consultation with our experts. Your payment is 100% secure.
            </p>

            <div className="mt-auto z-10 bg-black/10 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white/70 text-sm">Consultation Fee</span>
                <span className="text-white font-medium">₹299.00</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-white/70 text-sm">Taxes</span>
                <span className="text-white font-medium">Included</span>
              </div>
              <div className="w-full h-px bg-white/10 my-4" />
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">Total Pay</span>
                <span className="text-2xl font-bold text-white">₹299.00</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Action Panel */}
        <div className="lg:col-span-7">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-3xl p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100"
          >
            {/* Steps Header */}
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-100">
              {["Contact Info", "Payment", "Status"].map((s, idx) => {
                const sId = idx === 0 ? "details" : idx === 1 ? "pay" : "success";
                const isCompleted = 
                  (step === "pay" && sId === "details") || 
                  (step === "success" && (sId === "details" || sId === "pay"));
                const isActive = step === sId;
                
                return (
                  <div key={idx} className="flex items-center">
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isActive ? "bg-primary text-white shadow-md shadow-primary/20" : isCompleted ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-400"
                      }`}>
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>
                      <span className={`text-xs font-bold hidden md:block ${isActive ? "text-slate-900" : "text-slate-400"}`}>{s}</span>
                    </div>
                    {idx < 2 && <div className="w-8 md:w-12 h-[2px] mx-2 md:mx-4 bg-slate-100">
                      <div className={`h-full bg-primary transition-all duration-500 ${isCompleted ? "w-full" : "w-0"}`} />
                    </div>}
                  </div>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {/* Step 1: Details */}
              {step === "details" && (
                <motion.form
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleDetailsSubmit}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Your Information</h3>
                    <p className="text-slate-500 text-sm mb-6">We'll use this to send your receipt and booking link.</p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          type="text"
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-12 h-14 bg-slate-50 border-slate-200 focus-visible:ring-primary/20 rounded-xl text-base"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          type="tel"
                          placeholder="9876543210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="pl-12 h-14 bg-slate-50 border-slate-200 focus-visible:ring-primary/20 rounded-xl text-base"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                      <div className="relative">
                        <Info className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-12 h-14 bg-slate-50 border-slate-200 focus-visible:ring-primary/20 rounded-xl text-base"
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-14 mt-8 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold tracking-wide text-sm shadow-xl shadow-slate-900/10 transition-all hover:-translate-y-0.5">
                    Continue to Payment
                  </Button>
                </motion.form>
              )}

              {/* Step 2: Pay */}
              {step === "pay" && (
                <motion.div
                  key="pay"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Scan to Pay</h3>
                    <p className="text-slate-500 text-sm mb-6">Open any UPI app and scan the code below.</p>
                  </div>

                  <div className="relative w-48 h-48 mx-auto bg-white rounded-2xl p-3 shadow-md border border-slate-200 flex items-center justify-center mb-6">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=paytmqr5fehmw@ptys%26pn=Hiteisee%26am=299%26cu=INR"
                      alt="UPI QR Code"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="bg-blue-50 text-blue-800 p-4 rounded-xl border border-blue-100 flex gap-3 text-sm mb-6">
                    <Info className="w-5 h-5 shrink-0 text-blue-500" />
                    <p>After successful payment, enter the 12-digit UTR/Transaction ID below to verify.</p>
                  </div>

                  <form onSubmit={handlePaymentVerify} className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Transaction ID (UTR)</label>
                      <div className="relative">
                        <Landmark className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          type="text"
                          placeholder="e.g. 312456789012"
                          value={txnId}
                          onChange={(e) => setTxnId(e.target.value)}
                          className="pl-12 h-14 bg-slate-50 border-slate-200 focus-visible:ring-primary/20 rounded-xl font-mono text-base tracking-wider"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-2">
                      <Button type="button" variant="outline" onClick={() => setStep("details")} className="flex-1 h-14 rounded-xl font-bold text-slate-600 border-slate-200">
                        Back
                      </Button>
                      <Button type="submit" className="flex-[2] h-14 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold tracking-wide shadow-xl shadow-slate-900/10">
                        Verify Payment
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Step 3: Success */}
              {step === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Verification in Progress</h3>
                  <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                    We have received your payment details (Txn ID: {txnId}). Our admin team is currently verifying the transaction. 
                    You will receive an email with your official receipt once verified.
                  </p>

                  <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 text-left mb-8 flex gap-3">
                    <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-800">
                      Please allow a few hours for the verification process. Your consultation slot will be confirmed along with the receipt via email.
                    </p>
                  </div>
                  
                  <button onClick={() => window.close()} className="mt-6 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
                    Close Window
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
