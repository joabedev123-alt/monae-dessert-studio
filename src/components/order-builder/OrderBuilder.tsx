"use client";

import { useState } from "react";
import { X, Check } from "lucide-react";
import { 
  ProductCategory, 
  CATEGORIES, 
  CAKE_SIZES, 
  CAKE_FLAVORS_TRADICIONAIS, 
  CAKE_FLAVORS_ESPECIAIS, 
  CAKE_DESIGNS, 
  CAKE_ADDONS,
  BRIGADEIRO_FLAVORS,
  BRIGADEIRO_TIERS,
  MINI_DESSERTS,
  BRAZILIAN_SWEETS_DATA,
  DESSERTS_DATA,
  PARTY_PACKAGES_DATA
} from "@/data/catalog";

interface OrderBuilderProps {
  lang: string;
  category: ProductCategory;
  onClose: () => void;
}

export function OrderBuilder({ lang, category, onClose }: OrderBuilderProps) {
  const isEn = lang === "en";
  const catInfo = CATEGORIES.find(c => c.id === category)!;

  const [orderData, setOrderData] = useState<any>({});
  
  const updateOrder = (key: string, value: any) => {
    setOrderData((prev: any) => ({ ...prev, [key]: value }));
  };

  const updateOrderMulti = (updates: any) => {
    setOrderData((prev: any) => ({ ...prev, ...updates }));
  };

  const toggleAddon = (addonLabel: string) => {
    const currentAddons = orderData.addons || [];
    if (currentAddons.includes(addonLabel)) {
      updateOrder("addons", currentAddons.filter((a: string) => a !== addonLabel));
    } else {
      updateOrder("addons", [...currentAddons, addonLabel]);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    if (category === "custom_cakes") {
      const sizeObj = CAKE_SIZES.find(s => s.label === orderData.size);
      if (sizeObj) total += sizeObj.price;
      
      if (orderData.addons) {
        orderData.addons.forEach((addonLabel: string) => {
          const addonObj = CAKE_ADDONS.find(a => a.label === addonLabel);
          if (addonObj) total += addonObj.price;
        });
      }
    } else if (category === "mini_cakes") {
      total = 30;
    } else if (category === "brigadeiros") {
      if (orderData.brigType && orderData.brigQty) {
        const tiers = orderData.brigType === "Tradicional" ? BRIGADEIRO_TIERS.tradicionais : BRIGADEIRO_TIERS.especiais;
        const selectedTier = tiers.find(t => t.qty === orderData.brigQty);
        if (selectedTier) total = selectedTier.price;
      }
    } else if (category === "mini_desserts") {
      if (orderData.flavor && orderData.qty) {
        const dessertObj = MINI_DESSERTS.find(d => d.name === orderData.flavor);
        if (dessertObj) total = dessertObj.price * orderData.qty;
      }
    } else if (category === "brazilian_sweets") {
      if (orderData.sweetsType && orderData.flavor && orderData.qty) {
        total = BRAZILIAN_SWEETS_DATA.price * orderData.qty;
      }
    } else if (category === "desserts") {
      if (orderData.dessertType) {
        const dessertObj = DESSERTS_DATA.find(d => d.name === orderData.dessertType);
        if (dessertObj) total = dessertObj.price;
      }
    } else if (category === "party_packages") {
      if (orderData.kitType) {
        const kitObj = PARTY_PACKAGES_DATA.find(k => k.name === orderData.kitType);
        if (kitObj) total = kitObj.price;
      }
    }
    return total;
  };

  const generateWhatsAppMessage = () => {
    let msg = isEn ? "Hi Monae! I'd like to request an order.\n\n" : "Olá Monae! Gostaria de fazer uma encomenda.\n\n";
    const total = calculateTotal();
    
    if (category === "custom_cakes") {
      msg += `Data da encomenda: ${orderData.orderDate || "Não informada"}\n\n`;
      msg += `Produto: ${catInfo.name[isEn ? 'en' : 'pt']}\n`;
      msg += `Tamanho: ${orderData.size || "-"}\n`;
      msg += `Sabor: ${orderData.flavor || "-"}\n`;
      msg += `Decoração: ${orderData.design || "-"}\n`;
      msg += `Adicionais: ${orderData.addons && orderData.addons.length > 0 ? orderData.addons.join(", ") : "Nenhum"}\n`;
      msg += `Mensagem/Observações: ${orderData.notes || "-"}\n\n`;
      msg += `*Valor Estimado Inicial:* $${total} (a confirmar)\n`;
    } else if (category === "mini_cakes") {
      msg += `Data da encomenda: ${orderData.orderDate || "Não informada"}\n\n`;
      msg += `Produto: Mini Cake\n`;
      msg += `Sabor: ${orderData.flavor || "-"}\n`;
      msg += `Mensagem/Observações: ${orderData.notes || "-"}\n\n`;
      msg += `*Valor Estimado:* $${total}\n`;
    } else if (category === "brigadeiros") {
      msg += `Data da encomenda: ${orderData.orderDate || "Não informada"}\n\n`;
      msg += `Produto: Brigadeiros de Festa\n`;
      msg += `Linha: ${orderData.brigType || "-"}\n`;
      msg += `Sabor: ${orderData.flavor || "-"}\n`;
      msg += `Quantidade: ${orderData.brigQty || "-"}\n`;
      msg += `Mensagem/Observações: ${orderData.notes || "-"}\n\n`;
      msg += `*Valor Estimado:* $${total}\n`;
    } else if (category === "mini_desserts") {
      msg += `Data da encomenda: ${orderData.orderDate || "Não informada"}\n\n`;
      msg += `Produto: Mini Sobremesas (Tacinhas)\n`;
      msg += `Sabor: ${orderData.flavor || "-"}\n`;
      msg += `Quantidade: ${orderData.qty || "-"}\n`;
      msg += `Mensagem/Observações: ${orderData.notes || "-"}\n\n`;
      msg += `*Valor Estimado:* $${total.toFixed(2)}\n`;
    } else if (category === "brazilian_sweets") {
      msg += `Data da encomenda: ${orderData.orderDate || "Não informada"}\n\n`;
      msg += `Produto: ${orderData.sweetsType || "Bem-casado"}\n`;
      msg += `Sabor: ${orderData.flavor || "-"}\n`;
      msg += `Quantidade: ${orderData.qty || "-"}\n`;
      msg += `Mensagem/Observações: ${orderData.notes || "-"}\n\n`;
      msg += `*Valor Estimado:* $${total.toFixed(2)}\n`;
    } else if (category === "desserts") {
      msg += `Data da encomenda: ${orderData.orderDate || "Não informada"}\n\n`;
      msg += `Produto: ${orderData.dessertType || "-"}\n`;
      if (orderData.flavor) msg += `Sabor: ${orderData.flavor}\n`;
      msg += `Mensagem/Observações: ${orderData.notes || "-"}\n\n`;
      msg += `*Valor Estimado:* $${total.toFixed(2)}\n`;
    } else if (category === "party_packages") {
      msg += `Data da encomenda: ${orderData.orderDate || "Não informada"}\n\n`;
      msg += `Produto: ${orderData.kitType || "-"}\n`;
      msg += `Detalhes/Sabores: ${orderData.kitDetails || "-"}\n`;
      msg += `Mensagem/Observações: ${orderData.notes || "-"}\n\n`;
      msg += `*Valor Estimado:* $${total.toFixed(2)}\n`;
    } else {
      msg += `Data da encomenda: ${orderData.orderDate || "Não informada"}\n\n`;
      msg += `${isEn ? "Product" : "Produto"}: ${catInfo.name[isEn ? 'en' : 'pt']}\n`;
      msg += `${isEn ? "Details" : "Detalhes"}: ${orderData.details || "-"}\n`;
    }

    msg += `\n${isEn ? "Please confirm availability and final pricing." : "Por favor, confirme a disponibilidade e o valor final."}`;
    
    return encodeURIComponent(msg);
  };

  const submitOrder = () => {
    if (!orderData.orderDate) {
      alert(isEn ? "Please inform the order date." : "Por favor, informe a data da encomenda.");
      return;
    }
    const msg = generateWhatsAppMessage();
    if (isEn) {
      window.open(`sms:+15715258279?&body=${msg}`, "_blank");
    } else {
      window.open(`https://wa.me/15715258279?text=${msg}`, "_blank");
    }
  };

  const isFlowComplete = () => {
    if (category === "custom_cakes") {
      return !!orderData.design; // Needs to reach at least design (addons are optional)
    } else if (category === "mini_cakes") {
      return !!orderData.flavor;
    } else if (category === "mini_desserts") {
      return !!orderData.flavor && orderData.qty >= 25;
    } else if (category === "brazilian_sweets") {
      return !!orderData.sweetsType && !!orderData.flavor && orderData.qty >= BRAZILIAN_SWEETS_DATA.minQty;
    } else if (category === "desserts") {
      if (orderData.dessertType === "Bombom na travessa") return !!orderData.flavor;
      return !!orderData.dessertType;
    } else if (category === "party_packages") {
      return !!orderData.kitType && orderData.kitDetails && orderData.kitDetails.length > 3;
    } else if (category === "brigadeiros") {
      return !!orderData.flavor;
    } else {
      return !!orderData.details;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-off-white flex flex-col">
      {/* Header */}
      <div className="h-20 border-b border-brand-border flex items-center justify-between px-6 bg-white shrink-0 shadow-sm z-10">
        <button onClick={onClose} className="p-2 text-text-dark hover:bg-cream rounded-full transition-colors">
          <X size={24} />
        </button>
        <div className="text-lg font-serif text-text-dark">
          {catInfo.name[isEn ? 'en' : 'pt']}
        </div>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      {/* Content Area - Continuous Scroll */}
      <div className="flex-grow overflow-y-auto p-6 md:p-12 pb-40">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* =======================
              CUSTOM CAKES FLOW 
             ======================= */}
          {category === "custom_cakes" && (
            <>
              {/* 1. Tamanho */}
              <div className="animate-in fade-in duration-500">
                <h2 className="text-3xl font-serif mb-2 text-center uppercase tracking-widest text-primary">Escolha o Tamanho:</h2>
                <p className="text-center text-text-dark font-medium mb-8 uppercase">Diâmetro e Peso</p>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {CAKE_SIZES.map(s => (
                    <div 
                      key={s.id}
                      onClick={() => updateOrder("size", s.label)}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all flex flex-col ${
                        orderData.size === s.label ? "border-primary bg-blush/30" : "border-brand-border bg-white hover:border-primary/50"
                      }`}
                    >
                      <div className="text-3xl font-serif text-primary mb-2 text-center">{s.label}</div>
                      <div className="text-center font-medium text-text-dark mb-4">{s.serves}</div>
                      <div className="text-center text-soft-text text-sm mb-4">
                        <p>4 camadas de massa</p>
                        <p>3 camadas de recheio</p>
                        <p>Altura: aprox. 15cm</p>
                        <p>buttercream</p>
                      </div>
                      <div className="text-center text-sm font-semibold uppercase text-text-dark mt-auto border-t border-brand-border pt-4">
                        a partir de: <br/><span className="text-xl">${s.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-center text-primary font-medium mt-8 text-sm uppercase tracking-wide">
                  O valor final irá depender do estilo e complexidade de decoração.
                </p>
              </div>

              {/* 2. Sabor */}
              {orderData.size && (
                <div className="animate-in fade-in slide-in-from-top-8 duration-700">
                  <h2 className="text-3xl font-serif mb-8 text-center text-primary uppercase">Escolha o Sabor</h2>
                  
                  <h3 className="text-2xl font-serif text-text-dark mb-6 text-center border-b border-brand-border pb-4">Tradicionais</h3>
                  {CAKE_FLAVORS_TRADICIONAIS.map((group, idx) => (
                    <div key={idx} className="mb-8">
                      <h4 className="text-lg font-medium text-primary mb-4">{group.category}</h4>
                      <div className="grid gap-3 md:grid-cols-2">
                        {group.items.map(f => (
                          <div 
                            key={f.name}
                            onClick={() => updateOrder("flavor", `${f.name} (Tradicional - ${group.category})`)}
                            className={`p-5 rounded-xl border cursor-pointer transition-all ${
                              orderData.flavor === `${f.name} (Tradicional - ${group.category})` ? "border-primary bg-blush/30" : "border-brand-border bg-white hover:border-primary/50"
                            }`}
                          >
                            <div className="font-bold text-text-dark mb-1">{f.name}</div>
                            <div className="text-sm text-soft-text">{f.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <h3 className="text-2xl font-serif text-text-dark mb-6 text-center border-b border-brand-border pb-4 mt-12">Especiais</h3>
                  {CAKE_FLAVORS_ESPECIAIS.map((group, idx) => (
                    <div key={idx} className="mb-8">
                      <h4 className="text-lg font-medium text-primary mb-4">{group.category}</h4>
                      <div className="grid gap-3 md:grid-cols-2">
                        {group.items.map(f => (
                          <div 
                            key={f.name}
                            onClick={() => updateOrder("flavor", `${f.name} (Especial - ${group.category})`)}
                            className={`p-5 rounded-xl border cursor-pointer transition-all ${
                              orderData.flavor === `${f.name} (Especial - ${group.category})` ? "border-primary bg-blush/30" : "border-brand-border bg-white hover:border-primary/50"
                            }`}
                          >
                            <div className="font-bold text-text-dark mb-1">{f.name}</div>
                            <div className="text-sm text-soft-text">{f.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="mt-8 p-6 bg-cream rounded-xl text-center border border-brand-border">
                    <p className="font-serif text-lg text-primary mb-2">Não encontrou o recheio que deseja?</p>
                    <p className="text-soft-text text-sm">Nos mande uma mensagem e nos diga o que tem em mente, ficaremos felizes em fazer algo especial e personalizado pra você.</p>
                  </div>
                </div>
              )}

              {/* 3. Decoração */}
              {orderData.size && orderData.flavor && (
                <div className="animate-in fade-in slide-in-from-top-8 duration-700">
                  <h2 className="text-3xl font-serif mb-8 text-center text-primary uppercase">Escolha a Decoração</h2>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {CAKE_DESIGNS.map(d => (
                      <div 
                        key={d.id}
                        onClick={() => updateOrder("design", d.label)}
                        className={`rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                          orderData.design === d.label ? "border-primary bg-blush/30" : "border-brand-border bg-white hover:border-primary/50"
                        }`}
                      >
                        <div className={`p-6 text-center font-serif text-xl ${orderData.design === d.label ? "text-primary font-bold" : "text-text-dark"}`}>
                          {d.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-cream rounded-xl text-center border border-brand-border">
                    <p className="font-serif text-lg text-primary mb-2">Não se identificou com as inspirações?</p>
                    <p className="text-soft-text text-sm">Nos mande uma mensagem e nos diga o que tem em mente.</p>
                  </div>
                </div>
              )}

              {/* 4. Adicionais */}
              {orderData.size && orderData.flavor && orderData.design && (
                <div className="animate-in fade-in slide-in-from-top-8 duration-700">
                  <h2 className="text-3xl font-serif mb-2 text-center text-primary uppercase">Escolha os Adicionais</h2>
                  <p className="text-center text-text-dark font-medium mb-8 uppercase">Decorativos (Opcional)</p>
                  
                  <div className="grid gap-4">
                    {CAKE_ADDONS.map(a => {
                      const isSelected = (orderData.addons || []).includes(a.label);
                      return (
                        <div 
                          key={a.id}
                          onClick={() => toggleAddon(a.label)}
                          className={`p-6 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center ${
                            isSelected ? "border-primary bg-blush/30" : "border-brand-border bg-white hover:border-primary/50"
                          }`}
                        >
                          <div className="text-lg font-bold text-text-dark flex items-center gap-3">
                            <div className={`w-6 h-6 rounded border flex items-center justify-center ${isSelected ? 'bg-primary border-primary text-white' : 'border-gray-300 bg-white'}`}>
                              {isSelected && <Check size={16} />}
                            </div>
                            {a.label}
                          </div>
                          <div className="text-primary font-medium text-sm uppercase">{a.priceText}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}

          {/* =======================
              MINI CAKES FLOW 
             ======================= */}
          {category === "mini_cakes" && (
            <>
              {/* 1. Sabor */}
              <div className="animate-in fade-in duration-500">
                <h2 className="text-3xl font-serif mb-2 text-center text-primary uppercase">Mini Cakes</h2>
                <p className="text-center text-text-dark mb-8 font-serif">Perfeito para momentos íntimos</p>

                <div className="bg-white border border-brand-border p-6 rounded-2xl shadow-sm mb-12 text-center max-w-2xl mx-auto">
                  <p className="text-soft-text text-lg">
                    Mini cake é um bolo perfeito para experimentar a dois.<br/>
                    Tamanho de aproximadamente 4"x3"
                  </p>
                  <div className="text-3xl font-serif text-primary mt-4 font-bold">Valor: $30</div>
                </div>

                <h3 className="text-2xl font-serif mb-6 text-center text-text-dark">Escolha o Sabor</h3>
                <p className="text-center text-soft-text mb-8">Escolha um dos nossos sabores tradicionais.</p>

                <div className="grid gap-3 md:grid-cols-2 max-w-2xl mx-auto">
                  {CAKE_FLAVORS_TRADICIONAIS.flatMap(g => g.items).map(f => (
                    <div 
                      key={f.name}
                      onClick={() => updateOrder("flavor", f.name)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                        orderData.flavor === f.name ? "border-primary bg-blush/30 text-primary" : "border-brand-border bg-white hover:border-primary/50 text-text-dark"
                      }`}
                    >
                      <div className="font-bold">{f.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* =======================
              BRIGADEIROS FLOW 
             ======================= */}
          {category === "brigadeiros" && (
            <>
              <div className="animate-in fade-in duration-500">
                <h2 className="text-3xl font-serif mb-2 text-center text-primary uppercase">BRIGADEIROS de festa</h2>
                <p className="text-center text-text-dark mb-8 font-serif">Monae Dessert Studio</p>
                
                <div className="bg-cream border border-brand-border p-6 rounded-2xl mb-12 text-center max-w-2xl mx-auto">
                  <p className="text-soft-text text-sm leading-relaxed">
                    Nossos brigadeiros de festa pesam entre 15g e 18g e são entregues em forminhas tradicionais na cor marrom ou branca. Caso deseje outra cor, consulte a disponibilidade.<br/>
                    <span className="font-bold text-primary mt-2 block">Pedido mínimo: 25 unidades por sabor</span>
                  </p>
                </div>

                {/* 1. Escolha a Linha */}
                <div>
                  <h3 className="text-xl font-serif text-primary mb-4 border-b border-brand-border pb-2">1. Escolha a Linha</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div 
                      onClick={() => updateOrderMulti({ brigType: "Tradicional", brigQty: null, flavor: null })}
                      className={`p-6 rounded-xl border-2 cursor-pointer text-center transition-all ${
                        orderData.brigType === "Tradicional" ? "border-primary bg-blush/30" : "border-brand-border bg-white hover:border-primary/50"
                      }`}
                    >
                      <div className={`text-2xl font-serif ${orderData.brigType === "Tradicional" ? "text-primary" : "text-text-dark"}`}>Tradicionais</div>
                    </div>
                    <div 
                      onClick={() => updateOrderMulti({ brigType: "Especial", brigQty: null, flavor: null })}
                      className={`p-6 rounded-xl border-2 cursor-pointer text-center transition-all ${
                        orderData.brigType === "Especial" ? "border-primary bg-blush/30" : "border-brand-border bg-white hover:border-primary/50"
                      }`}
                    >
                      <div className={`text-2xl font-serif ${orderData.brigType === "Especial" ? "text-primary" : "text-text-dark"}`}>Especiais</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Escolha a Quantidade */}
              {orderData.brigType && (
                <div className="animate-in fade-in slide-in-from-top-8 duration-700">
                  <h3 className="text-xl font-serif text-primary mb-4 border-b border-brand-border pb-2">2. Escolha a Quantidade</h3>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {(orderData.brigType === "Tradicional" ? BRIGADEIRO_TIERS.tradicionais : BRIGADEIRO_TIERS.especiais).map(tier => (
                      <div 
                        key={tier.qty}
                        onClick={() => updateOrderMulti({ brigQty: tier.qty, flavor: null })}
                        className={`p-4 rounded-xl border-2 cursor-pointer text-center transition-all ${
                          orderData.brigQty === tier.qty ? "border-primary bg-blush/30" : "border-brand-border bg-white hover:border-primary/50"
                        }`}
                      >
                        <div className="text-lg font-bold text-text-dark">{tier.qty} un</div>
                        <div className="text-primary font-medium">$ {tier.price.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Escolha o Sabor */}
              {orderData.brigType && orderData.brigQty && (
                <div className="animate-in fade-in slide-in-from-top-8 duration-700">
                  <h3 className="text-xl font-serif text-primary mb-4 border-b border-brand-border pb-2">3. Escolha o Sabor</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {(orderData.brigType === "Tradicional" ? BRIGADEIRO_FLAVORS.tradicionais : BRIGADEIRO_FLAVORS.especiais).map(f => (
                      <div 
                        key={f}
                        onClick={() => updateOrder("flavor", f)}
                        className={`p-4 rounded-xl border-2 cursor-pointer text-center transition-all ${
                          orderData.flavor === f ? "border-primary bg-primary text-white" : "border-brand-border bg-white hover:bg-blush hover:border-primary/50 text-text-dark"
                        }`}
                      >
                        <div className="font-medium text-sm">{f}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* =======================
              MINI DESSERTS FLOW
             ======================= */}
          {category === "mini_desserts" && (
            <>
              <div className="animate-in fade-in duration-500">
                <h2 className="text-3xl font-serif mb-2 text-center text-primary uppercase">Mini Sobremesas / Tacinhas</h2>
                <p className="text-center text-text-dark mb-8 font-serif">Deliciosas tacinhas de alegria</p>

                <div className="bg-cream border border-brand-border p-6 rounded-2xl mb-12 text-center max-w-2xl mx-auto">
                  <p className="font-bold text-primary">Pedido mínimo: 25 unidades por sabor</p>
                </div>

                {/* 1. Escolha o Sabor */}
                <div>
                  <h3 className="text-xl font-serif text-primary mb-6 border-b border-brand-border pb-2">1. Escolha o Sabor</h3>
                  
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {MINI_DESSERTS.map(d => (
                      <div 
                        key={d.id}
                        onClick={() => updateOrderMulti({ flavor: d.name, qty: orderData.qty || 25 })}
                        className={`p-5 rounded-xl border-2 cursor-pointer transition-all flex flex-col h-full ${
                          orderData.flavor === d.name ? "border-primary bg-blush/30" : "border-brand-border bg-white hover:border-primary/50"
                        }`}
                      >
                        <div className="font-bold text-text-dark mb-2">{d.name}</div>
                        <div className="text-sm text-soft-text mb-4 flex-grow">{d.desc}</div>
                        <div className="text-primary font-bold mt-auto pt-2 border-t border-brand-border">$ {d.price.toFixed(2)} un</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2. Escolha a Quantidade */}
              {orderData.flavor && (
                <div className="animate-in fade-in slide-in-from-top-8 duration-700">
                  <h3 className="text-xl font-serif text-primary mb-4 border-b border-brand-border pb-2">2. Defina a Quantidade</h3>
                  <div className="max-w-xs mx-auto bg-white border-2 border-brand-border rounded-xl p-6 text-center shadow-sm">
                    <label className="block text-soft-text text-sm mb-4">Mínimo 25 unidades</label>
                    <div className="flex items-center justify-center gap-4">
                      <button 
                        onClick={() => orderData.qty > 25 && updateOrder("qty", orderData.qty - 1)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center border ${orderData.qty > 25 ? 'border-primary text-primary hover:bg-blush' : 'border-gray-300 text-gray-300'}`}
                      >
                        -
                      </button>
                      <input 
                        type="number" 
                        min="25"
                        value={orderData.qty}
                        onChange={(e) => updateOrder("qty", Math.max(25, parseInt(e.target.value) || 25))}
                        className="w-20 text-center text-2xl font-bold text-text-dark focus:outline-none"
                      />
                      <button 
                        onClick={() => updateOrder("qty", (orderData.qty || 25) + 1)}
                        className="w-10 h-10 rounded-full flex items-center justify-center border border-primary text-primary hover:bg-blush"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* =======================
              BRAZILIAN SWEETS FLOW
             ======================= */}
          {category === "brazilian_sweets" && (
            <>
              <div className="animate-in fade-in duration-500">
                <h2 className="text-3xl font-serif mb-2 text-center text-primary uppercase">Bem-casados</h2>
                <p className="text-center text-text-dark mb-8 font-serif">Clássicos para festas</p>

                <div className="bg-cream border border-brand-border p-6 rounded-2xl mb-12 text-center max-w-2xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6">
                  <div className="text-2xl font-serif text-primary font-bold">
                    $ {BRAZILIAN_SWEETS_DATA.price.toFixed(2)} un
                  </div>
                  <div className="h-8 w-px bg-brand-border hidden md:block"></div>
                  <p className="font-bold text-text-dark uppercase tracking-wide text-sm">
                    Pedido mínimo: {BRAZILIAN_SWEETS_DATA.minQty} unidades
                  </p>
                </div>

                {/* 1. Escolha a Ocasião */}
                <div>
                  <h3 className="text-xl font-serif text-primary mb-6 border-b border-brand-border pb-2">1. Qual a ocasião?</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {BRAZILIAN_SWEETS_DATA.types.map(type => (
                      <div 
                        key={type}
                        onClick={() => updateOrderMulti({ sweetsType: type, flavor: null, qty: orderData.qty || BRAZILIAN_SWEETS_DATA.minQty })}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                          orderData.sweetsType === type ? "border-primary bg-primary text-white" : "border-brand-border bg-white hover:border-primary/50 text-text-dark"
                        }`}
                      >
                        <div className="font-bold">{type}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2. Escolha o Sabor */}
              {orderData.sweetsType && (
                <div className="animate-in fade-in slide-in-from-top-8 duration-700">
                  <h3 className="text-xl font-serif text-primary mb-6 border-b border-brand-border pb-2">2. Escolha o Sabor</h3>
                  
                  <div className="grid gap-3 sm:grid-cols-3">
                    {BRAZILIAN_SWEETS_DATA.flavors.map(f => (
                      <div 
                        key={f}
                        onClick={() => updateOrder("flavor", f)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                          orderData.flavor === f ? "border-primary bg-blush/30 text-primary" : "border-brand-border bg-white hover:border-primary/50 text-text-dark"
                        }`}
                      >
                        <div className="font-bold">{f}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Escolha a Quantidade */}
              {orderData.sweetsType && orderData.flavor && (
                <div className="animate-in fade-in slide-in-from-top-8 duration-700">
                  <h3 className="text-xl font-serif text-primary mb-4 border-b border-brand-border pb-2">3. Defina a Quantidade</h3>
                  <div className="max-w-xs mx-auto bg-white border-2 border-brand-border rounded-xl p-6 text-center shadow-sm">
                    <label className="block text-soft-text text-sm mb-4">Mínimo {BRAZILIAN_SWEETS_DATA.minQty} unidades</label>
                    <div className="flex items-center justify-center gap-4">
                      <button 
                        onClick={() => orderData.qty > BRAZILIAN_SWEETS_DATA.minQty && updateOrder("qty", orderData.qty - 1)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center border ${orderData.qty > BRAZILIAN_SWEETS_DATA.minQty ? 'border-primary text-primary hover:bg-blush' : 'border-gray-300 text-gray-300'}`}
                      >
                        -
                      </button>
                      <input 
                        type="number" 
                        min={BRAZILIAN_SWEETS_DATA.minQty}
                        value={orderData.qty}
                        onChange={(e) => updateOrder("qty", Math.max(BRAZILIAN_SWEETS_DATA.minQty, parseInt(e.target.value) || BRAZILIAN_SWEETS_DATA.minQty))}
                        className="w-20 text-center text-2xl font-bold text-text-dark focus:outline-none"
                      />
                      <button 
                        onClick={() => updateOrder("qty", (orderData.qty || BRAZILIAN_SWEETS_DATA.minQty) + 1)}
                        className="w-10 h-10 rounded-full flex items-center justify-center border border-primary text-primary hover:bg-blush"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* =======================
              DESSERTS FLOW
             ======================= */}
          {category === "desserts" && (
            <>
              <div className="animate-in fade-in duration-500">
                <h2 className="text-3xl font-serif mb-2 text-center text-primary uppercase">Sobremesas</h2>
                <p className="text-center text-text-dark mb-8 font-serif">Para compartilhar com a família</p>

                {/* 1. Escolha a Sobremesa */}
                <div>
                  <h3 className="text-xl font-serif text-primary mb-6 border-b border-brand-border pb-2">1. Escolha a Sobremesa</h3>
                  
                  <div className="grid gap-4 md:grid-cols-3">
                    {DESSERTS_DATA.map(d => (
                      <div 
                        key={d.id}
                        onClick={() => updateOrderMulti({ dessertType: d.name, flavor: null })}
                        className={`p-5 rounded-xl border-2 cursor-pointer transition-all flex flex-col h-full ${
                          orderData.dessertType === d.name ? "border-primary bg-blush/30" : "border-brand-border bg-white hover:border-primary/50 text-text-dark"
                        }`}
                      >
                        <div className="font-bold text-xl text-text-dark mb-2">{d.name}</div>
                        <div className="text-sm text-soft-text mb-4 flex-grow">{d.desc}</div>
                        <div className="text-sm font-semibold text-primary mb-2">{d.serves}</div>
                        <div className="text-xs text-soft-text italic mb-4">{d.validity}</div>
                        <div className="text-primary font-bold mt-auto pt-2 border-t border-brand-border text-lg">$ {d.price.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2. Escolha o Sabor (Only for Bombom na travessa) */}
              {orderData.dessertType === "Bombom na travessa" && (
                <div className="animate-in fade-in slide-in-from-top-8 duration-700">
                  <h3 className="text-xl font-serif text-primary mb-6 border-b border-brand-border pb-2">2. Escolha o Sabor</h3>
                  
                  <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                    {DESSERTS_DATA.find(d => d.id === "bombom")?.flavors?.map(f => (
                      <div 
                        key={f}
                        onClick={() => updateOrder("flavor", f)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                          orderData.flavor === f ? "border-primary bg-primary text-white" : "border-brand-border bg-white hover:border-primary/50 text-text-dark"
                        }`}
                      >
                        <div className="font-bold text-sm">{f}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* =======================
              PARTY PACKAGES FLOW
             ======================= */}
          {category === "party_packages" && (
            <>
              <div className="animate-in fade-in duration-500">
                <h2 className="text-3xl font-serif mb-2 text-center text-primary uppercase">Kits para Festa</h2>
                <p className="text-center text-text-dark mb-8 font-serif">Kits selecionados para eventos</p>

                {/* 1. Escolha o Kit */}
                <div>
                  <h3 className="text-xl font-serif text-primary mb-6 border-b border-brand-border pb-2">1. Escolha o Kit</h3>
                  
                  <div className="grid gap-4 md:grid-cols-3">
                    {PARTY_PACKAGES_DATA.map(k => (
                      <div 
                        key={k.id}
                        onClick={() => updateOrderMulti({ kitType: k.name, kitDetails: "" })}
                        className={`p-5 rounded-xl border-2 cursor-pointer transition-all flex flex-col h-full ${
                          orderData.kitType === k.name ? "border-primary bg-blush/30" : "border-brand-border bg-white hover:border-primary/50 text-text-dark"
                        }`}
                      >
                        <div className="font-bold text-lg text-text-dark mb-2">{k.name}</div>
                        <div className="text-sm text-soft-text mb-4 flex-grow whitespace-pre-line">{k.desc}</div>
                        <div className="text-primary font-bold mt-auto pt-2 border-t border-brand-border text-lg">$ {k.price.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2. Personalize seu Kit */}
              {orderData.kitType && (
                <div className="animate-in fade-in slide-in-from-top-8 duration-700">
                  <h3 className="text-xl font-serif text-primary mb-4 border-b border-brand-border pb-2">2. Personalize seu Kit</h3>
                  <div className="bg-white border-2 border-brand-border rounded-xl p-6 shadow-sm">
                    <label className="block text-text-dark font-medium mb-3">
                      {orderData.kitType.includes("Mini Cake") 
                        ? "Escreva o sabor do mini cake e os 2 sabores de brigadeiros:" 
                        : "Escreva o sabor do bolo, dos brigadeiros e o tema para os topos:"}
                    </label>
                    <textarea 
                      className="w-full bg-cream border border-brand-border rounded-xl p-4 text-text-dark focus:outline-none focus:ring-primary focus:border-primary min-h-[120px]"
                      placeholder="Ex: Bolo de chocolate com morango, brigadeiros tradicionais e ninho..."
                      value={orderData.kitDetails || ""}
                      onChange={(e) => updateOrder("kitDetails", e.target.value)}
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {/* =======================
              FALLBACK FOR OTHERS 
             ======================= */}
          {category !== "custom_cakes" && category !== "mini_cakes" && category !== "brigadeiros" && category !== "mini_desserts" && category !== "brazilian_sweets" && category !== "desserts" && category !== "party_packages" && (
             <div className="animate-in fade-in duration-500 text-center">
               <h2 className="text-3xl font-serif mb-8">{isEn ? "Details" : "Detalhes"}</h2>
               <textarea 
                  className="w-full bg-white border-2 border-brand-border rounded-xl p-6 text-text-dark focus:outline-none focus:ring-primary focus:border-primary min-h-[200px]"
                  placeholder={isEn ? "Describe what you want (quantity, flavors, etc)..." : "Descreva o que deseja (quantidade, sabores, etc)..."}
                  value={orderData.details || ""}
                  onChange={(e) => updateOrder("details", e.target.value)}
               />
             </div>
          )}

          {/* =======================
              FINAL FORM (Always at the end if flow is complete)
             ======================= */}
          {isFlowComplete() && (
            <div className="animate-in fade-in slide-in-from-top-12 duration-1000 mt-16 pt-8 border-t-2 border-primary/20">
              <h2 className="text-3xl font-serif mb-8 text-center text-primary">FINALIZAR PEDIDO</h2>
              
              <div className="bg-white border-2 border-brand-border rounded-2xl p-8 shadow-md max-w-3xl mx-auto">
                <div className="mb-8">
                  <label className="block font-medium text-text-dark mb-2">Data da encomenda *</label>
                  <input 
                    type="date"
                    value={orderData.orderDate || ""}
                    onChange={e => updateOrder("orderDate", e.target.value)}
                    className="w-full bg-white border-2 border-brand-border rounded-xl py-4 px-4 text-text-dark focus:outline-none focus:ring-primary focus:border-primary transition-all text-lg"
                  />
                </div>

                <div className="mb-6 pb-6 border-b border-cream">
                  <div className="font-medium text-text-dark mb-4 text-lg">Resumo do Pedido</div>
                  <div className="bg-cream/50 p-4 rounded-xl border border-brand-border space-y-2">
                    {category === "custom_cakes" && (
                      <p className="text-soft-text text-sm">
                        <span className="font-semibold text-text-dark">Produto:</span> Bolos Personalizados<br/>
                        <span className="font-semibold text-text-dark">Tamanho:</span> {orderData.size}<br/>
                        <span className="font-semibold text-text-dark">Sabor:</span> {orderData.flavor}<br/>
                        <span className="font-semibold text-text-dark">Decoração:</span> {orderData.design}<br/>
                        <span className="font-semibold text-text-dark">Adicionais:</span> {orderData.addons && orderData.addons.length > 0 ? orderData.addons.join(", ") : "Nenhum"}
                      </p>
                    )}
                    {category === "mini_cakes" && (
                      <p className="text-soft-text text-sm">
                        <span className="font-semibold text-text-dark">Produto:</span> Mini Cake (4"x3")<br/>
                        <span className="font-semibold text-text-dark">Sabor:</span> {orderData.flavor}
                      </p>
                    )}
                    {category === "brigadeiros" && (
                      <p className="text-soft-text text-sm">
                        <span className="font-semibold text-text-dark">Produto:</span> Brigadeiros de Festa<br/>
                        <span className="font-semibold text-text-dark">Linha:</span> {orderData.brigType}<br/>
                        <span className="font-semibold text-text-dark">Quantidade:</span> {orderData.brigQty} un<br/>
                        <span className="font-semibold text-text-dark">Sabor:</span> {orderData.flavor}
                      </p>
                    )}
                    {category === "mini_desserts" && (
                      <p className="text-soft-text text-sm">
                        <span className="font-semibold text-text-dark">Produto:</span> Mini Sobremesas (Tacinhas)<br/>
                        <span className="font-semibold text-text-dark">Sabor:</span> {orderData.flavor}<br/>
                        <span className="font-semibold text-text-dark">Quantidade:</span> {orderData.qty} unidades
                      </p>
                    )}
                    {category === "brazilian_sweets" && (
                      <p className="text-soft-text text-sm">
                        <span className="font-semibold text-text-dark">Produto:</span> {orderData.sweetsType}<br/>
                        <span className="font-semibold text-text-dark">Sabor:</span> {orderData.flavor}<br/>
                        <span className="font-semibold text-text-dark">Quantidade:</span> {orderData.qty} unidades
                      </p>
                    )}
                    {category === "desserts" && (
                      <p className="text-soft-text text-sm">
                        <span className="font-semibold text-text-dark">Produto:</span> {orderData.dessertType}<br/>
                        {orderData.flavor && <><span className="font-semibold text-text-dark">Sabor:</span> {orderData.flavor}<br/></>}
                      </p>
                    )}
                    {category === "party_packages" && (
                      <p className="text-soft-text text-sm">
                        <span className="font-semibold text-text-dark">Produto:</span> {orderData.kitType}<br/>
                        <span className="font-semibold text-text-dark">Detalhes:</span> {orderData.kitDetails}
                      </p>
                    )}
                    {category !== "custom_cakes" && category !== "mini_cakes" && category !== "brigadeiros" && category !== "mini_desserts" && category !== "brazilian_sweets" && category !== "desserts" && category !== "party_packages" && (
                      <p className="text-soft-text text-sm">
                        <span className="font-semibold text-text-dark">Produto:</span> {catInfo.name[isEn ? 'en' : 'pt']}<br/>
                        <span className="font-semibold text-text-dark">Detalhes:</span> {orderData.details}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="font-medium text-text-dark mb-2">Observações</div>
                  <textarea 
                    className="w-full bg-white border-2 border-brand-border rounded-xl p-4 text-text-dark focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="Ex: forminhas brancas, combinar a retirada, etc..."
                    value={orderData.notes || ""}
                    onChange={(e) => updateOrder("notes", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="mt-8 pt-6 border-t-2 border-brand-border flex justify-between items-center">
                  <div className="text-lg font-serif text-text-dark uppercase tracking-wide">Valor:</div>
                  <div className="text-4xl font-serif text-primary font-bold">
                    ${calculateTotal()}
                  </div>
                </div>
                {category === "custom_cakes" && (
                  <p className="text-right text-xs text-soft-text mt-2 uppercase tracking-wide">
                    * O valor final varia de acordo com a complexidade da decoração.
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="mt-12 flex justify-center pb-20">
                <button 
                  onClick={submitOrder}
                  className={`flex items-center space-x-3 text-white px-10 py-5 rounded-full font-bold tracking-wide uppercase transition-all shadow-lg hover:shadow-xl text-lg ${
                    orderData.orderDate ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Check size={24} />
                  <span>{isEn ? "Continue in Messages" : "Finalizar pelo WhatsApp"}</span>
                </button>
              </div>
              
              {!orderData.orderDate && (
                <p className="text-center text-sm text-red-500 mt-4">
                  * Informe a data da encomenda para finalizar
                </p>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
