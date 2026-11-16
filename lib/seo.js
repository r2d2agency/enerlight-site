// Endereço público do site. Pode ser trocado pela variável SITE_URL no Easypanel (exige novo build).
export const siteUrl = (process.env.SITE_URL || "https://www.enerlight.com.br").replace(/\/$/, "");

export const company = {
  name: "Enerlight",
  legalName: "Enerlight Soluções em Iluminação",
  phone: "+55 17 3353-9050",
  email: "contato@enerlight.com.br",
  whatsapp: "https://wa.me/551733539050",
  address: { street: "Av. Joaquim Gomes Camacho, 185", district: "Jardim Primavera", city: "São José do Rio Preto", state: "SP", zip: "15061-430", country: "BR" }
};

const shareImage = { url: "/og/enerlight.jpg", width: 1200, height: 630, alt: "Enerlight – iluminação LED para grandes projetos" };

// Metadados completos de uma página: título, descrição, endereço oficial e cartão de compartilhamento
export function pageMeta({ title, description, path = "/", type = "website", image = shareImage }) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type, locale: "pt_BR", siteName: "Enerlight", url: path, title, description, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] }
  };
}

export function organizationJsonLd() {
  const { address: a } = company;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#empresa`,
    name: company.name,
    legalName: company.legalName,
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    image: `${siteUrl}/og/enerlight.jpg`,
    description: "Fabricante de luminárias LED e projetos luminotécnicos para postos de combustíveis, indústrias, supermercados, iluminação pública e concessionárias.",
    telephone: company.phone,
    email: company.email,
    foundingDate: "2018",
    address: { "@type": "PostalAddress", streetAddress: a.street, addressLocality: a.city, addressRegion: a.state, postalCode: a.zip, addressCountry: a.country },
    areaServed: { "@type": "Country", name: "Brasil" },
    contactPoint: [{ "@type": "ContactPoint", telephone: company.phone, email: company.email, contactType: "sales", areaServed: "BR", availableLanguage: "Portuguese" }]
  };
}

export function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
