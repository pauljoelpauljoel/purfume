<?php
$dataDir = __DIR__ . '/data';
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0777, true);
}

// 1. Products (30-40 products)
$products = [];
$brands = ["Aura", "Nova", "Zephyr", "Lumina", "Vortex", "Eon", "Quantum", "Obsidian"];
$notes = ["Woody & Spicy", "Fresh & Aquatic", "Citrus & Oriental", "Leather & Musk", "Amber & Vanilla"];
$images = ["assets/images/prod1.png", "assets/images/prod2.png", "assets/images/prod3.png"];

for ($i = 1; $i <= 36; $i++) {
    $brand = $brands[array_rand($brands)];
    $products[] = [
        "id" => $i,
        "name" => $brand . " " . rand(100, 999),
        "brand" => $brand,
        "price" => rand(80, 450) . ".00",
        "description" => "A futuristic blend of " . strtolower($notes[array_rand($notes)]) . " with a premium glassmorphic presence.",
        "image" => $images[array_rand($images)],
        "rating" => (rand(40, 50) / 10),
        "is_trending" => ($i <= 6) // First 6 are trending
    ];
}
file_put_contents("$dataDir/products.json", json_encode($products, JSON_PRETTY_PRINT));

// 2. Profiles (Floating profile cards)
$profiles = [];
$users = ["Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Sam", "Jamie"];
for ($i = 1; $i <= 10; $i++) {
    $profiles[] = [
        "id" => $i,
        "user" => $users[array_rand($users)],
        "review" => "Amazing fragrance! Truly futuristic.",
        "rating" => rand(4, 5),
        "perfume_image" => $images[array_rand($images)]
    ];
}
file_put_contents("$dataDir/profiles.json", json_encode($profiles, JSON_PRETTY_PRINT));

// 3. Services
$services = [
    ["title" => "Free Delivery", "desc" => "Worldwide luxury shipping", "icon" => "globe"],
    ["title" => "Premium Support", "desc" => "24/7 VIP assistance", "icon" => "headset"],
    ["title" => "Gift Wrapping", "desc" => "Futuristic glowing packaging", "icon" => "gift"]
];
file_put_contents("$dataDir/services.json", json_encode($services, JSON_PRETTY_PRINT));

// 4. Testimonials
$testimonials = [
    ["name" => "David R.", "text" => "The showroom experience is out of this world.", "role" => "Collector"],
    ["name" => "Sarah L.", "text" => "Unmatched luxury and aesthetic.", "role" => "Enthusiast"]
];
file_put_contents("$dataDir/testimonials.json", json_encode($testimonials, JSON_PRETTY_PRINT));

// 5. Categories
$categories = [
    ["id" => "c1", "name" => "Woody"],
    ["id" => "c2", "name" => "Aquatic"],
    ["id" => "c3", "name" => "Oriental"],
    ["id" => "c4", "name" => "Fresh"]
];
file_put_contents("$dataDir/categories.json", json_encode($categories, JSON_PRETTY_PRINT));

echo "JSON files generated successfully.";
?>
