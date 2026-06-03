import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useProduct } from "@/contexts/ProductContext";

const FAQ = () => {
  const product = useProduct();
  if (!product.faqs.length) return null;
  return (
    <div className="px-4 space-y-3">
      <h2 className="text-lg font-bold text-foreground">Perguntas Frequentes</h2>
      <Accordion type="single" collapsible className="w-full">
        {product.faqs.map((faq, i) => (
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
