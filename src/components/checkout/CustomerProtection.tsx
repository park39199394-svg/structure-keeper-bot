import { Check, Shield } from "lucide-react";

const items = [
  "Devolução gratuita",
  "Reembolso automático",
  "Pagamento seguro",
  "Reembolso por atraso",
];

const CustomerProtection = () => {
  return (
    <div className="mx-4 border border-border rounded-lg p-3 space-y-3">
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4 text-success" />
        <p className="text-sm font-semibold text-foreground">Proteção do cliente</p>
      </div>
      <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-[13px] text-foreground">
        {items.map((label) => (
          <div key={label} className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-success shrink-0" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerProtection;
