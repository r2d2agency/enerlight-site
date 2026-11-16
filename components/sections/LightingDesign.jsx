import { Action, Kicker } from "../ui";

export default function LightingDesign() {
  return <section className="lighting-design band" id="projeto-luminotecnico" aria-labelledby="design-title">
    <div className="wrap feature-layout">
      <div className="section-copy">
        <Kicker>Projeto luminotécnico</Kicker>
        <h2 id="design-title">A iluminação certa para cada área do seu negócio.</h2>
        <p>Desenvolvemos o projeto luminotécnico considerando as dimensões do espaço, a altura de instalação e o uso de cada área. A equipe define quais luminárias usar, quantas são necessárias e onde posicioná-las.</p>
        <Action href="/contato?assunto=projeto">Solicitar projeto luminotécnico</Action>
      </div>
      <img className="feature-photo" src="/images/projeto-luminotecnico.webp" alt="Ilustração de uma engenheira em polo branca analisando um mapa de iluminância em cores no computador" width="640" height="380" loading="lazy" />
    </div>
  </section>;
}
