import { Link } from "react-router-dom";
import { Star, Settings } from "lucide-react";
import { getAllProducts } from "@/lib/productStore";

const Home = () => {
  const products = getAllProducts();

  return (
    <div className="max-w-lg mx-auto bg-background min-h-screen">
      <header className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h1 className="text-lg font-bold text-foreground">Loja</h1>
        <Link
          to="/admin"
          className="flex items-center gap-1 text-xs border border-border rounded-full px-3 py-1.5 text-foreground hover:bg-muted transition-colors"
        >
          <Settings className="w-3.5 h-3.5" />
          Painel
        </Link>
      </header>

      <div className="grid grid-cols-2 gap-3 p-3">
        {products.map((p) => (
          <Link
            key={p.slug}
            to={`/produto/${p.slug}`}
            className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="aspect-square bg-muted">
              {p.images[0] && (
                <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="p-2 space-y-1">
              <p className="text-xs text-foreground line-clamp-2 leading-snug">{p.name}</p>
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Star className="w-3 h-3 fill-star text-star" />
                <span>{p.rating}</span>
                <span>({p.ratingCount})</span>
              </div>
              <p className="text-sm font-bold text-destructive">
                R$ {p.price.current.toFixed(2).replace(".", ",")}
              </p>
              <p className="text-[10px] text-muted-foreground">{p.storeName}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
