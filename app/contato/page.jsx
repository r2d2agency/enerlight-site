import { Action } from "../../components/ui";

export const metadata = { title: "Solicitar orçamento | Enerlight" };

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
