<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Orbit Selector | AuraSpace</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="orbit-style.css">
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

    <!-- Orbit Selector Container -->
    <section class="orbit-selector-section">
        <h1 class="orbit-title text-gradient">Explore The Galaxy of Scents</h1>
        <p class="orbit-subtitle">Click on a planet to discover its essence.</p>
        
        <!-- Search Bar -->
        <div class="search-container" style="margin-bottom: 20px; z-index: 100; position: relative;">
            <input type="text" id="planet-search" placeholder="Search fragrances..." 
                   style="width: 300px; padding: 12px 20px; border-radius: 25px; border: 1px solid rgba(0, 243, 255, 0.4); background: rgba(0, 0, 0, 0.5); color: #fff; font-size: 16px; outline: none; backdrop-filter: blur(10px); box-shadow: 0 0 15px rgba(0, 243, 255, 0.1); text-align: center;">
        </div>
        
        <div class="galaxy-container">
            <!-- Center Star/Sun -->
            <div class="galaxy-center"></div>

            <!-- Orbit Rings -->
            <div class="orbit-ring ring-1"></div>
            <div class="orbit-ring ring-2"></div>
            <div class="orbit-ring ring-3"></div>

            <!-- Products will be generated here by JS -->
            <div id="planet-products-container"></div>
        </div>
    </section>

    <!-- Footer -->
    <?php include 'components/footer.php'; ?>

    <script src="orbit-script.js"></script>
</body>
</html>
