<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

include 'dbconnection.php'; 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    // Check if the required data is provided
    if (isset($data->username) && 
        isset($data->email) && 
        isset($data->password)) {

        $username = $data->username;
        $email = $data->email;
        $password = $data->password;

        // Check if the email already exists
        $stmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        
        if ($stmt->fetchColumn() > 0) {
            echo json_encode(["status" => "Error", "message" => "Email already exists"]);
            exit();
        } 

        // Hash the password for secure storage
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Prepare the insert statement
        $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (:username, :email, :password)");
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $hashed_password); 

        // Execute the statement and provide feedback
        if ($stmt->execute()) {
            echo json_encode(['status' => 'Success', 'message' => 'User registered successfully']);
        } else {
            echo json_encode(['status' => 'Error', 'message' => 'Failed to register user']);
        }
        
    } else {
        echo json_encode(['status' => 'Error', 'message' => 'Incomplete form data']);
    }
} else {
    echo json_encode(['status' => 'Error', 'message' => 'Invalid request method']);
}
?>
