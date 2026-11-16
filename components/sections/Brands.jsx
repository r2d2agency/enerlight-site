"use client";

import { useState } from "react";
import { Kicker } from "../ui";
import { brands } from "../brands";



export default function Brands() {
  const [paused, setPaused] = useState(false);
  return <section className="brands" id="marcas" aria-labelledby="brands-title">
    <div className="wrap">
      <div className="brand-heading">
        <div className="section-copy">
          <Kicker>Clientes e homologações</Kicker>
          <h2 id="brands-title">Marcas que confiam na Enerlight.</h2>
          <p>Atendemos empresas de diferentes setores e somos fornecedores homologados por grandes redes.</p>
        </div>
        <button type="button" className="brand-pause" aria-pressed={paused} onClick={() => setPaused(!paused)}>
          <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>{paused ? "Retomar marcas" : "Pausar marcas"}
        </button>
      </div>
      <div className={paused ? "brand-window brand-window--paused" : "brand-window"} role="region" aria-label="Logotipos de clientes e parceiros" tabIndex={0}>
        <div className="brand-track">
          {[false, true].map((duplicate) => <ul className="brand-list" key={String(duplicate)} aria-hidden={duplicate || undefined}>
            {brands.map(([name, file]) => <li key={name}><img src={`/images/marcas/${file}`} alt={duplicate ? "" : name} width="155" height="70" loading={duplicate ? undefined : "lazy"} /></li>)}
          </ul>)}
        </div>
      </div>
    </div>
  </section>;
}
