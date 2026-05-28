<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Detail | AuraSpace</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="product-style.css">
</head>
<body class="galaxy-theme">
    
    <!-- Cinematic Entry Loader -->
    <div id="loader" class="loader-overlay">
        <div class="loader-spinner"></div>
    </div>

    <!-- Navigation -->
    <?php include 'components/navbar.php'; ?>

    <!-- Deep Space Background (Shooting Stars) -->
    <div class="shooting-stars-bg">
        <div class="star"></div><div class="star"></div><div class="star"></div>
        <div class="star"></div><div class="star"></div><div class="star"></div>
        <div class="star"></div><div class="star"></div><div class="star"></div>
    </div>

    <section class="product-detail-section section" style="padding-top:120px;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 5%;">
            <a href="orbit.php" class="back-link">← Return to Galaxy</a>
            
            <div class="product-layout">
                <div class="product-left parallax-obj" data-speed="10">
                    <div class="product-glow"></div>
                    <img src="" id="detail-image" alt="Perfume" class="detail-bottle">
                </div>
                
                <div class="product-right glass-card parallax-obj" data-speed="-5">
                    <div class="brand-badge" id="detail-brand">Loading...</div>
                    <h1 class="detail-name text-gradient" id="detail-name">...</h1>
                    
                    <div class="rating-display">
                        <span class="star-icon">★</span>
                        <span id="detail-rating">...</span> / 5.0
                    </div>

                    <div class="detail-price" id="detail-price">...</div>
                    
                    <p class="detail-desc" id="detail-desc">...</p>
                    
                    <div class="specs-grid">
                        <div class="spec-item">
                            <span class="spec-label">Longevity</span>
                            <span class="spec-value">12+ Hours</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Sillage</span>
                            <span class="spec-value">Heavy (Cosmic)</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Type</span>
                            <span class="spec-value">Extrait de Parfum</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Bottle</span>
                            <span class="spec-value">Anti-Gravity Glass</span>
                        </div>
                    </div>

                    <button class="btn-primary order-btn" onclick="window.location.href='order.php'">Order Now - Enter The Dimension</button>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <?php include 'components/footer.php'; ?>

    <script src="product-script.js"></script>
</body>
</html>
