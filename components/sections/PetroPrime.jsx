"use client";

import { useEffect, useState } from "react";
import { Action, Kicker } from "../ui";

const images = [
  ["frente", "Vista frontal da luminária"],
  ["leds", "Detalhe dos LEDs"],
  ["dimensoes", "Desenho técnico e dimensões"]
];
const specs = [["100 W", "Potência nominal"], ["21.500 lm", "Fluxo luminoso"], ["215 lm/W", "Eficiência luminosa"], ["5.000 K", "Temperatura de cor"], ["90°", "Ângulo do facho"], ["IP66 · IK08", "Proteção e impacto"]];

export default function PetroPrime() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    if (paused || hovered || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(() => setIndex((index + 1) % images.length), 5000);
    return () => clearTimeout(timer);
  }, [index, paused, hovered]);
  const [file, label] = images[index];
  return <section className="petro-prime wrap" aria-labelledby="petro-prime-title">
    <div className="prime-gallery" role="region" aria-label="Galeria da Petro Prime 150" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <figure key={file}><img src={`/images/petro/prime-${file}.webp`} alt={label} width="480" height="360" /><figcaption>{label}</figcaption></figure>
      <div className="prime-controls">
        <button type="button" aria-label="Imagem anterior" onClick={() => setIndex((index + images.length - 1) % images.length)}>‹</button>
        {images.map(([, name], i) => <button type="button" key={name} aria-label={name} aria-current={i === index ? "true" : undefined} onClick={() => setIndex(i)}>{i + 1}</button>)}
        <button type="button" aria-label="Próxima imagem" onClick={() => setIndex((index + 1) % images.length)}>›</button>
        <button type="button" onClick={() => setPaused(!paused)}>{paused ? "Retomar" : "Pausar"}</button>
      </div>
    </div>
    <div className="prime-content">
      <Kicker>Luminária em destaque</Kicker>
      <h2 id="petro-prime-title">Petro Prime 150 <em>New</em></h2>
      <p>Luminária LED para marquises de postos, com LEDs OSRAM e driver Philips.</p>
      <dl className="prime-specs">{specs.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      <p>5 anos de garantia e vida útil estimada de 102 mil horas, conforme a ficha técnica.</p>
      <div className="actions"><Action href="/contato?assunto=projeto">Solicitar orçamento</Action><Action href="/catalogos/petro-prime-150-ficha.pdf" variant="light">Ver ficha técnica</Action></div>
    </div>
  </section>;
}
