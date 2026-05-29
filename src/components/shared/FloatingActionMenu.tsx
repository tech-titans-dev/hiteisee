import { Phone, Mail, MessageCircle } from "lucide-react";

export const FloatingActionMenu = () => {
  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[90] flex flex-col overflow-hidden shadow-2xl rounded-r-2xl">
      <a 
        href="https://wa.me/918763666511" 
        target="_blank" 
        rel="noreferrer"
        className="w-11 h-11 flex items-center justify-center bg-[#25D366] text-white hover:w-14 transition-all duration-300 ease-out shadow-lg group relative overflow-hidden"
        title="WhatsApp"
      >
        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        <MessageCircle className="w-5 h-5" />
      </a>
      
      <a 
        href="tel:+918763666511"
        className="w-11 h-11 flex items-center justify-center text-white hover:w-14 transition-all duration-300 ease-out shadow-lg group relative overflow-hidden"
        style={{ backgroundColor: 'hsl(222, 47%, 11%)' }}
        title="Call Us"
      >
        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        <Phone className="w-5 h-5" />
      </a>
      
      <a 
        href="mailto:info@hiteisee.in"
        className="w-11 h-11 flex items-center justify-center text-foreground hover:w-14 transition-all duration-300 ease-out shadow-lg group relative overflow-hidden"
        style={{ backgroundColor: 'hsl(43, 74%, 49%)' }}
        title="Email Us"
      >
        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        <Mail className="w-5 h-5" />
      </a>
    </div>
  );
};
