import { Link } from "react-router-dom";
import { Settings } from "lucide-react";
import { getAllProducts } from "@/lib/productStore";
import ProductLayout from "@/components/checkout/ProductLayout";

const Home = () => {
  const products = getAllProducts();
  const product = products[0];

  if (!product) {
    return (
      <div className="max-w-lg mx-auto bg-background min-h-screen p-6 text-center space-y-3">
        <h1 className="text-lg font-bold text-foreground">Nenhum produto cadastrado</h1>
        <Link to="/admin" className="text-primary text-sm underline">
          Ir para o painel
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <Link
        to="/admin"
        aria-label="Painel"
        className="fixed top-3 right-3 z-[60] flex items-center gap-1 text-xs bg-background/90 backdrop-blur border border-border rounded-full px-3 py-1.5 text-foreground hover:bg-muted transition-colors shadow-sm"
      >
        <Settings className="w-3.5 h-3.5" />
        Painel
      </Link>
      <ProductLayout product={product} />
    </div>
  );
};

export default Home;
