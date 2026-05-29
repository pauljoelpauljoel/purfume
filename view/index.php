<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AuraSpace | Futuristic Luxury Showroom</title>
    <link rel="stylesheet" href="../assets/css/style.css?v=7">
</head>
<body>

    <!-- Cinematic Entry Loader -->
    <div id="loader" class="loader-overlay">
        <div class="loader-spinner"></div>
    </div>

    <!-- Navigation -->
    <?php include '../common/header.php'; ?>

    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <!-- PREMIUM BANNER SECTION — Above Hero, Does NOT touch content below -->
    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <section class="promo-banner" id="promo-banner">
        <!-- Top Ticker -->
        <div class="banner-top-ticker">
            <span>✦ AURASPACE UNIVERSE ✦</span>
        </div>

        <!-- Main Banner Content -->
        <div class="banner-body">
            <!-- Left: Text & CTA -->
            <div class="banner-text">
                <h2 class="banner-heading">Crafted for<br><span class="banner-legends">LEGENDS</span></h2>
                <p class="banner-tagline">LUXURY SCENTS. LIMITLESS IMPACT.</p>
                <div class="banner-diamond">◇</div>
                <div class="banner-offer">
                    <span class="offer-label">EXCITING</span>
                    <span class="offer-percent" style="font-size: 55px; letter-spacing: 2px;">SALES</span>
                    <span class="offer-off" style="display:none;"></span>
                </div>
                <p class="banner-offer-sub">ON PREMIUM COLLECTIONS</p>
                <a href="collection.php" class="banner-shop-btn">SHOP NOW &rarr;</a>
            </div>

            <!-- Center: Product Showcase (Removed) -->
            <div class="banner-products">
            </div>

            <!-- Right: Premium Badge -->
            <div class="banner-badge">
                <div class="badge-circle">
                    <span class="badge-top">PREMIUM</span>
                    <span class="badge-mid">QUALITY</span>
                    <span class="badge-bot">LONG LASTING SCENTS</span>
                </div>
            </div>
        </div>

        <!-- Feature Badges Row -->
        <div class="banner-features">
            <div class="feature-item">
                <span class="feature-icon">🎁</span>
                <div>
                    <strong>FREE GIFT WRAPPING</strong>
                    <span>On All Orders</span>
                </div>
            </div>
            <div class="feature-item">
                <span class="feature-icon">🚚</span>
                <div>
                    <strong>FAST & SECURE DELIVERY</strong>
                    <span>Across India</span>
                </div>
            </div>
            <div class="feature-item">
                <span class="feature-icon">✅</span>
                <div>
                    <strong>100% ORIGINAL PRODUCTS</strong>
                    <span>Premium Quality</span>
                </div>
            </div>
            <div class="feature-item">
                <span class="feature-icon">🎧</span>
                <div>
                    <strong>24/7 CUSTOMER SUPPORT</strong>
                    <span>We're Here to Help</span>
                </div>
            </div>
        </div>

        <!-- Bottom Marquee Ticker -->
        <div class="banner-bottom-ticker">
            <div class="ticker-track">
                <span>LIMITED TIME OFFER &nbsp;&nbsp;|&nbsp;&nbsp; LUXURY REDEFINED &nbsp;&nbsp;|&nbsp;&nbsp; EXPERIENCE THE EXTRAORDINARY &nbsp;&nbsp;|&nbsp;&nbsp; LIMITED TIME OFFER &nbsp;&nbsp;|&nbsp;&nbsp; LUXURY REDEFINED &nbsp;&nbsp;|&nbsp;&nbsp; EXPERIENCE THE EXTRAORDINARY &nbsp;&nbsp;|&nbsp;&nbsp;</span>
            </div>
        </div>
    </section>
    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <!-- END PREMIUM BANNER — Everything below this is UNTOUCHED -->
    <!-- ═══════════════════════════════════════════════════════════════════ -->

    <!-- Background Parallax Setup -->
    <div class="parallax-bg">
        <div class="floating-obj obj-1 parallax-obj" data-speed="15"></div>
        <div class="floating-obj obj-2 parallax-obj" data-speed="-10"></div>
        <div class="floating-obj obj-3 parallax-obj" data-speed="20"></div>
        <!-- Abstract elements -->
        <div style="position:absolute; top:40%; left:10%; width:100px; height:100px; border-radius:50%; border:1px solid rgba(255,255,255,0.1); animation: float 10s infinite;" class="parallax-obj" data-speed="-15"></div>
    </div>

    <!-- Original Hero Section -->
    <section id="home" class="hero">
        <div class="hero-content parallax-obj" data-speed="-5">
            <img src="../assets/images/auraspace_logo.png" alt="AuraSpace Logo" style="width: 120px; margin-bottom: 20px; filter: drop-shadow(0 0 15px rgba(0, 243, 255, 0.5)); mix-blend-mode: screen;">
            <h1 class="hero-title">Discover The<br><span class="text-gradient">AuraSpace</span> Universe</h1>
            <p class="hero-desc">Immerse yourself in a cinematic digital showroom. Experience the world's most premium men's fragrances floating in a dimension of unparalleled luxury and glassmorphic elegance.</p>
            <button onclick="window.location.href='collection.php'" class="btn-primary" style="display: inline-block;">Explore Collections</button>
        </div>
        <div class="hero-visual parallax-obj" data-speed="10">
            <!-- Glow Rings -->
            <div class="glow-ring"></div>
            <div class="glow-ring"></div>
            
            <!-- Orbit Profiles Container -->
            <div id="orbit-profiles-container" style="position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none;"></div>
            
            <!-- Giant floating perfume bottle generated by AI -->
            <img src="../assets/images/hero.png" alt="Premium Perfume" class="hero-bottle" style="position:relative; z-index:5;">
        </div>
    </section>


            </div>
        </div>
    </section>

    <!-- Global Review Modal popup -->
    <div id="review-modal-overlay" class="cart-overlay" onclick="closeReviewModal()"></div>
    <div id="review-modal" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.9); opacity: 0; visibility: hidden; background: rgba(10, 10, 15, 0.95); backdrop-filter: blur(20px); border: 1px solid var(--neon-cyan); padding: 40px; border-radius: 20px; z-index: 1001; width: 90%; max-width: 500px; box-shadow: 0 0 30px rgba(0, 243, 255, 0.2); transition: 0.3s; text-align: center;">
        <button onclick="closeReviewModal()" style="position: absolute; top: 15px; right: 20px; background: transparent; border: none; color: #fff; font-size: 24px; cursor: pointer;">✖</button>
        <div id="modal-review-stars" style="color: #d4af37; font-size: 24px; margin-bottom: 15px;"></div>
        <h3 id="modal-review-name" style="color: #fff; font-size: 24px; margin-bottom: 5px;"></h3>
        <span id="modal-review-role" style="color: var(--neon-cyan); font-size: 14px; margin-bottom: 20px; display: block;"></span>
        <p id="modal-review-text" style="color: rgba(255,255,255,0.8); font-size: 18px; font-style: italic; line-height: 1.6;"></p>
    </div>

    <!-- Footer -->
    <?php include '../common/footer.php'; ?>

    <script src="../assets/js/script.js?v=8"></script>
</body>
</html>
