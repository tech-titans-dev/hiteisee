import { useParams, Navigate, Link } from "react-router-dom";
import { PageHero } from "@/components/shared/PageHero";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { getBlogs } from "@/lib/adminData";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const blogs = getBlogs();
  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <PageHero
        title={blog.title}
        subtitle={`${blog.category} • Written by ${blog.author}`}
        theme="blog"
      />
      <section className="max-w-[1200px] mx-auto px-6 py-12 md:py-20">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blogs
        </Link>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Sidebar: Author Profile */}
          <div className="lg:col-span-3 lg:sticky lg:top-32 space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-primary/10 border-4 border-white shadow-lg mb-4 flex items-center justify-center text-2xl font-bold text-primary">
                {blog.author === "Dr. Suvendu Das" ? (
                  <img src="/founder/image.png" alt="Dr. Suvendu Das" className="w-full h-full object-cover" />
                ) : (
                  blog.author.split(" ").map(n => n[0]).join("")
                )}
              </div>
              <h3 className="font-bold text-slate-900 text-lg">{blog.author}</h3>
              <p className="text-xs text-primary font-bold uppercase tracking-widest mt-1 mb-4">Author</p>
              <div className="w-full h-px bg-slate-100 mb-4" />
              <p className="text-sm text-slate-500">
                Published on <br/>
                <span className="font-semibold text-slate-700">{blog.date}</span>
              </p>
              <p className="text-sm text-slate-500 mt-2">
                <span className="font-semibold text-slate-700">{blog.readTime}</span>
              </p>
            </div>
          </div>

          {/* Right Column: Content */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-9 prose lg:prose-xl prose-slate max-w-none bg-white p-8 md:p-12 rounded-2xl border border-slate-100 shadow-sm"
          >
            <h1 className="text-3xl md:text-5xl font-heading font-black text-foreground mb-8 leading-tight">
              {blog.title}
            </h1>
            
            {blog.imageUrl && (
              <img src={blog.imageUrl} alt={blog.title} className="w-full h-auto rounded-xl mb-10 object-cover max-h-[500px]" />
            )}

            <div className="text-lg text-slate-700 font-light leading-relaxed whitespace-pre-wrap">
              {blog.summary}
            </div>
          </motion.article>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
