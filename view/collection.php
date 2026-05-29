<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Collections | AuraSpace</title>
    <link rel="stylesheet" href="../assets/css/style.css?v=7">
    <style>
        .shooting-stars-bg {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            z-index: -1;
            overflow: hidden;
            pointer-events: none;
        }

        .star {
            position: absolute;
            width: 2px;
            height: 2px;
            background: #fff;
            border-radius: 50%;
            box-shadow: 0 0 10px #fff, 0 0 20px #fff;
            opacity: 0;
            animation: shooting 4s linear infinite;
        }

        .star::before {
            content: '';
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 100px;
            height: 1px;
            background: linear-gradient(90deg, rgba(255,255,255,0.8), transparent);
        }

        /* Randomize Star Positions & Delays via nth-child */
        .star:nth-child(1) { top: 10%; left: -10%; animation-delay: 0s; }
        .star:nth-child(2) { top: 30%; left: -10%; animation-delay: 1.5s; }
        .star:nth-child(3) { top: 50%; left: -10%; animation-delay: 3s; }
        .star:nth-child(4) { top: 70%; left: -10%; animation-delay: 0.8s; }
        .star:nth-child(5) { top: 20%; left: -10%; animation-delay: 2.2s; }
        .star:nth-child(6) { top: 80%; left: -10%; animation-delay: 4.5s; }
        .star:nth-child(7) { top: 40%; left: -10%; animation-delay: 1.1s; }
        .star:nth-child(8) { top: 60%; left: -10%; animation-delay: 3.7s; }
        .star:nth-child(9) { top: 90%; left: -10%; animation-delay: 0.5s; }
        .star:nth-child(10) { top: 15%; left: -10%; animation-delay: 2.8s; }

        @keyframes shooting {
            0% { transform: translateX(0) translateY(0) rotate(20deg); opacity: 1; }
            100% { transform: translateX(120vw) translateY(40vw) rotate(20deg); opacity: 0; }
        }
    </style>
</head>
<body>
    
    <!-- Cinematic Entry Loader -->
    <div id="loader" class="loader-overlay">
        <div class="loader-spinner"></div>
    </div>

    <!-- Navigation -->
    <?php include '../common/header.php'; ?>

    <!-- Deep Space Background (Shooting Stars) -->
    <div class="shooting-stars-bg">
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
    </div>

    <section class="section" style="padding-top: 150px; min-height: 100vh;">
        <div style="text-align: center; margin-bottom: 50px;">
            <h1 class="text-gradient" style="font-size: 42px; margin-bottom: 10px;">Our Collections</h1>
            <p style="color: var(--text-muted); font-size: 18px;">Discover the most premium fragrances in the universe.</p>
        </div>

        <!-- Filter Bar -->
        <div class="filter-bar" style="max-width: 1200px; margin: 0 auto 50px auto; background: rgba(255,255,255,0.02); backdrop-filter: blur(10px); padding: 25px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; gap: 20px;">
            
            <!-- Animated Category Buttons -->
            <div class="category-filters" style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
                <button class="filter-btn active" data-filter="all">All Categories</button>
                <button class="filter-btn" data-filter="Fresh">Fresh</button>
                <button class="filter-btn" data-filter="Woody">Woody</button>
                <button class="filter-btn" data-filter="Oriental">Oriental</button>
                <button class="filter-btn" data-filter="Citrus">Citrus</button>
                <button class="filter-btn" data-filter="Leather">Leather</button>
                <button class="filter-btn" data-filter="Amber">Amber</button>
            </div>

            <div style="display: flex; gap: 15px; flex-wrap: wrap; align-items: center; justify-content: center; width: 100%;">
                <select id="filter-brand" class="filter-select" style="background: rgba(0,0,0,0.6); color: rgba(255,255,255,0.8); border: 1px solid rgba(0, 243, 255, 0.2); padding: 10px 20px; border-radius: 25px; outline: none; transition: 0.3s; cursor: pointer;">
                    <option value="all">All Brands</option>
                    <option value="Aura">Aura</option>
                    <option value="Lumina">Lumina</option>
                    <option value="Quantum">Quantum</option>
                    <option value="Vortex">Vortex</option>
                    <option value="Zephyr">Zephyr</option>
                    <option value="Nova">Nova</option>
                    <option value="Eon">Eon</option>
                    <option value="Obsidian">Obsidian</option>
                </select>

                <select id="filter-volume" class="filter-select" style="background: rgba(0,0,0,0.6); color: rgba(255,255,255,0.8); border: 1px solid rgba(0, 243, 255, 0.2); padding: 10px 20px; border-radius: 25px; outline: none; transition: 0.3s; cursor: pointer;">
                    <option value="all">All Volumes</option>
                    <option value="50ml">50 ML</option>
                    <option value="100ml">100 ML</option>
                    <option value="150ml">150 ML</option>
                    <option value="200ml">200 ML</option>
                </select>

                <!-- Search Bar -->
                <div class="search-container" style="margin-left: auto;">
                    <input type="text" id="collection-search" placeholder="Search by name..." 
                           style="width: 250px; padding: 10px 20px; border-radius: 25px; border: 1px solid rgba(0, 243, 255, 0.4); background: rgba(0, 0, 0, 0.5); color: #fff; font-size: 15px; outline: none; transition: 0.3s;">
                </div>
            </div>
        </div>

        <div class="products-grid" id="collection-grid" style="max-width: 1200px; margin: 0 auto;">
            <!-- Products will be generated here by JS -->
        </div>
    </section>

    <!-- ─── CUSTOMIZE AI PERFUME ────────────────────────────────────────── -->
    <section id="ai-quiz-section" style="padding: 80px 20px; text-align: center; background: rgba(0,0,0,0.4); border-top: 1px solid rgba(0, 243, 255, 0.1); position: relative; z-index: 10;">
        <h2 style="color: #d4af37; font-size: 36px; margin-bottom: 10px; font-weight: 300; letter-spacing: 2px;">Customize AI Perfume <span style="font-size: 24px;">✨</span></h2>
        <p style="color: rgba(255,255,255,0.7); font-size: 16px; margin-bottom: 40px;">Answer a few questions to let our AI engineer the perfect fragrance recommendation for you.</p>

        <div id="ai-quiz-container" class="glass-card" style="max-width: 600px; margin: 0 auto; padding: 40px; border-radius: 20px; position: relative; overflow: hidden; min-height: 250px; display: flex; flex-direction: column; justify-content: center;">
            
            <!-- Intro / Start -->
            <div id="ai-quiz-intro">
                <button onclick="startAiQuiz()" class="btn-primary" style="padding: 15px 40px; font-size: 18px; border-radius: 30px;">Start Customization</button>
            </div>

            <!-- Quiz Questions (Injected via JS) -->
            <div id="ai-quiz-content" style="display: none; opacity: 0; transition: opacity 0.5s;">
                <h3 id="ai-question-title" style="color: #fff; font-size: 24px; margin-bottom: 30px;"></h3>
                <div id="ai-options-container" style="display: flex; flex-direction: column; gap: 15px;">
                    <!-- Buttons go here -->
                </div>
            </div>

            <!-- Loading / Analyzing State -->
            <div id="ai-analyzing" style="display: none; opacity: 0; transition: opacity 0.5s;">
                <div class="loader-spinner" style="margin: 0 auto 20px auto; width: 50px; height: 50px; border-width: 4px;"></div>
                <h3 style="color: var(--neon-cyan); font-style: italic;">AI is analyzing your profile...</h3>
            </div>

            <!-- Result Recommendation -->
            <div id="ai-result" style="display: none; opacity: 0; transition: opacity 0.5s;">
                <h3 style="color: #d4af37; margin-bottom: 20px; font-size: 22px;">We found your signature scent.</h3>
                <div id="ai-recommended-product">
                    <!-- Product card generated here -->
                </div>
                <button onclick="restartAiQuiz()" style="margin-top: 20px; background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 10px 20px; border-radius: 20px; cursor: pointer; transition: 0.3s;">Retake Quiz ↺</button>
            </div>
            
        </div>
    </section>
    <!-- ─────────────────────────────────────────────────────────────────── -->

    <!-- Footer -->
    <?php include '../common/footer.php'; ?>

    <script src="../assets/js/collection.js?v=4"></script>
    <script src="../assets/js/script.js?v=4"></script>
    <script src="../assets/js/ai_quiz.js?v=4"></script>
</body>
</html>
