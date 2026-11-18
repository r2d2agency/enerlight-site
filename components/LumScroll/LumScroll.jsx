"use client";

import { useEffect, useRef } from "react";

/**
 * Animação do projeto luminotécnico controlada pela rolagem.
 * Os quadros do vídeo são desenhados num canvas conforme a posição da página,
 * então a cena anda para frente ao descer e volta ao subir.
 */
const FRAME_COUNT = 72;
const framePath = (i) => `/images/projeto-luminotecnico/f_${String(i + 1).padStart(3, "0")}.webp`;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
// O quadro 1 do vídeo é um mapa de cores fora de ordem: a animação começa no quadro 2 (planta)
const FIRST = 1;

// Etapas mostradas sob a imagem; "until" é o último quadro (base 0) de cada etapa
const STEPS = [
  { until: 14, title: "Planta e medidas", text: "Levantamos as dimensões do espaço e a altura de instalação." },
  { until: 36, title: "Mapa de iluminância", text: "Calculamos o nível de luz em cada ponto da área." },
  { until: FRAME_COUNT - 1, title: "Simulação 3D", text: "Você vê o ambiente iluminado antes de instalar." }
];

export default function LumScroll({ alt }) {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!box || !canvas || !stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    const section = box.closest("section");
    const track = box.closest(".lum-track");
    const frames = new Array(FRAME_COUNT);
    const loaded = new Array(FRAME_COUNT).fill(false);
    let current = -1;
    let step = -1;
    const setStep = (frame) => {
      const s = STEPS.findIndex((st) => frame <= st.until);
      if (s === step) return;
      step = s;
      stepRefs.current.forEach((el, k) => { if (el) el.dataset.on = String(k === s); });
    };
    let raf = 0;
    let started = false;

    const draw = (index) => {
      // Se o quadro pedido ainda não carregou, usa o mais próximo que já carregou
      let i = index;
      if (!loaded[i]) {
        for (let d = 1; d < FRAME_COUNT; d++) {
          if (loaded[i - d]) { i -= d; break; }
          if (loaded[i + d]) { i += d; break; }
        }
      }
      if (!loaded[i] || i === current) return;
      current = i;
      const img = frames[i];
      if (canvas.width !== img.naturalWidth) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      box.dataset.ready = "true";
    };

    const progress = () => {
      // Celular: imagem e etapas ficam presas; o progresso é o quanto a "pista" delas já foi rolada
      const pin = stage.parentElement;
      if (getComputedStyle(stage).position === "sticky" && pin) {
        const stickTop = parseFloat(getComputedStyle(stage).top) || 0;
        const travel = pin.offsetHeight - stage.offsetHeight;
        if (travel > 0) return clamp((stickTop - pin.getBoundingClientRect().top) / travel);
      }
      const pinned = section && getComputedStyle(section).position === "sticky";
      if (pinned && track) {
        // Desktop: a seção fica presa na tela enquanto a "pista" é rolada
        const r = track.getBoundingClientRect();
        return clamp(-r.top / (track.offsetHeight - window.innerHeight));
      }
      // Sem nada preso: a animação acontece enquanto a imagem atravessa a tela
      const r = box.getBoundingClientRect();
      const vh = window.innerHeight;
      return clamp((vh * 0.85 - r.top) / (vh * 0.7));
    };

    const render = () => {
      raf = 0;
      const p = clamp((progress() - 0.04) / 0.9);
      const frame = FIRST + Math.round(p * (FRAME_COUNT - 1 - FIRST));
      setStep(frame);
      draw(frame);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(render); };

    const load = () => {
      if (started) return;
      started = true;
      // No celular ou com economia de dados, carrega 1 a cada 2 quadros (metade do download);
      // o desenho usa o quadro carregado mais próximo, então a animação continua suave.
      const saveData = navigator.connection && navigator.connection.saveData;
      const every = saveData || window.innerWidth < 900 ? 2 : 1;
      for (let i = FIRST; i < FRAME_COUNT; i++) {
        if ((i - FIRST) % every !== 0 && i !== FRAME_COUNT - 1) continue;
        const img = new Image();
        img.decoding = "async";
        img.onload = () => { loaded[i] = true; onScroll(); };
        img.src = framePath(i);
        frames[i] = img;
      }
    };

    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { load(); io.disconnect(); }
    }, { rootMargin: "150% 0px" });
    io.observe(box);

    stage.dataset.animated = "true";
    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div className="lum-pin">
    <div ref={stageRef} className="lum-stage">
      <div ref={boxRef} className="feature-photo lum-photo">
        <img src="/images/projeto-luminotecnico/poster.webp" alt={alt} width="1280" height="720" loading="lazy" />
        <canvas ref={canvasRef} width="1280" height="720" aria-hidden="true" />
      </div>
      <ol className="lum-steps" aria-label="Etapas do projeto luminotécnico">
        {STEPS.map((s, k) => <li key={s.title} ref={(el) => { stepRefs.current[k] = el; }}>
          <span className="lum-step-n" aria-hidden="true">{String(k + 1).padStart(2, "0")}</span>
          <strong>{s.title}</strong>
          <span className="lum-step-text">{s.text}</span>
        </li>)}
      </ol>
    </div>
  </div>;
}
