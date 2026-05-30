import { PageHero } from "@/components/shared/PageHero";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, ShieldCheck, Calendar, Sparkles } from "lucide-react";

export default function Payment() {
  const [step, setStep] = useState("amount"); // amount → details → scan → success
  const fee = 299;

  // Simple amount view
  const AmountView = (
    <div className="bg-gradient-to-b from-[#0f172a] to-[#020617] rounded-3xl p-8 text-white border border-slate-800 shadow-lg">
      <h3 className="text-2xl font-bold mb-4 text-center">Consultation Fee</h3>
      <div className="flex items-baseline justify-center text-5xl font-heading font-black mb-2">
        <span className="text-3xl mr-1">₹</span>{fee}<span className="text-2xl ml-1">.00</span>
      </div>
      <Button className="w-full mt-6" onClick={() => setStep("details")}>Proceed to Details</Button>
    </div>
  );

  const DetailsForm = (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
      <h3 className="text-xl font-semibold mb-4">Depositor Information</h3>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setStep("scan"); }}>
        <input type="text" name="name" placeholder="Full Name" required className="w-full p-3 border rounded" />
        <input type="email" name="email" placeholder="Email" required className="w-full p-3 border rounded" />
        <input type="tel" name="phone" placeholder="Phone Number" required className="w-full p-3 border rounded" />
        <Button type="submit" className="w-full">Proceed to Payment</Button>
      </form>
    </div>
  );

  const ScannerView = (
    <div className="bg-gray-100 rounded-3xl p-8 text-center">
      <h3 className="text-xl font-semibold mb-4">Scan to Pay</h3>
      <div className="h-64 bg-white flex items-center justify-center mb-4 border rounded">
        <span className="text-gray-500">[Scanner Component]</span>
      </div>
      <Button className="w-full" onClick={() => setStep("success")}>Confirm Payment</Button>
    </div>
  );

  const SuccessPopup = (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 max-w-sm text-center shadow-lg">
        <ShieldCheck className="w-12 h-12 mx-auto text-emerald-500 mb-4" />
        <h3 className="text-2xl font-bold mb-2">Payment Successful</h3>
        <p className="mb-2">Your payment of <strong>₹{fee}.00</strong> has been recorded.</p>
        <p className="text-sm text-gray-600">A receipt will be sent to your email within 24 hours. Please check your inbox.</p>
        <Button className="mt-4 w-full" onClick={() => setStep("amount")}>Close</Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 relative pb-24">
      <PageHero
        title="Consultation Payment"
        subtitle="Securely complete your payment in a few easy steps."
      />
      <div className="max-w-[800px] mx-auto px-6 mt-12 relative z-10">
        {step === "amount" && AmountView}
        {step === "details" && DetailsForm}
        {step === "scan" && ScannerView}
        {step === "success" && SuccessPopup}
      </div>
    </div>
  );
}
