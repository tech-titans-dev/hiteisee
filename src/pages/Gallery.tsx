import { useState, useEffect } from "react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { PageHero } from "@/components/shared/PageHero";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { getGalleryImages, type GalleryImage } from "@/lib/galleryData";



const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    setGalleryImages(getGalleryImages());
  }, []);

  const categories = ["All", ...Array.from(new Set(galleryImages.map(img => img.category || "Other")))];
  
  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => (img.category || "Other") === activeCategory);


  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? filteredImages.length - 1 : selectedIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === filteredImages.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  const currentSelectedImage = selectedIndex !== null ? filteredImages[selectedIndex] : null;

  return (
    <div className="min-h-screen bg-background">
      <PageHero 
        title="Our Gallery" 
        subtitle="A visual journey through our events, programs, and memorable moments." 
        theme="gallery"
      />

      <section className="py-24 relative overflow-hidden bg-background">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          
          {/* Dynamic Image Count Badge & Filter Tabs */}
          <AnimatedSection className="mb-12">
            <div className="flex flex-col items-center justify-center gap-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/5 border border-primary/10">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-bold text-foreground tracking-wide">
                  {filteredImages.length} Moments Captured
                </span>
              </div>

              {/* Category Tabs */}
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category);
                      setSelectedIndex(null);
                    }}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                      activeCategory === category 
                        ? "bg-primary text-white shadow-md shadow-primary/20" 
                        : "bg-white text-slate-600 border border-slate-200 hover:border-primary/50 hover:bg-slate-50"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Masonry-style Grid */}
          <motion.div layout className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            <AnimatePresence>
              {filteredImages.map((img, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.02 }}
                  key={img.id}
                  className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer border border-border bg-secondary/5 mb-4 inline-block w-full"
                  onClick={() => setSelectedIndex(index)}
                >
                  <img 
                    src={img.src} 
                    alt={img.title}
                    loading="lazy"
                    className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent z-10 opacity-80 group-hover:opacity-95 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transform translate-y-0.5 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-[11px] md:text-xs font-semibold leading-snug line-clamp-2 drop-shadow-md">
                      {img.title}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal with Navigation */}
      <AnimatePresence>
        {currentSelectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-20"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button 
              onClick={handlePrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button 
              onClick={handleNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={currentSelectedImage.src} 
                alt={currentSelectedImage.title}
                className="w-auto h-auto max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-white/10"
              />
              <div className="mt-6 text-center">
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-white">
                  {currentSelectedImage.title}
                </h3>
                <p className="text-white/40 text-xs font-bold mt-2 uppercase tracking-widest">
                  {selectedIndex !== null ? selectedIndex + 1 : 0} / {filteredImages.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
