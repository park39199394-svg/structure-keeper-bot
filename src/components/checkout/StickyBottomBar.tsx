import { Home, MessageCircle, ShoppingCart } from "lucide-react";

const StickyBottomBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border flex items-center px-3 py-2 gap-2 z-50">
      <button className="flex flex-col items-center justify-center px-3 py-1 text-muted-foreground">
        <Home className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Loja</span>
      </button>
      <button className="flex flex-col items-center justify-center px-3 py-1 text-muted-foreground">
        <MessageCircle className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Chat</span>
      </button>
      <button className="flex-1 flex items-center justify-center gap-2 border border-border rounded-full py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors">
        <ShoppingCart className="w-4 h-4" />
        Adicionar ao carrinho
      </button>
      <button className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity">
        COMPRAR AGORA
      </button>
    </div>
  );
};

export default StickyBottomBar;
