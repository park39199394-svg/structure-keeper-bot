import { useState, useEffect } from "react";
import { X, Zap, Truck, Shield } from "lucide-react";
import lavaPreta from "@/assets/lava-preta.jpg";
import lavaBranca from "@/assets/lava-branca.jpg";

interface BuyModalProps {
  open: boolean;
  onClose: () => void;
}

const colorOptions = [
  { id: "preta", label: "Preta", image: lavaPreta },
  { id: "branca", label: "Branca", image: lavaBranca },
];

const BuyModal = ({ open, onClose }: BuyModalProps) => {
  const [selectedColor, setSelectedColor] = useState("preta");
  const [countdown, setCountdown] = useState({ minutes: 0, seconds: 7, ms: 37 });

  useEffect(() => {
    if (!open) return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        let { minutes, seconds, ms } = prev;
        ms--;
        if (ms < 0) { ms = 99; seconds--; }
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) return { minutes: 0, seconds: 0, ms: 0 };
        return { minutes, seconds, ms };
      });
    }, 100);
    return () => clearInterval(interval);
  }, [open]);

  if (!open) return null;

  const originalPrice = 479.99;
  const basePrice = 128.99;
  const discount = Math.round(((originalPrice - basePrice) / originalPrice) * 100);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/60 animate-in fade-in-0"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-background rounded-t-2xl animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto">
        {/* Header with product info */}
        <div className="sticky top-0 bg-background z-10 border-b border-border">
          <div className="flex items-start gap-3 p-4">
            <img
              src={selectedColor === "preta" ? lavaPreta : lavaBranca}
              alt="Produto"
              className="w-16 h-16 object-contain rounded-lg border border-border"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-destructive text-destructive-foreground text-xs font-bold px-2 py-0.5 rounded">
                  -{discount}%
                </span>
                <span className="text-lg font-bold text-foreground">
                  R$ {basePrice.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <span className="text-xs text-muted-foreground line-through">
                R$ {originalPrice.toFixed(2).replace(".", ",")}
              </span>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded font-medium">
                  <Truck className="w-3 h-3" /> Frete grátis
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded font-medium">
                  <Shield className="w-3 h-3" /> Desconto de {discount}%
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-muted transition-colors shrink-0"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Flash offer banner */}
          <div className="bg-gradient-to-r from-red-600 to-orange-500 px-4 py-2.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-white text-sm font-bold">
              <Zap className="w-4 h-4" /> Oferta Relâmpago
            </span>
            <div className="flex items-center gap-1 text-white text-sm font-bold">
              <span>Termina em</span>
              <span className="bg-black/30 rounded px-1.5 py-0.5 min-w-[28px] text-center">
                {String(countdown.minutes).padStart(2, "0")}
              </span>
              <span>:</span>
              <span className="bg-black/30 rounded px-1.5 py-0.5 min-w-[28px] text-center">
                {String(countdown.seconds).padStart(2, "0")}
              </span>
              <span>:</span>
              <span className="bg-black/30 rounded px-1.5 py-0.5 min-w-[28px] text-center">
                {String(countdown.ms).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Color Selection with images */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Cor ({colorOptions.length})
            </h3>
            <div className="flex gap-3">
              {colorOptions.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color.id)}
                  className={`relative flex flex-col items-center gap-2 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedColor === color.id
                      ? "border-primary"
                      : "border-border hover:border-muted-foreground"
                  }`}
                  style={{ width: "calc(50% - 6px)" }}
                >
                  <div className="relative w-full aspect-square bg-muted">
                    <img
                      src={color.image}
                      alt={color.label}
                      className="w-full h-full object-contain p-2"
                    />
                    {selectedColor === color.id && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-medium text-foreground pb-2">
                    {color.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-background border-t border-border p-4">
          <button
            onClick={() => {
              const params = new URLSearchParams();
              params.set("productId", selectedColor === "preta" ? "0b337f97-7034-4bc9-a578-a8eff9b30b01" : "5e65e1f4-3b39-4c80-9b0c-0ff5e766a8f1");
              params.set("color", selectedColor);
              params.set("qty", "1");
              params.set("total", basePrice.toFixed(2));
              window.open(`https://checkout-seg.lovable.app/checkout?${params.toString()}`, "_blank");
            }}
            className="w-full bg-primary text-primary-foreground py-3.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
          >
            COMPRAR AGORA — FRETE GRÁTIS
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyModal;
