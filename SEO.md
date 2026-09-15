# Rite Tutor: SEO implementation and launch

## What this release changes

- Generates complete HTML for the homepage, public information pages, all 18 articles, two new tutoring pages, and every verified, published course. The current catalog produces **39 indexable URLs**.
- Gives each URL its own title, description, canonical URL, Open Graph tags, Twitter card, and structured data. Organization, website, article, course, service, and breadcrumb markup describe real page content.
- Uses the consistent brand names **Rite Tutor** and **RiteTutor**, and the canonical origin `https://www.ritetutor.com`.
- Adds an all-subjects/grades page and one substantial Bloomington/Indiana page. Both explain that lessons are **online only**. Nearby towns are service audiences, not claimed office locations.
- Generates `sitemap.xml` and includes it in `robots.txt`. No invented update dates, ratings, office addresses, or social account identities are included.
- Adds Apache rules for extensionless pages, legacy `/blog` redirects, and genuine 404 responses. Confirmation URLs stay outside the sitemap and carry noindex metadata.
- Splits browser code by page, fixes font loading, and replaces 17 blog PNGs with WebP images: approximately **22.7 MB down to 1.84 MB**, preserving their dimensions.
- Adds GTM data-layer events for successful leads, phone/email clicks, and PDF downloads. These custom events contain labels and course IDs, not parent/child contact details or confirmation tokens.

## Build and maintenance

```sh
npm ci
npm run build
npm run check:seo
npm test
```

`npm run build` fetches the public course catalog, filters verified/published records, builds browser and server bundles, and renders static HTML into `dist`. It fails if the catalog cannot be refreshed, rather than silently deploying incomplete course pages. It strips unused fields, including author email addresses, from the embedded course data. No schedules, booking requests, or private account APIs are fetched during the build.

**Rebuild and deploy when a course is added, edited, or unpublished.** Browser views refresh live course data, but the static HTML and sitemap remain the deployment snapshot. CI performs the SEO checks before deployment. `SEO_COURSES_FILE` can point to a controlled catalog fixture for local testing; do not use a stale fixture in production. `VITE_API_BASE_URL` remains supported.

The browser uses lazy page imports; server builds use `src/route-pages.server.ts` so rendering never stops at a loading screen. Add future public routes to both route exports and `pageMetadata`, or to the appropriate dynamic route generator, and run the checks.

## Deployment checks on EC2 / Apache

The existing GitHub workflow deploys `dist`, including the generated `.htaccess`. The Apache virtual host must permit the directives used in that file (`Options -MultiViews`, `DirectoryIndex`, `ErrorDocument`, `mod_rewrite`, and optional `mod_headers`). Confirm the applicable `AllowOverride` permissions or place the equivalent rules in the virtual host. A parent catch-all SPA rewrite must not override these routes. Preserve existing backend/API and login routing.

After deployment, check these responses with the production hostname:

| Request | Expected result |
| --- | --- |
| `/` | 200, homepage heading and copy in View Source |
| `/online-tutoring-bloomington-indiana` | 200, local tutoring content in View Source |
| `/courses/22` (while public) | 200, Python Quest content without waiting for the API |
| `/blogs/choose-online-tutor-parent-checklist` | 200, full article and correct sharing image |
| `/blog` | 301 to `/blogs` |
| `/blog/choose-online-tutor-parent-checklist` | 301 to the `/blogs/` URL |
| `/courses/22.html` | 301 to `/courses/22` |
| `/this-page-does-not-exist` | **404**, not a homepage with status 200 |
| `/sitemap.xml` | 200, XML containing only public canonical pages |
| `/downloads/online-tutor-parent-scorecard.pdf` | 200, PDF |
| `/thank-you/example` | Client confirmation page with noindex |

The local Vite preview is not Apache and does not execute `.htaccess`; production HTTP redirects and status codes must be verified on Apache. Confirm the existing HTTPS and preferred-host redirects at the virtual-host/load-balancer level. Keep backend requests working when configuring the non-www to www redirect. Both hostname variants currently accept browser requests to the course API; localhost is not an allowed API origin. The browser verification used a read-only local API proxy for that reason.

Check that the CDN/firewall permits intended search crawlers, CSS, JavaScript, images, and public pages. `robots.txt` by itself cannot override a server or firewall block. Run PageSpeed Insights after deployment for real device/network measurements; local asset reductions are not a measured Core Web Vitals score.

## Google Search Console: existing account

1. In the property's **Sitemaps** screen, submit `https://www.ritetutor.com/sitemap.xml`.
2. Use URL Inspection / Test Live URL on the homepage, both new tutoring pages, one course, and one new blog. Check the rendered content and selected canonical, then request indexing for those priority pages.
3. Review Page Indexing, HTTPS, Core Web Vitals, Manual Actions, and Security Issues. Correct reported problems; do not resubmit unchanged URLs repeatedly.
4. Track impressions, clicks, click-through rate, and leads for four query groups: brand (`Rite Tutor`, `RiteTutor`); local (`online tutor Bloomington Indiana`, local math/coding searches); subject/course (`Python classes for kids`, algebra tutoring); and parent questions addressed by the articles.
5. Compare results over meaningful periods after Google recrawls. Track qualified inquiries and enrollment outcomes alongside search traffic. Broader terms such as `rite` have multiple meanings and cannot be exclusively controlled by a tutoring website.

The repository does not provide access to Search Console. This release prepares its inputs; it does not claim to submit the sitemap or request indexing inside the account.

## Lead measurement in the existing GTM container

Configure a GA4 event tag and custom-event triggers in the existing container. Keep the site's existing consent choices respected.

| Data-layer event | When it fires | Parameters |
| --- | --- | --- |
| `generate_lead` | Successful strategy-call API response | `lead_type: strategy_call`, `page_path` |
| `generate_lead` | Successful demo-booking API response | `lead_type: course_demo`, `course_id`, `page_path` |
| `contact_click` | Phone or email link clicked | `contact_method`, `page_path` |
| `resource_download` | Printable PDF link clicked | `resource`, `page_path` |

Mark `generate_lead` as a GA4 key event after confirming it fires once per successful submission. A phone click or PDF click is an intent signal, not a confirmed lead. Test using GTM Preview with a controlled test submission; do not send student names, email addresses, phone numbers, form text, or full confirmation URLs as event parameters. These tags/triggers still require configuration in the GTM/GA4 account; code alone does not publish them.

## Local, AI, and social search

**Google Business Profile:** Rite Tutor was confirmed to be online-only. Google excludes online-only businesses from Business Profile eligibility. Do not create a fake Bloomington classroom, virtual-office listing, or service-area listing that implies in-person contact. The local landing page addresses Bloomington families honestly through organic search. [Google's eligibility rules](https://support.google.com/business/answer/13763036)

**AI search:** Google's AI Overviews and AI Mode use the same SEO fundamentals: crawlable content, helpful answers, internal links, accurate markup, and an indexable page. There is no required AI text file or special schema that guarantees inclusion. The HTML, FAQs, course details, and parent guides improve the available source material; inclusion is still the search provider's decision. [Google's AI guidance](https://developers.google.com/search/docs/appearance/ai-features)

**Bing and other discovery:** Verify the site in Bing Webmaster Tools and submit the same sitemap. Keep any real social profiles consistently named Rite Tutor and link them to the canonical website. Sharing previews now work without depending on JavaScript. Add social profile URLs to `sameAs` only after confirming the actual official accounts; no guessed handles were added.

## Content that needs ongoing owner input

- Add named tutor biographies, subject expertise, teaching experience, and original example lessons where those facts can be verified.
- Expand science, English, or other subject pages only when you can provide real curriculum coverage, learning examples, tutor availability, and parent FAQs. Avoid many near-identical town or subject pages.
- Verify existing testimonials, student stories, outcome statistics, and credential claims before treating them as evidence. The former aggregate-rating markup was removed because supporting review evidence was not available in the repository.
- Supply approved privacy and terms pages. The previous footer linked to routes that do not exist; this release replaces those broken links with working resources rather than inventing policy text.
- Publish useful follow-ups to the supplied articles, link related courses and resources, and update information when the service changes. Build genuine referrals, reviews, and relevant local/community mentions through actual relationships.

SEO improves eligibility and relevance; it cannot promise first position for every query, platform, location, or date. [Google Search Essentials](https://developers.google.com/search/docs/essentials) and [site-name guidance](https://developers.google.com/search/docs/appearance/site-names) describe the parts a site owner can influence.
