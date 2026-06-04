import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Plus, Trash2, Upload, Save, Sparkles, Loader2 } from "lucide-react";
import type { Product, VariationGroup, VariationOption, ProductReview } from "@/data/types";
import {
  deleteCustomProduct,
  getAllProducts,
  importProductsJson,
  saveCustomProduct,
} from "@/lib/productStore";
import { defaultProducts } from "@/data/defaultProducts";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const emptyProduct: Product = {
  slug: "",
  name: "",
  storeName: "",
  storeInitial: "",
  storeBadge: "Loja Verificada",
  rating: 4.8,
  ratingCount: 100,
  sold: "100 vendidos",
  socialProof: "",
  price: { current: 0, original: 0, installments: 6, discountLabel: "" },
  shippingDays: "5 - 8 dias úteis",
  buyButtonText: "COMPRAR AGORA — FRETE GRÁTIS",
  images: [],
  variationGroups: [],
  descriptionHtml: "",
  reviews: [],
  faqs: [],
};

const Admin = () => {
  const [products, setProducts] = useState<Product[]>(() => getAllProducts());
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [form, setForm] = useState<Product>(emptyProduct);
  const [aiLoading, setAiLoading] = useState<"desc" | "reviews" | null>(null);
  const [reviewsQty, setReviewsQty] = useState(5);

  const defaultSlugs = useMemo(() => new Set(defaultProducts.map((p) => p.slug)), []);
  const refresh = () => setProducts(getAllProducts());

  const startNew = () => { setEditingSlug(null); setForm(emptyProduct); };
  const editProduct = (p: Product) => {
    setEditingSlug(p.slug);
    setForm(JSON.parse(JSON.stringify(p)));
  };

  const handleSave = () => {
    const slug = form.slug || slugify(form.name);
    if (!slug || !form.name) {
      toast({ title: "Faltam dados", description: "Nome e slug são obrigatórios", variant: "destructive" });
      return;
    }
    const finalProduct = { ...form, slug };
    saveCustomProduct(finalProduct);
    refresh();
    toast({ title: "Produto salvo", description: `${finalProduct.name} salvo no navegador.` });
    setEditingSlug(slug);
  };

  const handleDelete = (slug: string) => {
    if (!confirm("Apagar este produto cadastrado?")) return;
    deleteCustomProduct(slug);
    refresh();
    if (editingSlug === slug) startNew();
  };

  const downloadJson = () => {
    const slug = form.slug || slugify(form.name) || "produto";
    const blob = new Blob([JSON.stringify({ ...form, slug }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `${slug}.json`; a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (file: File) => {
    try {
      const text = await file.text();
      importProductsJson(text);
      refresh();
      toast({ title: "Importado", description: "JSON carregado com sucesso." });
    } catch (e) {
      toast({ title: "Erro ao importar", description: String(e), variant: "destructive" });
    }
  };

  const update = <K extends keyof Product>(key: K, value: Product[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const addImages = async (files: FileList | null) => {
    if (!files) return;
    const urls: string[] = [];
    for (const f of Array.from(files)) urls.push(await fileToDataUrl(f));
    update("images", [...form.images, ...urls]);
  };
  const removeImage = (i: number) => update("images", form.images.filter((_, idx) => idx !== i));

  // Variation groups
  const addGroup = () => update("variationGroups", [
    ...form.variationGroups,
    { id: `grupo-${form.variationGroups.length + 1}`, label: "Cor", options: [] },
  ]);
  const removeGroup = (gi: number) =>
    update("variationGroups", form.variationGroups.filter((_, i) => i !== gi));
  const updateGroup = (gi: number, patch: Partial<VariationGroup>) => {
    const next = [...form.variationGroups];
    next[gi] = { ...next[gi], ...patch };
    update("variationGroups", next);
  };
  const addOption = (gi: number) => {
    const next = [...form.variationGroups];
    const g = next[gi];
    next[gi] = {
      ...g,
      options: [...g.options, { id: `opt-${g.options.length + 1}`, label: "", checkoutUrl: "" }],
    };
    update("variationGroups", next);
  };
  const updateOption = (gi: number, oi: number, patch: Partial<VariationOption>) => {
    const next = [...form.variationGroups];
    const opts = [...next[gi].options];
    opts[oi] = { ...opts[oi], ...patch };
    next[gi] = { ...next[gi], options: opts };
    update("variationGroups", next);
  };
  const removeOption = (gi: number, oi: number) => {
    const next = [...form.variationGroups];
    next[gi] = { ...next[gi], options: next[gi].options.filter((_, i) => i !== oi) };
    update("variationGroups", next);
  };

  // Reviews
  const updateReview = (i: number, patch: Partial<ProductReview>) => {
    const next = [...form.reviews];
    next[i] = { ...next[i], ...patch };
    update("reviews", next);
  };
  const addReview = () => update("reviews", [...form.reviews, { initials: "", name: "", text: "", images: [] }]);
  const removeReview = (i: number) => update("reviews", form.reviews.filter((_, idx) => idx !== i));
  const addReviewImages = async (i: number, files: FileList | null) => {
    if (!files) return;
    const urls: string[] = [];
    for (const f of Array.from(files)) urls.push(await fileToDataUrl(f));
    updateReview(i, { images: [...form.reviews[i].images, ...urls] });
  };

  // AI generators
  const generateDescription = async () => {
    if (!form.name) {
      toast({ title: "Informe o nome do produto", variant: "destructive" });
      return;
    }
    setAiLoading("desc");
    try {
      const { data, error } = await supabase.functions.invoke("generate-product-content", {
        body: { type: "description", productName: form.name, storeName: form.storeName, current: form.descriptionHtml },
      });
      if (error) throw error;
      if (data?.html) update("descriptionHtml", data.html);
      toast({ title: "Descrição gerada com IA" });
    } catch (e: any) {
      toast({ title: "Erro ao gerar", description: e?.message ?? String(e), variant: "destructive" });
    } finally { setAiLoading(null); }
  };

  const generateReviews = async () => {
    if (!form.name) {
      toast({ title: "Informe o nome do produto", variant: "destructive" });
      return;
    }
    setAiLoading("reviews");
    try {
      const { data, error } = await supabase.functions.invoke("generate-product-content", {
        body: { type: "reviews", productName: form.name, quantity: reviewsQty },
      });
      if (error) throw error;
      if (Array.isArray(data?.reviews)) {
        const generated: ProductReview[] = data.reviews.map((r: any) => ({
          initials: String(r.initials ?? "").slice(0, 3).toUpperCase(),
          name: String(r.name ?? ""),
          text: String(r.text ?? ""),
          images: [],
        }));
        update("reviews", [...form.reviews, ...generated]);
        toast({ title: `${generated.length} avaliações geradas` });
      }
    } catch (e: any) {
      toast({ title: "Erro ao gerar", description: e?.message ?? String(e), variant: "destructive" });
    } finally { setAiLoading(null); }
  };

  useEffect(() => {
    if (!form.slug && form.name) update("slug", slugify(form.name));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.name]);

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <header className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1 text-sm text-foreground hover:underline">
          <ArrowLeft className="w-4 h-4" /> Voltar para a loja
        </Link>
        <div className="flex gap-2">
          <label className="flex items-center gap-1 text-xs border border-border rounded-full px-3 py-1.5 cursor-pointer hover:bg-muted">
            <Upload className="w-3.5 h-3.5" /> Importar JSON
            <input type="file" accept="application/json" className="hidden"
              onChange={(e) => e.target.files?.[0] && handleImport(e.target.files[0])} />
          </label>
          <button onClick={startNew} className="flex items-center gap-1 text-xs bg-primary text-primary-foreground rounded-full px-3 py-1.5">
            <Plus className="w-3.5 h-3.5" /> Novo produto
          </button>
        </div>
      </header>

      <div className="grid md:grid-cols-[260px_1fr] gap-6">
        <aside className="space-y-2">
          <h2 className="text-sm font-bold text-foreground">Produtos</h2>
          <ul className="space-y-1">
            {products.map((p) => (
              <li key={p.slug} className="flex items-center gap-2">
                <button onClick={() => editProduct(p)}
                  className={`flex-1 text-left text-xs px-2 py-1.5 rounded border ${
                    editingSlug === p.slug ? "border-primary bg-primary/5" : "border-border"
                  }`}>
                  {p.name || p.slug}
                  {defaultSlugs.has(p.slug) && <span className="ml-1 text-[10px] text-muted-foreground">(base)</span>}
                </button>
                {!defaultSlugs.has(p.slug) && (
                  <button onClick={() => handleDelete(p.slug)} className="text-muted-foreground hover:text-destructive p-1" aria-label="Apagar">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </aside>

        <section className="space-y-6">
          <h2 className="text-lg font-bold text-foreground">{editingSlug ? "Editar produto" : "Novo produto"}</h2>

          <fieldset className="space-y-3">
            <legend className="text-sm font-bold text-foreground">Informações</legend>
            <div className="grid sm:grid-cols-2 gap-3">
              <Input label="Nome do produto" value={form.name} onChange={(v) => update("name", v)} />
              <Input label="Slug (URL)" value={form.slug} onChange={(v) => update("slug", slugify(v))} />
              <Input label="Nome da loja" value={form.storeName} onChange={(v) => update("storeName", v)} />
              <Input label="Inicial da loja" value={form.storeInitial ?? ""} onChange={(v) => update("storeInitial", v)} />
              <Input label="Selo da loja" value={form.storeBadge ?? ""} onChange={(v) => update("storeBadge", v)} />
              <Input label="Vendidos (texto)" value={form.sold} onChange={(v) => update("sold", v)} />
              <Input label="Avaliação (0-5)" type="number" value={String(form.rating)} onChange={(v) => update("rating", Number(v) || 0)} />
              <Input label="Qtd avaliações" type="number" value={String(form.ratingCount)} onChange={(v) => update("ratingCount", Number(v) || 0)} />
              <Input label="Prova social" value={form.socialProof ?? ""} onChange={(v) => update("socialProof", v)} />
              <Input label="Prazo de entrega" value={form.shippingDays ?? ""} onChange={(v) => update("shippingDays", v)} />
              <Input label="Texto do botão comprar" value={form.buyButtonText ?? ""} onChange={(v) => update("buyButtonText", v)} />
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-bold text-foreground">Preço</legend>
            <div className="grid sm:grid-cols-4 gap-3">
              <Input label="Preço atual" type="number" value={String(form.price.current)} onChange={(v) => update("price", { ...form.price, current: Number(v) || 0 })} />
              <Input label="Preço original" type="number" value={String(form.price.original)} onChange={(v) => update("price", { ...form.price, original: Number(v) || 0 })} />
              <Input label="Parcelas" type="number" value={String(form.price.installments ?? 1)} onChange={(v) => update("price", { ...form.price, installments: Number(v) || 1 })} />
              <Input label="Selo de desconto" value={form.price.discountLabel ?? ""} onChange={(v) => update("price", { ...form.price, discountLabel: v })} />
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-bold text-foreground">Fotos do produto (carrossel)</legend>
            <label className="inline-flex items-center gap-1 text-xs border border-border rounded-full px-3 py-1.5 cursor-pointer hover:bg-muted">
              <Upload className="w-3.5 h-3.5" /> Adicionar fotos
              <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => addImages(e.target.files)} />
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {form.images.map((img, i) => (
                <div key={i} className="relative aspect-square bg-muted rounded overflow-hidden">
                  <img src={img} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                  <button onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-background/80 rounded-full p-1">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <div className="flex items-center justify-between">
              <legend className="text-sm font-bold text-foreground">Variações (botão comprar)</legend>
              <button onClick={addGroup} className="inline-flex items-center gap-1 text-xs border border-border rounded-full px-3 py-1.5 hover:bg-muted">
                <Plus className="w-3.5 h-3.5" /> Adicionar grupo
              </button>
            </div>
            <div className="space-y-3">
              {form.variationGroups.map((g, gi) => (
                <div key={gi} className="border border-border rounded-lg p-3 space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      value={g.label}
                      onChange={(e) => updateGroup(gi, { label: e.target.value })}
                      placeholder="Nome do grupo (Cor, Tamanho...)"
                      className="flex-1 border border-border rounded px-2 py-1.5 text-sm font-medium"
                    />
                    <button onClick={() => addOption(gi)} className="inline-flex items-center gap-1 text-xs border border-border rounded-full px-3 py-1.5 hover:bg-muted">
                      <Plus className="w-3.5 h-3.5" /> Opção
                    </button>
                    <button onClick={() => removeGroup(gi)} className="text-destructive p-1" aria-label="Remover grupo">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {g.options.map((o, oi) => (
                    <div key={oi} className="border border-border/70 rounded p-2 space-y-2 bg-muted/30">
                      <div className="grid sm:grid-cols-3 gap-2">
                        <Input label="Nome (ex: Preta, P)" value={o.label} onChange={(v) => updateOption(gi, oi, { label: v, id: o.id || slugify(v) })} />
                        <Input label="ID" value={o.id} onChange={(v) => updateOption(gi, oi, { id: slugify(v) })} />
                        <Input label="URL de checkout" value={o.checkoutUrl} onChange={(v) => updateOption(gi, oi, { checkoutUrl: v })} />
                      </div>
                      <div className="flex items-center gap-2">
                        {o.image && <img src={o.image} alt="" className="w-12 h-12 rounded object-cover border border-border" />}
                        <label className="text-xs border border-border rounded-full px-3 py-1.5 cursor-pointer hover:bg-muted bg-background">
                          {o.image ? "Trocar foto" : "Adicionar foto"}
                          <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                            const f = e.target.files?.[0];
                            if (f) updateOption(gi, oi, { image: await fileToDataUrl(f) });
                          }} />
                        </label>
                        {o.image && (
                          <button onClick={() => updateOption(gi, oi, { image: undefined })} className="text-xs text-muted-foreground hover:text-destructive">
                            Remover foto
                          </button>
                        )}
                        <button onClick={() => removeOption(gi, oi)} className="ml-auto text-destructive text-xs flex items-center gap-1">
                          <Trash2 className="w-3 h-3" /> Remover
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <div className="flex items-center justify-between">
              <legend className="text-sm font-bold text-foreground">Descrição (HTML aceito)</legend>
              <button
                onClick={generateDescription}
                disabled={aiLoading === "desc"}
                className="inline-flex items-center gap-1 text-xs bg-primary text-primary-foreground rounded-full px-3 py-1.5 disabled:opacity-60"
              >
                {aiLoading === "desc" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                Gerar com IA
              </button>
            </div>
            <textarea
              value={form.descriptionHtml}
              onChange={(e) => update("descriptionHtml", e.target.value)}
              rows={12}
              className="w-full border border-border rounded-lg p-3 text-sm font-mono"
              placeholder="<h3>Título</h3><p>Texto...</p><img src='https://...' />"
            />
            <p className="text-xs text-muted-foreground">
              Pode escrever texto puro ou usar tags HTML: &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;&lt;li&gt;, &lt;img src&gt;, &lt;video src&gt;, &lt;strong&gt;.
            </p>
          </fieldset>

          <fieldset className="space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <legend className="text-sm font-bold text-foreground">Avaliações dos clientes</legend>
              <div className="flex items-center gap-2">
                <label className="text-xs text-muted-foreground flex items-center gap-1">
                  Quantidade:
                  <input
                    type="number" min={1} max={20} value={reviewsQty}
                    onChange={(e) => setReviewsQty(Math.max(1, Math.min(20, Number(e.target.value) || 1)))}
                    className="w-14 border border-border rounded px-2 py-1 text-sm"
                  />
                </label>
                <button
                  onClick={generateReviews}
                  disabled={aiLoading === "reviews"}
                  className="inline-flex items-center gap-1 text-xs bg-primary text-primary-foreground rounded-full px-3 py-1.5 disabled:opacity-60"
                >
                  {aiLoading === "reviews" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  Gerar com IA
                </button>
              </div>
            </div>
            <button onClick={addReview} className="inline-flex items-center gap-1 text-xs border border-border rounded-full px-3 py-1.5 hover:bg-muted">
              <Plus className="w-3.5 h-3.5" /> Adicionar avaliação
            </button>
            <div className="space-y-3">
              {form.reviews.map((r, i) => (
                <div key={i} className="border border-border rounded-lg p-3 space-y-2">
                  <div className="grid sm:grid-cols-3 gap-2">
                    <Input label="Iniciais" value={r.initials} onChange={(v) => updateReview(i, { initials: v })} />
                    <Input label="Nome" value={r.name} onChange={(v) => updateReview(i, { name: v })} />
                  </div>
                  <textarea value={r.text} onChange={(e) => updateReview(i, { text: e.target.value })}
                    rows={3} className="w-full border border-border rounded p-2 text-sm" placeholder="Texto da avaliação" />
                  <div className="flex items-center gap-2">
                    <label className="text-xs border border-border rounded-full px-3 py-1.5 cursor-pointer hover:bg-muted">
                      <Upload className="w-3 h-3 inline mr-1" /> Fotos da avaliação
                      <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => addReviewImages(i, e.target.files)} />
                    </label>
                    <button onClick={() => removeReview(i)} className="ml-auto text-destructive text-xs flex items-center gap-1">
                      <Trash2 className="w-3 h-3" /> Remover
                    </button>
                  </div>
                  {r.images.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {r.images.map((img, j) => (
                        <div key={j} className="relative w-16 h-16">
                          <img src={img} alt="" className="w-full h-full object-cover rounded" />
                          <button onClick={() => updateReview(i, { images: r.images.filter((_, k) => k !== j) })}
                            className="absolute top-0 right-0 bg-background/80 rounded-full p-0.5">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </fieldset>

          <div className="sticky bottom-0 bg-background border-t border-border py-3 flex flex-wrap gap-2">
            <button onClick={handleSave} className="flex items-center gap-1 bg-primary text-primary-foreground rounded-full px-4 py-2 text-sm font-bold">
              <Save className="w-4 h-4" /> Salvar no navegador
            </button>
            <button onClick={downloadJson} className="flex items-center gap-1 border border-border rounded-full px-4 py-2 text-sm">
              <Download className="w-4 h-4" /> Baixar JSON
            </button>
            {form.slug && (
              <Link to={`/produto/${form.slug}`} className="flex items-center gap-1 border border-border rounded-full px-4 py-2 text-sm">
                Ver página
              </Link>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

const Input = ({ label, value, onChange, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; type?: string;
}) => (
  <label className="flex flex-col gap-1">
    <span className="text-xs text-muted-foreground">{label}</span>
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
      className="border border-border rounded px-2 py-1.5 text-sm" />
  </label>
);

export default Admin;
