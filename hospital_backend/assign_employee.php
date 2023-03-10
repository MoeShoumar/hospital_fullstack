<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, OPTIONS");
include('connection.php');

$hospital_id = $_POST['hospital_id'];
$user_id = $_POST['user_id'];

$query = $mysqli->prepare('SELECT * FROM  hospital_users WHERE user_id = ? AND hospital_id =?');
$query->bind_param('ii', $user_id, $hospital_id);
$query->execute();
$result = $query->get_result();
$data = $result->fetch_assoc();



if (isset($data)) {
    $response = ['employee already exist'];
} else {
    $query = $mysqli->prepare('INSERT INTO hospital_users (hospital_id, user_id) VALUES (?, ?)');
    $query->bind_param('ii', $hospital_id, $user_id);
    $query->execute();
    $response = ['employee assigned successfully'];
}
echo json_encode($response);
