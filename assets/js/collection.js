document.addEventListener('DOMContentLoaded', () => {
    // Hide loader
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }, 500);

    fetchCollectionData();
});

let allProducts = [];

async function fetchCollectionData() {
    try {
        const res = await fetch('../theme_json/products.json?v=' + new Date().getTime());
        allProducts = await res.json();
        renderGrid(allProducts);
        
        // Setup Event Listeners for Filters
        document.getElementById('collection-search').addEventListener('input', applyFilters);
        document.getElementById('filter-brand').addEventListener('change', applyFilters);
        document.getElementById('filter-volume').addEventListener('change', applyFilters);

        const categoryBtns = document.querySelectorAll('.filter-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                applyFilters();
            });
        });
        
    } catch (e) {
        console.error('Failed to load products', e);
    }
}

function applyFilters() {
    const query = document.getElementById('collection-search').value.toLowerCase();
    const activeCatBtn = document.querySelector('.filter-btn.active');
    const cat = activeCatBtn ? activeCatBtn.getAttribute('data-filter') : 'all';
    const brand = document.getElementById('filter-brand').value;
    const vol = document.getElementById('filter-volume').value;

    let filtered = allProducts.filter(p => {
        let match = true;
        if (query && !p.name.toLowerCase().includes(query)) match = false;
        if (cat !== 'all' && p.category !== cat) match = false;
        if (brand !== 'all' && p.brand !== brand) match = false;
        if (vol !== 'all' && p.ml !== vol) match = false;
        return match;
    });

    renderGrid(filtered);
}

function renderGrid(products) {
    const container = document.getElementById('collection-grid');
    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = '<p style="color:#fff; text-align:center; grid-column: 1/-1; padding: 50px;">No fragrances match your filters.</p>';
        return;
    }

    let html = '';
    const colorFilters = ['hue-rotate(0deg)', 'hue-rotate(-80deg)', 'hue-rotate(150deg)', 'hue-rotate(180deg)', 'hue-rotate(220deg)'];

    // Load wishlist/cart from local storage for UI matching
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    products.forEach((product, i) => {
        const colorFilter = colorFilters[i % colorFilters.length];
        const isWished = wishlist.includes(product.id.toString());
        const isCarted = cart.includes(product.id.toString());
        
        html += `
            <div class="product-card glass-card" style="position: relative;">
                
                <!-- Wishlist Button -->
                <button onclick="toggleWishlist('${product.id}', this)" style="position: absolute; top: 15px; right: 15px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); width: 35px; height: 35px; border-radius: 50%; cursor: pointer; color: ${isWished ? '#d4af37' : '#fff'}; transition: 0.3s; z-index: 10;">
                    ${isWished ? '✨' : '☆'}
                </button>

                <a href="product.php?id=${product.id}" class="product-image-container" style="display: block; text-decoration: none; height: 250px; padding: 20px;">
                    <img src="${product.image}" alt="${product.name}" style="filter: drop-shadow(0 10px 15px rgba(0,0,0,0.5)) ${colorFilter}; max-height: 100%; object-fit: contain; transition: transform 0.3s;">
                </a>
                
                <div class="product-info" style="margin-top: 15px; text-align: center;">
                    <p style="font-size: 12px; color: var(--neon-cyan); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 5px;">${product.category} • ${product.ml}</p>
                    <h3 class="product-name" style="font-size: 18px; margin-bottom: 5px; color: #fff;">${product.name}</h3>
                    <p style="font-size: 16px; color: #d4af37; margin-bottom: 15px; font-weight: 600;">₹${product.price}</p>
                    
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <a href="product.php?id=${product.id}" class="btn-primary" style="padding: 8px 15px; font-size: 13px; text-decoration: none; border-radius: 20px;">View</a>
                        <button onclick="toggleCart('${product.id}', this)" class="btn-primary" style="padding: 8px 15px; font-size: 13px; background: ${isCarted ? '#d4af37' : 'transparent'}; color: ${isCarted ? '#000' : 'var(--neon-cyan)'}; border-radius: 20px;">
                            ${isCarted ? 'In Cart 🛒' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Global functions for inline handlers
window.toggleWishlist = function(id, btn) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(item => item !== id);
        btn.innerHTML = '☆';
        btn.style.color = '#fff';
        if (typeof showToast === 'function') showToast('Removed from wishlist');
    } else {
        wishlist.push(id);
        btn.innerHTML = '✨';
        btn.style.color = '#d4af37';
        if (typeof showToast === 'function') showToast('Added to wishlist! ✨');
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
};

window.toggleCart = function(id, btn) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.includes(id)) {
        localStorage.setItem('cart', JSON.stringify(cart));
        openCart();
    } else {
        cart.push(id);
        btn.innerHTML = 'In Cart 🛒';
        btn.style.background = '#d4af37';
        btn.style.color = '#000';
        if (typeof showToast === 'function') showToast('Item added to cart! 🛒');
        localStorage.setItem('cart', JSON.stringify(cart));
        openCart();
    }
};
