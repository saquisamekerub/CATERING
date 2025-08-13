<?php

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Database connection settings
$host = 'localhost:3306';
$dbname = 'test12'; // Confirmed database name
$username = 'root';
$password = '';

try {
    // Establish the database connection
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Handle CORS preflight request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // SQL query to fetch the required columns
        $stmt = $conn->prepare("
            SELECT final_order_id, event_id, equip_pckg_id
            FROM finalorder
        ");

        // Execute the query
        if ($stmt->execute()) {
            $reservations = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(['status' => 'success', 'data' => $reservations]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to retrieve reservations']);
            error_log('SQL Error: ' . implode(", ", $stmt->errorInfo()));
        }
    }
} catch (PDOException $e) {
    // Log the database error and output the error message in JSON format
    error_log('Database error: ' . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}

?>
