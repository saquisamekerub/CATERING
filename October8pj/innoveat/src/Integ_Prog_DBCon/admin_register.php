<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

include 'dbconnection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->admin_user_type) && 
        isset($data->admin_name) && 
        isset($data->admin_email) && 
        isset($data->admin_password)) {

        $admin_user_type = $data->admin_user_type;
        $admin_name = $data->admin_name;
        $admin_email = $data->admin_email;
        $admin_password = $data->admin_password;
        
        $stmt = $conn->prepare("SELECT COUNT(*) FROM admin_tb WHERE admin_email = :admin_email");
        $stmt->bindParam(':admin_email', $admin_email);
        $stmt->execute();
            
        if ($stmt->fetchColumn() > 0) {
            echo json_encode(["status" => "Error", "message" => "Email already exists"]);
            exit();
        } else {
            $hashed_password = password_hash($admin_password, PASSWORD_DEFAULT);

            $stmt = $conn->prepare("INSERT INTO admin_tb (admin_user_type, admin_name, admin_email, admin_password) VALUES (:admin_user_type, :admin_name, :admin_email, :admin_password)");

            $stmt->bindParam(':admin_user_type', $admin_user_type);
            $stmt->bindParam(':admin_name', $admin_name);
            $stmt->bindParam(':admin_email', $admin_email);
            $stmt->bindParam(':admin_password', $hashed_password); 

            // Execute the query
            if ($stmt->execute()) {
                echo json_encode(['status' => 'Success', 'message' => 'User registered successfully']);
            } else {
                echo json_encode(['status' => 'Error', 'message' => 'Failed to register user']);
            }
        }
        
    } else {
        echo json_encode(['status' => 'Error', 'message' => 'Incomplete form data']);
    }
} else {
    echo json_encode(['status' => 'Error', 'message' => 'Invalid request method']);
}
?>