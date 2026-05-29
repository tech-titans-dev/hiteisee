import { useState, useEffect, useMemo } from "react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { PageHero } from "@/components/shared/PageHero";
import { Search, Calendar, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getBlogs, type BlogPost } from "@/lib/adminData";

const Blog = () => {
  const [blogsList, setBlogsList] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setBlogsList(getBlogs());
  }, []);

  const filteredBlogs = useMemo(() => {
    return blogsList.filter(blog => 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [blogsList, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <PageHero
        title="Blog"
        subtitle="Official announcements, events, achievements, and insights from Dr. Suvendu Das"
        theme="blog"
      />

      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="relative group shadow-sm rounded-xl hover:shadow-md transition-shadow">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
              <input 
                type="text"
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-700 font-medium"
              />
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((article, i) => {
                const targetRoute = [1, 2, 3].includes(article.id)
                  ? article.route
                  : `/blog/detail/${article.id}`;
                
                // Determine image mapping for backwards compatibility
                let imgSource = article.imageUrl;
                if (!imgSource) {
                  if (article.title === 'MASK') imgSource = "/blog_img/mask.png";
                  else if (article.title === 'CURING CORPORATE DISEASES') imgSource = "/blog_img/curingcorporatediseases.png";
                  else if (article.title === 'Akāḷa Kuṣmāṇḍa (ଅକାଳ କୁଷ୍ମାଣ୍ଡ, ଅକାଳ କୁଷ୍ମାଣ୍ଡ)') imgSource = "/blog_img/akalakusumba.png";
                  else imgSource = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop";
                }

                return (
                  <AnimatedSection key={article.id} delay={i * 0.1}>
                    <Link to={targetRoute} className="block h-full group">
                      <div className="bg-white rounded-[1.25rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5">
                        
                        {/* Top Image Section */}
                        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                          <img 
                            src={imgSource} 
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                          />
                          {/* Floating Badge (Category) */}
                          <div className="absolute top-4 left-4 z-10 bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                            {article.category || "LATEST UPDATES"}
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6 md:p-8 flex-1 flex flex-col">
                          {/* Date and Author */}
                          <div className="flex items-center gap-3 text-slate-500 mb-4 pb-4 border-b border-slate-100">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3.5 h-3.5 text-primary" />
                              <span className="text-[11px] font-bold uppercase tracking-wider">{article.date || "4th Jan 2026"}</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-slate-300" />
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[9px] font-bold text-primary overflow-hidden">
                                {article.author === "Dr. Suvendu Das" ? (
                                  <img src="/founder/image.png" alt="Dr. Suvendu Das" className="w-full h-full object-cover" />
                                ) : (
                                  article.author.split(" ").map((n: string) => n[0]).join("")
                                )}
                              </div>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">{article.author}</span>
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="font-sans font-bold text-lg md:text-xl text-slate-900 leading-snug mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>

                          {/* Summary */}
                          <p className="text-sm text-slate-600 leading-relaxed font-medium line-clamp-3 mb-8">
                            {article.summary}
                          </p>

                          {/* Button pinned to bottom */}
                          <div className="mt-auto">
                            <button className="bg-primary hover:bg-primary/90 text-white text-xs font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 group-hover:gap-3">
                              Read More
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                      </div>
                    </Link>
                  </AnimatedSection>
                );
              })
            ) : (
              <div className="col-span-full py-20 text-center text-slate-500 font-medium">
                No blog posts found matching your search.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
