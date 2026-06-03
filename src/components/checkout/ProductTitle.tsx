import { Star } from "lucide-react";
import { useProduct } from "@/contexts/ProductContext";

const ProductTitle = () => {
  const product = useProduct();
  return (
    <div className="px-4 space-y-2">
      <h1 className="text-base font-bold text-foreground leading-tight">
        {product.name}
      </h1>
      <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
        <div className="flex items-center gap-0.5">
          <Star className="w-4 h-4 fill-star text-star" />
          <span className="font-semibold text-foreground">{product.rating}</span>
          <span>({product.ratingCount})</span>
        </div>
        <span>•</span>
        <span>{product.sold}</span>
      </div>
      {product.socialProof && (
        <div className="flex items-center gap-1 text-xs text-primary font-medium">
          <span className="text-primary">🔥</span>
          {product.socialProof}
        </div>
      )}
    </div>
  );
};

export default ProductTitle;
