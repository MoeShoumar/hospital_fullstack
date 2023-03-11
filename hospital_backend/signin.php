<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 86400");
include('connection.php');
include('../vendor/autoload.php');

use \Firebase\JWT\JWT;

$email = $_POST['email'];
$password = $_POST['password'];

$query = $mysqli->prepare("SELECT * FROM users WHERE email=? AND password=?");
$query->bind_param('ss', $email, $password);
$query->execute();

$result = $query->get_result();

while ($object = $result->fetch_assoc()) {
    $data = $object;
}


$payload = array(
    "sub" => $data['id'],
);
$response["token"] = JWT::encode($payload, "secret_key", 'HS256');


echo json_encode(["response" => $response]);
?>




<!-- How many female employees are there?
SELECT COUNT(*) FROM user WHERE user_role_id = 2 AND gender = 'Female'; -->