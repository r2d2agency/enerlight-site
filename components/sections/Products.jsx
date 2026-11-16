import { Action, Kicker } from "../ui";

const highlights = [
  { id: "petro-e100", name: "Petro E100", category: "Linha Petro", description: "Luminária para forro de postos e lojas de conveniência.", pdf: "petro" },
  { id: "proj-e100", name: "Proj E100", category: "Linha Projetores", description: "Projetor LED para aplicações esportivas e áreas comuns.", pdf: "projetores" },
  { id: "lpv-st60", name: "LPV ST60", category: "Linha Pública", description: "Luminária LED para projetos de iluminação viária.", pdf: "publica" }
];

export default function Products() {
  return <section className="products band" id="produtos" aria-labelledby="products-title">
    <div className="wrap products-inner">
      <div className="section-copy">
        <Kicker>Tecnologia e performance</Kicker>
        <h2 id="products-title">Produtos desenvolvidos para grandes desafios.</h2>
        <p>Utilizamos LEDs OSRAM e drivers Philips em modelos de nossas linhas, com componentes selecionados para oferecer qualidade e confiabilidade.</p>
        <Action href="#catalogos">Conheça nossas linhas</Action>
      </div>
      <img className="product-photo" src="/images/luminaria.webp" alt="Luminária LED industrial Enerlight" width="700" height="420" loading="lazy" />
    </div>
    <div className="featured-products">
      <div className="wrap">
        <div className="section-copy"><Kicker>Conheça os modelos</Kicker><h2>Luminárias em destaque.</h2></div>
        <div className="product-grid">{highlights.map(({ id, name, category, description, pdf }) => <article className="featured-product interactive-card" key={id}>
          <div className="featured-product-media"><img src={`/images/produtos/${id}.webp`} alt={`Luminária Enerlight ${name}`} width="360" height="210" loading="lazy" /></div>
          <div className="featured-product-copy"><p className="article-label">{category}</p><h3>{name}</h3><p>{description}</p>
          <Action href={`/catalogos/enerlight-${pdf}.pdf#page=3`} variant="dark">Ver especificações</Action></div>
        </article>)}</div>
      </div>
    </div>
  </section>;
}
