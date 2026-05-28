const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// 1. Products (30 products)
const products = [];
const brands = ["Aura", "Nova", "Zephyr", "Lumina", "Vortex", "Eon", "Quantum", "Obsidian"];
const notes = ["Woody & Spicy", "Fresh & Aquatic", "Citrus & Oriental", "Leather & Musk", "Amber & Vanilla"];
const images = ["assets/images/prod1.png", "assets/images/prod2.png", "assets/images/prod3.png"];

for (let i = 1; i <= 32; i++) {
    const brand = brands[Math.floor(Math.random() * brands.length)];
    products.push({
        id: i,
        name: `${brand} ${Math.floor(Math.random() * 900) + 100}`,
        brand: brand,
        price: (Math.floor(Math.random() * (450 - 80 + 1)) + 80).toFixed(2),
        description: `A futuristic blend of ${notes[Math.floor(Math.random() * notes.length)].toLowerCase()} with a premium glassmorphic presence.`,
        image: images[Math.floor(Math.random() * images.length)],
        rating: (Math.floor(Math.random() * (50 - 40 + 1)) + 40) / 10,
        is_trending: i <= 6
    });
}
fs.writeFileSync(path.join(dataDir, 'products.json'), JSON.stringify(products, null, 2));

// 2. Profiles (Floating profile cards)
const profiles = [];
const users = ["Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Sam", "Jamie"];
for (let i = 1; i <= 10; i++) {
    profiles.push({
        id: i,
        user: users[Math.floor(Math.random() * users.length)],
        review: "Amazing fragrance! Truly futuristic.",
        rating: Math.floor(Math.random() * (5 - 4 + 1)) + 4,
        perfume_image: images[Math.floor(Math.random() * images.length)]
    });
}
fs.writeFileSync(path.join(dataDir, 'profiles.json'), JSON.stringify(profiles, null, 2));

// 3. Services
const services = [
    { title: "Free Delivery", desc: "Worldwide luxury shipping", icon: "globe" },
    { title: "Premium Support", desc: "24/7 VIP assistance", icon: "headset" },
    { title: "Gift Wrapping", desc: "Futuristic glowing packaging", icon: "gift" }
];
fs.writeFileSync(path.join(dataDir, 'services.json'), JSON.stringify(services, null, 2));

// 4. Testimonials
const testimonials = [
    { name: "David R.", text: "The showroom experience is out of this world.", role: "Collector" },
    { name: "Sarah L.", text: "Unmatched luxury and aesthetic.", role: "Enthusiast" }
];
fs.writeFileSync(path.join(dataDir, 'testimonials.json'), JSON.stringify(testimonials, null, 2));

// 5. Categories
const categories = [
    { id: "c1", name: "Woody" },
    { id: "c2", name: "Aquatic" },
    { id: "c3", name: "Oriental" },
    { id: "c4", name: "Fresh" }
];
fs.writeFileSync(path.join(dataDir, 'categories.json'), JSON.stringify(categories, null, 2));

console.log("JSON files generated successfully.");
