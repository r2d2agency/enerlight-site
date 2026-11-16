import { Action, Kicker } from "../ui";

export default function About() {
  return <section className="about" id="quem-somos" aria-labelledby="about-title">
    <div className="about-photo" aria-hidden="true" />
    <div className="wrap about-inner">
      <div className="section-copy">
        <Kicker>Quem somos</Kicker>
        <h2 id="about-title">Mais que iluminação,<br />soluções que geram valor.</h2>
        <p>Desde 2018, a Enerlight desenvolve e fabrica soluções de iluminação LED com foco em eficiência, qualidade e inovação para ambientes que exigem alta performance.</p>
        <Action href="/conteudo#enerlight" variant="dark">Conheça a Enerlight</Action>
      </div>
    </div>
  </section>;
}
