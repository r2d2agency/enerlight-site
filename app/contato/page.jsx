import { Action } from "../../components/ui";

import { pageMeta } from "../../lib/seo";

export const metadata = pageMeta({
  title: "Solicitar orçamento de iluminação LED | Enerlight",
  description: "Peça um orçamento de luminárias LED ou de projeto luminotécnico. Fale com a Enerlight pelo telefone (17) 3353-9050, por e-mail ou WhatsApp.",
  path: "/contato"
});

export default async function ContactPage({ searchParams }) {
  const { assunto } = await searchParams;
  const isProject = assunto === "projeto";
  const email = process.env.ENERLIGHT_CONTACT_EMAIL || "contato@enerlight.com.br";
  const subject = encodeURIComponent(isProject ? "Solicitação de projeto luminotécnico" : "Solicitação de orçamento de iluminação");
  const body = encodeURIComponent("Olá, equipe Enerlight! Gostaria de solicitar um orçamento.\n\nNome:\nEmpresa:\nCidade/UF:\nTipo de ambiente:\nDetalhes do projeto:\n");
  return <main className="wrap inner-page">
    <a className="action action--dark" href="/#contato">Voltar para a home</a>
    <h1>{isProject ? "Solicite seu projeto luminotécnico" : "Solicite seu orçamento"}</h1>
    <p>Conte à Enerlight onde será a instalação e quais áreas precisam de iluminação. Se tiver, inclua as dimensões do ambiente e fotos do local.</p>
    <div className="actions"><Action href={`mailto:${email}?subject=${subject}&body=${body}`}>Enviar e-mail</Action><Action href="tel:+551733539050" variant="dark" arrow={false}>(17) 3353-9050</Action></div>
  </main>;
}

export const dynamic = "force-dynamic";
