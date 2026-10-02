const fs = require('fs');

const autoBrands = ['Bosch', 'Brembo', 'NGK', 'Mann Filter', 'Ferodo', 'Magneti Marelli', 'Gates', 'SKF', 'Valeo', 'Castrol'];
const motoBrands = ['Brembo', 'NGK', 'Mann Filter', 'Ferodo', 'Magneti Marelli', 'Gates', 'SKF', 'Pirelli', 'Motul', 'Akrapovic'];
const truckBrands = ['Bosch', 'Brembo', 'Mann Filter', 'Ferodo', 'Magneti Marelli', 'Gates', 'SKF', 'Hella', 'Wabco', 'Michelin'];

const parts = [
  { name: 'Filtro Olio', desc: 'Filtro olio ad alta efficienza per una protezione ottimale del motore.', tags: ['filtri', 'olio', 'motore'] },
  { name: 'Pastiglie Freno Anteriori', desc: 'Pastiglie freno in mescola premium per massime prestazioni.', tags: ['freni', 'pastiglie', 'sicurezza'] },
  { name: 'Candele Accensione', desc: 'Candele ad alte prestazioni per una combustione perfetta.', tags: ['accensione', 'candele', 'motore'] },
  { name: 'Filtro Aria', desc: 'Filtro aria ad alta capacità filtrante per massimizzare il flusso.', tags: ['filtri', 'aria', 'motore'] },
  { name: 'Disco Freno', desc: 'Disco freno ventilato con trattamento anti-corrosione.', tags: ['freni', 'dischi', 'sicurezza'] },
  { name: 'Cinghia Distribuzione', desc: 'Cinghia in materiale rinforzato resistente al calore.', tags: ['distribuzione', 'cinghia', 'motore'] },
  { name: 'Ammortizzatore', desc: 'Ammortizzatore a gas per comfort e stabilità in curva.', tags: ['sospensioni', 'ammortizzatori', 'comfort'] },
  { name: 'Cuscinetto Ruota', desc: 'Cuscinetto ruota ad alta precisione con lunga durata.', tags: ['sospensioni', 'cuscinetti', 'trasmissione'] },
  { name: 'Filtro Abitacolo', desc: 'Filtro abitacolo ai carboni attivi per aria pulita.', tags: ['filtri', 'abitacolo', 'comfort'] },
  { name: 'Pompa Acqua', desc: 'Pompa acqua ad alto flusso per un raffreddamento ideale.', tags: ['motore', 'raffreddamento', 'pompa'] },
  { name: 'Spazzole Tergicristallo', desc: 'Spazzole aerodinamiche per una visibilità perfetta.', tags: ['visibilità', 'tergicristalli', 'sicurezza'] },
  { name: 'Kit Frizione', desc: 'Kit frizione completo per cambi fluidi e precisi.', tags: ['trasmissione', 'frizione', 'motore'] },
  { name: 'Olio Motore 5W-30', desc: 'Olio motore sintetico per massime prestazioni.', tags: ['olio', 'lubrificanti', 'motore'] },
  { name: 'Batteria 12V', desc: 'Batteria ad alta capacità per partenze sicure.', tags: ['elettrico', 'batteria', 'energia'] },
  { name: 'Termostato', desc: 'Termostato di precisione per il controllo della temperatura.', tags: ['motore', 'raffreddamento', 'termostato'] },
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

let code = '';
let idCounter = 1;

function generateCategory(cat, prefix, count, brands) {
  code += `\n  // ── ${cat.toUpperCase()} (${count}) ──────────────────────────────────────────────────────────────\n\n`;
  for (let i = 0; i < count; i++) {
    const brand = getRandom(brands);
    const part = getRandom(parts);
    const id = `${prefix}-${String(idCounter).padStart(4, '0')}`;
    const sku = `${brand.substring(0, 3).toUpperCase()}-${idCounter}${Math.floor(Math.random() * 1000)}`;
    const slug = `${part.name.toLowerCase().replace(/ /g, '-')}-${brand.toLowerCase().replace(/ /g, '-')}-${idCounter}`;
    const title = `${part.name} ${brand} ${cat.toUpperCase()}`;
    const price = (Math.random() * 200 + 10).toFixed(1);
    const originalPrice = Math.random() > 0.7 ? (parseFloat(price) + 20).toFixed(1) : 'undefined';
    const stock = Math.floor(Math.random() * 500);
    const isNew = Math.random() > 0.8;
    const isBestseller = Math.random() > 0.8;
    const rating = (3.5 + Math.random() * 1.5).toFixed(1);
    const reviewCount = Math.floor(Math.random() * 1000);
    const tags = JSON.stringify(part.tags.concat([cat]));

    const originalPriceOpt = originalPrice !== 'undefined' ? `originalPrice: ${originalPrice}, ` : '';
    const isNewOpt = isNew ? `isNew: true, ` : '';
    const isBestsellerOpt = isBestseller ? `isBestseller: true, ` : '';

    code += `  p('${id}', '${slug}', '${sku}', '${title}', '${part.desc}', ${price}, ${stock}, '${cat}', '${brand}', ['Modello Generico A', 'Modello Generico B'], ${tags}, { ${originalPriceOpt}${isNewOpt}${isBestsellerOpt}rating: ${rating}, reviewCount: ${reviewCount} }),\n`;
    idCounter++;
  }
}

code += `export const PRODUCTS: Product[] = [\n`;
generateCategory('auto', 'auto', 150, autoBrands);
generateCategory('moto', 'moto', 150, motoBrands);
generateCategory('camion', 'truck', 150, truckBrands);
code += `];\n`;

const productsFile = './src/lib/products.ts';
let content = fs.readFileSync(productsFile, 'utf8');
const regex = /export const PRODUCTS: Product\[\] = \[\s*[\s\S]*?\];/;
content = content.replace(regex, code);
fs.writeFileSync(productsFile, content);
console.log('Generated 450 products in src/lib/products.ts');
