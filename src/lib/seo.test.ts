import { describe, expect, it } from "vitest";
import { absoluteUrl, isoDate, jsonLd, plainDescription } from "./seo";

describe("search metadata", () => {
  it("preserves publication dates independently of the visitor's time zone", () => {
    expect(isoDate("September 15, 2026")).toBe("2026-09-15");
    expect(isoDate("January 1, 2026")).toBe("2026-01-01");
    expect(isoDate("2025-12-15")).toBe("2025-12-15");
  });
  it("keeps structured data inside its script element", () => {
    const value = { headline: "A </script><script>alert(1)</script> example" };
    const serialized = jsonLd(value);
    expect(serialized).not.toContain("</script>");
    expect(JSON.parse(serialized)).toEqual(value);
  });
  it("formats readable descriptions and absolute sharing URLs", () => {
    expect(plainDescription("<p>Learn   <b>math</b> together.</p>")).toBe("Learn math together.");
    expect(plainDescription("A useful learning description. ".repeat(20)).length).toBeLessThanOrEqual(170);
    expect(absoluteUrl("/blogs/example")).toBe("https://www.ritetutor.com/blogs/example");
  });
});
