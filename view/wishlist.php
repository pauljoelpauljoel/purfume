<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wishlist | AuraSpace</title>
    <link rel="stylesheet" href="../assets/css/style.css?v=7">
</head>
<body>
    
    <div id="loader" class="loader-overlay">
        <div class="loader-spinner"></div>
    </div>

    <!-- Navigation -->
    <?php include '../common/header.php'; ?>

    <div class="parallax-bg">
        <div class="floating-obj obj-1 parallax-obj" data-speed="15"></div>
        <div class="floating-obj obj-2 parallax-obj" data-speed="-10"></div>
    </div>

    <section class="section" style="padding-top: 150px; min-height: 100vh;">
        <div style="text-align: center; margin-bottom: 50px;">
            <h1 class="text-gradient" style="font-size: 42px; margin-bottom: 10px;">Your Wishlist ✨</h1>
            <p style="color: var(--text-muted); font-size: 18px;">The fragrances you desire.</p>
        </div>

        <div class="products-grid" id="wishlist-grid" style="max-width: 1200px; margin: 0 auto;">
            <!-- Wishlist items will be generated here -->
        </div>
    </section>

    <!-- Footer -->
    <?php include '../common/footer.php'; ?>

    <script src="../assets/js/wishlist.js?v=4"></script>
    <script src="../assets/js/script.js?v=9"></script>
</body>
</html>
