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
    <div className="space-y-2 px-4">
      {/* Top red bar */}
      <div className="bg-destructive rounded-lg px-3 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="bg-white text-destructive text-[11px] font-bold px-1.5 py-0.5 rounded-sm">-85%</span>
          <div className="flex items-baseline gap-1">
            <span className="text-white text-[11px] leading-tight">A partir de<br/>R$</span>
            <span className="text-white text-[28px] font-extrabold leading-none">128,99</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
          <span className="text-white text-[9px] font-semibold leading-tight">Oferta<br/>Relâmpago</span>
          <span className="text-white text-[10px] ml-1">Termina em</span>
          <div className="flex items-center gap-0.5">
            <span className="bg-black/40 text-white text-[10px] font-bold px-1 py-0.5 rounded">{pad(timeLeft.hours)}</span>
            <span className="text-white text-[10px] font-bold">:</span>
            <span className="bg-black/40 text-white text-[10px] font-bold px-1 py-0.5 rounded">{pad(timeLeft.minutes)}</span>
            <span className="text-white text-[10px] font-bold">:</span>
            <span className="bg-black/40 text-white text-[10px] font-bold px-1 py-0.5 rounded">{pad(timeLeft.seconds)}</span>
          </div>
        </div>
      </div>

      {/* Original price + installments */}
      <div className="space-y-0.5">
        <span className="text-sm text-muted-foreground line-through">R$ 649,90</span>
        <div className="text-sm text-foreground flex items-center gap-1">
          📋 <strong>6x R$ 16,33</strong> sem juros &gt;
        </div>
      </div>

      {/* Discount badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="bg-success/10 text-success text-[11px] font-semibold px-2 py-1 rounded">
          🎟️ Desconto de 85%, máximo de R$ 520
        </span>
        <span className="bg-primary/10 text-primary text-[11px] font-semibold px-2 py-1 rounded">
          Economize 3% com bônus
        </span>
      </div>
    </div>
  );
};

export default PriceSection;
