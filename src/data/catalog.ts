export type ProductCategory =
  | "custom_cakes"
  | "mini_cakes"
  | "brigadeiros"
  | "mini_desserts"
  | "brazilian_sweets"
  | "desserts"
  | "party_packages"
  | "cupcakes"
  | "mini_brownies"
  | "caseirinhos";

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
    image: "/Imagens/custon kaque/WhatsApp Image 2026-09-04 at 06.35.09 (2).jpeg",
  },
  {
    id: "mini_cakes",
    name: { en: "Mini Cakes", pt: "Mini Cakes" },
    description: { en: "Perfect for intimate moments", pt: "Perfeito para momentos íntimos" },
    image: "/Imagens/bolos morango/WhatsApp Image 2026-09-04 at 06.32.55 (1).jpeg",
  },
  {
    id: "brigadeiros",
    name: { en: "Brigadeiros", pt: "Brigadeiros" },
    description: { en: "Traditional Brazilian truffles", pt: "Tradicionais doces brasileiros" },
    image: "/Imagens/docinho.jpeg",
  },
  {
    id: "mini_desserts",
    name: { en: "Mini Desserts", pt: "Mini Sobremesas / Tacinhas" },
    description: { en: "Delightful cups of joy", pt: "Deliciosas tacinhas de alegria" },
    image: "/Imagens/DOCES%20DE%20TACINHA.jpeg",
  },
  {
    id: "brazilian_sweets",
    name: { en: "Brazilian Celebration Sweets", pt: "Bem-casados" },
    description: { en: "Classic party favors", pt: "Clássicos para festas" },
    image: "/Imagens/BEM%20CASADO.jpeg",
  },
  {
    id: "desserts",
    name: { en: "Desserts", pt: "Sobremesas" },
    description: { en: "To share with the family", pt: "Para compartilhar com a família" },
    image: "/Imagens/PUDIM.jpeg",
  },
  {
    id: "party_packages",
    name: { en: "Party Packages", pt: "Kits para Festa" },
    description: { en: "Curated sets for events", pt: "Kits selecionados para eventos" },
    image: "/Imagens/KIT%20FESTA.jpeg",
  },
  {
    id: "cupcakes",
    name: { en: "Cupcakes", pt: "Cupcakes" },
    description: { en: "Handcrafted cupcakes, made to order", pt: "Cupcakes artesanais, feitos por encomenda" },
    image: "/Imagens/cupcakes.jpeg",
  },
  {
    id: "mini_brownies",
    name: { en: "Mini Brownies", pt: "Mini Brownies" },
    description: { en: "$150 per 100, six indulgent flavors", pt: "$150 o cento, seis sabores irresistíveis" },
    image: "/Imagens/Mini%20brownie.jpeg",
  },
  {
    id: "caseirinhos",
    name: { en: "Caseirinhos", pt: "Caseirinhos" },
    description: { en: "Homemade-style cakes, mini or large", pt: "Bolos caseiros, no tamanho mini ou grande" },
    image: "/Imagens/bolos%20morango/caseirinho.jpeg",
  },
];

// --- CUSTOM CAKES DATA ---
export const CAKE_SIZES = [
  { id: "4in", label: { en: "4\"", pt: "4\"" }, serves: { en: "4 - 6 servings", pt: "4 - 6 porções" }, price: 58 },
  { id: "5in", label: { en: "5\"", pt: "5\"" }, serves: { en: "7 - 10 servings", pt: "7 - 10 porções" }, price: 70 },
  { id: "6in", label: { en: "6\"", pt: "6\"" }, serves: { en: "10-15 slices", pt: "10-15 fatias" }, price: 80 },
  { id: "8in", label: { en: "8\"", pt: "8\"" }, serves: { en: "20 - 25 slices", pt: "20 - 25 fatias" }, price: 120 },
  { id: "10in", label: { en: "10\"", pt: "10\"" }, serves: { en: "33 - 38 slices", pt: "33 - 38 fatias" }, price: 180 },
  { id: "12in", label: { en: "12\"", pt: "12\"" }, serves: { en: "52 - 57 slices", pt: "52 - 57 fatias" }, price: 215 },
];

export const CAKE_FLAVORS_TRADICIONAIS = [
  { category: { en: "Chocolate Cake Base", pt: "Massa de chocolate" }, items: [
      { name: { en: "Brigadeiro", pt: "Brigadeiro" }, desc: { en: "Creamy brigadeiro filling", pt: "Recheio cremoso de brigadeiro" } },
      { name: { en: "Two Loves", pt: "Dois amores" }, desc: { en: "Creamy dark and white chocolate brigadeiro.", pt: "Recheios cremosos de brigadeiro meio amargo e brigadeiro branco." } },
      { name: { en: "Prestige", pt: "Prestígio" }, desc: { en: "Creamy coconut and dark chocolate brigadeiro.", pt: "Recheio de cocada cremosa e brigadeiro meio amargo." } },
      { name: { en: "Intense Choco", pt: "Choco Intense" }, desc: { en: "Creamy dark chocolate brigadeiro with chocolate pieces", pt: "brigadeiro cremoso meio amargo com pedaços de chocolate" } }
    ]
  },
  { category: { en: "Vanilla Cake Base", pt: "Massa branca" }, items: [
      { name: { en: "Ninho", pt: "Ninho" }, desc: { en: "Soft and light milk powder cream.", pt: "creme de leite ninho, suave e leve." } },
      { name: { en: "4 Milks", pt: "4 leites" }, desc: { en: "3 milks and dulce de leche filling.", pt: "Recheios de 3 leites e doce de leite." } },
      { name: { en: "White Chocolate", pt: "Chocolate branco" }, desc: { en: "Creamy white chocolate filling", pt: "recheio cremoso de chocolate branco" } }
    ]
  }
];

export const CAKE_FLAVORS_ESPECIAIS = [
  { category: { en: "Chocolate Cake Base", pt: "Massa de chocolate" }, items: [
      { name: { en: "Sensation", pt: "Sensação" }, desc: { en: "Creamy milk brigadeiro and fresh strawberries.", pt: "Brigadeiro cremoso ao leite e morangos frescos." } },
      { name: { en: "Neapolitan", pt: "Napolitana" }, desc: { en: "Milk brigadeiro, Ninho cream and fresh strawberries.", pt: "Brigadeiro ao leite, creme Ninho e morangos frescos." } },
      { name: { en: "Ninho w/ Nutella", pt: "Ninho c/ Nutella" }, desc: { en: "Ninho cream and Nutella brigadeiro", pt: "creme de ninho e brigadeiro de Nutella" } },
      { name: { en: "Truffled Passion Fruit", pt: "Maracujá trufado" }, desc: { en: "Black cake base, passion fruit brigadeiro and chocolate ganache.", pt: "Massa black, brigadeiro de maracujá e briganache de chocolate." } },
      { name: { en: "Matilda", pt: "Matilda" }, desc: { en: "Black cake base, chocolate ganache.", pt: "Massa black, briganache de chocolate." } }
    ]
  },
  { category: { en: "Vanilla Cake Base", pt: "Massa branca" }, items: [
      { name: { en: "Strawberry Four Milks", pt: "Morango aos quatro leites" }, desc: { en: "Strawberry jam, three milks and dulce de leche.", pt: "Geleia de morango, recheio três leites e doce de leite." } },
      { name: { en: "Pink Lemonade", pt: "Pink lemonade" }, desc: { en: "Sicilian lemon filling with berry jam.", pt: "Recheio de limão siciliano com geleia de frutas vermelhas." } },
      { name: { en: "Passion Berry", pt: "Passion Berry" }, desc: { en: "Passion fruit cream filling and berry jam", pt: "Recheio de creme de maracujá e geleia de frutas vermelhas" } },
      { name: { en: "Pineapple Coconut Delight", pt: "Delícia de abacaxi c/ coco" }, desc: { en: "Creamy coconut filling and pineapple pieces.", pt: "Recheio cremoso de coco e pedaços de abacaxi." } },
      { name: { en: "Ninho with Strawberry", pt: "Ninho com morango" }, desc: { en: "Ninho cream filling and strawberry jam", pt: "Recheio de creme de ninho e geleia de morango" } }
    ]
  }
];

export const CAKE_DESIGNS = [
  { id: "naked", label: { en: "Smooth Naked Cake (1 color)", pt: "Naked Cake Liso 1 cor" } },
  { id: "liso2", label: { en: "2 colors", pt: "2 cores" } },
  { id: "petitpoa", label: { en: "Petit poá", pt: "Petit poá" } },
  { id: "texturizado", label: { en: "Textured", pt: "Texturizado" } },
  { id: "pitangas", label: { en: "Delicate piping", pt: "Pitangas delicadas" } },
  { id: "petalas", label: { en: "Petals (up to 2 colors)", pt: "Pétalas até 2 cores" } },
];

export const CAKE_ADDONS = [
  { id: "topo", label: { en: "Themed topper", pt: "Topo temático" }, priceText: { en: "starting at $15", pt: "a partir de $15" }, price: 15 },
  { id: "flores", label: { en: "Fresh flowers", pt: "Flores naturais" }, priceText: { en: "Starting at $18", pt: "A partir de $18" }, price: 18 },
  { id: "frutas", label: { en: "Fruits", pt: "Frutas" }, priceText: { en: "starting at $5", pt: "a partir de $5" }, price: 5 },
  { id: "brigadeiros", label: { en: "Brigadeiros", pt: "Brigadeiros" }, priceText: { en: "starting at $6", pt: "a partir de $6" }, price: 6 },
  { id: "misto", label: { en: "Mixed (fruits & brigadeiros)", pt: "Misto (frutas e brigadeiros)" }, priceText: { en: "starting at $5", pt: "a partir de $5" }, price: 5 },
];

// --- BRIGADEIROS DATA ---
export const BRIGADEIRO_FLAVORS = {
  tradicionais: ["Brigadeiro", "Branquinho", "Casadinho", "Ninho", "Beijinho", "Bicho de pé", "Casadinho de morango"],
  especiais: ["Ao leite Belga", "Branco", "Morangutella", "Amendoim", "Confete", "Churros", "M. amargo", "Maracujá", "Limão", "Coco queimado", "Oreo", "Romeu e Julieta"]
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

export const BRIGADEIRO_DOCINHOS = [
  { id: "strawberry", name: "STRAWBERRY DELIGHT", desc: { en: "Ninho milk cream, homemade strawberry compote and whipped cream.", pt: "Creme de leite Ninho, geleia de morangos e chantilly." }, price: 1.50 },
  { id: "passion", name: "PASSION FRUIT CHOCOLATE", desc: { en: "Passion fruit mousse, creamy chocolate brigadeiro and passion fruit jam.", pt: "Mousse de maracujá com brigadeiro cremoso de chocolate e geleia de maracujá." }, price: 1.90 },
  { id: "choc_strawberry", name: "CHOCOLATE & STRAWBERRY", desc: { en: "White and milk chocolate brigadeiro with fresh strawberries.", pt: "Brigadeiro branco e ao leite com morangos frescos." }, price: 1.50 },
  { id: "brigadeiro", name: "BRIGADEIRO", desc: { en: "Creamy Brazilian chocolate fudge.", pt: "Brigadeiro gourmet cremoso." }, price: 1.20 },
  { id: "banoffee", name: "BANOFFEE", desc: { en: "Cookie crumble, dulce de leche, fresh banana and cinnamon whipped cream.", pt: "Farofa de biscoito, doce de leite, banana picada e chantilly com canela." }, price: 1.90 },
  { id: "lemon", name: "LEMON CREAM", desc: { en: "Cookie crumble, lemon mousse, whipped cream and fresh lemon zest.", pt: "Farofa de biscoito, mousse de limão, chantilly e raspinhas de limão." }, price: 1.90 },
  { id: "brownie", name: "BROWNIE DELIGHT", desc: { en: "Fudgy brownie with creamy white and dark chocolate brigadeiro.", pt: "Brownie molhadinho com brigadeiro cremoso branco e meio amargo." }, price: 1.90 },
  { id: "cookies", name: "COOKIES CREAM", desc: { en: "Vanilla cream, Oreo® cookies and whipped cream.", pt: "Creme de baunilha com biscoito Oreo® e chantilly." }, price: 1.90 },
  { id: "kitkat", name: "KITKAT", desc: { en: "Nutella, white brigadeiro and KITKAT® pieces.", pt: "Nutella, brigadeiro branco e pedaços de Kinder Bueno®." }, price: 1.90 },
];

// --- MINI DESSERTS DATA ---
export const MINI_DESSERTS = [
  { id: "morango", name: { pt: "DELÍCIA DE MORANGO", en: "STRAWBERRY DELIGHT" }, desc: { pt: "Creme de leite Ninho, geleia de morangos e chantilly.", en: "Ninho milk cream, homemade strawberry compote and whipped cream." }, price: 1.50 },
  { id: "maracuja", name: { pt: "MARACUJÁ C/ CHOCOLATE", en: "PASSION FRUIT CHOCOLATE" }, desc: { pt: "Mousse de maracujá com brigadeiro cremoso de chocolate e geleia de maracujá.", en: "Passion fruit mousse, creamy chocolate brigadeiro and passion fruit jam." }, price: 1.90 },
  { id: "doisamores", name: { pt: "DOIS AMORES C/ MORANGO", en: "CHOCOLATE & STRAWBERRY" }, desc: { pt: "Brigadeiro branco e ao leite com morangos frescos.", en: "White and milk chocolate brigadeiro with fresh strawberries." }, price: 1.50 },
  { id: "brigadeiro", name: { pt: "BRIGADEIRO", en: "BRIGADEIRO" }, desc: { pt: "Brigadeiro gourmet cremoso.", en: "Creamy Brazilian chocolate fudge." }, price: 1.00 },
  { id: "banoffee", name: { pt: "BANOFFEE", en: "BANOFFEE" }, desc: { pt: "Farofa de biscoito, doce de leite, banana picada e chantilly com canela.", en: "Cookie crumble, dulce de leche, fresh banana and cinnamon whipped cream." }, price: 1.90 },
  { id: "limao", name: { pt: "LIMÃO", en: "LEMON CREAM" }, desc: { pt: "Farofa de biscoito, mousse de limão, chantilly e raspinhas de limão.", en: "Cookie crumble, lemon mousse, whipped cream and fresh lemon zest." }, price: 1.90 },
  { id: "brownie", name: { pt: "DELÍCIA DE BROWNIE", en: "BROWNIE DELIGHT" }, desc: { pt: "Brownie molhadinho com brigadeiro cremoso branco e meio amargo.", en: "Fudgy brownie with creamy white and dark chocolate brigadeiro." }, price: 1.90 },
  { id: "cookies", name: { pt: "COOKIES CREAM", en: "COOKIES CREAM" }, desc: { pt: "Creme de baunilha com biscoito Oreo® e chantilly.", en: "Vanilla cream, Oreo® cookies and whipped cream." }, price: 1.90 },
  { id: "kitkat", name: { pt: "KITKAT", en: "KITKAT" }, desc: { pt: "Nutella, brigadeiro branco e pedaços de Kinder Bueno®.", en: "Nutella, white brigadeiro and KITKAT® pieces." }, price: 1.90 },
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
    name: { pt: "Pudim", en: "Brazilian Flan (Pudim)" }, 
    desc: { pt: "Pudim de leite condensado, lisinho, cremoso e irresistível.", en: "Smooth, creamy and irresistible condensed milk flan." }, 
    serves: { pt: "Serve 8 fatias", en: "Serves 8 slices" }, 
    validity: { pt: "Validade: 7 dias na geladeira", en: "Shelf life: 7 days in fridge" }, 
    price: 30 
  },
  { 
    id: "bombom", 
    name: { pt: "Sobremesa de travessa", en: "Dessert Tray" },
    desc: { pt: "Uma travessa inteira de pura alegria e cremosidade.", en: "A whole bowl of pure joy and creaminess." },
    serves: { pt: "Serve até 6 pessoas", en: "Serves up to 6 people" },
    validity: { pt: "Validade: sem frutas, até 4 dias refrigerado. Com frutas, consumo imediato.", en: "Shelf life: 4 days refrigerated without fruits. With fruits, consume immediately." },
    price: 35,
    flavors: [
      { name: "Napolitano", desc: { pt: "Brigadeiro ao leite, creme de ninho e morangos frescos.", en: "Milk brigadeiro, Ninho cream and fresh strawberries." } },
      { name: "Bombom de uva", desc: { pt: "Uvas frescas com brigadeiro cremoso.", en: "Fresh grapes with creamy brigadeiro." } },
      { name: "Maracujá trufado", desc: { pt: "Brigadeiro de maracujá e ganache de chocolate.", en: "Passion fruit brigadeiro and chocolate ganache." } },
      { name: "Merengue de morango", desc: { pt: "Merengue crocante com creme de morango fresco.", en: "Crunchy meringue with fresh strawberry cream." } },
      { name: "Morango moreno", desc: { pt: "Pão de ló, doce de leite, creme de chantilly e morango.", en: "Sponge cake, dulce de leche, whipped cream and strawberry." } },
      { name: "Travessa de limão", desc: { pt: "Mousse de limão siciliano com chantilly e raspas.", en: "Sicilian lemon mousse with whipped cream and zest." } },
    ]
  },
  {
    id: "tortas",
    name: { pt: "Tortas", en: "Pies" },
    desc: { pt: "Torta artesanal gelada, cremosa e cheia de sabor.", en: "Chilled handcrafted pie, creamy and full of flavor." },
    serves: { pt: "Rende 12 fatias", en: "Serves 12 slices" },
    validity: { pt: "Validade: 3 dias na geladeira", en: "Shelf life: 3 days in fridge" },
    price: 70,
    flavors: [
      { name: "Banoffee", desc: { pt: "Biscoito crocante, banana fresca, doce de leite e chantilly leve.", en: "Crunchy cookie base, fresh banana, dulce de leche and light whipped cream." } },
      { name: "Limão", desc: { pt: "Base crocante, creme de limão siciliano e chantilly.", en: "Crunchy base, Sicilian lemon cream and whipped cream." } },
      { name: "Creme e framboesa", desc: { pt: "Creme de confeiteiro com framboesas frescas.", en: "Pastry cream with fresh raspberries." } },
      { name: "Prestígio", desc: { pt: "Cocada cremosa e ganache de chocolate meio amargo.", en: "Creamy coconut and dark chocolate ganache." } },
    ]
  }
];

// --- PARTY PACKAGES DATA ---
export const PARTY_PACKAGES_DATA = [
  {
    id: "kit-mini-6",
    name: { pt: "Kit Mini Cake (6 brigadeiros)", en: "Mini Cake Kit (6 brigadeiros)" },
    desc: { pt: "Mini cake + 6 brigadeiros. \nEscolha: 1 sabor de bentô cake e 2 sabores de brigadeiros tradicionais.", en: "Mini cake + 6 brigadeiros. \nChoose: 1 bento cake flavor and 2 traditional brigadeiro flavors." },
    price: 45
  },
  {
    id: "kit-mini-16",
    name: { pt: "Kit Mini Cake (16 brigadeiros)", en: "Mini Cake Kit (16 brigadeiros)" },
    desc: { pt: "Mini cake + 16 brigadeiros. \nEscolha: 1 sabor de bentô cake e 2 sabores de brigadeiros tradicionais.", en: "Mini cake + 16 brigadeiros. \nChoose: 1 bento cake flavor and 2 traditional brigadeiro flavors." },
    price: 60
  },
  {
    id: "kit-mesversario",
    name: { pt: "Kit Mesversário", en: "Monthly Birthday Kit" },
    desc: { pt: "Bolo 4\", 15 brigadeiros tradicionais, 4 cupcakes. Topos personalizados para bolo, cupcakes e brigadeiros.", en: "4\" Cake, 15 traditional brigadeiros, 4 cupcakes. Custom toppers for cake, cupcakes and brigadeiros." },
    price: 100
  }
];

// --- CUPCAKES DATA ---
export const CUPCAKES_DATA = {
  flavors: [
    { id: "ninho", name: { en: "Ninho", pt: "Ninho" }, desc: { en: "Soft and light milk powder cream", pt: "Creme de leite ninho, suave e leve" } },
    { id: "vanilla", name: { en: "Vanilla", pt: "Vanilla" }, desc: { en: "Classic vanilla cream", pt: "Creme cl\u00e1ssico de baunilha" } },
    { id: "brigadeiro", name: { en: "Brigadeiro", pt: "Brigadeiro" }, desc: { en: "Creamy Brazilian chocolate fudge", pt: "Brigadeiro gourmet cremoso" } },
  ],
  pricePerUnit: 3.50,
  topperPrice: 0.85,
  minQty: 12,
};

// --- MINI BROWNIES DATA ---
export const MINI_BROWNIES_DATA = {
  flavors: ["Ninho c/ Nutella", "Morango c/ Nutella", "Brigadeiro", "Chocolate", "Oreo", "Doce de leite"],
  pricePerHundred: 150,
  minQty: 100,
};

// --- CASEIRINHOS DATA ---
export const CASEIRINHOS_SIZES = [
  { id: "mini", label: { en: "Mini", pt: "Mini" }, price: 18 },
  { id: "large", label: { en: "Large", pt: "Grande" }, price: 40 },
];

export const CASEIRINHOS_FLAVORS = ["Laranja", "Chocolate", "Cenoura", "Banana", "Limão", "Fubá com goiabada"];
