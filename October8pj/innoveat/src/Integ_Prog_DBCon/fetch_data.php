<?php
// Step 1: Establish Database Connection
$host = 'localhost:3306';
$db = 'test12';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit; // Exit if connection fails
}

// Step 2: Write the SQL Query
$sql = "
SELECT 
    f.final_order_id, 
    f.totalprice, 
    f.event_id AS final_event_id, 
    fp.food_pckg_id, 
    fp.pork, 
    fp.beef, 
    fp.chicken, 
    fp.fish, 
    fp.vegetables, 
    fp.pasta
FROM 
    finalorder f
JOIN 
    foodpackage fp ON f.event_id = fp.event_id;
";

// Step 3: Execute the Query and Fetch Results
try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Step 4: Check if results were found
    if ($results) {
        foreach ($results as $row) {
            echo "Final Order ID: " . $row['final_order_id'] . "<br>";
            echo "Total Price: " . $row['totalprice'] . "<br>";
            echo "Event ID: " . $row['final_event_id'] . "<br>";
            echo "Food Package ID: " . $row['food_pckg_id'] . "<br>";
            echo "Pork: " . $row['pork'] . "<br>";
            echo "Beef: " . $row['beef'] . "<br>";
            echo "Chicken: " . $row['chicken'] . "<br>";
            echo "Fish: " . $row['fish'] . "<br>";
            echo "Vegetables: " . $row['vegetables'] . "<br>";
            echo "Pasta: " . $row['pasta'] . "<br><br>";
        }
    } else {
        echo "No results found.";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

// Close the connection (optional)
$pdo = null;
?>
