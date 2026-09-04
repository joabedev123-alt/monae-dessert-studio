const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/order-builder/OrderBuilder.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Update updateOrder and updateOrderMulti signatures
content = content.replace(
  `  const updateOrder = (key: string, value: any) => {
    setOrderData((prev: any) => ({ ...prev, [key]: value }));
  };`,
  `  const updateOrder = (key: string, value: any, nextStepId?: string) => {
    setOrderData((prev: any) => ({ ...prev, [key]: value }));
    if (nextStepId) {
      setTimeout(() => {
        const el = document.getElementById(nextStepId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  };`
);

content = content.replace(
  `  const updateOrderMulti = (updates: any) => {
    setOrderData((prev: any) => ({ ...prev, ...updates }));
  };`,
  `  const updateOrderMulti = (updates: any, nextStepId?: string) => {
    setOrderData((prev: any) => ({ ...prev, ...updates }));
    if (nextStepId) {
      setTimeout(() => {
        const el = document.getElementById(nextStepId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  };`
);

// 2. Custom Cakes - Size -> Flavor
content = content.replace(
  `onClick={() => updateOrder("size", s.label)}`,
  `onClick={() => updateOrder("size", s.label, "section-custom-flavor")}`
);
content = content.replace(
  `{orderData.size && (
                <div className="animate-in fade-in slide-in-from-top-8 duration-700">
                  <h2 className="text-3xl font-serif mb-8 text-center text-primary uppercase">Escolha o Sabor</h2>`,
  `{orderData.size && (
                <div id="section-custom-flavor" className="animate-in fade-in slide-in-from-top-8 duration-700 pt-8">
                  <h2 className="text-3xl font-serif mb-8 text-center text-primary uppercase">Escolha o Sabor</h2>`
);

// Custom Cakes - Flavor -> Design (tradicional)
content = content.replace(
  `onClick={() => updateOrder("flavor", \`\${f.name} (Tradicional - \${group.category})\`)}`,
  `onClick={() => updateOrder("flavor", \`\${f.name} (Tradicional - \${group.category})\`, "section-custom-design")}`
);

// Custom Cakes - Flavor -> Design (especial)
content = content.replace(
  `onClick={() => updateOrder("flavor", \`\${f.name} (Especial - \${group.category})\`)}`,
  `onClick={() => updateOrder("flavor", \`\${f.name} (Especial - \${group.category})\`, "section-custom-design")}`
);

content = content.replace(
  `{orderData.size && orderData.flavor && (
                <div className="animate-in fade-in slide-in-from-top-8 duration-700">
                  <h2 className="text-3xl font-serif mb-8 text-center text-primary uppercase">Escolha a Decoração</h2>`,
  `{orderData.size && orderData.flavor && (
                <div id="section-custom-design" className="animate-in fade-in slide-in-from-top-8 duration-700 pt-8">
                  <h2 className="text-3xl font-serif mb-8 text-center text-primary uppercase">Escolha a Decoração</h2>`
);

// Custom Cakes - Design -> Addons
content = content.replace(
  `onClick={() => updateOrder("design", d.label)}`,
  `onClick={() => updateOrder("design", d.label, "section-custom-addons")}`
);

content = content.replace(
  `{orderData.size && orderData.flavor && orderData.design && (
                <div className="animate-in fade-in slide-in-from-top-8 duration-700">
                  <h2 className="text-3xl font-serif mb-2 text-center text-primary uppercase">Escolha os Adicionais</h2>`,
  `{orderData.size && orderData.flavor && orderData.design && (
                <div id="section-custom-addons" className="animate-in fade-in slide-in-from-top-8 duration-700 pt-8">
                  <h2 className="text-3xl font-serif mb-2 text-center text-primary uppercase">Escolha os Adicionais</h2>`
);

// 3. Mini Cakes - Flavor -> Notes
content = content.replace(
  `onClick={() => updateOrder("flavor", f.name)}
                      className={\`p-4 rounded-xl border-2 cursor-pointer transition-all text-center \${
                        orderData.flavor === f.name ? "border-primary bg-blush/30 text-primary" : "border-brand-border bg-white hover:border-primary/50 text-text-dark"`,
  `onClick={() => updateOrder("flavor", f.name, "section-notes")}
                      className={\`p-4 rounded-xl border-2 cursor-pointer transition-all text-center \${
                        orderData.flavor === f.name ? "border-primary bg-blush/30 text-primary" : "border-brand-border bg-white hover:border-primary/50 text-text-dark"`
);

// 4. Brigadeiros - Type -> Qty
content = content.replace(
  `onClick={() => updateOrderMulti({ brigType: "Tradicional", brigQty: null, flavor: null })}`,
  `onClick={() => updateOrderMulti({ brigType: "Tradicional", brigQty: null, flavor: null }, "section-brig-qty")}`
);
content = content.replace(
  `onClick={() => updateOrderMulti({ brigType: "Especial", brigQty: null, flavor: null })}`,
  `onClick={() => updateOrderMulti({ brigType: "Especial", brigQty: null, flavor: null }, "section-brig-qty")}`
);

content = content.replace(
  `{orderData.brigType && (
                <div className="animate-in fade-in slide-in-from-top-8 duration-700">
                  <h3 className="text-xl font-serif text-primary mb-4 border-b border-brand-border pb-2">2. Escolha a Quantidade</h3>`,
  `{orderData.brigType && (
                <div id="section-brig-qty" className="animate-in fade-in slide-in-from-top-8 duration-700 pt-8">
                  <h3 className="text-xl font-serif text-primary mb-4 border-b border-brand-border pb-2">2. Escolha a Quantidade</h3>`
);

// Brigadeiros - Qty -> Flavor
content = content.replace(
  `onClick={() => updateOrderMulti({ brigQty: tier.qty, flavor: null })}`,
  `onClick={() => updateOrderMulti({ brigQty: tier.qty, flavor: null }, "section-brig-flavor")}`
);

content = content.replace(
  `{orderData.brigType && orderData.brigQty && (
                <div className="animate-in fade-in slide-in-from-top-8 duration-700">
                  <h3 className="text-xl font-serif text-primary mb-4 border-b border-brand-border pb-2">3. Escolha o Sabor</h3>`,
  `{orderData.brigType && orderData.brigQty && (
                <div id="section-brig-flavor" className="animate-in fade-in slide-in-from-top-8 duration-700 pt-8">
                  <h3 className="text-xl font-serif text-primary mb-4 border-b border-brand-border pb-2">3. Escolha o Sabor</h3>`
);

// Brigadeiros - Flavor -> Notes
content = content.replace(
  `{(orderData.brigType === "Tradicional" ? BRIGADEIRO_FLAVORS.tradicionais : BRIGADEIRO_FLAVORS.especiais).map(f => (
                      <div 
                        key={f}
                        onClick={() => updateOrder("flavor", f)}`,
  `{(orderData.brigType === "Tradicional" ? BRIGADEIRO_FLAVORS.tradicionais : BRIGADEIRO_FLAVORS.especiais).map(f => (
                      <div 
                        key={f}
                        onClick={() => updateOrder("flavor", f, "section-notes")}`
);

// 5. Mini Desserts - Flavor -> Qty
content = content.replace(
  `onClick={() => updateOrderMulti({ flavor: d.name, qty: orderData.qty || 25 })}`,
  `onClick={() => updateOrderMulti({ flavor: d.name, qty: orderData.qty || 25 }, "section-mini-qty")}`
);
content = content.replace(
  `{orderData.flavor && (
                <div className="animate-in fade-in slide-in-from-top-8 duration-700">
                  <h3 className="text-xl font-serif text-primary mb-4 border-b border-brand-border pb-2">2. Defina a Quantidade</h3>`,
  `{orderData.flavor && (
                <div id="section-mini-qty" className="animate-in fade-in slide-in-from-top-8 duration-700 pt-8">
                  <h3 className="text-xl font-serif text-primary mb-4 border-b border-brand-border pb-2">2. Defina a Quantidade</h3>`
);

// 6. Brazilian Sweets - Type -> Flavor
content = content.replace(
  `onClick={() => updateOrderMulti({ sweetsType: type, flavor: null, qty: orderData.qty || BRAZILIAN_SWEETS_DATA.minQty })}`,
  `onClick={() => updateOrderMulti({ sweetsType: type, flavor: null, qty: orderData.qty || BRAZILIAN_SWEETS_DATA.minQty }, "section-brazilian-flavor")}`
);
content = content.replace(
  `{orderData.sweetsType && (
                <div className="animate-in fade-in slide-in-from-top-8 duration-700">
                  <h3 className="text-xl font-serif text-primary mb-6 border-b border-brand-border pb-2">2. Escolha o Sabor</h3>`,
  `{orderData.sweetsType && (
                <div id="section-brazilian-flavor" className="animate-in fade-in slide-in-from-top-8 duration-700 pt-8">
                  <h3 className="text-xl font-serif text-primary mb-6 border-b border-brand-border pb-2">2. Escolha o Sabor</h3>`
);

// Brazilian Sweets - Flavor -> Qty
content = content.replace(
  `onClick={() => updateOrder("flavor", f)}
                        className={\`p-4 rounded-xl border-2 cursor-pointer transition-all text-center \${
                          orderData.flavor === f ? "border-primary bg-blush/30 text-primary" : "border-brand-border bg-white hover:border-primary/50 text-text-dark"`,
  `onClick={() => updateOrder("flavor", f, "section-brazilian-qty")}
                        className={\`p-4 rounded-xl border-2 cursor-pointer transition-all text-center \${
                          orderData.flavor === f ? "border-primary bg-blush/30 text-primary" : "border-brand-border bg-white hover:border-primary/50 text-text-dark"`
);
content = content.replace(
  `{orderData.flavor && (
                <div className="animate-in fade-in slide-in-from-top-8 duration-700 mt-12">
                  <h3 className="text-xl font-serif text-primary mb-4 border-b border-brand-border pb-2">3. Defina a Quantidade</h3>`,
  `{orderData.flavor && (
                <div id="section-brazilian-qty" className="animate-in fade-in slide-in-from-top-8 duration-700 mt-12 pt-8">
                  <h3 className="text-xl font-serif text-primary mb-4 border-b border-brand-border pb-2">3. Defina a Quantidade</h3>`
);

// 7. Desserts - Type -> Flavor or Notes
content = content.replace(
  `onClick={() => updateOrderMulti({ dessertType: d.name, flavor: null })}`,
  `onClick={() => updateOrderMulti({ dessertType: d.name, flavor: null }, d.flavors ? "section-desserts-flavor" : "section-notes")}`
);
content = content.replace(
  `{orderData.dessertType && DESSERTS_DATA.find(d => d.name === orderData.dessertType)?.flavors && (
                <div className="animate-in fade-in slide-in-from-top-8 duration-700">
                  <h3 className="text-xl font-serif text-primary mb-6 border-b border-brand-border pb-2">2. Escolha o Sabor</h3>`,
  `{orderData.dessertType && DESSERTS_DATA.find(d => d.name === orderData.dessertType)?.flavors && (
                <div id="section-desserts-flavor" className="animate-in fade-in slide-in-from-top-8 duration-700 pt-8">
                  <h3 className="text-xl font-serif text-primary mb-6 border-b border-brand-border pb-2">2. Escolha o Sabor</h3>`
);

// Desserts - Flavor -> Notes
content = content.replace(
  `{DESSERTS_DATA.find(d => d.name === orderData.dessertType)?.flavors?.map(f => (
                      <div 
                        key={f}
                        onClick={() => updateOrder("flavor", f)}`,
  `{DESSERTS_DATA.find(d => d.name === orderData.dessertType)?.flavors?.map(f => (
                      <div 
                        key={f}
                        onClick={() => updateOrder("flavor", f, "section-notes")}`
);

// 8. Party Packages - Type -> Details
content = content.replace(
  `onClick={() => updateOrderMulti({ kitType: k.name, kitDetails: null })}`,
  `onClick={() => updateOrderMulti({ kitType: k.name, kitDetails: null }, "section-kit-details")}`
);
content = content.replace(
  `{orderData.kitType && (
                <div className="animate-in fade-in slide-in-from-top-8 duration-700">
                  <h3 className="text-xl font-serif text-primary mb-4 border-b border-brand-border pb-2">2. Personalização</h3>`,
  `{orderData.kitType && (
                <div id="section-kit-details" className="animate-in fade-in slide-in-from-top-8 duration-700 pt-8">
                  <h3 className="text-xl font-serif text-primary mb-4 border-b border-brand-border pb-2">2. Personalização</h3>`
);

// 9. Other details (Outros Produtos) -> Notes
content = content.replace(
  `category !== "party_packages") && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-3xl font-serif mb-6 text-center text-primary uppercase">{catInfo.name[isEn ? 'en' : 'pt']}</h2>
              <label className="block text-text-dark font-serif text-lg mb-2">{isEn ? "What do you have in mind?" : "O que você tem em mente?"}</label>`,
  `category !== "party_packages") && (
            <div id="section-other-details" className="animate-in fade-in duration-500 pt-8">
              <h2 className="text-3xl font-serif mb-6 text-center text-primary uppercase">{catInfo.name[isEn ? 'en' : 'pt']}</h2>
              <label className="block text-text-dark font-serif text-lg mb-2">{isEn ? "What do you have in mind?" : "O que você tem em mente?"}</label>`
);
// I can't easily auto scroll on typing text area unless on blur. So leave it.

// 10. Add id to Notes / Date section
content = content.replace(
  `<div className="animate-in fade-in slide-in-from-bottom-8 duration-700 mt-16 border-t border-brand-border pt-12">
            <h3 className="text-2xl font-serif text-primary mb-6 text-center">{isEn ? "Order Details" : "Detalhes da Encomenda"}</h3>`,
  `<div id="section-notes" className="animate-in fade-in slide-in-from-bottom-8 duration-700 mt-16 border-t border-brand-border pt-12">
            <h3 className="text-2xl font-serif text-primary mb-6 text-center">{isEn ? "Order Details" : "Detalhes da Encomenda"}</h3>`
);

fs.writeFileSync(filePath, content, 'utf-8');
console.log("OrderBuilder updated successfully!");
