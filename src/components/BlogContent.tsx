import { Link } from "react-router-dom";
import type { BlogContentBlock } from "@/data/blogData";

function InlineText({ text }: { text: string }) {
  const tokens = text.split(/(\[[^\]]+\]\(\/(?!\/)[^\s)]*\)|\*\*[^*]+\*\*|\*[^*]+\*)/g);

  return tokens.map((token, index) => {
    const link = token.match(/^\[([^\]]+)\]\((\/[^\s)]*)\)$/);
    if (link) {
      if (link[2].startsWith("/downloads/") && link[2].endsWith(".pdf")) {
        return (
          <a key={index} href={link[2]} download className="text-primary underline underline-offset-4 hover:text-foreground">
            {link[1]}
          </a>
        );
      }
      return (
        <Link key={index} to={link[2]} className="text-primary underline underline-offset-4 hover:text-foreground">
          {link[1]}
        </Link>
      );
    }
    if (token.startsWith("**") && token.endsWith("**")) {
      return <strong key={index} className="text-foreground font-semibold">{token.slice(2, -2)}</strong>;
    }
    if (token.startsWith("*") && token.endsWith("*")) {
      return <em key={index}>{token.slice(1, -1)}</em>;
    }
    return token;
  });
}

export function BlogContent({ content }: { content: BlogContentBlock[] }) {
  return content.map((block, index) => {
    if (typeof block !== "string") {
      if (block.type === "image") {
        return (
          <figure key={index} className="my-10 overflow-hidden rounded-2xl border border-border bg-card">
            <img src={block.src} alt={block.alt} loading="lazy" decoding="async" width={1672} height={941} className="w-full h-auto" />
          </figure>
        );
      }
      const List = block.ordered ? "ol" : "ul";
      return (
        <List key={index} className={`${block.ordered ? "list-decimal" : "list-disc"} pl-6 mb-6 space-y-3 text-base md:text-lg text-muted-foreground leading-relaxed marker:text-primary`}>
          {block.items.map((item, itemIndex) => <li key={itemIndex}><InlineText text={item} /></li>)}
        </List>
      );
    }
    if (block.startsWith("### ")) {
      return <h3 key={index} className="text-xl md:text-2xl font-display font-bold mt-8 mb-4 text-foreground">{block.slice(4)}</h3>;
    }
    if (block.startsWith("## ")) {
      return <h2 key={index} className="text-2xl md:text-3xl font-display font-bold mt-12 mb-4 text-foreground">{block.slice(3)}</h2>;
    }
    return (
      <p key={index} className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5">
        <InlineText text={block} />
      </p>
    );
  });
}
