import Header from "../../../components/sections/Header";
import Hero from "../../../components/sections/Hero";
import PetroPrime from "../../../components/sections/PetroPrime";
import Reveal from "../../../components/Reveal";
import Contact from "../../../components/sections/Contact";
import { Action, Kicker } from "../../../components/ui";

export const metadata = { title: "Linha Petro | Enerlight", description: "Luminárias LED e projetos luminotécnicos para postos de combustíveis, marquises e lojas de conveniência." };

const networks = [
  ["Shell", "shell-2.jpg"], ["Petronas"], ["ALE", "ale.png"],
  ["Ipiranga", "ipiranga.png"], ["TotalEnergies", "totalenergies.jpg"], ["Rede Graal"], ["BR", "br.png"]
];
const areas = [
  ["pista", "Pista", "Marquises e áreas de abastecimento."],
  ["conveniencia", "Conveniência", "Gôndolas, circulação e balcões de atendimento."],
  ["patio", "Pátio", "Acessos, circulação e áreas de manobra."],
  ["estacionamento", "Estacionamento", "Vagas, rotas de pedestres e acessos à loja."]
];
const headlines = [
  ["Uma pista bem iluminada", "desde a chegada."],
  ["Uma conveniência que", "convida a entrar."],
  ["Mais visibilidade", "nas áreas de manobra."],
  ["Estacionamento iluminado", "até a entrada da loja."]
];

const petroSlides = areas.map(([id, title, description], index) => ({
  title, description, category: "Áreas do posto", illustrative: true,
  photo: `/images/petro/${id}.webp`, position: "center 52%",
  headline: headlines[index][0], accent: headlines[index][1],
  href: `#petro-area-${id}`, target: `https://wa.me/551733539050?text=${encodeURIComponent("Olá, equipe Enerlight! Quero um orçamento da Linha Petro para " + title.toLowerCase() + ".\nCidade/UF:\nBandeira do posto:\nPosto novo ou retrofit:")}`,
  cta: `Solicitar projeto para ${title.toLowerCase()}`
}));

const cases = [
  ["Posto Itagua", "Iluminação da loja de conveniência Shell Select."],
  ["Posto Big", "Projeto de iluminação completa do posto."]
];
const products = [
  ["Petro E100", "100 W", "13.380 lm", 3],
  ["Petro Power 150", "150 W", "24.220 lm", 5],
  ["Petro Ultra 150", "150 W", "19.400 lm", 7]
];
const brief = "Olá, equipe Enerlight! Quero um orçamento para a Linha Petro.\nCidade/UF:\nBandeira do posto:\nPosto novo ou retrofit:\nÁreas a iluminar:";
const quoteUrl = `https://wa.me/551733539050?text=${encodeURIComponent(brief)}`;

const questions = [
  ["Posso aproveitar o forro e os pontos existentes?", "A equipe avalia as aberturas, as fixações e a posição dos pontos atuais antes de indicar se podem ser aproveitados. Envie fotos da marquise e as medidas das aberturas, se tiver."],
  ["Como escolher a luminária para cada área?", "A escolha depende da altura de instalação, das dimensões e do uso de cada área. A pista, a conveniência, o pátio e o estacionamento têm necessidades diferentes."],
  ["Quais modelos têm cinco anos de garantia?", "A ficha da Petro Prime 150 New informa cinco anos de garantia. Para os demais modelos, confira a ficha técnica e as condições aplicáveis."],
  ["Como consulto a homologação da minha bandeira?", "Informe a bandeira à equipe comercial. A Enerlight pode orientar sobre a homologação e os requisitos de iluminação aplicáveis ao seu projeto."]
];

const catalog = "/catalogos/enerlight-petro.pdf";

export default function PetroPage() {
  return <>
    <Header homePath="/" />
    <main id="inicio" className="petro-page">
      <Hero slides={petroSlides} petro />
      <section className="petro-proof" aria-label="Diferenciais da Linha Petro">
        <div className="wrap petro-metrics">
          <div><strong>5 anos</strong><span>de garantia nos modelos indicados</span></div>
          <div><strong>102.000 h</strong><span>de expectativa de vida útil*</span></div>
          <div><strong>OSRAM + Philips</strong><span>LEDs e drivers da linha</span></div>
        </div>
        <p className="wrap petro-note">*Dados do catálogo Petro. Consulte a ficha e as condições de garantia do modelo escolhido.</p>
      </section>
      <PetroPrime />
      <section id="petro-areas" className="wrap petro-areas" aria-labelledby="petro-areas-title">
        <Kicker>Onde atuamos</Kicker>
        <h2 id="petro-areas-title">Iluminação em cada área do posto.</h2>
        <div className="petro-area-grid">{areas.map(([image, name, description]) => <article key={image} id={`petro-area-${image}`} className="petro-area">
          <img src={`/images/petro/${image}.webp`} alt="" width="750" height="500" loading="lazy" />
          <h3>{name}</h3><p>{description}</p>
        </article>)}</div>
      </section>
      <section className="wrap petro-section" aria-labelledby="petro-scenarios">
        <Kicker>Projeto luminotécnico</Kicker>
        <h2 id="petro-scenarios">Posto novo ou retrofit?</h2>
        <div className="petro-scenarios">
          <article><h3>Posto novo</h3><p>Com a planta e o layout, a equipe avalia a altura de montagem, o uso de cada área e a distribuição dos pontos de luz.</p></article>
          <article><h3>Retrofit</h3><p>Em um posto em operação, a avaliação começa pelo forro, pelas luminárias atuais e pelos pontos de instalação para identificar o que pode ser aproveitado.</p></article>
        </div>
        <p className="petro-project-note">Na avaliação, a equipe orienta a escolha, a quantidade e o posicionamento das luminárias. Consulte a disponibilidade de simulação de iluminância para o seu projeto.</p>
      </section>
      <section className="petro-brands" aria-labelledby="petro-networks-title">
        <div className="wrap petro-brand-layout">
          <div>
            <Kicker>Redes e homologações</Kicker>
            <h2 id="petro-networks-title">Atendemos diferentes bandeiras.</h2>
            <p>A Enerlight é fornecedora homologada por algumas redes do setor. Consulte nossa equipe sobre os requisitos de iluminação da sua bandeira.</p>
            <Action href="/contato?assunto=projeto" variant="dark">Consultar homologação</Action>
          </div>
          <div>
            <p className="petro-network-label" id="petro-attended">Redes atendidas</p>
            <ul className="petro-networks" aria-labelledby="petro-attended">{networks.map(([name, logo]) => <li key={name}>{logo ? <img src={`/images/marcas/${logo}`} alt={name} width="132" height="48" loading="lazy" /> : <span>{name}</span>}</li>)}</ul>
          </div>
        </div>
      </section>
      <section className="petro-feature" id="petro-octogonal">
        <div className="wrap feature-layout">
          <figure className="petro-visual">
            <div className="petro-octagon" aria-hidden="true"><div className="petro-octagon-face"><div className="petro-leds" /></div></div>
            <figcaption>Animação conceitual do formato octogonal</figcaption>
          </figure>
          <div className="section-copy">
            <Kicker>Linha Octogonal</Kicker>
            <h2>Um formato que se destaca na marquise.</h2>
            <p>Conheça a linha octogonal para iluminação de postos. Nossa equipe ajuda a avaliar o encaixe no forro e a distribuição de luz na pista.</p>
            <Action href="/contato?assunto=projeto">Consultar linha octogonal</Action>
          </div>
        </div>
      </section>
      <section className="wrap petro-section" id="petro-luminarias">
        <h2>Luminárias para postos</h2>
        <div className="product-grid">{products.map(([name, power, output, page]) => <article className="petro-model interactive-card" key={name}>
          <h3>{name}</h3><p>{power} · {output}</p><Action href={`${catalog}#page=${page}`} variant="dark">Ver ficha no catálogo</Action>
        </article>)}</div>
        <a className="action petro-download" href={catalog} download>Baixar catálogo Petro</a>
      </section>
      <section className="wrap petro-section" id="petro-cases">
        <h2>Cases da Linha Petro</h2>
        <div className="petro-cases-layout">
          <article className="petro-case-lead">
            <img src="/images/obras/posto-chiesa.jpg" alt="Iluminação do Posto Chiesa JK" width="750" height="370" loading="lazy" />
            <div className="case-copy"><h3>Posto Chiesa JK</h3><p>Iluminação da pista de abastecimento e da loja de conveniência.</p><Action href={quoteUrl} variant="dark">Pedir projeto para meu posto</Action></div>
          </article>
          <div className="petro-case-list">{cases.map(([name, description]) => <article key={name}><h3>{name}</h3><p>{description}</p></article>)}</div>
        </div>
      </section>
      <section className="wrap petro-section petro-faq" aria-labelledby="petro-faq-title">
        <h2 id="petro-faq-title">Dúvidas sobre a Linha Petro</h2>
        {questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
      </section>
      <section className="petro-quote" aria-labelledby="petro-quote-title">
        <div className="wrap petro-quote-layout">
          <div><h2 id="petro-quote-title">Peça um orçamento para o seu posto.</h2><p>Informe a cidade, a bandeira e as áreas que precisam de iluminação. Se tiver, envie fotos e a planta ou as medidas do local.</p></div>
          <Action href={quoteUrl}>Solicitar orçamento pelo WhatsApp</Action>
        </div>
      </section>
    </main>
    <Contact showCta={false} />
    <Reveal />
  </>;
}
