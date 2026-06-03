import { useParams, Link } from "react-router-dom";
import { getProductBySlug } from "@/lib/productStore";
import ProductLayout from "@/components/checkout/ProductLayout";

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;

  if (!product) {
    return (
      <div className="max-w-lg mx-auto bg-background min-h-screen p-6 text-center space-y-3">
        <h1 className="text-lg font-bold text-foreground">Produto não encontrado</h1>
        <Link to="/" className="text-primary text-sm underline">
          Voltar para a loja
        </Link>
      </div>
    );
  }

  return <ProductLayout product={product} />;
};

export default ProductPage;
