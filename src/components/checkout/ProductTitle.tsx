import { Star } from "lucide-react";

const ProductTitle = () => {
  return (
    <div className="px-4 space-y-2">
      <h1 className="text-base font-bold text-foreground leading-tight">
        Lava Louças Portátil Semi Automática — Prática, Eficiente, Fácil de Usar e Guardar
      </h1>
      <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
        <div className="flex items-center gap-0.5">
          <Star className="w-4 h-4 fill-star text-star" />
          <span className="font-semibold text-foreground">4.7</span>
          <span>(207)</span>
        </div>
        <span>•</span>
        <span>4.473 vendidos</span>
      </div>
      <div className="flex items-center gap-1 text-xs text-primary font-medium">
        <span className="text-primary">🔥</span>
        1.2K+ pessoas compraram nos últimos 3 dias
      </div>
    </div>
  );
};

export default ProductTitle;
