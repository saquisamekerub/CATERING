<?php

header("Access-Control-Allow-Origin: *"); // Allow all origins
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Allow POST and OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow Content-Type header

$host = 'localhost:3306';
$dbname = 'test12'; 
$username = 'root'; 
$password = ''; 

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if the request is a POST request
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Retrieve data from the request body
        $data = json_decode(file_get_contents('php://input'), true);

        // Retrieve food package details
        $pork = $data['pork'] ?? null;
        $beef = $data['beef'] ?? null;
        $chicken = $data['chicken'] ?? null;
        $fish = $data['fish'] ?? null;
        $vegetables = $data['vegetables'] ?? null;
        $pasta = $data['pasta'] ?? null;
        $Dessert = $data['Dessert'] ?? null;
        $Drinks = $data['Drinks'] ?? null;
        $user_id = $data['user_id'] ?? null;
        $event_id = $data['event_id'] ?? null; // This will be provided by the frontend
        $equip_pckg_id = $data['equip_pckg_id'] ?? null;

        // Validate required fields
        if (!$user_id || !$event_id || !$equip_pckg_id) {
            echo json_encode(['status' => 'error', 'message' => 'Missing required information.']);
            exit;
        }

        // Prepare and execute the SQL statement to insert food package data
        $stmt = $conn->prepare("
            INSERT INTO foodpackage (pork, beef, chicken, fish, vegetables, pasta, Dessert, Drinks, user_id, event_id, equip_pckg_id)
            VALUES (:pork, :beef, :chicken, :fish, :vegetables, :pasta, :Dessert, :Drinks, :user_id, :event_id, :equip_pckg_id)
        ");
        $stmt->bindParam(':pork', $pork);
        $stmt->bindParam(':beef', $beef);
        $stmt->bindParam(':chicken', $chicken);
        $stmt->bindParam(':fish', $fish);
        $stmt->bindParam(':vegetables', $vegetables);
        $stmt->bindParam(':pasta', $pasta);
        $stmt->bindParam(':Dessert', $Dessert);
        $stmt->bindParam(':Drinks', $Drinks);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->bindParam(':event_id', $event_id, PDO::PARAM_INT);
        $stmt->bindParam(':equip_pckg_id', $equip_pckg_id, PDO::PARAM_INT);

        // Execute the statement
        if ($stmt->execute()) {
            echo json_encode(['status' => 'Success', 'message' => 'Food package saved successfully.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to save food package.']);
        }
    }
} catch (PDOException $e) {
    // Log the database error
    error_log('Database error: ' . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
