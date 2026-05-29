const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const images = [
    'assets/images/prod1.png',
    'assets/images/prod2.png',
    'assets/images/prod3.png',
    'assets/images/hero.png',
    'assets/images/cosmic_perfume.png'
];

const categoriesData = [
    { cat: 'Woody', notes: { top: 'Cedarwood, Bergamot', heart: 'Sandalwood, Patchouli', base: 'Amber, Vetiver' }, desc: 'A deep, earthy scent with rich woody undertones and a warm amber finish.' },
    { cat: 'Fresh', notes: { top: 'Lemon, Mint', heart: 'Sea Salt, Aquatic', base: 'White Musk, Oakmoss' }, desc: 'An invigorating burst of oceanic freshness with a crisp, clean trail.' },
    { cat: 'Oriental', notes: { top: 'Saffron, Orange Blossom', heart: 'Oud, Rose', base: 'Vanilla, Leather' }, desc: 'A luxurious and exotic blend of spices, sweet florals, and dark woods.' },
    { cat: 'Citrus', notes: { top: 'Grapefruit, Mandarin', heart: 'Neroli, Jasmine', base: 'Cedar, Musk' }, desc: 'A vibrant and zesty fragrance radiating pure sunshine and energy.' },
    { cat: 'Floral', notes: { top: 'Peony, Rose', heart: 'Lily of the Valley, Magnolia', base: 'White Woods, Amber' }, desc: 'A romantic bouquet of blooming florals with a soft, elegant finish.' }
];

const brands = ["Aura", "Nova", "Zephyr", "Lumina", "Vortex", "Eon", "Quantum", "Obsidian"];
const volumes = ['50ml', '100ml', '150ml'];

let products = [];
for (let i = 1; i <= 40; i++) {
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const catData = categoriesData[Math.floor(Math.random() * categoriesData.length)];
    const img = images[i % images.length];
    const ml = volumes[Math.floor(Math.random() * volumes.length)];
    const price = (Math.floor(Math.random() * 300) + 150) * (ml === '100ml' ? 1.5 : (ml === '150ml' ? 2 : 1));

    products.push({
        id: i,
        name: `${brand} ${Math.floor(Math.random() * 900) + 100}`,
        brand: brand,
        price: price.toFixed(2),
        description: catData.desc,
        image: img,
        rating: (Math.random() * 1.5 + 3.5).toFixed(1), // 3.5 to 5.0
        is_trending: i <= 8,
        category: catData.cat,
        ml: ml,
        notes: catData.notes
    });
}

fs.writeFileSync(path.join(dataDir, 'products.json'), JSON.stringify(products, null, 2));
console.log('Database rebuilt perfectly!');
