import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useProduct } from "@/contexts/ProductContext";

const ImageCarousel = () => {
  const product = useProduct();
  const images = product.images;
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  if (!images.length) return null;

  return (
    <div className="relative w-full bg-background">
      <div
        className="relative aspect-square overflow-hidden"
        onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const diff = touchStartX.current - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
        }}
      >
        <img
          src={images[current]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center shadow-md"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center shadow-md"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-foreground/60 text-primary-foreground text-xs px-2 py-0.5 rounded-full">
          {current + 1}/{images.length}
        </div>
      </div>
      <div className="flex gap-1.5 p-3 overflow-x-auto">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-14 h-14 rounded-md overflow-hidden flex-shrink-0 border-2 transition-colors ${
              i === current ? "border-primary" : "border-transparent"
            }`}
          >
            <img src={img} alt={`Imagem ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
