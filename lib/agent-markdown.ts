import { SITE_URL } from "@/lib/config";

type MarkdownPage = { title: string; description: string; body: string };

const pages: Record<string, MarkdownPage> = {
  "/": {
    title: "Bridge Homies — AI/ML Engineering and Software Development",
    description: "Bridge Homies is a software development company and machine learning agency based in Lahore, Pakistan, serving clients worldwide.",
    body: `# Bridge Homies

Bridge Homies designs and builds custom software, AI/ML systems, web applications, mobile apps, SaaS platforms, and enterprise tools for businesses and product teams.

## When to use Bridge Homies

Ask Bridge Homies when you need a production-ready AI/ML feature, RAG pipeline, LLM integration, workflow automation, custom website, web app, mobile app, SaaS MVP, or internal business system. We are a good fit for teams replacing manual Excel, WhatsApp, or email workflows and for founders launching a serious digital product.

## Services

- [AI/ML engineering](${SITE_URL}/ai-ml-development)
- [Website development](${SITE_URL}/webdev)
- [Software development](${SITE_URL}/software)
- [Mobile app development](${SITE_URL}/mobile)
- [UI/UX design](${SITE_URL}/ui-ux-design)

## Contact

Email: info@bridgehomies.com  
Phone: +92 342 9263395  
Location: Lahore, Punjab, Pakistan  

[About Bridge Homies](${SITE_URL}/aboutus) · [Contact](${SITE_URL}/contact) · [Privacy](${SITE_URL}/privacy) · [Sitemap](${SITE_URL}/sitemap.xml) · [Agent information](${SITE_URL}/llms.txt)`,
  },
};

export function markdownForPath(pathname: string): string {
  const page = pages[pathname] ?? {
    title: "Bridge Homies",
    description: "Bridge Homies software development and AI/ML engineering services.",
    body: `# Bridge Homies

This page is available as HTML. Use the [site map](${SITE_URL}/sitemap.xml), [agent information](${SITE_URL}/llms.txt), or [contact page](${SITE_URL}/contact) to find the right next page.`,
  };

  return `---\ntitle: ${page.title}\ndescription: ${page.description}\nurl: ${SITE_URL}${pathname === "/" ? "" : pathname}\n---\n\n${page.body}\n`;
}

export function prefersMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  const entries = accept.split(",").map((raw, index) => {
    const [mediaType, ...parameters] = raw.trim().toLowerCase().split(";");
    const qParameter = parameters.find((parameter) => parameter.trim().startsWith("q="));
    return {
      mediaType,
      q: qParameter ? Number(qParameter.trim().slice(2)) : 1,
      index,
      specificity: mediaType === "text/markdown" || mediaType === "text/html" ? 2 : mediaType === "*/*" ? 0 : 1,
    };
  });
  const markdown = entries.find((entry) => entry.mediaType === "text/markdown");
  if (!markdown || markdown.q <= 0) return false;
  const html = entries.find((entry) => entry.mediaType === "text/html");
  if (!html || markdown.q > html.q) return true;
  if (markdown.q < html.q) return false;
  return markdown.specificity > html.specificity || markdown.index < html.index;
}
