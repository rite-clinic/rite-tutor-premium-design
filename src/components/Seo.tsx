import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { getPostBySlug, blogPosts } from "@/data/blogData";
import { usePrerenderData } from "@/contexts/PrerenderContext";
import { absoluteUrl, isoDate, jsonLd, ORGANIZATION_ID, organizationSchema, pageMetadata, plainDescription, WEBSITE_ID, websiteSchema } from "@/lib/seo";

type SeoProps = {
  title: string; description: string; path: string; image?: string; imageAlt?: string;
  noindex?: boolean; articleDate?: string; schemas?: Record<string, unknown>[];
  breadcrumbs?: { name: string; path: string }[];
};

export function Seo({ title, description, path, image = "/og-image.png", imageAlt = "Rite Tutor", noindex = false, articleDate, schemas = [], breadcrumbs = [] }: SeoProps) {
  const url = absoluteUrl(path);
  const graph: Record<string, unknown>[] = [organizationSchema, websiteSchema, ...schemas];
  if (breadcrumbs.length) graph.push({ "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`, itemListElement: breadcrumbs.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: absoluteUrl(item.path) })) });
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={plainDescription(description)} />
      <meta name="robots" content={noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      <link rel="canonical" href={url} />
      <meta property="og:site_name" content="Rite Tutor" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={plainDescription(description)} />
      <meta property="og:type" content={articleDate ? "article" : "website"} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={absoluteUrl(image)} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={plainDescription(description)} />
      <meta name="twitter:image" content={absoluteUrl(image)} />
      <meta name="twitter:image:alt" content={imageAlt} />
      {articleDate && <meta property="article:published_time" content={articleDate} />}
      <script type="application/ld+json">{jsonLd({ "@context": "https://schema.org", "@graph": graph })}</script>
    </Helmet>
  );
}

export function SiteSeo() {
  const { pathname } = useLocation();
  const { courses = [] } = usePrerenderData();
  const path = pathname.replace(/\/$/, "") || "/";
  if (/^\/courses\/[^/]+$/.test(path)) return null;
  if (path.startsWith("/thank-you")) return <Seo title="Thank You | Rite Tutor" description="Thank you for contacting Rite Tutor." path="/contact" noindex />;
  const post = path.startsWith("/blogs/") ? getPostBySlug(path.slice(7)) : undefined;
  if (post) {
    const date = isoDate(post.date);
    return <Seo title={`${post.title} | Rite Tutor`} description={post.excerpt} path={`/blogs/${post.slug}`} image={post.image} imageAlt={post.imageAlt} articleDate={date}
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blogs" }, { name: post.title, path }]}
      schemas={[{ "@type": "BlogPosting", "@id": `${absoluteUrl(path)}#article`, headline: post.title, description: post.excerpt, datePublished: date, image: absoluteUrl(post.image), author: { "@id": ORGANIZATION_ID }, publisher: { "@id": ORGANIZATION_ID }, mainEntityOfPage: absoluteUrl(path), inLanguage: "en", articleSection: post.category }]} />;
  }
  const metadata = pageMetadata[path];
  if (!metadata) return <Seo title="Page Not Found | Rite Tutor" description="Find online tutoring, courses, and parent resources at Rite Tutor." path={path} noindex />;
  const schemas: Record<string, unknown>[] = [{ "@type": path === "/blogs" ? "Blog" : path === "/contact" ? "ContactPage" : path === "/about-us" ? "AboutPage" : "WebPage", "@id": `${absoluteUrl(path)}#webpage`, url: absoluteUrl(path), name: metadata.title, description: metadata.description, isPartOf: { "@id": WEBSITE_ID }, about: { "@id": ORGANIZATION_ID }, inLanguage: "en" }];
  if (path === "/blogs") schemas.push({ "@type": "ItemList", itemListElement: blogPosts.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(`/blogs/${p.slug}`), name: p.title })) });
  if (path === "/courses" && courses.length) schemas.push({ "@type": "ItemList", itemListElement: courses.map((course, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "Course", name: course.title, description: course.subtitle || course.intro || course.title, url: absoluteUrl(`/courses/${course.id}`), provider: { "@id": ORGANIZATION_ID } } })) });
  if (["/", "/online-tutoring-all-subjects", "/online-tutoring-bloomington-indiana"].includes(path)) schemas.push({ "@type": "Service", serviceType: "One-to-one online tutoring", name: "Rite Tutor online tutoring", provider: { "@id": ORGANIZATION_ID }, url: absoluteUrl(path), description: metadata.description, areaServed: path.includes("bloomington") ? { "@type": "AdministrativeArea", name: "Indiana" } : { "@type": "Place", name: "Worldwide" }, availableChannel: { "@type": "ServiceChannel", serviceUrl: absoluteUrl("/contact") } });
  return <Seo {...metadata} path={path} schemas={schemas} breadcrumbs={path === "/" ? [] : [{ name: "Home", path: "/" }, { name: metadata.label, path }]} />;
}
