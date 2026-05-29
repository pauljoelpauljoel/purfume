<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Lunar Station | AuraSpace</title>
    <link rel="stylesheet" href="../assets/css/style.css?v=7">
    <link rel="stylesheet" href="../assets/css/contact-style.css?v=7">
</head>
<body class="moon-theme">
    
    <!-- Cinematic Entry Loader -->
    <div id="loader" class="loader-overlay">
        <div class="loader-spinner moon-spinner"></div>
    </div>

    <!-- Navigation -->
    <?php include '../common/header.php'; ?>

    <!-- Lunar Background -->
    <div class="lunar-background">
        <!-- Space Sky -->
        <div class="space-sky"></div>
        <div class="earth-visible"></div>
        <div class="moon-fog"></div>
        
        <!-- Floating Bottles -->
        <img src="../assets/images/prod1.png" alt="Floating" class="lunar-bottle bottle-a">
        <img src="../assets/images/prod2.png" alt="Floating" class="lunar-bottle bottle-b">
        <img src="../assets/images/prod3.png" alt="Floating" class="lunar-bottle bottle-c">
        <img src="../assets/images/prod1.png" alt="Floating" class="lunar-bottle bottle-d">
        <img src="../assets/images/prod2.png" alt="Floating" class="lunar-bottle bottle-e">
        
        <!-- Realistic Moon Floor -->
        <div class="moon-floor">
            <img src="../assets/images/earthrise_moon_surface.png" alt="Moon Surface" class="real-moon-img">
        </div>
    </div>

    <main class="lunar-main">
        
        <div class="contact-header">
            <h1 class="lunar-title">Connect With The Lunar Fragrance Station</h1>
            <p class="lunar-subtitle">Transmit your message across the fragrance universe.</p>
        </div>

        <div class="contact-layout">
            
            <!-- Top Section: Intro & Info -->
            <div class="info-section">
                <div class="intro-text glass-card">
                    <h2>Welcome to AuraSpace Communications</h2>
                    <p>We believe in establishing flawless connections across dimensions. Whether you are seeking the perfect cosmic scent, checking on a drop pod delivery, or looking to collaborate, our Lunar Station is online 24/7. Reach out through any of our direct transmission channels below.</p>
                </div>

                <div class="hologram-cards">
                    <a href="auraspace@gmail.com" class="holo-card">
                        <h4>Direct Signal (Email)</h4>
                        <p>station@email.</p>
                    </a>
                    <a href="tel:+91955980426" class="holo-card">
                        <h4>Comms (Phone)</h4>
                        <p>contact the station Auraspace</p>
                    </a>
                    <a href="https://wa.me/9566980426" class="holo-card">
                        <h4>WhatsApp Link</h4>
                        <p>chat with station Auraspace</p>
                    </a>
                    <a href="https://www.google.com/maps/search/?api=1&query=way+of+station+Auraspace" target="_blank" class="holo-card">
                        <h4>Headquarters</h4>
                        <p>way of station Auraspace </p>
                    </a>
                </div>
            </div>

            <!-- Bottom Section: Form -->
            <div class="moonbase-control-center glass-card">
                <h2>Transmission Form</h2>
                <form id="lunar-contact-form" class="lunar-form">
                    <div class="input-group">
                        <input type="text" id="c-name" required placeholder=" ">
                        <label for="c-name">Transmitter Name</label>
                    </div>
                    <div class="input-group">
                        <input type="email" id="c-email" required placeholder=" ">
                        <label for="c-email">Signal Frequency (Email)</label>
                    </div>
                    <div class="input-group">
                        <input type="text" id="c-subject" required placeholder=" ">
                        <label for="c-subject">Subject</label>
                    </div>
                    <div class="input-group">
                        <textarea id="c-message" rows="4" required placeholder=" "></textarea>
                        <label for="c-message">Message Payload</label>
                    </div>
                    <button type="submit" class="btn-primary lunar-btn">Transmit Signal</button>
                </form>
            </div>

        </div>
    </main>

    <!-- Footer -->
    <?php include '../common/footer.php'; ?>

    <script src="../assets/js/script.js?v=9"></script>
    <script src="../assets/js/contact-script.js?v=9"></script>
</body>
</html>
