"use client";

import { useEffect, useState } from "react";
import { Action, Arrow, Kicker } from "../ui";

const homeSlides = [
  {
    "title": "Maracanã",
    "category": "Iluminação esportiva",
    "photo": "/images/obras/maracana.webp",
    "position": "center 56%",
    "href": "#obra-maracana",
    "headline": "Iluminação LED à altura",
    "accent": "de grandes arenas.",
    "description": "Soluções para quadras, estádios e arenas, com projeto luminotécnico para cada aplicação.",
    "cta": "Conhecer o projeto do Maracanã",
    "target": "#obra-maracana"
  },
  {
    "title": "São José do Rio Preto",
    "category": "Iluminação pública",
    "photo": "/images/obras/rio-preto.jpg",
    "position": "center 54%",
    "href": "#obra-rio-preto",
    "headline": "Mais luz para as vias",
    "accent": "e espaços da cidade.",
    "description": "Luminárias LED para ruas, avenidas, praças e outros espaços públicos.",
    "cta": "Ver soluções de iluminação pública",
    "target": "#segmento-publica"
  },
  {
    "title": "Grandes redes de atacado",
    "category": "Iluminação comercial",
    "photo": "/images/supermercados.jpg",
    "position": "center 45%",
    "href": "#obra-atacado",
    "illustrative": true,
    "headline": "Iluminação para valorizar",
    "accent": "cada corredor.",
    "description": "Projetos de iluminação para atacarejos, supermercados e grandes áreas de venda.",
    "cta": "Conhecer soluções para o varejo",
    "target": "#segmento-supermercados"
  },
  {
    "title": "Posto Chiesa JK",
    "category": "Pista e conveniência",
    "photo": "/images/obras/posto-chiesa.jpg",
    "position": "center 57%",
    "href": "#obra-postos",
    "headline": "Da pista à conveniência,",
    "accent": "iluminação para cada área.",
    "description": "Soluções LED para pistas de abastecimento, marquises e lojas de conveniência.",
    "cta": "Explorar a linha Petro",
    "target": "/segmentos/petro"
  }
];

export default function Hero({ slides = homeSlides, petro = false } = {}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [canRotate, setCanRotate] = useState(false);
  const rotating = canRotate && !paused && !hovered && !focused;
  const slide = slides[index];

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    function updateAvailability() { setCanRotate(!motion.matches && !document.hidden); }
    updateAvailability();
    motion.addEventListener("change", updateAvailability);
    document.addEventListener("visibilitychange", updateAvailability);
    return () => {
      motion.removeEventListener("change", updateAvailability);
      document.removeEventListener("visibilitychange", updateAvailability);
    };
  }, []);

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % slides.length), 5000);
    return () => window.clearTimeout(timer);
  }, [index, rotating, slides.length]);
  function advance(step) {
    setIndex((current) => (current + step + slides.length) % slides.length);
  }

  return <section className={petro ? "hero hero-carousel petro-carousel" : "hero hero-carousel"} id={petro ? undefined : "inicio"} aria-labelledby="hero-title" aria-roledescription="carrossel" onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }} onPointerLeave={() => setHovered(false)} onFocus={() => setFocused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <div className="hero-photo" key={slide.photo} style={{ backgroundImage: `url(${slide.photo})`, "--slide-position": slide.position }} aria-hidden="true" />
    <div className="wrap hero-inner" key={slide.title}>
      <Kicker>{petro ? "Linha Petro Enerlight" : "Engenharia em iluminação"}</Kicker>
      <h1 id="hero-title"><span>{slide.headline}</span> <em>{slide.accent}</em></h1>
      <p>{slide.description}</p>
      <div className="actions"><Action href={slide.target}>{slide.cta}</Action><Action href={petro ? "#petro-luminarias" : "#projeto-luminotecnico"} variant="light" arrow={false}>{petro ? "Ver luminárias" : "Projeto luminotécnico"}</Action></div>
    </div>
    <div className="wrap hero-controls">
      <div className="slide-caption" aria-live={rotating ? "off" : "polite"}>
        <span>{slide.category}{slide.illustrative && " · Imagem ilustrativa"}</span>
        <a href={slide.href}>{slide.title}</a>
      </div>
      <div className="slide-buttons" aria-label="Controles dos slides">
        <button type="button" aria-label={petro ? "Slide anterior" : "Obra anterior"} onClick={() => advance(-1)}><Arrow /></button>
        <div className="slide-dots">{slides.map(({ title }, item) => <button key={title} type="button" aria-label={`Ver ${title}`} aria-current={index === item ? "true" : undefined} onClick={() => setIndex(item)} />)}</div>
        <button type="button" aria-label={petro ? "Próximo slide" : "Próxima obra"} onClick={() => advance(1)}><Arrow /></button>
        <button type="button" aria-label={paused ? "Retomar rotação dos slides" : "Pausar rotação dos slides"} title={paused ? "Retomar slides" : "Pausar slides"} onClick={() => setPaused(!paused)} hidden={!canRotate}><span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span></button>
      </div>
    </div>
    {!petro && <svg className="hero-edge" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
      <defs><linearGradient id="edge"><stop stopColor="#12c8ff"/><stop offset=".34" stopColor="#36d9ff"/><stop offset=".62" stopColor="#ffba00"/><stop offset="1" stopColor="#ffe39b" stopOpacity="0"/></linearGradient></defs>
      <path fill="#fff" d="M0 57C330 37 560 89 1440 66V80H0Z"/>
      <path className="edge-glow" fill="none" stroke="url(#edge)" strokeWidth="2.4" d="M0 8C420 78 835 86 1440 63"/>
    </svg>}
  </section>;
}
