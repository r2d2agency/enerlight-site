import { Arrow, Kicker } from "../ui";

export const segments = [
  ["postos", "Postos de Combustíveis", "Iluminação para pistas de abastecimento, marquises e lojas de conveniência."],
  ["industrias", "Indústrias", "Projetos para galpões, áreas produtivas, centros de distribuição e pátios."],
  ["supermercados", "Supermercados", "Iluminação para corredores, áreas de venda e estoques."],
  ["publica", "Iluminação Pública", "Soluções para vias, praças e espaços públicos."],
  ["concessionarias", "Concessionárias", "Iluminação para showrooms, oficinas e áreas externas."]
];

export default function Segments() {
  return <section className="segments" id="segmentos" aria-labelledby="segments-title">
    <div className="wrap segments-layout">
      <div className="section-copy">
        <Kicker>Segmentos atendidos</Kicker>
        <h2 id="segments-title">Soluções para cada mercado.</h2>
        <p>Projetos e produtos desenvolvidos para atender às necessidades e desafios de diferentes ambientes.</p>
        <a className="action action--outline" href="#mercados">Explorar segmentos <Arrow /></a>
      </div>
      <div className="market-grid" id="mercados" tabIndex={-1}>{segments.map(([id, title, description]) => <details key={id} id={`segmento-${id}`} name="mercado" className="market">
        <summary style={{ "--market-photo": `url(/images/${id}.webp)` }}><span>{title}</span><i><Arrow /></i></summary>
        <div className="market-detail"><p>{description}</p><a href={id === "postos" ? "/segmentos/petro" : "#contato"}>{id === "postos" ? "Conhecer a Linha Petro" : "Conversar sobre meu projeto"} <Arrow /></a></div>
      </details>)}</div>
    </div>
  </section>;
}
