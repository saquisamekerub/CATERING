<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit;
}

include 'dbconnection.php'; // Ensure the DB connection is correct

// Debug: Log the request method
error_log("Request Method: " . $_SERVER['REQUEST_METHOD']);

// Ensure the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw POST data
    $input = file_get_contents("php://input");

    // Log the raw input for debugging purposes
    error_log("Raw input: " . $input);

    // Decode the JSON input
    $data = json_decode($input);

    // Check if json_decode succeeded
    if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(['status' => 'Error', 'message' => 'Invalid JSON format']);
        exit;
    }

    // Check if username, email, and password are present
    if (isset($data->username) && isset($data->email) && isset($data->password)) {
        $username = $data->username;
        $user_email = $data->email;
        $user_password = $data->password;

        // Your database logic here
        $stmt = $conn->prepare("INSERT INTO user (username, email, password) VALUES (:username, :email, :password)");

        $hashed_password = password_hash($user_password, PASSWORD_DEFAULT); // Hash the password

        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':email', $user_email);
        $stmt->bindParam(':password', $hashed_password);

        if ($stmt->execute()) {
            $user_id = $conn->lastInsertId(); // Get the last inserted user ID
            echo json_encode(['status' => 'Success', 'message' => 'User registered successfully', 'user_id' => $user_id]); // Return user_id
        } else {
            echo json_encode(['status' => 'Error', 'message' => 'Failed to register user']);
        }
    } else {
        error_log("Missing data: " . print_r($data, true));
        echo json_encode(['status' => 'Error', 'message' => 'Incomplete form data']);
    }
} else {
    echo json_encode(['status' => 'Error', 'message' => 'Invalid request method']);
}
?>
