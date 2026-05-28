// ─── AI PERFUME QUIZ LOGIC ──────────────────────────────────────────────────

const aiQuestions = [
    {
        question: "1. When will you be wearing this most?",
        options: [
            { text: "Daytime (Fresh, bright)", categoryPref: "Fresh" },
            { text: "Nighttime (Dark, alluring)", categoryPref: "Oriental" }
        ]
    },
    {
        question: "2. Do you sweat a lot?",
        options: [
            { text: "Yes, quite heavily", categoryPref: "Citrus" }, // Citrus/Fresh cuts through sweat well
            { text: "Normal amount", categoryPref: "Woody" },
            { text: "Not much at all", categoryPref: "Leather" }
        ]
    },
    {
        question: "3. What vibe do you prefer?",
        options: [
            { text: "Fresh & Energetic", categoryPref: "Fresh" },
            { text: "Dark & Mysterious", categoryPref: "Oriental" },
            { text: "Classy & Elegant", categoryPref: "Woody" }
        ]
    },
    {
        question: "4. Required longevity?",
        options: [
            { text: "4-6 Hours is fine", categoryPref: "Citrus" },
            { text: "8+ Hours", categoryPref: "Woody" },
            { text: "All Day & Night", categoryPref: "Amber" }
        ]
    },
    {
        question: "5. Preferred base notes?",
        options: [
            { text: "Citrus / Aquatic", categoryPref: "Fresh" },
            { text: "Leather / Smoke", categoryPref: "Leather" },
            { text: "Oud / Amber", categoryPref: "Amber" }
        ]
    }
];

let currentQuestionIndex = 0;
let userPreferences = [];

function startAiQuiz() {
    document.getElementById('ai-quiz-intro').style.display = 'none';
    currentQuestionIndex = 0;
    userPreferences = [];
    
    const content = document.getElementById('ai-quiz-content');
    content.style.display = 'block';
    setTimeout(() => {
        content.style.opacity = '1';
        loadQuestion(currentQuestionIndex);
    }, 50);
}

function loadQuestion(index) {
    const q = aiQuestions[index];
    document.getElementById('ai-question-title').innerText = q.question;
    
    const optionsContainer = document.getElementById('ai-options-container');
    optionsContainer.innerHTML = '';
    
    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'ai-option-btn';
        btn.innerText = opt.text;
        btn.onclick = () => selectOption(opt.categoryPref);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(categoryPref) {
    userPreferences.push(categoryPref);
    
    currentQuestionIndex++;
    if (currentQuestionIndex < aiQuestions.length) {
        // Fade out slightly, load next, fade in
        const content = document.getElementById('ai-quiz-content');
        content.style.opacity = '0';
        setTimeout(() => {
            loadQuestion(currentQuestionIndex);
            content.style.opacity = '1';
        }, 300);
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    document.getElementById('ai-quiz-content').style.display = 'none';
    document.getElementById('ai-quiz-content').style.opacity = '0';
    
    const analyzing = document.getElementById('ai-analyzing');
    analyzing.style.display = 'block';
    setTimeout(() => analyzing.style.opacity = '1', 50);
    
    // Simulate AI thinking time
    setTimeout(() => {
        analyzing.style.opacity = '0';
        setTimeout(() => {
            analyzing.style.display = 'none';
            calculateRecommendation();
        }, 500);
    }, 2500);
}

function calculateRecommendation() {
    // Find the most frequent category preference
    const freq = {};
    let maxFreq = 0;
    let bestCategory = "Fresh"; // fallback
    
    userPreferences.forEach(pref => {
        freq[pref] = (freq[pref] || 0) + 1;
        if (freq[pref] > maxFreq) {
            maxFreq = freq[pref];
            bestCategory = pref;
        }
    });

    // We fetch products from allProducts (from collection.js)
    if (typeof allProducts === 'undefined' || allProducts.length === 0) {
        // Fallback fetch if somehow not loaded
        fetch('data/products.json').then(res => res.json()).then(data => displayResult(data, bestCategory));
    } else {
        displayResult(allProducts, bestCategory);
    }
}

function displayResult(products, bestCategory) {
    let matches = products.filter(p => p.category === bestCategory);
    if (matches.length === 0) matches = products; // fallback to all
    
    // Pick a random match from the best category
    const recommended = matches[Math.floor(Math.random() * matches.length)];
    
    const container = document.getElementById('ai-recommended-product');
    
    // Check if in cart/wishlist
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const isWished = wishlist.includes(recommended.id.toString());
    const isCarted = cart.includes(recommended.id.toString());

    container.innerHTML = `
        <div class="product-card glass-card" style="position: relative; max-width: 300px; margin: 0 auto;">
            <button onclick="toggleWishlist('${recommended.id}', this)" style="position: absolute; top: 15px; right: 15px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); width: 35px; height: 35px; border-radius: 50%; cursor: pointer; color: ${isWished ? '#d4af37' : '#fff'}; transition: 0.3s; z-index: 10;">
                ${isWished ? '✨' : '☆'}
            </button>
            <a href="product.php?id=${recommended.id}" class="product-image-container" style="display: block; text-decoration: none; height: 200px; padding: 20px;">
                <img src="${recommended.image}" style="max-height: 100%; object-fit: contain; filter: drop-shadow(0 10px 15px rgba(0,0,0,0.5));">
            </a>
            <div style="margin-top: 15px;">
                <p style="font-size: 12px; color: var(--neon-cyan); letter-spacing: 2px; text-transform: uppercase;">${recommended.category}</p>
                <h3 style="font-size: 18px; color: #fff; margin-bottom: 5px;">${recommended.name}</h3>
                <p style="font-size: 16px; color: #d4af37; margin-bottom: 15px;">₹${recommended.price}</p>
                <button onclick="toggleCart('${recommended.id}', this)" class="btn-primary" style="padding: 8px 15px; font-size: 13px; background: ${isCarted ? '#d4af37' : 'transparent'}; color: ${isCarted ? '#000' : 'var(--neon-cyan)'}; border-radius: 20px;">
                    ${isCarted ? 'In Cart 🛒' : 'Add to Cart'}
                </button>
            </div>
        </div>
    `;
    
    const resultDiv = document.getElementById('ai-result');
    resultDiv.style.display = 'block';
    setTimeout(() => resultDiv.style.opacity = '1', 50);
}

function restartAiQuiz() {
    document.getElementById('ai-result').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('ai-result').style.display = 'none';
        startAiQuiz();
    }, 500);
}
