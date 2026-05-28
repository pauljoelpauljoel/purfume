document.addEventListener('DOMContentLoaded', () => {
    // Hide loader
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }, 500);

    fetchWishlist();
});

async function fetchWishlist() {
    try {
        const res = await fetch('data/products.json');
        const allProducts = await res.json();
        
        const wishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const wishlistedProducts = allProducts.filter(p => wishlistIds.includes(p.id.toString()));

        renderWishlist(wishlistedProducts);
    } catch (e) {
        console.error('Failed to load wishlist', e);
    }
}

function renderWishlist(products) {
    const container = document.getElementById('wishlist-grid');
    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 100px 0;"><h3 style="color: #fff;">Your wishlist is empty.</h3><a href="collection.php" class="btn-primary" style="display:inline-block; margin-top:20px; text-decoration:none;">Explore Collections</a></div>';
        return;
    }

    let html = '';
    const colorFilters = ['hue-rotate(0deg)', 'hue-rotate(-80deg)', 'hue-rotate(150deg)', 'hue-rotate(180deg)', 'hue-rotate(220deg)'];
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    products.forEach((product, i) => {
        const colorFilter = colorFilters[i % colorFilters.length];
        const isCarted = cart.includes(product.id.toString());
        
        html += `
            <div class="product-card glass-card" style="position: relative;" id="wishlist-item-${product.id}">
                
                <button onclick="removeFromWishlist('${product.id}')" style="position: absolute; top: 15px; right: 15px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); width: 35px; height: 35px; border-radius: 50%; cursor: pointer; color: #ff4757; transition: 0.3s; z-index: 10; font-size: 14px;">
                    ✖
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

window.removeFromWishlist = function(id) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    wishlist = wishlist.filter(item => item !== id.toString());
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    // Re-fetch and render
    fetchWishlist();
};

window.toggleCart = function(id, btn) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.includes(id)) {
        if(typeof openCart === 'function') openCart();
    } else {
        cart.push(id);
        btn.innerHTML = 'In Cart 🛒';
        btn.style.background = '#d4af37';
        btn.style.color = '#000';
        if(typeof openCart === 'function') openCart();
    }
    localStorage.setItem('cart', JSON.stringify(cart));
};
