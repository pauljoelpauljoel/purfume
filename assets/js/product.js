document.addEventListener('DOMContentLoaded', () => {
    // Hide loader
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }, 500);

    fetchProduct();
});

async function fetchProduct() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        if (!productId) {
            document.getElementById('product-container').innerHTML = '<h2 style="color:white;">Product Not Found.</h2>';
            return;
        }

        const res = await fetch('../theme_json/products.json?v=' + new Date().getTime());
        const products = await res.json();
        const product = products.find(p => p.id == productId);

        if (!product) {
            document.getElementById('product-container').innerHTML = '<h2 style="color:white;">Product Not Found.</h2>';
            return;
        }
        
        window.currentProduct = product;

        renderProduct(product);
    } catch (e) {
        console.error('Failed to load product details', e);
    }
}

function renderProduct(product) {
    const container = document.getElementById('product-container');
    const colorFilters = ['hue-rotate(0deg)', 'hue-rotate(-80deg)', 'hue-rotate(150deg)', 'hue-rotate(180deg)', 'hue-rotate(220deg)'];
    const colorFilter = colorFilters[product.id % colorFilters.length];

    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const isWished = wishlist.includes(product.id.toString());
    const isCarted = cart.includes(product.id.toString());

    container.innerHTML = `
        <!-- Left: Large Image -->
        <div style="flex: 1; min-width: 300px; display: flex; justify-content: center; position: relative;">
            <div style="position: absolute; width: 300px; height: 300px; background: rgba(0, 243, 255, 0.1); filter: blur(80px); border-radius: 50%; z-index: -1;"></div>
            <img src="${product.image}" alt="${product.name}" style="max-width: 100%; height: 500px; object-fit: contain; filter: drop-shadow(0 20px 30px rgba(0,0,0,0.8)) ${colorFilter}; animation: float 6s infinite ease-in-out;">
        </div>

        <!-- Right: Details -->
        <div style="flex: 1; min-width: 300px; padding: 40px; background: rgba(0,0,0,0.4); border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); backdrop-filter: blur(15px);">
            <span style="color: #d4af37; font-size: 14px; letter-spacing: 3px; text-transform: uppercase; font-weight: 600;">${product.brand}</span>
            <h1 style="font-size: 48px; color: #fff; margin: 10px 0;">${product.name}</h1>
            <div style="display: flex; gap: 15px; margin-bottom: 25px; align-items: center;">
                <span style="font-size: 28px; color: #fff; font-weight: bold;">₹${product.price}</span>
                <span style="background: rgba(255,255,255,0.1); padding: 5px 15px; border-radius: 15px; color: var(--neon-cyan); font-size: 14px;">${product.ml}</span>
                <span style="background: rgba(212, 175, 55, 0.1); border: 1px solid rgba(212, 175, 55, 0.3); padding: 5px 15px; border-radius: 15px; color: #d4af37; font-size: 14px;">${product.category}</span>
            </div>

            <p style="color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                ${product.description}
            </p>

            <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 10px; margin-bottom: 30px;">
                <h4 style="color: #fff; margin-bottom: 15px; font-size: 16px; text-transform: uppercase; letter-spacing: 2px;">Fragrance Notes</h4>
                <div style="margin-bottom: 10px; font-size: 14px;">
                    <strong style="color: var(--neon-cyan); display: inline-block; width: 100px;">Top Notes:</strong> <span style="color: rgba(255,255,255,0.6);">${product.notes?.top || 'N/A'}</span>
                </div>
                <div style="margin-bottom: 10px; font-size: 14px;">
                    <strong style="color: var(--neon-cyan); display: inline-block; width: 100px;">Heart Notes:</strong> <span style="color: rgba(255,255,255,0.6);">${product.notes?.heart || 'N/A'}</span>
                </div>
                <div style="font-size: 14px;">
                    <strong style="color: var(--neon-cyan); display: inline-block; width: 100px;">Base Notes:</strong> <span style="color: rgba(255,255,255,0.6);">${product.notes?.base || 'N/A'}</span>
                </div>
            </div>

            <div style="display: flex; gap: 15px;">
                <button id="detail-cart-btn" onclick="toggleCartDetail('${product.id}')" style="flex: 1; padding: 15px; font-size: 16px; border: none; border-radius: 30px; background: ${isCarted ? '#d4af37' : 'linear-gradient(45deg, var(--neon-cyan), #00b4d8)'}; color: ${isCarted ? '#000' : '#fff'}; font-weight: bold; cursor: pointer; transition: 0.3s; box-shadow: 0 0 20px ${isCarted ? 'rgba(212,175,55,0.3)' : 'rgba(0, 243, 255, 0.3)'};">
                    ${isCarted ? 'Added to Cart 🛒' : 'Add to Cart 🛒'}
                </button>
                <button id="detail-wish-btn" onclick="toggleWishDetail('${product.id}')" style="padding: 15px 20px; font-size: 20px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); border-radius: 30px; cursor: pointer; transition: 0.3s; color: ${isWished ? '#d4af37' : '#fff'};">
                    ${isWished ? '✨' : '☆'}
                </button>
            </div>
        </div>
    `;
}

window.toggleCartDetail = function(id) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const btn = document.getElementById('detail-cart-btn');
    if (cart.includes(id)) {
        btn.innerHTML = 'Add to Cart 🛒';
        btn.style.background = 'linear-gradient(45deg, var(--neon-cyan), #00b4d8)';
        btn.style.color = '#fff';
        btn.style.boxShadow = '0 0 20px rgba(0, 243, 255, 0.3)';
        localStorage.setItem('cart', JSON.stringify(cart));
        openCart(); // Already in cart, just open it
    } else {
        cart.push(id);
        btn.innerHTML = 'Added to Cart 🛒';
        btn.style.background = '#d4af37';
        btn.style.color = '#000';
        btn.style.boxShadow = '0 0 20px rgba(212,175,55,0.3)';
        if (typeof showToast === 'function') showToast('Item added to cart! 🛒');
        localStorage.setItem('cart', JSON.stringify(cart));
        openCart();
    }
};

window.toggleWishDetail = function(id) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const btn = document.getElementById('detail-wish-btn');
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

window.submitReview = function(e) {
    e.preventDefault();
    const name = document.getElementById('rev-name').value;
    const ratingVal = document.getElementById('rev-rating').value;
    const text = document.getElementById('rev-text').value;

    let stars = "";
    if (ratingVal == "5") stars = "★★★★★";
    else if (ratingVal == "4") stars = "★★★★☆";
    else if (ratingVal == "3") stars = "★★★☆☆";
    else if (ratingVal == "2") stars = "★★☆☆☆";
    else if (ratingVal == "1") stars = "★☆☆☆☆";
    else stars = "☆☆☆☆☆";

    const prodImage = window.currentProduct ? window.currentProduct.image : '../assets/images/hero.png';
    const prodName = window.currentProduct ? window.currentProduct.name : 'AuraSpace Perfume';

    const newReview = { name, role: '', stars, text, date: new Date().toISOString(), prodImage, prodName };
    
    let userReviews = JSON.parse(localStorage.getItem('user_reviews') || '[]');
    userReviews.push(newReview);
    localStorage.setItem('user_reviews', JSON.stringify(userReviews));

    // Update UI instantly
    const list = document.getElementById('product-reviews-list');
    if (list) {
        const newHtml = `
            <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <strong style="color: #fff; font-size: 16px;">${name}</strong>
                    <span style="color: #d4af37;">${stars}</span>
                </div>

                <p style="color: rgba(255,255,255,0.6); font-size: 14px; font-style: italic; line-height: 1.5;">"${text}"</p>
                <div style="margin-top: 15px; text-align: left;">
                    <img src="${prodImage}" style="width: 40px; height: 40px; object-fit: contain; filter: drop-shadow(0 5px 10px rgba(0,0,0,0.5));">
                    <span style="display: inline-block; font-size: 12px; color: var(--neon-cyan); margin-left: 10px; vertical-align: middle;">${prodName}</span>
                </div>
            </div>
        `;
        list.insertAdjacentHTML('beforeend', newHtml);
    }

    // Reset and hide form
    document.getElementById('review-form').reset();
    document.getElementById('review-form-container').style.display = 'none';
    const btn = document.getElementById('btn-show-review');
    btn.style.display = 'block';
    btn.innerHTML = 'Review Submitted! Write Another?';
    if (typeof showToast === 'function') showToast('Review submitted successfully! ⭐');
};
