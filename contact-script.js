document.addEventListener('DOMContentLoaded', () => {
    // Hide loader
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }, 1000);

    const form = document.getElementById('lunar-contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "Transmitting...";
            btn.style.background = "#00f3ff";
            btn.style.color = "#000";
            
            setTimeout(() => {
                btn.innerText = "Signal Received Successfully";
                btn.style.background = "#00ff88";
                btn.style.borderColor = "#00ff88";
                form.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = "transparent";
                    btn.style.borderColor = "#00f3ff";
                    btn.style.color = "#00f3ff";
                }, 3000);
            }, 1500);
        });
    }
});
