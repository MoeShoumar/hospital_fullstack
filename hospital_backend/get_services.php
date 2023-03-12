<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
include('connection.php');
include('../vendor/autoload.php');

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$headers = getallheaders();
$token = $headers['Authorization'];
$secret_key = "secret_key";


try {
    $decoded_token = JWT::decode($token, new Key($secret_key, 'HS256'));
} catch (Exception $e) {
    http_response_code(401);
    exit();
}
$query = $mysqli->prepare("SELECT * FROM services");
$query->execute();
$result = $query->get_result();


while ($object = $result->fetch_assoc()) {
    $data[] = $object;
}
echo json_encode($data);
