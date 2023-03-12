<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
include('connection.php');

$query = $mysqli->prepare("SELECT * FROM user_type ut JOIN users u ON ut.user_id = u.id WHERE ut.user_type = 'employee' AND u.gender_type = 'female'");
$query->execute();
$result = $query->get_result();
$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}
echo json_encode($data);
