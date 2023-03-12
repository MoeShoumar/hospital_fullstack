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


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if ($_SERVER['CONTENT_TYPE'] === 'application/json') { //check data form (json)
        $json_data = file_get_contents('php://input'); //gwet data from body
        $data = json_decode($json_data, true); //true to store them as an array
        $query = $mysqli->prepare("SELECT * FROM employees_info where user_id =? ");
        $query->bind_param('i', $medication_id);
        $query->execute();
        $query->execute();
        $result = $query->get_result();
        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode($data);
    }
}
