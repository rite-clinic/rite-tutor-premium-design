import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { ContactCTA } from "@/contexts/ContactModalContext";
import { blogPosts } from "@/data/blogData";

const Blog = () => {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <>
      <Helmet>
        <title>Coding Education Blog | STEM Insights & Student Success | Rite Tutor</title>
        <meta
          name="description"
          content="Insights, stories, and breakthroughs from the Rite Tutor blog. Expert articles on coding education, logical thinking, student success stories, and practical guidance for parents."
        />
        <link rel="canonical" href="https://www.ritetutor.com/blogs" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Rite Tutor Blog",
            url: "https://www.ritetutor.com/blogs",
            blogPost: blogPosts.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              datePublished: p.date,
              image: p.image,
              url: `https://www.ritetutor.com/blogs/${p.slug}`,
            })),
          })}
        </script>
      </Helmet>

      <Layout>
        {/* Hero */}
        <section className="relative bg-card py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="container-wide">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Insights, Stories & <span className="text-primary">Breakthroughs</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-4">The Rite Tutor Blog</p>
              <p className="text-muted-foreground">
                Honest, experience-based perspectives on what actually works in personalized coding education — and what only sounds good in marketing.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 bg-background">
          <div className="container-wide">
            <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { label: "Educational Philosophy", desc: "Deep dives into skill-based progression" },
                { label: "Success Stories", desc: "Real transformations from our community" },
                { label: "Parent Guidance", desc: "Practical advice on evaluating programs" },
                { label: "Industry Insights", desc: "Trends in CS education and careers" },
              ].map((item) => (
                <div key={item.label} className="bg-card p-4 rounded-xl border border-border text-center">
                  <h3 className="font-semibold text-sm mb-1">{item.label}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured */}
        <section className="py-12 bg-background">
          <div className="container-wide">
            <motion.article
              className="grid md:grid-cols-2 gap-8 bg-card rounded-3xl overflow-hidden border border-border shadow-premium"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link to={`/blogs/${featured.slug}`} className="block overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <div className="p-6 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block px-3 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary">
                    Featured · {featured.category}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
                  <Link to={`/blogs/${featured.slug}`} className="hover:text-primary transition-colors">
                    {featured.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground mb-5">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{featured.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{featured.readTime}</span>
                </div>
                <Link
                  to={`/blogs/${featured.slug}`}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                >
                  Read Full Article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          </div>
        </section>

        {/* Grid */}
        <section className="py-16 bg-background">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((post, index) => (
                <motion.article
                  key={post.slug}
                  className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-premium transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 6) * 0.05 }}
                >
                  <Link to={`/blogs/${post.slug}`} className="block overflow-hidden aspect-[16/10]">
                    <img
                      src={post.image}
                      alt={post.imageAlt}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-block px-3 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-display font-bold mb-2 line-clamp-2">
                      <Link to={`/blogs/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />{post.readTime}
                      </span>
                      <Link
                        to={`/blogs/${post.slug}`}
                        className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all text-sm"
                      >
                        Read More <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container-wide">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-primary-foreground">
                Start Your Own Success Story
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Reading about transformations is inspiring. Creating one is life-changing. Your child's journey starts with conversation.
              </p>
              <ContactCTA variant="premium" size="xl" className="group">
                Book Your Free Strategy Call
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </ContactCTA>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Blog;
