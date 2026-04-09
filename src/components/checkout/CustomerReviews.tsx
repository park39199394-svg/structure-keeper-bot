import { Star } from "lucide-react";

const reviews = [
  {
    initials: "LM",
    name: "Luh M.",
    text: "Eu adorei, é maravilhosa, funciona muito bem e lava as louças perfeitamente. Chegou certinha e bem antes do prazo!",
    images: [
      "https://checkout-seg.lovable.app/assets/lava-review-1-GWt1no3_.jpg",
      "https://checkout-seg.lovable.app/assets/lava-review-2-C3jy2Cyc.jpg",
      "https://checkout-seg.lovable.app/assets/lava-review-3-K-W7DZee.jpg",
    ],
  },
  {
    initials: "BP",
    name: "Bela P.",
    text: "Perfeito, a lava louças cumpre o que promete. Me surpreendi, achei que seria menor. Para uma demanda pequena de louças ela atende super bem, tem me ajudado muito no dia a dia.",
    images: [
      "https://checkout-seg.lovable.app/assets/lava-review2-1-tLzYhde7.jpg",
      "https://checkout-seg.lovable.app/assets/lava-review2-2-eA2dJJ87.jpg",
      "https://checkout-seg.lovable.app/assets/lava-review2-3-DE_VQ94z.jpg",
    ],
  },
  {
    initials: "EC",
    name: "Elane C.",
    text: "Amei! Vem super bem embalada. Qualidade excelente e funciona perfeitamente desde o primeiro uso.",
    images: ["https://checkout-seg.lovable.app/assets/lava-review3-1-BLdi1-L3.jpg"],
  },
  {
    initials: "SD",
    name: "Sofia D.",
    text: "Adorei a máquina, maior que imaginei, eficiente, fácil utilização. A entrega foi bem antes do previsto. Lavar louça na mão nunca mais!",
    images: ["https://checkout-seg.lovable.app/assets/lava-review4-1-BTaayEHl.jpg"],
  },
  {
    initials: "CA",
    name: "Carlos A.",
    text: "Ela é maravilhosa, pode comprar sem medo. Limpa tudo e ainda deixa seca. Top de verdade, recomendo muito!",
    images: [
      "https://checkout-seg.lovable.app/assets/lava-review5-1-15b_MnMb.jpg",
      "https://checkout-seg.lovable.app/assets/lava-review5-2-DAtQUjdr.jpg",
      "https://checkout-seg.lovable.app/assets/lava-review5-3-R24iYFRj.jpg",
    ],
  },
];

const CustomerReviews = () => {
  return (
    <div className="px-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">Avaliações dos clientes (207)</h2>
        <div className="flex items-center gap-1">
          <Star className="w-5 h-5 fill-star text-star" />
          <span className="font-bold text-foreground">4.7</span>
          <span className="text-muted-foreground text-sm">/5</span>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review, i) => (
          <div key={i} className="border-b border-border pb-4 last:border-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                {review.initials}
              </div>
              <span className="text-sm font-semibold text-foreground">{review.name}</span>
              <div className="flex ml-auto">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3 h-3 fill-star text-star" />
                ))}
              </div>
            </div>
            <p className="text-sm text-foreground leading-relaxed">{review.text}</p>
            {review.images.length > 0 && (
              <div className="flex gap-2 mt-2 overflow-x-auto">
                {review.images.map((img, j) => (
                  <img
                    key={j}
                    src={img}
                    alt="Foto do produto"
                    className="w-20 h-20 rounded-md object-cover flex-shrink-0"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        <button className="text-xs border border-border rounded-full px-3 py-1.5 text-foreground hover:bg-muted transition-colors">
          📸 Inclui imagens (52)
        </button>
        <button className="text-xs border border-border rounded-full px-3 py-1.5 text-foreground hover:bg-muted transition-colors">
          5 ⭐ (155)
        </button>
        <button className="text-xs border border-border rounded-full px-3 py-1.5 text-foreground hover:bg-muted transition-colors">
          4 ⭐ (22)
        </button>
      </div>
    </div>
  );
};

export default CustomerReviews;
