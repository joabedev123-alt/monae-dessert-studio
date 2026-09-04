const fs = require('fs');
const path = require('path');

const orderBuilderPath = path.join(__dirname, 'src/components/order-builder/OrderBuilder.tsx');
let content = fs.readFileSync(orderBuilderPath, 'utf8');

const replacements = [
  // 1. Tamanho
  ['Escolha o Tamanho:', '{isEn ? "Choose Size:" : "Escolha o Tamanho:"}'],
  ['Diâmetro e Peso', '{isEn ? "Diameter & Weight" : "Diâmetro e Peso"}'],
  ['<p>4 camadas de massa</p>', '<p>{isEn ? "4 cake layers" : "4 camadas de massa"}</p>'],
  ['<p>3 camadas de recheio</p>', '<p>{isEn ? "3 filling layers" : "3 camadas de recheio"}</p>'],
  ['<p>Altura: aprox. 15cm</p>', '<p>{isEn ? "Height: approx. 15cm (6in)" : "Altura: aprox. 15cm"}</p>'],
  ['<p>buttercream</p>', '<p>{isEn ? "Buttercream" : "Buttercream"}</p>'],
  ['a partir de: <br/><span className="text-xl">${s.price}</span>', '{isEn ? "starting at:" : "a partir de:"} <br/><span className="text-xl">${s.price}</span>'],
  ['O valor final irá depender do estilo e complexidade de decoração.', '{isEn ? "The final price will depend on the style and complexity of the design." : "O valor final irá depender do estilo e complexidade de decoração."}'],
  
  // 2. Sabor
  ['Escolha o Sabor', '{isEn ? "Choose Flavor" : "Escolha o Sabor"}'],
  ['Tradicionais</h3>', '{isEn ? "Traditional" : "Tradicionais"}</h3>'],
  ['Especiais</h3>', '{isEn ? "Specialties" : "Especiais"}</h3>'],
  ['Não encontrou o recheio que deseja?', '{isEn ? "Didn\'t find the flavor you want?" : "Não encontrou o recheio que deseja?"}'],
  ['Nos mande uma mensagem e nos diga o que tem em mente, ficaremos felizes em fazer algo especial e personalizado pra você.', '{isEn ? "Send us a message and tell us what you have in mind. We would be happy to create something special and personalized for you." : "Nos mande uma mensagem e nos diga o que tem em mente, ficaremos felizes em fazer algo especial e personalizado pra você."}'],
  
  // 3. Decoração
  ['Escolha a Decoração', '{isEn ? "Choose Design" : "Escolha a Decoração"}'],
  ['Não se identificou com as inspirações?', '{isEn ? "Didn\'t find an inspiration that fits?" : "Não se identificou com as inspirações?"}'],
  ['Nos mande uma mensagem e nos diga o que tem em mente.', '{isEn ? "Send us a message and tell us what you have in mind." : "Nos mande uma mensagem e nos diga o que tem em mente."}'],
  
  // 4. Adicionais
  ['Escolha os Adicionais', '{isEn ? "Choose Add-ons" : "Escolha os Adicionais"}'],
  ['Decorativos (Opcional)', '{isEn ? "Decorative (Optional)" : "Decorativos (Opcional)"}'],
  
  // MINI CAKES
  ['Perfeito para momentos íntimos', '{isEn ? "Perfect for intimate moments" : "Perfeito para momentos íntimos"}'],
  ['Mini cake é um bolo perfeito para experimentar a dois.<br/>', '{isEn ? "A mini cake is the perfect size to share for two.<br/>" : "Mini cake é um bolo perfeito para experimentar a dois.<br/>"}'],
  ['Tamanho de aproximadamente 4"x3"', '{isEn ? "Approximate size 4\\"x3\\"" : "Tamanho de aproximadamente 4\\"x3\\""}'],
  ['Valor: $30', '{isEn ? "Price: $30" : "Valor: $30"}'],
  ['Escolha um dos nossos sabores tradicionais.', '{isEn ? "Choose one of our traditional flavors." : "Escolha um dos nossos sabores tradicionais."}'],
  
  // BRIGADEIROS
  ['BRIGADEIROS de festa', '{isEn ? "Party Brigadeiros" : "BRIGADEIROS de festa"}'],
  ['Nossos brigadeiros de festa pesam entre 15g e 18g e são entregues em forminhas tradicionais na cor marrom ou branca. Caso deseje outra cor, consulte a disponibilidade.<br/>', '{isEn ? "Our party brigadeiros weigh between 15g and 18g and are served in traditional brown or white cups. If you prefer another color, please check availability.<br/>" : "Nossos brigadeiros de festa pesam entre 15g e 18g e são entregues em forminhas tradicionais na cor marrom ou branca. Caso deseje outra cor, consulte a disponibilidade.<br/>"}'],
  ['Pedido mínimo: 25 unidades por sabor', '{isEn ? "Minimum order: 25 units per flavor" : "Pedido mínimo: 25 unidades por sabor"}'],
  ['1. Escolha a Linha', '{isEn ? "1. Choose the Category" : "1. Escolha a Linha"}'],
  ['Tradicionais</div>', '{isEn ? "Traditional" : "Tradicionais"}</div>'],
  ['Especiais</div>', '{isEn ? "Specialties" : "Especiais"}</div>'],
  ['Docinhos</div>', '{isEn ? "Sweets" : "Docinhos"}</div>'],
  ['2. Escolha a Quantidade', '{isEn ? "2. Choose Quantity" : "2. Escolha a Quantidade"}'],
  ['3. Escolha o Sabor', '{isEn ? "3. Choose Flavor" : "3. Escolha o Sabor"}'],
  
  // Docinhos
  ['Mínimo 25 unidades', '{isEn ? "Minimum 25 units" : "Mínimo 25 unidades"}'],
  ['3. Defina a Quantidade', '{isEn ? "3. Set Quantity" : "3. Defina a Quantidade"}'],
  ['2. Defina a Quantidade', '{isEn ? "2. Set Quantity" : "2. Defina a Quantidade"}'],
  
  // MINI DESSERTS
  ['Deliciosas tacinhas de alegria', '{isEn ? "Delightful cups of joy" : "Deliciosas tacinhas de alegria"}'],
  
  // BRAZILIAN SWEETS
  ['Clássicos para festas', '{isEn ? "Classic party favors" : "Clássicos para festas"}'],
  ['Pedido mínimo:', '{isEn ? "Minimum order:" : "Pedido mínimo:"}'],
  ['1. Qual a ocasião?', '{isEn ? "1. What is the occasion?" : "1. Qual a ocasião?"}'],
  
  // DESSERTS
  ['Para compartilhar com a família', '{isEn ? "To share with the family" : "Para compartilhar com a família"}'],
  ['1. Escolha a Sobremesa', '{isEn ? "1. Choose the Dessert" : "1. Escolha a Sobremesa"}'],
  
  // PARTY PACKAGES
  ['Kits selecionados para eventos', '{isEn ? "Curated sets for events" : "Kits selecionados para eventos"}'],
  ['1. Escolha o Kit', '{isEn ? "1. Choose a Package" : "1. Escolha o Kit"}'],
  ['2. Personalize seu Kit', '{isEn ? "2. Customize your Package" : "2. Personalize seu Kit"}'],
  ['Escreva o sabor do mini cake e os 2 sabores de brigadeiros:', '{isEn ? "Write the mini cake flavor and the 2 brigadeiro flavors:" : "Escreva o sabor do mini cake e os 2 sabores de brigadeiros:"}'],
  ['Escreva o sabor do bolo, dos brigadeiros e o tema para os topos:', '{isEn ? "Write the cake flavor, brigadeiro flavors, and the topper theme:" : "Escreva o sabor do bolo, dos brigadeiros e o tema para os topos:"}'],
  ['Ex: Bolo de chocolate com morango, brigadeiros tradicionais e ninho...', '{isEn ? "Ex: Chocolate cake with strawberries, traditional brigadeiros, and ninho..." : "Ex: Bolo de chocolate com morango, brigadeiros tradicionais e ninho..."}'],
  
  // FINAL FORM
  ['FINALIZAR PEDIDO', '{isEn ? "FINISH ORDER" : "FINALIZAR PEDIDO"}'],
  ['Data da encomenda *', '{isEn ? "Order Date *" : "Data da encomenda *"}'],
  ['Resumo do Pedido', '{isEn ? "Order Summary" : "Resumo do Pedido"}'],
  ['Observações</div>', '{isEn ? "Notes" : "Observações"}</div>'],
  ['Ex: forminhas brancas, combinar a retirada, etc...', '{isEn ? "Ex: white cups, arrange pickup, etc..." : "Ex: forminhas brancas, combinar a retirada, etc..."}'],
  ['* O valor final varia de acordo com a complexidade da decoração.', '{isEn ? "* The final price varies according to the complexity of the design." : "* O valor final varia de acordo com a complexidade da decoração."}'],
  ['* Informe a data da encomenda para finalizar', '{isEn ? "* Enter the order date to finish" : "* Informe a data da encomenda para finalizar"}'],

  // Button text
  ['Enviar pedido pelo WhatsApp', '{isEn ? "Send via WhatsApp" : "Enviar pedido pelo WhatsApp"}'],
  ['Enviar pedido por SMS', '{isEn ? "Send via iMessage" : "Enviar pedido por SMS"}'],

  // Exact msg string replacements inside generateWhatsAppMessage:
  ['`Data da encomenda: ${orderData.orderDate || "Não informada"}\\n\\n`', '`${isEn ? "Order Date:" : "Data da encomenda:"} ${orderData.orderDate || (isEn ? "Not provided" : "Não informada")}\\n\\n`'],
  ['`Produto: ${catInfo.name[isEn ? \'en\' : \'pt\']}\\n`', '`${isEn ? "Product:" : "Produto:"} ${catInfo.name[isEn ? \'en\' : \'pt\']}\\n`'],
  ['`Tamanho: ${orderData.size || "-"}\\n`', '`${isEn ? "Size:" : "Tamanho:"} ${orderData.size || "-"}\\n`'],
  ['`Sabor: ${orderData.flavor || "-"}\\n`', '`${isEn ? "Flavor:" : "Sabor:"} ${orderData.flavor || "-"}\\n`'],
  ['`Decoração: ${orderData.design || "-"}\\n`', '`${isEn ? "Design:" : "Decoração:"} ${orderData.design || "-"}\\n`'],
  ['`Adicionais: ${orderData.addons && orderData.addons.length > 0 ? orderData.addons.join(", ") : "Nenhum"}\\n`', '`${isEn ? "Add-ons:" : "Adicionais:"} ${orderData.addons && orderData.addons.length > 0 ? orderData.addons.join(", ") : (isEn ? "None" : "Nenhum")}\\n`'],
  ['`Mensagem/Observações: ${orderData.notes || "-"}\\n\\n`', '`${isEn ? "Notes:" : "Mensagem/Observações:"} ${orderData.notes || "-"}\\n\\n`'],
  ['`*Valor Estimado Inicial:* $${total} (a confirmar)\\n`', '`${isEn ? "*Initial Estimated Total:*" : "*Valor Estimado Inicial:*"} $${total} ${isEn ? "(to be confirmed)" : "(a confirmar)"}\\n`'],
  ['`*Valor Estimado:* $${total}\\n`', '`${isEn ? "*Estimated Total:*" : "*Valor Estimado:*"} $${total}\\n`'],
  ['`*Valor Estimado:* $${total.toFixed(2)}\\n`', '`${isEn ? "*Estimated Total:*" : "*Valor Estimado:*"} $${total.toFixed(2)}\\n`'],
  ['`*Valor Estimado:* $${orderData.brigType === "Docinhos" ? total.toFixed(2) : total}\\n`', '`${isEn ? "*Estimated Total:*" : "*Valor Estimado:*"} $${orderData.brigType === "Docinhos" ? total.toFixed(2) : total}\\n`'],
  ['`Produto: Mini Cake\\n`', '`${isEn ? "Product:" : "Produto:"} Mini Cake\\n`'],
  ['`Produto: Brigadeiros de Festa\\n`', '`${isEn ? "Product:" : "Produto:"} ${isEn ? "Party Brigadeiros" : "Brigadeiros de Festa"}\\n`'],
  ['`Produto: Mini Sobremesas (Tacinhas)\\n`', '`${isEn ? "Product:" : "Produto:"} ${isEn ? "Mini Desserts" : "Mini Sobremesas (Tacinhas)"}\\n`'],
  ['`Produto: ${orderData.sweetsType || "Bem-casado"}\\n`', '`${isEn ? "Product:" : "Produto:"} ${orderData.sweetsType || "Bem-casado"}\\n`'],
  ['`Produto: ${orderData.dessertType || "-"}\\n`', '`${isEn ? "Product:" : "Produto:"} ${orderData.dessertType || "-"}\\n`'],
  ['`Produto: ${orderData.kitType || "-"}\\n`', '`${isEn ? "Product:" : "Produto:"} ${orderData.kitType || "-"}\\n`'],
  ['`Linha: ${orderData.brigType || "-"}\\n`', '`${isEn ? "Category:" : "Linha:"} ${orderData.brigType || "-"}\\n`'],
  ['`Quantidade: ${orderData.brigQty || "-"}\\n`', '`${isEn ? "Quantity:" : "Quantidade:"} ${orderData.brigQty || "-"}\\n`'],
  ['`Quantidade: ${orderData.qty || "-"}\\n`', '`${isEn ? "Quantity:" : "Quantidade:"} ${orderData.qty || "-"}\\n`'],
  ['`Detalhes/Sabores: ${orderData.kitDetails || "-"}\\n`', '`${isEn ? "Details/Flavors:" : "Detalhes/Sabores:"} ${orderData.kitDetails || "-"}\\n`'],
  ['`${isEn ? "Product" : "Produto"}: ${catInfo.name[isEn ? \'en\' : \'pt\']}\\n`', '`${isEn ? "Product:" : "Produto:"} ${catInfo.name[isEn ? \'en\' : \'pt\']}\\n`'],
  ['`${isEn ? "Details" : "Detalhes"}: ${orderData.details || "-"}\\n`', '`${isEn ? "Details:" : "Detalhes:"} ${orderData.details || "-"}\\n`'],

  // Final Form JSX text replacements
  ['<span className="font-semibold text-text-dark">Produto:</span> Bolos Personalizados<br/>', '<span className="font-semibold text-text-dark">{isEn ? "Product:" : "Produto:"}</span> {isEn ? "Custom Cakes" : "Bolos Personalizados"}<br/>'],
  ['<span className="font-semibold text-text-dark">Tamanho:</span> {orderData.size}<br/>', '<span className="font-semibold text-text-dark">{isEn ? "Size:" : "Tamanho:"}</span> {orderData.size}<br/>'],
  ['<span className="font-semibold text-text-dark">Sabor:</span> {orderData.flavor}<br/>', '<span className="font-semibold text-text-dark">{isEn ? "Flavor:" : "Sabor:"}</span> {orderData.flavor}<br/>'],
  ['<span className="font-semibold text-text-dark">Decoração:</span> {orderData.design}<br/>', '<span className="font-semibold text-text-dark">{isEn ? "Design:" : "Decoração:"}</span> {orderData.design}<br/>'],
  ['<span className="font-semibold text-text-dark">Adicionais:</span> {orderData.addons && orderData.addons.length > 0 ? orderData.addons.join(", ") : "Nenhum"}', '<span className="font-semibold text-text-dark">{isEn ? "Add-ons:" : "Adicionais:"}</span> {orderData.addons && orderData.addons.length > 0 ? orderData.addons.join(", ") : (isEn ? "None" : "Nenhum")}'],
  ['<span className="font-semibold text-text-dark">Produto:</span> Mini Cake (4"x3")<br/>', '<span className="font-semibold text-text-dark">{isEn ? "Product:" : "Produto:"}</span> Mini Cake (4"x3")<br/>'],
  ['<span className="font-semibold text-text-dark">Produto:</span> Brigadeiros de Festa<br/>', '<span className="font-semibold text-text-dark">{isEn ? "Product:" : "Produto:"}</span> {isEn ? "Party Brigadeiros" : "Brigadeiros de Festa"}<br/>'],
  ['<span className="font-semibold text-text-dark">Linha:</span> {orderData.brigType}<br/>', '<span className="font-semibold text-text-dark">{isEn ? "Category:" : "Linha:"}</span> {orderData.brigType}<br/>'],
  ['<span className="font-semibold text-text-dark">Quantidade:</span> {orderData.brigQty} un<br/>', '<span className="font-semibold text-text-dark">{isEn ? "Quantity:" : "Quantidade:"}</span> {orderData.brigQty} {isEn ? "units" : "un"}<br/>'],
  ['<span className="font-semibold text-text-dark">Produto:</span> Mini Sobremesas (Tacinhas)<br/>', '<span className="font-semibold text-text-dark">{isEn ? "Product:" : "Produto:"}</span> {isEn ? "Mini Desserts" : "Mini Sobremesas (Tacinhas)"}<br/>'],
  ['<span className="font-semibold text-text-dark">Quantidade:</span> {orderData.qty} unidades', '<span className="font-semibold text-text-dark">{isEn ? "Quantity:" : "Quantidade:"}</span> {orderData.qty} {isEn ? "units" : "unidades"}'],
  ['<span className="font-semibold text-text-dark">Produto:</span> {orderData.sweetsType}<br/>', '<span className="font-semibold text-text-dark">{isEn ? "Product:" : "Produto:"}</span> {orderData.sweetsType}<br/>'],
  ['<span className="font-semibold text-text-dark">Produto:</span> {orderData.dessertType}<br/>', '<span className="font-semibold text-text-dark">{isEn ? "Product:" : "Produto:"}</span> {orderData.dessertType}<br/>'],
  ['<span className="font-semibold text-text-dark">Produto:</span> {orderData.kitType}<br/>', '<span className="font-semibold text-text-dark">{isEn ? "Product:" : "Produto:"}</span> {orderData.kitType}<br/>'],
  ['<span className="font-semibold text-text-dark">Detalhes:</span> {orderData.kitDetails}', '<span className="font-semibold text-text-dark">{isEn ? "Details:" : "Detalhes:"}</span> {orderData.kitDetails}'],
  ['<span className="font-semibold text-text-dark">Produto:</span> {catInfo.name[isEn ? \'en\' : \'pt\']}<br/>', '<span className="font-semibold text-text-dark">{isEn ? "Product:" : "Produto:"}</span> {catInfo.name[isEn ? \'en\' : \'pt\']}<br/>'],
  ['<span className="font-semibold text-text-dark">Detalhes:</span> {orderData.details}', '<span className="font-semibold text-text-dark">{isEn ? "Details:" : "Detalhes:"}</span> {orderData.details}'],
  ['<div className="text-lg font-serif text-text-dark uppercase tracking-wide">Valor:</div>', '<div className="text-lg font-serif text-text-dark uppercase tracking-wide">{isEn ? "Total:" : "Valor:"}</div>'],
  
  // Update property accesses
  ['s.serves', 's.serves[isEn ? "en" : "pt"]'],
  ['f.desc', 'f.desc[isEn ? "en" : "pt"]'],
  ['a.priceText', 'a.priceText[isEn ? "en" : "pt"]'],
  ['tier.qty} un', 'tier.qty} {isEn ? "units" : "un"}'],
  ['d.desc', 'd.desc[isEn ? "en" : "pt"]'],
  ['d.serves', 'd.serves[isEn ? "en" : "pt"]'],
  ['d.validity', 'd.validity[isEn ? "en" : "pt"]'],
  ['k.desc', 'k.desc[isEn ? "en" : "pt"]'],
  ['group.category', 'group.category[isEn ? "en" : "pt"]'],
  ['f.name} (Tradicional - ${group.category})', 'f.name} (Tradicional - ${group.category.pt})'],
  ['f.name} (Especial - ${group.category})', 'f.name} (Especial - ${group.category.pt})'],
  
  // Object identity property replacements
  ['{s.label}', '{s.label[isEn ? "en" : "pt"]}'],
  ['s.label === orderData.size', 's.label.pt === orderData.size'],
  ['updateOrder("size", s.label,', 'updateOrder("size", s.label.pt,'],
  
  ['{d.label}', '{d.label[isEn ? "en" : "pt"]}'],
  ['d.label === orderData.design', 'd.label.pt === orderData.design'],
  ['updateOrder("design", d.label,', 'updateOrder("design", d.label.pt,'],
  
  ['{a.label}', '{a.label[isEn ? "en" : "pt"]}'],
  ['a.label === addonLabel', 'a.label.pt === addonLabel'],
  ['toggleAddon(a.label)', 'toggleAddon(a.label.pt)'],
  
  ['{f.name}', '{typeof f.name === "string" ? f.name : f.name[isEn ? "en" : "pt"]}'],
  ['f.name === orderData.flavor', '(typeof f.name === "string" ? f.name : f.name.pt) === orderData.flavor'],
  ['updateOrder("flavor", f.name,', 'updateOrder("flavor", typeof f.name === "string" ? f.name : f.name.pt,'],
  
  ['{d.name}', '{typeof d.name === "string" ? d.name : d.name[isEn ? "en" : "pt"]}'],
  ['d.name === orderData.dessertType', '(typeof d.name === "string" ? d.name : d.name.pt) === orderData.dessertType'],
  ['updateOrderMulti({ dessertType: d.name,', 'updateOrderMulti({ dessertType: typeof d.name === "string" ? d.name : d.name.pt,'],
  
  ['{k.name}', '{typeof k.name === "string" ? k.name : k.name[isEn ? "en" : "pt"]}'],
  ['k.name === orderData.kitType', '(typeof k.name === "string" ? k.name : k.name.pt) === orderData.kitType'],
  ['updateOrderMulti({ kitType: k.name,', 'updateOrderMulti({ kitType: typeof k.name === "string" ? k.name : k.name.pt,']
];

replacements.forEach(([search, replace]) => {
  content = content.split(search).join(replace);
});

fs.writeFileSync(orderBuilderPath, content, 'utf8');
console.log("Patched OrderBuilder.tsx carefully.");
