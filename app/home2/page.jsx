import Header from "../../components/sections/Header";
import Contact from "../../components/sections/Contact";
import { Arrow } from "../../components/ui";
import { articles } from "../../components/articles";
import { brands } from "../../components/brands";
import "./home2.css";

// Prévia do novo visual da home. Fica fora do Google até ser aprovada.
export const metadata = {
  title: "Enerlight | Nova home (prévia)",
  robots: { index: false, follow: false }
};

const proof = [
  ["2018", "fabricando iluminação LED"],
  ["5 anos", "de garantia na maior parte das linhas"],
  ["215 lm/W", "de eficiência na Petro Prime 150"],
  ["OSRAM · Philips", "LEDs e drivers em modelos das linhas"]
];

const segments = [
  { id: "postos", title: "Postos de combustíveis", text: "Pista, marquise, loja de conveniência e estacionamento.", href: "/segmentos/petro", cta: "Conhecer a Linha Petro" },
  { id: "industrias", title: "Indústrias", text: "Galpões, áreas produtivas, centros de distribuição e pátios.", href: "/contato?assunto=industrias" },
  { id: "supermercados", title: "Supermercados", text: "Corredores, áreas de venda e estoques.", href: "/contato?assunto=supermercados" },
  { id: "publica", title: "Iluminação pública", text: "Vias, praças e espaços públicos.", href: "/contato?assunto=iluminacao-publica" },
  { id: "concessionarias", title: "Concessionárias", text: "Showrooms, oficinas e áreas externas.", href: "/contato?assunto=concessionarias" }
];

const projects = [
  { id: "maracana", name: "Maracanã", category: "Iluminação esportiva", photo: "obras/maracana.webp", text: "Projetores LED para a iluminação esportiva do estádio." },
  { id: "rio-preto", name: "São José do Rio Preto", category: "Iluminação pública", photo: "obras/rio-preto.webp", text: "Alça Jordão Reis e iluminação ornamental na Represa Municipal." },
  { id: "posto-chiesa", name: "Posto Chiesa JK", category: "Postos de combustíveis", photo: "obras/posto-chiesa.webp", text: "Iluminação do posto e da loja de conveniência." },
  { id: "atacado", name: "Grandes redes de atacado", category: "Iluminação comercial · imagem ilustrativa", photo: "supermercados.webp", text: "Corredores, áreas de exposição e espaços operacionais." }
];

const products = [
  { id: "petro-e100", name: "Petro E100", line: "Linha Petro", text: "Para forro de postos e lojas de conveniência.", pdf: "petro" },
  { id: "proj-e100", name: "Proj E100", line: "Linha Projetores", text: "Para aplicações esportivas e áreas comuns.", pdf: "projetores" },
  { id: "lpv-st60", name: "LPV ST60", line: "Linha Pública", text: "Para projetos de iluminação viária.", pdf: "publica" }
];

const steps = [
  ["Levantamento", "Dimensões do espaço, altura de instalação e uso de cada área."],
  ["Simulação", "Cálculo da iluminância para chegar ao nível de luz certo em cada ponto."],
  ["Especificação", "Quais luminárias usar, quantas são necessárias e onde posicioná-las."]
];

const catalogs = [["petro", "Modulares Petro"], ["projetores", "Projetores"], ["industriais", "Modulares Industriais"], ["publica", "Iluminação Pública"], ["comerciais", "Iluminação Comercial"]];

function Link({ href, children, variant = "primary", ...rest }) {
  return <a href={href} className={`h2-btn h2-btn--${variant}`} {...rest}>{children}<Arrow /></a>;
}

export default function Home2() {
  return <>
    <a className="skip" href="#inicio">Ir para o conteúdo</a>
    <Header />
    <main className="h2" id="inicio">

      {/* 1. Topo: uma foto, uma frase, um botão */}
      <section className="h2-hero" aria-labelledby="h2-hero-title">
        <img className="h2-hero-photo" src="/images/obras/maracana.webp" alt="" width="1920" height="1080" fetchPriority="high" />
        <div className="h2-wrap h2-hero-copy">
          <p className="h2-eyebrow">Engenharia em iluminação LED</p>
          <h1 id="h2-hero-title">Luz certa para operações que não podem parar.</h1>
          <p className="h2-lead">Luminárias LED e projeto luminotécnico para postos, indústrias, varejo e cidades — do Maracanã à iluminação pública de Rio Preto.</p>
          <div className="h2-actions">
            <Link href="/contato">Solicitar orçamento</Link>
            <Link href="#obras" variant="ghost">Ver obras</Link>
          </div>
        </div>
        <ul className="h2-wrap h2-proof" aria-label="Enerlight em números">
          {proof.map(([value, label]) => <li key={label}><strong>{value}</strong><span>{label}</span></li>)}
        </ul>
      </section>

      {/* 2. Marcas em cinza, sem caixas */}
      <section className="h2-logos" aria-labelledby="h2-logos-title">
        <div className="h2-wrap">
          <h2 id="h2-logos-title" className="h2-small-title">Fornecedor homologado por grandes redes</h2>
          <ul className="h2-logo-grid">{brands.slice(0, 12).map(([name, file]) => <li key={name}><img src={`/images/marcas/${file}`} alt={name} width="120" height="80" loading="lazy" /></li>)}</ul>
        </div>
      </section>

      {/* 3. Segmentos em grade de tamanhos variados */}
      <section className="h2-section" id="segmentos" aria-labelledby="h2-seg-title">
        <div className="h2-wrap">
          <header className="h2-head">
            <h2 id="h2-seg-title">Uma solução para cada operação.</h2>
            <p>Produtos e projetos pensados para o ambiente, a altura de instalação e a rotina de cada mercado.</p>
          </header>
          <ul className="h2-bento">{segments.map(({ id, title, text, href, cta }) => <li key={id} className={`h2-tile h2-tile--${id}`}>
            <a href={href}>
              <img src={`/images/${id}.webp`} alt="" width="504" height="333" loading="lazy" />
              <span className="h2-tile-copy"><strong>{title}</strong><span>{text}</span>{cta && <em>{cta} <Arrow /></em>}</span>
            </a>
          </li>)}</ul>
        </div>
      </section>

      {/* 4. Produto em fundo claro, com especificações */}
      <section className="h2-section h2-product" id="produtos" aria-labelledby="h2-prod-title">
        <div className="h2-wrap h2-product-layout">
          <div className="h2-product-visual" aria-hidden="true"><img src="/images/luminaria.webp" alt="" width="1000" height="605" loading="lazy" /></div>
          <div>
            <h2 id="h2-prod-title">Componentes de primeira linha. Projeto feito para durar.</h2>
            <p className="h2-muted">Modelos das nossas linhas usam LEDs OSRAM e drivers Philips. Na Petro Prime 150, isso significa 21.500 lm com 100 W e vida útil estimada de 102 mil horas.</p>
            <dl className="h2-specs">
              <div><dt>Eficiência</dt><dd>215 lm/W</dd></div>
              <div><dt>Proteção</dt><dd>IP66 · IK08</dd></div>
              <div><dt>Vida útil</dt><dd>102 mil h</dd></div>
              <div><dt>Garantia</dt><dd>5 anos</dd></div>
            </dl>
            <p className="h2-footnote">Valores da Petro Prime 150, conforme a ficha técnica.</p>
          </div>
        </div>
        <div className="h2-wrap">
          <ul className="h2-products">{products.map(({ id, name, line, text, pdf }) => <li key={id}>
            <a href={`/catalogos/enerlight-${pdf}.pdf#page=3`} target="_blank" rel="noopener">
              <span className="h2-product-img"><img src={`/images/produtos/${id}.webp`} alt="" width="360" height="240" loading="lazy" /></span>
              <span className="h2-product-line">{line}</span>
              <strong>{name}</strong>
              <span className="h2-muted">{text}</span>
              <em>Ver especificações <Arrow /></em>
            </a>
          </li>)}</ul>
        </div>
      </section>

      {/* 5. Obras: a seção escura de destaque */}
      <section className="h2-dark" id="obras" aria-labelledby="h2-obras-title">
        <div className="h2-wrap">
          <header className="h2-head">
            <h2 id="h2-obras-title">Obras que falam por nós.</h2>
            <p>De estádios a vias públicas, iluminação projetada para cada aplicação.</p>
          </header>
          <ul className="h2-works">{projects.map(({ id, name, category, photo, text }) => <li key={id} className={`h2-work h2-work--${id}`}>
            <img src={`/images/${photo}`} alt="" width="960" height="600" loading="lazy" />
            <div><span>{category}</span><h3>{name}</h3><p>{text}</p></div>
          </li>)}</ul>
          <Link href="/contato?assunto=projeto" variant="ghost">Fale sobre a sua obra</Link>
        </div>
      </section>

      {/* 6. Projeto luminotécnico: processo + mapa de luz */}
      <section className="h2-section" id="projeto-luminotecnico" aria-labelledby="h2-proj-title">
        <div className="h2-wrap h2-split">
          <div>
            <h2 id="h2-proj-title">Antes da luminária, o projeto.</h2>
            <p className="h2-muted">A equipe técnica calcula a iluminação de cada área para você comprar só o necessário — sem pontos escuros e sem desperdício.</p>
            <ol className="h2-steps">{steps.map(([title, text], i) => <li key={title}><span>{String(i + 1).padStart(2, "0")}</span><div><strong>{title}</strong><p>{text}</p></div></li>)}</ol>
            <Link href="/contato?assunto=projeto">Solicitar projeto luminotécnico</Link>
          </div>
          <figure className="h2-luxmap" aria-label="Representação de um mapa de iluminância">
            <div className="h2-luxmap-grid">{Array.from({ length: 6 }, (_, i) => <span key={i} />)}</div>
            <figcaption><span>Iluminância</span><i /><span>baixa</span><span>alta</span></figcaption>
          </figure>
        </div>
      </section>

      {/* 7. Ferramentas */}
      <section className="h2-section h2-tools-section" aria-labelledby="h2-tools-title">
        <div className="h2-wrap">
          <header className="h2-head"><h2 id="h2-tools-title">Tudo para quem especifica e instala.</h2></header>
          <ul className="h2-tools">
            <li><a href="https://enerlight.com.br/calculadora-lumens/"><strong>Calculadora de lúmens</strong><span className="h2-muted">Informe ambiente, área e altura de montagem e tenha uma estimativa inicial.</span><em>Calcular <Arrow /></em></a></li>
            <li id="catalogos"><div><strong>Catálogos</strong><span className="h2-muted">Especificações de todas as linhas em PDF.</span>
              <ul className="h2-catalog-list">{catalogs.map(([id, title]) => <li key={id}><a href={`/catalogos/enerlight-${id}.pdf`} target="_blank" rel="noopener">{title}<Arrow /></a></li>)}</ul></div></li>
            <li><a href="/universidade"><strong>Universidade Enerlight</strong><span className="h2-muted">Cursos, vídeos de instalação e manuais para instaladores.</span><em>Acessar <Arrow /></em></a></li>
          </ul>
        </div>
      </section>

      {/* 8. Artigos */}
      <section className="h2-section" id="artigos" aria-labelledby="h2-art-title">
        <div className="h2-wrap">
          <header className="h2-head"><h2 id="h2-art-title">Iluminação na prática.</h2></header>
          <ul className="h2-articles">{articles.map(({ slug, label, title, description }) => <li key={slug}><a href={`/artigos/${slug}`}><span className="h2-product-line">{label}</span><strong>{title}</strong><span className="h2-muted">{description}</span><em>Ler artigo <Arrow /></em></a></li>)}</ul>
        </div>
      </section>

      {/* 9. Chamada final */}
      <section className="h2-cta" aria-labelledby="h2-cta-title">
        <div className="h2-wrap">
          <h2 id="h2-cta-title">Vamos iluminar o seu próximo projeto?</h2>
          <p>Fale com o time técnico e receba uma proposta para a sua operação.</p>
          <div className="h2-actions">
            <Link href="/contato">Solicitar orçamento</Link>
            <a className="h2-btn h2-btn--ghost" href="https://wa.me/551733539050" target="_blank" rel="noopener noreferrer">WhatsApp (17) 3353-9050</a>
          </div>
        </div>
      </section>
    </main>
    <Contact showCta={false} />
  </>;
}
