import { useState, useEffect } from "react";
import { Zap } from "lucide-react";

const PriceSection = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 11, seconds: 13 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        if (totalSeconds <= 0) return { hours: 0, minutes: 0, seconds: 0 };
        return {
          hours: Math.floor(totalSeconds / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60,
        };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="space-y-2">
      {/* Top red bar */}
      <div className="bg-destructive flex items-center justify-between px-3 py-2 rounded-md">
        <div className="flex items-center gap-2">
          <span className="bg-white text-destructive text-xs font-bold px-1.5 py-0.5 rounded">-85%</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-destructive-foreground text-xs">A partir de R$</span>
            <span className="text-destructive-foreground text-3xl font-extrabold leading-none">128,99</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-destructive-foreground">
          <Zap className="w-4 h-4 fill-current" />
          <span className="text-[10px] font-semibold leading-tight">Oferta<br/>Relâmpago</span>
          <div className="flex items-center gap-0.5 text-xs font-bold">
            <span className="bg-foreground text-destructive-foreground px-1 py-0.5 rounded text-[11px]">{pad(timeLeft.hours)}</span>
            <span>:</span>
            <span className="bg-foreground text-destructive-foreground px-1 py-0.5 rounded text-[11px]">{pad(timeLeft.minutes)}</span>
            <span>:</span>
            <span className="bg-foreground text-destructive-foreground px-1 py-0.5 rounded text-[11px]">{pad(timeLeft.seconds)}</span>
          </div>
        </div>
      </div>

      {/* Original price + installments */}
      <div className="px-1 space-y-1">
        <span className="text-sm text-muted-foreground line-through">R$ 649,90</span>
        <div className="text-sm text-foreground">
          📋 <strong>6x R$ 16,33</strong> sem juros no cartão &gt;
        </div>
      </div>

      {/* Discount badges */}
      <div className="flex items-center gap-2 px-1">
        <span className="bg-success/10 text-success text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
          🎟️ Desconto de 85%, máximo de R$ 520
        </span>
        <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded">
          Economize 3% com bônus
        </span>
      </div>
    </div>
  );
};

export default PriceSection;
