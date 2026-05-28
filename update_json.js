const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data', 'products.json');
let products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const categories = ['Fresh', 'Woody', 'Oriental', 'Citrus', 'Leather', 'Amber'];
const volumes = ['50ml', '100ml', '150ml', '200ml'];

const noteOptions = {
    'Fresh': { top: ['Bergamot', 'Mint', 'Lemon'], heart: ['Aquatic', 'Lavender', 'Sea Salt'], base: ['White Musk', 'Cedarwood'] },
    'Woody': { top: ['Grapefruit', 'Cypress'], heart: ['Sandalwood', 'Vetiver', 'Patchouli'], base: ['Oakmoss', 'Amber'] },
    'Oriental': { top: ['Cardamom', 'Pink Pepper'], heart: ['Cinnamon', 'Rose', 'Nutmeg'], base: ['Vanilla', 'Tonka Bean', 'Oud'] },
    'Citrus': { top: ['Mandarin', 'Lime', 'Orange'], heart: ['Neroli', 'Basil'], base: ['Musk', 'Vetiver'] },
    'Leather': { top: ['Saffron', 'Thyme'], heart: ['Leather', 'Incense'], base: ['Suede', 'Amberwood'] },
    'Amber': { top: ['Plum', 'Bergamot'], heart: ['Amber', 'Rose'], base: ['Vanilla', 'Labdanum'] }
};

products = products.map(p => {
    // Determine category based on description if possible, else random
    let cat = categories[Math.floor(Math.random() * categories.length)];
    if (p.description.toLowerCase().includes('fresh')) cat = 'Fresh';
    if (p.description.toLowerCase().includes('woody')) cat = 'Woody';
    if (p.description.toLowerCase().includes('oriental')) cat = 'Oriental';
    if (p.description.toLowerCase().includes('citrus')) cat = 'Citrus';
    if (p.description.toLowerCase().includes('leather')) cat = 'Leather';
    if (p.description.toLowerCase().includes('amber')) cat = 'Amber';

    const vol = volumes[Math.floor(Math.random() * volumes.length)];
    
    // Pick random notes based on category
    const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const topNote = pickRandom(noteOptions[cat].top) + ', ' + pickRandom(noteOptions[cat].top);
    const heartNote = pickRandom(noteOptions[cat].heart) + ', ' + pickRandom(noteOptions[cat].heart);
    const baseNote = pickRandom(noteOptions[cat].base) + ', ' + pickRandom(noteOptions[cat].base);

    return {
        ...p,
        category: cat,
        ml: vol,
        notes: {
            top: topNote,
            heart: heartNote,
            base: baseNote
        }
    };
});

fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
console.log('Updated products.json successfully.');
