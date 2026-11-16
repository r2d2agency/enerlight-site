import { Action, Kicker } from "../ui";

export default function University() {
  return <section className="university" id="universidade" aria-labelledby="university-title">
    <div className="wrap university-inner">
      <div className="section-copy">
        <Kicker>Área do instalador</Kicker>
        <h2 id="university-title">Universidade Enerlight</h2>
        <p>Cursos e vídeos de instalação para profissionais que trabalham com as soluções Enerlight.</p>
        <div className="actions"><Action href="/universidade">Acessar área do instalador</Action><Action href="https://enerlight.com.br/manuais/" variant="dark" arrow={false}>Ver manuais e treinamentos</Action></div>
      </div>
    </div>
  </section>;
}
