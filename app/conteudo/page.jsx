import { Action } from "../../components/ui";

import { pageMeta } from "../../lib/seo";

export const metadata = pageMeta({
  title: "Catálogos, projetos e conteúdo técnico | Enerlight",
  description: "Acesse os catálogos das linhas de luminárias LED, conheça projetos realizados e fale com a equipe técnica da Enerlight.",
  path: "/conteudo"
});

export default function ContentPage() {
  return <main className="wrap inner-page">
    <a className="action action--dark" href="/">Voltar para a home</a>
    <h1>Conteúdo Enerlight</h1>
    <section id="luminarias">
      <h2>Linhas de luminárias</h2>
      <p>Consulte os catálogos das linhas para postos, indústrias, vias públicas, projetores e aplicações comerciais.</p>
      <Action href="/#catalogos">Abrir catálogos</Action>
    </section>
    <section id="projetos">
      <h2>Projetos realizados</h2>
      <p>Conheça aplicações em postos de combustíveis, lojas de conveniência, galpões e estádios.</p>
      <Action href="https://enerlight.com.br/#projetos">Ver projetos da Enerlight</Action>
    </section>
    <section id="enerlight">
      <h2>Conheça a Enerlight</h2>
      <p>A Enerlight desenvolve e fabrica soluções em iluminação LED para empresas e espaços públicos. A equipe técnica pode orientar a escolha da luminária para cada ambiente.</p>
      <Action href="/contato">Conversar com um especialista</Action>
    </section>
  </main>;
}
