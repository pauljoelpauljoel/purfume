    <!-- Global Slide-out Cart Modal -->
    <div id="side-cart" class="side-cart">
        <div class="side-cart-header">
            <h3 id="side-cart-title">Your Cart 🛒</h3>
            <button class="close-cart" onclick="closeCart()">✖</button>
        </div>
        <div class="side-cart-body" id="side-cart-items-step">
            <div id="side-cart-items">
                <p style="color: rgba(255,255,255,0.5); text-align: center; margin-top: 50px;">Cart is empty.</p>
            </div>
        </div>
        <div class="side-cart-footer" id="side-cart-footer-items">
            <button onclick="proceedToInfo()" class="btn-primary" style="width: 100%; padding: 15px; border-radius: 30px; border: none; font-size: 16px; font-weight: bold;">Proceed</button>
        </div>
        
        <!-- Step 2: Delivery Info -->
        <div class="side-cart-body" id="side-cart-info-step" style="display: none; padding: 20px;">
            <input type="text" id="cart-fname" placeholder="First Name" required style="width: 100%; margin-bottom: 10px; padding: 10px; border-radius: 5px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2); color: #fff;">
            <input type="text" id="cart-lname" placeholder="Last Name" required style="width: 100%; margin-bottom: 10px; padding: 10px; border-radius: 5px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2); color: #fff;">
            <input type="text" id="cart-phone" placeholder="Contact Number" required style="width: 100%; margin-bottom: 10px; padding: 10px; border-radius: 5px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2); color: #fff;">
            <textarea id="cart-address" placeholder="Delivery Address" required rows="3" style="width: 100%; margin-bottom: 10px; padding: 10px; border-radius: 5px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2); color: #fff;"></textarea>
        </div>
        <div class="side-cart-footer" id="side-cart-footer-info" style="display: none;">
            <button onclick="proceedToPayment()" class="btn-primary" style="width: 100%; padding: 15px; border-radius: 30px; border: none; font-size: 16px; font-weight: bold;">Proceed to Payment</button>
        </div>

        <!-- Step 3: Payment -->
        <div class="side-cart-body" id="side-cart-payment-step" style="display: none; padding: 20px;">
            <label style="display: block; background: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px; cursor: pointer; border: 1px solid rgba(212,175,55,0.3);">
                <input type="radio" name="cart_payment" value="COD" checked style="margin-right: 10px;">
                <span style="color: #fff;">Cash on Delivery</span>
            </label>
        </div>
        <div class="side-cart-footer" id="side-cart-footer-payment" style="display: none;">
            <button onclick="generateBill()" class="btn-primary" style="width: 100%; padding: 15px; border-radius: 30px; border: none; font-size: 16px; font-weight: bold;">Place Order</button>
        </div>

        <!-- NEW: Innovative Perfume Loading Step -->
        <div class="side-cart-body" id="side-cart-loading-step" style="display: none; padding: 40px 20px; text-align: center; justify-content: center; align-items: center; min-height: 250px;">
            <div style="position: relative; width: 100px; height: 100px; margin: 0 auto 30px auto;">
                <img src="../assets/images/prod1.png" style="height: 80px; position: absolute; top: 0; left: 10px; animation: pulseGlow 1.5s infinite alternate;">
                <div class="loader-spinner" style="position: absolute; top: -10px; left: -10px; width: 120px; height: 120px; border-color: rgba(212,175,55,0.2); border-top-color: #d4af37;"></div>
            </div>
            <h3 style="color: #d4af37; font-size: 20px; margin-bottom: 10px; animation: pulseText 1.5s infinite alternate;">Crafting your signature essence...</h3>
            <p style="color: rgba(255,255,255,0.6); font-size: 14px;">Preparing your luxury order</p>
            <style>
                @keyframes pulseGlow {
                    0% { filter: drop-shadow(0 0 10px rgba(212,175,55,0.2)); transform: scale(1); }
                    100% { filter: drop-shadow(0 0 30px rgba(212,175,55,0.8)); transform: scale(1.05); }
                }
                @keyframes pulseText {
                    0% { opacity: 0.5; }
                    100% { opacity: 1; }
                }
            </style>
        </div>

        <!-- Step 4: Bill -->
        <div class="side-cart-body" id="side-cart-bill-step" style="display: none; padding: 20px; text-align: center;">
            <h2 style="color: #d4af37; margin-bottom: 15px;">Order Placed!</h2>
            <p style="color: rgba(255,255,255,0.8); margin-bottom: 20px;">Thank you for shopping with AuraSpace.</p>
            <div id="cart-bill-details" style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px; text-align: left; font-size: 14px; color: #fff;">
                <!-- Bill Details JS -->
            </div>
        </div>
        <div class="side-cart-footer" id="side-cart-footer-bill" style="display: none;">
            <button onclick="closeCart()" class="btn-primary" style="width: 100%; padding: 15px; border-radius: 30px; border: none; font-size: 16px; font-weight: bold;">Close</button>
        </div>
    </div>
    
    <!-- Global Slide-out Wishlist Modal -->
    <div id="side-wishlist" class="side-cart">
        <div class="side-cart-header">
            <h3>Your Wishlist ✨</h3>
            <button class="close-cart" onclick="closeWishlistSidebox()">✖</button>
        </div>
        <div class="side-cart-body" id="side-wishlist-items">
            <p style="color: rgba(255,255,255,0.5); text-align: center; margin-top: 50px;">Wishlist is empty.</p>
        </div>
        <div class="side-cart-footer">
            <button onclick="window.location.href='wishlist.php'" class="btn-primary" style="width: 100%; padding: 15px; border-radius: 30px; border: none; font-size: 16px; font-weight: bold;">View Full Wishlist</button>
        </div>
    </div>

    <div id="cart-overlay" class="cart-overlay" onclick="closeCart(); closeWishlistSidebox();"></div>

    <!-- Global Review Slider Section -->
    <section class="review-slider-section" style="padding: 60px 0; border-top: 1px solid rgba(212, 175, 55, 0.1); background: rgba(0, 0, 0, 0.6); overflow: hidden; margin-top: 50px;">
        <h2 style="text-align: center; color: #d4af37; font-style: italic; font-size: 32px; margin-bottom: 40px; font-weight: 300;">What Legends Are Saying</h2>
        
        <div class="review-marquee-container">
            <div class="review-track">
                <!-- Single Review Card -->
                <div class="review-card">
                    <div class="stars" style="color: #d4af37; margin-bottom: 10px;">★★★★★</div>
                    <p style="color: rgba(255,255,255,0.7); font-size: 14px; font-style: italic; margin-bottom: 15px; line-height: 1.5;">"The glassmorphic bottle looks incredible on my display, and the scent itself is incredibly long-lasting."</p>
                    <strong style="color: #fff; font-size: 14px;">- Julian S.</strong>
                    <div style="margin-top: 15px; text-align: center;">
                        <img src="../assets/images/prod1.png" style="width: 50px; height: 50px; object-fit: contain; filter: drop-shadow(0 5px 10px rgba(0,0,0,0.5));">
                        <span style="display: block; font-size: 12px; color: var(--neon-cyan); margin-top: 5px;">Aura 476</span>
                    </div>
                </div>
                <div class="review-card">
                    <div class="stars" style="color: #d4af37; margin-bottom: 10px;">★★★★★</div>
                    <p style="color: rgba(255,255,255,0.7); font-size: 14px; font-style: italic; margin-bottom: 15px; line-height: 1.5;">"Absolutely mesmerizing. The notes unfold beautifully throughout the day. Worth every penny for a collector."</p>
                    <strong style="color: #fff; font-size: 14px;">- Marcus V.</strong>
                    <div style="margin-top: 15px; text-align: center;">
                        <img src="../assets/images/prod2.png" style="width: 50px; height: 50px; object-fit: contain; filter: drop-shadow(0 5px 10px rgba(0,0,0,0.5));">
                        <span style="display: block; font-size: 12px; color: var(--neon-cyan); margin-top: 5px;">Lumina 721</span>
                    </div>
                </div>
                <div class="review-card">
                    <div class="stars" style="color: #d4af37; margin-bottom: 10px;">★★★★☆</div>
                    <p style="color: rgba(255,255,255,0.7); font-size: 14px; font-style: italic; margin-bottom: 15px; line-height: 1.5;">"I get compliments every time I wear it. The fresh aquatic notes are out of this world."</p>
                    <strong style="color: #fff; font-size: 14px;">- Daniel R.</strong>
                    <div style="margin-top: 15px; text-align: center;">
                        <img src="../assets/images/prod3.png" style="width: 50px; height: 50px; object-fit: contain; filter: drop-shadow(0 5px 10px rgba(0,0,0,0.5));">
                        <span style="display: block; font-size: 12px; color: var(--neon-cyan); margin-top: 5px;">Zephyr 302</span>
                    </div>
                </div>
                <div class="review-card">
                    <div class="stars" style="color: #d4af37; margin-bottom: 10px;">★★★★★</div>
                    <p style="color: rgba(255,255,255,0.7); font-size: 14px; font-style: italic; margin-bottom: 15px; line-height: 1.5;">"Fast delivery and the free gift wrapping was a fantastic touch. 100% original products as promised."</p>
                    <strong style="color: #fff; font-size: 14px;">- Chris B.</strong>
                    <div style="margin-top: 15px; text-align: center;">
                        <img src="../assets/images/hero.png" style="width: 50px; height: 50px; object-fit: contain; filter: drop-shadow(0 5px 10px rgba(0,0,0,0.5));">
                        <span style="display: block; font-size: 12px; color: var(--neon-cyan); margin-top: 5px;">Quantum 910</span>
                    </div>
                </div>
                <div class="review-card">
                    <div class="stars" style="color: #d4af37; margin-bottom: 10px;">★★★★★</div>
                    <p style="color: rgba(255,255,255,0.7); font-size: 14px; font-style: italic; margin-bottom: 15px; line-height: 1.5;">"The leather and musk base notes are perfectly balanced. A masterpiece of modern perfumery."</p>
                    <strong style="color: #fff; font-size: 14px;">- Elias M.</strong>
                    <div style="margin-top: 15px; text-align: center;">
                        <img src="../assets/images/cosmic_perfume.png" style="width: 50px; height: 50px; object-fit: contain; filter: drop-shadow(0 5px 10px rgba(0,0,0,0.5));">
                        <span style="display: block; font-size: 12px; color: var(--neon-cyan); margin-top: 5px;">Obsidian 55</span>
                    </div>
                </div>
                <!-- Duplicate for infinite loop -->
                <div class="review-card">
                    <div class="stars" style="color: #d4af37; margin-bottom: 10px;">★★★★★</div>
                    <p style="color: rgba(255,255,255,0.7); font-size: 14px; font-style: italic; margin-bottom: 15px; line-height: 1.5;">"The glassmorphic bottle looks incredible on my display, and the scent itself is incredibly long-lasting."</p>
                    <strong style="color: #fff; font-size: 14px;">- Julian S.</strong>
                    <div style="margin-top: 15px; text-align: center;">
                        <img src="../assets/images/prod1.png" style="width: 50px; height: 50px; object-fit: contain; filter: drop-shadow(0 5px 10px rgba(0,0,0,0.5));">
                        <span style="display: block; font-size: 12px; color: var(--neon-cyan); margin-top: 5px;">Aura 476</span>
                    </div>
                </div>
                <div class="review-card">
                    <div class="stars" style="color: #d4af37; margin-bottom: 10px;">★★★★★</div>
                    <p style="color: rgba(255,255,255,0.7); font-size: 14px; font-style: italic; margin-bottom: 15px; line-height: 1.5;">"Absolutely mesmerizing. The notes unfold beautifully throughout the day. Worth every penny for a collector."</p>
                    <strong style="color: #fff; font-size: 14px;">- Marcus V.</strong>
                    <div style="margin-top: 15px; text-align: center;">
                        <img src="../assets/images/prod2.png" style="width: 50px; height: 50px; object-fit: contain; filter: drop-shadow(0 5px 10px rgba(0,0,0,0.5));">
                        <span style="display: block; font-size: 12px; color: var(--neon-cyan); margin-top: 5px;">Lumina 721</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

<footer>
    <!-- 1. Social Media Section (Top, Wide, Animated) -->
    <div class="footer-social-section" style="text-align: center; padding: 40px 20px; border-bottom: 1px solid rgba(255,255,255,0.1);">
        <h3 style="color: #d4af37; margin-bottom: 20px; font-weight: 300; letter-spacing: 2px;">CONNECT WITH US</h3>
        <div class="social-icons" style="display: flex; justify-content: center; gap: 25px;">
            <a href="#" class="social-icon" title="Facebook">FB</a>
            <a href="#" class="social-icon" title="Instagram">IG</a>
            <a href="#" class="social-icon" title="Twitter">X</a>
            <a href="#" class="social-icon" title="YouTube">YT</a>
        </div>
    </div>

    <!-- 2. Creative Floating Bottles Animation with Customer Support Inside -->
    <div class="footer-animation-section" style="position: relative; min-height: 200px; overflow: hidden; background: linear-gradient(transparent, rgba(10,10,15,0.8)); border-bottom: 1px solid rgba(255,255,255,0.1); padding: 40px 20px;">
        <!-- We will use CSS keyframes in style.css to float these across -->
        <img src="../assets/images/prod1.png" class="floating-bottle drift-1" style="height: 80px; position: absolute; bottom: 10px; left: -100px;">
        <img src="../assets/images/prod2.png" class="floating-bottle drift-2" style="height: 100px; position: absolute; bottom: 20px; left: -150px;">
        <img src="../assets/images/prod3.png" class="floating-bottle drift-3" style="height: 70px; position: absolute; bottom: 5px; left: -200px;">
        
        <!-- Contact Us / Complaint Register Centered Inside -->
        <div class="footer-complaint-section" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; z-index: 5;">
            <h3 style="color: #fff; margin-bottom: 10px;">Contact Us / Customer Support</h3>
            <p style="color: rgba(255,255,255,0.8); margin-bottom: 20px; font-size: 14px;">Have an issue or want to register a complaint? We're here to help.</p>
            <button onclick="openComplaintModal()" class="btn-primary" style="padding: 12px 30px; font-size: 14px; border-radius: 30px; box-shadow: 0 0 15px rgba(0,243,255,0.3);">Raise a Complaint</button>
        </div>
    </div>

    <!-- Footer Copyright -->
    <div class="footer-bottom" style="text-align: center; padding: 20px; background: #000; border-top: 1px solid rgba(212,175,55,0.2);">
        <p style="color: rgba(255,255,255,0.5); font-size: 13px;">&copy; AuraSpace Luxury Perfumes. All rights reserved.</p>
    </div>
</footer>

<!-- Google-Form Style Complaint Modal -->
<div id="complaint-modal-overlay" class="cart-overlay" onclick="closeComplaintModal()"></div>
<div id="complaint-modal" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.9); opacity: 0; visibility: hidden; background: rgba(10, 10, 15, 0.95); backdrop-filter: blur(20px); border: 1px solid rgba(212,175,55,0.5); padding: 40px; border-radius: 20px; z-index: 1001; width: 90%; max-width: 500px; box-shadow: 0 0 40px rgba(0, 0, 0, 0.8); transition: 0.3s; color: #fff;">
    <button onclick="closeComplaintModal()" style="position: absolute; top: 15px; right: 20px; background: transparent; border: none; color: #fff; font-size: 24px; cursor: pointer;">✖</button>
    <h2 style="color: #d4af37; margin-bottom: 5px; text-align: center;">Register Complaint</h2>
    <p style="text-align: center; font-size: 13px; color: rgba(255,255,255,0.6); margin-bottom: 25px;">Please fill out this form, and our support team will resolve it.</p>
    
    <form id="complaint-form" onsubmit="submitComplaint(event)">
        <input type="text" id="comp-name" placeholder="Your Name" required style="width: 100%; margin-bottom: 15px; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); color: #fff;">
        
        <input type="email" id="comp-email" placeholder="Your Email ID" required style="width: 100%; margin-bottom: 15px; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); color: #fff;">
        
        <textarea id="comp-info" placeholder="What is the issue?" required rows="5" style="width: 100%; margin-bottom: 20px; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); color: #fff; resize: vertical;"></textarea>
        
        <button type="submit" class="btn-primary" style="width: 100%; padding: 15px; border-radius: 30px; border: none; font-size: 16px; font-weight: bold;">Submit Complaint</button>
    </form>
</div>

<!-- Custom Toast Notification / Boom Message -->
<div id="toast-message" style="position: fixed; top: 20px; right: -800px; background: linear-gradient(135deg, rgba(0,243,255,0.9), rgba(10,10,15,0.9)); backdrop-filter: blur(15px); color: #fff; padding: 20px 30px; border-radius: 15px; border-left: 5px solid #d4af37; box-shadow: 0 10px 30px rgba(0,0,0,0.8); z-index: 9999; display: flex; align-items: center; gap: 15px; transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);">
    <span style="font-size: 24px;">✅</span>
    <div style="font-size: 15px; font-weight: 500; letter-spacing: 1px;" id="toast-text">Your message here</div>
</div>

<!-- Global Toast Container -->
<div id="toast-container" style="position: fixed; bottom: 20px; right: 20px; display: flex; flex-direction: column; gap: 10px; z-index: 9999; pointer-events: none;"></div>

