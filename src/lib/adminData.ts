import { Scale, TrendingUp, Users, Shield, MessageSquare, Briefcase, UserSearch, Layers, ShieldAlert, Leaf } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ServiceItem {
  id: number;
  category: string; // ir-legal, strategy, hr-ops, risk
  title: string;
  details: string[];
}

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  summary: string;
  route: string;
  imageUrl?: string;
}

export interface PaymentRecord {
  id: number;
  name: string;
  phone: string;
  amount: number;
  transactionId: string;
  date: string;
  status: "paid" | "pending" | "not-paid";
  email: string;
}

export interface ContactRecord {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

// ─── Storage Keys ─────────────────────────────────────────────────────────────

const SERVICES_KEY = "hiteisee_admin_services_v2";
const BLOGS_KEY = "hiteisee_admin_blogs_v2";
const PAYMENTS_KEY = "hiteisee_admin_payments_v2";
const CONTACTS_KEY = "hiteisee_admin_contacts_v2";

// ─── Default Data ─────────────────────────────────────────────────────────────

export const defaultServices: ServiceItem[] = [
  {
    id: 1,
    category: "ir-legal",
    title: "Strategic IR Services",
    details: [
      "Develop IR Policies",
      "Design IR Systems, Processes",
      "IR Strategies formulation",
      "Statutory / Legal Compliances",
      "Legal Dispute Resolution",
      "Negotiation & Settlements",
      "Discipline management systems",
    ],
  },
  {
    id: 2,
    category: "ir-legal",
    title: "Strategic Litigation Management",
    details: [
      "Litigation management",
      "Legal Advisory Services",
      "Statutory & Legal Compliance services",
      "Legal Drafting services",
      "Legal Dispute Resolution",
    ],
  },
  {
    id: 3,
    category: "ir-legal",
    title: "Land Acquisition, Rehabilitation & Resettlement Management",
    details: [
      "Land Acquisition Consulting",
      "Government Liaison and Regulatory Approvals",
      "Rehabilitation and Resettlement (R&R) Consulting",
      "Stakeholder Engagement and Community Relations",
      "Infrastructure Development and Utility Management",
    ],
  },
  {
    id: 4,
    category: "strategy",
    title: "Strategy Consulting Services",
    details: [
      "Management of Organizational Values",
      "Redefining business strategies",
      "Management of Change",
      "Aligning OD interventions",
      "Efficiently performing organization structure",
      "Aligning and improving business processes",
      "Process definition and audits",
      "Strategies for improving competitiveness",
      "Business tie-ups",
      "Strategies for a Learning organization",
    ],
  },
  {
    id: 5,
    category: "strategy",
    title: "Corporate Affairs Services",
    details: [
      "Liaison services",
      "Media management services",
      "Corporate Communications services",
    ],
  },
  {
    id: 6,
    category: "strategy",
    title: "Entrepreneurship & Start-up Management",
    details: [
      "Business Strategy and Planning",
      "Financial Planning and Fundraising",
      "Product Development and Innovation",
      "Operations and Process Optimisation",
      "Marketing and Branding Strategy",
      "Sales Strategy and Customer Acquisition",
      "Legal and Compliance Consulting",
      "Technology and IT Infrastructure",
      "Human Resources and Talent Management",
      "Risk Management and Crisis Mitigation",
      "Customer Experience (CX) and Retention",
      "Scaling and Growth Strategy",
      "Investor Relations and Stakeholder Management",
    ],
  },
  {
    id: 7,
    category: "hr-ops",
    title: "Strategic HR Services",
    details: [
      "Customized and benchmarked HR policy formulation",
      "Design customized HR Systems, Processes",
      "Assessment & Development Centre (ADC)",
      "Employee Engagement survey",
      "Employee Engagement processes",
      "Competency Modelling & Mapping",
      "Career & Succession planning",
      "HR Audit",
      "Design & Development of HRIS",
      "HR Planning & Assessment",
      "HR Systems development",
      "ADC - Behavioural mapping",
      "Compensation & Benefits design & management",
      "Competency framework",
      "Performance Management System",
      "Balanced scorecard framework",
      "OD interventions",
      "Talent Retention strategies",
      "Roles design",
      "Psychometric Assessments",
      "Exit Interviews",
    ],
  },
  {
    id: 8,
    category: "hr-ops",
    title: "Strategic Talent Acquisition",
    details: [
      "We engage in role-defined executive search, Blue Collar & White collar HR search with high degree of success. We handle limited mandates and ensure our customers get high value in return.",
    ],
  },
  {
    id: 9,
    category: "hr-ops",
    title: "HR Shared Services",
    details: [
      "HR Leasing",
      "Pay Roll processing services",
    ],
  },
  {
    id: 10,
    category: "hr-ops",
    title: "Strategic Learning & Development",
    details: [
      "L&D Policies",
      "Design L&D Systems, Processes",
      "Training Needs Assessment (TNA)",
      "Design & Deliver Customised MDPs / SDPs in Technical, Functional, Behavioural areas",
      "Training Impact Assessment",
      "Post Training evaluation & monitoring of ROI through metrics.",
    ],
  },
  {
    id: 11,
    category: "hr-ops",
    title: "Success / Executive Coaching",
    details: [
      "We serve across various levels of the organization from strategy making top management to the ground level operatives who have the responsibility of putting these strategies to action. We therefore operate as Executive Coach as well as hands-on agents of change.",
      "Counselling",
      "Mentoring",
      "Executive Coaching",
      "Finishing School",
      "Personality Development",
      "Soft Skills",
      "Behavioural Skills",
      "Business Etiquettes",
    ],
  },
  {
    id: 12,
    category: "hr-ops",
    title: "Mentoring",
    details: [
      "Individual development",
      "Knowledge Management",
    ],
  },
  {
    id: 13,
    category: "risk",
    title: "Safety Services",
    details: [
      "Safety Audit",
      "Safety Policies formulation",
      "Behaviour Based Safety implementation",
      "Design & Deliver Customised Training in BBS, OHSAS, Safety management",
    ],
  },
  {
    id: 14,
    category: "risk",
    title: "Strategic Security Management",
    details: [
      "Industrial Security and asset Protection",
      "Security Consulting Services for Commercial Shopping Complexes",
      "Security Consulting Services for Residential Complexes",
      "Banking and Financial Institutions Security",
      "Healthcare and Hospital Security",
      "Education Institutions and Campus Security",
      "Hotel and Hospitality Security",
      "Transportation and Logistics Security",
      "Event Security and Crowd Management",
      "Retail Loss Prevention and Anti-Theft Consulting",
      "Private Estate and VIP Security Consulting",
      "Maritime Security Consulting",
    ],
  },
  {
    id: 15,
    category: "risk",
    title: "Strategic CSR Services",
    details: [
      "CSR Policy formulation",
      "CSR Strategy formulation",
      "Design & delivery of sustainable CSR initiatives",
      "Impact Assessment services",
    ],
  },
];

export const defaultBlogs: BlogPost[] = [
  {
    id: 1,
    title: "MASK",
    category: "Spiritual Science",
    author: "Dr. Suvendu Das",
    date: "August 4, 2024",
    readTime: "8 min read",
    summary: "It was a chilled winter afternoon. I was present in the morose atmosphere of one my ex-colleagues residence whose son Rama met an untimely death. Rama’s Parents, Wife and nine year young Son were crying bitterly sitting next to his dead body. I can never forget this experience what I witnessed on that day...",
    route: "/mask",
  },
  {
    id: 2,
    title: "CURING CORPORATE DISEASES",
    category: "Organizational Health",
    author: "Dr. Suvendu Das",
    date: "August 3, 2024",
    readTime: "12 min read",
    summary: "When I delved deeply, it flashed that the corporate body is similar to our human body...",
    route: "/curing-corporate-diseases",
  },
  {
    id: 3,
    title: "Akāḷa Kuṣmāṇḍa (ଅକାଳ କୁଷ୍ମାଣ୍ଡ, ଅକାଳ କୁଷ୍ମାଣ୍ଡ)",
    category: "Cultural Wisdom",
    author: "Dr. Suvendu Das",
    date: "August 2, 2024",
    readTime: "10 min read",
    summary: "Bosses in the corporate world, when unhappy with their subordinates / Team...",
    route: "/cultural-wisdom",
  },
];

export const defaultPayments: PaymentRecord[] = [
  { id: 1, name: "Aarav Mehta", phone: "9876543210", amount: 299, transactionId: "TXN583920194", date: "2026-05-28", status: "paid", email: "aarav@example.com" },
  { id: 2, name: "Diya Sharma", phone: "9123456789", amount: 299, transactionId: "TXN748291034", date: "2026-05-27", status: "pending", email: "diya@example.com" },
  { id: 3, name: "Kabir Singh", phone: "9988776655", amount: 299, transactionId: "TXN102938475", date: "2026-05-25", status: "not-paid", email: "kabir@example.com" },
];

export const defaultContacts: ContactRecord[] = [
  { id: 1, name: "Rajesh Panda", email: "rajesh@example.com", phone: "9876500001", subject: "HR Consulting Inquiry", message: "We are looking for HR consulting services for our manufacturing unit. Please connect us.", date: "2026-05-28", read: false },
  { id: 2, name: "Sunita Mohanty", email: "sunita@example.com", phone: "9876500002", subject: "Training Workshop", message: "Interested in leadership development training for our team of 50 managers.", date: "2026-05-27", read: true },
];

// Helper to get Category Icon
export const getCategoryIcon = (category: string) => {
  switch (category) {
    case "ir-legal": return Scale;
    case "strategy": return TrendingUp;
    case "hr-ops": return Users;
    case "risk": return Shield;
    default: return Users;
  }
};

// ─── Generic Helpers ──────────────────────────────────────────────────────────

function getItems<T>(key: string, defaults: T[]): T[] {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  localStorage.setItem(key, JSON.stringify(defaults));
  return defaults;
}

function saveItems<T>(key: string, items: T[]): void {
  localStorage.setItem(key, JSON.stringify(items));
}

// ─── Services ─────────────────────────────────────────────────────────────────

export function getServices(): ServiceItem[] { return getItems(SERVICES_KEY, defaultServices); }
export function saveServices(s: ServiceItem[]): void { saveItems(SERVICES_KEY, s); }
export function addService(title: string, category: string, details: string[]): ServiceItem[] {
  const items = getServices();
  const id = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
  const updated = [...items, { id, title, category, details }];
  saveServices(updated);
  return updated;
}
export function deleteService(id: number): ServiceItem[] {
  const updated = getServices().filter(s => s.id !== id);
  saveServices(updated);
  return updated;
}

// ─── Blogs ────────────────────────────────────────────────────────────────────

export function getBlogs(): BlogPost[] { return getItems(BLOGS_KEY, defaultBlogs); }
export function saveBlogs(b: BlogPost[]): void { saveItems(BLOGS_KEY, b); }
export function addBlog(title: string, category: string, author: string, summary: string, imageUrl?: string): BlogPost[] {
  const items = getBlogs();
  const id = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const route = "/" + title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").slice(0, 40);
  const readTime = `${Math.max(3, Math.ceil(summary.split(" ").length / 200))} min read`;
  const updated = [...items, { id, title, category, author, date, readTime, summary, route, imageUrl }];
  saveBlogs(updated);
  return updated;
}
export function deleteBlog(id: number): BlogPost[] {
  const updated = getBlogs().filter(b => b.id !== id);
  saveBlogs(updated);
  return updated;
}

// ─── Payments ─────────────────────────────────────────────────────────────────

export function getPayments(): PaymentRecord[] { return getItems(PAYMENTS_KEY, defaultPayments); }
export function savePayments(p: PaymentRecord[]): void { saveItems(PAYMENTS_KEY, p); }
export function updatePaymentStatus(id: number, status: PaymentRecord["status"]): PaymentRecord[] {
  const updated = getPayments().map(p => p.id === id ? { ...p, status } : p);
  savePayments(updated);
  return updated;
}
export function addPayment(record: Omit<PaymentRecord, "id" | "date">): PaymentRecord[] {
  const items = getPayments();
  const id = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
  const date = new Date().toISOString().split('T')[0];
  const updated = [...items, { id, date, ...record }];
  savePayments(updated);
  return updated;
}

// ─── Contacts ─────────────────────────────────────────────────────────────────

export function getContacts(): ContactRecord[] { return getItems(CONTACTS_KEY, defaultContacts); }
export function saveContacts(c: ContactRecord[]): void { saveItems(CONTACTS_KEY, c); }
export function markContactRead(id: number): ContactRecord[] {
  const updated = getContacts().map(c => c.id === id ? { ...c, read: true } : c);
  saveContacts(updated);
  return updated;
}
export function addContact(record: Omit<ContactRecord, "id" | "date" | "read">): ContactRecord[] {
  const items = getContacts();
  const id = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
  const date = new Date().toISOString().split('T')[0];
  const updated = [...items, { id, date, read: false, ...record }];
  saveContacts(updated);
  return updated;
}
export function deleteContact(id: number): ContactRecord[] {
  const updated = getContacts().filter(c => c.id !== id);
  saveContacts(updated);
  return updated;
}
