import AnimatedSection from "./AnimatedSection";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { useState, useEffect } from "react";

export type HeroTheme = 'blog' | 'leadership' | 'spiritual' | 'career' | 'training' | 'gallery' | 'corporate';

interface PageHeroProps {
  title: string;
  subtitle: string;
  theme?: HeroTheme;
  showBadge?: boolean;
}

const themeImages: Record<HeroTheme, string[]> = {
  blog: [
    "/hero/hero_blog_1_1780037991976.png",
    "/hero/hero_blog_2_1780038008524.png"
  ],
  leadership: [
    "/hero/hero_leadership_1_1780038023673.png",
    "/hero/hero_leadership_2_1780038046305.png"
  ],
  spiritual: [
    "/hero/hero_spiritual_1_1780038062643.png",
    "/hero/hero_spiritual_2_1780038079653.png"
  ],
  career: [
    "/hero/hero_career_1_1780038098319.png",
    "/hero/hero_career_2_1780038113665.png"
  ],
  training: [
    "/hero/hero_training_1_1780038142119.png",
    "/hero/hero_training_2_1780038156130.png"
  ],
  gallery: [
    "/hero/hero_gallery_1_1780038174101.png",
    "/hero/hero_gallery_2_1780038191901.png"
  ],
  corporate: [
    "/hero/hero_corporate_1_1780038208072.png",
    "/hero/hero_corporate_2_1780038230371.png"
  ]
};

export const PageHero = ({ 
  title, 
  subtitle, 
  theme = 'corporate',
  showBadge = true 
}: PageHeroProps) => {
  const images = themeImages[theme] || themeImages.corporate;
  
  // Initialize with random image to prevent same start on every page load
  const [currentImageIndex, setCurrentImageIndex] = useState(() => 
    Math.floor(Math.random() * images.length)
  );

  useEffect(() => {
    // Preload all images for this theme to prevent flickering
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <section 
      className="relative w-full overflow-hidden flex flex-col items-center justify-center text-center py-12 md:py-16 min-h-[300px]"
    >
      {/* Rotating Background Images */}
      {images.map((src, index) => (
        <div 
          key={src}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}

      {/* Dark overlay for text readability (65%) */}
      <div className="absolute inset-0 bg-black/65 z-0 pointer-events-none" />

      {/* Ambient radial glow over the dark overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[70%] h-[150%] bg-primary/30 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>
      
      <div className="relative z-10 flex flex-col items-center px-4 w-full max-w-4xl mx-auto">
        <AnimatedSection direction="up" className="flex flex-col items-center w-full">

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 mb-2 bg-white/5 backdrop-blur-md px-3 py-0.5 rounded-full border border-white/10 shadow-sm w-fit mx-auto">
            <Link to="/" className="text-white/60 hover:text-white transition-colors font-semibold text-[9px] uppercase tracking-widest">Home</Link>
            <span className="text-white/30 cursor-default text-[10px] leading-none mb-0.5">›</span>
            <span className="text-accent font-bold cursor-default text-[9px] uppercase tracking-widest">{title}</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-1 drop-shadow-2xl tracking-tight leading-tight">
            {title}
          </h1>
          
          <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base font-light drop-shadow-md leading-relaxed">
            {subtitle}
          </p>
          
          {showBadge && (
            <div className="mt-3 inline-flex items-center gap-2 text-[10px] font-bold text-accent bg-accent/10 backdrop-blur-sm px-5 py-2 rounded-full border border-accent/20 shadow-lg tracking-[0.2em] uppercase">
              <Check className="w-3 h-3" />
              Complete People Solutions Delivered
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
};
