import { BadgeCheck } from "lucide-react";

const StoreInfo = () => {
  return (
    <div className="mx-4 border border-border rounded-lg p-4 flex items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-lg font-bold text-muted-foreground">
        P
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className="font-semibold text-sm text-foreground">Praxis Eletrodomésticos</span>
          <BadgeCheck className="w-4 h-4 text-primary" />
        </div>
        <p className="text-xs text-muted-foreground">Loja Verificada</p>
        <p className="text-xs text-muted-foreground">● 706 produtos • 100% recomenda</p>
      </div>
      <button className="text-xs border border-primary text-primary px-3 py-1.5 rounded-full font-medium hover:bg-primary/5 transition-colors">
        + Seguir
      </button>
    </div>
  );
};

export default StoreInfo;
