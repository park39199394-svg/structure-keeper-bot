import { useEffect, useState } from "react";
import { ChevronRight, Gift, Mail, ReceiptText, Zap } from "lucide-react";

const PriceSection = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 11, seconds: 13 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;

        if (totalSeconds <= 0) {
          return { hours: 0, minutes: 0, seconds: 0 };
        }

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
    <div className="space-y-2.5">
      <div className="bg-destructive px-1 py-2">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 gap-y-1">
          <div className="flex min-w-0 items-baseline gap-1.5">
            <span className="relative top-[-1px] rounded-sm bg-sale px-1 py-0.5 text-[10px] font-bold leading-none text-sale-foreground">
              -85%
            </span>
            <span className="whitespace-nowrap text-[11px] leading-none text-destructive-foreground/90">
              A partir de R$
            </span>
            <span className="whitespace-nowrap text-[2rem] font-extrabold leading-none tracking-[-0.04em] text-destructive-foreground">
              128,99
            </span>
            <Mail className="relative top-[-2px] h-3.5 w-3.5 shrink-0 text-destructive-foreground/85" />
          </div>

          <div className="flex items-center justify-end gap-1 self-center">
            <Zap className="h-3 w-3 fill-current text-destructive-foreground" />
            <span className="whitespace-nowrap text-[10px] font-bold italic leading-none text-destructive-foreground">
              Oferta Relâmpago
            </span>
          </div>

          <span className="pl-0.5 text-[11px] leading-none text-destructive-foreground/75 line-through">
            R$ 649,90
          </span>

          <div className="flex items-center justify-end gap-1">
            <span className="text-[9px] leading-none text-destructive-foreground/85">Termina em</span>
            <span className="rounded bg-foreground/30 px-1.5 py-[3px] text-[11px] font-bold leading-none text-destructive-foreground">
              {pad(timeLeft.hours)}
            </span>
            <span className="text-[10px] font-bold leading-none text-destructive-foreground">:</span>
            <span className="rounded bg-foreground/30 px-1.5 py-[3px] text-[11px] font-bold leading-none text-destructive-foreground">
              {pad(timeLeft.minutes)}
            </span>
            <span className="text-[10px] font-bold leading-none text-destructive-foreground">:</span>
            <span className="rounded bg-foreground/30 px-1.5 py-[3px] text-[11px] font-bold leading-none text-destructive-foreground">
              {pad(timeLeft.seconds)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 px-1 text-[13px] text-muted-foreground">
        <ReceiptText className="h-3.5 w-3.5 shrink-0" />
        <span>
          6x <strong className="text-foreground">R$ 16,33</strong> sem juros
        </span>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
      </div>

      <div className="flex flex-wrap items-center gap-1.5 px-1">
        <span className="inline-flex items-center gap-1 rounded bg-warning/15 px-1.5 py-1 text-[10px] font-semibold leading-none text-destructive">
          <Gift className="h-2.5 w-2.5" />
          Desconto de 85%, máximo de R$ 520
        </span>
        <span className="rounded bg-success/10 px-1.5 py-1 text-[10px] font-semibold leading-none text-success">
          Economize 3% com bônus
        </span>
      </div>
    </div>
  );
};

export default PriceSection;
