const PriceSection = () => {
  return (
    <div className="px-4 space-y-2">
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className="text-2xl font-extrabold text-foreground">R$ 97,99</span>
        <span className="text-sm text-muted-foreground line-through">R$ 649,90</span>
        <span className="bg-sale text-sale-foreground text-xs font-bold px-1.5 py-0.5 rounded">-85%</span>
      </div>
      <div className="text-sm text-foreground">
        📋 <strong>6x R$ 16,33</strong> sem juros no cartão
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="bg-success/10 text-success text-xs font-semibold px-2 py-1 rounded">🎟️ Cupom Aplicado</span>
      </div>
    </div>
  );
};

export default PriceSection;
