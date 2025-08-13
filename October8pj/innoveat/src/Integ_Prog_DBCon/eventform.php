<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


// Database connection settings
$host = 'localhost:3307';
$dbname = 'test12';
$username = 'root';
$password = '';

try {
    // Establish a PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Return an error if connection fails
    echo json_encode(['status' => 'Error', 'message' => 'Database connection failed: ' . $e->getMessage()]);
    exit();
}

// Get the JSON data from the POST request
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['user_id'], $data['event_date'], $data['location'])) {
    $user_id = $data['user_id'];
    $event_date = $data['event_date'];
    $location = $data['location'];

    // Optional fields: Uncomment if start_time and end_time are added to the database
    // $start_time = isset($data['start_time']) ? $data['start_time'] : null;
    // $end_time = isset($data['end_time']) ? $data['end_time'] : null;

    try {
        // Insert the data into the events table
        $sql = "INSERT INTO eventform (user_id, event_date, location) VALUES (:user_id, :event_date, :location)";
        $stmt = $pdo->prepare($sql);

        // Bind parameters
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':event_date', $event_date);
        $stmt->bindParam(':location', $location);

        // Uncomment the lines below if start_time and end_time are added to the database
        // $sql = "INSERT INTO events (user_id, event_date, location, start_time, end_time) VALUES (:user_id, :event_date, :location, :start_time, :end_time)";
        // $stmt->bindParam(':start_time', $start_time);
        // $stmt->bindParam(':end_time', $end_time);

        // Execute the statement
        $stmt->execute();

        // Get the last inserted event ID
        $event_id = $pdo->lastInsertId();

        // Return success response with event_id
        echo json_encode(['status' => 'Success', 'message' => 'Event created successfully', 'event_id' => $event_id]);
    } catch (PDOException $e) {
        // Return an error if the query fails
        echo json_encode(['status' => 'Error', 'message' => 'Failed to create event: ' . $e->getMessage()]);
    }
} else {
    // Return an error if required fields are missing
    echo json_encode(['status' => 'Error', 'message' => 'Missing required fields']);
}
?>
