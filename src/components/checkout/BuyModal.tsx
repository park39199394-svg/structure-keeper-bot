import { useState } from "react";
import { X, Minus, Plus, Check } from "lucide-react";
import lavaPreta from "@/assets/lava-preta.jpg";
import lavaBranca from "@/assets/lava-branca.jpg";
import produtoYpe from "@/assets/produto-ype.jpg";
import produtoFinishSecante from "@/assets/produto-finish-secante.jpg";
import produtoFinishAdvanced from "@/assets/produto-finish-advanced.jpg";

interface BuyModalProps {
  open: boolean;
  onClose: () => void;
}

const colors = [
  { id: "preta", label: "Preta", hex: "#1a1a1a" },
  { id: "branca", label: "Branca", hex: "#f5f5f5" },
];

const extras = [
  {
    id: "ype",
    name: "Detergente Ypê 3 em 1 - 1kg",
    price: 29.9,
    image: produtoYpe,
  },
  {
    id: "finish-secante",
    name: "Finish Secante - 250ml",
    price: 34.9,
    image: produtoFinishSecante,
  },
  {
    id: "finish-advanced",
    name: "Finish Advanced Refil - 700g",
    price: 39.9,
    image: produtoFinishAdvanced,
  },
];

const BuyModal = ({ open, onClose }: BuyModalProps) => {
  const [selectedColor, setSelectedColor] = useState("preta");
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  if (!open) return null;

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const basePrice = 128.99;
  const extrasTotal = extras
    .filter((e) => selectedExtras.includes(e.id))
    .reduce((sum, e) => sum + e.price, 0);
  const total = basePrice * quantity + extrasTotal;

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

          {/* Quantity */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Quantidade
            </h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-base font-semibold w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-background border-t border-border p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-lg font-bold text-foreground">
              R$ {total.toFixed(2).replace(".", ",")}
            </span>
          </div>
          <button
            onClick={() => {
              const params = new URLSearchParams();
              params.set("productId", selectedColor === "preta" ? "0b337f97-7034-4bc9-a578-a8eff9b30b01" : "5e65e1f4-3b39-4c80-9b0c-0ff5e766a8f1");
              params.set("color", selectedColor);
              params.set("qty", String(quantity));
              if (selectedExtras.length > 0) {
                params.set("extras", selectedExtras.join(","));
              }
              const extrasData = extras
                .filter((e) => selectedExtras.includes(e.id))
                .map((e) => ({ id: e.id, name: e.name, price: e.price }));
              if (extrasData.length > 0) {
                params.set("extrasData", JSON.stringify(extrasData));
              }
              params.set("total", total.toFixed(2));
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
