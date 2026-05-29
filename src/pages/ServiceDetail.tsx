import { useParams, Navigate } from "react-router-dom";
import { PageHero } from "@/components/shared/PageHero";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { slugify, serviceCategories } from "./Services";
import { getServices } from "@/lib/adminData";

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const services = getServices();
  const service = services.find((cap) => slugify(cap.title) === slug);

  if (!service) {
    // If service not found, redirect to services page
    return <Navigate to="/services" replace />;
  }

  const categoryLabel = serviceCategories.find((c) => c.id === service.category)?.label;

  return (
    <div className="min-h-screen bg-background">
      <PageHero 
        title={service.title} 
        subtitle={categoryLabel ?? ""} 
        theme="training"
      />
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {service.details.map((detail, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl bg-secondary/30 border border-border/30 hover:bg-secondary/50 hover:border-primary/20 transition-all"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-primary text-white font-medium">{idx + 1}</div>
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                </div>
                <span className="text-muted-foreground leading-relaxed font-medium">{detail}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
