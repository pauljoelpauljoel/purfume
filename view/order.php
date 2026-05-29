<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Galactic Checkout | AuraSpace</title>
    <link rel="stylesheet" href="../assets/css/style.css?v=7">
    <link rel="stylesheet" href="../assets/css/order-style.css?v=7">
</head>
<body class="galaxy-theme">
    
    <div id="loader" class="loader-overlay">
        <div class="loader-spinner"></div>
    </div>

    <?php include '../common/header.php'; ?>

    <div class="space-bg"></div>

    <main class="order-main">
        
        <div id="order-form-container" class="glass-card terminal-card">
            <h1 class="text-gradient">Galactic Checkout Terminal</h1>
            <p>Secure your coordinates for the fragrance drop.</p>

            <form id="space-checkout-form">
                <div class="form-grid">
                    <div class="input-group">
                        <input type="text" id="o-name" required placeholder=" ">
                        <label for="o-name">Full Name</label>
                    </div>
                    <div class="input-group">
                        <input type="email" id="o-email" required placeholder=" ">
                        <label for="o-email">Cosmic Comms (Email)</label>
                    </div>
                    <div class="input-group full-width">
                        <input type="text" id="o-address" required placeholder=" ">
                        <label for="o-address">Delivery Coordinates (Address)</label>
                    </div>
                    <div class="input-group">
                        <input type="text" id="o-planet" required placeholder=" ">
                        <label for="o-planet">Planet / City</label>
                    </div>
                    <div class="input-group">
                        <input type="text" id="o-zip" required placeholder=" ">
                        <label for="o-zip">Zip / Sector Code</label>
                    </div>
                </div>

                <div class="payment-section">
                    <h3>Payment Credentials</h3>
                    <div class="input-group full-width">
                        <input type="text" id="o-card" required placeholder=" ">
                        <label for="o-card">Galactic Credit Card Number</label>
                    </div>
                    <div class="form-grid">
                        <div class="input-group">
                            <input type="text" id="o-exp" required placeholder=" ">
                            <label for="o-exp">Expiry (MM/YY)</label>
                        </div>
                        <div class="input-group">
                            <input type="text" id="o-cvv" required placeholder=" ">
                            <label for="o-cvv">Security Code</label>
                        </div>
                    </div>
                </div>

                <button type="submit" class="btn-primary submit-btn">Confirm Trajectory & Order</button>
            </form>
        </div>

        <!-- Success Hologram Bill (Hidden by default) -->
        <div id="success-bill" class="glass-card hologram-bill hidden">
            <div class="bill-header">
                <h2>Transmission Successful</h2>
                <div class="scan-line"></div>
            </div>
            
            <div class="bill-content">
                <p><strong>Order ID:</strong> #<span id="bill-id"></span></p>
                <p><strong>Status:</strong> Awaiting Drop Pod Launch</p>
                <br>
                <p><strong>Receiver:</strong> <span id="bill-name"></span></p>
                <p><strong>Coordinates:</strong> <span id="bill-address"></span>, <span id="bill-planet"></span></p>
                <br>
                <div class="bill-total">
                    <span>Total Amount Authorized:</span>
                    <span class="text-gradient">1,450.00 GC</span>
                </div>
            </div>

            <button class="btn-primary return-btn" onclick="window.location.href='index.php'">Return to Base</button>
        </div>

    </main>

    <?php include '../common/footer.php'; ?>

    <script src="../assets/js/order-script.js?v=9"></script>
</body>
</html>
