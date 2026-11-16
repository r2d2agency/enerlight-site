"use client";

import { useEffect, useRef, useState } from "react";
import { Action } from "../ui";
import { segments } from "./Segments";

const links = [["Projeto Luminotécnico", "#projeto-luminotecnico"], ["Produtos", "#produtos"], ["Catálogos", "#catalogos"], ["Projetos", "#projetos"], ["Calculadora", "#calculadora"], ["Artigos", "#artigos"], ["Universidade", "#universidade"]];

export default function Header({ homePath = "" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    function updateScroll() { setScrolled(window.scrollY > 32); }
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const menuButton = useRef(null);
  const segmentMenu = useRef(null);

  function closeNavigation() {
    setOpen(false);
    if (segmentMenu.current) segmentMenu.current.open = false;
  }

  function handleKeyDown(event) {
    if (event.key !== "Escape") return;
    if (segmentMenu.current?.open) {
      segmentMenu.current.open = false;
      segmentMenu.current.querySelector("summary")?.focus();
    } else if (open) {
      closeNavigation();
      menuButton.current?.focus();
    }
  }

  return <header className="header" data-scrolled={scrolled} onKeyDown={handleKeyDown} onBlur={(event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) closeNavigation();
  }}>
    <div className="wrap header-inner">
      <a href={homePath + "#inicio"} className="brand" aria-label="Enerlight, início" onClick={closeNavigation}><img src="/images/logo.webp" alt="Enerlight Soluções em Iluminação" width="240" height="60" /></a>
      <button ref={menuButton} className="menu-toggle" type="button" aria-controls="main-navigation" aria-expanded={open} onClick={() => open ? closeNavigation() : setOpen(true)}><span className="menu-icon" aria-hidden="true" /><span className="menu-label">{open ? "Fechar" : "Menu"}</span></button>
      <nav className={open ? "nav nav--open" : "nav"} id="main-navigation" aria-label="Navegação principal">
        <a href={homePath + "#inicio"} className="nav-home" onClick={closeNavigation}>Home</a>
        <details className="nav-segments" ref={segmentMenu}>
          <summary>Segmentos <span className="segment-toggle-icon" aria-hidden="true" /></summary>
          <div className="nav-segment-list">
            <a href={homePath + "#segmentos"} onClick={closeNavigation}>Todos os segmentos</a>
            {segments.map(([id, name]) => <a href={id === "postos" ? "/segmentos/petro" : `${homePath}#segmento-${id}`} key={id} onClick={closeNavigation}>{name}</a>)}
          </div>
        </details>
        {links.map(([name, href]) => <a key={href} href={homePath + href} onClick={closeNavigation}>{name}</a>)}
      </nav>
      <Action href="/contato" arrow={false}>Solicitar Orçamento</Action>
    </div>
  </header>;
}
