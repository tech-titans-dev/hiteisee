import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Settings, LogOut, 
  Search, Plus, Trash2, CheckCircle2, AlertCircle, FileText,
  Image as ImageIcon, Upload, FileMinus, CreditCard, Mail, Check,
  Briefcase, BookOpen, Download, Bell, BellRing
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Import local data APIs
import { 
  getServices, addService, deleteService, type ServiceItem,
  getBlogs, addBlog, deleteBlog, type BlogPost,
  getPayments, updatePaymentStatus, type PaymentRecord,
  getContacts, markContactRead, deleteContact, type ContactRecord
} from "@/lib/adminData";
import { getGalleryImages, addGalleryImage, removeGalleryImage, type GalleryImage } from "@/lib/galleryData";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  // Data states
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [contacts, setContacts] = useState<ContactRecord[]>([]);

  // Services Form state
  const [svcCategory, setSvcCategory] = useState("strategy");
  const [svcTitle, setSvcTitle] = useState("");
  const [svcDetails, setSvcDetails] = useState("");

  // Blog Form state
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("Corporate");
  const [blogAuthor, setBlogAuthor] = useState("Dr. Suvendu Das");
  const [blogSummary, setBlogSummary] = useState("");
  const [blogImageUrl, setBlogImageUrl] = useState("");

  // Gallery Form state
  const [galTitle, setGalTitle] = useState("");
  const [galFile, setGalFile] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Search filter states
  const [payFilter, setPayFilter] = useState("all"); // all, paid, pending, not-paid

  const unreadContactsCount = contacts.filter(c => !c.read).length;
  const pendingPaymentsCount = payments.filter(p => p.status === "pending").length;
  const totalNotifications = unreadContactsCount + pendingPaymentsCount;

  // Reload all data
  const loadData = () => {
    setServices(getServices());
    setBlogs(getBlogs());
    setGalleryImages(getGalleryImages());
    setPayments(getPayments());
    setContacts(getContacts());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = () => {
    toast.info("Logging out from Admin Portal...");
    setTimeout(() => navigate("/"), 1000);
  };

  // ─── Service Actions ────────────────────────────────────────────────────────
  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!svcTitle.trim() || !svcDetails.trim()) {
      toast.error("Please fill all service fields.");
      return;
    }
    const detailsArray = svcDetails.split("\n").map(line => line.trim()).filter(Boolean);
    const updated = addService(svcTitle.trim(), svcCategory, detailsArray);
    setServices(updated);
    setSvcTitle("");
    setSvcDetails("");
    toast.success(`Service "${svcTitle}" added successfully!`);
  };

  const handleDeleteService = (id: number, title: string) => {
    const updated = deleteService(id);
    setServices(updated);
    toast.success(`Service "${title}" deleted.`);
  };

  // ─── Blog Actions ───────────────────────────────────────────────────────────
  const handleAddBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle.trim() || !blogSummary.trim()) {
      toast.error("Please fill all blog fields.");
      return;
    }
    const updated = addBlog(blogTitle.trim(), blogCategory, blogAuthor, blogSummary.trim(), blogImageUrl.trim());
    setBlogs(updated);
    setBlogTitle("");
    setBlogSummary("");
    setBlogImageUrl("");
    toast.success(`Blog "${blogTitle}" published successfully!`);
  };

  const handleDeleteBlog = (id: number, title: string) => {
    const updated = deleteBlog(id);
    setBlogs(updated);
    toast.success(`Blog "${title}" deleted.`);
  };

  // ─── Gallery Actions ────────────────────────────────────────────────────────
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setGalFile(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAddGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galFile) {
      toast.error("Please select an image file.");
      return;
    }
    const title = galTitle.trim() || "Untitled Event";
    const updated = addGalleryImage(title, galFile);
    setGalleryImages(updated);
    setGalTitle("");
    setGalFile("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    toast.success(`Photo "${title}" uploaded successfully!`);
  };

  const handleDeleteGallery = (id: number, title: string) => {
    const updated = removeGalleryImage(id);
    setGalleryImages(updated);
    toast.success(`Photo "${title}" removed.`);
  };

  // ─── Payment Actions ────────────────────────────────────────────────────────
  const handleStatusChange = (id: number, status: PaymentRecord["status"]) => {
    const updated = updatePaymentStatus(id, status);
    setPayments(updated);
    toast.success("Payment status updated successfully!");
  };

  const handleSendMail = (payment: PaymentRecord) => {
    const subject = encodeURIComponent("Payment Verification Successful - Hiteisee Consulting");
    const body = encodeURIComponent(`Dear ${payment.name},

We have successfully verified your payment of ₹${payment.amount} (Txn ID: ${payment.transactionId}).
Your consultation slot is now confirmed. Please find your official receipt details attached or refer to your transaction number.

Regards,
Hiteisee Admin`);

    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${payment.email}&su=${subject}&body=${body}`;
    window.open(gmailLink, '_blank');
    
    toast.success(`Opening Gmail for ${payment.name}...`);
  };

  const handleDownloadPDF = () => {
    // Generate styled printable window mimicking a PDF export
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      toast.error("Popup blocked! Please allow popups to download report.");
      return;
    }

    const totalRevenue = payments
      .filter(p => p.status === "paid")
      .reduce((sum, p) => sum + p.amount, 0);

    const rowsHtml = payments.map(p => `
      <tr style="border-bottom: 1px solid #e2e8f0; font-size: 13px;">
        <td style="padding: 12px 8px; font-weight: bold;">${p.name}</td>
        <td style="padding: 12px 8px;">${p.phone}</td>
        <td style="padding: 12px 8px; font-family: monospace;">${p.transactionId}</td>
        <td style="padding: 12px 8px;">${p.date}</td>
        <td style="padding: 12px 8px; text-transform: uppercase; font-weight: bold; color: ${p.status === 'paid' ? '#10b981' : p.status === 'pending' ? '#f59e0b' : '#ef4444'}">${p.status}</td>
        <td style="padding: 12px 8px; text-align: right; font-weight: bold;">₹${p.amount}</td>
      </tr>
    `).join("");

    printWindow.document.write(`
      <html>
        <head>
          <title>Hiteisee - Payment History Report</title>
          <style>
            body { font-family: 'Inter', system-ui, sans-serif; color: #1e293b; padding: 40px; }
            .header { display: flex; justify-between: space-between; align-items: center; border-bottom: 2px solid #1e3a8a; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { font-size: 24px; font-weight: 900; color: #1e3a8a; letter-spacing: 1px; }
            .meta { text-align: right; font-size: 12px; color: #64748b; }
            .title { font-size: 20px; font-weight: 800; text-transform: uppercase; margin-bottom: 20px; color: #0f172a; }
            .summary-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
            .card { border: 1px solid #e2e8f0; padding: 15px; rounded: 8px; background: #f8fafc; }
            .card-label { font-size: 10px; font-weight: bold; text-transform: uppercase; color: #64748b; }
            .card-value { font-size: 20px; font-weight: bold; color: #0f172a; margin-top: 5px; }
            table { w-full; width: 100%; border-collapse: collapse; margin-top: 10px; }
            th { background: #f1f5f9; padding: 12px 8px; text-align: left; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #475569; border-bottom: 2px solid #cbd5e1; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="logo">HITEISEE CONSULTING</div>
              <div style="font-size: 12px; color: #64748b; font-weight: 600;">Complete People Solutions Delivered</div>
            </div>
            <div class="meta">
              <div>Report Date: ${new Date().toLocaleDateString()}</div>
              <div>Generated by: Admin Portal</div>
            </div>
          </div>

          <div class="title">Payment History Report</div>

          <div class="summary-cards">
            <div class="card">
              <div class="card-label">Total Transactions</div>
              <div class="card-value">${payments.length}</div>
            </div>
            <div class="card">
              <div class="card-label">Total Revenue (Paid)</div>
              <div class="card-value">₹${totalRevenue}</div>
            </div>
            <div class="card">
              <div class="card-label">Pending Entries</div>
              <div class="card-value">${payments.filter(p => p.status === "pending").length}</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Status</th>
                <th style="text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>

          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // ─── Contact Actions ────────────────────────────────────────────────────────
  const handleMarkContactRead = (id: number) => {
    const updated = markContactRead(id);
    setContacts(updated);
    toast.success("Message marked as read.");
  };

  const handleDeleteContact = (id: number) => {
    const updated = deleteContact(id);
    setContacts(updated);
    toast.success("Inquiry deleted.");
  };

  const filteredPayments = [...payments]
    .filter((p) => payFilter === "all" || p.status === payFilter)
    .sort((a, b) => b.id - a.id);

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
      {/* Premium Admin Sidebar */}
      <aside className="w-[280px] bg-[#0a0f1c] border-r border-white/10 flex flex-col items-center py-8 relative shadow-[10px_0_30px_rgba(0,0,0,0.15)] z-20">
        <div className="flex items-center gap-3 px-8 mb-12 w-full">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 border border-white/20">
            <LayoutDashboard className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="font-heading font-black text-white leading-none tracking-tight text-lg">Admin Dr. Suvendu</h1>
            <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 mt-1">Portal Console</p>
          </div>
        </div>

        <nav className="flex-1 w-full px-4 space-y-1.5">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={activeTab === "dashboard"} 
            onClick={() => setActiveTab("dashboard")} 
          />
          <SidebarItem 
            icon={Briefcase} 
            label="Services Matrix" 
            active={activeTab === "services"} 
            onClick={() => setActiveTab("services")} 
          />
          <SidebarItem 
            icon={BookOpen} 
            label="Blog Content" 
            active={activeTab === "blog"} 
            onClick={() => setActiveTab("blog")} 
          />
          <SidebarItem 
            icon={ImageIcon} 
            label="Gallery Assets" 
            active={activeTab === "gallery"} 
            onClick={() => setActiveTab("gallery")} 
          />
          <SidebarItem 
            icon={CreditCard} 
            label="Payments & Receipts" 
            active={activeTab === "payment"} 
            onClick={() => setActiveTab("payment")} 
          />
          <SidebarItem 
            icon={Mail} 
            label="Contacts / Inquiries" 
            active={activeTab === "contact"} 
            onClick={() => setActiveTab("contact")} 
            badge={contacts.filter(c => !c.read).length}
          />
        </nav>

        <div className="px-6 w-full mt-auto relative z-10">
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full flex items-center justify-start gap-3 h-12 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 hover:border-rose-500/30 border border-transparent font-bold transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout Portal
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative bg-[#f8fafc]">
        {/* Top Header */}
        <header className="h-24 bg-white/70 backdrop-blur-xl border-b border-white flex items-center justify-between px-10 sticky top-0 z-10 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
          <h2 className="text-2xl font-heading font-black text-slate-900 capitalize tracking-tight">
            {activeTab === "dashboard" ? "System Overview" : `${activeTab} Management`}
          </h2>
          <div className="flex items-center gap-6">
            <button 
              className="relative p-2 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              onClick={() => {
                if (pendingPaymentsCount > 0) {
                  setActiveTab("payment");
                } else if (unreadContactsCount > 0) {
                  setActiveTab("contact");
                } else {
                  toast.info("You're all caught up! No new notifications.");
                }
              }}
            >
              {totalNotifications > 0 ? (
                <>
                  <BellRing className="w-6 h-6 animate-pulse text-amber-500" />
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center text-[9px] font-bold text-white border-2 border-white">
                    {totalNotifications}
                  </span>
                </>
              ) : (
                <Bell className="w-6 h-6" />
              )}
            </button>
            <div className="w-px h-8 bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <img src="/founder/image.png" alt="Dr. Suvendu Das" className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm" />
              <span className="text-sm font-bold text-slate-700">Welcome Dr. Suvendu Das</span>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-10">
          <AnimatePresence mode="wait">
            
            {/* ─── DASHBOARD TAB ──────────────────────────────────────────────── */}
            {activeTab === "dashboard" && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <StatCard label="Total Services" value={services.length} icon={Briefcase} color="bg-blue-600" />
                  <StatCard label="Total Blogs" value={blogs.length} icon={BookOpen} color="bg-violet-600" />
                  <StatCard label="Total Gallery" value={galleryImages.length} icon={ImageIcon} color="bg-emerald-600" />
                  <StatCard label="Unread Inquiries" value={contacts.filter(c => !c.read).length} icon={Mail} color="bg-rose-600" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Recent Payments */}
                  <div className="lg:col-span-7 bg-white rounded-[2rem] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] p-8 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold text-slate-900">Recent Transactions</h3>
                      <button 
                        onClick={() => setActiveTab("payment")} 
                        className="text-xs font-bold text-primary hover:underline"
                      >
                        View All
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="text-[10px] uppercase tracking-widest font-black text-slate-400 border-b border-slate-100 pb-3">
                            <th className="pb-3">Customer</th>
                            <th className="pb-3">Date</th>
                            <th className="pb-3">Status</th>
                            <th className="pb-3 text-right">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {payments.slice(0, 4).map((p) => (
                            <tr key={p.id} className="group">
                              <td className="py-3.5 font-bold text-slate-700">
                                {p.name}
                                <div className="text-[10px] text-slate-400 font-normal">{p.email}</div>
                              </td>
                              <td className="py-3.5 text-xs font-bold text-slate-400">{p.date}</td>
                              <td className="py-3.5">
                                <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                  p.status === "paid" ? "bg-emerald-50 text-emerald-600" :
                                  p.status === "pending" ? "bg-amber-50 text-amber-600" : "bg-rose-50 text-rose-600"
                                }`}>
                                  {p.status}
                                </span>
                              </td>
                              <td className="py-3.5 text-right font-bold text-slate-800">₹{p.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Recent Inquiries */}
                  <div className="lg:col-span-5 bg-white rounded-[2rem] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] p-8 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold text-slate-900">Recent Inquiries</h3>
                      <button 
                        onClick={() => setActiveTab("contact")} 
                        className="text-xs font-bold text-primary hover:underline"
                      >
                        View All
                      </button>
                    </div>
                    <div className="space-y-4">
                      {contacts.slice(0, 3).map((c) => (
                        <div key={c.id} className={`p-4 rounded-2xl border transition-all ${
                          c.read ? "bg-slate-50/50 border-slate-100" : "bg-primary/5 border-primary/10 shadow-sm"
                        }`}>
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-bold text-slate-800">{c.name}</h4>
                            <span className="text-[10px] text-slate-400 font-bold">{c.date}</span>
                          </div>
                          <p className="text-xs text-slate-500 font-bold mt-1">{c.subject}</p>
                          <p className="text-xs text-slate-500 line-clamp-2 mt-2 font-medium">{c.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── SERVICES TAB ───────────────────────────────────────────────── */}
            {activeTab === "services" && (
              <motion.div 
                key="services"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                {/* Form to Add Service */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                  <h3 className="text-lg font-black text-slate-900 mb-6">Add Corporate Capability</h3>
                  <form onSubmit={handleAddService} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    <div className="md:col-span-4 space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Category</label>
                      <select 
                        value={svcCategory} 
                        onChange={(e) => setSvcCategory(e.target.value)}
                        className="w-full h-11 border border-slate-200 rounded-xl bg-slate-50 px-3 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="ir-legal">Industrial Relations & Legal</option>
                        <option value="strategy">Corporate Strategy & Growth</option>
                        <option value="hr-ops">Human Capital & Operations</option>
                        <option value="risk">Risk & Asset Protection</option>
                      </select>
                    </div>

                    <div className="md:col-span-8 space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Service / Capability Title</label>
                      <Input 
                        placeholder="e.g. Compensation & Benefits Design..." 
                        value={svcTitle}
                        onChange={(e) => setSvcTitle(e.target.value)}
                        className="h-11 border-slate-200 rounded-xl font-medium" 
                      />
                    </div>

                    <div className="md:col-span-12 space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Service Details (Enter each point / compliance feature on a new line)
                      </label>
                      <Textarea 
                        rows={4}
                        placeholder="Point 1&#10;Point 2&#10;Point 3..."
                        value={svcDetails}
                        onChange={(e) => setSvcDetails(e.target.value)}
                        className="border-slate-200 rounded-2xl resize-none font-medium" 
                      />
                    </div>

                    <div className="md:col-span-12 flex justify-end">
                      <Button type="submit" className="h-11 rounded-xl bg-primary text-white font-bold tracking-wider px-6 uppercase shadow-lg shadow-primary/15 hover:bg-primary/90">
                        <Plus className="w-4 h-4 mr-2" /> Add Capability
                      </Button>
                    </div>
                  </form>
                </div>

                {/* Services Directory List */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-100">
                    <h4 className="text-md font-bold text-slate-900">Current Capabilities Directory</h4>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {services.map((svc) => (
                      <div key={svc.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-50/50 transition-colors">
                        <div className="space-y-1 max-w-2xl">
                          <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            {svc.category.replace("-", " ")}
                          </span>
                          <h4 className="text-base font-bold text-slate-800 pt-1">{svc.title}</h4>
                          <p className="text-xs text-slate-400 font-semibold line-clamp-1 pt-0.5">
                            {svc.details.join(" • ")}
                          </p>
                        </div>
                        <Button 
                          onClick={() => handleDeleteService(svc.id, svc.title)}
                          variant="ghost" 
                          size="icon" 
                          className="w-10 h-10 rounded-xl text-rose-500 hover:text-rose-600 hover:bg-rose-50 border-none shrink-0"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── BLOG TAB ───────────────────────────────────────────────────── */}
            {activeTab === "blog" && (
              <motion.div 
                key="blog"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                {/* Form to Add Blog */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                  <h3 className="text-lg font-black text-slate-900 mb-6">Write Blog Post</h3>
                  <form onSubmit={handleAddBlog} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    <div className="md:col-span-6 space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Blog Title</label>
                      <Input 
                        placeholder="e.g. Alignment & Goal Interventions..." 
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
                        className="h-11 border-slate-200 rounded-xl font-medium" 
                      />
                    </div>

                    <div className="md:col-span-3 space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Category</label>
                      <Input 
                        placeholder="e.g. Organizational Health" 
                        value={blogCategory}
                        onChange={(e) => setBlogCategory(e.target.value)}
                        className="h-11 border-slate-200 rounded-xl font-medium" 
                      />
                    </div>

                    <div className="md:col-span-3 space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Author</label>
                      <Input 
                        placeholder="Dr. Suvendu Das" 
                        value={blogAuthor}
                        onChange={(e) => setBlogAuthor(e.target.value)}
                        className="h-11 border-slate-200 rounded-xl font-medium" 
                      />
                    </div>

                    <div className="md:col-span-12 space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Blog Article Content</label>
                      <Textarea 
                        rows={6}
                        placeholder="Write the full post summary or details here..."
                        value={blogSummary}
                        onChange={(e) => setBlogSummary(e.target.value)}
                        className="border-slate-200 rounded-2xl font-medium" 
                      />
                    </div>

                    <div className="md:col-span-12 space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Image or Link URL (Optional)</label>
                      <Input 
                        placeholder="https://example.com/image.jpg" 
                        value={blogImageUrl}
                        onChange={(e) => setBlogImageUrl(e.target.value)}
                        className="h-11 border-slate-200 rounded-xl font-medium" 
                      />
                    </div>

                    <div className="md:col-span-12 flex justify-end">
                      <Button type="submit" className="h-11 rounded-xl bg-primary text-white font-bold tracking-wider px-6 uppercase shadow-lg shadow-primary/15 hover:bg-primary/90">
                        <Plus className="w-4 h-4 mr-2" /> Publish Article
                      </Button>
                    </div>
                  </form>
                </div>

                {/* Published Articles List */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-100">
                    <h4 className="text-md font-bold text-slate-900">Published Blog Articles</h4>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {blogs.map((b) => (
                      <div key={b.id} className="p-6 flex justify-between items-center gap-6 hover:bg-slate-50/50 transition-colors">
                        <div className="flex gap-4 items-start flex-1">
                          {b.imageUrl && (
                            <img 
                              src={b.imageUrl} 
                              alt="Blog Thumbnail" 
                              className="w-16 h-16 object-cover rounded-xl border border-slate-200 shadow-sm shrink-0" 
                            />
                          )}
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-violet-50 text-violet-600">
                                {b.category}
                              </span>
                              <span className="text-[10px] text-slate-400 font-bold">{b.date} • {b.readTime}</span>
                            </div>
                            <h4 className="text-base font-bold text-slate-800 pt-1">{b.title}</h4>
                            <p className="text-xs text-slate-400 font-semibold line-clamp-1 pt-0.5">{b.summary}</p>
                          </div>
                        </div>
                        <Button 
                          onClick={() => handleDeleteBlog(b.id, b.title)}
                          variant="ghost" 
                          size="icon" 
                          className="w-10 h-10 rounded-xl text-rose-500 hover:text-rose-600 hover:bg-rose-50 border-none shrink-0"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── GALLERY TAB ────────────────────────────────────────────────── */}
            {activeTab === "gallery" && (
              <motion.div 
                key="gallery"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                {/* Upload Section */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                  <h3 className="text-lg font-black text-slate-900 mb-6">Upload Event Image</h3>
                  <form onSubmit={handleAddGallery} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                    <div className="md:col-span-5 space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Image Title / Event Label</label>
                      <Input 
                        placeholder="e.g. TISS Conclave Bhubaneswar..." 
                        value={galTitle}
                        onChange={(e) => setGalTitle(e.target.value)}
                        className="h-11 border-slate-200 rounded-xl font-medium" 
                      />
                    </div>
                    <div className="md:col-span-5 space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Choose Image File</label>
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange}
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors cursor-pointer"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Button type="submit" className="w-full h-11 rounded-xl bg-primary text-white font-bold uppercase tracking-wider">
                        <Upload className="w-4 h-4 mr-2" /> Upload
                      </Button>
                    </div>
                  </form>
                  {galFile && (
                    <div className="mt-6 p-4 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50 max-w-xs">
                      <img src={galFile} alt="Preview" className="w-full aspect-[4/3] object-cover rounded-xl shadow-md" />
                      <p className="text-[10px] text-slate-400 font-bold mt-2 text-center">Base64 Upload Ready</p>
                    </div>
                  )}
                </div>

                {/* Grid layout of all gallery photos */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {galleryImages.map((img) => (
                    <div key={img.id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all group relative aspect-[4/3]">
                      <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 gap-2">
                        <p className="text-white text-xs font-bold text-center leading-snug line-clamp-2">{img.title}</p>
                        <Button 
                          onClick={() => handleDeleteGallery(img.id, img.title)}
                          size="icon" 
                          className="w-8 h-8 rounded-full bg-rose-500 hover:bg-rose-600 text-white shrink-0 shadow-lg shadow-rose-500/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ─── PAYMENT TAB ────────────────────────────────────────────────── */}
            {activeTab === "payment" && (
              <motion.div 
                key="payment"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                {/* Actions Top */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-2">
                    {["all", "paid", "pending", "not-paid"].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setPayFilter(filter)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                          payFilter === filter 
                            ? "bg-slate-900 text-white border-slate-900" 
                            : "bg-transparent text-slate-400 hover:text-slate-900 border-transparent hover:border-slate-200"
                        }`}
                      >
                        {filter.replace("-", " ")}
                      </button>
                    ))}
                  </div>
                  <Button 
                    onClick={handleDownloadPDF}
                    className="h-11 rounded-xl bg-primary text-white font-bold tracking-wider px-6 uppercase shadow-lg shadow-primary/15 hover:bg-primary/90"
                  >
                    <Download className="w-4 h-4 mr-2" /> Download Statement (PDF)
                  </Button>
                </div>

                {/* Payments Table */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50/50">
                        <tr className="text-[10px] uppercase tracking-widest font-black text-slate-400 border-b border-slate-100">
                          <th className="px-6 py-4">Client / Payee</th>
                          <th className="px-6 py-4">Contact</th>
                          <th className="px-6 py-4">Transaction ID</th>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4">Status Adjuster</th>
                          <th className="px-6 py-4">Actions</th>
                          <th className="px-6 py-4 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredPayments.map((p) => (
                          <tr key={p.id} className="group hover:bg-slate-50/20 transition-colors">
                            <td className="px-6 py-4 font-bold text-slate-800">{p.name}</td>
                            <td className="px-6 py-4">
                              <div className="text-sm font-semibold text-slate-500">{p.phone}</div>
                              <div className="text-[10px] text-slate-400">{p.email}</div>
                            </td>
                            <td className="px-6 py-4 font-mono text-xs font-bold text-slate-400">{p.transactionId}</td>
                            <td className="px-6 py-4 text-sm font-semibold text-slate-400">{p.date}</td>
                            <td className="px-6 py-4">
                              <select 
                                value={p.status} 
                                disabled={p.status === "paid"}
                                onChange={(e) => handleStatusChange(p.id, e.target.value as PaymentRecord["status"])}
                                className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full focus:outline-none border border-slate-200 ${
                                  p.status === "paid" ? "bg-emerald-50 text-emerald-600 border-emerald-100 cursor-not-allowed opacity-80" :
                                  p.status === "pending" ? "bg-amber-50 text-amber-600 border-amber-100 cursor-pointer" : "bg-rose-50 text-rose-600 border-rose-100 cursor-pointer"
                                }`}
                              >
                                <option value="paid">Paid</option>
                                <option value="pending">Pending</option>
                                <option value="not-paid">Not Paid</option>
                              </select>
                            </td>
                            <td className="px-6 py-4">
                              {p.status === "paid" && (
                                <Button 
                                  onClick={() => handleSendMail(p)}
                                  size="sm"
                                  className="h-8 text-[10px] rounded-lg font-bold tracking-wider uppercase bg-primary/10 text-primary hover:bg-primary/20 shadow-none"
                                >
                                  <Mail className="w-3 h-3 mr-1" /> Send Verification Mail
                                </Button>
                              )}
                            </td>
                            <td className="px-6 py-4 text-right font-bold text-slate-800">₹{p.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── CONTACT TAB ────────────────────────────────────────────────── */}
            {activeTab === "contact" && (
              <motion.div 
                key="contact"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-6">
                  {contacts.map((c) => (
                    <div key={c.id} className={`p-8 bg-white rounded-3xl border shadow-sm transition-all flex flex-col md:flex-row justify-between gap-6 ${
                      c.read ? "border-slate-100/80 bg-slate-50/20" : "border-primary/20 shadow-md shadow-primary/5 bg-white"
                    }`}>
                      <div className="space-y-4 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h4 className="text-lg font-bold text-slate-800">{c.name}</h4>
                          <span className="text-xs text-slate-400 font-bold">{c.date}</span>
                          {!c.read && (
                            <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-rose-50 text-rose-600">
                              New Inquiry
                            </span>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-semibold text-slate-500">
                          <div>Email: <a href={`mailto:${c.email}`} className="text-primary hover:underline">{c.email}</a></div>
                          {c.phone && <div>Phone: <a href={`tel:${c.phone}`} className="text-primary hover:underline">{c.phone}</a></div>}
                          <div className="col-span-2 md:col-span-1">Subject: <span className="text-slate-800">{c.subject}</span></div>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-2xl text-sm text-slate-600 font-medium leading-relaxed border border-slate-100">
                          {c.message}
                        </div>
                      </div>

                      <div className="flex md:flex-col justify-end gap-3 shrink-0 self-start md:self-stretch items-center md:items-end">
                        {!c.read && (
                          <Button 
                            onClick={() => handleMarkContactRead(c.id)}
                            className="h-10 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs tracking-wider uppercase"
                          >
                            <Check className="w-4 h-4 mr-1.5" /> Mark Read
                          </Button>
                        )}
                        <Button 
                          onClick={() => handleDeleteContact(c.id)}
                          variant="ghost" 
                          className="h-10 rounded-xl text-rose-500 hover:text-rose-600 hover:bg-rose-50 font-bold text-xs tracking-wider uppercase border border-transparent hover:border-rose-100"
                        >
                          <Trash2 className="w-4 h-4 mr-1.5" /> Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, active, onClick, badge }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between h-13 rounded-xl px-5 transition-all duration-300 relative group overflow-hidden ${
      active 
        ? "bg-gradient-to-r from-primary/20 to-transparent border border-primary/30 text-white shadow-[inset_4px_0_0_#10b981]" 
        : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
    }`}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="flex items-center gap-3.5 relative z-10">
      <Icon className={`w-4 h-4 transition-all duration-300 ${active ? "text-primary scale-110" : "group-hover:text-primary group-hover:scale-110"}`} />
      <span className="font-bold text-sm tracking-wide">{label}</span>
    </div>
    {badge ? (
      <span className={`text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center relative z-10 shadow-lg ${
        active ? "bg-primary text-white" : "bg-rose-500 text-white"
      }`}>
        {badge}
      </span>
    ) : null}
  </button>
);

const StatCard = ({ label, value, icon: Icon, color }: any) => (
  <div className="relative group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden flex items-center gap-6">
    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-black/10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 relative z-10`}>
      <Icon size={24} strokeWidth={2.5} />
    </div>
    <div className="relative z-10">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{label}</p>
      <p className="text-3xl font-heading font-black text-slate-900 tracking-tight">{value}</p>
    </div>
  </div>
);

export default AdminDashboard;
