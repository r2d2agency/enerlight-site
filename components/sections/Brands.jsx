import { Kicker } from "../ui";

const brands = [
  [
    "BR",
    "br.png"
  ],
  [
    "Shell",
    "shell-2.jpg"
  ],
  [
    "JBS",
    "jbs.png"
  ],
  [
    "Petrobras",
    "petrobras.png"
  ],
  [
    "São Paulo FC",
    "sao-paulo.png"
  ],
  [
    "Constroeste",
    "constroeste.png"
  ],
  [
    "Ipiranga",
    "ipiranga.png"
  ],
  [
    "Leroy Merlin",
    "leroy.png"
  ],
  [
    "TotalEnergies",
    "totalenergies.jpg"
  ],
  [
    "OXXO",
    "oxxo.png"
  ],
  [
    "ALE",
    "ale.png"
  ],
  [
    "Raízen",
    "raizen.png"
  ],
  [
    "Texaco",
    "texaco.jpg"
  ],
  [
    "am/pm",
    "am-pm.png"
  ],
  [
    "Minerva Foods",
    "minerva.png"
  ],
  [
    "Solfarma",
    "solfarma.png"
  ],
  [
    "Loja do Mecânico",
    "mecanico.png"
  ],
  [
    "Droga Raia",
    "droga-raia.png"
  ],
  [
    "Damha",
    "damha.png"
  ],
  [
    "Entrevias",
    "entrevias.png"
  ],
  [
    "Kryspy",
    "kryspy.jpg"
  ],
  [
    "Shell Select",
    "select.jpg"
  ]
];

export default function Brands() {
  return <section className="brands" id="marcas" aria-labelledby="brands-title">
    <div className="wrap">
      <div className="brand-heading">
        <div className="section-copy">
          <Kicker>Clientes e homologações</Kicker>
          <h2 id="brands-title">Marcas que confiam na Enerlight.</h2>
          <p>Atendemos empresas de diferentes setores e somos fornecedores homologados por grandes redes.</p>
        </div>
      </div>
      <div className="brand-window" role="region" aria-label="Logotipos de clientes e parceiros" tabIndex={0}>
        <div className="brand-track">
          {[false, true].map((duplicate) => <ul className="brand-list" key={String(duplicate)} aria-hidden={duplicate || undefined}>
            {brands.map(([name, file]) => <li key={name}><img src={`/images/marcas/${file}`} alt={duplicate ? "" : name} width="155" height="70" loading={duplicate ? undefined : "lazy"} /></li>)}
          </ul>)}
        </div>
      </div>
    </div>
  </section>;
}
