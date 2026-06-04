import { ChevronRight, LayoutGrid } from "lucide-react";
import { useProduct } from "@/contexts/ProductContext";

interface VariationRowProps {
  onClick?: () => void;
}

const VariationRow = ({ onClick }: VariationRowProps) => {
  const product = useProduct();
  const groups = product.variationGroups ?? [];
  if (!groups.length) return null;

  const thumbs = groups
    .flatMap((g) => g.options)
    .filter((o) => !!o.image)
    .slice(0, 2);

  return (
    <button
      onClick={onClick}
      className="mx-4 flex w-[calc(100%-2rem)] items-center gap-2 border border-border rounded-lg p-3 text-left hover:bg-muted/40 transition-colors"
    >
      <LayoutGrid className="w-4 h-4 text-muted-foreground shrink-0" />
      <div className="flex gap-1 shrink-0">
        {thumbs.map((t, i) => (
          <img
            key={i}
            src={t.image}
            alt={t.label}
            className="w-6 h-6 rounded object-cover border border-border"
          />
        ))}
      </div>
      <span className="text-sm text-foreground ml-1">Selecionar opções</span>
      <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto shrink-0" />
    </button>
  );
};

export default VariationRow;
