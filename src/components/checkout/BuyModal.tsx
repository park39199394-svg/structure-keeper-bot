import { useState } from "react";
import { X, Check } from "lucide-react";
import lavaPreta from "@/assets/lava-preta.jpg";
import lavaBranca from "@/assets/lava-branca.jpg";

interface BuyModalProps {
  open: boolean;
  onClose: () => void;
}

const colors = [
  { id: "preta", label: "Preta", hex: "#1a1a1a" },
  { id: "branca", label: "Branca", hex: "#f5f5f5" },
];

const BuyModal = ({ open, onClose }: BuyModalProps) => {
  const [selectedColor, setSelectedColor] = useState("preta");

  if (!open) return null;

  const basePrice = 128.99;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/60 animate-in fade-in-0"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-background rounded-t-2xl animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background z-10 flex items-center justify-between p-4 border-b border-border">
          <span className="font-semibold text-foreground text-base">
            Escolha suas opções
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Product Image */}
          <div className="flex justify-center">
            <img
              src={selectedColor === "preta" ? lavaPreta : lavaBranca}
              alt={`Lava Louça ${selectedColor === "preta" ? "Preta" : "Branca"}`}
              className="w-48 h-48 object-contain rounded-xl"
            />
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Cor da Lava Louça
            </h3>
            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full border-2 transition-all text-sm font-medium ${
                    selectedColor === color.id
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-border text-muted-foreground hover:border-muted-foreground"
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full border border-border shrink-0"
                    style={{ backgroundColor: color.hex }}
                  />
                  {color.label}
                  {selectedColor === color.id && (
                    <Check className="w-4 h-4 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-background border-t border-border p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-lg font-bold text-foreground">
              R$ {basePrice.toFixed(2).replace(".", ",")}
            </span>
          </div>
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
