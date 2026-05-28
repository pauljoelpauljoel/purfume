<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout | AuraSpace</title>
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
        <div style="text-align: center; margin-bottom: 50px;">
            <h1 class="text-gradient" style="font-size: 42px; margin-bottom: 10px;">Secure Checkout</h1>
            <p style="color: var(--text-muted); font-size: 18px;">Complete your premium order.</p>
        </div>

        <div style="max-width: 1000px; margin: 0 auto; display: flex; gap: 40px; flex-wrap: wrap;">
            
            <!-- Left: Form Details -->
            <div style="flex: 2; min-width: 300px; background: rgba(0,0,0,0.4); border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); backdrop-filter: blur(15px); padding: 40px;">
                <h3 style="color: #fff; margin-bottom: 20px; font-size: 20px;">Shipping Details</h3>
                <form id="checkout-form" onsubmit="processCheckout(event)">
                    <div style="display: flex; gap: 15px; margin-bottom: 15px;">
                        <input type="text" id="chk-fname" placeholder="First Name" required style="flex: 1; padding: 15px; border-radius: 10px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); color: #fff;">
                        <input type="text" id="chk-lname" placeholder="Last Name" required style="flex: 1; padding: 15px; border-radius: 10px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); color: #fff;">
                    </div>
                    <input type="text" id="chk-phone" placeholder="Phone Number" required style="width: 100%; margin-bottom: 15px; padding: 15px; border-radius: 10px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); color: #fff;">
                    <textarea id="chk-address" placeholder="Full Delivery Address" required rows="3" style="width: 100%; margin-bottom: 25px; padding: 15px; border-radius: 10px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); color: #fff; resize: vertical;"></textarea>

                    <h3 style="color: #fff; margin-bottom: 20px; font-size: 20px;">Payment Method</h3>
                    <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                        <label style="flex: 1; background: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px; cursor: pointer; border: 1px solid rgba(212,175,55,0.3); display: flex; align-items: center; gap: 10px;">
                            <input type="radio" name="payment" value="UPI" required onchange="togglePaymentUI()" checked>
                            <span style="color: #fff;">UPI (Scan & Pay)</span>
                        </label>
                        <label style="flex: 1; background: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px; cursor: pointer; border: 1px solid rgba(212,175,55,0.3); display: flex; align-items: center; gap: 10px;">
                            <input type="radio" name="payment" value="COD" required onchange="togglePaymentUI()">
                            <span style="color: #fff;">Cash on Delivery</span>
                        </label>
                    </div>

                    <!-- UPI Mock UI -->
                    <div id="upi-ui" style="background: rgba(0, 243, 255, 0.05); border: 1px dashed var(--neon-cyan); border-radius: 10px; padding: 20px; text-align: center; margin-bottom: 25px;">
                        <p style="color: var(--neon-cyan); margin-bottom: 10px;">Enter your UPI PIN to authenticate</p>
                        <div style="display: flex; justify-content: center; gap: 10px;">
                            <input type="password" maxlength="1" style="width: 40px; height: 40px; text-align: center; font-size: 24px; border-radius: 5px; border: 1px solid var(--neon-cyan); background: transparent; color: #fff;">
                            <input type="password" maxlength="1" style="width: 40px; height: 40px; text-align: center; font-size: 24px; border-radius: 5px; border: 1px solid var(--neon-cyan); background: transparent; color: #fff;">
                            <input type="password" maxlength="1" style="width: 40px; height: 40px; text-align: center; font-size: 24px; border-radius: 5px; border: 1px solid var(--neon-cyan); background: transparent; color: #fff;">
                            <input type="password" maxlength="1" style="width: 40px; height: 40px; text-align: center; font-size: 24px; border-radius: 5px; border: 1px solid var(--neon-cyan); background: transparent; color: #fff;">
                        </div>
                    </div>

                    <button type="submit" id="btn-place-order" class="btn-primary" style="width: 100%; padding: 15px; border-radius: 30px; font-size: 16px; border: none; font-weight: bold; margin-top: 10px;">Verify & Place Order</button>
                </form>
            </div>

            <!-- Right: Order Summary -->
            <div style="flex: 1; min-width: 300px; background: rgba(0,0,0,0.4); border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); backdrop-filter: blur(15px); padding: 40px; height: fit-content;">
                <h3 style="color: #fff; margin-bottom: 20px; font-size: 20px;">Order Summary</h3>
                <div id="checkout-items" style="max-height: 300px; overflow-y: auto; margin-bottom: 20px; padding-right: 10px;">
                    <!-- Items generated by JS -->
                </div>
                <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px; color: rgba(255,255,255,0.7);">
                        <span>Subtotal</span>
                        <span id="chk-subtotal">₹0.00</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px; color: rgba(255,255,255,0.7);">
                        <span>Delivery</span>
                        <span>Free</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-top: 15px; color: #fff; font-size: 20px; font-weight: bold;">
                        <span>Total</span>
                        <span id="chk-total" style="color: #d4af37;">₹0.00</span>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <!-- Footer -->
    <?php include 'components/footer.php'; ?>

    <script src="checkout.js"></script>
    <script src="script.js"></script>
</body>
</html>
