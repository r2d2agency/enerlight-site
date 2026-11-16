import { notFound } from "next/navigation";
import { articles } from "../../../components/articles";
import { Action, Kicker } from "../../../components/ui";

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  return article ? { title: `${article.title} | Enerlight`, description: article.description } : {};
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();

  return <main className="wrap inner-page technical-article">
    <Action href="/#artigos" variant="dark" arrow={false}>Voltar aos artigos</Action>
    <article>
      <Kicker>{article.label}</Kicker><h1>{article.title}</h1>
      {article.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      <a className="article-source" href={article.source.href}>{article.source.label}</a>
    </article>
    <Action href="/contato?assunto=projeto">Fale com a equipe técnica</Action>
  </main>;
}
