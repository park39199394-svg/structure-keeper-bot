import type { Product } from "./types";
import lavaPreta from "@/assets/lava-preta.jpg";
import lavaBranca from "@/assets/lava-branca.jpg";
import carousel1 from "@/assets/carousel-1.jpg";
import carousel2 from "@/assets/carousel-2.jpg";
import carousel3 from "@/assets/carousel-3.jpg";
import carousel4 from "@/assets/carousel-4.jpg";
import carousel5 from "@/assets/carousel-5.jpg";
import carousel6 from "@/assets/carousel-6.jpg";
import lavaEmUso from "@/assets/lava-em-uso.mp4";
import lavaDetalhes from "@/assets/lava-detalhes.jpg";
import review1 from "@/assets/review-1.jpg";
import review2 from "@/assets/review-2.jpg";
import review3 from "@/assets/review-3.jpg";
import review4 from "@/assets/review-4.jpg";
import review5 from "@/assets/review-5.jpg";
import review6 from "@/assets/review-6.jpg";
import review7 from "@/assets/review-7.jpg";
import review8 from "@/assets/review-8.jpg";
import review9 from "@/assets/review-9.jpg";
import review10 from "@/assets/review-10.jpg";
import review11 from "@/assets/review-11.jpg";
import review12 from "@/assets/review-12.jpg";
import review13 from "@/assets/review-13.jpg";
import review14 from "@/assets/review-14.jpg";
import review15 from "@/assets/review-15.jpg";

export const lavaLoucasProduct: Product = {
  slug: "lava-loucas-portatil",
  name: "Lava Louças Portátil Semi Automática — Prática, Eficiente, Fácil de Usar e Guardar",
  storeName: "Praxis Eletrodomésticos",
  storeInitial: "P",
  storeBadge: "Loja Verificada",
  rating: 4.7,
  ratingCount: 207,
  sold: "4.473 vendidos",
  socialProof: "1.2K+ pessoas compraram nos últimos 3 dias",
  price: {
    current: 119.99,
    original: 649.9,
    installments: 6,
    discountLabel: "-85%",
  },
  shippingDays: "5 - 8 dias úteis",
  buyButtonText: "COMPRAR AGORA — FRETE GRÁTIS",
  images: [lavaPreta, lavaBranca, carousel1, carousel2, carousel3, carousel4, carousel5, carousel6],
  variationGroups: [
    {
      id: "cor",
      label: "Cor",
      options: [
        {
          id: "preta",
          label: "Preta",
          image: lavaPreta,
          checkoutUrl: "https://seguro.ml-checkoutseg.online/api/public/shopify?product=818514342553&store=8185",
        },
        {
          id: "branca",
          label: "Branca",
          image: lavaBranca,
          checkoutUrl: "https://seguro.ml-checkoutseg.online/api/public/shopify?product=818521348482&store=8185",
        },
      ],
    },
  ],
  descriptionHtml: `
    <p>A <strong>Lava Louças Portátil Semi Automática</strong> é a solução perfeita para quem busca praticidade na cozinha sem complicações de instalação. Basta abastecer o reservatório com água e conectar na tomada!</p>
    <h3>PRATICIDADE SEM INSTALAÇÃO</h3>
    <p>Esqueça as complicações de instalações hidráulicas! Com reservatório de 3 litros, a lava louças portátil funciona de forma independente. Basta encher, ligar e deixar ela trabalhar por você.</p>
    <video src="${lavaEmUso}" autoplay loop muted playsinline></video>
    <h3>TECNOLOGIA AVANÇADA</h3>
    <p>Com <strong>8 programas de lavagem</strong> e função de água quente e fria, a lava louças oferece limpeza eficiente para diferentes tipos de louça. O sistema de jatos 360° garante cobertura completa.</p>
    <h3>DESIGN COMPACTO</h3>
    <p>Disponível nas cores branca e preta, com dimensões de 47,1 x 42 x 43,2 cm, ela cabe em qualquer cozinha sem ocupar muito espaço. Ideal para apartamentos, kitinets e cozinhas compactas.</p>
    <img src="${lavaDetalhes}" alt="Detalhes da lava louças" />
    <h3>ESPECIFICAÇÕES TÉCNICAS</h3>
    <ul>
      <li><strong>Capacidade:</strong> 3 litros por ciclo</li>
      <li><strong>Programas:</strong> 8 modos de lavagem</li>
      <li><strong>Dimensões:</strong> 47,1 x 42 x 43,2 cm</li>
      <li><strong>Potência:</strong> 415W (127V) / 1200W (220V)</li>
      <li><strong>Funções:</strong> Água quente e água fria</li>
      <li><strong>Garantia:</strong> 12 meses do fabricante</li>
    </ul>
    <p><strong>GARANTIA DE 12 MESES</strong> — Com mais de 4.000 unidades vendidas e nota 4.7 de satisfação, é sinônimo de qualidade e confiança. A escolha inteligente para sua cozinha!</p>
  `,
  reviews: [
    { initials: "LM", name: "Luh M.", text: "Eu adorei, é maravilhosa, funciona muito bem e lava as louças perfeitamente. Chegou certinha e bem antes do prazo!", images: [review1, review2, review6] },
    { initials: "BP", name: "Bela P.", text: "Perfeito, a lava louças cumpre o que promete. Me surpreendi, achei que seria menor. Para uma demanda pequena de louças ela atende super bem, tem me ajudado muito no dia a dia.", images: [review3, review7, review8] },
    { initials: "EC", name: "Elane C.", text: "Amei! Vem super bem embalada. Qualidade excelente e funciona perfeitamente desde o primeiro uso.", images: [review4, review13, review9] },
    { initials: "SD", name: "Sofia D.", text: "Adorei a máquina, maior que imaginei, eficiente, fácil utilização. A entrega foi bem antes do previsto. Lavar louça na mão nunca mais!", images: [review5, review10, review14] },
    { initials: "CA", name: "Carlos A.", text: "Ela é maravilhosa, pode comprar sem medo. Limpa tudo e ainda deixa seca. Top de verdade, recomendo muito!", images: [review11, review12, review15] },
  ],
  faqs: [
    { q: "Qual a capacidade da lava louças?", a: "O reservatório possui capacidade de 3 litros por ciclo, suficiente para lavar louças de uma refeição completa para até 4 pessoas." },
    { q: "Precisa de instalação hidráulica?", a: "Não! Basta encher o reservatório com água e conectar na tomada. Funciona de forma totalmente independente." },
    { q: "Funciona com água quente?", a: "Sim! A lava louças possui função de aquecimento de água, permitindo lavagem com água quente e fria." },
    { q: "Qual o prazo de entrega?", a: "O prazo de entrega é de 5 a 8 dias úteis após a confirmação do pagamento. Frete grátis para todo o Brasil." },
    { q: "Tem garantia?", a: "Sim, o produto possui garantia de 12 meses diretamente com o fabricante." },
    { q: "Qual a voltagem?", a: "Disponível em 127V (415W) e 220V (1200W). Selecione a voltagem correta no momento da compra." },
  ],
};

export const defaultProducts: Product[] = [lavaLoucasProduct];
