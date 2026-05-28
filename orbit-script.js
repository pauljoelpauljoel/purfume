document.addEventListener('DOMContentLoaded', () => {
    // Hide loader
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }, 1000);

    fetchData();
});

async function fetchData() {
    try {
        const res = await fetch('data/products.json');
        const products = await res.json();
        
        // Take first 15 products for the orbit
        renderPlanets(products.slice(0, 15));
    } catch (e) {
        console.error('Failed to load products', e);
    }
}

function renderPlanets(products) {
    const container = document.getElementById('planet-products-container');
    if (!container) return;

    let html = '';

    // Array of hue-rotations to change the blue/cyan perfume to different colors
    // 0 = Original (3 items)
    // -80 = Green (3 items)
    // 150 = Red (3 items)
    // 180 = Orange (3 items)
    // 220 = Yellow (3 items)
    const colorFilters = [
        'hue-rotate(0deg)', 'hue-rotate(0deg)', 'hue-rotate(0deg)',
        'hue-rotate(-80deg)', 'hue-rotate(-80deg)', 'hue-rotate(-80deg)',
        'hue-rotate(150deg)', 'hue-rotate(150deg)', 'hue-rotate(150deg)',
        'hue-rotate(180deg)', 'hue-rotate(180deg)', 'hue-rotate(180deg)',
        'hue-rotate(220deg)', 'hue-rotate(220deg)', 'hue-rotate(220deg)'
    ];

    // Distribute 15 products randomly in 3D space
    products.forEach((product, i) => {
        // Randomize orbit parameters for each planet
        const rx = 200 + Math.random() * 300; 
        const ry = 100 + Math.random() * 200; 
        const depth = 50 + Math.random() * 150; 
        const speed = 0.0005 + Math.random() * 0.0015; 
        const angle = Math.random() * Math.PI * 2; 
        const direction = Math.random() > 0.5 ? 1 : -1;
        const colorFilter = colorFilters[i % colorFilters.length];

        html += `
            <a href="product.php?id=${product.id}" class="planet-box" 
               data-rx="${rx}" data-ry="${ry}" data-depth="${depth}" 
               data-speed="${speed}" data-angle="${angle}" data-dir="${direction}">
                <img src="${product.image}" alt="${product.name}" class="planet-img" style="filter: drop-shadow(0 10px 15px rgba(0,0,0,0.5)) ${colorFilter};">
                <div class="planet-name">${product.name}</div>
            </a>
        `;
    });
    
    container.innerHTML = html;

    // Start Animation
    animateGalaxy();

    // Search functionality
    const searchInput = document.getElementById('planet-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const allPlanets = document.querySelectorAll('.planet-box');
            allPlanets.forEach(p => {
                const name = p.querySelector('.planet-name').textContent.toLowerCase();
                if (name.includes(query)) {
                    p.style.opacity = '1';
                    p.style.pointerEvents = 'auto';
                } else {
                    p.style.opacity = '0.1';
                    p.style.pointerEvents = 'none';
                }
            });
        });
    }
}

let time = 0;
function animateGalaxy() {
    const planets = document.querySelectorAll('.planet-box');
    
    planets.forEach((planet) => {
        const rx = parseFloat(planet.getAttribute('data-rx'));
        const ry = parseFloat(planet.getAttribute('data-ry'));
        const depth = parseFloat(planet.getAttribute('data-depth'));
        const speed = parseFloat(planet.getAttribute('data-speed'));
        const startAngle = parseFloat(planet.getAttribute('data-angle'));
        const dir = parseFloat(planet.getAttribute('data-dir'));
        
        // Current angle
        const currentAngle = startAngle + (time * speed * dir);
        
        // 3D Orbit calculation
        const x = Math.cos(currentAngle) * rx;
        const y = Math.sin(currentAngle) * ry; // Up/down movement
        const z = Math.sin(currentAngle) * depth; // In/out depth movement
        
        // Scale based on Z depth to simulate 3D
        const scale = 1 + (z / depth) * 0.3;
        
        planet.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`;
        
        // Z-index calculation
        planet.style.zIndex = z > 0 ? 50 + Math.floor(z) : 10 + Math.floor(z);
    });

    time += 1;
    requestAnimationFrame(animateGalaxy);
}
