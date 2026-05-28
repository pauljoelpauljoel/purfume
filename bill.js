document.addEventListener('DOMContentLoaded', () => {
    // Hide loader
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }, 500);

    renderBill();
});

async function renderBill() {
    const orderDetails = JSON.parse(localStorage.getItem('order_details'));
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const total = localStorage.getItem('checkout_total') || '0.00';

    if (!orderDetails || cart.length === 0) {
        window.location.href = 'index.php'; // Redirect if accessed improperly
        return;
    }

    // Populate Order Details
    document.getElementById('bill-date').innerText = orderDetails.date;
    document.getElementById('bill-method').innerText = 'Payment: ' + orderDetails.payment;
    
    const randomId = Math.floor(Math.random() * 900000) + 100000;
    document.getElementById('bill-id').innerText = `Order ID: AS-${randomId}`;

    document.getElementById('bill-address').innerHTML = `
        <strong style="color: #fff;">${orderDetails.fname} ${orderDetails.lname}</strong><br>
        ${orderDetails.address}<br>
        Phone: ${orderDetails.phone}
    `;
    
    document.getElementById('bill-total').innerText = '₹' + total;

    try {
        const res = await fetch('data/products.json');
        const allProducts = await res.json();
        
        let html = '';
        
        cart.forEach(id => {
            const product = allProducts.find(p => p.id == id);
            if(product) {
                html += `
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 15px;">
                        <div style="display: flex; gap: 15px; align-items: center;">
                            <img src="${product.image}" style="width: 40px; height: 40px; object-fit: contain;">
                            <div>
                                <span style="color: #fff; font-size: 14px; display: block;">${product.name}</span>
                                <span style="color: rgba(255,255,255,0.5); font-size: 12px;">${product.category} • ${product.ml}</span>
                            </div>
                        </div>
                        <span style="color: #d4af37; font-weight: bold;">₹${product.price}</span>
                    </div>
                `;
            }
        });
        
        document.getElementById('bill-items').innerHTML = html;
        
    } catch(e) {
        console.error(e);
    }
}

window.clearCartAndHome = function() {
    localStorage.removeItem('cart');
    localStorage.removeItem('checkout_total');
    localStorage.removeItem('order_details');
    window.location.href = 'index.php';
};
