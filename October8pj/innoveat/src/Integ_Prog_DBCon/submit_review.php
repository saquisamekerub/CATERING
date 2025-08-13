<?php
session_start(); // Start the session

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'dbconnection.php'; // Ensure this file has the correct PDO connection

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['rating']) && isset($data['reviewText'])) {
    $rating = $data['rating'];
    $reviewText = $data['reviewText'];
    $user_id = $_SESSION['user_id'] ?? null; // Ensure user_id is set

    if ($user_id) {
        // Prepare the SQL statement to insert the review
        $stmt = $pdo->prepare("INSERT INTO reviews (user_id, rating, review_text) VALUES (:user_id, :rating, :review_text)");
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':rating', $rating);
        $stmt->bindParam(':review_text', $reviewText);

        // Execute the statement and check if it was successful
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Review submitted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to submit review']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'User not logged in']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
}
?>
