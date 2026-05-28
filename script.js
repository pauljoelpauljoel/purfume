document.addEventListener('DOMContentLoaded', () => {
    // Parallax mouse movement
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;

        const floatingObjects = document.querySelectorAll('.parallax-obj');
        floatingObjects.forEach(obj => {
            const speed = obj.getAttribute('data-speed') || 20;
            const xMove = x * speed;
            const yMove = y * speed;
            obj.style.transform = `translate(${xMove}px, ${yMove}px)`;
        });
    });

    // Check if on Signin page
    const signinForm = document.getElementById('signin-form');
    if (signinForm) {
        // Prevent going back to sign-in if already logged in (Mock check)
        if (sessionStorage.getItem('isLoggedIn')) {
            window.location.replace('index.php');
        }

        signinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.querySelector('.btn-signin');
            btn.innerHTML = 'Authenticating...';
            
            // Show loader
            const loader = document.getElementById('loader');
            if (loader) loader.classList.remove('hidden');

            setTimeout(() => {
                sessionStorage.setItem('isLoggedIn', 'true');
                window.location.replace('index.php');
            }, 1500);
        });
    }

    // Check if on Index page
    const indexContainer = document.getElementById('orbit-profiles-container');
    if (indexContainer) {
        // Prevent going back to sign-in
        if (!sessionStorage.getItem('isLoggedIn')) {
            // window.location.replace('signin.php');
        } else {
            history.pushState(null, null, location.href);
            window.onpopstate = function () {
                history.go(1);
            };
        }

        // Hide loader after a short delay to show cinematic entry
        setTimeout(() => {
            const loader = document.getElementById('loader');
            if (loader) loader.classList.add('hidden');
        }, 1000);

        // Fetch Data
        fetchData();
    }
});

async function fetchData() {
    try {
        // Fetch products
        const resProducts = await fetch('data/products.json');
        const products = await resProducts.json();
        
        // Fetch profiles
        const resProfiles = await fetch('data/profiles.json');
        const profiles = await resProfiles.json();

        renderProducts(products);
        renderFloatingProfiles(products);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderProducts(products) {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    let html = '';
    products.forEach(product => {
        html += `
            <div class="glass-card product-card">
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-brand">${product.brand}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">$${product.price}</div>
                <button class="btn-cart">Add to Cart</button>
            </div>
        `;
    });
    container.innerHTML = html;
}

function renderFloatingProfiles(products) {
    const container = document.getElementById('orbit-profiles-container');
    if (!container) return;

    // Use only 9 products
    const selectedProducts = products.slice(0, 9);
    
    let html = '';
    selectedProducts.forEach((product, i) => {
        html += `
            <div class="orbit-profile" id="orbit-node-${i}" style="position:absolute; top:50%; left:50%; transform: translate(-50%, -50%); pointer-events:auto; padding: 10px; display: flex; align-items: center; gap: 10px; background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; transition: z-index 0.1s;">
                <img src="${product.image}" alt="Product" style="width: 40px; height: 40px; border-radius: 8px; object-fit: contain;">
                <div class="info" style="font-size: 12px;">
                    <strong style="color: var(--neon-cyan); display: block;">${product.name}</strong>
                    <span style="color: var(--text-muted);">Nickname: ${product.brand}</span>
                    <span style="color: #FFD700; display: block; margin-top:2px;">Rate: $${product.price}</span>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;

    // Orbit Animation Logic
    let time = 0;
    const nodes = document.querySelectorAll('.orbit-profile');
    
    function animateOrbit() {
        nodes.forEach((node, i) => {
            // Distribute them evenly around the 360 degrees
            const angle = time + (i * (Math.PI * 2) / nodes.length);
            
            // X radius (wide) and Y radius (squished for 3D effect)
            const rx = 400; 
            const ry = 120;
            
            const x = Math.cos(angle) * rx;
            const y = Math.sin(angle) * ry;
            
            // Apply scale based on Y (depth) to simulate 3D distance
            const scale = 1 + (y / ry) * 0.2; 
            
            node.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`;
            
            // Bring to front when Y > 0 (front of the orbit)
            node.style.zIndex = y > 0 ? 10 : 1;
        });
        
        time += 0.005; // Speed of rotation
        requestAnimationFrame(animateOrbit);
    }
    
    animateOrbit();
}
