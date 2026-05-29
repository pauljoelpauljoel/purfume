document.addEventListener('DOMContentLoaded', () => {
    // Hide loader
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }, 1000);

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        fetchProduct(productId);
    } else {
        // Fallback if no ID provided
        document.getElementById('detail-name').innerText = "Product Not Found";
    }
});

async function fetchProduct(id) {
    try {
        const res = await fetch('../theme_json/products.json?v=' + new Date().getTime());
        const products = await res.json();
        
        const product = products.find(p => p.id == id);
        
        if (product) {
            document.getElementById('detail-image').src = product.image;
            document.getElementById('detail-brand').innerText = product.brand;
            document.getElementById('detail-name').innerText = product.name;
            document.getElementById('detail-rating').innerText = product.rating;
            document.getElementById('detail-price').innerText = "$" + product.price;
            document.getElementById('detail-desc').innerText = product.description;
        } else {
            document.getElementById('detail-name').innerText = "Product Not Found";
        }
    } catch (e) {
        console.error('Failed to load product', e);
    }
}
