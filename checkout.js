document.addEventListener('DOMContentLoaded', () => {
    // Hide loader
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }, 500);

    renderCheckoutItems();
});

function togglePaymentUI() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const upiUI = document.getElementById('upi-ui');
    const btnPlaceOrder = document.getElementById('btn-place-order');

    if (paymentMethod === 'UPI') {
        upiUI.style.display = 'block';
        btnPlaceOrder.innerText = 'Verify & Place Order';
    } else {
        upiUI.style.display = 'none';
        btnPlaceOrder.innerText = 'Place Order (COD)';
    }
}

async function renderCheckoutItems() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const container = document.getElementById('checkout-items');
    
    if (cart.length === 0) {
        container.innerHTML = '<p style="color: rgba(255,255,255,0.5);">Your cart is empty.</p>';
        document.getElementById('btn-place-order').disabled = true;
        document.getElementById('btn-place-order').style.opacity = '0.5';
        return;
    }

    try {
        const res = await fetch('data/products.json');
        const allProducts = await res.json();
        
        let html = '';
        let total = 0;
        
        cart.forEach(id => {
            const product = allProducts.find(p => p.id == id);
            if(product) {
                total += parseFloat(product.price);
                html += `
                    <div style="display: flex; gap: 15px; margin-bottom: 15px; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 15px;">
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
        document.getElementById('chk-subtotal').innerText = '₹' + total.toFixed(2);
        document.getElementById('chk-total').innerText = '₹' + total.toFixed(2);
        
        // Save total to localStorage for the bill page
        localStorage.setItem('checkout_total', total.toFixed(2));
    } catch(e) {
        console.error(e);
    }
}

window.processCheckout = function(e) {
    e.preventDefault();
    
    const btn = document.getElementById('btn-place-order');
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    // Save details
    const orderDetails = {
        fname: document.getElementById('chk-fname').value,
        lname: document.getElementById('chk-lname').value,
        phone: document.getElementById('chk-phone').value,
        address: document.getElementById('chk-address').value,
        payment: paymentMethod,
        date: new Date().toLocaleString()
    };
    localStorage.setItem('order_details', JSON.stringify(orderDetails));
    
    if (paymentMethod === 'UPI') {
        btn.innerText = 'Authenticating UPI PIN...';
        btn.style.opacity = '0.8';
        
        setTimeout(() => {
            btn.innerText = 'Payment Verified! Redirecting...';
            btn.style.background = '#2ed573';
            btn.style.color = '#fff';
            setTimeout(() => {
                window.location.href = 'bill.php';
            }, 1000);
        }, 2000);
    } else {
        btn.innerText = 'Processing Order...';
        btn.style.opacity = '0.8';
        setTimeout(() => {
            window.location.href = 'bill.php';
        }, 1500);
    }
};
