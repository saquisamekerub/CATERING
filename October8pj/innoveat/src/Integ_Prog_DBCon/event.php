<?php

header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type"); 

session_start();

$host = 'localhost:3306';
$dbname = 'test12'; 
$username = 'root'; 
$password = ''; 

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);

        $eventType = $data['event_type'] ?? null;
        $paxQty = $data['pax_qty'] ?? null;
        $userId = $data['user_id'] ?? null;

        error_log('Received data: ' . json_encode($data));

        if (!$eventType || !$paxQty || !$userId) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
            exit;
        }

        $stmt = $conn->prepare("INSERT INTO event (event_type, pax_qty, user_id) VALUES (:event_type, :pax_qty, :user_id)");
        $stmt->bindParam(':event_type', $eventType);
        $stmt->bindParam(':pax_qty', $paxQty, PDO::PARAM_INT);
        $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);

        if ($stmt->execute()) {
            $eventId = $conn->lastInsertId();
            
            echo json_encode([
                'status' => 'success',
                'message' => 'Event created successfully',

                'event_id' => $eventId
            ]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to create event']);
        }
    }
} catch (PDOException $e) {
    error_log('Database error: ' . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
