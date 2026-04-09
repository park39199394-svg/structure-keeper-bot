import { Truck, MapPin, PackageCheck, Globe } from "lucide-react";

const ShippingDetails = () => {
  return (
    <div className="px-4 space-y-4">
      <h2 className="text-lg font-bold text-foreground">Envio e Entrega</h2>

      <div className="bg-success/5 border border-success/20 rounded-lg p-3 text-sm text-success font-semibold">
        Frete Grátis para todo o Brasil!
      </div>
      <p className="text-sm text-foreground">
        Economize <strong>R$ 29,90</strong> no frete — promoção por tempo limitado.
      </p>

      <div className="space-y-3">
        <div className="flex gap-3">
          <Truck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-foreground">Prazo de entrega</p>
            <p className="text-xs text-muted-foreground">Receba em <strong>5 a 8 dias úteis</strong> após confirmação do pagamento. Pedidos feitos até 14h são despachados no mesmo dia.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-foreground">Rastreamento completo</p>
            <p className="text-xs text-muted-foreground">Acompanhe seu pedido em tempo real pelo código de rastreio enviado por e-mail e WhatsApp logo após o despacho.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <PackageCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-foreground">Entrega garantida</p>
            <p className="text-xs text-muted-foreground">Entrega garantida e segurada. Em caso de extravio ou dano no transporte, reenviamos o produto ou devolvemos o valor integral sem custo.</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Globe className="w-4 h-4" />
        🇧🇷 Envio rápido, seguro e com rastreamento para <strong>todos os estados do Brasil</strong>.
      </div>
    </div>
  );
};

export default ShippingDetails;
