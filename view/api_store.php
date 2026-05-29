<?php
header('Content-Type: application/json');

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || !isset($data['type']) || !isset($data['payload'])) {
    echo json_encode(["status" => "error", "message" => "Invalid data format"]);
    exit;
}

$type = preg_replace('/[^a-zA-Z0-9_]/', '', $data['type']); // sanitize type
$db_file = __DIR__ . '/../theme_json/' . $type . '.json';

// Initialize file if not exists
if (!file_exists($db_file)) {
    file_put_contents($db_file, json_encode([], JSON_PRETTY_PRINT));
}

$payload = $data['payload'];
if (!isset($payload['timestamp'])) {
    $payload['timestamp'] = date('c'); // add timestamp if not present
}

if (isset($data['overwrite']) && $data['overwrite'] === true) {
    // Overwrite the entire file with the payload and a separate timestamp
    $db = [
        "last_updated" => date('c'),
        "items" => $payload
    ];
} else {
    // Append to existing array
    $db_content = file_get_contents($db_file);
    $db = json_decode($db_content, true);

    if (!is_array($db)) {
        $db = [];
    }
    $db[] = $payload;
}

if (file_put_contents($db_file, json_encode($db, JSON_PRETTY_PRINT))) {
    echo json_encode(["status" => "success", "message" => "Data stored successfully in $type.json"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to write to database"]);
}
?>
