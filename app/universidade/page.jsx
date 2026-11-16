import { redirect } from "next/navigation";
import { Action } from "../../components/ui";

export const dynamic = "force-dynamic";
import { pageMeta } from "../../lib/seo";

export const metadata = pageMeta({
  title: "Universidade Enerlight | Área do instalador",
  description: "Cursos, vídeos de instalação e manuais para profissionais que trabalham com as luminárias LED Enerlight.",
  path: "/universidade"
});

export default function UniversityPage() {
  const login = process.env.ENERLIGHT_EAD_URL;
  if (login && /^https:\/\//i.test(login)) redirect(login);

  return <main className="wrap inner-page">
    <a className="action action--dark" href="/#universidade">Voltar para a home</a>
    <h1>Universidade Enerlight</h1>
    <p>Instaladores podem solicitar acesso aos cursos e vídeos da Universidade Enerlight pelo atendimento.</p>
    <div className="actions"><Action href="mailto:contato@enerlight.com.br?subject=Acesso%20%C3%A0%20Universidade%20Enerlight">Solicitar acesso</Action><Action href="https://enerlight.com.br/manuais/" variant="dark">Central de treinamentos</Action></div>
  </main>;
}
