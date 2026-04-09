import { Shield } from "lucide-react";

const CustomerProtection = () => {
  return (
    <div className="mx-4 border border-border rounded-lg p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-primary" />
        <div>
          <p className="text-sm font-semibold text-foreground">Proteção do cliente</p>
          <p className="text-xs text-primary font-medium">100% Protegido</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs text-foreground">
        <div>✅ Devolução gratuita em até 7 dias</div>
        <div>🔄 Reembolso automático por danos</div>
        <div>🔒 Pagamento seguro e criptografado</div>
        <div>📦 Cupom por atraso na entrega</div>
      </div>
      <p className="text-xs text-muted-foreground">
        Sua compra é <strong>100% protegida</strong>. Garantimos devolução do valor integral caso o produto não corresponda à descrição.
      </p>
    </div>
  );
};

export default CustomerProtection;
