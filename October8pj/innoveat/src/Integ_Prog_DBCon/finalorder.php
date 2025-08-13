<?php

header("Access-Control-Allow-Origin: *"); // Allow all origins
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Allow POST and OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow Content-Type header
header('Content-Type: application/json'); // Set content type to JSON

$host = 'localhost:3306';
$dbname = 'test12'; 
$username = 'root'; 
$password = ''; 

try {
    // Establish the database connection
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Handle preflight (OPTIONS) requests
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200); // Respond with OK for preflight
        exit;
    }

    // Check if the request is a POST request
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Retrieve data from the request body
        $data = json_decode(file_get_contents('php://input'), true);
        error_log(print_r($data, true)); // Log incoming data for debugging

        // Retrieve order details
        $event_id = $data['event_id'] ?? null;
        $equip_pckg_id = $data['equip_pckg_id'] ?? null;
        $status = $data['status'] ?? 'Pending'; // Default status
        $user_id = $data['user_id'] ?? null;

        // Validate required fields
        if (!$event_id || !$user_id) { // event_id and user_id must not be null
            echo json_encode(['status' => 'error', 'message' => 'Missing required information.']);
            exit;
        }

        // Insert the final order data including the status
        $stmt = $conn->prepare("
            INSERT INTO final_order (event_id, equip_pckg_id, user_id, status)
            VALUES (:event_id, :equip_pckg_id, :user_id, :status)
        ");
        $stmt->bindParam(':event_id', $event_id, PDO::PARAM_INT); 
        $stmt->bindParam(':equip_pckg_id', $equip_pckg_id, PDO::PARAM_INT); // Can be null
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT); 
        $stmt->bindParam(':status', $status, PDO::PARAM_STR); // Bind status as a string

        // Execute the statement
        if ($stmt->execute()) {
            // Order was successfully saved, now update total_orders in dashboard
            // Use the logged-in admin id or a dynamic method to get the admin id
            $admin_id = 1; // Replace with dynamic admin_id if available
            $updateStmt = $conn->prepare("UPDATE dashboard SET total_orders = total_orders + 1 WHERE admin_id = :admin_id");
            $updateStmt->bindParam(':admin_id', $admin_id, PDO::PARAM_INT);

            if ($updateStmt->execute()) {
                echo json_encode(['status' => 'Success', 'message' => 'Order saved and total_orders updated successfully.']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Failed to update total_orders.']);
            }
        } else {
            // Log error information
            $errorInfo = $stmt->errorInfo();
            error_log('SQL Error: ' . print_r($errorInfo, true));
            echo json_encode(['status' => 'error', 'message' => 'Failed to save order.']);
        }
    }
} catch (PDOException $e) {
    // Log the database error
    error_log('Database error: ' . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}

?>
