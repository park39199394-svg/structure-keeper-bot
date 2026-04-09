import { Truck } from "lucide-react";

const ShippingInfo = () => {
  return (
    <div className="mx-4 border border-border rounded-lg p-3 space-y-2">
      <div className="flex items-center gap-2">
        <Truck className="w-4 h-4 text-success" />
        <span className="text-sm font-semibold text-success">Frete grátis</span>
      </div>
      <p className="text-sm text-foreground">
        Receba em <strong>5 - 8 dias úteis</strong>
      </p>
      <div className="text-xs text-muted-foreground">
        Taxa de envio: <span className="line-through">R$ 29,90</span>
        <span className="text-success font-semibold ml-1">Grátis</span>
      </div>
    </div>
  );
};

export default ShippingInfo;
