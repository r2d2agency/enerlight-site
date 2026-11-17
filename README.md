# Enerlight

Home institucional responsiva em Next.js. O projeto pode ser executado em Docker e publicado no Easypanel.

## Publicar no Easypanel

1. Crie um serviço **App** no Easypanel.
2. Em **Source**, selecione **Upload** e envie este ZIP. Se preferir usar Git, extraia o ZIP e coloque o conteúdo na raiz do repositório antes de conectar o repositório e a branch.
3. Em **Build**, selecione **Dockerfile**, com caminho `Dockerfile` na raiz do projeto.
4. Configure o domínio do serviço para apontar para a porta interna **3000** e faça o deploy.
5. Abra o domínio e teste o botão de orçamento.

O orçamento abre um e-mail preenchido para o contato público da Enerlight. Para alterar o destino no Easypanel, defina `ENERLIGHT_CONTACT_EMAIL` nas variáveis de ambiente do serviço.

## Rodar localmente

```sh
npm ci
npm run dev
```

Acesse http://localhost:3000.

```sh
docker build -t enerlight .
docker run --rm -p 3000:3000 enerlight
```

## Blocos para pedir edições

| Bloco | Componente em components/sections | O que editar |
| --- | --- | --- |
| 1 | Header.jsx | Logo, menu e orçamento |
| 2 | Hero.jsx | Carrossel de obras, títulos e chamadas |
| 3 | Benefits.jsx | Diferenciais |
| 4 | Brands.jsx | Marcas atendidas e homologações |
| 5 | Segments.jsx | Segmentos |
| 6 | LightingDesign.jsx | Projeto luminotécnico |
| 7 | Calculator.jsx | Acesso à calculadora luminotécnica (app.enerlight.com.br) |
| 8 | Products.jsx | Luminárias em destaque e catálogo |
| 9 | Catalogs.jsx | Catálogos oficiais para consulta e download |
| 10 | Projects.jsx | Portfólio de obras |
| 11 | About.jsx | Quem somos |
| 12 | University.jsx | Universidade Enerlight e treinamento |
| 13 | Contact.jsx | Faixa de orçamento, endereço, telefone e SAC |
| 14 | Articles.jsx | Artigos sobre IRC, IP e garantia |

A ordem fica em `app/page.jsx`. Os estilos estão organizados por seção em `app/globals.css`. As imagens ficam em `public/images`. A logo e a luminária vieram dos arquivos enviados. As fotos do Maracanã, Galpão Susman e Posto Chiesa JK e as logos das marcas vieram do site institucional. A foto de Rio Preto veio do catálogo de iluminação pública da Enerlight e mostra a alça Jordão Reis. O slide de atacado está identificado como ilustrativo até receber uma foto da obra. As fotos dos cards de segmentos e da fachada também são ilustrativas. Os ícones, curvas de luz e fundos são independentes das fotografias. O site respeita a configuração de movimento reduzido.

Os contatos e o catálogo foram conferidos no site institucional em https://enerlight.com.br/.


## Universidade Enerlight

Defina `ENERLIGHT_EAD_URL` nas variáveis de ambiente do Easypanel com a URL HTTPS de login do EAD. A rota `/universidade` redireciona para esse endereço. Sem a variável, o visitante pode solicitar acesso pelo atendimento e abrir a central pública de treinamentos. A calculadora luminotécnica abre a ferramenta oficial em https://app.enerlight.com.br/calculadora-luminotecnica.

Os PDFs oficiais ficam em `public/catalogos` e as capas ficam em `public/images/catalogos`.

Os 22 logotipos são os exibidos no site oficial da Enerlight. A imagem da engenheira é ilustrativa, e os produtos em destaque usam imagens dos catálogos oficiais.

## SEO e compartilhamento

O endereço público usado no sitemap (`/sitemap.xml`), no `robots.txt`, no endereço oficial de cada página e nos cartões de compartilhamento vem da variável `SITE_URL` (padrão: `https://www.enerlight.com.br`). Se o domínio mudar, defina `SITE_URL` no Easypanel e faça um novo deploy.

A imagem de compartilhamento fica em `public/og/enerlight.jpg` (1200×630). Os dados da empresa para o Google (endereço, telefone, e-mail) ficam em `lib/seo.js`.

As imagens do site estão em WebP, no tamanho em que são exibidas. Ao adicionar fotos novas, prefira WebP com no máximo 1600px de largura.
