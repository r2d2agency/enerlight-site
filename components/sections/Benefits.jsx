import { Icon } from "../ui";

const benefits = [["leaf","Mais eficiência","energética"],["shield","Alta","durabilidade"],["quality","Qualidade","certificada"],["gear","Suporte","técnico especializado"],["chart","Soluções","personalizadas"]];

export default function Benefits() {
  return <section className="benefits" aria-label="Diferenciais da Enerlight">
    <ul className="wrap benefit-list">{benefits.map(([icon, first, second]) => <li key={icon}><Icon name={icon}/><strong>{first}<br />{second}</strong></li>)}</ul>
  </section>;
}
