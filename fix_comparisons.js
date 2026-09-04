const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src/components/order-builder/OrderBuilder.tsx');
let c = fs.readFileSync(file, 'utf8');

// ===========================
// CAKE SIZE - fix highlight
// ===========================
// Bug: orderData.size === s.label (should be s.label.pt)
c = c.split('orderData.size === s.label.pt ? "border-primary bg-blush/30"')
     .join('orderData.size === s.label.pt ? "border-primary bg-blush/30"'); // already fixed by previous script
// Make sure ALL occurrences use .pt
c = c.replace(/orderData\.size === s\.label(?!\.)/g, 'orderData.size === s.label.pt');

// ===========================
// CAKE DESIGN - fix highlight  
// ===========================
// Bug: orderData.design === d.label (should be d.label.pt)
c = c.replace(/orderData\.design === d\.label(?!\.)/g, 'orderData.design === d.label.pt');

// ===========================
// CAKE ADDON - fix isSelected
// ===========================
// Bug: includes(a.label) should be includes(a.label.pt)
c = c.replace(/\.includes\(a\.label\)(?!\.)/g, '.includes(a.label.pt)');
// Also toggle button
c = c.replace(/toggleAddon\(a\.label\)(?!\.)/g, 'toggleAddon(a.label.pt)');

// ===========================
// MINI DESSERTS - fix onClick and highlight
// ===========================
// Bug: onClick stores d.name (object) -> store d.name.pt
// Bug: orderData.flavor === d.name (object comparison always false)
// Fix onClick for MINI_DESSERTS items
c = c.replace(
  /\{ flavor: d\.name, qty: orderData\.qty \|\| 25 \}/g,
  '{ flavor: typeof d.name === "string" ? d.name : d.name.pt, qty: orderData.qty || 25 }'
);
// Fix highlight comparison for mini desserts
c = c.replace(
  /orderData\.flavor === d\.name \? "border-primary bg-blush\/30" : "border-brand-border/g,
  '(typeof d.name === "string" ? orderData.flavor === d.name : orderData.flavor === d.name.pt) ? "border-primary bg-blush/30" : "border-brand-border'
);

// ===========================
// DOCINHOS (BRIGADEIRO_DOCINHOS) - fix onClick and highlight
// ===========================
// d.name is a string in BRIGADEIRO_DOCINHOS, so this should be fine.
// But the onClick stores d.name directly -> OK since it's a string
// Check: orderData.flavor === d.name is fine for strings
// No changes needed for docinhos

// ===========================
// MINI DESSERTS header title fix
// ===========================
// The h2 says "Mini Sobremesas / Tacinhas" always - fix to use lang
c = c.replace(
  '<h2 className="text-3xl font-serif mb-2 text-center text-primary uppercase">Mini Sobremesas / Tacinhas</h2>',
  '<h2 className="text-3xl font-serif mb-2 text-center text-primary uppercase">{isEn ? "Mini Desserts" : "Mini Sobremesas / Tacinhas"}</h2>'
);

// ===========================
// DESSERTS - fix onClick stores name, and highlight comparison
// ===========================
// updateOrderMulti({ dessertType: d.name, ... }) - d.name is object, store .pt
c = c.replace(
  /updateOrderMulti\(\{ dessertType: typeof d\.name === "string" \? d\.name : d\.name\.pt,/g,
  'updateOrderMulti({ dessertType: typeof d.name === "string" ? d.name : d.name.pt,'
);
// Also fix any remaining d.name that isn't properly handled:
c = c.replace(
  /\{ dessertType: d\.name,/g,
  '{ dessertType: typeof d.name === "string" ? d.name : d.name.pt,'
);

// ===========================
// PARTY PACKAGES - fix onClick stores k.name, and highlight
// ===========================
c = c.replace(
  /\{ kitType: typeof k\.name === "string" \? k\.name : k\.name\.pt,/g,
  '{ kitType: typeof k.name === "string" ? k.name : k.name.pt,'
);
c = c.replace(
  /\{ kitType: k\.name,/g,
  '{ kitType: typeof k.name === "string" ? k.name : k.name.pt,'
);

// ===========================
// BRAZILIAN SWEETS - "unidades" should be localized
// ===========================
c = c.replace(
  /{BRAZILIAN_SWEETS_DATA.minQty} unidades/g,
  '{BRAZILIAN_SWEETS_DATA.minQty} {isEn ? "units" : "unidades"}'
);

// ===========================
// Bem-casados title fix
// ===========================
c = c.replace(
  '<h2 className="text-3xl font-serif mb-2 text-center text-primary uppercase">Bem-casados</h2>',
  '<h2 className="text-3xl font-serif mb-2 text-center text-primary uppercase">{isEn ? "Brazilian Celebration Sweets" : "Bem-casados"}</h2>'
);

fs.writeFileSync(file, c, 'utf8');
console.log('All comparison bugs fixed!');
