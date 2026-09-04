"use client";

import { useState } from "react";
import { X, Check, MessageCircle, MessageSquare } from "lucide-react";
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
  BRIGADEIRO_DOCINHOS,
  MINI_DESSERTS,
  BRAZILIAN_SWEETS_DATA,
  DESSERTS_DATA,
  PARTY_PACKAGES_DATA
} from "@/data/catalog";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

interface OrderBuilderProps {
  lang: string;
  category: ProductCategory;
  onClose: () => void;
}

export function OrderBuilder({ lang, category, onClose }: OrderBuilderProps) {
  const isEn = lang === "en";
  const catInfo = CATEGORIES.find(c => c.id === category)!;

  const [orderData, setOrderData] = useState<any>({});
  
  const updateOrder = (key: string, value: any, nextStepId?: string) => {
    setOrderData((prev: any) => ({ ...prev, [key]: value }));
    if (nextStepId) {
      setTimeout(() => {
        const el = document.getElementById(nextStepId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  };

  const updateOrderMulti = (updates: any, nextStepId?: string) => {
    setOrderData((prev: any) => ({ ...prev, ...updates }));
    if (nextStepId) {
      setTimeout(() => {
        const el = document.getElementById(nextStepId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
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
      const sizeObj = CAKE_SIZES.find(s => s.label.pt === orderData.size);
      if (sizeObj) total += sizeObj.price;
      
      if (orderData.addons) {
        orderData.addons.forEach((addonLabel: string) => {
          const addonObj = CAKE_ADDONS.find(a => a.label.pt === addonLabel);
          if (addonObj) total += addonObj.price;
        });
      }
    } else if (category === "mini_cakes") {
      total = 30;
    } else if (category === "brigadeiros") {
      if (orderData.brigType === "Docinhos") {
        if (orderData.flavor && orderData.brigQty) {
          const docinho = BRIGADEIRO_DOCINHOS.find(d => d.name === orderData.flavor);
          if (docinho) total = docinho.price * orderData.brigQty;
        }
      } else if (orderData.brigType && orderData.brigQty) {
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
        const dessertObj = DESSERTS_DATA.find(d => (typeof d.name === "string" ? d.name : d.name.pt) === orderData.dessertType);
        if (dessertObj) total = dessertObj.price;
      }
    } else if (category === "party_packages") {
      if (orderData.kitType) {
        const kitObj = PARTY_PACKAGES_DATA.find(k => (typeof k.name === "string" ? k.name : k.name.pt) === orderData.kitType);
        if (kitObj) total = kitObj.price;
      }
    }
    return total;
  };

  const generateWhatsAppMessage = () => {
    let msg = isEn ? "Hi Monae! I'd like to request an order.\n\n" : "Olá Monae! Gostaria de fazer uma encomenda.\n\n";
    const total = calculateTotal();
    
    if (category === "custom_cakes") {
      msg += `${isEn ? "Order Date:" : "Data da encomenda:"} ${orderData.orderDate || (isEn ? "Not provided" : "Não informada")}\n\n`;
      msg += `${isEn ? "Product:" : "Produto:"} ${catInfo.name[isEn ? 'en' : 'pt']}\n`;
      msg += `${isEn ? "Size:" : "Tamanho:"} ${orderData.size || "-"}\n`;
      msg += `${isEn ? "Flavor:" : "Sabor:"} ${orderData.flavor || "-"}\n`;
      msg += `${isEn ? "Design:" : "Decoração:"} ${orderData.design || "-"}\n`;
      msg += `${isEn ? "Add-ons:" : "Adicionais:"} ${orderData.addons && orderData.addons.length > 0 ? orderData.addons.join(", ") : (isEn ? "None" : "Nenhum")}\n`;
      msg += `${isEn ? "Notes:" : "Mensagem/Observações:"} ${orderData.notes || "-"}\n\n`;
      msg += `${isEn ? "*Initial Estimated Total:*" : "*Valor Estimado Inicial:*"} $${total} ${isEn ? "(to be confirmed)" : "(a confirmar)"}\n`;
    } else if (category === "mini_cakes") {
      msg += `${isEn ? "Order Date:" : "Data da encomenda:"} ${orderData.orderDate || (isEn ? "Not provided" : "Não informada")}\n\n`;
      msg += `${isEn ? "Product:" : "Produto:"} Mini Cake\n`;
      msg += `${isEn ? "Flavor:" : "Sabor:"} ${orderData.flavor || "-"}\n`;
      msg += `${isEn ? "Notes:" : "Mensagem/Observações:"} ${orderData.notes || "-"}\n\n`;
      msg += `${isEn ? "*Estimated Total:*" : "*Valor Estimado:*"} $${total}\n`;
    } else if (category === "brigadeiros") {
      msg += `${isEn ? "Order Date:" : "Data da encomenda:"} ${orderData.orderDate || (isEn ? "Not provided" : "Não informada")}\n\n`;
      msg += `${isEn ? "Product:" : "Produto:"} ${isEn ? "Party Brigadeiros" : "Brigadeiros de Festa"}\n`;
      msg += `${isEn ? "Category:" : "Linha:"} ${orderData.brigType || "-"}\n`;
      msg += `${isEn ? "Flavor:" : "Sabor:"} ${orderData.flavor || "-"}\n`;
      msg += `${isEn ? "Quantity:" : "Quantidade:"} ${orderData.brigQty || "-"}\n`;
      msg += `${isEn ? "Notes:" : "Mensagem/Observações:"} ${orderData.notes || "-"}\n\n`;
      msg += `${isEn ? "*Estimated Total:*" : "*Valor Estimado:*"} $${orderData.brigType === "Docinhos" ? total.toFixed(2) : total}\n`;
    } else if (category === "mini_desserts") {
      msg += `${isEn ? "Order Date:" : "Data da encomenda:"} ${orderData.orderDate || (isEn ? "Not provided" : "Não informada")}\n\n`;
      msg += `${isEn ? "Product:" : "Produto:"} ${isEn ? "Mini Desserts" : "Mini Sobremesas (Tacinhas)"}\n`;
      msg += `${isEn ? "Flavor:" : "Sabor:"} ${orderData.flavor || "-"}\n`;
      msg += `${isEn ? "Quantity:" : "Quantidade:"} ${orderData.qty || "-"}\n`;
      msg += `${isEn ? "Notes:" : "Mensagem/Observações:"} ${orderData.notes || "-"}\n\n`;
      msg += `${isEn ? "*Estimated Total:*" : "*Valor Estimado:*"} $${total.toFixed(2)}\n`;
    } else if (category === "brazilian_sweets") {
      msg += `${isEn ? "Order Date:" : "Data da encomenda:"} ${orderData.orderDate || (isEn ? "Not provided" : "Não informada")}\n\n`;
      msg += `${isEn ? "Product:" : "Produto:"} ${orderData.sweetsType || "Bem-casado"}\n`;
      msg += `${isEn ? "Flavor:" : "Sabor:"} ${orderData.flavor || "-"}\n`;
      msg += `${isEn ? "Quantity:" : "Quantidade:"} ${orderData.qty || "-"}\n`;
      msg += `${isEn ? "Notes:" : "Mensagem/Observações:"} ${orderData.notes || "-"}\n\n`;
      msg += `${isEn ? "*Estimated Total:*" : "*Valor Estimado:*"} $${total.toFixed(2)}\n`;
    } else if (category === "desserts") {
      msg += `${isEn ? "Order Date:" : "Data da encomenda:"} ${orderData.orderDate || (isEn ? "Not provided" : "Não informada")}\n\n`;
      msg += `${isEn ? "Product:" : "Produto:"} ${orderData.dessertType || "-"}\n`;
      if (orderData.flavor) msg += `Sabor: ${orderData.flavor}\n`;
      msg += `${isEn ? "Notes:" : "Mensagem/Observações:"} ${orderData.notes || "-"}\n\n`;
      msg += `${isEn ? "*Estimated Total:*" : "*Valor Estimado:*"} $${total.toFixed(2)}\n`;
    } else if (category === "party_packages") {
      msg += `${isEn ? "Order Date:" : "Data da encomenda:"} ${orderData.orderDate || (isEn ? "Not provided" : "Não informada")}\n\n`;
      msg += `${isEn ? "Product:" : "Produto:"} ${orderData.kitType || "-"}\n`;
      msg += `${isEn ? "Details/Flavors:" : "Detalhes/Sabores:"} ${orderData.kitDetails || "-"}\n`;
      msg += `${isEn ? "Notes:" : "Mensagem/Observações:"} ${orderData.notes || "-"}\n\n`;
      msg += `${isEn ? "*Estimated Total:*" : "*Valor Estimado:*"} $${total.toFixed(2)}\n`;
    } else {
      msg += `${isEn ? "Order Date:" : "Data da encomenda:"} ${orderData.orderDate || (isEn ? "Not provided" : "Não informada")}\n\n`;
      msg += `${isEn ? "Product:" : "Produto:"} ${catInfo.name[isEn ? 'en' : 'pt']}\n`;
      msg += `${isEn ? "Details:" : "Detalhes:"} ${orderData.details || "-"}\n`;
    }

    msg += `\n${isEn ? "Please confirm availability and final pricing." : "Por favor, confirme a disponibilidade e o valor final."}`;
    
    return encodeURIComponent(msg);
  };

  const openWhatsApp = () => {
    if (!orderData.orderDate) {
      alert(isEn ? "Please inform the order date." : "Por favor, informe a data da encomenda.");
      return;
    }
    const msg = generateWhatsAppMessage();
    window.open(`https://wa.me/15715258279?text=${msg}`, "_blank");
  };

  const openSMS = () => {
    if (!orderData.orderDate) {
      alert(isEn ? "Please inform the order date." : "Por favor, informe a data da encomenda.");
      return;
    }
    const msg = generateWhatsAppMessage();
    window.open(`sms:+15715258279?&body=${msg}`, "_blank");
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
      if (orderData.brigType === "Docinhos") {
        return !!orderData.flavor && orderData.brigQty >= 25;
      }
      return !!orderData.flavor;
    } else {
      return !!orderData.details;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-off-white flex flex-col">
      {/* Header */}
      <div className="h-16 md:h-20 border-b border-brand-border flex items-center justify-between px-4 md:px-6 bg-white shrink-0 shadow-sm z-10">
        <button onClick={onClose} className="p-2 text-text-dark hover:bg-cream rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
          <X size={22} />
        </button>
        <div className="text-base md:text-lg font-serif text-text-dark truncate px-2">
          {catInfo.name[isEn ? 'en' : 'pt']}
        </div>
        <div className="w-11"></div> {/* Spacer for centering */}
      </div>

      {/* Content Area - Continuous Scroll */}
      <div className="flex-grow overflow-y-auto p-4 md:p-8 lg:p-12 pb-40">
        <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
          
          {/* =======================
              CUSTOM CAKES FLOW 
             ======================= */}
          {category === "custom_cakes" && (
            <>
              {/* 1. Tamanho */}
              <div className="animate-in fade-in duration-500">
                <h2 className="text-2xl md:text-3xl font-serif mb-2 text-center uppercase tracking-widest text-primary">{isEn ? "Choose Size:" : "Escolha o Tamanho:"}</h2>
                <p className="text-center text-text-dark font-medium mb-6 md:mb-8 uppercase text-sm md:text-base">{isEn ? "Diameter & Weight" : "Diâmetro e Peso"}</p>
                
                <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
                  {CAKE_SIZES.map(s => (
                    <div 
                      key={s.id}
                      onClick={() => updateOrder("size", s.label.pt, "section-custom-flavor")}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all flex flex-col ${
                        orderData.size === s.label ? "border-primary bg-blush/30" : "border-brand-border bg-white hover:border-primary/50"
                      }`}
                    >
                      <div className="text-3xl font-serif text-primary mb-2 text-center">{s.label[isEn ? "en" : "pt"]}</div>
                      <div className="text-center font-medium text-text-dark mb-4">{s.serves[isEn ? "en" : "pt"]}</div>
                      <div className="text-center text-soft-text text-sm mb-4">
                        <p>{isEn ? "4 cake layers" : "4 camadas de massa"}</p>
                        <p>{isEn ? "3 filling layers" : "3 camadas de recheio"}</p>
                        <p>{isEn ? "Height: approx. 15cm (6in)" : "Altura: aprox. 15cm"}</p>
                        <p>{isEn ? "Buttercream" : "Buttercream"}</p>
                      </div>
                      <div className="text-center text-sm font-semibold uppercase text-text-dark mt-auto border-t border-brand-border pt-4">
                        {isEn ? "starting at:" : "a partir de:"} <br/><span className="text-xl">${s.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-center text-primary font-medium mt-8 text-sm uppercase tracking-wide">
                  {isEn ? "The final price will depend on the style and complexity of the design." : "O valor final irá depender do estilo e complexidade de decoração."}
                </p>
              </div>

              {/* 2. Sabor */}
              {orderData.size && (
                <div id="section-custom-flavor" className="animate-in fade-in slide-in-from-top-8 duration-700 pt-8">
                  <h2 className="text-3xl font-serif mb-8 text-center text-primary uppercase">{isEn ? "Choose Flavor" : "Escolha o Sabor"}</h2>
                  
                  <h3 className="text-2xl font-serif text-text-dark mb-6 text-center border-b border-brand-border pb-4">{isEn ? "Traditional" : "Tradicionais"}</h3>
                  {CAKE_FLAVORS_TRADICIONAIS.map((group, idx) => (
                    <div key={idx} className="mb-8">
                      <h4 className="text-lg font-medium text-primary mb-4">{group.category[isEn ? "en" : "pt"]}</h4>
                      <div className="grid gap-3 md:grid-cols-2">
                        {group.items.map(f => (
                          <div 
                            key={typeof f.name === "string" ? f.name : f.name[isEn ? "en" : "pt"]}
                            onClick={() => updateOrder("flavor", `${typeof f.name === "string" ? f.name : f.name[isEn ? "en" : "pt"]} (Tradicional - ${group.category[isEn ? "en" : "pt"]})`, "section-custom-design")}
                            className={`p-5 rounded-xl border cursor-pointer transition-all ${
                              orderData.flavor === `${typeof f.name === "string" ? f.name : f.name[isEn ? "en" : "pt"]} (Tradicional - ${group.category[isEn ? "en" : "pt"]})` ? "border-primary bg-blush/30" : "border-brand-border bg-white hover:border-primary/50"
                            }`}
                          >
                            <div className="font-bold text-text-dark mb-1">{typeof f.name === "string" ? f.name : f.name[isEn ? "en" : "pt"]}</div>
                            <div className="text-sm text-soft-text">{f.desc[isEn ? "en" : "pt"]}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <h3 className="text-2xl font-serif text-text-dark mb-6 text-center border-b border-brand-border pb-4 mt-12">{isEn ? "Specialties" : "Especiais"}</h3>
                  {CAKE_FLAVORS_ESPECIAIS.map((group, idx) => (
                    <div key={idx} className="mb-8">
                      <h4 className="text-lg font-medium text-primary mb-4">{group.category[isEn ? "en" : "pt"]}</h4>
                      <div className="grid gap-3 md:grid-cols-2">
                        {group.items.map(f => (
                          <div 
                            key={typeof f.name === "string" ? f.name : f.name[isEn ? "en" : "pt"]}
                            onClick={() => updateOrder("flavor", `${typeof f.name === "string" ? f.name : f.name[isEn ? "en" : "pt"]} (Especial - ${group.category[isEn ? "en" : "pt"]})`, "section-custom-design")}
                            className={`p-5 rounded-xl border cursor-pointer transition-all ${
                              orderData.flavor === `${typeof f.name === "string" ? f.name : f.name[isEn ? "en" : "pt"]} (Especial - ${group.category[isEn ? "en" : "pt"]})` ? "border-primary bg-blush/30" : "border-brand-border bg-white hover:border-primary/50"
                            }`}
                          >
                            <div className="font-bold text-text-dark mb-1">{typeof f.name === "string" ? f.name : f.name[isEn ? "en" : "pt"]}</div>
                            <div className="text-sm text-soft-text">{f.desc[isEn ? "en" : "pt"]}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="mt-8 p-6 bg-cream rounded-xl text-center border border-brand-border">
                    <p className="font-serif text-lg text-primary mb-2">{isEn ? "Didn't find the flavor you want?" : "Não encontrou o recheio que deseja?"}</p>
                    <p className="text-soft-text text-sm">{isEn ? "Send us a message and tell us what you have in mind. We would be happy to create something special and personalized for you." : "Nos mande uma mensagem e nos diga o que tem em mente, ficaremos felizes em fazer algo especial e personalizado pra você."}</p>
                  </div>
                </div>
              )}

              {/* 3. Decoração */}
              {orderData.size && orderData.flavor && (
                <div id="section-custom-design" className="animate-in fade-in slide-in-from-top-8 duration-700 pt-8">
                  <h2 className="text-3xl font-serif mb-8 text-center text-primary uppercase">{isEn ? "Choose Design" : "Escolha a Decoração"}</h2>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {CAKE_DESIGNS.map(d => (
                      <div 
                        key={d.id}
                        onClick={() => updateOrder("design", d.label.pt, "section-custom-addons")}
                        className={`rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                          orderData.design === d.label ? "border-primary bg-blush/30" : "border-brand-border bg-white hover:border-primary/50"
                        }`}
                      >
                        <div className={`p-6 text-center font-serif text-xl ${orderData.design === d.label ? "text-primary font-bold" : "text-text-dark"}`}>
                          {d.label[isEn ? "en" : "pt"]}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-cream rounded-xl text-center border border-brand-border">
                    <p className="font-serif text-lg text-primary mb-2">{isEn ? "Didn't find an inspiration that fits?" : "Não se identificou com as inspirações?"}</p>
                    <p className="text-soft-text text-sm">{isEn ? "Send us a message and tell us what you have in mind." : "Nos mande uma mensagem e nos diga o que tem em mente."}</p>
                  </div>
                </div>
              )}

              {/* 4. Adicionais */}
              {orderData.size && orderData.flavor && orderData.design && (
                <div id="section-custom-addons" className="animate-in fade-in slide-in-from-top-8 duration-700 pt-8">
                  <h2 className="text-3xl font-serif mb-2 text-center text-primary uppercase">{isEn ? "Choose Add-ons" : "Escolha os Adicionais"}</h2>
                  <p className="text-center text-text-dark font-medium mb-8 uppercase">{isEn ? "Decorative (Optional)" : "Decorativos (Opcional)"}</p>
                  
                  <div className="grid gap-4">
                    {CAKE_ADDONS.map(a => {
                      const isSelected = (orderData.addons || []).includes(a.label);
                      return (
                        <div 
                          key={a.id}
                          onClick={() => toggleAddon(a.label.pt)}
                          className={`p-6 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center ${
                            isSelected ? "border-primary bg-blush/30" : "border-brand-border bg-white hover:border-primary/50"
                          }`}
                        >
                          <div className="text-lg font-bold text-text-dark flex items-center gap-3">
                            <div className={`w-6 h-6 rounded border flex items-center justify-center ${isSelected ? 'bg-primary border-primary text-white' : 'border-gray-300 bg-white'}`}>
                              {isSelected && <Check size={16} />}
                            </div>
                            {a.label[isEn ? "en" : "pt"]}
                          </div>
                          <div className="text-primary font-medium text-sm uppercase">{a.priceText[isEn ? "en" : "pt"]}</div>
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
                <p className="text-center text-text-dark mb-8 font-serif">{isEn ? "Perfect for intimate moments" : "Perfeito para momentos íntimos"}</p>

                <div className="bg-white border border-brand-border p-6 rounded-2xl shadow-sm mb-12 text-center max-w-2xl mx-auto">
                  <p className="text-soft-text text-lg">
                    {isEn ? "A mini cake is the perfect size to share for two.<br/>" : "Mini cake é um bolo perfeito para experimentar a dois.<br/>"}
                    {isEn ? "Approximate size 4\"x3\"" : "Tamanho de aproximadamente 4\"x3\""}
                  </p>
                  <div className="text-3xl font-serif text-primary mt-4 font-bold">{isEn ? "Price: $30" : "Valor: $30"}</div>
                </div>

                <h3 className="text-2xl font-serif mb-6 text-center text-text-dark">{isEn ? "Choose Flavor" : "Escolha o Sabor"}</h3>
                <p className="text-center text-soft-text mb-8">{isEn ? "Choose one of our traditional flavors." : "Escolha um dos nossos sabores tradicionais."}</p>

                <div className="grid gap-3 md:grid-cols-2 max-w-2xl mx-auto">
                  {CAKE_FLAVORS_TRADICIONAIS.flatMap(g => g.items).map(f => (
                    <div 
                      key={typeof f.name === "string" ? f.name : f.name[isEn ? "en" : "pt"]}
                      onClick={() => updateOrder("flavor", typeof f.name === "string" ? f.name : f.name.pt, "section-notes")}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                        orderData.flavor === f.name ? "border-primary bg-blush/30 text-primary" : "border-brand-border bg-white hover:border-primary/50 text-text-dark"
                      }`}
                    >
                      <div className="font-bold">{typeof f.name === "string" ? f.name : f.name[isEn ? "en" : "pt"]}</div>
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
                <h2 className="text-3xl font-serif mb-2 text-center text-primary uppercase">{isEn ? "Party Brigadeiros" : "BRIGADEIROS de festa"}</h2>
                <p className="text-center text-text-dark mb-8 font-serif">Monae Dessert Studio</p>
                
                <div className="bg-cream border border-brand-border p-6 rounded-2xl mb-12 text-center max-w-2xl mx-auto">
                  <p className="text-soft-text text-sm leading-relaxed">
                    {isEn ? "Our party brigadeiros weigh between 15g and 18g and are served in traditional brown or white cups. If you prefer another color, please check availability.<br/>" : "Nossos brigadeiros de festa pesam entre 15g e 18g e são entregues em forminhas tradicionais na cor marrom ou branca. Caso deseje outra cor, consulte a disponibilidade.<br/>"}
                    <span className="font-bold text-primary mt-2 block">{isEn ? "Minimum order: 25 units per flavor" : "Pedido mínimo: 25 unidades por sabor"}</span>
                  </p>
                </div>

                {/* {isEn ? "1. Choose the Category" : "1. Escolha a Linha"} */}
                <div>
                  <h3 className="text-xl font-serif text-primary mb-4 border-b border-brand-border pb-2">{isEn ? "1. Choose the Category" : "1. Escolha a Linha"}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div 
                      onClick={() => updateOrderMulti({ brigType: "Tradicional", brigQty: null, flavor: null }, "section-brig-qty")}
                      className={`p-6 rounded-xl border-2 cursor-pointer text-center transition-all ${
                        orderData.brigType === "Tradicional" ? "border-primary bg-blush/30" : "border-brand-border bg-white hover:border-primary/50"
                      }`}
                    >
                      <div className={`text-2xl font-serif ${orderData.brigType === "Tradicional" ? "text-primary" : "text-text-dark"}`}>{isEn ? "Traditional" : "Tradicionais"}</div>
                    </div>
                    <div 
                      onClick={() => updateOrderMulti({ brigType: "Especial", brigQty: null, flavor: null }, "section-brig-qty")}
                      className={`p-6 rounded-xl border-2 cursor-pointer text-center transition-all ${
                        orderData.brigType === "Especial" ? "border-primary bg-blush/30" : "border-brand-border bg-white hover:border-primary/50"
                      }`}
                    >
                      <div className={`text-2xl font-serif ${orderData.brigType === "Especial" ? "text-primary" : "text-text-dark"}`}>{isEn ? "Specialties" : "Especiais"}</div>
                    </div>
                    <div 
                      onClick={() => updateOrderMulti({ brigType: "Docinhos", brigQty: null, flavor: null }, "section-brig-flavor-doc")}
                      className={`p-6 rounded-xl border-2 cursor-pointer text-center transition-all ${
                        orderData.brigType === "Docinhos" ? "border-primary bg-blush/30" : "border-brand-border bg-white hover:border-primary/50"
                      }`}
                    >
                      <div className={`text-2xl font-serif ${orderData.brigType === "Docinhos" ? "text-primary" : "text-text-dark"}`}>{isEn ? "Sweets" : "Docinhos"}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* {isEn ? "2. Choose Quantity" : "2. Escolha a Quantidade"} (Tradicionais/Especiais) */}
              {orderData.brigType && orderData.brigType !== "Docinhos" && (
                <div id="section-brig-qty" className="animate-in fade-in slide-in-from-top-8 duration-700 pt-8">
                  <h3 className="text-xl font-serif text-primary mb-4 border-b border-brand-border pb-2">{isEn ? "2. Choose Quantity" : "2. Escolha a Quantidade"}</h3>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {(orderData.brigType === "Tradicional" ? BRIGADEIRO_TIERS.tradicionais : BRIGADEIRO_TIERS.especiais).map(tier => (
                      <div 
                        key={tier.qty}
                        onClick={() => updateOrderMulti({ brigQty: tier.qty, flavor: null }, "section-brig-flavor")}
                        className={`p-4 rounded-xl border-2 cursor-pointer text-center transition-all ${
                          orderData.brigQty === tier.qty ? "border-primary bg-blush/30" : "border-brand-border bg-white hover:border-primary/50"
                        }`}
                      >
                        <div className="text-lg font-bold text-text-dark">{tier.qty} {isEn ? "units" : "un"}</div>
                        <div className="text-primary font-medium">$ {tier.price.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. {isEn ? "Choose Flavor" : "Escolha o Sabor"} (Tradicionais/Especiais) */}
              {orderData.brigType && orderData.brigType !== "Docinhos" && orderData.brigQty && (
                <div id="section-brig-flavor" className="animate-in fade-in slide-in-from-top-8 duration-700 pt-8">
                  <h3 className="text-xl font-serif text-primary mb-4 border-b border-brand-border pb-2">3. {isEn ? "Choose Flavor" : "Escolha o Sabor"}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {(orderData.brigType === "Tradicional" ? BRIGADEIRO_FLAVORS.tradicionais : BRIGADEIRO_FLAVORS.especiais).map(f => (
                      <div 
                        key={f}
                        onClick={() => updateOrder("flavor", f, "section-notes")}
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

          
              {/* 2. {isEn ? "Choose Flavor" : "Escolha o Sabor"} (Docinhos) */}
              {orderData.brigType === "Docinhos" && (
                <div id="section-brig-flavor-doc" className="animate-in fade-in slide-in-from-top-8 duration-700 pt-8">
                  <h3 className="text-xl font-serif text-primary mb-4 border-b border-brand-border pb-2">2. {isEn ? "Choose Flavor" : "Escolha o Sabor"}</h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {BRIGADEIRO_DOCINHOS.map(d => (
                      <div 
                        key={d.id}
                        onClick={() => updateOrderMulti({ flavor: d.name, brigQty: orderData.brigQty || 25 }, "section-brig-qty-doc")}
                        className={`p-5 rounded-xl border-2 cursor-pointer transition-all flex flex-col h-full ${
                          orderData.flavor === d.name ? "border-primary bg-blush/30" : "border-brand-border bg-white hover:border-primary/50"
                        }`}
                      >
                        <div className="font-bold text-text-dark mb-2">{typeof d.name === "string" ? d.name : d.name[isEn ? "en" : "pt"]}</div>
                        <div className="text-sm text-soft-text mb-4 flex-grow">{d.desc[isEn ? "en" : "pt"]}</div>
                        <div className="text-primary font-bold mt-auto pt-2 border-t border-brand-border">$ {d.price.toFixed(2)} un</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* {isEn ? "3. Set Quantity" : "3. Defina a Quantidade"} (Docinhos) */}
              {orderData.brigType === "Docinhos" && orderData.flavor && (
                <div id="section-brig-qty-doc" className="animate-in fade-in slide-in-from-top-8 duration-700 pt-8">
                  <h3 className="text-xl font-serif text-primary mb-4 border-b border-brand-border pb-2">{isEn ? "3. Set Quantity" : "3. Defina a Quantidade"}</h3>
                  <div className="max-w-xs mx-auto bg-white border-2 border-brand-border rounded-xl p-6 text-center shadow-sm">
                    <label className="block text-soft-text text-sm mb-4">{isEn ? "Minimum 25 units" : "Mínimo 25 unidades"}</label>
                    <div className="flex items-center justify-center gap-4">
                      <button 
                        onClick={() => orderData.brigQty > 25 && updateOrder("brigQty", orderData.brigQty - 1)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center border ${orderData.brigQty > 25 ? 'border-primary text-primary hover:bg-blush' : 'border-gray-300 text-gray-300'}`}
                      >
                        -
                      </button>
                      <input 
                        type="number" 
                        min="25"
                        value={orderData.brigQty}
                        onChange={(e) => updateOrder("brigQty", Math.max(25, parseInt(e.target.value) || 25))}
                        className="w-20 text-center text-2xl font-bold text-text-dark focus:outline-none"
                      />
                      <button 
                        onClick={() => updateOrder("brigQty", (orderData.brigQty || 25) + 1)}
                        className="w-10 h-10 rounded-full flex items-center justify-center border border-primary text-primary hover:bg-blush"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}

          {/* =======================
              MINI DESSERTS FLOW
             ======================= */}
          {category === "mini_desserts" && (
            <>
              <div className="animate-in fade-in duration-500">
                <h2 className="text-3xl font-serif mb-2 text-center text-primary uppercase">Mini Sobremesas / Tacinhas</h2>
                <p className="text-center text-text-dark mb-8 font-serif">{isEn ? "Delightful cups of joy" : "Deliciosas tacinhas de alegria"}</p>

                <div className="bg-cream border border-brand-border p-6 rounded-2xl mb-12 text-center max-w-2xl mx-auto">
                  <p className="font-bold text-primary">{isEn ? "Minimum order: 25 units per flavor" : "Pedido mínimo: 25 unidades por sabor"}</p>
                </div>

                {/* 1. {isEn ? "Choose Flavor" : "Escolha o Sabor"} */}
                <div>
                  <h3 className="text-xl font-serif text-primary mb-6 border-b border-brand-border pb-2">1. {isEn ? "Choose Flavor" : "Escolha o Sabor"}</h3>
                  
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {MINI_DESSERTS.map(d => (
                      <div 
                        key={d.id}
                        onClick={() => updateOrderMulti({ flavor: d.name, qty: orderData.qty || 25 }, "section-mini-qty")}
                        className={`p-5 rounded-xl border-2 cursor-pointer transition-all flex flex-col h-full ${
                          orderData.flavor === d.name ? "border-primary bg-blush/30" : "border-brand-border bg-white hover:border-primary/50"
                        }`}
                      >
                        <div className="font-bold text-text-dark mb-2">{typeof d.name === "string" ? d.name : d.name[isEn ? "en" : "pt"]}</div>
                        <div className="text-sm text-soft-text mb-4 flex-grow">{d.desc[isEn ? "en" : "pt"]}</div>
                        <div className="text-primary font-bold mt-auto pt-2 border-t border-brand-border">$ {d.price.toFixed(2)} un</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* {isEn ? "2. Choose Quantity" : "2. Escolha a Quantidade"} */}
              {orderData.flavor && (
                <div id="section-mini-qty" className="animate-in fade-in slide-in-from-top-8 duration-700 pt-8">
                  <h3 className="text-xl font-serif text-primary mb-4 border-b border-brand-border pb-2">{isEn ? "2. Set Quantity" : "2. Defina a Quantidade"}</h3>
                  <div className="max-w-xs mx-auto bg-white border-2 border-brand-border rounded-xl p-6 text-center shadow-sm">
                    <label className="block text-soft-text text-sm mb-4">{isEn ? "Minimum 25 units" : "Mínimo 25 unidades"}</label>
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
                <p className="text-center text-text-dark mb-8 font-serif">{isEn ? "Classic party favors" : "Clássicos para festas"}</p>

                <div className="bg-cream border border-brand-border p-6 rounded-2xl mb-12 text-center max-w-2xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6">
                  <div className="text-2xl font-serif text-primary font-bold">
                    $ {BRAZILIAN_SWEETS_DATA.price.toFixed(2)} un
                  </div>
                  <div className="h-8 w-px bg-brand-border hidden md:block"></div>
                  <p className="font-bold text-text-dark uppercase tracking-wide text-sm">
                    {isEn ? "Minimum order:" : "Pedido mínimo:"} {BRAZILIAN_SWEETS_DATA.minQty} unidades
                  </p>
                </div>

                {/* 1. Escolha a Ocasião */}
                <div>
                  <h3 className="text-xl font-serif text-primary mb-6 border-b border-brand-border pb-2">{isEn ? "1. What is the occasion?" : "1. Qual a ocasião?"}</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {BRAZILIAN_SWEETS_DATA.types.map(type => (
                      <div 
                        key={type}
                        onClick={() => updateOrderMulti({ sweetsType: type, flavor: null, qty: orderData.qty || BRAZILIAN_SWEETS_DATA.minQty }, "section-brazilian-flavor")}
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

              {/* 2. {isEn ? "Choose Flavor" : "Escolha o Sabor"} */}
              {orderData.sweetsType && (
                <div id="section-brazilian-flavor" className="animate-in fade-in slide-in-from-top-8 duration-700 pt-8">
                  <h3 className="text-xl font-serif text-primary mb-6 border-b border-brand-border pb-2">2. {isEn ? "Choose Flavor" : "Escolha o Sabor"}</h3>
                  
                  <div className="grid gap-3 sm:grid-cols-3">
                    {BRAZILIAN_SWEETS_DATA.flavors.map(f => (
                      <div 
                        key={f}
                        onClick={() => updateOrder("flavor", f, "section-brazilian-qty")}
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
                  <h3 className="text-xl font-serif text-primary mb-4 border-b border-brand-border pb-2">{isEn ? "3. Set Quantity" : "3. Defina a Quantidade"}</h3>
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
                <p className="text-center text-text-dark mb-8 font-serif">{isEn ? "To share with the family" : "Para compartilhar com a família"}</p>

                {/* {isEn ? "1. Choose the Dessert" : "1. Escolha a Sobremesa"} */}
                <div>
                  <h3 className="text-xl font-serif text-primary mb-6 border-b border-brand-border pb-2">{isEn ? "1. Choose the Dessert" : "1. Escolha a Sobremesa"}</h3>
                  
                  <div className="grid gap-4 md:grid-cols-3">
                    {DESSERTS_DATA.map(d => (
                      <div 
                        key={d.id}
                        onClick={() => updateOrderMulti({ dessertType: typeof d.name === "string" ? d.name : d.name.pt, flavor: null }, d.flavors ? "section-desserts-flavor" : "section-notes")}
                        className={`p-5 rounded-xl border-2 cursor-pointer transition-all flex flex-col h-full ${
                          orderData.dessertType === d.name ? "border-primary bg-blush/30" : "border-brand-border bg-white hover:border-primary/50 text-text-dark"
                        }`}
                      >
                        <div className="font-bold text-xl text-text-dark mb-2">{typeof d.name === "string" ? d.name : d.name[isEn ? "en" : "pt"]}</div>
                        <div className="text-sm text-soft-text mb-4 flex-grow">{d.desc[isEn ? "en" : "pt"]}</div>
                        <div className="text-sm font-semibold text-primary mb-2">{d.serves[isEn ? "en" : "pt"]}</div>
                        <div className="text-xs text-soft-text italic mb-4">{d.validity[isEn ? "en" : "pt"]}</div>
                        <div className="text-primary font-bold mt-auto pt-2 border-t border-brand-border text-lg">$ {d.price.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2. {isEn ? "Choose Flavor" : "Escolha o Sabor"} (Only for Bombom na travessa) */}
              {orderData.dessertType === "Bombom na travessa" && (
                <div className="animate-in fade-in slide-in-from-top-8 duration-700">
                  <h3 className="text-xl font-serif text-primary mb-6 border-b border-brand-border pb-2">2. {isEn ? "Choose Flavor" : "Escolha o Sabor"}</h3>
                  
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
                <p className="text-center text-text-dark mb-8 font-serif">{isEn ? "Curated sets for events" : "Kits selecionados para eventos"}</p>

                {/* {isEn ? "1. Choose a Package" : "1. Escolha o Kit"} */}
                <div>
                  <h3 className="text-xl font-serif text-primary mb-6 border-b border-brand-border pb-2">{isEn ? "1. Choose a Package" : "1. Escolha o Kit"}</h3>
                  
                  <div className="grid gap-4 md:grid-cols-3">
                    {PARTY_PACKAGES_DATA.map(k => (
                      <div 
                        key={k.id}
                        onClick={() => updateOrderMulti({ kitType: typeof k.name === "string" ? k.name : k.name.pt, kitDetails: "" })}
                        className={`p-5 rounded-xl border-2 cursor-pointer transition-all flex flex-col h-full ${
                          orderData.kitType === k.name ? "border-primary bg-blush/30" : "border-brand-border bg-white hover:border-primary/50 text-text-dark"
                        }`}
                      >
                        <div className="font-bold text-lg text-text-dark mb-2">{typeof k.name === "string" ? k.name : k.name[isEn ? "en" : "pt"]}</div>
                        <div className="text-sm text-soft-text mb-4 flex-grow whitespace-pre-line">{k.desc[isEn ? "en" : "pt"]}</div>
                        <div className="text-primary font-bold mt-auto pt-2 border-t border-brand-border text-lg">$ {k.price.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* {isEn ? "2. Customize your Package" : "2. Personalize seu Kit"} */}
              {orderData.kitType && (
                <div className="animate-in fade-in slide-in-from-top-8 duration-700">
                  <h3 className="text-xl font-serif text-primary mb-4 border-b border-brand-border pb-2">{isEn ? "2. Customize your Package" : "2. Personalize seu Kit"}</h3>
                  <div className="bg-white border-2 border-brand-border rounded-xl p-6 shadow-sm">
                    <label className="block text-text-dark font-medium mb-3">
                      {orderData.kitType.includes("Mini Cake") 
                        ? (isEn ? "Write the mini cake flavor and the 2 brigadeiro flavors:" : "Escreva o sabor do mini cake e os 2 sabores de brigadeiros:")
                        : (isEn ? "Write the cake flavor, brigadeiro flavors, and the topper theme:" : "Escreva o sabor do bolo, dos brigadeiros e o tema para os topos:")}
                    </label>
                    <textarea 
                      className="w-full bg-cream border border-brand-border rounded-xl p-4 text-text-dark focus:outline-none focus:ring-primary focus:border-primary min-h-[120px]"
                      placeholder={isEn ? "Ex: Chocolate cake with strawberries, traditional brigadeiros, and ninho..." : "Ex: Bolo de chocolate com morango, brigadeiros tradicionais e ninho..."}
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
              <h2 className="text-3xl font-serif mb-8 text-center text-primary">{isEn ? "FINISH ORDER" : "FINALIZAR PEDIDO"}</h2>
              
              <div className="bg-white border-2 border-brand-border rounded-2xl p-8 shadow-md max-w-3xl mx-auto">
                <div className="mb-8">
                  <label className="block font-medium text-text-dark mb-2">{isEn ? "Order Date *" : "Data da encomenda *"}</label>
                  <input 
                    type="date"
                    value={orderData.orderDate || ""}
                    onChange={e => updateOrder("orderDate", e.target.value)}
                    className="w-full bg-white border-2 border-brand-border rounded-xl py-4 px-4 text-text-dark focus:outline-none focus:ring-primary focus:border-primary transition-all text-lg"
                  />
                </div>

                <div className="mb-6 pb-6 border-b border-cream">
                  <div className="font-medium text-text-dark mb-4 text-lg">{isEn ? "Order Summary" : "Resumo do Pedido"}</div>
                  <div className="bg-cream/50 p-4 rounded-xl border border-brand-border space-y-2">
                    {category === "custom_cakes" && (
                      <p className="text-soft-text text-sm">
                        <span className="font-semibold text-text-dark">{isEn ? "Product:" : "Produto:"}</span> {isEn ? "Custom Cakes" : "Bolos Personalizados"}<br/>
                        <span className="font-semibold text-text-dark">{isEn ? "Size:" : "Tamanho:"}</span> {orderData.size}<br/>
                        <span className="font-semibold text-text-dark">{isEn ? "Flavor:" : "Sabor:"}</span> {orderData.flavor}<br/>
                        <span className="font-semibold text-text-dark">{isEn ? "Design:" : "Decoração:"}</span> {orderData.design}<br/>
                        <span className="font-semibold text-text-dark">{isEn ? "Add-ons:" : "Adicionais:"}</span> {orderData.addons && orderData.addons.length > 0 ? orderData.addons.join(", ") : (isEn ? "None" : "Nenhum")}
                      </p>
                    )}
                    {category === "mini_cakes" && (
                      <p className="text-soft-text text-sm">
                        <span className="font-semibold text-text-dark">{isEn ? "Product:" : "Produto:"}</span> Mini Cake (4"x3")<br/>
                        <span className="font-semibold text-text-dark">Sabor:</span> {orderData.flavor}
                      </p>
                    )}
                    {category === "brigadeiros" && (
                      <p className="text-soft-text text-sm">
                        <span className="font-semibold text-text-dark">{isEn ? "Product:" : "Produto:"}</span> {isEn ? "Party Brigadeiros" : "Brigadeiros de Festa"}<br/>
                        <span className="font-semibold text-text-dark">{isEn ? "Category:" : "Linha:"}</span> {orderData.brigType}<br/>
                        <span className="font-semibold text-text-dark">{isEn ? "Quantity:" : "Quantidade:"}</span> {orderData.brigQty} {isEn ? "units" : "un"}<br/>
                        <span className="font-semibold text-text-dark">Sabor:</span> {orderData.flavor}
                      </p>
                    )}
                    {category === "mini_desserts" && (
                      <p className="text-soft-text text-sm">
                        <span className="font-semibold text-text-dark">{isEn ? "Product:" : "Produto:"}</span> {isEn ? "Mini Desserts" : "Mini Sobremesas (Tacinhas)"}<br/>
                        <span className="font-semibold text-text-dark">{isEn ? "Flavor:" : "Sabor:"}</span> {orderData.flavor}<br/>
                        <span className="font-semibold text-text-dark">{isEn ? "Quantity:" : "Quantidade:"}</span> {orderData.qty} {isEn ? "units" : "unidades"}
                      </p>
                    )}
                    {category === "brazilian_sweets" && (
                      <p className="text-soft-text text-sm">
                        <span className="font-semibold text-text-dark">{isEn ? "Product:" : "Produto:"}</span> {orderData.sweetsType}<br/>
                        <span className="font-semibold text-text-dark">{isEn ? "Flavor:" : "Sabor:"}</span> {orderData.flavor}<br/>
                        <span className="font-semibold text-text-dark">{isEn ? "Quantity:" : "Quantidade:"}</span> {orderData.qty} {isEn ? "units" : "unidades"}
                      </p>
                    )}
                    {category === "desserts" && (
                      <p className="text-soft-text text-sm">
                        <span className="font-semibold text-text-dark">{isEn ? "Product:" : "Produto:"}</span> {orderData.dessertType}<br/>
                        {orderData.flavor && <><span className="font-semibold text-text-dark">{isEn ? "Flavor:" : "Sabor:"}</span> {orderData.flavor}<br/></>}
                      </p>
                    )}
                    {category === "party_packages" && (
                      <p className="text-soft-text text-sm">
                        <span className="font-semibold text-text-dark">{isEn ? "Product:" : "Produto:"}</span> {orderData.kitType}<br/>
                        <span className="font-semibold text-text-dark">{isEn ? "Details:" : "Detalhes:"}</span> {orderData.kitDetails}
                      </p>
                    )}
                    {category !== "custom_cakes" && category !== "mini_cakes" && category !== "brigadeiros" && category !== "mini_desserts" && category !== "brazilian_sweets" && category !== "desserts" && category !== "party_packages" && (
                      <p className="text-soft-text text-sm">
                        <span className="font-semibold text-text-dark">{isEn ? "Product:" : "Produto:"}</span> {catInfo.name[isEn ? 'en' : 'pt']}<br/>
                        <span className="font-semibold text-text-dark">{isEn ? "Details:" : "Detalhes:"}</span> {orderData.details}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="font-medium text-text-dark mb-2">{isEn ? "Notes" : "Observações"}</div>
                  <textarea 
                    className="w-full bg-white border-2 border-brand-border rounded-xl p-4 text-text-dark focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder={isEn ? "Ex: white cups, arrange pickup, etc..." : "Ex: forminhas brancas, combinar a retirada, etc..."}
                    value={orderData.notes || ""}
                    onChange={(e) => updateOrder("notes", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="mt-8 pt-6 border-t-2 border-brand-border flex justify-between items-center">
                  <div className="text-lg font-serif text-text-dark uppercase tracking-wide">{isEn ? "Total:" : "Valor:"}</div>
                  <div className="text-4xl font-serif text-primary font-bold">
                    ${calculateTotal()}
                  </div>
                </div>
                {category === "custom_cakes" && (
                  <p className="text-right text-xs text-soft-text mt-2 uppercase tracking-wide">
                    {isEn ? "* The final price varies according to the complexity of the design." : "* O valor final varia de acordo com a complexidade da decoração."}
                  </p>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4 pb-20">
                <button 
                  onClick={openWhatsApp}
                  disabled={!orderData.orderDate}
                  className={`flex items-center justify-center space-x-3 text-white px-8 py-4 rounded-full font-bold tracking-wide uppercase transition-all shadow-md hover:shadow-lg text-sm md:text-base ${
                    orderData.orderDate ? "bg-[#25D366] hover:bg-[#20bd5a]" : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  <WhatsAppIcon />
                  <span>{isEn ? "Send via WhatsApp" : "Enviar pedido pelo WhatsApp"}</span>
                </button>
                <button 
                  onClick={openSMS}
                  disabled={!orderData.orderDate}
                  className={`flex items-center justify-center space-x-3 text-white px-8 py-4 rounded-full font-bold tracking-wide uppercase transition-all shadow-md hover:shadow-lg text-sm md:text-base ${
                    orderData.orderDate ? "bg-primary hover:bg-deep-cherry" : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  <MessageSquare size={20} />
                  <span>{isEn ? "Send via iMessage" : "Enviar pedido por SMS"}</span>
                </button>
              </div>
              
              {!orderData.orderDate && (
                <p className="text-center text-sm text-red-500 mt-4">
                  {isEn ? "* Enter the order date to finish" : "* Informe a data da encomenda para finalizar"}
                </p>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
