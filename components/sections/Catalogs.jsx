import { Kicker } from "../ui";

const catalogs = [
  { id: "petro", title: "Modulares Petro" },
  { id: "projetores", title: "Projetores" },
  { id: "industriais", title: "Modulares Industriais" },
  { id: "publica", title: "Iluminação Pública" },
  { id: "comerciais", title: "Iluminação Comercial" }
];

export default function Catalogs() {
  return <section className="catalogs" id="catalogos" aria-labelledby="catalogs-title">
    <div className="wrap">
      <div className="section-copy">
        <Kicker>Catálogos de produtos</Kicker>
        <h2 id="catalogs-title">Consulte nossas linhas de iluminação.</h2>
        <p>Veja os modelos e as especificações técnicas de cada linha ou baixe o PDF para consultar depois.</p>
      </div>
      <ul className="catalog-grid">{catalogs.map(({ id, title }) => {
        const pdf = `/catalogos/enerlight-${id}.pdf`;
        return <li key={id} className="catalog-card">
          <img src={`/images/catalogos/${id}.webp`} alt="" width="215" height="300" loading="lazy" />
          <div className="catalog-copy">
            <h3>{title}</h3>
            <div className="catalog-actions">
              <a className="action action--dark" href={pdf} target="_blank" rel="noopener" aria-label={`Ver catálogo ${title} online, em nova aba`}>Ver online</a>
              <a className="action action--yellow" href={pdf} download aria-label={`Baixar PDF de ${title}`}>Baixar PDF</a>
            </div>
          </div>
        </li>;
      })}</ul>
    </div>
  </section>;
}
