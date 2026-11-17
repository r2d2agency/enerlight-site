"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HeroScroll.module.css";

// Cenas do hero. Links apontam para rotas e seções que existem no site.
export const ENERLIGHT_SCENES = [
  {
    image: "/images/hero/cidade-noite.webp",
    label: "Iluminação pública",
    title: "Mais luz para as vias",
    highlight: "e espaços da cidade.",
    text: "Luminárias LED para ruas, avenidas, praças e outros espaços públicos.",
    primary: { label: "Ver soluções de iluminação pública", href: "#segmento-publica" },
    secondary: { label: "Projeto luminotécnico", href: "#projeto-luminotecnico" },
    tagSmall: "Iluminação pública",
    tagTitle: "São José do Rio Preto"
  },
  {
    image: "/images/hero/posto-noite.webp",
    label: "Postos de combustíveis",
    title: "Da pista à conveniência,",
    highlight: "iluminação para cada área.",
    text: "Soluções LED para pistas de abastecimento, marquises e lojas de conveniência.",
    primary: { label: "Explorar a Linha Petro", href: "/segmentos/petro" },
    secondary: { label: "Projeto luminotécnico", href: "#projeto-luminotecnico" },
    tagSmall: "Pista e conveniência",
    tagTitle: "Posto Chiesa JK"
  },
  {
    image: "/images/hero/atacado.webp",
    label: "Varejo e supermercados",
    title: "Iluminação para valorizar",
    highlight: "cada corredor.",
    text: "Projetos de iluminação para atacarejos, supermercados e grandes áreas de venda.",
    primary: { label: "Conhecer soluções para o varejo", href: "#segmento-supermercados" },
    secondary: { label: "Projeto luminotécnico", href: "#projeto-luminotecnico" },
    tagSmall: "Iluminação comercial · Imagem ilustrativa",
    tagTitle: "Grandes redes de atacado"
  },
  {
    image: "/images/hero/concessionaria.webp",
    imagePosition: "center 40%",
    label: "Concessionárias",
    title: "Showrooms que encantam,",
    highlight: "oficinas que produzem.",
    text: "Iluminação comercial LED para concessionárias: veículos em destaque no showroom, luz uniforme na oficina e mais segurança nas áreas externas.",
    primary: { label: "Conhecer soluções para concessionárias", href: "#segmento-concessionarias" },
    secondary: { label: "Projeto luminotécnico", href: "#projeto-luminotecnico" },
    tagSmall: "Iluminação comercial · Imagem ilustrativa",
    tagTitle: "Concessionárias e showrooms"
  },
  {
    image: "/images/hero/estadio.webp",
    imagePosition: "center 40%",
    label: "Arenas e estádios",
    title: "Iluminação LED à altura",
    highlight: "de grandes arenas.",
    text: "Soluções para quadras, estádios e arenas, com projeto luminotécnico para cada aplicação.",
    primary: { label: "Conhecer o projeto do Maracanã", href: "#obra-maracana" },
    secondary: { label: "Solicitar orçamento", href: "/contato" },
    tagSmall: "Iluminação esportiva",
    tagTitle: "Maracanã"
  }
];

/** Fração de cada cena usada para "acender" (0–1). */
const LIGHT_UP = 0.42;
/** Sobreposição (crossfade) entre cenas. */
const FADE = 0.18;
/** Altura da "pista" de rolagem, em telas por cena. */
const SCREENS_PER_SCENE = 1.3;

/** Apresentação automática quando a pessoa não rola: tempos em milissegundos. */
const AUTO_IDLE_MS = 2500;  // parado no topo por este tempo -> começa sozinho
const AUTO_LIGHT_MS = 1600; // cena acendendo
const AUTO_HOLD_MS = 4000;  // cena acesa na tela
const AUTO_MOVE_MS = 900;   // passagem para a próxima cena

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t) => 1 - Math.pow(1 - t, 3);

export default function HeroScroll({ scenes = ENERLIGHT_SCENES, eyebrow = "ENGENHARIA EM ILUMINAÇÃO" }) {
  const N = scenes.length;
  const heroRef = useRef(null);
  const sceneRefs = useRef([]);
  const bgRefs = useRef([]);
  const beamRef = useRef(null);
  const introRef = useRef(null);
  const trackFillRef = useRef(null);
  const meterFillRef = useRef(null);
  const meterValRef = useRef(null);
  const bulbRef = useRef(null);
  const [active, setActive] = useState(0);
  const [canAuto, setCanAuto] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  // Estado da apresentação, fora do React para não re-renderizar a cada quadro
  const ctrl = useRef({ mode: "scroll", elapsed: 0, hold: false, userPaused: false, start: null });

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const c = ctrl.current;
    let raf = 0;
    let lastActive = -1;
    let idleTimer = 0;
    let lastFrame = 0;

    const SCENE_MS = AUTO_LIGHT_MS + AUTO_HOLD_MS + AUTO_MOVE_MS;
    const CYCLE_MS = N * SCENE_MS - AUTO_MOVE_MS; // a última cena não "anda": as luzes apagam e o ciclo recomeça
    const autoG = (t) => {
      t %= CYCLE_MS;
      const i = Math.min(N - 1, Math.floor(t / SCENE_MS));
      const r = t - i * SCENE_MS;
      if (r < AUTO_LIGHT_MS) return i + 0.5 * (r / AUTO_LIGHT_MS);
      if (r < AUTO_LIGHT_MS + AUTO_HOLD_MS) return i + 0.5;
      return i + 0.5 + 0.5 * ((r - AUTO_LIGHT_MS - AUTO_HOLD_MS) / AUTO_MOVE_MS);
    };
    const metrics = () => {
      const rect = hero.getBoundingClientRect();
      return { rect, total: hero.offsetHeight - window.innerHeight, top: rect.top + window.scrollY };
    };
    const scrollG = () => {
      const { rect, total } = metrics();
      return Math.min(clamp(-rect.top / total) * N, N - 0.0001);
    };

    const paint = (g) => {
      let beamOn = 0;
      let beamX = 50;
      let lightNow = 1;

      for (let i = 0; i < N; i++) {
        const scene = sceneRefs.current[i];
        const bg = bgRefs.current[i];
        if (!scene || !bg) continue;
        const local = g - i;
        scene.style.opacity = String(i === 0 ? 1 : clamp((local + FADE) / FADE));

        const lit = reduce ? 1 : ease(clamp(local / LIGHT_UP));
        bg.style.filter = `brightness(${0.07 + lit * 0.98}) saturate(${0.25 + lit * 0.85})`;
        bg.style.transform = reduce ? "none" : `scale(${1.12 - clamp(local + FADE, 0, 1.2) * 0.1})`;

        if (local >= -0.01 && local <= 1) {
          const k = clamp(local / LIGHT_UP);
          beamOn = reduce ? 0 : Math.sin(Math.PI * k) * 0.95;
          beamX = -15 + k * 130;
          lightNow = lit;
        }
      }

      if (beamRef.current) {
        beamRef.current.style.opacity = String(beamOn);
        beamRef.current.style.setProperty("--bx", `${beamX}%`);
      }

      const idx = Math.min(N - 1, Math.floor(g + 0.15));
      if (idx !== lastActive) {
        lastActive = idx;
        setActive(idx);
      }

      const pct = Math.round(lightNow * 100);
      if (trackFillRef.current) trackFillRef.current.style.width = `${clamp(g / (N - 1)) * 100}%`;
      if (meterFillRef.current) meterFillRef.current.style.height = `${pct}%`;
      if (meterValRef.current) meterValRef.current.textContent = `LUZ ${pct}%`;
      if (bulbRef.current) bulbRef.current.dataset.on = pct > 60 ? "true" : "false";
      if (introRef.current) introRef.current.style.opacity = c.mode === "scroll" && g < 0.05 && !reduce ? "1" : "0";
    };

    // Modo rolagem: desenha quando a página rola
    const renderScroll = () => {
      raf = 0;
      paint(scrollG());
    };

    // Modo automático: desenha a cada quadro, avançando pelo tempo
    const tick = (now) => {
      raf = 0;
      if (c.mode !== "auto") return;
      const dt = lastFrame ? Math.min(100, now - lastFrame) : 0; // aba escondida não acumula tempo
      lastFrame = now;
      if (!c.hold && !c.userPaused) c.elapsed += dt;
      paint(autoG(c.elapsed));
      raf = requestAnimationFrame(tick);
    };

    const atTop = () => metrics().rect.top >= -2;
    const startAuto = () => {
      if (reduce || c.userPaused || c.mode === "auto" || !atTop()) return;
      c.mode = "auto";
      c.elapsed = 0;
      lastFrame = 0;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    const armIdle = () => {
      clearTimeout(idleTimer);
      if (!reduce && !c.userPaused) idleTimer = window.setTimeout(startAuto, AUTO_IDLE_MS);
    };
    // Sai do automático mantendo a cena da tela: leva a rolagem até o ponto equivalente
    const stopAuto = ({ keepScene = true } = {}) => {
      if (c.mode !== "auto") return;
      const g = autoG(c.elapsed);
      c.mode = "scroll";
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      if (keepScene) {
        const { top, total } = metrics();
        // no loop, ao "apagar" a última cena, volta para o começo
        window.scrollTo({ top: top + total * (Math.min(g, N - 0.5) / N), behavior: "instant" });
      }
      paint(scrollG());
    };
    c.start = startAuto;
    c.stop = stopAuto;
    c.arm = armIdle;

    const onScroll = () => {
      if (c.mode === "auto") stopAuto();
      else if (!raf) raf = requestAnimationFrame(renderScroll);
      armIdle();
    };
    const onResize = () => { if (c.mode === "scroll" && !raf) raf = requestAnimationFrame(renderScroll); };
    // Teclas de rolagem também tiram do automático (a página pode não ter rolado ainda)
    const onKey = (e) => { if (["ArrowDown", "PageDown", " ", "End"].includes(e.key) && c.mode === "auto" && document.activeElement === document.body) stopAuto(); };
    // Foco dentro do hero pausa a troca de texto, para ninguém perder o botão que está focando
    const onFocusIn = () => { c.hold = true; };
    const onFocusOut = (e) => { if (!hero.contains(e.relatedTarget)) c.hold = false; };

    setCanAuto(!reduce);
    paint(scrollG());
    armIdle();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    hero.addEventListener("focusin", onFocusIn);
    hero.addEventListener("focusout", onFocusOut);
    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
      hero.removeEventListener("focusin", onFocusIn);
      hero.removeEventListener("focusout", onFocusOut);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [N]);

  const togglePause = () => {
    const c = ctrl.current;
    const next = !c.userPaused;
    c.userPaused = next;
    setUserPaused(next);
    if (!next) {
      if (c.mode === "auto") return; // estava pausado no automático: o tempo volta a correr
      c.start?.(); // no topo, recomeça já
      c.arm?.();
    }
  };
  // Mouse sobre o texto segura a cena atual
  const holdOn = (e) => { if (e.pointerType === "mouse") ctrl.current.hold = true; };
  const holdOff = () => { ctrl.current.hold = false; };

  const goTo = (i) => {
    const hero = heroRef.current;
    if (!hero) return;
    ctrl.current.stop?.({ keepScene: false });
    const total = hero.offsetHeight - window.innerHeight;
    const top = hero.getBoundingClientRect().top + window.scrollY; // posição real na página
    const y = top + total * ((i + LIGHT_UP + 0.05) / N);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section
      ref={heroRef}
      id="inicio"
      className={styles.hero}
      style={{ height: `${N * SCREENS_PER_SCENE * 100}vh` }}
      aria-label="Destaques Enerlight"
    >
      <div className={styles.stage}>
        {scenes.map((s, i) => (
          <div
            key={s.image}
            ref={(el) => { sceneRefs.current[i] = el; }}
            className={styles.scene}
            style={{ opacity: i === 0 ? 1 : 0 }}
            aria-hidden="true"
          >
            <div ref={(el) => { bgRefs.current[i] = el; }} className={styles.bg}>
              <img
                className={styles.img}
                src={s.image}
                alt=""
                width="1600"
                height="900"
                fetchPriority={i === 0 ? "high" : undefined}
                loading={i === 0 ? undefined : "lazy"}
                style={{ objectPosition: s.imagePosition ?? "center" }}
              />
            </div>
          </div>
        ))}

        <div ref={beamRef} className={styles.beam} />
        <div className={styles.shade} />

        <div className={styles.copy} onPointerEnter={holdOn} onPointerLeave={holdOff}>
          <div className={styles.eyebrowRow}>
            <div className={styles.eyebrow}>{eyebrow}</div>
            {canAuto && (
              <button
                type="button"
                className={styles.autoBtn}
                onClick={togglePause}
                aria-label={userPaused ? "Retomar apresentação automática" : "Pausar apresentação automática"}
                title={userPaused ? "Retomar apresentação" : "Pausar apresentação"}
              >
                <span aria-hidden="true">{userPaused ? "▶" : "Ⅱ"}</span>
              </button>
            )}
          </div>
          <div className={styles.texts}>
            {scenes.map((s, i) => (
              <div key={s.title} className={`${styles.text} ${i === active ? styles.on : ""}`} aria-hidden={i !== active}>
                {i === 0 ? (
                  <h1>{s.title} <em>{s.highlight}</em></h1>
                ) : (
                  <h2 className={styles.h}>{s.title} <em>{s.highlight}</em></h2>
                )}
                <p>{s.text}</p>
                <div className={styles.ctas}>
                  <a className={`${styles.btn} ${styles.btnYellow}`} href={s.primary.href} tabIndex={i === active ? 0 : -1}>
                    {s.primary.label} <span aria-hidden="true">→</span>
                  </a>
                  {s.secondary && (
                    <a className={`${styles.btn} ${styles.btnGhost}`} href={s.secondary.href} tabIndex={i === active ? 0 : -1}>
                      {s.secondary.label}
                    </a>
                  )}
                </div>
                <div className={styles.tag}>
                  <small>{s.tagSmall}</small>
                  <b>{s.tagTitle}</b>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={introRef} className={styles.intro} aria-hidden="true">
          <div className={styles.switch} />
          <span>ROLE PARA ACENDER</span>
        </div>

        <div className={styles.meter} aria-hidden="true">
          <div className={styles.counter}>
            <b>{String(active + 1).padStart(2, "0")}</b> / {String(N).padStart(2, "0")}
          </div>
          <div className={styles.bar}>
            <div ref={meterFillRef} className={styles.meterFill} />
          </div>
          <div ref={bulbRef} className={styles.bulb} data-on="false" />
          <div ref={meterValRef} className={styles.val}>LUZ 0%</div>
        </div>

        <div className={styles.track}>
          <div className={styles.line}>
            <div ref={trackFillRef} className={styles.trackFill} />
          </div>
          <div className={styles.points} style={{ gridTemplateColumns: `repeat(${N}, minmax(0, 1fr))` }}>
            {scenes.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => goTo(i)}
                className={`${styles.pt} ${i === active ? styles.ptOn : ""} ${i < active ? styles.ptDone : ""}`}
                aria-label={`Ver ${s.tagTitle}`}
                aria-current={i === active ? "true" : undefined}
              >
                <i />
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
