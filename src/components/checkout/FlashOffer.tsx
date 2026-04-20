import { Zap } from "lucide-react";
import { useFlashOffer } from "@/contexts/FlashOfferContext";

const FlashOffer = () => {
  const { seconds } = useFlashOffer();

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const timeStr = `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <span className="flex items-center gap-1 bg-sale text-sale-foreground text-xs font-bold px-2 py-1 rounded">
        <Zap className="w-3 h-3 fill-current" />
        Oferta Relâmpago
      </span>
      <span className="text-sale font-bold text-sm font-mono">{timeStr}</span>
    </div>
  );
};

export default FlashOffer;
