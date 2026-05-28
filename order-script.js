document.addEventListener('DOMContentLoaded', () => {
    // Hide loader
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }, 1000);

    const form = document.getElementById('space-checkout-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = form.querySelector('.submit-btn');
            btn.innerText = "Processing Galactic Credits...";
            btn.style.opacity = '0.7';
            
            // Get values
            const name = document.getElementById('o-name').value;
            const address = document.getElementById('o-address').value;
            const planet = document.getElementById('o-planet').value;
            
            setTimeout(() => {
                // Hide form, show bill
                document.getElementById('order-form-container').classList.add('hidden');
                
                // Populate bill
                const randomId = Math.floor(Math.random() * 90000) + 10000;
                document.getElementById('bill-id').innerText = `AS-${randomId}`;
                document.getElementById('bill-name').innerText = name;
                document.getElementById('bill-address').innerText = address;
                document.getElementById('bill-planet').innerText = planet;
                
                // Show bill
                document.getElementById('success-bill').classList.remove('hidden');
                
            }, 2000);
        });
    }
});
