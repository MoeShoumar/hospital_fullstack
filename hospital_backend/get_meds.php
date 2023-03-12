<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
include('connection.php');

$query = $mysqli->prepare("SELECT * FROM medications");
$query->execute();
$result = $query->get_result();


while ($object = $result->fetch_assoc()) {
    $data[] = $object;
}
echo json_encode($data);
