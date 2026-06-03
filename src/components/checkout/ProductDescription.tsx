import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useProduct } from "@/contexts/ProductContext";

const ProductDescription = () => {
  const product = useProduct();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="px-4 space-y-4">
      <h2 className="text-lg font-bold text-foreground">Descrição do produto</h2>

      <div
        className={`product-description space-y-3 overflow-hidden transition-all ${expanded ? "max-h-none" : "max-h-60"}`}
        dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
      />

      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="flex items-center gap-1 text-primary text-sm font-medium"
        >
          Ver mais <ChevronDown className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default ProductDescription;
