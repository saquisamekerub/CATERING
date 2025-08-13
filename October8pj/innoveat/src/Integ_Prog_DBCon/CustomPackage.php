<?php

header("Access-Control-Allow-Origin: *"); // Allow all origins, change '*' to your React app URL for production
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database connection settings
$host = 'localhost:3306';
$dbname = 'test12';
$username = 'root';
$password = '';

try {
    // Establish a PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection error: ' . $e->getMessage()]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve POST data from the JSON payload
    $data = json_decode(file_get_contents("php://input"), true);

    $event_id = $data['event_id'] ?? null;
    $user_id = $data['user_id'] ?? null;
    $selections = $data['selections'] ?? [];

    // Check if event_id and user_id are provided
    if (!$event_id || !$user_id) {
        echo json_encode(['status' => 'error', 'message' => 'Missing event or user ID']);
        exit;
    }

    // Default equip_pckg_id to NULL
    $equip_pckg_id = null;

    try {
        // Prepare SQL statement for inserting package details
        $stmt = $pdo->prepare("
            INSERT INTO equipmentpackage 
            (event_id, user_id, equip_pckg_id, entertainment, chair, tables, chair_cover, table_cover, balloon_colors, napkin_colors, backdrop_shape, centerpiece) 
            VALUES 
            (:event_id, :user_id, :equip_pckg_id, :entertainment, :chair, :tables, :chair_cover, :table_cover, :balloon_colors, :napkin_colors, :backdrop_shape, :centerpiece)
        ");

        // Assign selections to variables to ensure they are passed correctly
        $entertainment = $selections['Entertainment'] ?? null;
        $chairs = $selections['Chair'] ?? null; 
        $tables = $selections['Table'] ?? null; 
        $chair_cover = $selections['Chair Cover'] ?? null; 
        $table_cover = $selections['Table Cover'] ?? null; 
        $balloon_colors = $selections['Balloon Color'] ?? null; 
        $napkin_colors = $selections['Napkin Color'] ?? null; 
        $backdrop_shape = $selections['Backdrop Shape'] ?? null; 
        $centerpiece = $selections['Center Piece'] ?? null; 

        // Bind parameters using the variables
        $stmt->bindParam(':event_id', $event_id, PDO::PARAM_INT);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->bindParam(':equip_pckg_id', $equip_pckg_id, PDO::PARAM_INT); // Allow NULL
        $stmt->bindParam(':entertainment', $entertainment, PDO::PARAM_STR);
        $stmt->bindParam(':chair', $chairs, PDO::PARAM_STR);
        $stmt->bindParam(':tables', $tables, PDO::PARAM_STR);
        $stmt->bindParam(':chair_cover', $chair_cover, PDO::PARAM_STR);
        $stmt->bindParam(':table_cover', $table_cover, PDO::PARAM_STR);
        $stmt->bindParam(':balloon_colors', $balloon_colors, PDO::PARAM_STR);
        $stmt->bindParam(':napkin_colors', $napkin_colors, PDO::PARAM_STR);
        $stmt->bindParam(':backdrop_shape', $backdrop_shape, PDO::PARAM_STR);
        $stmt->bindParam(':centerpiece', $centerpiece, PDO::PARAM_STR);

        // Execute the statement
        $stmt->execute();

        // Send success response
        echo json_encode(['status' => 'success', 'message' => 'Package customization saved successfully']);
    } catch (PDOException $e) {
        // Handle any errors
        echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>
