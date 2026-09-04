const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/order-builder/OrderBuilder.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Add BRIGADEIRO_DOCINHOS to imports
content = content.replace(
  `  BRIGADEIRO_TIERS,`,
  `  BRIGADEIRO_TIERS,
  BRIGADEIRO_DOCINHOS,`
);

// 2. Update calculateTotal
content = content.replace(
  `} else if (category === "brigadeiros") {
      if (orderData.brigType && orderData.brigQty) {
        const tiers = orderData.brigType === "Tradicional" ? BRIGADEIRO_TIERS.tradicionais : BRIGADEIRO_TIERS.especiais;
        const selectedTier = tiers.find(t => t.qty === orderData.brigQty);
        if (selectedTier) total = selectedTier.price;
      }
    } else if (category === "mini_desserts") {`,
  `} else if (category === "brigadeiros") {
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
    } else if (category === "mini_desserts") {`
);

// 3. Update isFlowComplete
content = content.replace(
  `} else if (category === "brigadeiros") {
      return !!orderData.flavor;
    } else {`,
  `} else if (category === "brigadeiros") {
      if (orderData.brigType === "Docinhos") {
        return !!orderData.flavor && orderData.brigQty >= 25;
      }
      return !!orderData.flavor;
    } else {`
);

// 4. Update JSX rendering for 'Docinhos'
// Change grid from grid-cols-2 to grid-cols-1 md:grid-cols-3
content = content.replace(
  `<div className="grid grid-cols-2 gap-4">
                    <div 
                      onClick={() => updateOrderMulti({ brigType: "Tradicional", brigQty: null, flavor: null }, "section-brig-qty")}
                      className={\`p-6 rounded-xl border-2 cursor-pointer text-center transition-all \${`,
  `<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div 
                      onClick={() => updateOrderMulti({ brigType: "Tradicional", brigQty: null, flavor: null }, "section-brig-qty")}
                      className={\`p-6 rounded-xl border-2 cursor-pointer text-center transition-all \${`
);

// Add the Docinhos button
content = content.replace(
  `<div className={\`text-2xl font-serif \${orderData.brigType === "Especial" ? "text-primary" : "text-text-dark"}\`}>Especiais</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Escolha a Quantidade */}
              {orderData.brigType && (`,
  `<div className={\`text-2xl font-serif \${orderData.brigType === "Especial" ? "text-primary" : "text-text-dark"}\`}>Especiais</div>
                    </div>
                    <div 
                      onClick={() => updateOrderMulti({ brigType: "Docinhos", brigQty: null, flavor: null }, "section-brig-flavor-doc")}
                      className={\`p-6 rounded-xl border-2 cursor-pointer text-center transition-all \${
                        orderData.brigType === "Docinhos" ? "border-primary bg-blush/30" : "border-brand-border bg-white hover:border-primary/50"
                      }\`}
                    >
                      <div className={\`text-2xl font-serif \${orderData.brigType === "Docinhos" ? "text-primary" : "text-text-dark"}\`}>Docinhos</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Escolha a Quantidade (Tradicionais/Especiais) */}
              {orderData.brigType && orderData.brigType !== "Docinhos" && (`
);

content = content.replace(
  `{/* 3. Escolha o Sabor */}
              {orderData.brigType && orderData.brigQty && (`,
  `{/* 3. Escolha o Sabor (Tradicionais/Especiais) */}
              {orderData.brigType && orderData.brigType !== "Docinhos" && orderData.brigQty && (`
);

// Add the Docinhos Flavor and Quantity steps
const docinhosJSX = `
              {/* 2. Escolha o Sabor (Docinhos) */}
              {orderData.brigType === "Docinhos" && (
                <div id="section-brig-flavor-doc" className="animate-in fade-in slide-in-from-top-8 duration-700 pt-8">
                  <h3 className="text-xl font-serif text-primary mb-4 border-b border-brand-border pb-2">2. Escolha o Sabor</h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {BRIGADEIRO_DOCINHOS.map(d => (
                      <div 
                        key={d.id}
                        onClick={() => updateOrderMulti({ flavor: d.name, brigQty: orderData.brigQty || 25 }, "section-brig-qty-doc")}
                        className={\`p-5 rounded-xl border-2 cursor-pointer transition-all flex flex-col h-full \${
                          orderData.flavor === d.name ? "border-primary bg-blush/30" : "border-brand-border bg-white hover:border-primary/50"
                        }\`}
                      >
                        <div className="font-bold text-text-dark mb-2">{d.name}</div>
                        <div className="text-sm text-soft-text mb-4 flex-grow">{d.desc}</div>
                        <div className="text-primary font-bold mt-auto pt-2 border-t border-brand-border">$ {d.price.toFixed(2)} un</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Defina a Quantidade (Docinhos) */}
              {orderData.brigType === "Docinhos" && orderData.flavor && (
                <div id="section-brig-qty-doc" className="animate-in fade-in slide-in-from-top-8 duration-700 pt-8">
                  <h3 className="text-xl font-serif text-primary mb-4 border-b border-brand-border pb-2">3. Defina a Quantidade</h3>
                  <div className="max-w-xs mx-auto bg-white border-2 border-brand-border rounded-xl p-6 text-center shadow-sm">
                    <label className="block text-soft-text text-sm mb-4">Mínimo 25 unidades</label>
                    <div className="flex items-center justify-center gap-4">
                      <button 
                        onClick={() => orderData.brigQty > 25 && updateOrder("brigQty", orderData.brigQty - 1)}
                        className={\`w-10 h-10 rounded-full flex items-center justify-center border \${orderData.brigQty > 25 ? 'border-primary text-primary hover:bg-blush' : 'border-gray-300 text-gray-300'}\`}
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
`;

content = content.replace(
  `{/* =======================
              MINI DESSERTS FLOW
             ======================= */}`,
  `${docinhosJSX}
          {/* =======================
              MINI DESSERTS FLOW
             ======================= */}`
);

fs.writeFileSync(filePath, content, 'utf-8');
console.log("Docinhos added successfully!");
