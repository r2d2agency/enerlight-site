import { Action, Kicker } from "../ui";
import LumScroll from "../LumScroll/LumScroll";

export default function LightingDesign() {
  return <div className="lum-track">
    <section className="lighting-design band" id="projeto-luminotecnico" aria-labelledby="design-title">
      <div className="wrap feature-layout">
        <div className="section-copy">
          <Kicker>Projeto luminotécnico</Kicker>
          <h2 id="design-title">A iluminação certa para cada área do seu negócio.</h2>
          <p>Desenvolvemos o projeto luminotécnico considerando as dimensões do espaço, a altura de instalação e o uso de cada área. A equipe define quais luminárias usar, quantas são necessárias e onde posicioná-las.</p>
          <Action href="/contato?assunto=projeto">Solicitar projeto luminotécnico</Action>
        </div>
        <LumScroll alt="Engenheira desenvolvendo um projeto luminotécnico no computador: planta, mapa de iluminância e simulação 3D de um galpão iluminado" />
      </div>
    </section>
  </div>;
}
