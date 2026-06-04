import { Star } from "lucide-react";
import { useProduct } from "@/contexts/ProductContext";

const CustomerReviews = () => {
  const product = useProduct();
  const reviews = product.reviews;
  const totalImages = reviews.reduce((sum, r) => sum + r.images.length, 0);

  return (
    <div className="px-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-foreground">
          Avaliações dos clientes ({product.ratingCount})
        </h2>
        <button className="text-xs text-primary font-medium flex items-center gap-0.5">
          Ver mais ›
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-4xl font-bold text-foreground leading-none">
          {product.rating}
        </span>
        <div className="flex flex-col gap-0.5">
          <div className="flex">
            {[...Array(5)].map((_, j) => (
              <Star key={j} className="w-4 h-4 fill-star text-star" />
            ))}
          </div>
          <span className="text-[11px] text-muted-foreground">de 5</span>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review, i) => (
          <div key={i} className="border-b border-border pb-4 last:border-0">
            <div className="flex items-start gap-3 mb-2">
              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                {review.initials}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">{review.name}</span>
                <span className="text-[11px] text-muted-foreground">
                  {review.date ?? "2026-08-03 14:32"}
                </span>
              </div>
            </div>
            <div className="flex mb-1.5">
              {[...Array(review.rating ?? 5)].map((_, j) => (
                <Star key={j} className="w-3.5 h-3.5 fill-star text-star" />
              ))}
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

      {totalImages > 0 && (
        <div className="flex gap-2 flex-wrap">
          <button className="text-xs border border-border rounded-full px-3 py-1.5 text-foreground hover:bg-muted transition-colors">
            📸 Inclui imagens ({totalImages})
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;
