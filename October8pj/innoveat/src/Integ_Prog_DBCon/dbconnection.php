<?php

$host = 'localhost:3306';
$dbname = 'test12'; 
$username = 'root'; 
$password = ''; 

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['status' => 'Error', 'message' => 'Connection failed: ' . $e->getMessage()]);
    exit();
}   

