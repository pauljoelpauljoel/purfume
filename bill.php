<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice | AuraSpace</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    
    <div id="loader" class="loader-overlay">
        <div class="loader-spinner"></div>
    </div>

    <!-- Navigation -->
    <?php include 'components/navbar.php'; ?>

    <div class="parallax-bg">
        <div class="floating-obj obj-1 parallax-obj" data-speed="15"></div>
        <div class="floating-obj obj-2 parallax-obj" data-speed="-10"></div>
    </div>

    <section class="section" style="padding-top: 150px; min-height: 100vh;">
        <div style="text-align: center; margin-bottom: 30px;">
            <div style="font-size: 60px; color: #2ed573; margin-bottom: 20px;">✓</div>
            <h1 class="text-gradient" style="font-size: 42px; margin-bottom: 10px;">Payment Successful</h1>
            <p style="color: var(--text-muted); font-size: 18px;">Your order has been confirmed.</p>
        </div>

        <div style="max-width: 700px; margin: 0 auto; background: rgba(0,0,0,0.4); border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); backdrop-filter: blur(15px); padding: 50px;">
            
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 20px;">
                <div>
                    <strong style="color: #fff; font-size: 20px; display: block; margin-bottom: 5px;">Invoice</strong>
                    <span style="color: rgba(255,255,255,0.5); font-size: 14px;" id="bill-date">Date</span>
                </div>
                <div style="text-align: right;">
                    <strong style="color: var(--neon-cyan); font-size: 16px; display: block; margin-bottom: 5px;" id="bill-id">Order ID: </strong>
                    <span style="color: rgba(255,255,255,0.5); font-size: 14px;" id="bill-method">Payment: </span>
                </div>
            </div>

            <div style="margin-bottom: 30px;">
                <h4 style="color: #fff; margin-bottom: 10px;">Billed To:</h4>
                <p style="color: rgba(255,255,255,0.7); font-size: 14px; line-height: 1.6;" id="bill-address"></p>
            </div>

            <div style="background: rgba(255,255,255,0.02); border-radius: 10px; padding: 20px; margin-bottom: 30px;">
                <h4 style="color: #fff; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">Order Items</h4>
                <div id="bill-items">
                    <!-- Injected via JS -->
                </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;">
                <span style="color: #fff; font-size: 20px;">Total Paid</span>
                <strong style="color: #d4af37; font-size: 28px;" id="bill-total">₹0.00</strong>
            </div>

            <div style="text-align: center; margin-top: 50px;">
                <button onclick="clearCartAndHome()" class="btn-primary" style="padding: 12px 30px; border-radius: 25px; border: none; font-size: 14px; cursor: pointer;">Return to Home</button>
            </div>

        </div>
    </section>

    <!-- Footer -->
    <?php include 'components/footer.php'; ?>

    <script src="bill.js"></script>
    <script src="script.js"></script>
</body>
</html>
