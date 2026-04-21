import { useState } from "react";
import { ChevronDown } from "lucide-react";
import lavaEmUso from "@/assets/lava-em-uso.mp4";
import lavaDetalhes from "@/assets/lava-detalhes.jpg";

const ProductDescription = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="px-4 space-y-4">
      <h2 className="text-lg font-bold text-foreground">Descrição do produto</h2>

      <div className={`space-y-4 overflow-hidden transition-all ${expanded ? "max-h-none" : "max-h-60"}`}>
        <p className="text-sm text-foreground leading-relaxed">
          A <strong>Lava Louças Portátil Semi Automática</strong> é a solução perfeita para quem busca praticidade na cozinha sem complicações de instalação. Basta abastecer o reservatório com água e conectar na tomada!
        </p>

        <h3 className="text-base font-bold text-foreground">PRATICIDADE SEM INSTALAÇÃO</h3>
        <p className="text-sm text-foreground leading-relaxed">
          Esqueça as complicações de instalações hidráulicas! Com reservatório de 3 litros, a lava louças portátil funciona de forma independente. Basta encher, ligar e deixar ela trabalhar por você.
        </p>
        <video
          src={lavaEmUso}
          autoPlay
          loop
          muted
          playsInline
          className="w-full rounded-lg"
        />


        <h3 className="text-base font-bold text-foreground">TECNOLOGIA AVANÇADA</h3>
        <p className="text-sm text-foreground leading-relaxed">
          Com <strong>8 programas de lavagem</strong> e função de água quente e fria, a lava louças oferece limpeza eficiente para diferentes tipos de louça. O sistema de jatos 360° garante cobertura completa.
        </p>

        <h3 className="text-base font-bold text-foreground">DESIGN COMPACTO</h3>
        <p className="text-sm text-foreground leading-relaxed">
          Disponível nas cores branca e preta, com dimensões de 47,1 x 42 x 43,2 cm, ela cabe em qualquer cozinha sem ocupar muito espaço. Ideal para apartamentos, kitinets e cozinhas compactas.
        </p>
        <img
          src={lavaDetalhes}
          alt="Detalhes da lava louças"
          className="w-full rounded-lg"
        />

        <h3 className="text-base font-bold text-foreground">ESPECIFICAÇÕES TÉCNICAS</h3>
        <ul className="text-sm text-foreground space-y-1 list-disc list-inside">
          <li><strong>Capacidade:</strong> 3 litros por ciclo</li>
          <li><strong>Programas:</strong> 8 modos de lavagem</li>
          <li><strong>Dimensões:</strong> 47,1 x 42 x 43,2 cm</li>
          <li><strong>Potência:</strong> 415W (127V) / 1200W (220V)</li>
          <li><strong>Funções:</strong> Água quente e água fria</li>
          <li><strong>Garantia:</strong> 12 meses do fabricante</li>
        </ul>

        <p className="text-sm text-foreground leading-relaxed">
          <strong>GARANTIA DE 12 MESES</strong> — Com mais de 4.000 unidades vendidas e nota 4.7 de satisfação, é sinônimo de qualidade e confiança. A escolha inteligente para sua cozinha!
        </p>
      </div>

      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="flex items-center gap-1 text-primary text-sm font-medium"
        >
          Ver mais <ChevronDown className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default ProductDescription;
