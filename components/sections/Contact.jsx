import { Action, Icon } from "../ui";

const address = "Av. Joaquim Gomes Camacho, 185";
const city = "Jardim Primavera, São José do Rio Preto – SP";
const map = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address}, ${city}, 15061-430`)}`;

export default function Contact({ showCta = true } = {}) {
  return <footer id="contato">
    {showCta && <div className="contact band">
      <div className="wrap contact-inner">
        <div className="contact-title"><Icon name="headset" /><h2>Vamos iluminar<br />seu próximo projeto?</h2></div>
        <p>Fale com nosso time técnico e receba uma solução personalizada para o seu negócio.</p>
        <Action href="/contato">Solicitar Orçamento</Action>
      </div>
    </div>}
    <div className="footer-details">
      <div className="wrap footer-grid">
        <a className="brand footer-brand" href="/#inicio" aria-label="Enerlight, início"><img src="/images/logo.webp" alt="Enerlight Soluções em Iluminação" width="200" height="50" loading="lazy" /></a>
        <section aria-labelledby="footer-address">
          <h2 id="footer-address">Endereço</h2>
          <address><a href={map}>{address}<br />{city}<br />CEP 15061-430</a></address>
        </section>
        <section aria-labelledby="footer-phone">
          <h2 id="footer-phone">Telefone</h2>
          <a href="tel:+551733539050">(17) 3353-9050</a>
        </section>
        <section aria-labelledby="footer-sac">
          <h2 id="footer-sac">SAC e atendimento</h2>
          <a href="mailto:contato@enerlight.com.br?subject=SAC%20Enerlight">contato@enerlight.com.br</a>
        </section>
      </div>
    </div>
  </footer>;
}
