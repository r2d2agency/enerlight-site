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

export default function LumScroll({ alt }) {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    if (!box || !canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    const section = box.closest("section");
    const track = box.closest(".lum-track");
    const frames = new Array(FRAME_COUNT);
    const loaded = new Array(FRAME_COUNT).fill(false);
    let current = -1;
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
      const pinned = section && getComputedStyle(section).position === "sticky";
      if (pinned && track) {
        // Desktop: a seção fica presa na tela enquanto a "pista" é rolada
        const r = track.getBoundingClientRect();
        return clamp(-r.top / (track.offsetHeight - window.innerHeight));
      }
      // Celular: a animação acontece enquanto a imagem atravessa a tela
      const r = box.getBoundingClientRect();
      const vh = window.innerHeight;
      return clamp((vh * 0.85 - r.top) / (vh * 0.7));
    };

    const render = () => {
      raf = 0;
      const p = clamp((progress() - 0.04) / 0.9);
      draw(Math.round(p * (FRAME_COUNT - 1)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(render); };

    const load = () => {
      if (started) return;
      started = true;
      // No celular ou com economia de dados, carrega 1 a cada 2 quadros (metade do download);
      // o desenho usa o quadro carregado mais próximo, então a animação continua suave.
      const saveData = navigator.connection && navigator.connection.saveData;
      const step = saveData || window.innerWidth < 900 ? 2 : 1;
      for (let i = 0; i < FRAME_COUNT; i++) {
        if (i % step !== 0 && i !== FRAME_COUNT - 1) continue;
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

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={boxRef} className="feature-photo lum-photo">
    <img src="/images/projeto-luminotecnico/poster.webp" alt={alt} width="1280" height="720" loading="lazy" />
    <canvas ref={canvasRef} width="1280" height="720" aria-hidden="true" />
  </div>;
}
