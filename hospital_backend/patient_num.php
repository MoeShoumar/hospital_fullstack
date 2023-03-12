<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
include('connection.php');

$query = $mysqli->prepare("SELECT * FROM users INNER JOIN hospital_users ON users.id = hospital_users.user_id  where user_type='1'");
$query->execute();
$result = $query->get_result();
$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}
echo json_encode($data);
