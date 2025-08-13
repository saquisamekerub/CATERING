<?php
// Allow access from your frontend's origin
header("Access-Control-Allow-Origin: http://localhost:5175");

// Allow specific HTTP methods
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Allow specific headers in the request
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight requests (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] == "OPTIONS") {
    http_response_code(200);
    exit();
}

// Process the actual request
header("Content-Type: application/json");
require 'dbconnection.php'; // Ensure this points to your database connection

$data = json_decode(file_get_contents("php://input"));

// Check if email and password are provided
if (isset($data->email) && isset($data->password)) {
    $email = $data->email;
    $password = $data->password;

    // Prepare the SQL statement to select user
    $stmt = $conn->prepare("
        SELECT admin_id, username, email, passwordhash, role
        FROM admin
        WHERE email = :email
    ");
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    $Admin = $stmt->fetch(PDO::FETCH_ASSOC);

    // Verify password and send response
    if ($Admin && password_verify($password, $Admin['passwordhash'])) {
        echo json_encode([
            "status" => "Success",
            "id" => $Admin['admin_id'],
            "username" => $Admin['username'],
            "email" => $Admin['email'],
            "role" => $Admin['role']
        ]);
    } else {
        echo json_encode([
            "status" => "Error",
            "message" => "Invalid email or password"
        ]);
    }
} else {
    echo json_encode([
        "status" => "Error",
        "message" => "Email and password are required"
    ]);
}
?>
