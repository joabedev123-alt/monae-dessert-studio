export type ProductCategory =
  | "custom_cakes"
  | "mini_cakes"
  | "brigadeiros"
  | "mini_desserts"
  | "brazilian_sweets"
  | "desserts"
  | "party_packages";

export interface ProductInfo {
  id: ProductCategory;
  name: {
    en: string;
    pt: string;
  };
  description: {
    en: string;
    pt: string;
  };
  image: string; // Placeholder for now
}

export const CATEGORIES: ProductInfo[] = [
  {
    id: "custom_cakes",
    name: { en: "Custom Cakes", pt: "Bolos Personalizados" },
    description: { en: "Tailored to your celebration", pt: "Feito sob medida para sua celebração" },
    image: "/images/custom-cake.jpg",
  },
  {
    id: "mini_cakes",
    name: { en: "Mini Cakes", pt: "Mini Cakes" },
    description: { en: "Perfect for intimate moments", pt: "Perfeito para momentos íntimos" },
    image: "/images/mini-cake.jpg",
  },
  {
    id: "brigadeiros",
    name: { en: "Brigadeiros", pt: "Brigadeiros" },
    description: { en: "Traditional Brazilian truffles", pt: "Tradicionais doces brasileiros" },
    image: "/images/brigadeiros.jpg",
  },
  {
    id: "mini_desserts",
    name: { en: "Mini Desserts", pt: "Mini Sobremesas / Tacinhas" },
    description: { en: "Delightful cups of joy", pt: "Deliciosas tacinhas de alegria" },
    image: "/images/mini-desserts.jpg",
  },
  {
    id: "brazilian_sweets",
    name: { en: "Brazilian Celebration Sweets", pt: "Bem-casados" },
    description: { en: "Classic party favors", pt: "Clássicos para festas" },
    image: "/images/bem-casados.jpg",
  },
  {
    id: "desserts",
    name: { en: "Desserts", pt: "Sobremesas" },
    description: { en: "To share with the family", pt: "Para compartilhar com a família" },
    image: "/images/desserts.jpg",
  },
  {
    id: "party_packages",
    name: { en: "Party Packages", pt: "Kits para Festa" },
    description: { en: "Curated sets for events", pt: "Kits selecionados para eventos" },
    image: "/images/party-packages.jpg",
  },
];

// --- CUSTOM CAKES DATA ---
export const CAKE_SIZES = [
  { id: "4in", label: "4\"", serves: "6 - 8 fatias", price: 58 },
  { id: "6in", label: "6\"", serves: "10-15 fatias", price: 80 },
  { id: "8in", label: "8\"", serves: "20 - 25 fatias", price: 120 },
  { id: "10in", label: "10\"", serves: "33 - 38 fatias", price: 180 },
  { id: "12in", label: "12\"", serves: "52 - 57 fatias", price: 215 },
];

export const CAKE_FLAVORS_TRADICIONAIS = [
  { category: "Massa de chocolate", items: [
      { name: "Brigadeiro", desc: "Recheio cremoso de brigadeiro" },
      { name: "Dois amores", desc: "Recheios cremosos de brigadeiro meio amargo e brigadeiro branco." },
      { name: "Prestígio", desc: "Recheio de cocada cremosa e brigadeiro meio amargo." },
      { name: "Choco Intense", desc: "brigadeiro cremoso meio amargo com pedaços de chocolate" }
    ]
  },
  { category: "Massa branca", items: [
      { name: "Ninho", desc: "creme de leite ninho, suave e leve." },
      { name: "4 leites", desc: "Recheios de 3 leites e doce de leite." },
      { name: "Chocolate branco", desc: "recheio cremoso de chocolate branco" }
    ]
  }
];

export const CAKE_FLAVORS_ESPECIAIS = [
  { category: "Massa de chocolate", items: [
      { name: "Sensação", desc: "Brigadeiro cremoso ao leite e morangos frescos." },
      { name: "Napolitana", desc: "Brigadeiro ao leite, creme Ninho e morangos frescos." },
      { name: "Ninho c/ Nutella", desc: "creme de ninho e brigadeiro de Nutella" },
      { name: "Maracujá trufado", desc: "Massa black, brigadeiro de maracujá e briganache de chocolate." },
      { name: "Matilda", desc: "Massa black, briganache de chocolate." }
    ]
  },
  { category: "Massa branca", items: [
      { name: "Morango aos quatro leites", desc: "Geleia de morango, recheio três leites e doce de leite." },
      { name: "Pink lemonade", desc: "Recheio de limão siciliano com geleia de frutas vermelhas." },
      { name: "Passion Berry", desc: "Recheio de creme de maracujá e geleia de frutas vermelhas" },
      { name: "Delícia de abacaxi c/ coco", desc: "Recheio cremoso de coco e pedaços de abacaxi." },
      { name: "Ninho com morango", desc: "Recheio de creme de ninho e geleia de morango" }
    ]
  }
];

export const CAKE_DESIGNS = [
  { id: "naked", label: "Naked Cake Liso 1 cor" },
  { id: "liso2", label: "2 cores" },
  { id: "petitpoa", label: "Petit poá" },
  { id: "texturizado", label: "Texturizado" },
  { id: "pitangas", label: "Pitangas delicadas" },
  { id: "petalas", label: "Pétalas até 2 cores" },
];

export const CAKE_ADDONS = [
  { id: "topo", label: "Topo temático", priceText: "a partir de $15", price: 15 },
  { id: "flores", label: "Flores naturais", priceText: "A partir de $18", price: 18 },
  { id: "frutas", label: "Frutas", priceText: "a partir de $5", price: 5 },
  { id: "brigadeiros", label: "Brigadeiros", priceText: "a partir de $6", price: 6 },
  { id: "misto", label: "Misto (frutas e brigadeiros)", priceText: "a partir de $5", price: 5 },
];

// --- BRIGADEIROS DATA ---
export const BRIGADEIRO_FLAVORS = {
  tradicionais: ["Brigadeiro", "Branquinho", "Casadinho", "Ninho", "Beijinho", "Bicho de pé", "Casadinho de morango"],
  especiais: ["Ao leite Belga", "Branco", "Morangutella", "Amendoim", "Confete", "Churros", "M. amargo", "Maracujá", "Limão"]
};

export const BRIGADEIRO_TIERS = {
  tradicionais: [
    { qty: 25, price: 30 },
    { qty: 50, price: 50 },
    { qty: 100, price: 90 },
  ],
  especiais: [
    { qty: 25, price: 35 },
    { qty: 50, price: 65 },
    { qty: 100, price: 110 },
  ]
};

// --- MINI DESSERTS DATA ---
export const MINI_DESSERTS = [
  { id: "morango", name: "DELÍCIA DE MORANGO", desc: "Creme de leite Ninho, geleia de morangos e chantilly.", price: 1.50 },
  { id: "maracuja", name: "MARACUJÁ C/ CHOCOLATE", desc: "Mousse de maracujá com brigadeiro cremoso de chocolate e geleia de maracujá.", price: 1.90 },
  { id: "doisamores", name: "DOIS AMORES C/ MORANGO", desc: "Brigadeiro branco e ao leite com morangos frescos.", price: 1.50 },
  { id: "brigadeiro", name: "BRIGADEIRO", desc: "Brigadeiro gourmet cremoso.", price: 1.00 },
  { id: "banoffee", name: "BANOFFEE", desc: "Farofa de biscoito, doce de leite, banana picada e chantilly com canela.", price: 1.90 },
  { id: "limao", name: "LIMÃO", desc: "Farofa de biscoito, mousse de limão, chantilly e raspinhas de limão.", price: 1.90 },
  { id: "brownie", name: "DELÍCIA DE BROWNIE", desc: "Brownie molhadinho com brigadeiro cremoso branco e meio amargo.", price: 1.90 },
  { id: "cookies", name: "COOKIES CREAM", desc: "Creme de baunilha com biscoito Oreo® e chantilly.", price: 1.90 },
  { id: "kitkat", name: "KITKAT", desc: "Nutella, brigadeiro branco e pedaços de Kinder Bueno®.", price: 1.90 },
];

// --- BRAZILIAN SWEETS DATA ---
export const BRAZILIAN_SWEETS_DATA = {
  types: ["Bem-casado", "Bem-nascido", "Bem-vivido", "Bem-formado"],
  flavors: ["Doce de leite", "Coco", "Brigadeiro"],
  price: 3.00,
  minQty: 30
};

// --- DESSERTS DATA ---
export const DESSERTS_DATA = [
  { 
    id: "pudim", 
    name: "Pudim", 
    desc: "Pudim de leite condensado, lisinho, cremoso e irresistível.", 
    serves: "Serve 8 fatias", 
    validity: "Validade: 7 dias na geladeira", 
    price: 30 
  },
  { 
    id: "bombom", 
    name: "Bombom na travessa", 
    desc: "Uma travessa inteira de pura alegria e cremosidade.", 
    serves: "Serve até 15 porções", 
    validity: "Validade: sem frutas, até 4 dias refrigerado. Com frutas, consumo imediato.", 
    price: 70,
    flavors: ["Napolitano", "Bombom de uva", "Ouro branco", "Morango e merengue"]
  },
  { 
    id: "banoffee", 
    name: "Banoffee", 
    desc: "Biscoito crocante, bananas frescas, doce de leite e chantilly leve.", 
    serves: "Rende 12 fatias", 
    validity: "Validade: 3 dias na geladeira", 
    price: 70 
  }
];

// --- PARTY PACKAGES DATA ---
export const PARTY_PACKAGES_DATA = [
  {
    id: "kit-mini-6",
    name: "Kit Mini Cake (6 brigadeiros)",
    desc: "Mini cake + 6 brigadeiros. \nEscolha: 1 sabor de bentô cake e 2 sabores de brigadeiros tradicionais.",
    price: 45
  },
  {
    id: "kit-mini-16",
    name: "Kit Mini Cake (16 brigadeiros)",
    desc: "Mini cake + 16 brigadeiros. \nEscolha: 1 sabor de bentô cake e 2 sabores de brigadeiros tradicionais.",
    price: 60
  },
  {
    id: "kit-mesversario",
    name: "Kit Mesversário",
    desc: "Bolo 4\", 15 brigadeiros tradicionais, 4 cupcakes. Topos personalizados para bolo, cupcakes e brigadeiros.",
    price: 100
  }
];
