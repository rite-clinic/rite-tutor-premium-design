import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ContactCTA } from "@/contexts/ContactModalContext";
import { ArrowLeft, ArrowRight, Calendar, Clock, Download, Phone } from "lucide-react";
import { getPostBySlug, getRelatedPosts } from "@/data/blogData";
import { BlogContent } from "@/components/BlogContent";
import { isoDate } from "@/lib/seo";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : null;

  if (!post) {
    return <Navigate to="/blogs" replace />;
  }

  const related = getRelatedPosts(post.slug, 3);


  return (
    <>
<Layout>
        <article>
          {/* Banner */}
          <section className="relative bg-card pt-12 pb-8">
            <div className="container-wide">
              <motion.div
                className="max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Link
                  to="/blogs"
                  className="inline-flex items-center gap-2 text-primary font-medium mb-6 hover:gap-3 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Blog
                </Link>
                <span className="inline-block px-3 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary mb-4">
                  {post.category}
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 leading-tight">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span>By <Link to="/about-us" className="underline underline-offset-4">Rite Tutor</Link></span>
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> <time dateTime={isoDate(post.date)}>{post.date}</time></span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime}</span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Featured image */}
          <section className="bg-card pb-12">
            <div className="container-wide">
              <motion.div
                className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-premium-lg"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img src={post.image} alt={post.imageAlt} className="w-full aspect-[16/9] object-cover" />
              </motion.div>
            </div>
          </section>

          {/* Body */}
          <section className="py-12 bg-background">
            <div className="container-wide">
              <motion.div
                className="max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <BlogContent content={post.content} />
                {post.download && (
                  <aside aria-label="Free printable resource" className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8">
                    <p className="text-sm font-semibold text-muted-foreground mb-2">Free printable PDF · 2 pages</p>
                    <h2 className="text-2xl font-display font-bold mb-3">{post.download.title}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-5">{post.download.description}</p>
                    <Button variant="hero" size="lg" asChild>
                      <a href={post.download.href} download>
                        <Download className="w-4 h-4" aria-hidden="true" /> Download PDF
                      </a>
                    </Button>
                  </aside>
                )}
              </motion.div>
            </div>
          </section>

          {/* Related posts */}
          {related.length > 0 && (
            <section className="py-16 bg-card">
              <div className="container-wide">
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 text-center">
                    Related <span className="text-primary">Articles</span>
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {related.map((p, i) => (
                      <motion.article
                        key={p.slug}
                        className="bg-background rounded-2xl overflow-hidden border border-border shadow-lg hover:shadow-premium transition-all duration-300 hover:-translate-y-1 flex flex-col"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link to={`/blogs/${p.slug}`} className="aspect-[16/10] overflow-hidden">
                          <img
                            src={p.image}
                            alt={p.imageAlt}
                            loading="lazy"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </Link>
                        <div className="p-5 flex-1 flex flex-col">
                          <span className="inline-block px-2 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary self-start mb-2">
                            {p.category}
                          </span>
                          <h3 className="font-display font-bold mb-2 line-clamp-2">
                            <Link to={`/blogs/${p.slug}`} className="hover:text-primary transition-colors">
                              {p.title}
                            </Link>
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">{p.excerpt}</p>
                          <Link
                            to={`/blogs/${p.slug}`}
                            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all text-sm"
                          >
                            Read More <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </motion.article>
                    ))}
                  </div>

                  <div className="text-center mt-10">
                    <Button variant="hero-outline" size="lg" asChild>
                      <Link to="/blogs">View All Articles</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="py-16 bg-primary">
            <div className="container-wide">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 text-primary-foreground">
                  Ready to Start Your Child's Journey?
                </h2>
                <p className="text-primary-foreground/80 mb-6">
                  Book a free 30-minute strategy call to discuss your child's potential.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <ContactCTA variant="premium" size="lg">Book Free Strategy Call</ContactCTA>
                  <Button variant="premium" size="lg" asChild>
                    <a href="tel:+19294218055" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" /> +1 (929) 421-8055
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </article>
      </Layout>
    </>
  );
};

export default BlogPost;
