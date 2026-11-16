import { Action, Kicker } from "../ui";

export default function Calculator() {
  return <section className="calculator" id="calculadora" aria-labelledby="calculator-title">
    <div className="wrap calculator-inner">
      <div className="section-copy">
        <Kicker>Calculadora de lúmens</Kicker>
        <h2 id="calculator-title">Quanta luz seu ambiente precisa?</h2>
        <p>Informe o tipo de ambiente, a área e a altura de montagem para obter uma estimativa inicial de iluminação.</p>
      </div>
      <Action href="https://enerlight.com.br/calculadora-lumens/">Calcular lúmens</Action>
    </div>
  </section>;
}
