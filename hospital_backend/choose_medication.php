<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, OPTIONS");
include('connection.php');

$user_id = $_GET['user_id'];
$medication_id = $_GET['medication_id'];
$qauntity = $_GET['qauntity'];

$query = $mysqli->prepare('SELECT * FROM medications WHERE id = ?');
$query->bind_param('i', $medication_id);
$query->execute();
$result = $query->get_result();
$data = $result->fetch_assoc();

if (!$data) {
    $response = ["Invalid medication_id"];
} else {
    $query = $mysqli->prepare('SELECT * FROM user_has_medications WHERE qauntity = ? AND medication_id = ? AND user_id = ? ');
    $query->bind_param('iii', $qauntity, $medication_id, $user_id);
    $query->execute();
    $result = $query->get_result();
    $data = $result->fetch_assoc();


    $query = $mysqli->prepare('INSERT INTO user_has_medications (user_id,medication_id,qauntity) VALUES (?, ?,?)');
    $query->bind_param('iii', $user_id, $medication_id, $qauntity);
    $query->execute();
    $response = ["Medication has been added"];
}




echo json_encode(["response" => $response]);
