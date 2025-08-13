<?php
include 'db.php';
header('Content-Type: application/json');

// Get the HTTP method
$method = $_SERVER['REQUEST_METHOD'];

// Handle request data
$requestData = json_decode(file_get_contents('php://input'), true);

// Handle CORS preflight requests
if ($method === 'OPTIONS') {
    http_response_code(204); // No content
    exit();
}

switch ($method) {
    case 'GET': // READ: Retrieve all users
        $sql = "SELECT * FROM users";
        $result = $conn->query($sql);
        $users = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $users[] = $row;
            }
        }
        echo json_encode($users);
        break;

        case 'POST': // CREATE: Add a new user
            $name = $requestData['name'];
            $email = $requestData['email'];
            // Generate a temporary password (you can customize this as needed)
            $temporaryPassword = 'temp1234'; // Temporary password
            $hashedPassword = password_hash($temporaryPassword, PASSWORD_DEFAULT); // Hash the temporary password
        
            // Add user type to the SQL insert if needed
            $userType = $requestData['user_type'];
        
            // Corrected SQL statement with placeholders for all values
            $sql = "INSERT INTO users (name, email, password, user_type) VALUES (?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            
            // Bind the parameters correctly
            $stmt->bind_param("ssss", $name, $email, $hashedPassword, $userType);
        
            if ($stmt->execute()) {
                echo json_encode(['status' => 'success', 'message' => 'User created']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Failed to create user']);
            }
            $stmt->close();
            break;

    case 'PUT': // UPDATE: Modify an existing user
        $id = $requestData['id'];
        $name = $requestData['name'];
        $email = $requestData['email'];
        // Add user type to the SQL update if needed
        $userType = $requestData['user_type'];

        $sql = "UPDATE users SET name = ?, email = ?, user_type = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssi", $name, $email, $userType, $id);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'User updated']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to update user']);
        }
        $stmt->close();
        break;

    case 'DELETE': // DELETE: Remove a user
        parse_str($_SERVER['QUERY_STRING'], $queryParams);
        $id = $queryParams['id'];

        $sql = "DELETE FROM users WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'User deleted']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to delete user']);
        }
        $stmt->close();
        break;

    default:
        echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
        break;
}

$conn->close();
?>