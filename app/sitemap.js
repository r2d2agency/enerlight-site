import { articles } from "../components/articles";
import { siteUrl } from "../lib/seo";

export default function sitemap() {
  const pages = [
    ["/", 1, "weekly"],
    ["/segmentos/petro", 0.9, "monthly"],
    ["/contato", 0.8, "yearly"],
    ["/universidade", 0.5, "monthly"],
    ["/conteudo", 0.4, "monthly"],
    ...articles.map(({ slug }) => [`/artigos/${slug}`, 0.6, "yearly"])
  ];
  return pages.map(([path, priority, changeFrequency]) => ({ url: `${siteUrl}${path}`, lastModified: new Date(), changeFrequency, priority }));
}
