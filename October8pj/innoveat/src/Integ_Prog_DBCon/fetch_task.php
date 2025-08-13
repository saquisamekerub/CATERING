<?php

header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

include 'dbconnection.php';

$user_id = $_GET['user_id']; 

try {
    $stmt = $conn->prepare("SELECT * FROM tasks WHERE user_id = :user_id");
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();

    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
} catch (PDOException $e) {
    echo json_encode(['status' => 'Error', 'message' => 'Query failed: ' . $e->getMessage()]);
}
?>