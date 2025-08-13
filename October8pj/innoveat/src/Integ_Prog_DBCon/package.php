<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle OPTIONS requests for CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$host = 'localhost:3306';
$dbname = 'test12'; 
$username = 'root'; 
$password = ''; 

try {
    // Establish database connection
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    error_log('Database connection successful');
    
    // Add package_type column if it doesn't exist
    $conn->exec("ALTER TABLE package ADD COLUMN IF NOT EXISTS package_type VARCHAR(50) NOT NULL");

} catch (PDOException $e) {
    // Log database connection error
    error_log("Database connection failed: " . $e->getMessage());
    http_response_code(500); // Internal Server Error
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed']);
    exit;
}

// Log the incoming request method for debugging
error_log('Request method: ' . $_SERVER['REQUEST_METHOD']);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the incoming data
    $data = file_get_contents("php://input");
    error_log('Request body: ' . $data); // Log request body for debugging

    $data = json_decode($data);

    if (json_last_error() !== JSON_ERROR_NONE) {
        error_log('JSON decode error: ' . json_last_error_msg());
        http_response_code(400); // Bad Request
        echo json_encode(['status' => 'error', 'message' => 'Invalid JSON']);
        exit;
    }

    // Check if creating a package or recording user selection
    if (isset($data->package_type) && isset($data->pax_qty) && isset($data->user_id) && isset($data->event_id)) {
        // Package creation logic
        $packageType = $data->package_type;
        $paxQty = $data->pax_qty;
        $userId = $data->user_id;
        $eventId = $data->event_id;

        // Log extracted data for debugging
        error_log("PackageType: $packageType, PaxQty: $paxQty, UserId: $userId, EventId: $eventId");

        // Validate input data
        if (!$packageType || !$paxQty || !$userId || !$eventId) {
            error_log('Invalid input detected');
            http_response_code(400); // Bad Request
            echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
            exit;
        }

        // Prepare the SQL statement to prevent SQL injection
        $stmt = $conn->prepare("INSERT INTO package (package_type, pax_qty, user_id, event_id) VALUES (:package_type, :pax_qty, :user_id, :event_id)");
        $stmt->bindParam(':package_type', $packageType);
        $stmt->bindParam(':pax_qty', $paxQty, PDO::PARAM_INT);
        $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
        $stmt->bindParam(':event_id', $eventId, PDO::PARAM_INT);

        // Execute the statement and check if the insertion was successful
        if ($stmt->execute()) {
            $packageId = $conn->lastInsertId();
            echo json_encode(['status' => 'success', 'message' => 'Package created successfully', 'package_id' => $packageId]);

            // Record user selection
            recordUserSelection($userId, $packageId);
        } else {
            // Log the detailed SQL error information
            $errorInfo = $stmt->errorInfo();
            error_log('SQL Error: ' . print_r($errorInfo, true));
            http_response_code(500); // Internal Server Error
            echo json_encode(['status' => 'error', 'message' => 'Failed to create package', 'error' => $errorInfo]);
        }
    } elseif (isset($data->user_id) && isset($data->package_id)) {
        // User selection logic
        $userId = $data->user_id;
        $packageId = $data->package_id;

        // Validate input
        if (!$userId || !$packageId) {
            http_response_code(400); // Bad Request
            echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
            exit;
        }

        // Prepare the SQL statement to prevent SQL injection
        $stmt = $conn->prepare("INSERT INTO user_selection (user_id, package_id) VALUES (:user_id, :package_id)");
        $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
        $stmt->bindParam(':package_id', $packageId, PDO::PARAM_INT);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'User selection recorded successfully']);
        } else {
            error_log('SQL Error: ' . print_r($stmt->errorInfo(), true));
            http_response_code(500); // Internal Server Error
            echo json_encode(['status' => 'error', 'message' => 'Failed to record user selection']);
        }
    } else {
        http_response_code(400); // Bad Request
        echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Handle GET request to fetch all packages
    try {
        // Modify the query to count the number of users who selected each package type
        $stmt = $conn->query("
            SELECT 
                package_type, 
                COUNT(user_selection.user_id) AS selected_user_count, 
                (SELECT COUNT(*) FROM package) AS total_user_count
            FROM 
                package 
            LEFT JOIN 
                user_selection ON package.package_id = user_selection.package_id 
            GROUP BY 
                package_type
        ");
        $packages = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Check for any data and format it correctly
        $responsePackages = [];
        foreach ($packages as $package) {
            $responsePackages[] = [
                'package_type' => $package['package_type'],
                'selected_user_count' => $package['selected_user_count'] ?? 0,
                'total_user_count' => $package['total_user_count'] ?? 1 // Avoid division by zero
            ];
        }

        // Return the data in a suitable format for the frontend
        echo json_encode(['status' => 'success', 'packages' => $responsePackages]);
    } catch (PDOException $e) {
        error_log("Error fetching packages: " . $e->getMessage());
        http_response_code(500); // Internal Server Error
        echo json_encode(['status' => 'error', 'message' => 'Error fetching packages']);
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
}

// Function to record user selection
function recordUserSelection($userId, $packageId) {
    global $conn; // Access the database connection
    $stmt = $conn->prepare("INSERT INTO user_selection (user_id, package_id) VALUES (:user_id, :package_id)");
    $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
    $stmt->bindParam(':package_id', $packageId, PDO::PARAM_INT);
    return $stmt->execute();
}
?>
