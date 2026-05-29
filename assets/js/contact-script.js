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
            
            const payload = {
                name: document.getElementById('c-name').value,
                email: document.getElementById('c-email').value,
                subject: document.getElementById('c-subject').value,
                message: document.getElementById('c-message').value
            };
            
            let type = 'contacts';
            if (payload.subject.toLowerCase().includes('complaint') || payload.message.toLowerCase().includes('complaint')) {
                type = 'complaints';
            }

            fetch('api_store.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: type, payload: payload })
            }).then(res => res.json()).then(data => {
                setTimeout(() => {
                    btn.innerText = "Signal Received Successfully";
                    btn.style.background = "#00ff88";
                    btn.style.borderColor = "#00ff88";
                    form.reset();
                    if (typeof showToast === 'function') showToast("Form submitted successfully!");
                    
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.style.background = "transparent";
                        btn.style.borderColor = "#00f3ff";
                        btn.style.color = "#00f3ff";
                    }, 3000);
                }, 1500);
            }).catch(err => {
                btn.innerText = "Transmission Failed";
                btn.style.background = "#ff3333";
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = "transparent";
                }, 3000);
            });
        });
    }
});
