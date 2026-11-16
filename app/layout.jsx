import "@fontsource-variable/bricolage-grotesque";
import "@fontsource/barlow-semi-condensed/latin-700.css";
import "@fontsource/barlow-semi-condensed/latin-800.css";
import "./globals.css";
import { JsonLd, organizationJsonLd, pageMeta, siteUrl } from "../lib/seo";

export const metadata = {
  metadataBase: new URL(siteUrl),
  ...pageMeta({
    title: "Enerlight | Iluminação LED para postos, indústrias e iluminação pública",
    description: "Fabricante de luminárias LED com projeto luminotécnico para postos de combustíveis, indústrias, supermercados, iluminação pública e concessionárias. Peça seu orçamento.",
    path: "/"
  }),
  applicationName: "Enerlight",
  formatDetection: { telephone: false }
};

export const viewport = { themeColor: "#031a3d" };

export default function Layout({ children }) {
  return <html lang="pt-BR"><body><JsonLd data={organizationJsonLd()} />{children}<a className="floating-whatsapp" href="https://wa.me/551733539050" target="_blank" rel="noopener noreferrer" aria-label="Falar com a Enerlight pelo WhatsApp (abre em nova aba)" title="Fale com a Enerlight pelo WhatsApp"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.8 11.8a8.8 8.8 0 0 1-13.1 7.7L3 20.8l1.3-4.6a8.8 8.8 0 1 1 16.5-4.4Z"/><path d="M8.4 7.7c-.4 0-1.1.7-1.1 1.6 0 2.4 3.5 5.9 5.9 6.5 1.1.3 2.6-.5 2.6-1.5 0-.3-1.8-1.2-2.1-1.2-.3 0-.6.9-1 .9-.7 0-3-2.2-3-2.9 0-.3.7-.6.7-1 0-.4-1-2.4-1.4-2.4Z"/></svg></a></body></html>;
}
