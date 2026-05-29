<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign In | AuraSpace Showroom</title>
    <link rel="stylesheet" href="../assets/css/style.css?v=7">
</head>
<body>
    
    <!-- Loader Overlay -->
    <div id="loader" class="loader-overlay hidden">
        <div class="loader-spinner"></div>
    </div>

    <!-- Background Floating Elements -->
    <div class="parallax-bg">
        <div class="floating-obj obj-1 parallax-obj" data-speed="30"></div>
        <div class="floating-obj obj-2 parallax-obj" data-speed="-20"></div>
        <div class="floating-obj obj-3 parallax-obj" data-speed="15"></div>
        
        <!-- Floating Scattered Perfume Bottles -->
        <img src="../assets/images/hero.png" class="floating-bottle bottle-1 parallax-obj" data-speed="15" alt="Floating Perfume">
        <img src="../assets/images/prod1.png" class="floating-bottle bottle-2 parallax-obj" data-speed="-10" alt="Floating Perfume">
        <img src="../assets/images/prod2.png" class="floating-bottle bottle-3 parallax-obj" data-speed="25" alt="Floating Perfume">
        <img src="../assets/images/prod3.png" class="floating-bottle bottle-4 parallax-obj" data-speed="-15" alt="Floating Perfume">
        <img src="../assets/images/hero.png" class="floating-bottle bottle-5 parallax-obj" data-speed="20" alt="Floating Perfume">
        <img src="../assets/images/prod1.png" class="floating-bottle bottle-6 parallax-obj" data-speed="-12" alt="Floating Perfume">
        <img src="../assets/images/prod2.png" class="floating-bottle bottle-7 parallax-obj" data-speed="18" alt="Floating Perfume">
        <img src="../assets/images/prod3.png" class="floating-bottle bottle-8 parallax-obj" data-speed="-22" alt="Floating Perfume">
        <img src="../assets/images/hero.png" class="floating-bottle bottle-9 parallax-obj" data-speed="8" alt="Floating Perfume">
        <img src="../assets/images/prod1.png" class="floating-bottle bottle-10 parallax-obj" data-speed="-8" alt="Floating Perfume">
        <img src="../assets/images/prod2.png" class="floating-bottle bottle-11 parallax-obj" data-speed="25" alt="Floating Perfume">
        <img src="../assets/images/prod3.png" class="floating-bottle bottle-12 parallax-obj" data-speed="-30" alt="Floating Perfume">
        <img src="../assets/images/hero.png" class="floating-bottle bottle-13 parallax-obj" data-speed="12" alt="Floating Perfume">
    </div>

    <div class="signin-wrapper">
        <div class="glass-panel signin-card parallax-obj" data-speed="10">
            <h2 class="text-gradient">Welcome to the Future</h2>
            <p>Enter the luxury digital showroom</p>
            
            <form id="signin-form">
                <div class="input-group">
                    <input type="email" id="email" placeholder=" " required autocomplete="off">
                    <label for="email">Email Address</label>
                </div>
                
                <div class="input-group">
                    <input type="password" id="password" placeholder=" " required autocomplete="off">
                    <label for="password">Password</label>
                </div>
                
                <button type="submit" class="btn-primary btn-signin">Sign In</button>
            </form>
        </div>
    </div>

    <script src="../assets/js/script.js?v=8"></script>
</body>
</html>
