<?php

header("Access-Control-Allow-Origin: *"); // Allow all origins
header("Access-Control-Allow-Methods: POST, OPTIONS, GET"); // Allow POST, OPTIONS, and GET methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow Content-Type header

$host = 'localhost:3306';
$dbname = 'test12'; 
$username = 'root'; 
$password = ''; 

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Query to retrieve events from the database
    $stmt = $conn->prepare("SELECT event_id, event_type, pax_qty, user_id FROM event");
    $stmt->execute();

    // Fetch all events
    $events = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Check if there are events
    if ($events) {
        // Start the HTML output
        echo "<h1>Event Pax Panel</h1>";
        echo "<table border='1'>
                <tr>
                    <th>Event ID</th>
                    <th>Event Type</th>
                    <th>Pax Quantity</th>
                    <th>User ID</th>
                </tr>";

        // Loop through each event and display it in the table
        foreach ($events as $event) {
            echo "<tr>
                    <td>{$event['event_id']}</td>
                    <td>{$event['event_type']}</td>
                    <td>{$event['pax_qty']}</td>
                    <td>{$event['user_id']}</td>
                </tr>";
        }

        echo "</table>";
    } else {
        echo "No events found.";
    }

} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
