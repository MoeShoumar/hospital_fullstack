<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
include('connection.php');



$user_id = $_GET['user_id'];
$query = $mysqli->prepare("SELECT * FROM employees_info where user_id =? ");
$query->bind_param('i', $user_id);
$query->execute();
$result = $query->get_result();
$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}
echo json_encode($data);
