import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { BlogContent } from "./BlogContent";
import { blogPosts, getPostBySlug, getRelatedPosts } from "@/data/blogData";
import { septemberBlogPosts } from "@/data/septemberBlogPosts";
import { ContactModalProvider } from "@/contexts/ContactModalContext";

describe("blog article content", () => {
  it("renders existing paragraphs and new headings, lists, links, and images", () => {
    render(
      <MemoryRouter>
        <ContactModalProvider>
        <BlogContent content={[
          "## Main section",
          "A **strong foundation** with *individual guidance*.",
          "### Supporting section",
          { type: "list", items: ["Ask **why**.", "Explore [Learning Pathways](/learning-pathways)."] },
          { type: "image", src: "/images/blogs/september-2026/blog-01-2.webp", alt: "Tutor evaluation criteria" },
          "Treat <script>alert('example')</script> as text.",
          "Get the [parent scorecard](/downloads/online-tutor-parent-scorecard.pdf).",
        ]} />
        </ContactModalProvider>
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { level: 2, name: "Main section" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Supporting section" })).toBeInTheDocument();
    expect(screen.getByText("strong foundation").tagName).toBe("STRONG");
    expect(screen.getByText("individual guidance").tagName).toBe("EM");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByRole("link", { name: "Learning Pathways" })).toHaveAttribute("href", "/learning-pathways");
    expect(screen.getByRole("button", { name: "parent scorecard" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "parent scorecard" })).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Tutor evaluation criteria" })).toHaveAttribute("loading", "lazy");
    expect(document.querySelector("script")).toBeNull();
    expect(screen.getByText("Treat <script>alert('example')</script> as text.")).toBeInTheDocument();
  });

  it("keeps all six imported articles reachable after the existing twelve", () => {
    expect(blogPosts).toHaveLength(18);
    expect(blogPosts.slice(12)).toEqual(septemberBlogPosts);
    expect(new Set(blogPosts.map((post) => post.slug)).size).toBe(blogPosts.length);
    for (const post of septemberBlogPosts) {
      expect(getPostBySlug(post.slug)).toBe(post);
      expect(getRelatedPosts(post.slug).every((related) => related.slug !== post.slug)).toBe(true);
    }
  });
});
