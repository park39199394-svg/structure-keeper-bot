import { ChevronRight, Truck } from "lucide-react";
import { useProduct } from "@/contexts/ProductContext";

const ShippingInfo = () => {
  const product = useProduct();
  return (
    <div className="mx-4 border border-border rounded-lg p-3 flex items-center gap-2">
      <Truck className="w-4 h-4 text-success shrink-0" />
      <span className="text-sm font-semibold text-success">Frete grátis</span>
      <span className="text-sm text-foreground">
        Receba em <strong>{product.shippingDays ?? "5 - 8 dias úteis"}</strong>
      </span>
      <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto shrink-0" />
    </div>
  );
};

export default ShippingInfo;
