<?php
session_start(); // Start the session

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

include 'dbconnection.php'; // Assuming the DB connection is correct

// Ensure the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw POST data
    $input = file_get_contents("php://input");

    // Check if json_decode succeeded
    $data = json_decode($input);
    if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(['status' => 'Error', 'message' => 'Invalid JSON format']);
        exit;
    }

    // Check if email and password are present
    if (isset($data->email) && isset($data->password)) {
        $user_email = $data->email;
        $user_password = $data->password;

        // Admin login check
        if ($user_email === 'admin@gmail.com' && $user_password === '12345') {
            echo json_encode(['status' => 'Admin', 'message' => 'Admin login successful']);
            exit;
        } 
        
        // Prepare the SQL statement to fetch the user
        $stmt = $conn->prepare("SELECT * FROM user WHERE email = :email");
        $stmt->bindParam(':email', $user_email);
        
        // Execute the statement
        if ($stmt->execute()) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            // Verify the password
            if ($user && password_verify($user_password, $user['password'])) {
                // Store user_id in session
                $_SESSION['user_id'] = $user['user_id'];

                echo json_encode([
                    'status' => 'Success', 
                    'message' => 'Login successful', 
                    'user_id' => $user['user_id'], 
                    'username' => $user['username']
                ]);
            } else {
                echo json_encode(['status' => 'Error', 'message' => 'Invalid email or password']);
            }
        } else {
            echo json_encode(['status' => 'Error', 'message' => 'Database query failed']);
        }
    } else {
        echo json_encode(['status' => 'Error', 'message' => 'Email and password are required']);
    }
} else {
    echo json_encode(['status' => 'Error', 'message' => 'Invalid request method']);
}
?>
