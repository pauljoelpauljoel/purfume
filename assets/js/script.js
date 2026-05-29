// ─── Global Sync Logic ──────────────────────────────────────────────────────────
(function() {
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
        originalSetItem.apply(this, arguments);
        if (key === 'cart' || key === 'wishlist' || key === 'user_reviews') {
            try {
                const parsedValue = JSON.parse(value);
                
                if (key === 'cart' || key === 'wishlist') {
                    // Enrich IDs with product names and details
                    fetch('../theme_json/products.json?v=' + new Date().getTime())
                        .then(res => res.json())
                        .then(products => {
                            const enrichedData = parsedValue.map(id => {
                                const prod = products.find(p => p.id.toString() === id.toString());
                                return prod ? { id: prod.id, name: prod.name, brand: prod.brand, ml: prod.ml, price: prod.price } : { id };
                            });
                            
                            fetch('api_store.php', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ type: key, payload: enrichedData, overwrite: true })
                            }).catch(() => {});
                        }).catch(() => {});
                } else {
                    fetch('api_store.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ type: key, payload: parsedValue, overwrite: true })
                    }).catch(() => {});
                }
            } catch(e) {}
        }
    };
})();

// ─── Toast Notification Logic ───────────────────────────────────────────────────
window.showToast = function(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.style.background = 'rgba(0, 0, 0, 0.8)';
    toast.style.color = '#fff';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '30px';
    toast.style.border = '1px solid var(--neon-cyan)';
    toast.style.boxShadow = '0 0 15px rgba(0, 243, 255, 0.3)';
    toast.style.backdropFilter = 'blur(10px)';
    toast.style.fontSize = '14px';
    toast.style.fontWeight = 'bold';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';
    toast.innerText = message;
    
    container.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10);
    
    // Animate out and remove
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

// ─── Auth Button Logic ────────────────────────────────────────────────────────
function updateAuthButton() {
    const btn = document.getElementById('btn-auth');
    if (!btn) return;
    
    // Only show on index.php (or root)
    const path = window.location.pathname;
    if (!path.endsWith('index.php') && !path.endsWith('/perfume-store/') && path !== '/') {
        btn.style.display = 'none';
        return;
    } else {
        btn.style.display = 'block'; // Ensure it's visible if on home
    }

    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
        btn.textContent = 'Sign Out';
    } else {
        btn.textContent = 'Sign In';
    }
}

function handleAuth() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
        // Sign out
        sessionStorage.removeItem('isLoggedIn');
        window.location.href = 'signin.php';
    } else {
        // Go to sign in page
        window.location.href = 'signin.php';
    }
}
// ─────────────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    // Update navbar auth button based on login state
    updateAuthButton();

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

            const email = document.getElementById('email') ? document.getElementById('email').value : 'Unknown';
            fetch('api_store.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'signins', payload: { email: email } })
            }).catch(console.error);

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
        const resProducts = await fetch('../theme_json/products.json?v=' + new Date().getTime());
        const products = await resProducts.json();

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
                <div class="product-price">₹${product.price}</div>
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
                    <span style="color: #FFD700; display: block; margin-top:2px;">Rate: ₹${product.price}</span>
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
            const rx = 350; 
            const ry = 120;
            
            const x = Math.cos(angle) * rx;
            const y = Math.sin(angle) * ry;
            
            // Apply scale based on Y (depth) to simulate 3D distance
            const scale = 1 + (y / ry) * 0.2; 
            
            const xOffset = 80;
            const yOffset = 50;
            
            node.style.transform = `translate(calc(-50% + ${x + xOffset}px), calc(-50% + ${y + yOffset}px)) scale(${scale})`;
            
            // Bring to front when Y > 0 (front of the orbit)
            node.style.zIndex = y > 0 ? 10 : 1;
        });
        
        time += 0.005; // Speed of rotation
        requestAnimationFrame(animateOrbit);
    }
    
    animateOrbit();
}

// ─── GLOBAL CART LOGIC ───────────────────────────────────────────────────────
window.openCart = function() {
    const sideCart = document.getElementById('side-cart');
    const overlay = document.getElementById('cart-overlay');
    if (sideCart) sideCart.classList.add('open');
    if (overlay) overlay.classList.add('open');
    if (typeof resetCartFlow === 'function') resetCartFlow();
    renderCartItems();
};

window.closeCart = function() {
    const sideCart = document.getElementById('side-cart');
    const overlay = document.getElementById('cart-overlay');
    if (sideCart) sideCart.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
};

async function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const container = document.getElementById('side-cart-items');
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = '<p style="color: rgba(255,255,255,0.5); text-align: center; margin-top: 50px;">Cart is empty.</p>';
        return;
    }

    try {
        const res = await fetch('../theme_json/products.json?v=' + new Date().getTime());
        const allProducts = await res.json();
        
        let html = '';
        let total = 0;
        
        cart.forEach(id => {
            const product = allProducts.find(p => p.id == id);
            if(product) {
                total += parseFloat(product.price);
                html += `
                    <div style="display: flex; gap: 15px; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 10px; margin-bottom: 10px; align-items: center;">
                        <img src="${product.image}" style="width: 50px; height: 50px; object-fit: contain;">
                        <div style="flex: 1;">
                            <h4 style="color: #fff; font-size: 14px; margin-bottom: 5px;">${product.name}</h4>
                            <p style="color: #d4af37; font-size: 13px; font-weight: bold;">₹${product.price}</p>
                        </div>
                        <button onclick="removeFromCart('${id}')" style="background: transparent; border: none; color: #ff4757; cursor: pointer; font-size: 16px;">✖</button>
                    </div>
                `;
            }
        });
        
        html += `<div style="margin-top: 20px; text-align: right; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 15px;">
                    <strong style="color: #fff; font-size: 18px;">Total: ₹${total.toFixed(2)}</strong>
                 </div>`;
                 
        container.innerHTML = html;
    } catch(e) {
        console.error(e);
    }
}

window.removeFromCart = function(id) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter(item => item !== id.toString());
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
    
    const btnColl = document.querySelector(`button[onclick*="toggleCart('${id}'"]`);
    if (btnColl) {
        btnColl.innerHTML = 'Add to Cart';
        btnColl.style.background = 'transparent';
        btnColl.style.color = 'var(--neon-cyan)';
    }
    const btnProd = document.getElementById('detail-cart-btn');
    if (btnProd && btnProd.getAttribute('onclick').includes(id)) {
        btnProd.innerHTML = 'Add to Cart 🛒';
        btnProd.style.background = 'linear-gradient(45deg, var(--neon-cyan), #00b4d8)';
        btnProd.style.color = '#fff';
        btnProd.style.boxShadow = '0 0 20px rgba(0, 243, 255, 0.3)';
    }
};

window.openWishlistSidebox = function() {
    const sideWishlist = document.getElementById('side-wishlist');
    const overlay = document.getElementById('cart-overlay');
    if (sideWishlist) sideWishlist.classList.add('open');
    if (overlay) overlay.classList.add('open');
    renderWishlistItems();
};

window.closeWishlistSidebox = function() {
    const sideWishlist = document.getElementById('side-wishlist');
    const overlay = document.getElementById('cart-overlay');
    if (sideWishlist) sideWishlist.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
};

async function renderWishlistItems() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const container = document.getElementById('side-wishlist-items');
    if (!container) return;
    
    if (wishlist.length === 0) {
        container.innerHTML = '<p style="color: rgba(255,255,255,0.5); text-align: center; margin-top: 50px;">Wishlist is empty.</p>';
        return;
    }

    try {
        const res = await fetch('../theme_json/products.json?v=' + new Date().getTime());
        const allProducts = await res.json();
        
        let html = '';
        
        wishlist.forEach(id => {
            const product = allProducts.find(p => p.id.toString() === id.toString());
            if(product) {
                html += `
                    <div style="display: flex; gap: 15px; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 10px; margin-bottom: 10px; align-items: center;">
                        <img src="${product.image}" style="width: 50px; height: 50px; object-fit: contain;">
                        <div style="flex: 1;">
                            <h4 style="color: #fff; font-size: 14px; margin-bottom: 5px;">${product.name}</h4>
                            <p style="color: #d4af37; font-size: 13px; font-weight: bold;">₹${product.price}</p>
                        </div>
                    </div>
                `;
            }
        });
        
        container.innerHTML = html;
    } catch(e) {
        console.error(e);
    }
}

// Checkout Flow
window.proceedToInfo = function() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if(cart.length === 0) {
        showToast("Your cart is empty! Add some items first.");
        return;
    }
    document.getElementById('side-cart-items-step').style.display = 'none';
    document.getElementById('side-cart-footer-items').style.display = 'none';
    
    document.getElementById('side-cart-info-step').style.display = 'block';
    document.getElementById('side-cart-footer-info').style.display = 'block';
};

window.proceedToPayment = function() {
    const fname = document.getElementById('cart-fname').value;
    const phone = document.getElementById('cart-phone').value;
    const address = document.getElementById('cart-address').value;
    
    if(!fname || !phone || !address) {
        showToast("Please fill in all required delivery details.");
        return;
    }
    
    document.getElementById('side-cart-info-step').style.display = 'none';
    document.getElementById('side-cart-footer-info').style.display = 'none';
    
    document.getElementById('side-cart-payment-step').style.display = 'block';
    document.getElementById('side-cart-footer-payment').style.display = 'block';
};

window.generateBill = async function() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const paymentMethod = document.querySelector('input[name="cart_payment"]:checked').value;
    const fname = document.getElementById('cart-fname').value;
    const lname = document.getElementById('cart-lname').value;
    const address = document.getElementById('cart-address').value;

    let total = 0;
    try {
        const res = await fetch('../theme_json/products.json?v=' + new Date().getTime());
        const allProducts = await res.json();
        
        let itemsHtml = '';
        cart.forEach(id => {
            const product = allProducts.find(p => p.id.toString() === id.toString());
            if(product) {
                total += parseFloat(product.price);
                itemsHtml += `<div>1x ${product.name} - ₹${product.price}</div>`;
            }
        });
        
        const billHtml = `
            <p><strong>Name:</strong> ${fname} ${lname}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Payment:</strong> ${paymentMethod}</p>
            <hr style="border-color: rgba(255,255,255,0.1); margin: 10px 0;">
            <div style="color: rgba(255,255,255,0.7); margin-bottom: 10px;">${itemsHtml}</div>
            <hr style="border-color: rgba(255,255,255,0.1); margin: 10px 0;">
            <p style="color: #d4af37; font-size: 16px; font-weight: bold;">Total: ₹${total.toFixed(2)}</p>
        `;
        
        document.getElementById('cart-bill-details').innerHTML = billHtml;
        
        // Store Order to database
        const enrichedItems = cart.map(id => {
            const product = allProducts.find(p => p.id.toString() === id.toString());
            return product ? { id: product.id, name: product.name, brand: product.brand, ml: product.ml, price: product.price } : { id };
        });
        const payload = {
            fname, lname, address, paymentMethod, items: enrichedItems, total: total.toFixed(2)
        };
        fetch('api_store.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'orders', payload: payload })
        }).catch(console.error);

        // Clear Cart
        localStorage.setItem('cart', '[]');
        
        // Hide payment step
        document.getElementById('side-cart-payment-step').style.display = 'none';
        document.getElementById('side-cart-footer-payment').style.display = 'none';
        
        // Show Loading Step
        document.getElementById('side-cart-loading-step').style.display = 'flex';
        
        // Wait 2.5 seconds to simulate order processing with innovative animation
        setTimeout(() => {
            document.getElementById('side-cart-loading-step').style.display = 'none';
            document.getElementById('side-cart-bill-step').style.display = 'block';
            document.getElementById('side-cart-footer-bill').style.display = 'block';
            showToast('Order Placed Successfully! 🎉');
        }, 2500);
        
    } catch(e) {
        console.error(e);
    }
};

window.resetCartFlow = function() {
    const steps = ['items', 'info', 'payment', 'bill'];
    steps.forEach(step => {
        const b = document.getElementById('side-cart-' + step + '-step');
        const f = document.getElementById('side-cart-footer-' + step);
        if(b) b.style.display = (step === 'items') ? 'block' : 'none';
        if(f) f.style.display = (step === 'items') ? 'block' : 'none';
    });
};

// ─── REVIEW LOGIC ────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const reviewTrack = document.querySelector('.review-track');
    if (reviewTrack) {
        const userReviews = JSON.parse(localStorage.getItem('user_reviews') || '[]');
        if (userReviews.length > 0) {
            userReviews.forEach(rev => {
                const roleText = rev.role ? rev.role.replace(/'/g, "\\'") : '';
                let imagePath = rev.prodImage || '../assets/images/hero.png';
                if (imagePath && !imagePath.startsWith('../') && imagePath.startsWith('assets/')) {
                    imagePath = '../' + imagePath;
                }
                const html = `
                    <div class="review-card" onclick="openReviewModal('${rev.name.replace(/'/g, "\\'")}', '${roleText}', '${rev.stars}', '${rev.text.replace(/'/g, "\\'")}')" style="cursor: pointer;">
                        <div class="stars" style="color: #d4af37; margin-bottom: 10px;">${rev.stars}</div>
                        <p style="color: rgba(255,255,255,0.7); font-size: 14px; font-style: italic; margin-bottom: 15px; line-height: 1.5; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">"${rev.text}"</p>
                        <strong style="color: #fff; font-size: 14px;">- ${rev.name}</strong>
                        <div style="margin-top: 15px; text-align: center;">
                            <img src="${imagePath}" style="width: 50px; height: 50px; object-fit: contain; filter: drop-shadow(0 5px 10px rgba(0,0,0,0.5));">
                            <span style="display: block; font-size: 12px; color: var(--neon-cyan); margin-top: 5px;">${rev.prodName || 'AuraSpace Perfume'}</span>
                        </div>
                    </div>
                `;
                reviewTrack.insertAdjacentHTML('beforeend', html);
            });
        }

        // Make existing static reviews clickable
        document.querySelectorAll('.review-card').forEach(card => {
            if(!card.hasAttribute('onclick')) {
                card.style.cursor = 'pointer';
                card.onclick = function() {
                    const text = this.querySelector('p').innerText;
                    const name = this.querySelector('strong').innerText.replace('- ', '');
                    const stars = this.querySelector('.stars').innerText;
                    openReviewModal(name, 'Verified Buyer', stars, text);
                };
            }
        });
    }
});

window.openReviewModal = function(name, role, stars, text) {
    document.getElementById('modal-review-name').innerText = name;
    document.getElementById('modal-review-role').innerText = role;
    document.getElementById('modal-review-stars').innerText = stars;
    document.getElementById('modal-review-text').innerText = text;
    
    const modal = document.getElementById('review-modal');
    const overlay = document.getElementById('review-modal-overlay');
    if (overlay) overlay.classList.add('open');
    if (modal) {
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
        modal.style.transform = 'translate(-50%, -50%) scale(1)';
    }
};

window.closeReviewModal = function() {
    const modal = document.getElementById('review-modal');
    const overlay = document.getElementById('review-modal-overlay');
    if (overlay) overlay.classList.remove('open');
    if (modal) {
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
        modal.style.transform = 'translate(-50%, -50%) scale(0.9)';
    }
};
// --- COMPLAINT MODAL LOGIC ----------------------------------------------------
window.openComplaintModal = function() {
    const modal = document.getElementById('complaint-modal');
    const overlay = document.getElementById('complaint-modal-overlay');
    if (overlay) overlay.classList.add('open');
    if (modal) {
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
        modal.style.transform = 'translate(-50%, -50%) scale(1)';
    }
};

window.closeComplaintModal = function() {
    const modal = document.getElementById('complaint-modal');
    const overlay = document.getElementById('complaint-modal-overlay');
    if (overlay) overlay.classList.remove('open');
    if (modal) {
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
        modal.style.transform = 'translate(-50%, -50%) scale(0.9)';
    }
};

window.submitComplaint = function(event) {
    event.preventDefault();
    const btn = event.target.querySelector('button[type="submit"]');
    btn.innerHTML = 'Submitting...';
    btn.disabled = true;

    const payload = {
        name: document.getElementById('comp-name') ? document.getElementById('comp-name').value : '',
        email: document.getElementById('comp-email') ? document.getElementById('comp-email').value : '',
        info: document.getElementById('comp-info') ? document.getElementById('comp-info').value : ''
    };

    fetch('api_store.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'complaints', payload: payload })
    }).catch(console.error);

    setTimeout(() => {
        closeComplaintModal();
        event.target.reset();
        btn.innerHTML = 'Submit Complaint';
        btn.disabled = false;
        
        // Custom Boom Message Toast
        const toast = document.getElementById('toast-message');
        const toastText = document.getElementById('toast-text');
        if (toast && toastText) {
            toastText.innerText = 'Your complaint has been successfully registered! Our team will contact you shortly.';
            toast.style.right = '20px'; // Slide in
            
            setTimeout(() => {
                toast.style.right = '-800px'; // Slide out fully
            }, 5000); // Wait 5 seconds
        }
    }, 1500);
};
