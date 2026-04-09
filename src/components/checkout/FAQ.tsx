import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Qual a capacidade da lava louças?", a: "O reservatório possui capacidade de 3 litros por ciclo, suficiente para lavar louças de uma refeição completa para até 4 pessoas." },
  { q: "Precisa de instalação hidráulica?", a: "Não! Basta encher o reservatório com água e conectar na tomada. Funciona de forma totalmente independente." },
  { q: "Funciona com água quente?", a: "Sim! A lava louças possui função de aquecimento de água, permitindo lavagem com água quente e fria." },
  { q: "Qual o prazo de entrega?", a: "O prazo de entrega é de 5 a 8 dias úteis após a confirmação do pagamento. Frete grátis para todo o Brasil." },
  { q: "Tem garantia?", a: "Sim, o produto possui garantia de 12 meses diretamente com o fabricante." },
  { q: "Qual a voltagem?", a: "Disponível em 127V (415W) e 220V (1200W). Selecione a voltagem correta no momento da compra." },
];

const FAQ = () => {
  return (
    <div className="px-4 space-y-3">
      <h2 className="text-lg font-bold text-foreground">Perguntas Frequentes</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-sm text-left">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
