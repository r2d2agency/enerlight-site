import { Action, Kicker } from "../ui";

const projects = [
  { id: "maracana", name: "Maracanã", category: "Iluminação esportiva", photo: "obras/maracana.webp", text: "Projetores LED para a iluminação esportiva do estádio." },
  { id: "rio-preto", name: "São José do Rio Preto", category: "Iluminação pública", photo: "obras/rio-preto.webp", text: "Iluminação da alça Jordão Reis e aplicação ornamental na Represa Municipal." },
  { id: "atacado", name: "Grandes redes de atacado", category: "Iluminação comercial", photo: "supermercados.webp", text: "Soluções para corredores, áreas de exposição e espaços operacionais.", illustrative: true },
  { id: "postos", name: "Posto Chiesa JK", category: "Postos de combustíveis", photo: "obras/posto-chiesa.webp", text: "Iluminação do posto e da loja de conveniência." },
];

export default function Projects() {
  return <section className="projects case-section" id="projetos" aria-labelledby="projects-title">
    <div className="wrap">
      <div className="section-copy">
        <Kicker>Obras realizadas</Kicker>
        <h2 id="projects-title">Do Maracanã à iluminação pública de Rio Preto.</h2>
        <p>Conheça aplicações da Enerlight em diferentes tipos de operação.</p>
      </div>
      <div className="case-grid">{projects.map(({ id, name, category, photo, text, illustrative }) => <article className="case-card" id={`obra-${id}`} key={id}>
        <img src={`/images/${photo}`} alt="" width="480" height="270" loading="lazy" />
        <div className="case-copy"><span>{category}{illustrative && " · Imagem ilustrativa"}</span><h3>{name}</h3><p>{text}</p></div>
      </article>)}</div>
      <Action href="/contato?assunto=projeto" variant="dark">Fale sobre sua obra</Action>
    </div>
  </section>;
}
