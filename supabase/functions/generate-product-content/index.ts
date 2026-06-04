import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

interface Body {
  type: "description" | "reviews";
  productName: string;
  storeName?: string;
  current?: string;
  quantity?: number;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = (await req.json()) as Body;
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) throw new Error("LOVABLE_API_KEY missing");

    if (!body.productName || !body.type) {
      return new Response(JSON.stringify({ error: "Faltam parâmetros" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let systemPrompt = "";
    let userPrompt = "";
    let tools: any[] | undefined;
    let toolChoice: any | undefined;

    if (body.type === "description") {
      systemPrompt = "Você é redator publicitário brasileiro. Gere descrições de produto em português, persuasivas e bem formatadas em HTML (use <h3>, <p>, <strong>, <ul><li>). NÃO use markdown nem ```html.";
      userPrompt = `Gere uma descrição completa em HTML para o produto: "${body.productName}"${body.storeName ? ` da loja ${body.storeName}` : ""}. Inclua: parágrafo inicial atrativo, 3-4 seções com <h3> em CAIXA ALTA (benefícios, como funciona, especificações, garantia) e uma lista <ul> de especificações técnicas. Retorne APENAS o HTML, sem comentários nem cercas de código.`;
    } else {
      systemPrompt = "Você gera avaliações realistas e variadas de clientes brasileiros para produtos de e-commerce. Use nomes brasileiros comuns e tons naturais (algumas curtas, outras longas).";
      userPrompt = `Gere ${body.quantity ?? 5} avaliações de clientes para o produto: "${body.productName}". Use a ferramenta fornecida.`;
      tools = [{
        type: "function",
        function: {
          name: "submit_reviews",
          description: "Submit generated customer reviews",
          parameters: {
            type: "object",
            properties: {
              reviews: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    initials: { type: "string", description: "2 ou 3 letras maiúsculas" },
                    name: { type: "string", description: "Nome brasileiro com inicial do sobrenome, ex: Maria S." },
                    text: { type: "string", description: "Avaliação realista 1-4 frases em português" },
                  },
                  required: ["initials", "name", "text"],
                },
              },
            },
            required: ["reviews"],
          },
        },
      }];
      toolChoice = { type: "function", function: { name: "submit_reviews" } };
    }

    const aiBody: any = {
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    };
    if (tools) { aiBody.tools = tools; aiBody.tool_choice = toolChoice; }

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(aiBody),
    });

    if (!res.ok) {
      const text = await res.text();
      if (res.status === 429) {
        return new Response(JSON.stringify({ error: "Limite de uso atingido. Tente novamente em instantes." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (res.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos de IA esgotados. Adicione créditos no seu workspace." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      console.error("AI gateway error:", res.status, text);
      return new Response(JSON.stringify({ error: "Erro na IA" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await res.json();

    if (body.type === "description") {
      let html = data.choices?.[0]?.message?.content ?? "";
      html = html.replace(/^```html\s*/i, "").replace(/```$/m, "").trim();
      return new Response(JSON.stringify({ html }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    const args = toolCall?.function?.arguments ? JSON.parse(toolCall.function.arguments) : {};
    return new Response(JSON.stringify({ reviews: args.reviews ?? [] }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-product-content error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
