import { articles } from "../articles";
import { Action, Kicker } from "../ui";

export default function Articles() {
  return <section id="artigos" className="articles" aria-labelledby="articles-title">
    <div className="wrap">
      <div className="section-copy"><Kicker>Conhecimento técnico</Kicker><h2 id="articles-title">Iluminação na prática.</h2></div>
      <div className="article-grid">{articles.map(({ slug, label, title, description }) => <article className="article-card interactive-card" key={slug}>
        <p className="article-label">{label}</p><h3>{title}</h3><p>{description}</p>
        <Action href={`/artigos/${slug}`} variant="dark">Ler artigo</Action>
      </article>)}</div>
    </div>
  </section>;
}
