import { Bookmark, ChevronRight, Mail, ReceiptText, Zap } from "lucide-react";
import { useFlashOffer } from "@/contexts/FlashOfferContext";
import { useProduct } from "@/contexts/ProductContext";

const formatBRL = (n: number) => n.toFixed(2).replace(".", ",");

const PriceSection = () => {
  const product = useProduct();
  const { current, original, installments, discountLabel } = product.price;
  const discount =
    discountLabel ??
    `-${Math.round(((original - current) / original) * 100)}%`;
  const installmentValue = installments ? current / installments : 0;

  const { seconds: totalSeconds } = useFlashOffer();
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="space-y-2.5">
      <div className="bg-gradient-to-r from-red-600 to-orange-500 px-3 py-2.5">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 gap-y-1">
          <div className="flex min-w-0 items-center gap-1.5">
            <span className="rounded-sm bg-black/25 px-1.5 py-1 text-[11px] font-bold leading-none text-white">
              {discount}
            </span>
            <span className="whitespace-nowrap text-[11px] leading-none text-white/90">A partir de R$</span>
            <span className="whitespace-nowrap text-[2rem] font-extrabold leading-none tracking-[-0.04em] text-white">
              {formatBRL(current)}
            </span>
            <Mail className="h-3.5 w-3.5 shrink-0 text-white/85" />
          </div>

          <div className="flex items-center justify-end gap-1 self-center">
            <Zap className="h-3 w-3 fill-current text-white" />
            <span className="whitespace-nowrap text-[11px] font-bold leading-none text-white">
              Oferta Relâmpago
            </span>
          </div>

          <span className="pl-0.5 text-[11px] leading-none text-white/75 line-through">
            R$ {formatBRL(original)}
          </span>

          <div className="flex items-center justify-end gap-1">
            <span className="text-[10px] leading-none text-white/90">Termina em</span>
            <span className="rounded bg-black/30 px-1.5 py-[3px] text-[11px] font-bold leading-none text-white">{pad(hrs)}</span>
            <span className="text-[10px] font-bold leading-none text-white">:</span>
            <span className="rounded bg-black/30 px-1.5 py-[3px] text-[11px] font-bold leading-none text-white">{pad(mins)}</span>
            <span className="text-[10px] font-bold leading-none text-white">:</span>
            <span className="rounded bg-black/30 px-1.5 py-[3px] text-[11px] font-bold leading-none text-white">{pad(secs)}</span>
          </div>
        </div>
      </div>

      {installments && installments > 1 && (
        <div className="flex items-center gap-1 px-4 text-[13px] text-muted-foreground">
          <ReceiptText className="h-3.5 w-3.5 shrink-0" />
          <span>
            {installments}x <strong className="text-foreground">R$ {formatBRL(installmentValue)}</strong> sem juros
          </span>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          <Bookmark className="h-4 w-4 shrink-0 ml-auto text-muted-foreground" />
        </div>
      )}
    </div>
  );
};

export default PriceSection;
