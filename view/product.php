<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Details | AuraSpace</title>
    <link rel="stylesheet" href="../assets/css/style.css?v=7">
</head>
<body>
    
    <!-- Cinematic Entry Loader -->
    <div id="loader" class="loader-overlay">
        <div class="loader-spinner"></div>
    </div>

    <!-- Innovative Floating Background specific to Product Page -->
    <div class="product-bg-animation">
        <div class="product-bg-orb orb-1"></div>
        <div class="product-bg-orb orb-2"></div>
    </div>

    <!-- Navigation -->
    <?php include '../common/header.php'; ?>

    <!-- FLOATING BACK BUTTON -->
    <a href="collection.php" class="floating-back-btn">
        <span style="font-size: 20px;">←</span> Back
    </a>

    <!-- Deep Space Background -->
    <div class="parallax-bg">
        <div class="floating-obj obj-1 parallax-obj" data-speed="15"></div>
        <div class="floating-obj obj-2 parallax-obj" data-speed="-10"></div>
    </div>

    <section class="section" style="padding-top: 150px; min-height: 100vh;">
        <div id="product-container" style="max-width: 1200px; margin: 0 auto; display: flex; gap: 50px; flex-wrap: wrap; align-items: center; justify-content: center; min-height: 60vh;">
            <!-- Content will be injected by product.js -->
        </div>

        <!-- Product Reviews Section -->
        <div id="product-reviews" style="max-width: 800px; margin: 80px auto 0; background: rgba(255,255,255,0.02); padding: 40px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); backdrop-filter: blur(10px);">
            <h3 style="color: #d4af37; font-size: 24px; margin-bottom: 30px; text-align: center; font-style: italic;">Customer Experiences</h3>
            
            <div class="review-list">
                <!-- Example static reviews for the product page -->
                <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
        <!-- REVIEWS SECTION -->
        <div style="max-width: 1200px; margin: 50px auto; padding: 0 20px;">
            <div class="glass-card" style="padding: 30px; border-radius: 15px; border-color: rgba(212,175,55,0.2);">
                <h3 style="color: #d4af37; margin-bottom: 20px;">Customer Reviews</h3>
                <div id="product-reviews-list" style="max-height: 300px; overflow-y: auto; padding-right: 10px; margin-bottom: 20px; color: #fff;">
                    <!-- Reviews injected here by JS -->
                </div>
                
                <button onclick="document.getElementById('review-form-container').style.display='block'; this.style.display='none';" id="btn-show-review" style="width: 100%; margin-top: 20px; padding: 12px; background: transparent; border: 1px solid rgba(255, 235, 59, 0.4); color: #ffeb3b; border-radius: 25px; cursor: pointer; transition: 0.3s; font-weight: bold; letter-spacing: 1px;" onmouseover="this.style.background='rgba(255, 235, 59, 0.1)'" onmouseout="this.style.background='transparent'">Write a Review</button>
                
                <div id="review-form-container" style="display: none; margin-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;">
                    <h4 style="color: #fff; margin-bottom: 15px;">Your Experience</h4>
                    <form id="review-form" onsubmit="submitReview(event)">
                        <input type="text" id="rev-name" placeholder="Your Name" required style="width: 100%; margin-bottom: 10px; padding: 10px; border-radius: 5px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2); color: #fff;">
                        
                        <select id="rev-rating" required style="width: 100%; margin-bottom: 10px; padding: 10px; border-radius: 5px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2); color: #fff; appearance: none; cursor: pointer;">
                            <option value="">Select Rating</option>
                            <option value="5">5 Stars ★★★★★</option>
                            <option value="4">4 Stars ★★★★☆</option>
                            <option value="3">3 Stars ★★★☆☆</option>
                            <option value="2">2 Stars ★★☆☆☆</option>
                            <option value="1">1 Star ★☆☆☆☆</option>
                            <option value="0">0 Stars ☆☆☆☆☆</option>
                        </select>
                        
                        <textarea id="rev-text" placeholder="Write your review here..." required rows="4" style="width: 100%; margin-bottom: 15px; padding: 10px; border-radius: 5px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2); color: #fff; resize: vertical;"></textarea>
                        
                        <button type="submit" class="btn-primary" style="width: 100%; padding: 12px; border-radius: 25px; border: none; font-size: 15px; font-weight: bold; background: linear-gradient(90deg, #d4af37, #ffeb3b); color: #000;">Submit Review</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <?php include '../common/footer.php'; ?>

    <script src="../assets/js/product.js?v=4"></script>
    <script src="../assets/js/script.js?v=8"></script>
</body>
</html>
