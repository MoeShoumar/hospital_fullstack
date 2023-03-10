<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, OPTIONS");
include('connection.php');

$hospital_id = $_POST['hospital_id'];
$user_id = $_POST['user_id'];
$is_active = $_POST['is_active'];
$date_joined = $_POST['date_joined'];
$date_left = $_POST['date_left'];

$query = $mysqli->prepare('SELECT * FROM  hospital_users WHERE user_id = ? AND hospital_id =?');
$query->bind_param('ii', $user_id, $hospital_id);
$query->execute();
$result = $query->get_result();
$data = $result->fetch_assoc();



if ($data > 0) {
    $response = ['user already exist'];
} else {
    $query = $mysqli->prepare('INSERT INTO hospital_users (hospital_id, user_id, is_active, date_joined, date_left) VALUES (?, ?, ?, ?, ?)');
    $query->bind_param('iisss', $hospital_id, $user_id, $is_active, $date_joined, $date_left);
    $query->execute();
    $response = ['user added successfully'];
}
echo json_encode($response);
