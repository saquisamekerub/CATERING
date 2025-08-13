<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

$host = 'localhost:3306';
$dbname = 'test12';
$username = 'root';
$password = '';

try {
    // Establish the database connection
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if the request is a POST request
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Retrieve data from the request body
        $data = json_decode(file_get_contents('php://input'), true);

        // Retrieve the confirmation status and user ID from the payload
        $confirmation_status = $data['confirmation_status'] ?? null;
        $user_id = $data['user_id'] ?? null;

        // Validate required fields
        if (!$confirmation_status || !$user_id) {
            echo json_encode(['status' => 'error', 'message' => 'Missing required information.']);
            exit;
        }

        // Insert the confirmation data into the confirm_registration table
        $stmt = $conn->prepare("
            INSERT INTO confirm_registration (confirmation_status, user_id)
            VALUES (:confirmation_status, :user_id)
        ");
        $stmt->bindParam(':confirmation_status', $confirmation_status);
        $stmt->bindParam(':user_id', $user_id);

        // Execute the statement
        if ($stmt->execute()) {
            echo json_encode(['status' => 'Success', 'message' => 'Reservation confirmed successfully.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to confirm reservation.']);
        }
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}

?>
