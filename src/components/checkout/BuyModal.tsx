import { useMemo, useState } from "react";
import { X, Zap, Truck, Shield } from "lucide-react";
import { useFlashOffer } from "@/contexts/FlashOfferContext";
import { useProduct } from "@/contexts/ProductContext";

interface BuyModalProps {
  open: boolean;
  onClose: () => void;
}

const BuyModal = ({ open, onClose }: BuyModalProps) => {
  const product = useProduct();
  const groups = product.variationGroups ?? [];

  const initialSelection = useMemo(() => {
    const s: Record<string, string> = {};
    for (const g of groups) if (g.options[0]) s[g.id] = g.options[0].id;
    return s;
  }, [groups]);

  const [selection, setSelection] = useState<Record<string, string>>(initialSelection);
  const { seconds: totalSeconds } = useFlashOffer();

  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  if (!open) return null;

  const originalPrice = product.price.original;
  const basePrice = product.price.current;
  const discount =
    product.price.discountLabel?.replace("-", "").replace("%", "") ||
    Math.round(((originalPrice - basePrice) / originalPrice) * 100).toString();

  const previewImage =
    groups
      .map((g) => g.options.find((o) => o.id === selection[g.id]))
      .find((o) => o?.image)?.image ?? product.images[0];

  const checkoutUrl = (() => {
    for (let i = groups.length - 1; i >= 0; i--) {
      const opt = groups[i].options.find((o) => o.id === selection[groups[i].id]);
      if (opt?.checkoutUrl) return opt.checkoutUrl;
    }
    return "";
  })();

  const buttonLabel = product.buyButtonText || "COMPRAR AGORA — FRETE GRÁTIS";

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center">
      <div className="absolute inset-0 bg-black/60 animate-in fade-in-0" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-background rounded-t-2xl animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-background z-10 border-b border-border">
          <div className="flex items-start gap-3 p-4">
            <img src={previewImage} alt="Produto" className="w-16 h-16 object-contain rounded-lg border border-border" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-destructive text-destructive-foreground text-xs font-bold px-2 py-0.5 rounded">-{discount}%</span>
                <span className="text-lg font-bold text-foreground">R$ {basePrice.toFixed(2).replace(".", ",")}</span>
              </div>
              <span className="text-xs text-muted-foreground line-through">R$ {originalPrice.toFixed(2).replace(".", ",")}</span>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded font-medium">
                  <Truck className="w-3 h-3" /> Frete grátis
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded font-medium">
                  <Shield className="w-3 h-3" /> Desconto de {discount}%
                </span>
              </div>
            </div>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-muted transition-colors shrink-0">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <div className="bg-gradient-to-r from-red-600 to-orange-500 px-4 py-2.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-white text-sm font-bold">
              <Zap className="w-4 h-4" /> Oferta Relâmpago
            </span>
            <div className="flex items-center gap-1 text-white text-sm font-bold">
              <span>Termina em</span>
              <span className="bg-black/30 rounded px-1.5 py-0.5 min-w-[28px] text-center">{String(hrs).padStart(2, "0")}</span>
              <span>:</span>
              <span className="bg-black/30 rounded px-1.5 py-0.5 min-w-[28px] text-center">{String(mins).padStart(2, "0")}</span>
              <span>:</span>
              <span className="bg-black/30 rounded px-1.5 py-0.5 min-w-[28px] text-center">{String(secs).padStart(2, "0")}</span>
            </div>
          </div>
        </div>

        {groups.length > 0 && (
          <div className="p-4 space-y-5">
            {groups.map((group) => (
              <div key={group.id}>
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  {group.label}{group.options.length > 1 ? ` (${group.options.length})` : ""}
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {group.options.map((opt) => {
                    const selected = selection[group.id] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setSelection((s) => ({ ...s, [group.id]: opt.id }))}
                        className={`relative flex flex-col items-center gap-2 rounded-xl overflow-hidden border-2 transition-all ${
                          selected ? "border-primary" : "border-border hover:border-muted-foreground"
                        }`}
                        style={{ width: opt.image ? "calc(50% - 6px)" : "auto" }}
                      >
                        {opt.image ? (
                          <div className="relative w-full aspect-square bg-muted">
                            <img src={opt.image} alt={opt.label} className="w-full h-full object-contain p-2" />
                            {selected && (
                              <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="px-4 py-2 text-sm font-medium">{opt.label}</span>
                        )}
                        {opt.image && <span className="text-xs font-medium text-foreground pb-2">{opt.label}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="sticky bottom-0 bg-background border-t border-border p-4">
          <button
            onClick={() => { if (checkoutUrl) window.open(checkoutUrl, "_blank"); }}
            className="w-full bg-primary text-primary-foreground py-3.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyModal;
